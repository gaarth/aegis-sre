// ============================================================
// index.ts — Sentinel Governor (SG-1) | process-incident
// Main Edge Function entrypoint.
// Orchestrates: Ingestion → RCA → Safety → Tool → Post-Mortem
// Auth: service_role (internal use only)
// NO `any` types permitted.
// ============================================================

import { createClient, SupabaseClient } from "npm:@supabase/supabase-js@2";
import { WebhookPayloadSchema, RcaResponse, TokenUsage } from "./schemas.ts";
import { callGroqRca, generatePostMortem, GroqTimeoutError, GroqRateLimitError } from "./groqClient.ts";
import {
    executeToolCall,
    fallback_to_safe_replicas,
    UnknownToolError,
    ToolValidationError,
    ToolResult,
} from "./toolRegistry.ts";

// ── Supabase type stubs (replace with generated types in step 1.2.7) ──
// TODO: Replace with: import type { Database } from "../../../src/lib/database.types.ts"
interface Database {
    public: {
        Tables: {
            incidents: { Row: { id: string; status: string } };
            incident_logs: { Row: Record<string, unknown> };
            audit_logs: { Row: Record<string, unknown> };
            reports: { Row: { id: string; incident_id: string; content: string } };
        };
    };
}

// ── Supabase client (service_role — bypasses RLS) ─────────────
function getServiceClient(): SupabaseClient<Database> {
    const url = Deno.env.get("SUPABASE_URL");
    const key = Deno.env.get("SUPABASE_SERVICE_ROLE_KEY");
    if (!url || !key) throw new Error("Supabase env vars not set");
    return createClient<Database>(url, key, {
        auth: { persistSession: false },
    });
}

// ── Webhook signature verification ───────────────────────────
async function verifyWebhookSignature(
    req: Request,
    rawBody: string
): Promise<boolean> {
    const signature = req.headers.get("x-hub-signature-256");
    const secret = Deno.env.get("WEBHOOK_SECRET");

    if (!secret) {
        console.warn("WEBHOOK_SECRET not set — signature verification skipped (dev mode)");
        return true;
    }
    if (!signature) return false;

    const encoder = new TextEncoder();
    const keyData = encoder.encode(secret);
    const bodyData = encoder.encode(rawBody);

    const cryptoKey = await crypto.subtle.importKey(
        "raw",
        keyData,
        { name: "HMAC", hash: "SHA-256" },
        false,
        ["sign"]
    );
    const signatureBuffer = await crypto.subtle.sign("HMAC", cryptoKey, bodyData);
    const expectedSig =
        "sha256=" +
        Array.from(new Uint8Array(signatureBuffer))
            .map((b) => b.toString(16).padStart(2, "0"))
            .join("");

    return signature === expectedSig;
}

// ── Rate limit check ─────────────────────────────────────────
async function checkRateLimit(supabase: SupabaseClient<Database>): Promise<boolean> {
    const { data, error } = await supabase.rpc("check_rate_limit", {
        p_function_name: "process-incident",
        p_limit: 10,
    });
    if (error) {
        console.error("Rate limit check failed:", error.message);
        return true; // Fail open — allow if check fails
    }
    return data as boolean;
}

// ── Build RCA system prompt ──────────────────────────────────
function buildRcaSystemPrompt(): string {
    return `You are SG-1 (Sentinel Governor), an expert Site Reliability Engineering AI.
Your task is to perform Root Cause Analysis on infrastructure incidents.

CRITICAL RULES:
1. Always respond with valid JSON matching the exact schema below.
2. confidence must be a float between 0.0 and 1.0.
3. tool_request.name must be one of: get_metrics, scale_workload, throttle_jobs, none.
4. Never request destructive operations (no deletes, no restarts without approval).
5. When in doubt, request approval (set tool_request.name = "none" and explain in hypothesis).

RESPONSE SCHEMA:
{
  "hypothesis": "string — one sentence root cause hypothesis",
  "root_cause": "string — detailed technical root cause",
  "confidence": 0.0,
  "reasoning": "string — step-by-step reasoning chain",
  "tool_request": {
    "name": "scale_workload | get_metrics | throttle_jobs | none",
    "params": {}
  }
}`;
}

