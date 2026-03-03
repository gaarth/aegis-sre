// ============================================================
// toolRegistry.ts — Sentinel Governor (SG-1)
// Hard-coded TypeScript Tool Registry.
// Maps LLM JSON tool names → actual API calls.
// NO delete/destroy tools. Safe-by-omission.
// All tools run in DRY_RUN mode (TOOL_DRY_RUN=true).
// NO `any` types permitted.
// ============================================================

import {
    GetMetricsParams,
    GetMetricsParamsSchema,
    ScaleWorkloadParams,
    ScaleWorkloadParamsSchema,
    ThrottleJobsParams,
    ThrottleJobsParamsSchema,
    ToolCall,
} from "./schemas.ts";

// ── Tool Result types ─────────────────────────────────────────
export interface MetricsResult {
    service: string;
    cpu_percent: number;
    memory_percent: number;
    rps: number;
    error_rate: number;
    latency_p99_ms: number;
    window_minutes: number;
    timestamp: string;
}

export interface ScaleResult {
    success: boolean;
    deployment: string;
    namespace: string;
    previous_replicas: number;
    new_replicas: number;
    message: string;
}

export interface ThrottleResult {
    success: boolean;
    service: string;
    throttle_percent: number;
    message: string;
}

export type ToolResult = MetricsResult | ScaleResult | ThrottleResult | { message: string };

// ── Tool validation error ─────────────────────────────────────
export class ToolValidationError extends Error {
    constructor(
        public readonly toolName: string,
        public readonly issues: unknown
    ) {
        super(`Tool '${toolName}' parameter validation failed`);
        this.name = "ToolValidationError";
    }
}

export class UnknownToolError extends Error {
    constructor(public readonly toolName: string) {
        super(`Tool '${toolName}' is not in the allowlist (safe-by-omission)`);
        this.name = "UnknownToolError";
    }
}

// ── ALLOWLIST ─────────────────────────────────────────────────
// Only these tool names can be executed. Anything else is blocked.
const TOOL_ALLOWLIST = new Set(["get_metrics", "scale_workload", "throttle_jobs"]);

// ── Tool implementations ──────────────────────────────────────

/**
 * get_metrics — Returns current service metrics.
 * Always runs as dry-run stub returning realistic mock data.
 */
async function get_metrics(rawParams: Record<string, unknown>): Promise<MetricsResult> {
    const parsed = GetMetricsParamsSchema.safeParse(rawParams);
    if (!parsed.success) throw new ToolValidationError("get_metrics", parsed.error.issues);

    const params: GetMetricsParams = parsed.data;

    console.log(`[DRY RUN] get_metrics: ${params.service} (${params.window_minutes}m)`);
    return {
        service: params.service,
        cpu_percent: Math.random() * 100,
        memory_percent: Math.random() * 100,
        rps: Math.floor(Math.random() * 5000),
        error_rate: Math.random() * 0.1,
        latency_p99_ms: Math.floor(Math.random() * 2000),
        window_minutes: params.window_minutes,
        timestamp: new Date().toISOString(),
    };
}

/**
 * scale_workload — Simulates scaling a deployment.
 * Always runs as dry-run stub.
 */
async function scale_workload(rawParams: Record<string, unknown>): Promise<ScaleResult> {
    const parsed = ScaleWorkloadParamsSchema.safeParse(rawParams);
    if (!parsed.success) throw new ToolValidationError("scale_workload", parsed.error.issues);

    const params: ScaleWorkloadParams = parsed.data;

    console.log(
        `[DRY RUN] scale_workload: ${params.namespace}/${params.deployment} +${params.replica_delta}`
    );
    return {
        success: true,
        deployment: params.deployment,
        namespace: params.namespace,
        previous_replicas: 2,
        new_replicas: 2 + params.replica_delta,
        message: "[DRY RUN] Would scale deployment",
    };
}

/**
 * throttle_jobs — Simulates throttling a service.
 * Always runs as dry-run stub.
 */
async function throttle_jobs(rawParams: Record<string, unknown>): Promise<ThrottleResult> {
    const parsed = ThrottleJobsParamsSchema.safeParse(rawParams);
    if (!parsed.success) throw new ToolValidationError("throttle_jobs", parsed.error.issues);

    const params: ThrottleJobsParams = parsed.data;

    console.log(
        `[DRY RUN] throttle_jobs: ${params.service} at ${params.throttle_percent}%`
    );
    return {
        success: true,
        service: params.service,
        throttle_percent: params.throttle_percent,
        message: `[DRY RUN] Would throttle ${params.service} to ${params.throttle_percent}%`,
    };
}

// ── Fallback safe action ──────────────────────────────────────
/**
 * fallback_to_safe_replicas — Called when Groq is unavailable.
 * Scales any critical service up by 1 replica as a safe default.
 */
export async function fallback_to_safe_replicas(
    source: string
): Promise<ScaleResult> {
    console.warn(`[FALLBACK] Groq unavailable. Executing safe replica scale for ${source}`);
    return await scale_workload({
        deployment: source,
        namespace: "default",
        replica_delta: 1,
    });
}

// ── Registry Dispatcher ───────────────────────────────────────
/**
 * executeToolCall — Validates allowlist, validates params, executes tool.
 * Returns ToolResult on success.
 * Throws UnknownToolError or ToolValidationError on failure.
 * Never executes tools not in TOOL_ALLOWLIST.
 */
export async function executeToolCall(toolCall: ToolCall): Promise<ToolResult> {
    if (toolCall.name === "none") {
        return { message: "No tool action required" };
    }

    if (!TOOL_ALLOWLIST.has(toolCall.name)) {
        throw new UnknownToolError(toolCall.name);
    }

    const params = toolCall.params as Record<string, unknown>;

    switch (toolCall.name) {
        case "get_metrics":
            return await get_metrics(params);
        case "scale_workload":
            return await scale_workload(params);
        case "throttle_jobs":
            return await throttle_jobs(params);
        default: {
            // TypeScript exhaustiveness check
            const _exhaustive: never = toolCall.name;
            throw new UnknownToolError(String(_exhaustive));
        }
    }
}
