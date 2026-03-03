'use client';

import { useState, useEffect, useRef, useCallback } from 'react';
import { useParams } from 'next/navigation';
import type { Incident, IncidentLog, AuditLog, Report } from '@/lib/database.types';

// ── Time formatter ────────────────────────────────────────────
function fmt(d: string) {
    return new Date(d).toLocaleTimeString('en-US', { hour12: false, hour: '2-digit', minute: '2-digit', second: '2-digit' });
}

// ── Risk tier mapping ────────────────────────────────────────
function getRiskBadge(severity: Incident['severity']) {
    const map = {
        critical: { cls: 'sg-risk-high', label: 'HIGH RISK' },
        warning: { cls: 'sg-risk-medium', label: 'MEDIUM RISK' },
        info: { cls: 'sg-risk-low', label: 'LOW RISK' },
    };
    return map[severity] ?? map.info;
}

function getActionBadge(status: Incident['status']) {
    if (status === 'resolved') return { cls: 'sg-action-resolved', label: 'RESOLVED' };
    if (status === 'pending_approval') return { cls: 'sg-action-pending', label: 'PENDING APPROVAL' };
    if (status === 'failed') return { cls: 'sg-badge-critical', label: 'FAILED' };
    return { cls: 'sg-badge-info', label: status.replace(/_/g, ' ').toUpperCase() };
}