// ── Build RCA user prompt ────────────────────────────────────
function buildRcaUserPrompt(
    payload: { source: string; severity: string; metadata: Record<string, unknown> },
    context: Array<{ status: string; severity: string; created_at: string }>
): string {
    return `INCIDENT ALERT:
Service: ${payload.source}
Severity: ${payload.severity}
Metrics: ${JSON.stringify(payload.metadata, null, 2)}

RECENT INCIDENT HISTORY (last 5 resolved):
${JSON.stringify(context, null, 2)}

Perform RCA and return JSON.`;
}

// ── Log agent step to incident_logs ─────────────────────────
async function logAgentStep(
    supabase: SupabaseClient<Database>,
    incidentId: string,
    step: string,
    data: {
        thought_process?: string;
        current_hypothesis?: string;
        confidence?: number;
        tool_call?: Record<string, unknown>;
        tool_result?: ToolResult;
        token_usage?: TokenUsage;
    }
): Promise<void> {
    const { error } = await supabase.from("incident_logs").insert({
        incident_id: incidentId,
        step,
        thought_process: data.thought_process ?? null,
        current_hypothesis: data.current_hypothesis ?? null,
        confidence: data.confidence ?? null,
        tool_call: data.tool_call ? JSON.stringify(data.tool_call) : null,
        tool_result: data.tool_result ? JSON.stringify(data.tool_result) : null,
        token_usage: data.token_usage ? JSON.stringify(data.token_usage) : null,
    });
    if (error) console.error(`Failed to log step '${step}':`, error.message);
}

// ── Log audit entry ─────────────────────────────────────────
async function logAuditEntry(
    supabase: SupabaseClient<Database>,
    incidentId: string,
    actionTaken: string,
    parameters: Record<string, unknown> | null,
    result: ToolResult | null,
    tokenUsage: TokenUsage | null,
    actor: "agent" | "human" = "agent"
): Promise<void> {
    const { error } = await supabase.from("audit_logs").insert({
        incident_id: incidentId,
        action_taken: actionTaken,
        parameters: parameters ? JSON.stringify(parameters) : null,
        result: result ? JSON.stringify(result) : null,
        token_usage: tokenUsage ? JSON.stringify(tokenUsage) : null,
        actor,
    });
    if (error) console.error("Failed to log audit entry:", error.message);
}

