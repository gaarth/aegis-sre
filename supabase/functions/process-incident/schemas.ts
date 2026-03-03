// ============================================================
// schemas.ts — Sentinel Governor (SG-1)
// Zod schemas for all Groq inputs and outputs.
// NO `any` types permitted.
// ============================================================

import { z } from "npm:zod@3";

// ── Incoming webhook payload ──────────────────────────────────
export const WebhookPayloadSchema = z.object({
  /** Source service name */
  source: z.string().min(1),
  /** Initial alert severity */
  severity: z.enum(["critical", "warning", "info"]),
  /** Idempotency key — unique per alert firing */
  idempotency_key: z.string().min(1),
  /** Raw metric/log snapshot */
  metadata: z
    .object({
      cpu_percent: z.number().optional(),
      memory_percent: z.number().optional(),
      rps: z.number().optional(),
      error_rate: z.number().optional(),
      latency_p99_ms: z.number().optional(),
    })
    .passthrough(),
});

export type WebhookPayload = z.infer<typeof WebhookPayloadSchema>;

// ── Tool call within a Groq response ─────────────────────────
export const ToolCallSchema = z.object({
  name: z.enum(["get_metrics", "scale_workload", "throttle_jobs", "none"]),
  params: z.record(z.unknown()),
});

export type ToolCall = z.infer<typeof ToolCallSchema>;

// ── Full Groq RCA response ────────────────────────────────────
export const RcaResponseSchema = z.object({
  hypothesis: z.string().min(1),
  root_cause: z.string().min(1),
  confidence: z.number().min(0).max(1),
  reasoning: z.string(),
  tool_request: ToolCallSchema,
});

export type RcaResponse = z.infer<typeof RcaResponseSchema>;

// ── Tool params schemas ───────────────────────────────────────
export const GetMetricsParamsSchema = z.object({
  service: z.string().min(1),
  window_minutes: z.number().int().min(1).max(60),
});

export const ScaleWorkloadParamsSchema = z.object({
  deployment: z.string().min(1),
  namespace: z.string().min(1),
  replica_delta: z.number().int().min(1).max(10),
});

export const ThrottleJobsParamsSchema = z.object({
  service: z.string().min(1),
  throttle_percent: z.number().min(0).max(100),
});

export type GetMetricsParams = z.infer<typeof GetMetricsParamsSchema>;
export type ScaleWorkloadParams = z.infer<typeof ScaleWorkloadParamsSchema>;
export type ThrottleJobsParams = z.infer<typeof ThrottleJobsParamsSchema>;

// ── Token usage tracking ──────────────────────────────────────
export const TokenUsageSchema = z.object({
  model: z.string(),
  prompt_tokens: z.number().int().nonnegative(),
  completion_tokens: z.number().int().nonnegative(),
  total_tokens: z.number().int().nonnegative(),
});

export type TokenUsage = z.infer<typeof TokenUsageSchema>;
