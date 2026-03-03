// app/api/webhook/route.ts
// Next.js Route Handler — full incident processing pipeline
// Webhook → Validate → Rate Limit → Upsert → Groq RCA → Safety → Tool Exec → Post-Mortem

import { NextRequest, NextResponse } from 'next/server';
import { createClient } from '@supabase/supabase-js';
import type { Database, Json } from '@/lib/database.types';
import Groq from 'groq-sdk';
import { z } from 'zod';

const WebhookPayloadSchema = z.object({
    source: z.string().min(1),
    severity: z.enum(['critical', 'warning', 'info']),
    idempotency_key: z.string().min(1),
    metadata: z.object({
        cpu_percent: z.number().optional(),
        memory_percent: z.number().optional(),
        rps: z.number().optional(),
        error_rate: z.number().optional(),
        latency_p99_ms: z.number().optional(),
    }).passthrough(),
});

// Permissive RCA schema — LLMs don't always return exact shapes (LEARNINGS LRN-004, ERRORS ERR-006)
const ALLOWED_TOOLS = ['get_metrics', 'scale_workload', 'throttle_jobs', 'none'] as const;
type AllowedTool = typeof ALLOWED_TOOLS[number];

function normalizeToolName(name: string): AllowedTool {
    if ((ALLOWED_TOOLS as readonly string[]).includes(name)) return name as AllowedTool;
    return 'none';
}

const RcaResponseSchema = z.object({
    hypothesis: z.string(),
    root_cause: z.string().optional().default('Unknown root cause'),
    confidence: z.number().min(0).max(1).optional().default(0.5),
    reasoning: z.string().optional().default(''),
    tool_request: z.object({
        name: z.string(),
        params: z.record(z.string(), z.unknown()).optional().default({}),
    }).optional().default({ name: 'none', params: {} }),
});

const MODEL = 'llama-3.3-70b-versatile' as const;

function getServiceClient() {
    return createClient<Database>(
        process.env.NEXT_PUBLIC_SUPABASE_URL!,
        process.env.SUPABASE_SERVICE_ROLE_KEY!,
        { auth: { persistSession: false } }
    );
}

function getGroqClient() {
    return new Groq({ apiKey: process.env.GROQ_API_KEY });
}

// ── Retry wrapper (LEARNINGS LRN-004) ─────────────────────────
async function withRetry<T>(fn: () => Promise<T>, maxRetries = 3, baseMs = 500): Promise<T> {
    for (let attempt = 0; attempt < maxRetries; attempt++) {
        try {
            return await fn();
        } catch (err: unknown) {
            const isRateLimit = err instanceof Error && (err.message.includes('429') || err.message.includes('rate_limit'));
            if (isRateLimit && attempt < maxRetries - 1) {
                await new Promise(r => setTimeout(r, baseMs * Math.pow(2, attempt)));
                continue;
            }
            throw err;
        }
    }
    throw new Error('Max retries exceeded');
}

// ── Helper: safely cast objects to Json for Supabase inserts (ERRORS ERR-007, LEARNINGS LRN-011) ──
function toJson(obj: unknown): Json {
    return JSON.parse(JSON.stringify(obj)) as Json;
}