// ── Main handler ─────────────────────────────────────────────
Deno.serve(async (req: Request): Promise<Response> => {
    const startMs = Date.now();

    // ── Only accept POST ────────────────────────────────────────
    if (req.method !== "POST") {
        return new Response(JSON.stringify({ error: "Method not allowed" }), {
            status: 405,
            headers: { "Content-Type": "application/json" },
        });
    }

    let rawBody: string;
    try {
        rawBody = await req.text();
    } catch {
        return new Response(JSON.stringify({ error: "Failed to read body" }), {
            status: 400,
            headers: { "Content-Type": "application/json" },
        });
    }

    // ── Signature verification ──────────────────────────────────
    const isValid = await verifyWebhookSignature(req, rawBody);
    if (!isValid) {
        return new Response(JSON.stringify({ error: "Invalid webhook signature" }), {
            status: 401,
            headers: { "Content-Type": "application/json" },
        });
    }

    // ── Parse + validate payload ────────────────────────────────
    let bodyJson: unknown;
    try {
        bodyJson = JSON.parse(rawBody);
    } catch {
        return new Response(JSON.stringify({ error: "Invalid JSON body" }), {
            status: 400,
            headers: { "Content-Type": "application/json" },
        });
    }

    const parsed = WebhookPayloadSchema.safeParse(bodyJson);
    if (!parsed.success) {
        return new Response(
            JSON.stringify({ error: "Schema validation failed", issues: parsed.error.issues }),
            { status: 400, headers: { "Content-Type": "application/json" } }
        );
    }

    const payload = parsed.data;
    const supabase = getServiceClient();

    // ── Rate limit check ────────────────────────────────────────
    const withinLimit = await checkRateLimit(supabase);
    if (!withinLimit) {
        return new Response(
            JSON.stringify({ error: "Rate limit exceeded: max 10 invocations/min" }),
            { status: 429, headers: { "Content-Type": "application/json" } }
        );
    }

    // ── Idempotency: upsert incident ────────────────────────────
    const { data: upsertData, error: upsertError } = await supabase.rpc("upsert_incident", {
        p_source: payload.source,
        p_severity: payload.severity,
        p_metadata: payload.metadata,
        p_idempotency_key: payload.idempotency_key,
    });

    if (upsertError) {
        console.error("Incident upsert failed:", upsertError.message);
        return new Response(JSON.stringify({ error: "DB error" }), {
            status: 500,
            headers: { "Content-Type": "application/json" },
        });
    }

    const { id: incidentId, is_new: isNew } = upsertData[0] as { id: string; is_new: boolean };

    if (!isNew) {
        console.log(`[IDEMPOTENT] Incident ${incidentId} already processed.`);
        return new Response(
            JSON.stringify({ status: "already_processed", incident_id: incidentId }),
            { status: 200, headers: { "Content-Type": "application/json" } }
        );
    }

    // ── Update status to 'investigating' ────────────────────────
    await supabase
        .from("incidents")
        .update({ status: "investigating" })
        .eq("id", incidentId);

    // ── Fetch incident context (last 5 from same service) ───────
    const { data: contextData } = await supabase.rpc("get_incident_context", {
        p_source: payload.source,
        p_limit: 5,
    });
    const context = (contextData ?? []) as Array<{ status: string; severity: string; created_at: string }>;

    // ── Groq RCA Call ────────────────────────────────────────────
    let rcaResult: { data: RcaResponse; tokenUsage: TokenUsage };

    try {
        const systemPrompt = buildRcaSystemPrompt();
        const userPrompt = buildRcaUserPrompt(
            { source: payload.source, severity: payload.severity, metadata: payload.metadata },
            context
        );

        rcaResult = await callGroqRca(systemPrompt, userPrompt);

        await logAgentStep(supabase, incidentId, "rca", {
            thought_process: rcaResult.data.reasoning,
            current_hypothesis: rcaResult.data.hypothesis,
            confidence: rcaResult.data.confidence,
            tool_call: rcaResult.data.tool_request as Record<string, unknown>,
            token_usage: rcaResult.tokenUsage,
        });

        await logAuditEntry(
            supabase,
            incidentId,
            "rca_complete",
            null,
            null,
            rcaResult.tokenUsage
        );

        console.log(
            `[RCA] ${incidentId}: elapsed=${Date.now() - startMs}ms confidence=${rcaResult.data.confidence}`
        );
    } catch (err) {
        console.error("[RCA ERROR]", err);

        if (err instanceof GroqTimeoutError || err instanceof GroqRateLimitError) {
            // Fallback: safe scale-up
            await supabase
                .from("incidents")
                .update({ status: "safe_mode" })
                .eq("id", incidentId);

            const fallbackResult = await fallback_to_safe_replicas(payload.source);
            await logAuditEntry(supabase, incidentId, "FALLBACK_SAFE_REPLICA", null, fallbackResult, null);

            return new Response(
                JSON.stringify({ status: "safe_mode", incident_id: incidentId, fallback: fallbackResult }),
                { status: 200, headers: { "Content-Type": "application/json" } }
            );
        }

        await supabase.from("incidents").update({ status: "failed" }).eq("id", incidentId);
        return new Response(JSON.stringify({ error: "RCA failed", incident_id: incidentId }), {
            status: 500,
            headers: { "Content-Type": "application/json" },
        });
    }

    // ── Safety Interceptor ────────────────────────────────────────
    const toolRequest = rcaResult.data.tool_request;

    if (toolRequest.name === "none") {
        await supabase
            .from("incidents")
            .update({ status: "pending_approval" })
            .eq("id", incidentId);
        await logAuditEntry(supabase, incidentId, "NO_ACTION_REQUIRED", null, null, null);
    } else {
        // ── Execute Tool ────────────────────────────────────────────
        let toolResult: ToolResult;
        let toolActionTaken: string;

        try {
            toolResult = await executeToolCall(toolRequest);
            toolActionTaken = toolRequest.name;

            await logAgentStep(supabase, incidentId, "tool_execution", {
                tool_call: toolRequest as Record<string, unknown>,
                tool_result: toolResult,
            });

            await supabase
                .from("incidents")
                .update({ status: "resolved" })
                .eq("id", incidentId);

            console.log(`[TOOL] ${toolRequest.name} executed. Elapsed=${Date.now() - startMs}ms`);
        } catch (err) {
            if (err instanceof UnknownToolError) {
                toolActionTaken = "BLOCKED";
                await supabase
                    .from("incidents")
                    .update({ status: "pending_approval" })
                    .eq("id", incidentId);
                console.warn(`[BLOCKED] Unknown tool requested: ${toolRequest.name}`);
                toolResult = { message: `Blocked: ${(err as Error).message}` };
            } else if (err instanceof ToolValidationError) {
                toolActionTaken = "VALIDATION_FAILED";
                await supabase
                    .from("incidents")
                    .update({ status: "pending_approval" })
                    .eq("id", incidentId);
                console.warn(`[VALIDATION FAILED] ${toolRequest.name}: ${(err as Error).message}`);
                toolResult = { message: `Validation failed: ${(err as Error).message}` };
            } else {
                toolActionTaken = "TOOL_ERROR";
                await supabase
                    .from("incidents")
                    .update({ status: "failed" })
                    .eq("id", incidentId);
                toolResult = { message: `Tool error: ${(err as Error).message}` };
            }

            await logAgentStep(supabase, incidentId, "tool_blocked", {
                tool_call: toolRequest as Record<string, unknown>,
                tool_result: toolResult,
            });
        }

        await logAuditEntry(
            supabase,
            incidentId,
            toolActionTaken,
            toolRequest.params as Record<string, unknown>,
            toolResult!,
            rcaResult.tokenUsage
        );
    }

    // ── Post-Mortem Generation ────────────────────────────────────
    try {
        const incidentSummary = `
Incident ID: ${incidentId}
Service: ${payload.source}
Severity: ${payload.severity}
Hypothesis: ${rcaResult.data.hypothesis}
Root Cause: ${rcaResult.data.root_cause}
Confidence: ${rcaResult.data.confidence}
Reasoning: ${rcaResult.data.reasoning}
Tool Used: ${toolRequest.name}
Total Duration: ${Date.now() - startMs}ms
    `.trim();

        const { content: reportContent, tokenUsage: reportTokens } = await generatePostMortem(
            incidentId,
            incidentSummary
        );

        await supabase.from("reports").insert({
            incident_id: incidentId,
            content: reportContent,
            is_complete: true,
        });

        await logAuditEntry(
            supabase,
            incidentId,
            "post_mortem_generated",
            null,
            { chars: reportContent.length } as unknown as ToolResult,
            reportTokens
        );

        console.log(`[POST-MORTEM] Generated. Total elapsed=${Date.now() - startMs}ms`);
    } catch (err) {
        console.error("[POST-MORTEM ERROR]", err);
        // Non-fatal — incident already processed
    }

    return new Response(
        JSON.stringify({
            status: "processed",
            incident_id: incidentId,
            elapsed_ms: Date.now() - startMs,
        }),
        { status: 200, headers: { "Content-Type": "application/json" } }
    );
});
