(globalThis.TURBOPACK || (globalThis.TURBOPACK = [])).push([typeof document === "object" ? document.currentScript : undefined,
"[project]/Documents/cityboy/aegis_sre/app/dashboard/page.tsx [app-client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "default",
    ()=>DashboardPage
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$cityboy$2f$aegis_sre$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/Documents/cityboy/aegis_sre/node_modules/next/dist/compiled/react/jsx-dev-runtime.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$cityboy$2f$aegis_sre$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/Documents/cityboy/aegis_sre/node_modules/next/dist/compiled/react/index.js [app-client] (ecmascript)");
;
var _s = __turbopack_context__.k.signature(), _s1 = __turbopack_context__.k.signature();
'use client';
;
// ── Realistic incident pool ──────────────────────────────────────────
const INCIDENT_POOL = [
    {
        source: 'Database Connection Exhaustion',
        severity: 'critical'
    },
    {
        source: 'Auth Service Latency Spike',
        severity: 'warning'
    },
    {
        source: 'Redis OOM: Cache Eviction Failure',
        severity: 'critical'
    },
    {
        source: 'S3 Bucket Permission Denied',
        severity: 'warning'
    },
    {
        source: 'Stripe API Timeout (Payment Gateway)',
        severity: 'critical'
    }
];
function getRiskTier(severity) {
    const map = {
        critical: {
            tier: 'high',
            cls: 'sg-risk-high',
            label: 'HIGH RISK'
        },
        warning: {
            tier: 'medium',
            cls: 'sg-risk-medium',
            label: 'MEDIUM RISK'
        },
        info: {
            tier: 'low',
            cls: 'sg-risk-low',
            label: 'LOW RISK'
        }
    };
    return map[severity] ?? map.info;
}
function getActionBadge(status) {
    if (status === 'resolved') return {
        cls: 'sg-action-resolved',
        label: 'RESOLVED',
        dot: 'bg-action-resolved'
    };
    if (status === 'pending_approval') return {
        cls: 'sg-action-pending',
        label: 'PENDING APPROVAL',
        dot: 'bg-action-pending'
    };
    if (status === 'failed') return {
        cls: 'sg-badge-critical',
        label: 'FAILED',
        dot: 'bg-critical'
    };
    return {
        cls: 'sg-badge-info',
        label: status.replace(/_/g, ' ').toUpperCase(),
        dot: 'bg-secondary'
    };
}
function timeAgo(dateStr) {
    const diff = Date.now() - new Date(dateStr).getTime();
    const secs = Math.floor(diff / 1000);
    if (secs < 60) return `${secs}s ago`;
    const mins = Math.floor(secs / 60);
    if (mins < 60) return `${mins}m ago`;
    const hrs = Math.floor(mins / 60);
    if (hrs < 24) return `${hrs}h ago`;
    return `${Math.floor(hrs / 24)}d ago`;
}
// ── Metric Card ──────────────────────────────────────────────────────
function MetricCard({ label, value, subtext, color }) {
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$cityboy$2f$aegis_sre$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
        className: "sg-card flex flex-col gap-1.5",
        children: [
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$cityboy$2f$aegis_sre$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                className: "text-[10px] text-text-muted uppercase tracking-[0.12em] font-semibold",
                children: label
            }, void 0, false, {
                fileName: "[project]/Documents/cityboy/aegis_sre/app/dashboard/page.tsx",
                lineNumber: 51,
                columnNumber: 13
            }, this),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$cityboy$2f$aegis_sre$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                className: `text-3xl font-bold font-mono ${color ?? 'text-text-primary'}`,
                children: value
            }, void 0, false, {
                fileName: "[project]/Documents/cityboy/aegis_sre/app/dashboard/page.tsx",
                lineNumber: 52,
                columnNumber: 13
            }, this),
            subtext && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$cityboy$2f$aegis_sre$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                className: "text-[11px] text-text-muted",
                children: subtext
            }, void 0, false, {
                fileName: "[project]/Documents/cityboy/aegis_sre/app/dashboard/page.tsx",
                lineNumber: 53,
                columnNumber: 25
            }, this)
        ]
    }, void 0, true, {
        fileName: "[project]/Documents/cityboy/aegis_sre/app/dashboard/page.tsx",
        lineNumber: 50,
        columnNumber: 9
    }, this);
}
_c = MetricCard;
// ── Incident Row ─────────────────────────────────────────────────────
function IncidentRow({ incident, onClick }) {
    const risk = getRiskTier(incident.severity);
    const action = getActionBadge(incident.status);
    const isActive = ![
        'resolved',
        'failed'
    ].includes(incident.status);
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$cityboy$2f$aegis_sre$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
        onClick: onClick,
        className: `
                flex items-center gap-4 px-4 py-3.5 rounded-lg cursor-pointer transition-all duration-200
                border ${isActive ? 'border-border-bright/50' : 'border-border/30'} 
                bg-surface hover:bg-surface-2 hover:border-primary/30 group
            `,
        children: [
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$cityboy$2f$aegis_sre$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                className: `w-2 h-2 rounded-full flex-shrink-0 ${risk.tier === 'high' ? 'bg-risk-high animate-pulse' : risk.tier === 'medium' ? 'bg-risk-medium' : 'bg-risk-low'}`
            }, void 0, false, {
                fileName: "[project]/Documents/cityboy/aegis_sre/app/dashboard/page.tsx",
                lineNumber: 73,
                columnNumber: 13
            }, this),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$cityboy$2f$aegis_sre$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                className: "flex-1 text-sm text-text-primary group-hover:text-white truncate font-medium",
                children: incident.source
            }, void 0, false, {
                fileName: "[project]/Documents/cityboy/aegis_sre/app/dashboard/page.tsx",
                lineNumber: 74,
                columnNumber: 13
            }, this),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$cityboy$2f$aegis_sre$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                className: risk.cls,
                children: risk.label
            }, void 0, false, {
                fileName: "[project]/Documents/cityboy/aegis_sre/app/dashboard/page.tsx",
                lineNumber: 77,
                columnNumber: 13
            }, this),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$cityboy$2f$aegis_sre$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                className: action.cls,
                children: action.label
            }, void 0, false, {
                fileName: "[project]/Documents/cityboy/aegis_sre/app/dashboard/page.tsx",
                lineNumber: 78,
                columnNumber: 13
            }, this),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$cityboy$2f$aegis_sre$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                className: "text-[11px] text-text-muted min-w-[60px] text-right font-mono",
                children: timeAgo(incident.created_at)
            }, void 0, false, {
                fileName: "[project]/Documents/cityboy/aegis_sre/app/dashboard/page.tsx",
                lineNumber: 79,
                columnNumber: 13
            }, this)
        ]
    }, void 0, true, {
        fileName: "[project]/Documents/cityboy/aegis_sre/app/dashboard/page.tsx",
        lineNumber: 65,
        columnNumber: 9
    }, this);
}
_c1 = IncidentRow;
// ── Mock Agent Learnings Data ────────────────────────────────────────
const MOCK_LEARNINGS = [
    {
        id: 'l1',
        timestamp: '2 hours ago',
        pattern: 'Auth-service latency spikes consistently 2 minutes after a Redis cache clear event.',
        strategy: 'Pre-warm authentication cache 5 minutes before any scheduled cache maintenance window.',
        prevention: 'Deployed an automatic cache warm-up job to the maintenance pipeline. Reduced auth-related P99 from 2400ms to 180ms.',
        confidence: 0.92,
        incidents: 14
    },
    {
        id: 'l2',
        timestamp: '6 hours ago',
        pattern: 'Database connection pool exhaustion correlates with batch ETL jobs running during peak traffic hours.',
        strategy: 'Reschedule ETL batch jobs to off-peak windows (02:00–04:00 UTC) and implement connection pool isolation.',
        prevention: 'Added a dedicated connection pool for ETL workers separate from the application pool. Max connections capped at 20 for ETL vs 80 for app.',
        confidence: 0.87,
        incidents: 8
    },
    {
        id: 'l3',
        timestamp: '1 day ago',
        pattern: 'Stripe API timeouts cluster around the 15th and 30th of each month during subscription renewal surges.',
        strategy: 'Implement progressive retry with circuit breaker on the Stripe API bridge. Queue non-critical payment retries.',
        prevention: 'Added circuit breaker with 5s timeout, 3 retries, and exponential backoff. Enrolled Payment Gateway in the auto-scaling group.',
        confidence: 0.78,
        incidents: 22
    },
    {
        id: 'l4',
        timestamp: '2 days ago',
        pattern: 'S3 bucket permission errors spike after IAM policy deployments due to eventual consistency lag.',
        strategy: 'Add a 60-second stabilization delay after IAM policy changes before S3 operations resume.',
        prevention: 'Integrated IAM change detection into the deployment pipeline with automatic S3 health-check gates.',
        confidence: 0.95,
        incidents: 6
    },
    {
        id: 'l5',
        timestamp: '3 days ago',
        pattern: 'Redis OOM events preceded by gradual memory climb when cache eviction policy is set to noeviction.',
        strategy: 'Switch Redis eviction policy to allkeys-lru and set maxmemory to 80% of available RAM.',
        prevention: 'Deployed Redis Sentinel monitoring with OOM prediction alerting at 70% memory threshold. Auto-scales cluster at 75%.',
        confidence: 0.91,
        incidents: 11
    }
];
// ── Agent Learnings Hub Component ────────────────────────────────────
function AgentLearningsHub() {
    _s();
    const [overrideLearnings, setOverrideLearnings] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$cityboy$2f$aegis_sre$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])([]);
    (0, __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$cityboy$2f$aegis_sre$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useEffect"])({
        "AgentLearningsHub.useEffect": ()=>{
            async function fetchOverrides() {
                try {
                    const res = await fetch('/api/incidents');
                    if (!res.ok) return;
                    const incidents = await res.json();
                    const resolvedRecent = incidents.filter({
                        "AgentLearningsHub.useEffect.fetchOverrides.resolvedRecent": (i)=>i.status === 'resolved'
                    }["AgentLearningsHub.useEffect.fetchOverrides.resolvedRecent"]).slice(0, 5);
                    const overrides = [];
                    for (const inc of resolvedRecent){
                        try {
                            const detailRes = await fetch(`/api/incidents/${inc.id}`);
                            if (!detailRes.ok) continue;
                            const detail = await detailRes.json();
                            const overrideLog = detail.auditLogs?.find({
                                "AgentLearningsHub.useEffect.fetchOverrides": (a)=>a.action_taken.startsWith('OVERRIDE:')
                            }["AgentLearningsHub.useEffect.fetchOverrides"]);
                            if (overrideLog && overrideLog.result) {
                                const result = overrideLog.result;
                                overrides.push({
                                    id: `override-${inc.id}`,
                                    timestamp: timeAgo(overrideLog.created_at),
                                    pattern: `User overridden: Preferred [${result.selected || 'custom action'}] over [${result.original || 'agent suggestion'}]. Updating bias for similar incidents.`,
                                    strategy: `Apply "${result.selected || 'user selection'}" as the primary response for ${inc.source} events.`,
                                    prevention: `Decision logged to agent training corpus. Future incidents matching "${inc.source}" will weight user-preferred action higher.`,
                                    confidence: 0.99,
                                    incidents: 1,
                                    isOverride: true
                                });
                            }
                        } catch  {}
                    }
                    setOverrideLearnings(overrides);
                } catch  {}
            }
            fetchOverrides();
            const interval = setInterval(fetchOverrides, 5000);
            return ({
                "AgentLearningsHub.useEffect": ()=>clearInterval(interval)
            })["AgentLearningsHub.useEffect"];
        }
    }["AgentLearningsHub.useEffect"], []);
    const allLearnings = [
        ...overrideLearnings,
        ...MOCK_LEARNINGS.map((l)=>({
                ...l,
                isOverride: false
            }))
    ];
    const totalIncidents = allLearnings.reduce((a, l)=>a + l.incidents, 0);
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$cityboy$2f$aegis_sre$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
        className: "space-y-6",
        children: [
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$cityboy$2f$aegis_sre$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                className: "flex items-center justify-between",
                children: [
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$cityboy$2f$aegis_sre$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        children: [
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$cityboy$2f$aegis_sre$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("h2", {
                                className: "text-lg font-bold text-text-primary flex items-center gap-3 header-glow",
                                children: [
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$cityboy$2f$aegis_sre$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                        className: "w-8 h-8 rounded-lg bg-primary/15 border border-primary/30 flex items-center justify-center text-primary text-sm",
                                        children: "🧠"
                                    }, void 0, false, {
                                        fileName: "[project]/Documents/cityboy/aegis_sre/app/dashboard/page.tsx",
                                        lineNumber: 201,
                                        columnNumber: 25
                                    }, this),
                                    "Agent Learnings Hub"
                                ]
                            }, void 0, true, {
                                fileName: "[project]/Documents/cityboy/aegis_sre/app/dashboard/page.tsx",
                                lineNumber: 200,
                                columnNumber: 21
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$cityboy$2f$aegis_sre$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                className: "text-xs text-text-muted mt-1",
                                children: [
                                    "Patterns recognized across ",
                                    totalIncidents,
                                    " incidents — the agent's persistent journal of wisdom"
                                ]
                            }, void 0, true, {
                                fileName: "[project]/Documents/cityboy/aegis_sre/app/dashboard/page.tsx",
                                lineNumber: 204,
                                columnNumber: 21
                            }, this)
                        ]
                    }, void 0, true, {
                        fileName: "[project]/Documents/cityboy/aegis_sre/app/dashboard/page.tsx",
                        lineNumber: 199,
                        columnNumber: 17
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$cityboy$2f$aegis_sre$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        className: "flex items-center gap-2 text-xs text-text-muted font-mono",
                        children: [
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$cityboy$2f$aegis_sre$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                className: "w-2 h-2 rounded-full bg-safe animate-pulse"
                            }, void 0, false, {
                                fileName: "[project]/Documents/cityboy/aegis_sre/app/dashboard/page.tsx",
                                lineNumber: 207,
                                columnNumber: 21
                            }, this),
                            allLearnings.length,
                            " patterns learned",
                            overrideLearnings.length > 0 && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$cityboy$2f$aegis_sre$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                className: "ml-2 px-1.5 py-0.5 rounded-full bg-action-pending/20 text-action-pending text-[9px] font-semibold",
                                children: [
                                    overrideLearnings.length,
                                    " override",
                                    overrideLearnings.length > 1 ? 's' : ''
                                ]
                            }, void 0, true, {
                                fileName: "[project]/Documents/cityboy/aegis_sre/app/dashboard/page.tsx",
                                lineNumber: 210,
                                columnNumber: 25
                            }, this)
                        ]
                    }, void 0, true, {
                        fileName: "[project]/Documents/cityboy/aegis_sre/app/dashboard/page.tsx",
                        lineNumber: 206,
                        columnNumber: 17
                    }, this)
                ]
            }, void 0, true, {
                fileName: "[project]/Documents/cityboy/aegis_sre/app/dashboard/page.tsx",
                lineNumber: 198,
                columnNumber: 13
            }, this),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$cityboy$2f$aegis_sre$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                className: "relative",
                children: [
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$cityboy$2f$aegis_sre$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        className: "absolute left-[19px] top-0 bottom-0 w-px bg-gradient-to-b from-primary/40 via-secondary/20 to-transparent"
                    }, void 0, false, {
                        fileName: "[project]/Documents/cityboy/aegis_sre/app/dashboard/page.tsx",
                        lineNumber: 218,
                        columnNumber: 17
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$cityboy$2f$aegis_sre$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        className: "space-y-4",
                        children: allLearnings.map((learning, idx)=>/*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$cityboy$2f$aegis_sre$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                className: "relative pl-12 animate-fade-in",
                                style: {
                                    animationDelay: `${idx * 100}ms`
                                },
                                children: [
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$cityboy$2f$aegis_sre$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                        className: `absolute left-[12px] top-5 w-[15px] h-[15px] rounded-full border-2 ${learning.isOverride ? 'border-action-pending/80 bg-action-pending/10' : 'border-primary/60 bg-background'} flex items-center justify-center`,
                                        children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$cityboy$2f$aegis_sre$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                            className: `w-[5px] h-[5px] rounded-full ${learning.isOverride ? 'bg-action-pending' : 'bg-primary'}`
                                        }, void 0, false, {
                                            fileName: "[project]/Documents/cityboy/aegis_sre/app/dashboard/page.tsx",
                                            lineNumber: 223,
                                            columnNumber: 33
                                        }, this)
                                    }, void 0, false, {
                                        fileName: "[project]/Documents/cityboy/aegis_sre/app/dashboard/page.tsx",
                                        lineNumber: 222,
                                        columnNumber: 29
                                    }, this),
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$cityboy$2f$aegis_sre$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                        className: `sg-learning-card ${learning.isOverride ? 'border-action-pending/30 shadow-[0_0_15px_rgba(234,179,8,0.06)]' : ''}`,
                                        children: [
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$cityboy$2f$aegis_sre$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                className: "flex items-center justify-between mb-4",
                                                children: [
                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$cityboy$2f$aegis_sre$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                        className: "flex items-center gap-2",
                                                        children: [
                                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$cityboy$2f$aegis_sre$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                                className: "text-[10px] font-mono text-text-muted",
                                                                children: learning.timestamp
                                                            }, void 0, false, {
                                                                fileName: "[project]/Documents/cityboy/aegis_sre/app/dashboard/page.tsx",
                                                                lineNumber: 229,
                                                                columnNumber: 41
                                                            }, this),
                                                            learning.isOverride && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$cityboy$2f$aegis_sre$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                                className: "px-1.5 py-0.5 rounded-full bg-action-pending/20 text-action-pending text-[8px] font-bold uppercase tracking-wider",
                                                                children: "Human Override"
                                                            }, void 0, false, {
                                                                fileName: "[project]/Documents/cityboy/aegis_sre/app/dashboard/page.tsx",
                                                                lineNumber: 231,
                                                                columnNumber: 45
                                                            }, this)
                                                        ]
                                                    }, void 0, true, {
                                                        fileName: "[project]/Documents/cityboy/aegis_sre/app/dashboard/page.tsx",
                                                        lineNumber: 228,
                                                        columnNumber: 37
                                                    }, this),
                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$cityboy$2f$aegis_sre$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                        className: "flex items-center gap-3",
                                                        children: [
                                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$cityboy$2f$aegis_sre$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                                className: "text-[10px] font-mono text-text-muted",
                                                                children: [
                                                                    learning.incidents,
                                                                    " incident",
                                                                    learning.incidents !== 1 ? 's' : ''
                                                                ]
                                                            }, void 0, true, {
                                                                fileName: "[project]/Documents/cityboy/aegis_sre/app/dashboard/page.tsx",
                                                                lineNumber: 237,
                                                                columnNumber: 41
                                                            }, this),
                                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$cityboy$2f$aegis_sre$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                                className: "flex items-center gap-1.5",
                                                                children: [
                                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$cityboy$2f$aegis_sre$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                                        className: "w-16 h-1 rounded-full bg-surface-3 overflow-hidden",
                                                                        children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$cityboy$2f$aegis_sre$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                                            className: `h-full rounded-full transition-all duration-1000 ${learning.isOverride ? 'bg-action-pending' : 'bg-primary'}`,
                                                                            style: {
                                                                                width: `${learning.confidence * 100}%`
                                                                            }
                                                                        }, void 0, false, {
                                                                            fileName: "[project]/Documents/cityboy/aegis_sre/app/dashboard/page.tsx",
                                                                            lineNumber: 240,
                                                                            columnNumber: 49
                                                                        }, this)
                                                                    }, void 0, false, {
                                                                        fileName: "[project]/Documents/cityboy/aegis_sre/app/dashboard/page.tsx",
                                                                        lineNumber: 239,
                                                                        columnNumber: 45
                                                                    }, this),
                                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$cityboy$2f$aegis_sre$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                                        className: `text-[10px] font-mono ${learning.isOverride ? 'text-action-pending' : 'text-primary'}`,
                                                                        children: [
                                                                            Math.round(learning.confidence * 100),
                                                                            "%"
                                                                        ]
                                                                    }, void 0, true, {
                                                                        fileName: "[project]/Documents/cityboy/aegis_sre/app/dashboard/page.tsx",
                                                                        lineNumber: 242,
                                                                        columnNumber: 45
                                                                    }, this)
                                                                ]
                                                            }, void 0, true, {
                                                                fileName: "[project]/Documents/cityboy/aegis_sre/app/dashboard/page.tsx",
                                                                lineNumber: 238,
                                                                columnNumber: 41
                                                            }, this)
                                                        ]
                                                    }, void 0, true, {
                                                        fileName: "[project]/Documents/cityboy/aegis_sre/app/dashboard/page.tsx",
                                                        lineNumber: 236,
                                                        columnNumber: 37
                                                    }, this)
                                                ]
                                            }, void 0, true, {
                                                fileName: "[project]/Documents/cityboy/aegis_sre/app/dashboard/page.tsx",
                                                lineNumber: 227,
                                                columnNumber: 33
                                            }, this),
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$cityboy$2f$aegis_sre$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                className: "space-y-3",
                                                children: [
                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$cityboy$2f$aegis_sre$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                        children: [
                                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$cityboy$2f$aegis_sre$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                                className: "sg-verdict-label",
                                                                children: [
                                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$cityboy$2f$aegis_sre$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                                        className: `w-1 h-1 rounded-full ${learning.isOverride ? 'bg-action-pending' : 'bg-risk-high'}`
                                                                    }, void 0, false, {
                                                                        fileName: "[project]/Documents/cityboy/aegis_sre/app/dashboard/page.tsx",
                                                                        lineNumber: 250,
                                                                        columnNumber: 45
                                                                    }, this),
                                                                    learning.isOverride ? 'Decision Override Logged' : 'Pattern Recognized'
                                                                ]
                                                            }, void 0, true, {
                                                                fileName: "[project]/Documents/cityboy/aegis_sre/app/dashboard/page.tsx",
                                                                lineNumber: 249,
                                                                columnNumber: 41
                                                            }, this),
                                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$cityboy$2f$aegis_sre$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                                                className: "text-sm text-text-primary leading-relaxed",
                                                                children: learning.pattern
                                                            }, void 0, false, {
                                                                fileName: "[project]/Documents/cityboy/aegis_sre/app/dashboard/page.tsx",
                                                                lineNumber: 253,
                                                                columnNumber: 41
                                                            }, this)
                                                        ]
                                                    }, void 0, true, {
                                                        fileName: "[project]/Documents/cityboy/aegis_sre/app/dashboard/page.tsx",
                                                        lineNumber: 248,
                                                        columnNumber: 37
                                                    }, this),
                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$cityboy$2f$aegis_sre$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                        children: [
                                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$cityboy$2f$aegis_sre$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                                className: "sg-verdict-label",
                                                                children: [
                                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$cityboy$2f$aegis_sre$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                                        className: "w-1 h-1 rounded-full bg-safe"
                                                                    }, void 0, false, {
                                                                        fileName: "[project]/Documents/cityboy/aegis_sre/app/dashboard/page.tsx",
                                                                        lineNumber: 258,
                                                                        columnNumber: 45
                                                                    }, this),
                                                                    "Healing Strategy"
                                                                ]
                                                            }, void 0, true, {
                                                                fileName: "[project]/Documents/cityboy/aegis_sre/app/dashboard/page.tsx",
                                                                lineNumber: 257,
                                                                columnNumber: 41
                                                            }, this),
                                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$cityboy$2f$aegis_sre$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                                                className: "text-sm text-text-secondary leading-relaxed",
                                                                children: learning.strategy
                                                            }, void 0, false, {
                                                                fileName: "[project]/Documents/cityboy/aegis_sre/app/dashboard/page.tsx",
                                                                lineNumber: 261,
                                                                columnNumber: 41
                                                            }, this)
                                                        ]
                                                    }, void 0, true, {
                                                        fileName: "[project]/Documents/cityboy/aegis_sre/app/dashboard/page.tsx",
                                                        lineNumber: 256,
                                                        columnNumber: 37
                                                    }, this),
                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$cityboy$2f$aegis_sre$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                        children: [
                                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$cityboy$2f$aegis_sre$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                                className: "sg-verdict-label",
                                                                children: [
                                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$cityboy$2f$aegis_sre$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                                        className: "w-1 h-1 rounded-full bg-primary"
                                                                    }, void 0, false, {
                                                                        fileName: "[project]/Documents/cityboy/aegis_sre/app/dashboard/page.tsx",
                                                                        lineNumber: 266,
                                                                        columnNumber: 45
                                                                    }, this),
                                                                    "Global Prevention"
                                                                ]
                                                            }, void 0, true, {
                                                                fileName: "[project]/Documents/cityboy/aegis_sre/app/dashboard/page.tsx",
                                                                lineNumber: 265,
                                                                columnNumber: 41
                                                            }, this),
                                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$cityboy$2f$aegis_sre$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                                                className: "text-sm text-text-secondary leading-relaxed",
                                                                children: learning.prevention
                                                            }, void 0, false, {
                                                                fileName: "[project]/Documents/cityboy/aegis_sre/app/dashboard/page.tsx",
                                                                lineNumber: 269,
                                                                columnNumber: 41
                                                            }, this)
                                                        ]
                                                    }, void 0, true, {
                                                        fileName: "[project]/Documents/cityboy/aegis_sre/app/dashboard/page.tsx",
                                                        lineNumber: 264,
                                                        columnNumber: 37
                                                    }, this)
                                                ]
                                            }, void 0, true, {
                                                fileName: "[project]/Documents/cityboy/aegis_sre/app/dashboard/page.tsx",
                                                lineNumber: 247,
                                                columnNumber: 33
                                            }, this)
                                        ]
                                    }, void 0, true, {
                                        fileName: "[project]/Documents/cityboy/aegis_sre/app/dashboard/page.tsx",
                                        lineNumber: 226,
                                        columnNumber: 29
                                    }, this)
                                ]
                            }, learning.id, true, {
                                fileName: "[project]/Documents/cityboy/aegis_sre/app/dashboard/page.tsx",
                                lineNumber: 221,
                                columnNumber: 25
                            }, this))
                    }, void 0, false, {
                        fileName: "[project]/Documents/cityboy/aegis_sre/app/dashboard/page.tsx",
                        lineNumber: 219,
                        columnNumber: 17
                    }, this)
                ]
            }, void 0, true, {
                fileName: "[project]/Documents/cityboy/aegis_sre/app/dashboard/page.tsx",
                lineNumber: 217,
                columnNumber: 13
            }, this)
        ]
    }, void 0, true, {
        fileName: "[project]/Documents/cityboy/aegis_sre/app/dashboard/page.tsx",
        lineNumber: 197,
        columnNumber: 9
    }, this);
}
_s(AgentLearningsHub, "ZOi/czwFrRJk/mqBE5TN67Ydo9c=");
_c2 = AgentLearningsHub;
function DashboardPage() {
    _s1();
    const [incidents, setIncidents] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$cityboy$2f$aegis_sre$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])([]);
    const [loading, setLoading] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$cityboy$2f$aegis_sre$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])(true);
    const [filter, setFilter] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$cityboy$2f$aegis_sre$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])('all');
    const [activeTab, setActiveTab] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$cityboy$2f$aegis_sre$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])('situation');
    const [triggerStatus, setTriggerStatus] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$cityboy$2f$aegis_sre$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])(null);
    const pollRef = (0, __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$cityboy$2f$aegis_sre$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useRef"])(null);
    const fetchIncidents = (0, __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$cityboy$2f$aegis_sre$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useCallback"])({
        "DashboardPage.useCallback[fetchIncidents]": async ()=>{
            try {
                const res = await fetch('/api/incidents');
                if (res.ok) {
                    const data = await res.json();
                    setIncidents(data);
                }
            } catch  {
            // next poll retries
            }
            setLoading(false);
        }
    }["DashboardPage.useCallback[fetchIncidents]"], []);
    (0, __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$cityboy$2f$aegis_sre$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useEffect"])({
        "DashboardPage.useEffect": ()=>{
            fetchIncidents();
        }
    }["DashboardPage.useEffect"], [
        fetchIncidents
    ]);
    (0, __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$cityboy$2f$aegis_sre$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useEffect"])({
        "DashboardPage.useEffect": ()=>{
            pollRef.current = setInterval(fetchIncidents, 3000);
            return ({
                "DashboardPage.useEffect": ()=>{
                    if (pollRef.current) clearInterval(pollRef.current);
                }
            })["DashboardPage.useEffect"];
        }
    }["DashboardPage.useEffect"], [
        fetchIncidents
    ]);
    const filtered = incidents.filter((i)=>{
        if (filter === 'active') return ![
            'resolved',
            'failed'
        ].includes(i.status);
        if (filter === 'resolved') return i.status === 'resolved';
        return true;
    });
    const activeCount = incidents.filter((i)=>![
            'resolved',
            'failed'
        ].includes(i.status)).length;
    const pendingCount = incidents.filter((i)=>i.status === 'pending_approval').length;
    const resolvedCount = incidents.filter((i)=>i.status === 'resolved').length;
    const highRiskCount = incidents.filter((i)=>i.severity === 'critical').length;
    async function fireMockIncident() {
        setTriggerStatus('Firing...');
        try {
            const shuffled = [
                ...INCIDENT_POOL
            ].sort(()=>Math.random() - 0.5);
            const picks = shuffled.slice(0, 2);
            const results = await Promise.all(picks.map((pick)=>fetch('/api/webhook', {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json'
                    },
                    body: JSON.stringify({
                        source: pick.source,
                        severity: pick.severity,
                        idempotency_key: `mock-${Date.now()}-${Math.random().toString(36).slice(2, 10)}`,
                        metadata: {
                            cpu_percent: Math.round(30 + Math.random() * 70),
                            memory_percent: Math.round(40 + Math.random() * 55),
                            rps: Math.round(800 + Math.random() * 4200),
                            error_rate: +(Math.random() * 0.08).toFixed(4),
                            latency_p99_ms: Math.round(200 + Math.random() * 1800)
                        }
                    })
                }).then((r)=>r.json())));
            const anySuccess = results.some((r)=>r.status === 'processed' || r.status === 'safe_mode');
            if (anySuccess) {
                setTriggerStatus('✅ 2 incidents deployed');
                fetchIncidents();
            } else {
                setTriggerStatus(`⚠️ ${results[0]?.error ?? 'Unknown'}`);
            }
            setTimeout(()=>setTriggerStatus(null), 4000);
        } catch (e) {
            setTriggerStatus(`❌ ${e.message}`);
            setTimeout(()=>setTriggerStatus(null), 4000);
        }
    }
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$cityboy$2f$aegis_sre$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
        className: "min-h-screen flex flex-col",
        children: [
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$cityboy$2f$aegis_sre$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("header", {
                className: "sticky top-0 z-10 border-b border-border bg-background/95 backdrop-blur-sm",
                children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$cityboy$2f$aegis_sre$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                    className: "max-w-7xl mx-auto px-6 py-3 flex items-center justify-between",
                    children: [
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$cityboy$2f$aegis_sre$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                            className: "flex items-center gap-3",
                            children: [
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$cityboy$2f$aegis_sre$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                    className: "w-8 h-8 rounded-lg bg-primary/15 border border-primary/30 flex items-center justify-center",
                                    children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$cityboy$2f$aegis_sre$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("svg", {
                                        className: "w-4 h-4 text-primary",
                                        fill: "currentColor",
                                        viewBox: "0 0 24 24",
                                        children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$cityboy$2f$aegis_sre$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("path", {
                                            d: "M12 2L2 7l10 5 10-5-10-5zM2 17l10 5 10-5M2 12l10 5 10-5",
                                            stroke: "currentColor",
                                            strokeWidth: "2",
                                            fill: "none",
                                            strokeLinecap: "round",
                                            strokeLinejoin: "round"
                                        }, void 0, false, {
                                            fileName: "[project]/Documents/cityboy/aegis_sre/app/dashboard/page.tsx",
                                            lineNumber: 371,
                                            columnNumber: 33
                                        }, this)
                                    }, void 0, false, {
                                        fileName: "[project]/Documents/cityboy/aegis_sre/app/dashboard/page.tsx",
                                        lineNumber: 370,
                                        columnNumber: 29
                                    }, this)
                                }, void 0, false, {
                                    fileName: "[project]/Documents/cityboy/aegis_sre/app/dashboard/page.tsx",
                                    lineNumber: 369,
                                    columnNumber: 25
                                }, this),
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$cityboy$2f$aegis_sre$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                    children: [
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$cityboy$2f$aegis_sre$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("h1", {
                                            className: "font-bold text-text-primary text-sm tracking-wide header-glow",
                                            children: "SENTINEL GOVERNOR"
                                        }, void 0, false, {
                                            fileName: "[project]/Documents/cityboy/aegis_sre/app/dashboard/page.tsx",
                                            lineNumber: 375,
                                            columnNumber: 29
                                        }, this),
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$cityboy$2f$aegis_sre$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                            className: "text-[10px] text-text-muted font-mono uppercase tracking-widest",
                                            children: "SG-1 // COMMAND CENTER"
                                        }, void 0, false, {
                                            fileName: "[project]/Documents/cityboy/aegis_sre/app/dashboard/page.tsx",
                                            lineNumber: 376,
                                            columnNumber: 29
                                        }, this)
                                    ]
                                }, void 0, true, {
                                    fileName: "[project]/Documents/cityboy/aegis_sre/app/dashboard/page.tsx",
                                    lineNumber: 374,
                                    columnNumber: 25
                                }, this)
                            ]
                        }, void 0, true, {
                            fileName: "[project]/Documents/cityboy/aegis_sre/app/dashboard/page.tsx",
                            lineNumber: 368,
                            columnNumber: 21
                        }, this),
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$cityboy$2f$aegis_sre$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                            className: "flex items-center gap-3",
                            children: [
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$cityboy$2f$aegis_sre$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                    className: "flex items-center gap-2 px-3 py-1.5 rounded-full bg-surface border border-border text-[11px] text-text-secondary",
                                    children: [
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$cityboy$2f$aegis_sre$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                            className: "w-1.5 h-1.5 rounded-full bg-safe animate-pulse"
                                        }, void 0, false, {
                                            fileName: "[project]/Documents/cityboy/aegis_sre/app/dashboard/page.tsx",
                                            lineNumber: 382,
                                            columnNumber: 29
                                        }, this),
                                        "LIVE"
                                    ]
                                }, void 0, true, {
                                    fileName: "[project]/Documents/cityboy/aegis_sre/app/dashboard/page.tsx",
                                    lineNumber: 381,
                                    columnNumber: 25
                                }, this),
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$cityboy$2f$aegis_sre$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                    className: "hidden sm:flex items-center gap-2 px-3 py-1.5 rounded-full bg-primary/10 border border-primary/30 text-[11px] text-primary font-mono",
                                    children: "llama-3.3-70b"
                                }, void 0, false, {
                                    fileName: "[project]/Documents/cityboy/aegis_sre/app/dashboard/page.tsx",
                                    lineNumber: 386,
                                    columnNumber: 25
                                }, this),
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$cityboy$2f$aegis_sre$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                                    onClick: fireMockIncident,
                                    disabled: triggerStatus === 'Firing...',
                                    className: "sg-btn-primary text-xs",
                                    id: "fire-mock-incident",
                                    children: triggerStatus ? /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$cityboy$2f$aegis_sre$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                        className: "text-[11px]",
                                        children: triggerStatus
                                    }, void 0, false, {
                                        fileName: "[project]/Documents/cityboy/aegis_sre/app/dashboard/page.tsx",
                                        lineNumber: 397,
                                        columnNumber: 33
                                    }, this) : /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$cityboy$2f$aegis_sre$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$cityboy$2f$aegis_sre$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Fragment"], {
                                        children: [
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$cityboy$2f$aegis_sre$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                children: "🚀"
                                            }, void 0, false, {
                                                fileName: "[project]/Documents/cityboy/aegis_sre/app/dashboard/page.tsx",
                                                lineNumber: 400,
                                                columnNumber: 37
                                            }, this),
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$cityboy$2f$aegis_sre$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                children: "Fire Mock Incident"
                                            }, void 0, false, {
                                                fileName: "[project]/Documents/cityboy/aegis_sre/app/dashboard/page.tsx",
                                                lineNumber: 401,
                                                columnNumber: 37
                                            }, this)
                                        ]
                                    }, void 0, true)
                                }, void 0, false, {
                                    fileName: "[project]/Documents/cityboy/aegis_sre/app/dashboard/page.tsx",
                                    lineNumber: 390,
                                    columnNumber: 25
                                }, this)
                            ]
                        }, void 0, true, {
                            fileName: "[project]/Documents/cityboy/aegis_sre/app/dashboard/page.tsx",
                            lineNumber: 380,
                            columnNumber: 21
                        }, this)
                    ]
                }, void 0, true, {
                    fileName: "[project]/Documents/cityboy/aegis_sre/app/dashboard/page.tsx",
                    lineNumber: 367,
                    columnNumber: 17
                }, this)
            }, void 0, false, {
                fileName: "[project]/Documents/cityboy/aegis_sre/app/dashboard/page.tsx",
                lineNumber: 366,
                columnNumber: 13
            }, this),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$cityboy$2f$aegis_sre$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("main", {
                className: "flex-1 max-w-7xl mx-auto w-full px-6 py-6 space-y-6",
                children: [
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$cityboy$2f$aegis_sre$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        className: "flex items-center gap-2 bg-surface-2/50 rounded-xl p-1.5 w-fit",
                        children: [
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$cityboy$2f$aegis_sre$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                                onClick: ()=>setActiveTab('situation'),
                                className: activeTab === 'situation' ? 'sg-tab-active' : 'sg-tab-inactive',
                                children: "Situation Room"
                            }, void 0, false, {
                                fileName: "[project]/Documents/cityboy/aegis_sre/app/dashboard/page.tsx",
                                lineNumber: 412,
                                columnNumber: 21
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$cityboy$2f$aegis_sre$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                                onClick: ()=>setActiveTab('learnings'),
                                className: activeTab === 'learnings' ? 'sg-tab-active' : 'sg-tab-inactive',
                                children: "Agent Learnings Hub"
                            }, void 0, false, {
                                fileName: "[project]/Documents/cityboy/aegis_sre/app/dashboard/page.tsx",
                                lineNumber: 418,
                                columnNumber: 21
                            }, this)
                        ]
                    }, void 0, true, {
                        fileName: "[project]/Documents/cityboy/aegis_sre/app/dashboard/page.tsx",
                        lineNumber: 411,
                        columnNumber: 17
                    }, this),
                    activeTab === 'situation' ? /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$cityboy$2f$aegis_sre$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$cityboy$2f$aegis_sre$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Fragment"], {
                        children: [
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$cityboy$2f$aegis_sre$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                className: "grid grid-cols-2 md:grid-cols-4 gap-4",
                                children: [
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$cityboy$2f$aegis_sre$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(MetricCard, {
                                        label: "Active",
                                        value: activeCount,
                                        subtext: "Incidents in pipeline",
                                        color: activeCount > 0 ? 'text-warning' : 'text-text-primary'
                                    }, void 0, false, {
                                        fileName: "[project]/Documents/cityboy/aegis_sre/app/dashboard/page.tsx",
                                        lineNumber: 430,
                                        columnNumber: 29
                                    }, this),
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$cityboy$2f$aegis_sre$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(MetricCard, {
                                        label: "Pending",
                                        value: pendingCount,
                                        subtext: "Awaiting human approval",
                                        color: pendingCount > 0 ? 'text-action-pending' : 'text-text-primary'
                                    }, void 0, false, {
                                        fileName: "[project]/Documents/cityboy/aegis_sre/app/dashboard/page.tsx",
                                        lineNumber: 431,
                                        columnNumber: 29
                                    }, this),
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$cityboy$2f$aegis_sre$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(MetricCard, {
                                        label: "Resolved",
                                        value: resolvedCount,
                                        subtext: "Successfully resolved",
                                        color: "text-action-resolved"
                                    }, void 0, false, {
                                        fileName: "[project]/Documents/cityboy/aegis_sre/app/dashboard/page.tsx",
                                        lineNumber: 432,
                                        columnNumber: 29
                                    }, this),
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$cityboy$2f$aegis_sre$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(MetricCard, {
                                        label: "High Risk",
                                        value: highRiskCount,
                                        subtext: "Critical severity",
                                        color: highRiskCount > 0 ? 'text-risk-high' : 'text-text-primary'
                                    }, void 0, false, {
                                        fileName: "[project]/Documents/cityboy/aegis_sre/app/dashboard/page.tsx",
                                        lineNumber: 433,
                                        columnNumber: 29
                                    }, this)
                                ]
                            }, void 0, true, {
                                fileName: "[project]/Documents/cityboy/aegis_sre/app/dashboard/page.tsx",
                                lineNumber: 429,
                                columnNumber: 25
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$cityboy$2f$aegis_sre$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                className: "sg-card space-y-4",
                                children: [
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$cityboy$2f$aegis_sre$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                        className: "flex items-center justify-between",
                                        children: [
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$cityboy$2f$aegis_sre$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("h2", {
                                                className: "font-semibold text-text-primary text-sm flex items-center gap-2 header-glow",
                                                children: [
                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$cityboy$2f$aegis_sre$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                        children: "INCIDENT LOG"
                                                    }, void 0, false, {
                                                        fileName: "[project]/Documents/cityboy/aegis_sre/app/dashboard/page.tsx",
                                                        lineNumber: 440,
                                                        columnNumber: 37
                                                    }, this),
                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$cityboy$2f$aegis_sre$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                        className: "sg-badge-info",
                                                        children: filtered.length
                                                    }, void 0, false, {
                                                        fileName: "[project]/Documents/cityboy/aegis_sre/app/dashboard/page.tsx",
                                                        lineNumber: 441,
                                                        columnNumber: 37
                                                    }, this)
                                                ]
                                            }, void 0, true, {
                                                fileName: "[project]/Documents/cityboy/aegis_sre/app/dashboard/page.tsx",
                                                lineNumber: 439,
                                                columnNumber: 33
                                            }, this),
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$cityboy$2f$aegis_sre$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                className: "flex gap-1 bg-surface-2 rounded-lg p-1",
                                                children: [
                                                    'all',
                                                    'active',
                                                    'resolved'
                                                ].map((f)=>/*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$cityboy$2f$aegis_sre$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                                                        onClick: ()=>setFilter(f),
                                                        className: `px-3 py-1 rounded-md text-xs font-semibold transition-all ${filter === f ? 'bg-primary text-white' : 'text-text-muted hover:text-text-secondary'}`,
                                                        children: f.toUpperCase()
                                                    }, f, false, {
                                                        fileName: "[project]/Documents/cityboy/aegis_sre/app/dashboard/page.tsx",
                                                        lineNumber: 445,
                                                        columnNumber: 41
                                                    }, this))
                                            }, void 0, false, {
                                                fileName: "[project]/Documents/cityboy/aegis_sre/app/dashboard/page.tsx",
                                                lineNumber: 443,
                                                columnNumber: 33
                                            }, this)
                                        ]
                                    }, void 0, true, {
                                        fileName: "[project]/Documents/cityboy/aegis_sre/app/dashboard/page.tsx",
                                        lineNumber: 438,
                                        columnNumber: 29
                                    }, this),
                                    loading ? /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$cityboy$2f$aegis_sre$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                        className: "flex items-center justify-center py-16 text-text-muted",
                                        children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$cityboy$2f$aegis_sre$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                            className: "flex flex-col items-center gap-3",
                                            children: [
                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$cityboy$2f$aegis_sre$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                    className: "w-8 h-8 border-2 border-primary/30 border-t-primary rounded-full animate-spin"
                                                }, void 0, false, {
                                                    fileName: "[project]/Documents/cityboy/aegis_sre/app/dashboard/page.tsx",
                                                    lineNumber: 462,
                                                    columnNumber: 41
                                                }, this),
                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$cityboy$2f$aegis_sre$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                    className: "text-xs font-mono",
                                                    children: "CONNECTING TO SUPABASE..."
                                                }, void 0, false, {
                                                    fileName: "[project]/Documents/cityboy/aegis_sre/app/dashboard/page.tsx",
                                                    lineNumber: 463,
                                                    columnNumber: 41
                                                }, this)
                                            ]
                                        }, void 0, true, {
                                            fileName: "[project]/Documents/cityboy/aegis_sre/app/dashboard/page.tsx",
                                            lineNumber: 461,
                                            columnNumber: 37
                                        }, this)
                                    }, void 0, false, {
                                        fileName: "[project]/Documents/cityboy/aegis_sre/app/dashboard/page.tsx",
                                        lineNumber: 460,
                                        columnNumber: 33
                                    }, this) : filtered.length === 0 ? /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$cityboy$2f$aegis_sre$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                        className: "flex flex-col items-center justify-center py-16 gap-4 text-text-muted",
                                        children: [
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$cityboy$2f$aegis_sre$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                className: "w-12 h-12 rounded-xl bg-surface-2 border border-border flex items-center justify-center text-2xl",
                                                children: "🛡️"
                                            }, void 0, false, {
                                                fileName: "[project]/Documents/cityboy/aegis_sre/app/dashboard/page.tsx",
                                                lineNumber: 468,
                                                columnNumber: 37
                                            }, this),
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$cityboy$2f$aegis_sre$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                                className: "text-sm",
                                                children: "No incidents. Fire a mock incident to test SG-1."
                                            }, void 0, false, {
                                                fileName: "[project]/Documents/cityboy/aegis_sre/app/dashboard/page.tsx",
                                                lineNumber: 469,
                                                columnNumber: 37
                                            }, this)
                                        ]
                                    }, void 0, true, {
                                        fileName: "[project]/Documents/cityboy/aegis_sre/app/dashboard/page.tsx",
                                        lineNumber: 467,
                                        columnNumber: 33
                                    }, this) : /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$cityboy$2f$aegis_sre$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                        className: "space-y-2",
                                        children: filtered.map((incident)=>/*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$cityboy$2f$aegis_sre$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(IncidentRow, {
                                                incident: incident,
                                                onClick: ()=>window.open(`/incidents/${incident.id}`, '_self')
                                            }, incident.id, false, {
                                                fileName: "[project]/Documents/cityboy/aegis_sre/app/dashboard/page.tsx",
                                                lineNumber: 474,
                                                columnNumber: 41
                                            }, this))
                                    }, void 0, false, {
                                        fileName: "[project]/Documents/cityboy/aegis_sre/app/dashboard/page.tsx",
                                        lineNumber: 472,
                                        columnNumber: 33
                                    }, this)
                                ]
                            }, void 0, true, {
                                fileName: "[project]/Documents/cityboy/aegis_sre/app/dashboard/page.tsx",
                                lineNumber: 437,
                                columnNumber: 25
                            }, this)
                        ]
                    }, void 0, true) : /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$cityboy$2f$aegis_sre$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(AgentLearningsHub, {}, void 0, false, {
                        fileName: "[project]/Documents/cityboy/aegis_sre/app/dashboard/page.tsx",
                        lineNumber: 485,
                        columnNumber: 21
                    }, this)
                ]
            }, void 0, true, {
                fileName: "[project]/Documents/cityboy/aegis_sre/app/dashboard/page.tsx",
                lineNumber: 409,
                columnNumber: 13
            }, this)
        ]
    }, void 0, true, {
        fileName: "[project]/Documents/cityboy/aegis_sre/app/dashboard/page.tsx",
        lineNumber: 364,
        columnNumber: 9
    }, this);
}
_s1(DashboardPage, "5KstU8nduKV54cAANlU3U/P6By4=");
_c3 = DashboardPage;
var _c, _c1, _c2, _c3;
__turbopack_context__.k.register(_c, "MetricCard");
__turbopack_context__.k.register(_c1, "IncidentRow");
__turbopack_context__.k.register(_c2, "AgentLearningsHub");
__turbopack_context__.k.register(_c3, "DashboardPage");
if (typeof globalThis.$RefreshHelpers$ === 'object' && globalThis.$RefreshHelpers !== null) {
    __turbopack_context__.k.registerExports(__turbopack_context__.m, globalThis.$RefreshHelpers$);
}
}),
]);

//# sourceMappingURL=Documents_cityboy_aegis_sre_app_dashboard_page_tsx_665d5271._.js.map