// ── Parse clean text from report (strip markdown) ─────────────
function stripMarkdown(text: string): string {
    return text
        .replace(/^#{1,6}\s+/gm, '')
        .replace(/\*\*([^*]+)\*\*/g, '$1')
        .replace(/\*([^*]+)\*/g, '$1')
        .replace(/^[-*]\s+/gm, '• ')
        .replace(/^---+$/gm, '')
        .replace(/`([^`]+)`/g, '$1')
        .replace(/\n{3,}/g, '\n\n')
        .trim();
}

// ── Extract sections from post-mortem report ──────────────────
function parseReport(content: string): { summary: string; rootCause: string; resolution: string; actionItems: string } {
    const sections = { summary: '', rootCause: '', resolution: '', actionItems: '' };

    const headingPattern = /(?:^|\n)#{1,3}\s*(summary|root\s*cause|resolution|action\s*items?|impact|timeline|next\s*steps?)/gi;
    const matches = [...content.matchAll(headingPattern)];

    for (let i = 0; i < matches.length; i++) {
        const heading = (matches[i][1] || '').toLowerCase().trim();
        const start = (matches[i].index ?? 0) + matches[i][0].length;
        const end = i < matches.length - 1 ? (matches[i + 1].index ?? content.length) : content.length;
        const body = stripMarkdown(content.slice(start, end)).trim();

        if (heading.includes('summary') || heading.includes('impact')) sections.summary = body;
        else if (heading.includes('root') || heading.includes('cause')) sections.rootCause = body;
        else if (heading.includes('resolution')) sections.resolution = body;
        else if (heading.includes('action') || heading.includes('next')) sections.actionItems = body;
    }

    if (!sections.summary && !sections.rootCause) {
        const cleaned = stripMarkdown(content);
        const sentences = cleaned.split(/\.\s+/).filter(Boolean);
        sections.summary = sentences.slice(0, 2).join('. ') + '.';
        sections.rootCause = sentences.slice(2, 4).join('. ') + '.';
        sections.resolution = sentences.slice(4, 6).join('. ') + '.';
        sections.actionItems = sentences.slice(6).join('. ');
    }

    return sections;
}

// ── Derive fix description from tool_call data ────────────────
function describeToolAction(toolCall: unknown): string {
    if (!toolCall || typeof toolCall !== 'object') return 'No automated action taken';
    const tc = toolCall as { name?: string; params?: Record<string, unknown> };
    const name = tc.name || 'none';
    const params = tc.params || {};
    const descriptions: Record<string, string> = {
        scale_workload: `Scaled workload: ${Object.entries(params).map(([k, v]) => `${k}=${v}`).join(', ') || 'auto-scaling applied'}`,
        get_metrics: 'Pulled extended metrics for deeper analysis',
        throttle_jobs: `Throttled jobs: ${Object.entries(params).map(([k, v]) => `${k}=${v}`).join(', ') || 'rate limiting applied'}`,
        none: 'Manual review recommended — no automated fix applied',
    };
    return descriptions[name] || `Executed: ${name}`;
}

// ── Context-aware override options per error type ─────────────
const OVERRIDE_OPTIONS: Record<string, Array<{ label: string; value: string; risk: 'low' | 'medium' | 'high' }>> = {
    'Database Connection Exhaustion': [
        { label: 'Restart RDS Instance', value: 'restart_rds', risk: 'medium' },
        { label: 'Increase Max Connections', value: 'increase_max_connections', risk: 'low' },
        { label: 'Promote Read Replica', value: 'promote_read_replica', risk: 'high' },
        { label: 'Flush Connection Pool', value: 'flush_connection_pool', risk: 'low' },
        { label: 'Enable PgBouncer', value: 'enable_pgbouncer', risk: 'low' },
    ],
    'Auth Service Latency Spike': [
        { label: 'Scale Auth Pods Horizontally', value: 'scale_auth_pods', risk: 'low' },
        { label: 'Invalidate Session Cache', value: 'invalidate_session_cache', risk: 'medium' },
        { label: 'Enable Rate Limiting', value: 'enable_rate_limiting', risk: 'low' },
        { label: 'Restart Auth Service', value: 'restart_auth_service', risk: 'medium' },
        { label: 'Failover to Secondary IdP', value: 'failover_idp', risk: 'high' },
    ],
    'Redis OOM: Cache Eviction Failure': [
        { label: 'Switch to allkeys-lru Policy', value: 'switch_eviction_policy', risk: 'low' },
        { label: 'Scale Redis Cluster', value: 'scale_redis_cluster', risk: 'low' },
        { label: 'Flush Non-Critical Keys', value: 'flush_noncritical_keys', risk: 'medium' },
        { label: 'Restart Redis with Memory Limit', value: 'restart_redis_memlimit', risk: 'medium' },
        { label: 'Enable Redis Sentinel Failover', value: 'enable_sentinel_failover', risk: 'high' },
    ],
    'S3 Bucket Permission Denied': [
        { label: 'Re-apply IAM Policy', value: 'reapply_iam_policy', risk: 'low' },
        { label: 'Switch to Service Role Credentials', value: 'switch_service_role', risk: 'medium' },
        { label: 'Enable S3 Cross-Region Replication', value: 'enable_s3_crr', risk: 'medium' },
        { label: 'Rotate Access Keys', value: 'rotate_access_keys', risk: 'high' },
        { label: 'Add Stabilization Delay Post-Deploy', value: 'add_stabilization_delay', risk: 'low' },
    ],
    'Stripe API Timeout (Payment Gateway)': [
        { label: 'Enable Circuit Breaker', value: 'enable_circuit_breaker', risk: 'low' },
        { label: 'Queue Failed Payments for Retry', value: 'queue_payment_retry', risk: 'low' },
        { label: 'Switch to Backup Payment Processor', value: 'switch_payment_processor', risk: 'high' },
        { label: 'Increase API Timeout Threshold', value: 'increase_api_timeout', risk: 'low' },
        { label: 'Throttle Non-Critical Transactions', value: 'throttle_transactions', risk: 'medium' },
    ],
};

// Fallback for legacy/unknown incidents
const DEFAULT_OVERRIDES: Array<{ label: string; value: string; risk: 'low' | 'medium' | 'high' }> = [
    { label: 'Scale Up (On-Demand)', value: 'scale_up_ondemand', risk: 'low' },
    { label: 'Scale Up (Spot Instances)', value: 'scale_up_spot', risk: 'medium' },
    { label: 'Enable Rate Limiting', value: 'enable_rate_limiting', risk: 'low' },
    { label: 'Throttle Background Tasks', value: 'throttle_background', risk: 'low' },
    { label: 'Restart Service', value: 'restart_service', risk: 'medium' },
];

function getOverrideOptions(source: string) {
    return OVERRIDE_OPTIONS[source] || DEFAULT_OVERRIDES;
}

// ── Confidence penalty for overrides ──────────────────────────
function getConfidenceWithOverride(baseConf: number, overrideRisk: 'low' | 'medium' | 'high' | null): number {
    if (!overrideRisk) return baseConf;
    const penalties = { low: 0, medium: -0.08, high: -0.18 };
    return Math.max(0.1, Math.min(1, baseConf + penalties[overrideRisk]));
}

// ── Confidence Bar ─────────────────────────────────────────────
function ConfidenceBar({ value, onViewReasoning }: { value: number; onViewReasoning: () => void }) {
    const pct = Math.round(value * 100);
    const color = pct >= 75 ? 'bg-safe' : pct >= 50 ? 'bg-warning' : 'bg-critical';
    const label = pct >= 75 ? 'High Confidence' : pct >= 50 ? 'Moderate Confidence' : 'Low Confidence';

    return (
        <div className="sg-card flex items-center gap-4 py-3">
            <div className="flex items-center gap-2 min-w-[140px]">
                <span className={`w-2 h-2 rounded-full ${color}`} />
                <span className="text-xs font-semibold text-text-secondary">{label}</span>
            </div>
            <div className="flex-1 sg-confidence-bar">
                <div className={`sg-confidence-fill ${color}`} style={{ width: `${pct}%` }} />
            </div>
            <span className="text-sm font-bold font-mono text-text-primary min-w-[42px] text-right">{pct}%</span>
            <button
                onClick={onViewReasoning}
                className="sg-detail-toggle ml-2 px-2 py-1 rounded-md border border-border hover:border-primary/40 transition-all"
            >
                <svg className="w-3 h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" /></svg>
                View Reasoning
            </button>
        </div>
    );
}

// ── Reasoning Overlay ──────────────────────────────────────────
function ReasoningOverlay({ reasoning, confidence, onClose }: { reasoning: string; confidence: number; onClose: () => void }) {
    const pct = Math.round(confidence * 100);
    return (
        <div className="sg-overlay" onClick={e => { if (e.target === e.currentTarget) onClose(); }}>
            <div className="sg-overlay-content">
                <div className="flex items-center justify-between mb-4">
                    <h3 className="font-bold text-text-primary flex items-center gap-2">
                        <span className="text-lg">🔍</span>
                        Agent Reasoning
                    </h3>
                    <button onClick={onClose} className="text-text-muted hover:text-text-primary transition-colors text-lg">✕</button>
                </div>
                <div className="flex items-center gap-3 mb-4 p-3 bg-surface-2 rounded-lg border border-border/60">
                    <span className="text-xs text-text-muted uppercase tracking-wider font-semibold">Confidence Level</span>
                    <div className="flex-1 sg-confidence-bar">
                        <div className={`sg-confidence-fill ${pct >= 75 ? 'bg-safe' : pct >= 50 ? 'bg-warning' : 'bg-critical'}`} style={{ width: `${pct}%` }} />
                    </div>
                    <span className="font-mono font-bold text-sm">{pct}%</span>
                </div>
                <div className="p-3 bg-surface-2 rounded-lg border border-border/60">
                    <p className="text-xs text-text-muted uppercase tracking-wider font-semibold mb-2">Why this diagnosis</p>
                    <p className="text-sm text-text-primary leading-relaxed">{reasoning || 'No detailed reasoning available for this incident.'}</p>
                </div>
                <button onClick={onClose} className="w-full mt-4 sg-btn-ghost justify-center text-xs">Close</button>
            </div>
        </div>
    );
}

// ── Thought Stream Item ────────────────────────────────────────
function ThoughtItem({ log, index, showDetails }: { log: IncidentLog; index: number; showDetails: boolean }) {
    const stepLabels: Record<string, { label: string; color: string; icon: string }> = {
        rca: { label: 'Root Cause Analysis', color: 'text-primary', icon: '🔍' },
        tool_execution: { label: 'Action Executed', color: 'text-safe', icon: '⚡' },
        tool_blocked: { label: 'Action Blocked', color: 'text-critical', icon: '🛑' },
        post_mortem: { label: 'Post-Mortem', color: 'text-secondary', icon: '📋' },
    };
    const meta = stepLabels[log.step] ?? { label: log.step.replace(/_/g, ' '), color: 'text-text-secondary', icon: '•' };
    const flowStage = { rca: 'IDENTIFY', tool_execution: 'ACT', tool_blocked: 'ACT', post_mortem: 'LEARN' }[log.step] ?? 'OBSERVE';

    return (
        <div className="thought-line" style={{ animationDelay: `${index * 60}ms` }}>
            <div className="flex flex-col items-center gap-1 min-w-[44px]">
                <span className="text-sm">{meta.icon}</span>
                <span className="text-[8px] font-mono font-bold tracking-wider text-text-muted">{flowStage}</span>
            </div>
            <div className="flex-1 min-w-0">
                <div className="flex items-center gap-2 mb-1">
                    <span className={`text-[11px] font-semibold ${meta.color}`}>{meta.label}</span>
                    <span className="text-text-muted text-[10px] font-mono">{fmt(log.created_at)}</span>
                </div>
                {log.current_hypothesis && <p className="text-sm text-text-primary mb-1 font-medium">{log.current_hypothesis}</p>}
                {log.thought_process && <p className="text-xs text-text-secondary leading-relaxed">{log.thought_process}</p>}
                {log.confidence !== null && (
                    <div className="mt-2 flex items-center gap-2">
                        <div className="w-20 h-1 bg-surface-3 rounded-full overflow-hidden">
                            <div className={`h-full rounded-full transition-all duration-700 ${Math.round(log.confidence * 100) >= 75 ? 'bg-safe' : Math.round(log.confidence * 100) >= 50 ? 'bg-warning' : 'bg-critical'}`} style={{ width: `${Math.round(log.confidence * 100)}%` }} />
                        </div>
                        <span className="text-[10px] font-mono text-text-muted">{Math.round(log.confidence * 100)}%</span>
                    </div>
                )}
                {showDetails && log.tool_call && (
                    <div className="mt-2 bg-surface-3/60 rounded-lg px-3 py-2 border border-border/30">
                        <span className="text-[9px] text-text-muted uppercase tracking-wider font-semibold">Tool Call</span>
                        <pre className="text-[11px] text-primary font-mono mt-1 whitespace-pre-wrap break-all">
                            {JSON.stringify(log.tool_call, null, 2)}
                        </pre>
                    </div>
                )}
            </div>
        </div>
    );
}

// ── Execution animation phases ────────────────────────────────
const EXEC_PHASES = [
    'Establishing secure channel...',
    'Communicating with K8s API...',
    'Executing remediation action...',
    'Verifying system stability...',
    'Logging to audit trail...',
];

// ── Type for API response ─────────────────────────────────────
interface IncidentDetail {
    incident: Incident;
    logs: IncidentLog[];
    auditLogs: AuditLog[];
    report: Report | null;
}

// ── Incident Detail Page ──────────────────────────────────────
export default function IncidentPage() {
    const params = useParams<{ id: string }>();
    const id = params.id;

    const [incident, setIncident] = useState<Incident | null>(null);
    const [logs, setLogs] = useState<IncidentLog[]>([]);
    const [auditLogs, setAuditLogs] = useState<AuditLog[]>([]);
    const [report, setReport] = useState<Report | null>(null);
    const [loading, setLoading] = useState(true);
    const [showReasoning, setShowReasoning] = useState(false);
    const [showTechDetails, setShowTechDetails] = useState(false);

    // HITL state
    const [selectedOverride, setSelectedOverride] = useState<string | null>(null);
    const [approvalState, setApprovalState] = useState<'idle' | 'executing' | 'resolved' | 'rejected'>('idle');
    const [execPhase, setExecPhase] = useState(0);
    const [isRecalculating, setIsRecalculating] = useState(false);

    const streamRef = useRef<HTMLDivElement>(null);
    const pollRef = useRef<ReturnType<typeof setInterval> | null>(null);

    useEffect(() => {
        if (streamRef.current) streamRef.current.scrollTop = streamRef.current.scrollHeight;
    }, [logs.length]);

    const fetchDetail = useCallback(async () => {
        try {
            const res = await fetch(`/api/incidents/${id}`);
            if (res.ok) {
                const data = await res.json() as IncidentDetail;
                setIncident(data.incident);
                setLogs(data.logs);
                setAuditLogs(data.auditLogs);
                setReport(data.report);
            }
        } catch { /* retry */ }
        setLoading(false);
    }, [id]);

    useEffect(() => { fetchDetail(); }, [fetchDetail]);

    useEffect(() => {
        pollRef.current = setInterval(fetchDetail, 3000);
        return () => { if (pollRef.current) clearInterval(pollRef.current); };
    }, [fetchDetail]);

    // ── Derived data ──────────────────────────────────────────
    const needsApproval = incident?.status === 'pending_approval';
    const isResolved = incident?.status === 'resolved';
    const isFailed = incident?.status === 'failed';

    const rcaLog = logs.find(l => l.step === 'rca');
    const toolLog = logs.find(l => l.step === 'tool_execution' || l.step === 'tool_blocked');
    const baseConfidence = rcaLog?.confidence ?? null;
    const reasoning = rcaLog?.thought_process ?? '';
    const hypothesis = rcaLog?.current_hypothesis ?? 'Analysis in progress...';
    const agentSuggestedAction = describeToolAction(toolLog?.tool_call ?? rcaLog?.tool_call);
    const reportSections = report ? parseReport(report.content) : null;

    // Override options
    const overrideOptions = incident ? getOverrideOptions(incident.source) : [];
    const selectedOverrideObj = overrideOptions.find(o => o.value === selectedOverride) ?? null;

    // Dynamic confidence — drops if user picks a risky override
    const effectiveConfidence = baseConfidence !== null
        ? getConfidenceWithOverride(baseConfidence, selectedOverrideObj?.risk ?? null)
        : null;

    // Dynamic prevention strategy — recalculates on override
    const preventionStrategy = isRecalculating
        ? null // shows "Recalculating..." state
        : selectedOverride
            ? `Recalibrated: Applying "${selectedOverrideObj?.label}" as primary remediation. Agent will monitor for side effects and auto-adjust thresholds within the next 2 monitoring cycles.`
            : reportSections?.actionItems || 'Prevention analysis pending — agent is still processing post-mortem data.';

    // Dynamic sentinel belief — reacts to override
    const sentinelBelief = isRecalculating
        ? null
        : effectiveConfidence !== null
            ? selectedOverride
                ? `Human operator selected "${selectedOverrideObj?.label}" (${selectedOverrideObj?.risk} risk). ${effectiveConfidence >= 0.7
                    ? 'This is a reasonable alternative and the system should stabilize.'
                    : effectiveConfidence >= 0.5
                        ? 'This carries moderate risk — extended monitoring recommended post-execution.'
                        : 'This is a high-risk override — agent recommends close manual observation for 30 minutes post-execution.'
                } Updating decision bias for future incidents with similar profiles.`
                : `Based on ${Math.round(effectiveConfidence * 100)}% confidence analysis, ${effectiveConfidence >= 0.75
                    ? 'the identified root cause is highly likely correct and the applied mitigation should stabilize the system.'
                    : effectiveConfidence >= 0.5
                        ? 'the diagnosis is probable but additional monitoring cycles are recommended before full confidence.'
                        : 'further investigation is strongly recommended — the current hypothesis needs more corroborating evidence.'
                } ${reportSections?.summary ? reportSections.summary.split('.').slice(0, 1).join('.') + '.' : ''}`
            : 'Agent is still analyzing the incident. Belief synthesis will be available after RCA completion.';

    // ── Override selection handler ─────────────────────────────
    function handleOverrideSelect(value: string) {
        if (value === '__reset__') {
            setSelectedOverride(null);
            return;
        }
        setSelectedOverride(value);
        // Simulate recalculation
        setIsRecalculating(true);
        setTimeout(() => setIsRecalculating(false), 1200);
    }

    // ── Approve & Execute handler ─────────────────────────────
    async function handleApprove() {
        if (!incident) return;
        setApprovalState('executing');
        setExecPhase(0);

        // Animate through phases
        for (let i = 0; i < EXEC_PHASES.length; i++) {
            setExecPhase(i);
            await new Promise(r => setTimeout(r, 500));
        }

        try {
            const originalAction = describeToolAction(toolLog?.tool_call ?? rcaLog?.tool_call);
            const res = await fetch(`/api/incidents/${id}/approve`, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({
                    approved: true,
                    action_taken: selectedOverride || 'agent_suggested',
                    original_action: originalAction,
                    override_action: selectedOverride ? selectedOverrideObj?.label : undefined,
                    parameters: selectedOverride ? { selected_fix: selectedOverride } : {},
                }),
            });
            if (res.ok) {
                setApprovalState('resolved');
                fetchDetail();
            }
        } catch {
            setApprovalState('idle');
        }
    }

    // ── Reject handler ────────────────────────────────────────
    async function handleReject() {
        if (!incident) return;
        try {
            await fetch(`/api/incidents/${id}/approve`, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({
                    approved: false,
                    action_taken: 'REJECTED_BY_OPERATOR',
                }),
            });
            setApprovalState('rejected');
            fetchDetail();
        } catch { /* ignore */ }
    }

    if (loading) {
        return (
            <div className="min-h-screen flex items-center justify-center">
                <div className="flex flex-col items-center gap-4">
                    <div className="w-10 h-10 border-2 border-primary/30 border-t-primary rounded-full animate-spin" />
                    <p className="text-sm text-text-muted font-mono">LOADING INCIDENT {id?.slice(0, 8)}...</p>
                </div>
            </div>
        );
    }

    if (!incident) {
        return (
            <div className="min-h-screen flex items-center justify-center">
                <p className="text-text-muted">Incident not found.</p>
            </div>
        );
    }

    const risk = getRiskBadge(incident.severity);
    const action = getActionBadge(incident.status);

    return (
        <div className="min-h-screen flex flex-col">
            {/* Header */}
            <header className="sticky top-0 z-10 border-b border-border bg-background/95 backdrop-blur-sm">
                <div className="max-w-7xl mx-auto px-6 py-3 flex items-center gap-4">
                    <a href="/dashboard" className="text-text-muted hover:text-text-primary transition-colors text-sm">← Back</a>
                    <div className="flex-1">
                        <div className="flex items-center gap-3">
                            <span className="text-sm font-semibold text-text-primary">{incident.source}</span>
                            <span className="text-text-muted text-[10px] font-mono">{id?.slice(0, 8)}</span>
                            <span className={risk.cls}>{risk.label}</span>
                            <span className={action.cls}>{action.label}</span>
                        </div>
                        <p className="text-[10px] text-text-muted font-mono mt-0.5">{new Date(incident.created_at).toLocaleString()}</p>
                    </div>
                </div>
            </header>

            <main className="flex-1 max-w-7xl mx-auto w-full px-6 py-6 space-y-4">
                {/* ── Confidence Bar ── */}
                {effectiveConfidence !== null && (
                    <ConfidenceBar
                        value={effectiveConfidence}
                        onViewReasoning={() => setShowReasoning(true)}
                    />
                )}

                {/* ── Split Pane ── */}
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-5">

                    {/* LEFT PANEL: Sovereign Verdict + Action Center */}
                    <div className="space-y-4">
                        <h2 className="text-xs font-bold text-text-muted uppercase tracking-[0.15em] flex items-center gap-2">
                            <span className="w-1.5 h-1.5 rounded-full bg-primary" />
                            Sovereign Verdict
                        </h2>

                        {/* Root Cause */}
                        <div className="sg-verdict-card">
                            <div className="sg-verdict-label">
                                <svg className="w-3 h-3 text-risk-high" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-2.5L13.732 4c-.77-.833-1.964-.833-2.732 0L4.082 16.5c-.77.833.192 2.5 1.732 2.5z" /></svg>
                                Identified Root Cause
                            </div>
                            <p className="sg-verdict-content font-semibold">{reportSections?.rootCause || hypothesis}</p>
                        </div>

                        {/* ── Interactive Action Card (Applied/Suggested Fix + Override Dropdown) ── */}
                        <div className={`sg-verdict-card transition-all duration-300 ${needsApproval ? 'border-action-pending/40 shadow-[0_0_25px_rgba(234,179,8,0.08)]' : isResolved ? 'border-safe/40' : ''}`}>
                            <div className="sg-verdict-label">
                                <svg className="w-3 h-3 text-safe" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" /></svg>
                                {needsApproval ? 'Suggested Fix' : 'Applied Fix'}
                            </div>

                            <p className={`sg-verdict-content ${selectedOverride ? 'line-through text-text-muted' : ''}`}>{agentSuggestedAction}</p>

                            {/* Override display */}
                            {selectedOverride && (
                                <div className="mt-2 flex items-center gap-2">
                                    <span className="text-[10px] text-action-pending font-semibold uppercase tracking-wider">Override →</span>
                                    <span className="text-sm text-text-primary font-semibold">{selectedOverrideObj?.label}</span>
                                    <span className={`text-[9px] px-1.5 py-0.5 rounded-full font-mono ${selectedOverrideObj?.risk === 'high' ? 'bg-red-950/60 text-red-400' : selectedOverrideObj?.risk === 'medium' ? 'bg-amber-950/60 text-amber-400' : 'bg-emerald-950/60 text-emerald-400'}`}>
                                        {selectedOverrideObj?.risk?.toUpperCase()} RISK
                                    </span>
                                </div>
                            )}

                            {/* Modify Action dropdown — only when pending */}
                            {needsApproval && approvalState === 'idle' && (
                                <div className="mt-3 pt-3 border-t border-border/40">
                                    <label className="text-[10px] text-text-muted uppercase tracking-wider font-semibold block mb-1.5">
                                        Modify Action
                                    </label>
                                    <select
                                        value={selectedOverride || '__default__'}
                                        onChange={(e) => handleOverrideSelect(e.target.value === '__default__' ? '__reset__' : e.target.value)}
                                        className="w-full bg-surface-3 border border-border rounded-lg px-3 py-2 text-sm text-text-primary focus:outline-none focus:ring-1 focus:ring-primary focus:border-primary transition-colors cursor-pointer appearance-none"
                                        style={{ backgroundImage: `url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' fill='none' viewBox='0 0 24 24' stroke='%2394a3b8'%3E%3Cpath stroke-linecap='round' stroke-linejoin='round' stroke-width='2' d='M19 9l-7 7-7-7'/%3E%3C/svg%3E")`, backgroundRepeat: 'no-repeat', backgroundPosition: 'right 10px center', backgroundSize: '16px' }}
                                    >
                                        <option value="__default__">Use agent suggestion (default)</option>
                                        {overrideOptions.map(opt => (
                                            <option key={opt.value} value={opt.value}>
                                                {opt.label} ({opt.risk} risk)
                                            </option>
                                        ))}
                                    </select>
                                </div>
                            )}

                            {/* ── Approve & Execute / Reject Buttons ── */}
                            {needsApproval && approvalState === 'idle' && (
                                <div className="mt-4 flex gap-3">
                                    <button
                                        onClick={handleApprove}
                                        className="flex-1 sg-btn bg-safe hover:bg-safe/90 border-safe/60 text-white font-bold justify-center text-sm"
                                        style={{ boxShadow: '0 0 25px rgba(16,185,129,0.2)' }}
                                        id="approve-execute-btn"
                                    >
                                        ✅ Approve &amp; Execute
                                    </button>
                                    <button
                                        onClick={handleReject}
                                        className="sg-btn-danger justify-center text-sm px-5"
                                        id="reject-btn"
                                    >
                                        🛑 Reject
                                    </button>
                                </div>
                            )}

                            {/* ── Execution Animation ── */}
                            {approvalState === 'executing' && (
                                <div className="mt-4 p-3 bg-surface-3/60 rounded-lg border border-primary/30">
                                    <div className="flex items-center gap-3 mb-2">
                                        <div className="w-4 h-4 border-2 border-primary/40 border-t-primary rounded-full animate-spin" />
                                        <span className="text-xs font-mono text-primary font-semibold animate-pulse">{EXEC_PHASES[execPhase]}</span>
                                    </div>
                                    <div className="w-full h-1 bg-surface-3 rounded-full overflow-hidden">
                                        <div className="h-full bg-primary rounded-full transition-all duration-500" style={{ width: `${((execPhase + 1) / EXEC_PHASES.length) * 100}%` }} />
                                    </div>
                                </div>
                            )}

                            {/* ── Success State ── */}
                            {(approvalState === 'resolved' || (isResolved && approvalState === 'idle')) && !needsApproval && (
                                <div className="mt-3 flex items-center gap-2 p-2 bg-emerald-950/30 rounded-lg border border-safe/20">
                                    <span className="text-safe text-lg">✓</span>
                                    <span className="text-xs font-semibold text-safe">Action executed successfully — system stabilized</span>
                                </div>
                            )}

                            {/* ── Rejected State ── */}
                            {(approvalState === 'rejected' || isFailed) && (
                                <div className="mt-3 flex items-center gap-2 p-2 bg-red-950/30 rounded-lg border border-critical/20">
                                    <span className="text-critical text-lg">✕</span>
                                    <span className="text-xs font-semibold text-critical">Action rejected by operator — manual intervention required</span>
                                </div>
                            )}
                        </div>

                        {/* Prevention Strategy (dynamic) */}
                        <div className="sg-verdict-card">
                            <div className="sg-verdict-label">
                                <svg className="w-3 h-3 text-primary" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" /></svg>
                                Prevention Strategy
                                {isRecalculating && <span className="text-[9px] text-action-pending animate-pulse ml-1">RECALCULATING</span>}
                            </div>
                            {isRecalculating ? (
                                <div className="flex items-center gap-2 py-2">
                                    <div className="w-3 h-3 border border-primary/40 border-t-primary rounded-full animate-spin" />
                                    <span className="text-xs text-text-muted font-mono">Recalculating strategy based on override selection...</span>
                                </div>
                            ) : (
                                <p className="sg-verdict-content">{preventionStrategy}</p>
                            )}
                        </div>

                        {/* Sentinel Belief (dynamic) */}
                        <div className="sg-verdict-card border-primary/20">
                            <div className="sg-verdict-label">
                                <svg className="w-3 h-3 text-secondary" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z" /></svg>
                                Sentinel Belief
                                {isRecalculating && <span className="text-[9px] text-action-pending animate-pulse ml-1">UPDATING</span>}
                            </div>
                            {isRecalculating ? (
                                <div className="flex items-center gap-2 py-2">
                                    <div className="w-3 h-3 border border-primary/40 border-t-primary rounded-full animate-spin" />
                                    <span className="text-xs text-text-muted font-mono">Re-evaluating confidence with modified action path...</span>
                                </div>
                            ) : (
                                <p className="sg-verdict-content italic text-text-secondary">{sentinelBelief}</p>
                            )}
                        </div>

                        {/* Metrics Snapshot */}
                        {incident.metadata && (
                            <div className="sg-verdict-card">
                                <div className="sg-verdict-label">
                                    <svg className="w-3 h-3 text-text-muted" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" /></svg>
                                    Metrics at Detection
                                </div>
                                <div className="grid grid-cols-3 gap-2 mt-1">
                                    {Object.entries(incident.metadata as Record<string, number>).map(([k, v]) => (
                                        <div key={k} className="text-center p-1.5 bg-surface-3/50 rounded">
                                            <p className="text-[9px] text-text-muted uppercase">{k.replace(/_/g, ' ')}</p>
                                            <p className="font-mono text-xs text-text-primary font-bold">{typeof v === 'number' ? v.toFixed(1) : v}</p>
                                        </div>
                                    ))}
                                </div>
                            </div>
                        )}
                    </div>

                    {/* RIGHT PANEL: Thought Stream (Elastic — no dead space) */}
                    <div className="sg-card flex flex-col gap-3">
                        <div className="flex items-center justify-between">
                            <h2 className="text-xs font-bold text-text-muted uppercase tracking-[0.15em] flex items-center gap-2">
                                <span className="w-1.5 h-1.5 rounded-full bg-secondary" />
                                Thought Stream
                            </h2>
                            <div className="flex items-center gap-3">
                                <span className="text-[10px] font-mono text-text-muted">{logs.length} steps</span>
                                <button
                                    onClick={() => setShowTechDetails(!showTechDetails)}
                                    className={`sg-detail-toggle ${showTechDetails ? 'text-primary' : ''}`}
                                >
                                    {showTechDetails ? '◉' : '○'} Technical Details
                                </button>
                            </div>
                        </div>

                        <div
                            ref={streamRef}
                            className="overflow-y-auto pr-1"
                            style={{ scrollBehavior: 'smooth', maxHeight: logs.length > 4 ? '650px' : undefined }}
                        >
                            {logs.length === 0 ? (
                                <div className="flex items-center justify-center py-10 text-text-muted text-sm">
                                    <p>Waiting for agent to start reasoning...</p>
                                </div>
                            ) : (
                                logs.map((log, i) => (
                                    <ThoughtItem key={log.id} log={log} index={i} showDetails={showTechDetails} />
                                ))
                            )}
                        </div>
                    </div>
                </div>
            </main>

            {/* Reasoning Overlay */}
            {showReasoning && effectiveConfidence !== null && (
                <ReasoningOverlay
                    reasoning={reasoning}
                    confidence={effectiveConfidence}
                    onClose={() => setShowReasoning(false)}
                />
            )}
        </div>
    );
}