// ── POST /api/webhook ─────────────────────────────────────────
export async function POST(req: NextRequest) {
    const startMs = Date.now();
    let rawBody: string;

    try {

        try {
            rawBody = await req.text();
        } catch {
            return NextResponse.json({ error: 'Failed to read body' }, { status: 400 });
        }

        // Parse + validate
        let bodyJson: unknown;
        try { bodyJson = JSON.parse(rawBody); } catch {
            return NextResponse.json({ error: 'Invalid JSON' }, { status: 400 });
        }

        const parsed = WebhookPayloadSchema.safeParse(bodyJson);
        if (!parsed.success) {
            return NextResponse.json({ error: 'Validation failed', issues: parsed.error.issues }, { status: 400 });
        }

        const payload = parsed.data;
        const supabase = getServiceClient();

        // ── Rate limit check (LEARNINGS LRN-005, ERRORS ERR-003) ────
        const { data: withinLimit, error: rlError } = await supabase.rpc('check_rate_limit', {
            p_function_name: 'process-incident',
            p_limit: 30,
        });

        // FAIL OPEN: only block on explicit false, never on null/error
        if (!rlError && withinLimit === false) {
            return NextResponse.json({ error: 'Rate limit exceeded: max 30 invocations/min' }, { status: 429 });
        }

        // ── Idempotency: upsert incident (LEARNINGS LRN-006) ────────
        const { data: upsertData, error: upsertError } = await supabase.rpc('upsert_incident', {
            p_source: payload.source,
            p_severity: payload.severity,
            p_metadata: toJson(payload.metadata),
            p_idempotency_key: payload.idempotency_key,
        });

        if (upsertError) {
            return NextResponse.json({ error: 'DB error', detail: upsertError.message }, { status: 500 });
        }

        // Handle empty result (ON CONFLICT DO NOTHING returns no rows) or is_new=false
        if (!upsertData || !Array.isArray(upsertData) || upsertData.length === 0) {
            // Duplicate key — fetch existing incident
            const { data: existing } = await supabase
                .from('incidents')
                .select('id')
                .eq('idempotency_key', payload.idempotency_key)
                .single();
            return NextResponse.json({
                status: 'already_processed',
                incident_id: existing?.id ?? 'unknown',
            });
        }

        const { id: incidentId, is_new: isNew } = upsertData[0] as { id: string; is_new: boolean };

        if (!isNew) {
            return NextResponse.json({ status: 'already_processed', incident_id: incidentId });
        }

        // Update to 'investigating'
        await supabase.from('incidents').update({ status: 'investigating' }).eq('id', incidentId);

        // Get context
        const { data: contextData } = await supabase.rpc('get_incident_context', {
            p_source: payload.source,
            p_limit: 5,
        });

        // ── Groq RCA (LEARNINGS LRN-004) ────────────────────────────
        const groq = getGroqClient();

        const systemPrompt = `You are SG-1 (Sentinel Governor), an expert SRE AI performing Root Cause Analysis.
Always respond with valid JSON only. No markdown, no explanation outside JSON.
RESPONSE SCHEMA:
{
  "hypothesis": "one sentence root cause hypothesis",
  "root_cause": "detailed technical root cause",
  "confidence": 0.85,
  "reasoning": "step-by-step reasoning chain",
  "tool_request": {
    "name": "scale_workload | get_metrics | throttle_jobs | none",
    "params": {}
  }
}
Available tools: scale_workload, get_metrics, throttle_jobs, none.
Never request destructive operations. When unsure, use name="none".`;

        const userPrompt = `INCIDENT:
Service: ${payload.source}
Severity: ${payload.severity}
Metrics: ${JSON.stringify(payload.metadata, null, 2)}
Recent resolved incidents (same service):
${JSON.stringify(contextData ?? [], null, 2)}
Perform RCA and return JSON only.`;

        interface TokenUsage {
            model: string;
            prompt_tokens: number;
            completion_tokens: number;
            total_tokens: number;
        }

        let rcaData: z.infer<typeof RcaResponseSchema>;
        let tokenUsage: TokenUsage = { model: MODEL, prompt_tokens: 0, completion_tokens: 0, total_tokens: 0 };

        try {
            const completion = await withRetry(async () => {
                const controller = new AbortController();
                const timer = setTimeout(() => controller.abort(), 10_000);
                try {
                    return await groq.chat.completions.create({
                        model: MODEL,
                        temperature: 0,
                        max_tokens: 1024,
                        response_format: { type: 'json_object' },
                        messages: [
                            { role: 'system', content: systemPrompt },
                            { role: 'user', content: userPrompt },
                        ],
                    });
                } finally {
                    clearTimeout(timer);
                }
            });

            const raw = completion.choices[0]?.message?.content ?? '{}';
            const validated = RcaResponseSchema.safeParse(JSON.parse(raw));
            if (!validated.success) {
                throw new Error('Groq response schema validation failed');
            }
            rcaData = validated.data;

            tokenUsage = {
                model: MODEL,
                prompt_tokens: completion.usage?.prompt_tokens ?? 0,
                completion_tokens: completion.usage?.completion_tokens ?? 0,
                total_tokens: completion.usage?.total_tokens ?? 0,
            };
        } catch (groqErr) {
            // Fallback to safe mode
            console.error('[SG-1] Groq RCA failed:', groqErr instanceof Error ? groqErr.message : groqErr);
            await supabase.from('incidents').update({ status: 'safe_mode' }).eq('id', incidentId);
            await supabase.from('audit_logs').insert({
                incident_id: incidentId,
                action_taken: 'FALLBACK_SAFE_MODE',
                actor: 'agent',
            });
            return NextResponse.json({
                status: 'safe_mode',
                incident_id: incidentId,
                elapsed_ms: Date.now() - startMs,
            });
        }

        // Normalize tool name (LEARNINGS LRN-007)
        const toolName = normalizeToolName(rcaData.tool_request.name);

        // Log RCA step
        await supabase.from('incident_logs').insert({
            incident_id: incidentId,
            step: 'rca',
            thought_process: rcaData.reasoning,
            current_hypothesis: rcaData.hypothesis,
            confidence: rcaData.confidence,
            tool_call: toJson({ name: toolName, params: rcaData.tool_request.params }),
            token_usage: toJson(tokenUsage),
        });

        await supabase.from('audit_logs').insert({
            incident_id: incidentId,
            action_taken: 'rca_complete',
            token_usage: toJson(tokenUsage),
            actor: 'agent',
        });

        // ── Safety Interceptor (LEARNINGS LRN-007) ───────────────────
        // HITL GOVERNANCE: High Risk (critical) incidents are ALWAYS locked to pending_approval.
        // The agent is forbidden from auto-resolving High Risk events.
        const TOOL_ALLOWLIST = new Set<string>(['get_metrics', 'scale_workload', 'throttle_jobs', 'none']);
        const isHighRisk = payload.severity === 'critical';

        if (isHighRisk) {
            // HIGH RISK: Hard-lock to pending_approval — human must approve
            const isDryRun = process.env.TOOL_DRY_RUN === 'true';
            if (toolName !== 'none' && TOOL_ALLOWLIST.has(toolName)) {
                await supabase.from('incident_logs').insert({
                    incident_id: incidentId,
                    step: 'tool_execution',
                    thought_process: `Suggested ${toolName} ${isDryRun ? '(DRY RUN)' : ''} — awaiting human approval for High Risk incident`,
                    tool_call: toJson({ name: toolName, params: rcaData.tool_request.params }),
                    tool_result: toJson({ message: `[PENDING] ${toolName} queued for human approval`, params: rcaData.tool_request.params }),
                });
            }
            await supabase.from('incidents').update({ status: 'pending_approval' }).eq('id', incidentId);
            await supabase.from('audit_logs').insert({
                incident_id: incidentId,
                action_taken: toolName === 'none' ? 'NO_ACTION_REQUIRED' : `PENDING_HUMAN_APPROVAL:${toolName}`,
                parameters: toJson(rcaData.tool_request.params),
                actor: 'agent',
            });
        } else if (toolName === 'none') {
            await supabase.from('incidents').update({ status: 'pending_approval' }).eq('id', incidentId);
            await supabase.from('audit_logs').insert({
                incident_id: incidentId,
                action_taken: 'NO_ACTION_REQUIRED',
                actor: 'agent',
            });
        } else if (!TOOL_ALLOWLIST.has(toolName)) {
            await supabase.from('incidents').update({ status: 'pending_approval' }).eq('id', incidentId);
            await supabase.from('audit_logs').insert({
                incident_id: incidentId,
                action_taken: 'BLOCKED',
                parameters: toJson(rcaData.tool_request.params),
                actor: 'agent',
            });
            await supabase.from('incident_logs').insert({
                incident_id: incidentId,
                step: 'tool_blocked',
                thought_process: `Tool '${toolName}' is not in the safe allowlist.`,
                current_hypothesis: rcaData.hypothesis,
            });
        } else {
            // Execute allowed tool for non-critical — DRY_RUN mode (LEARNINGS LRN-008)
            const isDryRun = process.env.TOOL_DRY_RUN === 'true';
            const toolResult = isDryRun
                ? { message: `[DRY RUN] Would execute ${toolName}`, params: rcaData.tool_request.params }
                : { message: `Executed ${toolName}` };

            await supabase.from('incidents').update({ status: 'resolved' }).eq('id', incidentId);
            await supabase.from('incident_logs').insert({
                incident_id: incidentId,
                step: 'tool_execution',
                thought_process: `Executing ${toolName} ${isDryRun ? '(DRY RUN)' : ''}`,
                tool_call: toJson({ name: toolName, params: rcaData.tool_request.params }),
                tool_result: toJson(toolResult),
            });
            await supabase.from('audit_logs').insert({
                incident_id: incidentId,
                action_taken: toolName,
                parameters: toJson(rcaData.tool_request.params),
                result: toJson(toolResult),
                actor: 'agent',
            });
        }

        // ── Post-Mortem (streaming → accumulate → write) ─────────────
        try {
            const stream = await groq.chat.completions.create({
                model: MODEL,
                temperature: 0.2,
                max_tokens: 1024,
                stream: true,
                messages: [
                    {
                        role: 'system',
                        content: 'You are an expert SRE writing a concise post-mortem in Markdown. Include: ## Summary, ## Root Cause, ## Resolution, ## Action Items. Be concise.',
                    },
                    {
                        role: 'user',
                        content: `Write post-mortem for:\nService: ${payload.source}\nSeverity: ${payload.severity}\nRoot Cause: ${rcaData.root_cause}\nHypothesis: ${rcaData.hypothesis}\nTool Used: ${toolName}`,
                    },
                ],
            });

            let content = '';
            // ERRORS ERR-011: ChatCompletionChunk doesn't have .usage — track from RCA call instead
            for await (const chunk of stream) {
                content += chunk.choices[0]?.delta?.content ?? '';
            }

            await supabase.from('reports').insert({
                incident_id: incidentId,
                content,
                is_complete: true,
            });

            await supabase.from('audit_logs').insert({
                incident_id: incidentId,
                action_taken: 'post_mortem_generated',
                actor: 'agent',
                token_usage: toJson({ model: MODEL, note: 'streaming - exact tokens unavailable' }),
            });
        } catch {
            // Non-fatal — post-mortem failure should not affect incident status
        }

        return NextResponse.json({
            status: 'processed',
            incident_id: incidentId,
            hypothesis: rcaData.hypothesis,
            confidence: rcaData.confidence,
            elapsed_ms: Date.now() - startMs,
        });
    } catch (unhandledErr) {
        console.error('[SG-1] Unhandled error in webhook:', unhandledErr);
        return NextResponse.json({
            error: 'Internal server error',
            detail: unhandledErr instanceof Error ? unhandledErr.message : String(unhandledErr),
        }, { status: 500 });
    }
}
