(globalThis.TURBOPACK || (globalThis.TURBOPACK = [])).push([typeof document === "object" ? document.currentScript : undefined,
"[project]/Documents/cityboy/aegis_sre/app/incidents/[id]/page.tsx [app-client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "default",
    ()=>IncidentPage
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$cityboy$2f$aegis_sre$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/Documents/cityboy/aegis_sre/node_modules/next/dist/compiled/react/jsx-dev-runtime.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$cityboy$2f$aegis_sre$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/Documents/cityboy/aegis_sre/node_modules/next/dist/compiled/react/index.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$cityboy$2f$aegis_sre$2f$node_modules$2f$next$2f$navigation$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/Documents/cityboy/aegis_sre/node_modules/next/navigation.js [app-client] (ecmascript)");
;
var _s = __turbopack_context__.k.signature();
'use client';
;
;
// ΓöÇΓöÇ Time formatter ΓöÇΓöÇΓöÇΓöÇΓöÇΓöÇΓöÇΓöÇΓöÇΓöÇΓöÇΓöÇΓöÇΓöÇΓöÇΓöÇΓöÇΓöÇΓöÇΓöÇΓöÇΓöÇΓöÇΓöÇΓöÇΓöÇΓöÇΓöÇΓöÇΓöÇΓöÇΓöÇΓöÇΓöÇΓöÇΓöÇΓöÇΓöÇΓöÇΓöÇΓöÇΓöÇΓöÇΓöÇ
function fmt(d) {
    return new Date(d).toLocaleTimeString('en-US', {
        hour12: false,
        hour: '2-digit',
        minute: '2-digit',
        second: '2-digit'
    });
}
// ΓöÇΓöÇ Risk tier mapping ΓöÇΓöÇΓöÇΓöÇΓöÇΓöÇΓöÇΓöÇΓöÇΓöÇΓöÇΓöÇΓöÇΓöÇΓöÇΓöÇΓöÇΓöÇΓöÇΓöÇΓöÇΓöÇΓöÇΓöÇΓöÇΓöÇΓöÇΓöÇΓöÇΓöÇΓöÇΓöÇΓöÇΓöÇΓöÇΓöÇΓöÇΓöÇΓöÇΓöÇ
function getRiskBadge(severity) {
    const map = {
        critical: {
            cls: 'sg-risk-high',
            label: 'HIGH RISK'
        },
        warning: {
            cls: 'sg-risk-medium',
            label: 'MEDIUM RISK'
        },
        info: {
            cls: 'sg-risk-low',
            label: 'LOW RISK'
        }
    };
    return map[severity] ?? map.info;
}
function getActionBadge(status) {
    if (status === 'resolved') return {
        cls: 'sg-action-resolved',
        label: 'RESOLVED'
    };
    if (status === 'pending_approval') return {
        cls: 'sg-action-pending',
        label: 'PENDING APPROVAL'
    };
    if (status === 'failed') return {
        cls: 'sg-badge-critical',
        label: 'FAILED'
    };
    return {
        cls: 'sg-badge-info',
        label: status.replace(/_/g, ' ').toUpperCase()
    };
}
// ΓöÇΓöÇ Parse clean text from report (strip markdown) ΓöÇΓöÇΓöÇΓöÇΓöÇΓöÇΓöÇΓöÇΓöÇΓöÇΓöÇΓöÇΓöÇ
function stripMarkdown(text) {
    return text.replace(/^#{1,6}\s+/gm, '').replace(/\*\*([^*]+)\*\*/g, '$1').replace(/\*([^*]+)\*/g, '$1').replace(/^[-*]\s+/gm, 'ΓÇó ').replace(/^---+$/gm, '').replace(/`([^`]+)`/g, '$1').replace(/\n{3,}/g, '\n\n').trim();
}
// ΓöÇΓöÇ Extract sections from post-mortem report ΓöÇΓöÇΓöÇΓöÇΓöÇΓöÇΓöÇΓöÇΓöÇΓöÇΓöÇΓöÇΓöÇΓöÇΓöÇΓöÇΓöÇΓöÇ
function parseReport(content) {
    const sections = {
        summary: '',
        rootCause: '',
        resolution: '',
        actionItems: ''
    };
    const headingPattern = /(?:^|\n)#{1,3}\s*(summary|root\s*cause|resolution|action\s*items?|impact|timeline|next\s*steps?)/gi;
    const matches = [
        ...content.matchAll(headingPattern)
    ];
    for(let i = 0; i < matches.length; i++){
        const heading = (matches[i][1] || '').toLowerCase().trim();
        const start = (matches[i].index ?? 0) + matches[i][0].length;
        const end = i < matches.length - 1 ? matches[i + 1].index ?? content.length : content.length;
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
// ΓöÇΓöÇ Derive fix description from tool_call data ΓöÇΓöÇΓöÇΓöÇΓöÇΓöÇΓöÇΓöÇΓöÇΓöÇΓöÇΓöÇΓöÇΓöÇΓöÇΓöÇ
function describeToolAction(toolCall) {
    if (!toolCall || typeof toolCall !== 'object') return 'No automated action taken';
    const tc = toolCall;
    const name = tc.name || 'none';
    const params = tc.params || {};
    const descriptions = {
        scale_workload: `Scaled workload: ${Object.entries(params).map(([k, v])=>`${k}=${v}`).join(', ') || 'auto-scaling applied'}`,
        get_metrics: 'Pulled extended metrics for deeper analysis',
        throttle_jobs: `Throttled jobs: ${Object.entries(params).map(([k, v])=>`${k}=${v}`).join(', ') || 'rate limiting applied'}`,
        none: 'Manual review recommended ΓÇö no automated fix applied'
    };
    return descriptions[name] || `Executed: ${name}`;
}
// ΓöÇΓöÇ Context-aware override options per error type ΓöÇΓöÇΓöÇΓöÇΓöÇΓöÇΓöÇΓöÇΓöÇΓöÇΓöÇΓöÇΓöÇ
const OVERRIDE_OPTIONS = {
    'Database Connection Exhaustion': [
        {
            label: 'Restart RDS Instance',
            value: 'restart_rds',
            risk: 'medium'
        },
        {
            label: 'Increase Max Connections',
            value: 'increase_max_connections',
            risk: 'low'
        },
        {
            label: 'Promote Read Replica',
            value: 'promote_read_replica',
            risk: 'high'
        },
        {
            label: 'Flush Connection Pool',
            value: 'flush_connection_pool',
            risk: 'low'
        },
        {
            label: 'Enable PgBouncer',
            value: 'enable_pgbouncer',
            risk: 'low'
        }
    ],
    'Auth Service Latency Spike': [
        {
            label: 'Scale Auth Pods Horizontally',
            value: 'scale_auth_pods',
            risk: 'low'
        },
        {
            label: 'Invalidate Session Cache',
            value: 'invalidate_session_cache',
            risk: 'medium'
        },
        {
            label: 'Enable Rate Limiting',
            value: 'enable_rate_limiting',
            risk: 'low'
        },
        {
            label: 'Restart Auth Service',
            value: 'restart_auth_service',
            risk: 'medium'
        },
        {
            label: 'Failover to Secondary IdP',
            value: 'failover_idp',
            risk: 'high'
        }
    ],
    'Redis OOM: Cache Eviction Failure': [
        {
            label: 'Switch to allkeys-lru Policy',
            value: 'switch_eviction_policy',
            risk: 'low'
        },
        {
            label: 'Scale Redis Cluster',
            value: 'scale_redis_cluster',
            risk: 'low'
        },
        {
            label: 'Flush Non-Critical Keys',
            value: 'flush_noncritical_keys',
            risk: 'medium'
        },
        {
            label: 'Restart Redis with Memory Limit',
            value: 'restart_redis_memlimit',
            risk: 'medium'
        },
        {
            label: 'Enable Redis Sentinel Failover',
            value: 'enable_sentinel_failover',
            risk: 'high'
        }
    ],
    'S3 Bucket Permission Denied': [
        {
            label: 'Re-apply IAM Policy',
            value: 'reapply_iam_policy',
            risk: 'low'
        },
        {
            label: 'Switch to Service Role Credentials',
            value: 'switch_service_role',
            risk: 'medium'
        },
        {
            label: 'Enable S3 Cross-Region Replication',
            value: 'enable_s3_crr',
            risk: 'medium'
        },
        {
            label: 'Rotate Access Keys',
            value: 'rotate_access_keys',
            risk: 'high'
        },
        {
            label: 'Add Stabilization Delay Post-Deploy',
            value: 'add_stabilization_delay',
            risk: 'low'
        }
    ],
    'Stripe API Timeout (Payment Gateway)': [
        {
            label: 'Enable Circuit Breaker',
            value: 'enable_circuit_breaker',
            risk: 'low'
        },
        {
            label: 'Queue Failed Payments for Retry',
            value: 'queue_payment_retry',
            risk: 'low'
        },
        {
            label: 'Switch to Backup Payment Processor',
            value: 'switch_payment_processor',
            risk: 'high'
        },
        {
            label: 'Increase API Timeout Threshold',
            value: 'increase_api_timeout',
            risk: 'low'
        },
        {
            label: 'Throttle Non-Critical Transactions',
            value: 'throttle_transactions',
            risk: 'medium'
        }
    ]
};
// Fallback for legacy/unknown incidents
const DEFAULT_OVERRIDES = [
    {
        label: 'Scale Up (On-Demand)',
        value: 'scale_up_ondemand',
        risk: 'low'
    },
    {
        label: 'Scale Up (Spot Instances)',
        value: 'scale_up_spot',
        risk: 'medium'
    },
    {
        label: 'Enable Rate Limiting',
        value: 'enable_rate_limiting',
        risk: 'low'
    },
    {
        label: 'Throttle Background Tasks',
        value: 'throttle_background',
        risk: 'low'
    },
    {
        label: 'Restart Service',
        value: 'restart_service',
        risk: 'medium'
    }
];
function getOverrideOptions(source) {
    return OVERRIDE_OPTIONS[source] || DEFAULT_OVERRIDES;
}
// ΓöÇΓöÇ Confidence penalty for overrides ΓöÇΓöÇΓöÇΓöÇΓöÇΓöÇΓöÇΓöÇΓöÇΓöÇΓöÇΓöÇΓöÇΓöÇΓöÇΓöÇΓöÇΓöÇΓöÇΓöÇΓöÇΓöÇΓöÇΓöÇΓöÇΓöÇ
function getConfidenceWithOverride(baseConf, overrideRisk) {
    if (!overrideRisk) return baseConf;
    const penalties = {
        low: 0,
        medium: -0.08,
        high: -0.18
    };
    return Math.max(0.1, Math.min(1, baseConf + penalties[overrideRisk]));
}
// ΓöÇΓöÇ Confidence Bar ΓöÇΓöÇΓöÇΓöÇΓöÇΓöÇΓöÇΓöÇΓöÇΓöÇΓöÇΓöÇΓöÇΓöÇΓöÇΓöÇΓöÇΓöÇΓöÇΓöÇΓöÇΓöÇΓöÇΓöÇΓöÇΓöÇΓöÇΓöÇΓöÇΓöÇΓöÇΓöÇΓöÇΓöÇΓöÇΓöÇΓöÇΓöÇΓöÇΓöÇΓöÇΓöÇΓöÇΓöÇΓöÇ
function ConfidenceBar({ value, onViewReasoning }) {
    const pct = Math.round(value * 100);
    const color = pct >= 75 ? 'bg-safe' : pct >= 50 ? 'bg-warning' : 'bg-critical';
    const label = pct >= 75 ? 'High Confidence' : pct >= 50 ? 'Moderate Confidence' : 'Low Confidence';
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$cityboy$2f$aegis_sre$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
        className: "sg-card flex items-center gap-4 py-3",
        children: [
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$cityboy$2f$aegis_sre$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                className: "flex items-center gap-2 min-w-[140px]",
                children: [
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$cityboy$2f$aegis_sre$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                        className: `w-2 h-2 rounded-full ${color}`
                    }, void 0, false, {
                        fileName: "[project]/Documents/cityboy/aegis_sre/app/incidents/[id]/page.tsx",
                        lineNumber: 156,
                        columnNumber: 17
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$cityboy$2f$aegis_sre$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                        className: "text-xs font-semibold text-text-secondary",
                        children: label
                    }, void 0, false, {
                        fileName: "[project]/Documents/cityboy/aegis_sre/app/incidents/[id]/page.tsx",
                        lineNumber: 157,
                        columnNumber: 17
                    }, this)
                ]
            }, void 0, true, {
                fileName: "[project]/Documents/cityboy/aegis_sre/app/incidents/[id]/page.tsx",
                lineNumber: 155,
                columnNumber: 13
            }, this),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$cityboy$2f$aegis_sre$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                className: "flex-1 sg-confidence-bar",
                children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$cityboy$2f$aegis_sre$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                    className: `sg-confidence-fill ${color}`,
                    style: {
                        width: `${pct}%`
                    }
                }, void 0, false, {
                    fileName: "[project]/Documents/cityboy/aegis_sre/app/incidents/[id]/page.tsx",
                    lineNumber: 160,
                    columnNumber: 17
                }, this)
            }, void 0, false, {
                fileName: "[project]/Documents/cityboy/aegis_sre/app/incidents/[id]/page.tsx",
                lineNumber: 159,
                columnNumber: 13
            }, this),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$cityboy$2f$aegis_sre$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                className: "text-sm font-bold font-mono text-text-primary min-w-[42px] text-right",
                children: [
                    pct,
                    "%"
                ]
            }, void 0, true, {
                fileName: "[project]/Documents/cityboy/aegis_sre/app/incidents/[id]/page.tsx",
                lineNumber: 162,
                columnNumber: 13
            }, this),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$cityboy$2f$aegis_sre$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                onClick: onViewReasoning,
                className: "sg-detail-toggle ml-2 px-2 py-1 rounded-md border border-border hover:border-primary/40 transition-all",
                children: [
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$cityboy$2f$aegis_sre$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("svg", {
                        className: "w-3 h-3",
                        fill: "none",
                        stroke: "currentColor",
                        viewBox: "0 0 24 24",
                        children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$cityboy$2f$aegis_sre$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("path", {
                            strokeLinecap: "round",
                            strokeLinejoin: "round",
                            strokeWidth: 2,
                            d: "M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
                        }, void 0, false, {
                            fileName: "[project]/Documents/cityboy/aegis_sre/app/incidents/[id]/page.tsx",
                            lineNumber: 167,
                            columnNumber: 96
                        }, this)
                    }, void 0, false, {
                        fileName: "[project]/Documents/cityboy/aegis_sre/app/incidents/[id]/page.tsx",
                        lineNumber: 167,
                        columnNumber: 17
                    }, this),
                    "View Reasoning"
                ]
            }, void 0, true, {
                fileName: "[project]/Documents/cityboy/aegis_sre/app/incidents/[id]/page.tsx",
                lineNumber: 163,
                columnNumber: 13
            }, this)
        ]
    }, void 0, true, {
        fileName: "[project]/Documents/cityboy/aegis_sre/app/incidents/[id]/page.tsx",
        lineNumber: 154,
        columnNumber: 9
    }, this);
}
_c = ConfidenceBar;
// ΓöÇΓöÇ Reasoning Overlay ΓöÇΓöÇΓöÇΓöÇΓöÇΓöÇΓöÇΓöÇΓöÇΓöÇΓöÇΓöÇΓöÇΓöÇΓöÇΓöÇΓöÇΓöÇΓöÇΓöÇΓöÇΓöÇΓöÇΓöÇΓöÇΓöÇΓöÇΓöÇΓöÇΓöÇΓöÇΓöÇΓöÇΓöÇΓöÇΓöÇΓöÇΓöÇΓöÇΓöÇΓöÇΓöÇ
function ReasoningOverlay({ reasoning, confidence, onClose }) {
    const pct = Math.round(confidence * 100);
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$cityboy$2f$aegis_sre$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
        className: "sg-overlay",
        onClick: (e)=>{
            if (e.target === e.currentTarget) onClose();
        },
        children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$cityboy$2f$aegis_sre$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
            className: "sg-overlay-content",
            children: [
                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$cityboy$2f$aegis_sre$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                    className: "flex items-center justify-between mb-4",
                    children: [
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$cityboy$2f$aegis_sre$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("h3", {
                            className: "font-bold text-text-primary flex items-center gap-2",
                            children: [
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$cityboy$2f$aegis_sre$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                    className: "text-lg",
                                    children: "≡ƒöì"
                                }, void 0, false, {
                                    fileName: "[project]/Documents/cityboy/aegis_sre/app/incidents/[id]/page.tsx",
                                    lineNumber: 182,
                                    columnNumber: 25
                                }, this),
                                "Agent Reasoning"
                            ]
                        }, void 0, true, {
                            fileName: "[project]/Documents/cityboy/aegis_sre/app/incidents/[id]/page.tsx",
                            lineNumber: 181,
                            columnNumber: 21
                        }, this),
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$cityboy$2f$aegis_sre$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                            onClick: onClose,
                            className: "text-text-muted hover:text-text-primary transition-colors text-lg",
                            children: "Γ£ò"
                        }, void 0, false, {
                            fileName: "[project]/Documents/cityboy/aegis_sre/app/incidents/[id]/page.tsx",
                            lineNumber: 185,
                            columnNumber: 21
                        }, this)
                    ]
                }, void 0, true, {
                    fileName: "[project]/Documents/cityboy/aegis_sre/app/incidents/[id]/page.tsx",
                    lineNumber: 180,
                    columnNumber: 17
                }, this),
                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$cityboy$2f$aegis_sre$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                    className: "flex items-center gap-3 mb-4 p-3 bg-surface-2 rounded-lg border border-border/60",
                    children: [
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$cityboy$2f$aegis_sre$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                            className: "text-xs text-text-muted uppercase tracking-wider font-semibold",
                            children: "Confidence Level"
                        }, void 0, false, {
                            fileName: "[project]/Documents/cityboy/aegis_sre/app/incidents/[id]/page.tsx",
                            lineNumber: 188,
                            columnNumber: 21
                        }, this),
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$cityboy$2f$aegis_sre$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                            className: "flex-1 sg-confidence-bar",
                            children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$cityboy$2f$aegis_sre$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                className: `sg-confidence-fill ${pct >= 75 ? 'bg-safe' : pct >= 50 ? 'bg-warning' : 'bg-critical'}`,
                                style: {
                                    width: `${pct}%`
                                }
                            }, void 0, false, {
                                fileName: "[project]/Documents/cityboy/aegis_sre/app/incidents/[id]/page.tsx",
                                lineNumber: 190,
                                columnNumber: 25
                            }, this)
                        }, void 0, false, {
                            fileName: "[project]/Documents/cityboy/aegis_sre/app/incidents/[id]/page.tsx",
                            lineNumber: 189,
                            columnNumber: 21
                        }, this),
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$cityboy$2f$aegis_sre$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                            className: "font-mono font-bold text-sm",
                            children: [
                                pct,
                                "%"
                            ]
                        }, void 0, true, {
                            fileName: "[project]/Documents/cityboy/aegis_sre/app/incidents/[id]/page.tsx",
                            lineNumber: 192,
                            columnNumber: 21
                        }, this)
                    ]
                }, void 0, true, {
                    fileName: "[project]/Documents/cityboy/aegis_sre/app/incidents/[id]/page.tsx",
                    lineNumber: 187,
                    columnNumber: 17
                }, this),
                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$cityboy$2f$aegis_sre$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                    className: "p-3 bg-surface-2 rounded-lg border border-border/60",
                    children: [
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$cityboy$2f$aegis_sre$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                            className: "text-xs text-text-muted uppercase tracking-wider font-semibold mb-2",
                            children: "Why this diagnosis"
                        }, void 0, false, {
                            fileName: "[project]/Documents/cityboy/aegis_sre/app/incidents/[id]/page.tsx",
                            lineNumber: 195,
                            columnNumber: 21
                        }, this),
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$cityboy$2f$aegis_sre$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                            className: "text-sm text-text-primary leading-relaxed",
                            children: reasoning || 'No detailed reasoning available for this incident.'
                        }, void 0, false, {
                            fileName: "[project]/Documents/cityboy/aegis_sre/app/incidents/[id]/page.tsx",
                            lineNumber: 196,
                            columnNumber: 21
                        }, this)
                    ]
                }, void 0, true, {
                    fileName: "[project]/Documents/cityboy/aegis_sre/app/incidents/[id]/page.tsx",
                    lineNumber: 194,
                    columnNumber: 17
                }, this),
                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$cityboy$2f$aegis_sre$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                    onClick: onClose,
                    className: "w-full mt-4 sg-btn-ghost justify-center text-xs",
                    children: "Close"
                }, void 0, false, {
                    fileName: "[project]/Documents/cityboy/aegis_sre/app/incidents/[id]/page.tsx",
                    lineNumber: 198,
                    columnNumber: 17
                }, this)
            ]
        }, void 0, true, {
            fileName: "[project]/Documents/cityboy/aegis_sre/app/incidents/[id]/page.tsx",
            lineNumber: 179,
            columnNumber: 13
        }, this)
    }, void 0, false, {
        fileName: "[project]/Documents/cityboy/aegis_sre/app/incidents/[id]/page.tsx",
        lineNumber: 178,
        columnNumber: 9
    }, this);
}
_c1 = ReasoningOverlay;
// ΓöÇΓöÇ Thought Stream Item ΓöÇΓöÇΓöÇΓöÇΓöÇΓöÇΓöÇΓöÇΓöÇΓöÇΓöÇΓöÇΓöÇΓöÇΓöÇΓöÇΓöÇΓöÇΓöÇΓöÇΓöÇΓöÇΓöÇΓöÇΓöÇΓöÇΓöÇΓöÇΓöÇΓöÇΓöÇΓöÇΓöÇΓöÇΓöÇΓöÇΓöÇΓöÇΓöÇΓöÇ
function ThoughtItem({ log, index, showDetails }) {
    const stepLabels = {
        rca: {
            label: 'Root Cause Analysis',
            color: 'text-primary',
            icon: '≡ƒöì'
        },
        tool_execution: {
            label: 'Action Executed',
            color: 'text-safe',
            icon: 'ΓÜí'
        },
        tool_blocked: {
            label: 'Action Blocked',
            color: 'text-critical',
            icon: '≡ƒ¢æ'
        },
        post_mortem: {
            label: 'Post-Mortem',
            color: 'text-secondary',
            icon: '≡ƒôï'
        }
    };
    const meta = stepLabels[log.step] ?? {
        label: log.step.replace(/_/g, ' '),
        color: 'text-text-secondary',
        icon: 'ΓÇó'
    };
    const flowStage = {
        rca: 'IDENTIFY',
        tool_execution: 'ACT',
        tool_blocked: 'ACT',
        post_mortem: 'LEARN'
    }[log.step] ?? 'OBSERVE';
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$cityboy$2f$aegis_sre$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
        className: "thought-line",
        style: {
            animationDelay: `${index * 60}ms`
        },
        children: [
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$cityboy$2f$aegis_sre$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                className: "flex flex-col items-center gap-1 min-w-[44px]",
                children: [
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$cityboy$2f$aegis_sre$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                        className: "text-sm",
                        children: meta.icon
                    }, void 0, false, {
                        fileName: "[project]/Documents/cityboy/aegis_sre/app/incidents/[id]/page.tsx",
                        lineNumber: 218,
                        columnNumber: 17
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$cityboy$2f$aegis_sre$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                        className: "text-[8px] font-mono font-bold tracking-wider text-text-muted",
                        children: flowStage
                    }, void 0, false, {
                        fileName: "[project]/Documents/cityboy/aegis_sre/app/incidents/[id]/page.tsx",
                        lineNumber: 219,
                        columnNumber: 17
                    }, this)
                ]
            }, void 0, true, {
                fileName: "[project]/Documents/cityboy/aegis_sre/app/incidents/[id]/page.tsx",
                lineNumber: 217,
                columnNumber: 13
            }, this),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$cityboy$2f$aegis_sre$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                className: "flex-1 min-w-0",
                children: [
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$cityboy$2f$aegis_sre$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        className: "flex items-center gap-2 mb-1",
                        children: [
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$cityboy$2f$aegis_sre$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                className: `text-[11px] font-semibold ${meta.color}`,
                                children: meta.label
                            }, void 0, false, {
                                fileName: "[project]/Documents/cityboy/aegis_sre/app/incidents/[id]/page.tsx",
                                lineNumber: 223,
                                columnNumber: 21
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$cityboy$2f$aegis_sre$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                className: "text-text-muted text-[10px] font-mono",
                                children: fmt(log.created_at)
                            }, void 0, false, {
                                fileName: "[project]/Documents/cityboy/aegis_sre/app/incidents/[id]/page.tsx",
                                lineNumber: 224,
                                columnNumber: 21
                            }, this)
                        ]
                    }, void 0, true, {
                        fileName: "[project]/Documents/cityboy/aegis_sre/app/incidents/[id]/page.tsx",
                        lineNumber: 222,
                        columnNumber: 17
                    }, this),
                    log.current_hypothesis && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$cityboy$2f$aegis_sre$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                        className: "text-sm text-text-primary mb-1 font-medium",
                        children: log.current_hypothesis
                    }, void 0, false, {
                        fileName: "[project]/Documents/cityboy/aegis_sre/app/incidents/[id]/page.tsx",
                        lineNumber: 226,
                        columnNumber: 44
                    }, this),
                    log.thought_process && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$cityboy$2f$aegis_sre$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                        className: "text-xs text-text-secondary leading-relaxed",
                        children: log.thought_process
                    }, void 0, false, {
                        fileName: "[project]/Documents/cityboy/aegis_sre/app/incidents/[id]/page.tsx",
                        lineNumber: 227,
                        columnNumber: 41
                    }, this),
                    log.confidence !== null && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$cityboy$2f$aegis_sre$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        className: "mt-2 flex items-center gap-2",
                        children: [
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$cityboy$2f$aegis_sre$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                className: "w-20 h-1 bg-surface-3 rounded-full overflow-hidden",
                                children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$cityboy$2f$aegis_sre$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                    className: `h-full rounded-full transition-all duration-700 ${Math.round(log.confidence * 100) >= 75 ? 'bg-safe' : Math.round(log.confidence * 100) >= 50 ? 'bg-warning' : 'bg-critical'}`,
                                    style: {
                                        width: `${Math.round(log.confidence * 100)}%`
                                    }
                                }, void 0, false, {
                                    fileName: "[project]/Documents/cityboy/aegis_sre/app/incidents/[id]/page.tsx",
                                    lineNumber: 231,
                                    columnNumber: 29
                                }, this)
                            }, void 0, false, {
                                fileName: "[project]/Documents/cityboy/aegis_sre/app/incidents/[id]/page.tsx",
                                lineNumber: 230,
                                columnNumber: 25
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$cityboy$2f$aegis_sre$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                className: "text-[10px] font-mono text-text-muted",
                                children: [
                                    Math.round(log.confidence * 100),
                                    "%"
                                ]
                            }, void 0, true, {
                                fileName: "[project]/Documents/cityboy/aegis_sre/app/incidents/[id]/page.tsx",
                                lineNumber: 233,
                                columnNumber: 25
                            }, this)
                        ]
                    }, void 0, true, {
                        fileName: "[project]/Documents/cityboy/aegis_sre/app/incidents/[id]/page.tsx",
                        lineNumber: 229,
                        columnNumber: 21
                    }, this),
                    showDetails && log.tool_call && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$cityboy$2f$aegis_sre$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        className: "mt-2 bg-surface-3/60 rounded-lg px-3 py-2 border border-border/30",
                        children: [
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$cityboy$2f$aegis_sre$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                className: "text-[9px] text-text-muted uppercase tracking-wider font-semibold",
                                children: "Tool Call"
                            }, void 0, false, {
                                fileName: "[project]/Documents/cityboy/aegis_sre/app/incidents/[id]/page.tsx",
                                lineNumber: 238,
                                columnNumber: 25
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$cityboy$2f$aegis_sre$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("pre", {
                                className: "text-[11px] text-primary font-mono mt-1 whitespace-pre-wrap break-all",
                                children: JSON.stringify(log.tool_call, null, 2)
                            }, void 0, false, {
                                fileName: "[project]/Documents/cityboy/aegis_sre/app/incidents/[id]/page.tsx",
                                lineNumber: 239,
                                columnNumber: 25
                            }, this)
                        ]
                    }, void 0, true, {
                        fileName: "[project]/Documents/cityboy/aegis_sre/app/incidents/[id]/page.tsx",
                        lineNumber: 237,
                        columnNumber: 21
                    }, this)
                ]
            }, void 0, true, {
                fileName: "[project]/Documents/cityboy/aegis_sre/app/incidents/[id]/page.tsx",
                lineNumber: 221,
                columnNumber: 13
            }, this)
        ]
    }, void 0, true, {
        fileName: "[project]/Documents/cityboy/aegis_sre/app/incidents/[id]/page.tsx",
        lineNumber: 216,
        columnNumber: 9
    }, this);
}
_c2 = ThoughtItem;
// ΓöÇΓöÇ Execution animation phases ΓöÇΓöÇΓöÇΓöÇΓöÇΓöÇΓöÇΓöÇΓöÇΓöÇΓöÇΓöÇΓöÇΓöÇΓöÇΓöÇΓöÇΓöÇΓöÇΓöÇΓöÇΓöÇΓöÇΓöÇΓöÇΓöÇΓöÇΓöÇΓöÇΓöÇΓöÇΓöÇ
const EXEC_PHASES = [
    'Establishing secure channel...',
    'Communicating with K8s API...',
    'Executing remediation action...',
    'Verifying system stability...',
    'Logging to audit trail...'
];
function IncidentPage() {
    _s();
    const params = (0, __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$cityboy$2f$aegis_sre$2f$node_modules$2f$next$2f$navigation$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useParams"])();
    const id = params.id;
    const [incident, setIncident] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$cityboy$2f$aegis_sre$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])(null);
    const [logs, setLogs] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$cityboy$2f$aegis_sre$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])([]);
    const [auditLogs, setAuditLogs] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$cityboy$2f$aegis_sre$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])([]);
    const [report, setReport] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$cityboy$2f$aegis_sre$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])(null);
    const [loading, setLoading] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$cityboy$2f$aegis_sre$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])(true);
    const [showReasoning, setShowReasoning] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$cityboy$2f$aegis_sre$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])(false);
    const [showTechDetails, setShowTechDetails] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$cityboy$2f$aegis_sre$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])(false);
    // HITL state
    const [selectedOverride, setSelectedOverride] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$cityboy$2f$aegis_sre$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])(null);
    const [approvalState, setApprovalState] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$cityboy$2f$aegis_sre$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])('idle');
    const [execPhase, setExecPhase] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$cityboy$2f$aegis_sre$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])(0);
    const [isRecalculating, setIsRecalculating] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$cityboy$2f$aegis_sre$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])(false);
    const streamRef = (0, __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$cityboy$2f$aegis_sre$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useRef"])(null);
    const pollRef = (0, __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$cityboy$2f$aegis_sre$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useRef"])(null);
    (0, __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$cityboy$2f$aegis_sre$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useEffect"])({
        "IncidentPage.useEffect": ()=>{
            if (streamRef.current) streamRef.current.scrollTop = streamRef.current.scrollHeight;
        }
    }["IncidentPage.useEffect"], [
        logs.length
    ]);
    const fetchDetail = (0, __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$cityboy$2f$aegis_sre$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useCallback"])({
        "IncidentPage.useCallback[fetchDetail]": async ()=>{
            try {
                const res = await fetch(`/api/incidents/${id}`);
                if (res.ok) {
                    const data = await res.json();
                    setIncident(data.incident);
                    setLogs(data.logs);
                    setAuditLogs(data.auditLogs);
                    setReport(data.report);
                }
            } catch  {}
            setLoading(false);
        }
    }["IncidentPage.useCallback[fetchDetail]"], [
        id
    ]);
    (0, __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$cityboy$2f$aegis_sre$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useEffect"])({
        "IncidentPage.useEffect": ()=>{
            fetchDetail();
        }
    }["IncidentPage.useEffect"], [
        fetchDetail
    ]);
    (0, __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$cityboy$2f$aegis_sre$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useEffect"])({
        "IncidentPage.useEffect": ()=>{
            pollRef.current = setInterval(fetchDetail, 3000);
            return ({
                "IncidentPage.useEffect": ()=>{
                    if (pollRef.current) clearInterval(pollRef.current);
                }
            })["IncidentPage.useEffect"];
        }
    }["IncidentPage.useEffect"], [
        fetchDetail
    ]);
    // ΓöÇΓöÇ Derived data ΓöÇΓöÇΓöÇΓöÇΓöÇΓöÇΓöÇΓöÇΓöÇΓöÇΓöÇΓöÇΓöÇΓöÇΓöÇΓöÇΓöÇΓöÇΓöÇΓöÇΓöÇΓöÇΓöÇΓöÇΓöÇΓöÇΓöÇΓöÇΓöÇΓöÇΓöÇΓöÇΓöÇΓöÇΓöÇΓöÇΓöÇΓöÇΓöÇΓöÇΓöÇΓöÇ
    const needsApproval = incident?.status === 'pending_approval';
    const isResolved = incident?.status === 'resolved';
    const isFailed = incident?.status === 'failed';
    const rcaLog = logs.find((l)=>l.step === 'rca');
    const toolLog = logs.find((l)=>l.step === 'tool_execution' || l.step === 'tool_blocked');
    const baseConfidence = rcaLog?.confidence ?? null;
    const reasoning = rcaLog?.thought_process ?? '';
    const hypothesis = rcaLog?.current_hypothesis ?? 'Analysis in progress...';
    const agentSuggestedAction = describeToolAction(toolLog?.tool_call ?? rcaLog?.tool_call);
    const reportSections = report ? parseReport(report.content) : null;
    // Override options
    const overrideOptions = incident ? getOverrideOptions(incident.source) : [];
    const selectedOverrideObj = overrideOptions.find((o)=>o.value === selectedOverride) ?? null;
    // Dynamic confidence ΓÇö drops if user picks a risky override
    const effectiveConfidence = baseConfidence !== null ? getConfidenceWithOverride(baseConfidence, selectedOverrideObj?.risk ?? null) : null;
    // Dynamic prevention strategy ΓÇö recalculates on override
    const preventionStrategy = isRecalculating ? null // shows "Recalculating..." state
     : selectedOverride ? `Recalibrated: Applying "${selectedOverrideObj?.label}" as primary remediation. Agent will monitor for side effects and auto-adjust thresholds within the next 2 monitoring cycles.` : reportSections?.actionItems || 'Prevention analysis pending ΓÇö agent is still processing post-mortem data.';
    // Dynamic sentinel belief ΓÇö reacts to override
    const sentinelBelief = isRecalculating ? null : effectiveConfidence !== null ? selectedOverride ? `Human operator selected "${selectedOverrideObj?.label}" (${selectedOverrideObj?.risk} risk). ${effectiveConfidence >= 0.7 ? 'This is a reasonable alternative and the system should stabilize.' : effectiveConfidence >= 0.5 ? 'This carries moderate risk ΓÇö extended monitoring recommended post-execution.' : 'This is a high-risk override ΓÇö agent recommends close manual observation for 30 minutes post-execution.'} Updating decision bias for future incidents with similar profiles.` : `Based on ${Math.round(effectiveConfidence * 100)}% confidence analysis, ${effectiveConfidence >= 0.75 ? 'the identified root cause is highly likely correct and the applied mitigation should stabilize the system.' : effectiveConfidence >= 0.5 ? 'the diagnosis is probable but additional monitoring cycles are recommended before full confidence.' : 'further investigation is strongly recommended ΓÇö the current hypothesis needs more corroborating evidence.'} ${reportSections?.summary ? reportSections.summary.split('.').slice(0, 1).join('.') + '.' : ''}` : 'Agent is still analyzing the incident. Belief synthesis will be available after RCA completion.';
    // ΓöÇΓöÇ Override selection handler ΓöÇΓöÇΓöÇΓöÇΓöÇΓöÇΓöÇΓöÇΓöÇΓöÇΓöÇΓöÇΓöÇΓöÇΓöÇΓöÇΓöÇΓöÇΓöÇΓöÇΓöÇΓöÇΓöÇΓöÇΓöÇΓöÇΓöÇΓöÇΓöÇ
    function handleOverrideSelect(value) {
        if (value === '__reset__') {
            setSelectedOverride(null);
            return;
        }
        setSelectedOverride(value);
        // Simulate recalculation
        setIsRecalculating(true);
        setTimeout(()=>setIsRecalculating(false), 1200);
    }
    // ΓöÇΓöÇ Approve & Execute handler ΓöÇΓöÇΓöÇΓöÇΓöÇΓöÇΓöÇΓöÇΓöÇΓöÇΓöÇΓöÇΓöÇΓöÇΓöÇΓöÇΓöÇΓöÇΓöÇΓöÇΓöÇΓöÇΓöÇΓöÇΓöÇΓöÇΓöÇΓöÇΓöÇ
    async function handleApprove() {
        if (!incident) return;
        setApprovalState('executing');
        setExecPhase(0);
        // Animate through phases
        for(let i = 0; i < EXEC_PHASES.length; i++){
            setExecPhase(i);
            await new Promise((r)=>setTimeout(r, 500));
        }
        try {
            const originalAction = describeToolAction(toolLog?.tool_call ?? rcaLog?.tool_call);
            const res = await fetch(`/api/incidents/${id}/approve`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({
                    approved: true,
                    action_taken: selectedOverride || 'agent_suggested',
                    original_action: originalAction,
                    override_action: selectedOverride ? selectedOverrideObj?.label : undefined,
                    parameters: selectedOverride ? {
                        selected_fix: selectedOverride
                    } : {}
                })
            });
            if (res.ok) {
                setApprovalState('resolved');
                fetchDetail();
            }
        } catch  {
            setApprovalState('idle');
        }
    }
    // ΓöÇΓöÇ Reject handler ΓöÇΓöÇΓöÇΓöÇΓöÇΓöÇΓöÇΓöÇΓöÇΓöÇΓöÇΓöÇΓöÇΓöÇΓöÇΓöÇΓöÇΓöÇΓöÇΓöÇΓöÇΓöÇΓöÇΓöÇΓöÇΓöÇΓöÇΓöÇΓöÇΓöÇΓöÇΓöÇΓöÇΓöÇΓöÇΓöÇΓöÇΓöÇΓöÇΓöÇ
    async function handleReject() {
        if (!incident) return;
        try {
            await fetch(`/api/incidents/${id}/approve`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({
                    approved: false,
                    action_taken: 'REJECTED_BY_OPERATOR'
                })
            });
            setApprovalState('rejected');
            fetchDetail();
        } catch  {}
    }
    if (loading) {
        return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$cityboy$2f$aegis_sre$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
            className: "min-h-screen flex items-center justify-center",
            children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$cityboy$2f$aegis_sre$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                className: "flex flex-col items-center gap-4",
                children: [
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$cityboy$2f$aegis_sre$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        className: "w-10 h-10 border-2 border-primary/30 border-t-primary rounded-full animate-spin"
                    }, void 0, false, {
                        fileName: "[project]/Documents/cityboy/aegis_sre/app/incidents/[id]/page.tsx",
                        lineNumber: 428,
                        columnNumber: 21
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$cityboy$2f$aegis_sre$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                        className: "text-sm text-text-muted font-mono",
                        children: [
                            "LOADING INCIDENT ",
                            id?.slice(0, 8),
                            "..."
                        ]
                    }, void 0, true, {
                        fileName: "[project]/Documents/cityboy/aegis_sre/app/incidents/[id]/page.tsx",
                        lineNumber: 429,
                        columnNumber: 21
                    }, this)
                ]
            }, void 0, true, {
                fileName: "[project]/Documents/cityboy/aegis_sre/app/incidents/[id]/page.tsx",
                lineNumber: 427,
                columnNumber: 17
            }, this)
        }, void 0, false, {
            fileName: "[project]/Documents/cityboy/aegis_sre/app/incidents/[id]/page.tsx",
            lineNumber: 426,
            columnNumber: 13
        }, this);
    }
    if (!incident) {
        return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$cityboy$2f$aegis_sre$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
            className: "min-h-screen flex items-center justify-center",
            children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$cityboy$2f$aegis_sre$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                className: "text-text-muted",
                children: "Incident not found."
            }, void 0, false, {
                fileName: "[project]/Documents/cityboy/aegis_sre/app/incidents/[id]/page.tsx",
                lineNumber: 438,
                columnNumber: 17
            }, this)
        }, void 0, false, {
            fileName: "[project]/Documents/cityboy/aegis_sre/app/incidents/[id]/page.tsx",
            lineNumber: 437,
            columnNumber: 13
        }, this);
    }
    const risk = getRiskBadge(incident.severity);
    const action = getActionBadge(incident.status);
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$cityboy$2f$aegis_sre$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
        className: "min-h-screen flex flex-col",
        children: [
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$cityboy$2f$aegis_sre$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("header", {
                className: "sticky top-0 z-10 border-b border-border bg-background/95 backdrop-blur-sm",
                children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$cityboy$2f$aegis_sre$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                    className: "max-w-7xl mx-auto px-6 py-3 flex items-center gap-4",
                    children: [
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$cityboy$2f$aegis_sre$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("a", {
                            href: "/dashboard",
                            className: "text-text-muted hover:text-text-primary transition-colors text-sm",
                            children: "ΓåÉ Back"
                        }, void 0, false, {
                            fileName: "[project]/Documents/cityboy/aegis_sre/app/incidents/[id]/page.tsx",
                            lineNumber: 451,
                            columnNumber: 21
                        }, this),
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$cityboy$2f$aegis_sre$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                            className: "flex-1",
                            children: [
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$cityboy$2f$aegis_sre$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                    className: "flex items-center gap-3",
                                    children: [
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$cityboy$2f$aegis_sre$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                            className: "text-sm font-semibold text-text-primary",
                                            children: incident.source
                                        }, void 0, false, {
                                            fileName: "[project]/Documents/cityboy/aegis_sre/app/incidents/[id]/page.tsx",
                                            lineNumber: 454,
                                            columnNumber: 29
                                        }, this),
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$cityboy$2f$aegis_sre$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                            className: "text-text-muted text-[10px] font-mono",
                                            children: id?.slice(0, 8)
                                        }, void 0, false, {
                                            fileName: "[project]/Documents/cityboy/aegis_sre/app/incidents/[id]/page.tsx",
                                            lineNumber: 455,
                                            columnNumber: 29
                                        }, this),
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$cityboy$2f$aegis_sre$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                            className: risk.cls,
                                            children: risk.label
                                        }, void 0, false, {
                                            fileName: "[project]/Documents/cityboy/aegis_sre/app/incidents/[id]/page.tsx",
                                            lineNumber: 456,
                                            columnNumber: 29
                                        }, this),
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$cityboy$2f$aegis_sre$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                            className: action.cls,
                                            children: action.label
                                        }, void 0, false, {
                                            fileName: "[project]/Documents/cityboy/aegis_sre/app/incidents/[id]/page.tsx",
                                            lineNumber: 457,
                                            columnNumber: 29
                                        }, this)
                                    ]
                                }, void 0, true, {
                                    fileName: "[project]/Documents/cityboy/aegis_sre/app/incidents/[id]/page.tsx",
                                    lineNumber: 453,
                                    columnNumber: 25
                                }, this),
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$cityboy$2f$aegis_sre$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                    className: "text-[10px] text-text-muted font-mono mt-0.5",
                                    children: new Date(incident.created_at).toLocaleString()
                                }, void 0, false, {
                                    fileName: "[project]/Documents/cityboy/aegis_sre/app/incidents/[id]/page.tsx",
                                    lineNumber: 459,
                                    columnNumber: 25
                                }, this)
                            ]
                        }, void 0, true, {
                            fileName: "[project]/Documents/cityboy/aegis_sre/app/incidents/[id]/page.tsx",
                            lineNumber: 452,
                            columnNumber: 21
                        }, this)
                    ]
                }, void 0, true, {
                    fileName: "[project]/Documents/cityboy/aegis_sre/app/incidents/[id]/page.tsx",
                    lineNumber: 450,
                    columnNumber: 17
                }, this)
            }, void 0, false, {
                fileName: "[project]/Documents/cityboy/aegis_sre/app/incidents/[id]/page.tsx",
                lineNumber: 449,
                columnNumber: 13
            }, this),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$cityboy$2f$aegis_sre$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("main", {
                className: "flex-1 max-w-7xl mx-auto w-full px-6 py-6 space-y-4",
                children: [
                    effectiveConfidence !== null && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$cityboy$2f$aegis_sre$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(ConfidenceBar, {
                        value: effectiveConfidence,
                        onViewReasoning: ()=>setShowReasoning(true)
                    }, void 0, false, {
                        fileName: "[project]/Documents/cityboy/aegis_sre/app/incidents/[id]/page.tsx",
                        lineNumber: 467,
                        columnNumber: 21
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$cityboy$2f$aegis_sre$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        className: "grid grid-cols-1 lg:grid-cols-2 gap-5",
                        children: [
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$cityboy$2f$aegis_sre$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                className: "space-y-4",
                                children: [
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$cityboy$2f$aegis_sre$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("h2", {
                                        className: "text-xs font-bold text-text-muted uppercase tracking-[0.15em] flex items-center gap-2",
                                        children: [
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$cityboy$2f$aegis_sre$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                className: "w-1.5 h-1.5 rounded-full bg-primary"
                                            }, void 0, false, {
                                                fileName: "[project]/Documents/cityboy/aegis_sre/app/incidents/[id]/page.tsx",
                                                lineNumber: 479,
                                                columnNumber: 29
                                            }, this),
                                            "Sovereign Verdict"
                                        ]
                                    }, void 0, true, {
                                        fileName: "[project]/Documents/cityboy/aegis_sre/app/incidents/[id]/page.tsx",
                                        lineNumber: 478,
                                        columnNumber: 25
                                    }, this),
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$cityboy$2f$aegis_sre$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                        className: "sg-verdict-card",
                                        children: [
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$cityboy$2f$aegis_sre$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                className: "sg-verdict-label",
                                                children: [
                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$cityboy$2f$aegis_sre$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("svg", {
                                                        className: "w-3 h-3 text-risk-high",
                                                        fill: "none",
                                                        stroke: "currentColor",
                                                        viewBox: "0 0 24 24",
                                                        children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$cityboy$2f$aegis_sre$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("path", {
                                                            strokeLinecap: "round",
                                                            strokeLinejoin: "round",
                                                            strokeWidth: 2,
                                                            d: "M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-2.5L13.732 4c-.77-.833-1.964-.833-2.732 0L4.082 16.5c-.77.833.192 2.5 1.732 2.5z"
                                                        }, void 0, false, {
                                                            fileName: "[project]/Documents/cityboy/aegis_sre/app/incidents/[id]/page.tsx",
                                                            lineNumber: 486,
                                                            columnNumber: 127
                                                        }, this)
                                                    }, void 0, false, {
                                                        fileName: "[project]/Documents/cityboy/aegis_sre/app/incidents/[id]/page.tsx",
                                                        lineNumber: 486,
                                                        columnNumber: 33
                                                    }, this),
                                                    "Identified Root Cause"
                                                ]
                                            }, void 0, true, {
                                                fileName: "[project]/Documents/cityboy/aegis_sre/app/incidents/[id]/page.tsx",
                                                lineNumber: 485,
                                                columnNumber: 29
                                            }, this),
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$cityboy$2f$aegis_sre$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                                className: "sg-verdict-content font-semibold",
                                                children: reportSections?.rootCause || hypothesis
                                            }, void 0, false, {
                                                fileName: "[project]/Documents/cityboy/aegis_sre/app/incidents/[id]/page.tsx",
                                                lineNumber: 489,
                                                columnNumber: 29
                                            }, this)
                                        ]
                                    }, void 0, true, {
                                        fileName: "[project]/Documents/cityboy/aegis_sre/app/incidents/[id]/page.tsx",
                                        lineNumber: 484,
                                        columnNumber: 25
                                    }, this),
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$cityboy$2f$aegis_sre$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                        className: `sg-verdict-card transition-all duration-300 ${needsApproval ? 'border-action-pending/40 shadow-[0_0_25px_rgba(234,179,8,0.08)]' : isResolved ? 'border-safe/40' : ''}`,
                                        children: [
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$cityboy$2f$aegis_sre$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                className: "sg-verdict-label",
                                                children: [
                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$cityboy$2f$aegis_sre$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("svg", {
                                                        className: "w-3 h-3 text-safe",
                                                        fill: "none",
                                                        stroke: "currentColor",
                                                        viewBox: "0 0 24 24",
                                                        children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$cityboy$2f$aegis_sre$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("path", {
                                                            strokeLinecap: "round",
                                                            strokeLinejoin: "round",
                                                            strokeWidth: 2,
                                                            d: "M13 10V3L4 14h7v7l9-11h-7z"
                                                        }, void 0, false, {
                                                            fileName: "[project]/Documents/cityboy/aegis_sre/app/incidents/[id]/page.tsx",
                                                            lineNumber: 495,
                                                            columnNumber: 122
                                                        }, this)
                                                    }, void 0, false, {
                                                        fileName: "[project]/Documents/cityboy/aegis_sre/app/incidents/[id]/page.tsx",
                                                        lineNumber: 495,
                                                        columnNumber: 33
                                                    }, this),
                                                    needsApproval ? 'Suggested Fix' : 'Applied Fix'
                                                ]
                                            }, void 0, true, {
                                                fileName: "[project]/Documents/cityboy/aegis_sre/app/incidents/[id]/page.tsx",
                                                lineNumber: 494,
                                                columnNumber: 29
                                            }, this),
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$cityboy$2f$aegis_sre$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                                className: `sg-verdict-content ${selectedOverride ? 'line-through text-text-muted' : ''}`,
                                                children: agentSuggestedAction
                                            }, void 0, false, {
                                                fileName: "[project]/Documents/cityboy/aegis_sre/app/incidents/[id]/page.tsx",
                                                lineNumber: 499,
                                                columnNumber: 29
                                            }, this),
                                            selectedOverride && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$cityboy$2f$aegis_sre$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                className: "mt-2 flex items-center gap-2",
                                                children: [
                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$cityboy$2f$aegis_sre$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                        className: "text-[10px] text-action-pending font-semibold uppercase tracking-wider",
                                                        children: "Override ΓåÆ"
                                                    }, void 0, false, {
                                                        fileName: "[project]/Documents/cityboy/aegis_sre/app/incidents/[id]/page.tsx",
                                                        lineNumber: 504,
                                                        columnNumber: 37
                                                    }, this),
                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$cityboy$2f$aegis_sre$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                        className: "text-sm text-text-primary font-semibold",
                                                        children: selectedOverrideObj?.label
                                                    }, void 0, false, {
                                                        fileName: "[project]/Documents/cityboy/aegis_sre/app/incidents/[id]/page.tsx",
                                                        lineNumber: 505,
                                                        columnNumber: 37
                                                    }, this),
                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$cityboy$2f$aegis_sre$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                        className: `text-[9px] px-1.5 py-0.5 rounded-full font-mono ${selectedOverrideObj?.risk === 'high' ? 'bg-red-950/60 text-red-400' : selectedOverrideObj?.risk === 'medium' ? 'bg-amber-950/60 text-amber-400' : 'bg-emerald-950/60 text-emerald-400'}`,
                                                        children: [
                                                            selectedOverrideObj?.risk?.toUpperCase(),
                                                            " RISK"
                                                        ]
                                                    }, void 0, true, {
                                                        fileName: "[project]/Documents/cityboy/aegis_sre/app/incidents/[id]/page.tsx",
                                                        lineNumber: 506,
                                                        columnNumber: 37
                                                    }, this)
                                                ]
                                            }, void 0, true, {
                                                fileName: "[project]/Documents/cityboy/aegis_sre/app/incidents/[id]/page.tsx",
                                                lineNumber: 503,
                                                columnNumber: 33
                                            }, this),
                                            needsApproval && approvalState === 'idle' && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$cityboy$2f$aegis_sre$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                className: "mt-3 pt-3 border-t border-border/40",
                                                children: [
                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$cityboy$2f$aegis_sre$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("label", {
                                                        className: "text-[10px] text-text-muted uppercase tracking-wider font-semibold block mb-1.5",
                                                        children: "Modify Action"
                                                    }, void 0, false, {
                                                        fileName: "[project]/Documents/cityboy/aegis_sre/app/incidents/[id]/page.tsx",
                                                        lineNumber: 515,
                                                        columnNumber: 37
                                                    }, this),
                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$cityboy$2f$aegis_sre$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("select", {
                                                        value: selectedOverride || '__default__',
                                                        onChange: (e)=>handleOverrideSelect(e.target.value === '__default__' ? '__reset__' : e.target.value),
                                                        className: "w-full bg-surface-3 border border-border rounded-lg px-3 py-2 text-sm text-text-primary focus:outline-none focus:ring-1 focus:ring-primary focus:border-primary transition-colors cursor-pointer appearance-none",
                                                        style: {
                                                            backgroundImage: `url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' fill='none' viewBox='0 0 24 24' stroke='%2394a3b8'%3E%3Cpath stroke-linecap='round' stroke-linejoin='round' stroke-width='2' d='M19 9l-7 7-7-7'/%3E%3C/svg%3E")`,
                                                            backgroundRepeat: 'no-repeat',
                                                            backgroundPosition: 'right 10px center',
                                                            backgroundSize: '16px'
                                                        },
                                                        children: [
                                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$cityboy$2f$aegis_sre$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("option", {
                                                                value: "__default__",
                                                                children: "Use agent suggestion (default)"
                                                            }, void 0, false, {
                                                                fileName: "[project]/Documents/cityboy/aegis_sre/app/incidents/[id]/page.tsx",
                                                                lineNumber: 524,
                                                                columnNumber: 41
                                                            }, this),
                                                            overrideOptions.map((opt)=>/*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$cityboy$2f$aegis_sre$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("option", {
                                                                    value: opt.value,
                                                                    children: [
                                                                        opt.label,
                                                                        " (",
                                                                        opt.risk,
                                                                        " risk)"
                                                                    ]
                                                                }, opt.value, true, {
                                                                    fileName: "[project]/Documents/cityboy/aegis_sre/app/incidents/[id]/page.tsx",
                                                                    lineNumber: 526,
                                                                    columnNumber: 45
                                                                }, this))
                                                        ]
                                                    }, void 0, true, {
                                                        fileName: "[project]/Documents/cityboy/aegis_sre/app/incidents/[id]/page.tsx",
                                                        lineNumber: 518,
                                                        columnNumber: 37
                                                    }, this)
                                                ]
                                            }, void 0, true, {
                                                fileName: "[project]/Documents/cityboy/aegis_sre/app/incidents/[id]/page.tsx",
                                                lineNumber: 514,
                                                columnNumber: 33
                                            }, this),
                                            needsApproval && approvalState === 'idle' && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$cityboy$2f$aegis_sre$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                className: "mt-4 flex gap-3",
                                                children: [
                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$cityboy$2f$aegis_sre$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                                                        onClick: handleApprove,
                                                        className: "flex-1 sg-btn bg-safe hover:bg-safe/90 border-safe/60 text-white font-bold justify-center text-sm",
                                                        style: {
                                                            boxShadow: '0 0 25px rgba(16,185,129,0.2)'
                                                        },
                                                        id: "approve-execute-btn",
                                                        children: "Γ£à Approve & Execute"
                                                    }, void 0, false, {
                                                        fileName: "[project]/Documents/cityboy/aegis_sre/app/incidents/[id]/page.tsx",
                                                        lineNumber: 537,
                                                        columnNumber: 37
                                                    }, this),
                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$cityboy$2f$aegis_sre$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                                                        onClick: handleReject,
                                                        className: "sg-btn-danger justify-center text-sm px-5",
                                                        id: "reject-btn",
                                                        children: "≡ƒ¢æ Reject"
                                                    }, void 0, false, {
                                                        fileName: "[project]/Documents/cityboy/aegis_sre/app/incidents/[id]/page.tsx",
                                                        lineNumber: 545,
                                                        columnNumber: 37
                                                    }, this)
                                                ]
                                            }, void 0, true, {
                                                fileName: "[project]/Documents/cityboy/aegis_sre/app/incidents/[id]/page.tsx",
                                                lineNumber: 536,
                                                columnNumber: 33
                                            }, this),
                                            approvalState === 'executing' && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$cityboy$2f$aegis_sre$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                className: "mt-4 p-3 bg-surface-3/60 rounded-lg border border-primary/30",
                                                children: [
                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$cityboy$2f$aegis_sre$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                        className: "flex items-center gap-3 mb-2",
                                                        children: [
                                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$cityboy$2f$aegis_sre$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                                className: "w-4 h-4 border-2 border-primary/40 border-t-primary rounded-full animate-spin"
                                                            }, void 0, false, {
                                                                fileName: "[project]/Documents/cityboy/aegis_sre/app/incidents/[id]/page.tsx",
                                                                lineNumber: 559,
                                                                columnNumber: 41
                                                            }, this),
                                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$cityboy$2f$aegis_sre$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                                className: "text-xs font-mono text-primary font-semibold animate-pulse",
                                                                children: EXEC_PHASES[execPhase]
                                                            }, void 0, false, {
                                                                fileName: "[project]/Documents/cityboy/aegis_sre/app/incidents/[id]/page.tsx",
                                                                lineNumber: 560,
                                                                columnNumber: 41
                                                            }, this)
                                                        ]
                                                    }, void 0, true, {
                                                        fileName: "[project]/Documents/cityboy/aegis_sre/app/incidents/[id]/page.tsx",
                                                        lineNumber: 558,
                                                        columnNumber: 37
                                                    }, this),
                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$cityboy$2f$aegis_sre$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                        className: "w-full h-1 bg-surface-3 rounded-full overflow-hidden",
                                                        children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$cityboy$2f$aegis_sre$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                            className: "h-full bg-primary rounded-full transition-all duration-500",
                                                            style: {
                                                                width: `${(execPhase + 1) / EXEC_PHASES.length * 100}%`
                                                            }
                                                        }, void 0, false, {
                                                            fileName: "[project]/Documents/cityboy/aegis_sre/app/incidents/[id]/page.tsx",
                                                            lineNumber: 563,
                                                            columnNumber: 41
                                                        }, this)
                                                    }, void 0, false, {
                                                        fileName: "[project]/Documents/cityboy/aegis_sre/app/incidents/[id]/page.tsx",
                                                        lineNumber: 562,
                                                        columnNumber: 37
                                                    }, this)
                                                ]
                                            }, void 0, true, {
                                                fileName: "[project]/Documents/cityboy/aegis_sre/app/incidents/[id]/page.tsx",
                                                lineNumber: 557,
                                                columnNumber: 33
                                            }, this),
                                            (approvalState === 'resolved' || isResolved && approvalState === 'idle') && !needsApproval && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$cityboy$2f$aegis_sre$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                className: "mt-3 flex items-center gap-2 p-2 bg-emerald-950/30 rounded-lg border border-safe/20",
                                                children: [
                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$cityboy$2f$aegis_sre$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                        className: "text-safe text-lg",
                                                        children: "Γ£ô"
                                                    }, void 0, false, {
                                                        fileName: "[project]/Documents/cityboy/aegis_sre/app/incidents/[id]/page.tsx",
                                                        lineNumber: 571,
                                                        columnNumber: 37
                                                    }, this),
                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$cityboy$2f$aegis_sre$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                        className: "text-xs font-semibold text-safe",
                                                        children: "Action executed successfully ΓÇö system stabilized"
                                                    }, void 0, false, {
                                                        fileName: "[project]/Documents/cityboy/aegis_sre/app/incidents/[id]/page.tsx",
                                                        lineNumber: 572,
                                                        columnNumber: 37
                                                    }, this)
                                                ]
                                            }, void 0, true, {
                                                fileName: "[project]/Documents/cityboy/aegis_sre/app/incidents/[id]/page.tsx",
                                                lineNumber: 570,
                                                columnNumber: 33
                                            }, this),
                                            (approvalState === 'rejected' || isFailed) && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$cityboy$2f$aegis_sre$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                className: "mt-3 flex items-center gap-2 p-2 bg-red-950/30 rounded-lg border border-critical/20",
                                                children: [
                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$cityboy$2f$aegis_sre$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                        className: "text-critical text-lg",
                                                        children: "Γ£ò"
                                                    }, void 0, false, {
                                                        fileName: "[project]/Documents/cityboy/aegis_sre/app/incidents/[id]/page.tsx",
                                                        lineNumber: 579,
                                                        columnNumber: 37
                                                    }, this),
                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$cityboy$2f$aegis_sre$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                        className: "text-xs font-semibold text-critical",
                                                        children: "Action rejected by operator ΓÇö manual intervention required"
                                                    }, void 0, false, {
                                                        fileName: "[project]/Documents/cityboy/aegis_sre/app/incidents/[id]/page.tsx",
                                                        lineNumber: 580,
                                                        columnNumber: 37
                                                    }, this)
                                                ]
                                            }, void 0, true, {
                                                fileName: "[project]/Documents/cityboy/aegis_sre/app/incidents/[id]/page.tsx",
                                                lineNumber: 578,
                                                columnNumber: 33
                                            }, this)
                                        ]
                                    }, void 0, true, {
                                        fileName: "[project]/Documents/cityboy/aegis_sre/app/incidents/[id]/page.tsx",
                                        lineNumber: 493,
                                        columnNumber: 25
                                    }, this),
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$cityboy$2f$aegis_sre$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                        className: "sg-verdict-card",
                                        children: [
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$cityboy$2f$aegis_sre$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                className: "sg-verdict-label",
                                                children: [
                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$cityboy$2f$aegis_sre$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("svg", {
                                                        className: "w-3 h-3 text-primary",
                                                        fill: "none",
                                                        stroke: "currentColor",
                                                        viewBox: "0 0 24 24",
                                                        children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$cityboy$2f$aegis_sre$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("path", {
                                                            strokeLinecap: "round",
                                                            strokeLinejoin: "round",
                                                            strokeWidth: 2,
                                                            d: "M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z"
                                                        }, void 0, false, {
                                                            fileName: "[project]/Documents/cityboy/aegis_sre/app/incidents/[id]/page.tsx",
                                                            lineNumber: 588,
                                                            columnNumber: 125
                                                        }, this)
                                                    }, void 0, false, {
                                                        fileName: "[project]/Documents/cityboy/aegis_sre/app/incidents/[id]/page.tsx",
                                                        lineNumber: 588,
                                                        columnNumber: 33
                                                    }, this),
                                                    "Prevention Strategy",
                                                    isRecalculating && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$cityboy$2f$aegis_sre$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                        className: "text-[9px] text-action-pending animate-pulse ml-1",
                                                        children: "RECALCULATING"
                                                    }, void 0, false, {
                                                        fileName: "[project]/Documents/cityboy/aegis_sre/app/incidents/[id]/page.tsx",
                                                        lineNumber: 590,
                                                        columnNumber: 53
                                                    }, this)
                                                ]
                                            }, void 0, true, {
                                                fileName: "[project]/Documents/cityboy/aegis_sre/app/incidents/[id]/page.tsx",
                                                lineNumber: 587,
                                                columnNumber: 29
                                            }, this),
                                            isRecalculating ? /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$cityboy$2f$aegis_sre$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                className: "flex items-center gap-2 py-2",
                                                children: [
                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$cityboy$2f$aegis_sre$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                        className: "w-3 h-3 border border-primary/40 border-t-primary rounded-full animate-spin"
                                                    }, void 0, false, {
                                                        fileName: "[project]/Documents/cityboy/aegis_sre/app/incidents/[id]/page.tsx",
                                                        lineNumber: 594,
                                                        columnNumber: 37
                                                    }, this),
                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$cityboy$2f$aegis_sre$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                        className: "text-xs text-text-muted font-mono",
                                                        children: "Recalculating strategy based on override selection..."
                                                    }, void 0, false, {
                                                        fileName: "[project]/Documents/cityboy/aegis_sre/app/incidents/[id]/page.tsx",
                                                        lineNumber: 595,
                                                        columnNumber: 37
                                                    }, this)
                                                ]
                                            }, void 0, true, {
                                                fileName: "[project]/Documents/cityboy/aegis_sre/app/incidents/[id]/page.tsx",
                                                lineNumber: 593,
                                                columnNumber: 33
                                            }, this) : /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$cityboy$2f$aegis_sre$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                                className: "sg-verdict-content",
                                                children: preventionStrategy
                                            }, void 0, false, {
                                                fileName: "[project]/Documents/cityboy/aegis_sre/app/incidents/[id]/page.tsx",
                                                lineNumber: 598,
                                                columnNumber: 33
                                            }, this)
                                        ]
                                    }, void 0, true, {
                                        fileName: "[project]/Documents/cityboy/aegis_sre/app/incidents/[id]/page.tsx",
                                        lineNumber: 586,
                                        columnNumber: 25
                                    }, this),
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$cityboy$2f$aegis_sre$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                        className: "sg-verdict-card border-primary/20",
                                        children: [
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$cityboy$2f$aegis_sre$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                className: "sg-verdict-label",
                                                children: [
                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$cityboy$2f$aegis_sre$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("svg", {
                                                        className: "w-3 h-3 text-secondary",
                                                        fill: "none",
                                                        stroke: "currentColor",
                                                        viewBox: "0 0 24 24",
                                                        children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$cityboy$2f$aegis_sre$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("path", {
                                                            strokeLinecap: "round",
                                                            strokeLinejoin: "round",
                                                            strokeWidth: 2,
                                                            d: "M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z"
                                                        }, void 0, false, {
                                                            fileName: "[project]/Documents/cityboy/aegis_sre/app/incidents/[id]/page.tsx",
                                                            lineNumber: 605,
                                                            columnNumber: 127
                                                        }, this)
                                                    }, void 0, false, {
                                                        fileName: "[project]/Documents/cityboy/aegis_sre/app/incidents/[id]/page.tsx",
                                                        lineNumber: 605,
                                                        columnNumber: 33
                                                    }, this),
                                                    "Sentinel Belief",
                                                    isRecalculating && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$cityboy$2f$aegis_sre$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                        className: "text-[9px] text-action-pending animate-pulse ml-1",
                                                        children: "UPDATING"
                                                    }, void 0, false, {
                                                        fileName: "[project]/Documents/cityboy/aegis_sre/app/incidents/[id]/page.tsx",
                                                        lineNumber: 607,
                                                        columnNumber: 53
                                                    }, this)
                                                ]
                                            }, void 0, true, {
                                                fileName: "[project]/Documents/cityboy/aegis_sre/app/incidents/[id]/page.tsx",
                                                lineNumber: 604,
                                                columnNumber: 29
                                            }, this),
                                            isRecalculating ? /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$cityboy$2f$aegis_sre$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                className: "flex items-center gap-2 py-2",
                                                children: [
                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$cityboy$2f$aegis_sre$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                        className: "w-3 h-3 border border-primary/40 border-t-primary rounded-full animate-spin"
                                                    }, void 0, false, {
                                                        fileName: "[project]/Documents/cityboy/aegis_sre/app/incidents/[id]/page.tsx",
                                                        lineNumber: 611,
                                                        columnNumber: 37
                                                    }, this),
                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$cityboy$2f$aegis_sre$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                        className: "text-xs text-text-muted font-mono",
                                                        children: "Re-evaluating confidence with modified action path..."
                                                    }, void 0, false, {
                                                        fileName: "[project]/Documents/cityboy/aegis_sre/app/incidents/[id]/page.tsx",
                                                        lineNumber: 612,
                                                        columnNumber: 37
                                                    }, this)
                                                ]
                                            }, void 0, true, {
                                                fileName: "[project]/Documents/cityboy/aegis_sre/app/incidents/[id]/page.tsx",
                                                lineNumber: 610,
                                                columnNumber: 33
                                            }, this) : /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$cityboy$2f$aegis_sre$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                                className: "sg-verdict-content italic text-text-secondary",
                                                children: sentinelBelief
                                            }, void 0, false, {
                                                fileName: "[project]/Documents/cityboy/aegis_sre/app/incidents/[id]/page.tsx",
                                                lineNumber: 615,
                                                columnNumber: 33
                                            }, this)
                                        ]
                                    }, void 0, true, {
                                        fileName: "[project]/Documents/cityboy/aegis_sre/app/incidents/[id]/page.tsx",
                                        lineNumber: 603,
                                        columnNumber: 25
                                    }, this),
                                    incident.metadata && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$cityboy$2f$aegis_sre$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                        className: "sg-verdict-card",
                                        children: [
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$cityboy$2f$aegis_sre$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                className: "sg-verdict-label",
                                                children: [
                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$cityboy$2f$aegis_sre$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("svg", {
                                                        className: "w-3 h-3 text-text-muted",
                                                        fill: "none",
                                                        stroke: "currentColor",
                                                        viewBox: "0 0 24 24",
                                                        children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$cityboy$2f$aegis_sre$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("path", {
                                                            strokeLinecap: "round",
                                                            strokeLinejoin: "round",
                                                            strokeWidth: 2,
                                                            d: "M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z"
                                                        }, void 0, false, {
                                                            fileName: "[project]/Documents/cityboy/aegis_sre/app/incidents/[id]/page.tsx",
                                                            lineNumber: 623,
                                                            columnNumber: 132
                                                        }, this)
                                                    }, void 0, false, {
                                                        fileName: "[project]/Documents/cityboy/aegis_sre/app/incidents/[id]/page.tsx",
                                                        lineNumber: 623,
                                                        columnNumber: 37
                                                    }, this),
                                                    "Metrics at Detection"
                                                ]
                                            }, void 0, true, {
                                                fileName: "[project]/Documents/cityboy/aegis_sre/app/incidents/[id]/page.tsx",
                                                lineNumber: 622,
                                                columnNumber: 33
                                            }, this),
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$cityboy$2f$aegis_sre$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                className: "grid grid-cols-3 gap-2 mt-1",
                                                children: Object.entries(incident.metadata).map(([k, v])=>/*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$cityboy$2f$aegis_sre$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                        className: "text-center p-1.5 bg-surface-3/50 rounded",
                                                        children: [
                                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$cityboy$2f$aegis_sre$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                                                className: "text-[9px] text-text-muted uppercase",
                                                                children: k.replace(/_/g, ' ')
                                                            }, void 0, false, {
                                                                fileName: "[project]/Documents/cityboy/aegis_sre/app/incidents/[id]/page.tsx",
                                                                lineNumber: 629,
                                                                columnNumber: 45
                                                            }, this),
                                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$cityboy$2f$aegis_sre$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                                                className: "font-mono text-xs text-text-primary font-bold",
                                                                children: typeof v === 'number' ? v.toFixed(1) : v
                                                            }, void 0, false, {
                                                                fileName: "[project]/Documents/cityboy/aegis_sre/app/incidents/[id]/page.tsx",
                                                                lineNumber: 630,
                                                                columnNumber: 45
                                                            }, this)
                                                        ]
                                                    }, k, true, {
                                                        fileName: "[project]/Documents/cityboy/aegis_sre/app/incidents/[id]/page.tsx",
                                                        lineNumber: 628,
                                                        columnNumber: 41
                                                    }, this))
                                            }, void 0, false, {
                                                fileName: "[project]/Documents/cityboy/aegis_sre/app/incidents/[id]/page.tsx",
                                                lineNumber: 626,
                                                columnNumber: 33
                                            }, this)
                                        ]
                                    }, void 0, true, {
                                        fileName: "[project]/Documents/cityboy/aegis_sre/app/incidents/[id]/page.tsx",
                                        lineNumber: 621,
                                        columnNumber: 29
                                    }, this)
                                ]
                            }, void 0, true, {
                                fileName: "[project]/Documents/cityboy/aegis_sre/app/incidents/[id]/page.tsx",
                                lineNumber: 477,
                                columnNumber: 21
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$cityboy$2f$aegis_sre$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                className: "sg-card flex flex-col gap-3",
                                children: [
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$cityboy$2f$aegis_sre$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                        className: "flex items-center justify-between",
                                        children: [
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$cityboy$2f$aegis_sre$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("h2", {
                                                className: "text-xs font-bold text-text-muted uppercase tracking-[0.15em] flex items-center gap-2",
                                                children: [
                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$cityboy$2f$aegis_sre$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                        className: "w-1.5 h-1.5 rounded-full bg-secondary"
                                                    }, void 0, false, {
                                                        fileName: "[project]/Documents/cityboy/aegis_sre/app/incidents/[id]/page.tsx",
                                                        lineNumber: 642,
                                                        columnNumber: 33
                                                    }, this),
                                                    "Thought Stream"
                                                ]
                                            }, void 0, true, {
                                                fileName: "[project]/Documents/cityboy/aegis_sre/app/incidents/[id]/page.tsx",
                                                lineNumber: 641,
                                                columnNumber: 29
                                            }, this),
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$cityboy$2f$aegis_sre$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                className: "flex items-center gap-3",
                                                children: [
                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$cityboy$2f$aegis_sre$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                        className: "text-[10px] font-mono text-text-muted",
                                                        children: [
                                                            logs.length,
                                                            " steps"
                                                        ]
                                                    }, void 0, true, {
                                                        fileName: "[project]/Documents/cityboy/aegis_sre/app/incidents/[id]/page.tsx",
                                                        lineNumber: 646,
                                                        columnNumber: 33
                                                    }, this),
                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$cityboy$2f$aegis_sre$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                                                        onClick: ()=>setShowTechDetails(!showTechDetails),
                                                        className: `sg-detail-toggle ${showTechDetails ? 'text-primary' : ''}`,
                                                        children: [
                                                            showTechDetails ? 'Γùë' : 'Γùï',
                                                            " Technical Details"
                                                        ]
                                                    }, void 0, true, {
                                                        fileName: "[project]/Documents/cityboy/aegis_sre/app/incidents/[id]/page.tsx",
                                                        lineNumber: 647,
                                                        columnNumber: 33
                                                    }, this)
                                                ]
                                            }, void 0, true, {
                                                fileName: "[project]/Documents/cityboy/aegis_sre/app/incidents/[id]/page.tsx",
                                                lineNumber: 645,
                                                columnNumber: 29
                                            }, this)
                                        ]
                                    }, void 0, true, {
                                        fileName: "[project]/Documents/cityboy/aegis_sre/app/incidents/[id]/page.tsx",
                                        lineNumber: 640,
                                        columnNumber: 25
                                    }, this),
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$cityboy$2f$aegis_sre$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                        ref: streamRef,
                                        className: "overflow-y-auto pr-1",
                                        style: {
                                            scrollBehavior: 'smooth',
                                            maxHeight: logs.length > 4 ? '650px' : undefined
                                        },
                                        children: logs.length === 0 ? /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$cityboy$2f$aegis_sre$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                            className: "flex items-center justify-center py-10 text-text-muted text-sm",
                                            children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$cityboy$2f$aegis_sre$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                                children: "Waiting for agent to start reasoning..."
                                            }, void 0, false, {
                                                fileName: "[project]/Documents/cityboy/aegis_sre/app/incidents/[id]/page.tsx",
                                                lineNumber: 663,
                                                columnNumber: 37
                                            }, this)
                                        }, void 0, false, {
                                            fileName: "[project]/Documents/cityboy/aegis_sre/app/incidents/[id]/page.tsx",
                                            lineNumber: 662,
                                            columnNumber: 33
                                        }, this) : logs.map((log, i)=>/*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$cityboy$2f$aegis_sre$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(ThoughtItem, {
                                                log: log,
                                                index: i,
                                                showDetails: showTechDetails
                                            }, log.id, false, {
                                                fileName: "[project]/Documents/cityboy/aegis_sre/app/incidents/[id]/page.tsx",
                                                lineNumber: 667,
                                                columnNumber: 37
                                            }, this))
                                    }, void 0, false, {
                                        fileName: "[project]/Documents/cityboy/aegis_sre/app/incidents/[id]/page.tsx",
                                        lineNumber: 656,
                                        columnNumber: 25
                                    }, this)
                                ]
                            }, void 0, true, {
                                fileName: "[project]/Documents/cityboy/aegis_sre/app/incidents/[id]/page.tsx",
                                lineNumber: 639,
                                columnNumber: 21
                            }, this)
                        ]
                    }, void 0, true, {
                        fileName: "[project]/Documents/cityboy/aegis_sre/app/incidents/[id]/page.tsx",
                        lineNumber: 474,
                        columnNumber: 17
                    }, this)
                ]
            }, void 0, true, {
                fileName: "[project]/Documents/cityboy/aegis_sre/app/incidents/[id]/page.tsx",
                lineNumber: 464,
                columnNumber: 13
            }, this),
            showReasoning && effectiveConfidence !== null && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$cityboy$2f$aegis_sre$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(ReasoningOverlay, {
                reasoning: reasoning,
                confidence: effectiveConfidence,
                onClose: ()=>setShowReasoning(false)
            }, void 0, false, {
                fileName: "[project]/Documents/cityboy/aegis_sre/app/incidents/[id]/page.tsx",
                lineNumber: 677,
                columnNumber: 17
            }, this)
        ]
    }, void 0, true, {
        fileName: "[project]/Documents/cityboy/aegis_sre/app/incidents/[id]/page.tsx",
        lineNumber: 447,
        columnNumber: 9
    }, this);
}
_s(IncidentPage, "eod7D5yaODgzlr29+xAUYx1oxX0=", false, function() {
    return [
        __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$cityboy$2f$aegis_sre$2f$node_modules$2f$next$2f$navigation$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useParams"]
    ];
});
_c3 = IncidentPage;
var _c, _c1, _c2, _c3;
__turbopack_context__.k.register(_c, "ConfidenceBar");
__turbopack_context__.k.register(_c1, "ReasoningOverlay");
__turbopack_context__.k.register(_c2, "ThoughtItem");
__turbopack_context__.k.register(_c3, "IncidentPage");
if (typeof globalThis.$RefreshHelpers$ === 'object' && globalThis.$RefreshHelpers !== null) {
    __turbopack_context__.k.registerExports(__turbopack_context__.m, globalThis.$RefreshHelpers$);
}
}),
]);

//# sourceMappingURL=Documents_cityboy_aegis_sre_app_incidents_%5Bid%5D_page_tsx_ab5f1e79._.js.map