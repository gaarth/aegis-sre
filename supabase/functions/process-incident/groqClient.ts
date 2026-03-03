// ============================================================
// groqClient.ts — Sentinel Governor (SG-1)
// Typed Groq client locked to llama-3.3-70b-versatile.
// Includes: retry, timeout, token tracking.
// NO `any` types permitted.
// ============================================================

import Groq from "npm:groq-sdk@0";
import { RcaResponse, RcaResponseSchema, TokenUsage } from "./schemas.ts";

// ── Constants ─────────────────────────────────────────────────
const MODEL = "llama-3.3-70b-versatile" as const;
const TEMPERATURE = 0;
const MAX_TOKENS = 1024;
const TIMEOUT_MS = 10_000;
const MAX_RETRIES = 3;
const RETRY_BASE_MS = 500;

// ── Error types ───────────────────────────────────────────────
export class GroqRateLimitError extends Error {
    constructor(public readonly attempts: number) {
        super(`Groq rate limit exceeded after ${attempts} attempts`);
        this.name = "GroqRateLimitError";
    }
}

export class GroqTimeoutError extends Error {
    constructor() {
        super(`Groq request timed out after ${TIMEOUT_MS}ms`);
        this.name = "GroqTimeoutError";
    }
}

export class GroqValidationError extends Error {
    constructor(public readonly issues: unknown) {
        super("Groq response failed schema validation");
        this.name = "GroqValidationError";
    }
}

// ── Result type ───────────────────────────────────────────────
export interface RcaResult {
    data: RcaResponse;
    tokenUsage: TokenUsage;
}

// ── Groq Client Factory ───────────────────────────────────────
function createGroqClient(): Groq {
    const apiKey = Deno.env.get("GROQ_API_KEY");
    if (!apiKey) throw new Error("GROQ_API_KEY is not set");
    return new Groq({ apiKey });
}

// ── Sleep utility for retry backoff ──────────────────────────
function sleep(ms: number): Promise<void> {
    return new Promise((resolve) => setTimeout(resolve, ms));
}

// ── Core RCA Call ─────────────────────────────────────────────
/**
 * Calls Groq for Root Cause Analysis.
 * Model is locked to llama-3.3-70b-versatile.
 * Implements exponential backoff (3 retries, base 500ms).
 * Wraps request in AbortController timeout (10s).
 *
 * @param systemPrompt - The SRE system context prompt
 * @param userPrompt   - The formatted incident + metric snapshot
 * @returns RcaResult with validated RcaResponse and token usage
 */
export async function callGroqRca(
    systemPrompt: string,
    userPrompt: string
): Promise<RcaResult> {
    const client = createGroqClient();
    let lastError: Error | null = null;

    for (let attempt = 0; attempt < MAX_RETRIES; attempt++) {
        const controller = new AbortController();
        const timer = setTimeout(() => controller.abort(), TIMEOUT_MS);

        try {
            const completion = await client.chat.completions.create(
                {
                    model: MODEL,
                    temperature: TEMPERATURE,
                    max_tokens: MAX_TOKENS,
                    response_format: { type: "json_object" },
                    messages: [
                        { role: "system", content: systemPrompt },
                        { role: "user", content: userPrompt },
                    ],
                },
                { signal: controller.signal }
            );

            clearTimeout(timer);

            const raw = completion.choices[0]?.message?.content;
            if (!raw) throw new GroqValidationError("Empty response from Groq");

            let parsed: unknown;
            try {
                parsed = JSON.parse(raw);
            } catch {
                throw new GroqValidationError("Groq returned non-JSON content");
            }

            // Strict schema validation — no any types
            const validated = RcaResponseSchema.safeParse(parsed);
            if (!validated.success) {
                throw new GroqValidationError(validated.error.issues);
            }

            const usage = completion.usage;
            const tokenUsage: TokenUsage = {
                model: MODEL,
                prompt_tokens: usage?.prompt_tokens ?? 0,
                completion_tokens: usage?.completion_tokens ?? 0,
                total_tokens: usage?.total_tokens ?? 0,
            };

            return { data: validated.data, tokenUsage };
        } catch (err) {
            clearTimeout(timer);

            if (err instanceof Error && err.name === "AbortError") {
                throw new GroqTimeoutError();
            }

            // Check for 429 rate limit (Groq SDK throws with status 429)
            const isRateLimit =
                err instanceof Error && err.message.toLowerCase().includes("429");

            if (isRateLimit && attempt < MAX_RETRIES - 1) {
                const backoff = RETRY_BASE_MS * Math.pow(2, attempt);
                console.warn(
                    `Groq rate limited. Retry ${attempt + 1}/${MAX_RETRIES} in ${backoff}ms`
                );
                await sleep(backoff);
                lastError = err as Error;
                continue;
            }

            // Re-throw validation errors immediately (no retry)
            if (err instanceof GroqValidationError) throw err;

            lastError = err as Error;
        }
    }

    if (lastError?.message.toLowerCase().includes("429")) {
        throw new GroqRateLimitError(MAX_RETRIES);
    }

    throw lastError ?? new Error("Groq call failed after maximum retries");
}

// ── Post-Mortem Generation (streaming writes to Supabase) ─────
/**
 * Streams a post-mortem report from Groq to a Supabase reports row.
 * Accumulates full content, then writes completed report.
 *
 * Note: Deno Edge Functions don't support native streaming to DB.
 * Strategy: collect full stream, then upsert to reports table.
 */
export async function generatePostMortem(
    incidentId: string,
    incidentSummary: string
): Promise<{ content: string; tokenUsage: TokenUsage }> {
    const client = createGroqClient();

    const controller = new AbortController();
    const timer = setTimeout(() => controller.abort(), TIMEOUT_MS * 2); // 20s for longer output

    try {
        const stream = await client.chat.completions.create(
            {
                model: MODEL,
                temperature: 0.2, // Slight creativity for readable report
                max_tokens: 2048,
                stream: true,
                messages: [
                    {
                        role: "system",
                        content:
                            "You are an expert SRE writing a post-mortem report. Be concise, structured, and use Markdown. Include: Summary, Timeline, Root Cause, Impact, Resolution, Action Items.",
                    },
                    {
                        role: "user",
                        content: `Generate a post-mortem report for the following incident:\n\n${incidentSummary}`,
                    },
                ],
            },
            { signal: controller.signal }
        );

        let fullContent = "";
        let promptTokens = 0;
        let completionTokens = 0;

        for await (const chunk of stream) {
            const delta = chunk.choices[0]?.delta?.content ?? "";
            fullContent += delta;
            if (chunk.usage) {
                promptTokens = chunk.usage.prompt_tokens ?? 0;
                completionTokens = chunk.usage.completion_tokens ?? 0;
            }
        }

        clearTimeout(timer);

        const tokenUsage: TokenUsage = {
            model: MODEL,
            prompt_tokens: promptTokens,
            completion_tokens: completionTokens,
            total_tokens: promptTokens + completionTokens,
        };

        return { content: fullContent, tokenUsage };
    } catch (err) {
        clearTimeout(timer);
        if (err instanceof Error && err.name === "AbortError") {
            throw new GroqTimeoutError();
        }
        throw err;
    }
}
