module.exports = [
"[externals]/next/dist/compiled/next-server/app-route-turbo.runtime.dev.js [external] (next/dist/compiled/next-server/app-route-turbo.runtime.dev.js, cjs)", ((__turbopack_context__, module, exports) => {

const mod = __turbopack_context__.x("next/dist/compiled/next-server/app-route-turbo.runtime.dev.js", () => require("next/dist/compiled/next-server/app-route-turbo.runtime.dev.js"));

module.exports = mod;
}),
"[externals]/next/dist/compiled/@opentelemetry/api [external] (next/dist/compiled/@opentelemetry/api, cjs)", ((__turbopack_context__, module, exports) => {

const mod = __turbopack_context__.x("next/dist/compiled/@opentelemetry/api", () => require("next/dist/compiled/@opentelemetry/api"));

module.exports = mod;
}),
"[externals]/next/dist/compiled/next-server/app-page-turbo.runtime.dev.js [external] (next/dist/compiled/next-server/app-page-turbo.runtime.dev.js, cjs)", ((__turbopack_context__, module, exports) => {

const mod = __turbopack_context__.x("next/dist/compiled/next-server/app-page-turbo.runtime.dev.js", () => require("next/dist/compiled/next-server/app-page-turbo.runtime.dev.js"));

module.exports = mod;
}),
"[externals]/next/dist/server/app-render/work-unit-async-storage.external.js [external] (next/dist/server/app-render/work-unit-async-storage.external.js, cjs)", ((__turbopack_context__, module, exports) => {

const mod = __turbopack_context__.x("next/dist/server/app-render/work-unit-async-storage.external.js", () => require("next/dist/server/app-render/work-unit-async-storage.external.js"));

module.exports = mod;
}),
"[externals]/next/dist/server/app-render/work-async-storage.external.js [external] (next/dist/server/app-render/work-async-storage.external.js, cjs)", ((__turbopack_context__, module, exports) => {

const mod = __turbopack_context__.x("next/dist/server/app-render/work-async-storage.external.js", () => require("next/dist/server/app-render/work-async-storage.external.js"));

module.exports = mod;
}),
"[externals]/next/dist/shared/lib/no-fallback-error.external.js [external] (next/dist/shared/lib/no-fallback-error.external.js, cjs)", ((__turbopack_context__, module, exports) => {

const mod = __turbopack_context__.x("next/dist/shared/lib/no-fallback-error.external.js", () => require("next/dist/shared/lib/no-fallback-error.external.js"));

module.exports = mod;
}),
"[externals]/next/dist/server/app-render/after-task-async-storage.external.js [external] (next/dist/server/app-render/after-task-async-storage.external.js, cjs)", ((__turbopack_context__, module, exports) => {

const mod = __turbopack_context__.x("next/dist/server/app-render/after-task-async-storage.external.js", () => require("next/dist/server/app-render/after-task-async-storage.external.js"));

module.exports = mod;
}),
"[project]/Documents/cityboy/aegis_sre/app/api/incidents/[id]/approve/route.ts [app-route] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "POST",
    ()=>POST
]);
// app/api/incidents/[id]/approve/route.ts
// Server-side API route for human approval/rejection/override of pending incidents
// Supports HITL governance: approve, reject, or override with a different action
// Uses service_role to bypass RLS
var __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$cityboy$2f$aegis_sre$2f$node_modules$2f$next$2f$server$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/Documents/cityboy/aegis_sre/node_modules/next/server.js [app-route] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$cityboy$2f$aegis_sre$2f$node_modules$2f40$supabase$2f$supabase$2d$js$2f$dist$2f$index$2e$mjs__$5b$app$2d$route$5d$__$28$ecmascript$29$__$3c$locals$3e$__ = __turbopack_context__.i("[project]/Documents/cityboy/aegis_sre/node_modules/@supabase/supabase-js/dist/index.mjs [app-route] (ecmascript) <locals>");
;
;
function getServiceClient() {
    return (0, __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$cityboy$2f$aegis_sre$2f$node_modules$2f40$supabase$2f$supabase$2d$js$2f$dist$2f$index$2e$mjs__$5b$app$2d$route$5d$__$28$ecmascript$29$__$3c$locals$3e$__["createClient"])(("TURBOPACK compile-time value", "https://ekgrkamujzzjzksdpkeg.supabase.co"), process.env.SUPABASE_SERVICE_ROLE_KEY, {
        auth: {
            persistSession: false
        }
    });
}
function toJson(obj) {
    return JSON.parse(JSON.stringify(obj));
}
async function POST(req, { params }) {
    const { id } = await params;
    const body = await req.json();
    const supabase = getServiceClient();
    const isOverride = !!body.override_action && body.override_action !== body.original_action;
    const finalAction = body.override_action || body.action_taken;
    const newAction = body.approved ? isOverride ? `OVERRIDE:${finalAction}` : `${body.action_taken}_APPROVED` : `${body.action_taken}_REJECTED`;
    // Log the human decision
    await supabase.from('audit_logs').insert({
        incident_id: id,
        action_taken: newAction,
        parameters: body.parameters ? toJson(body.parameters) : null,
        result: isOverride ? toJson({
            override: true,
            original: body.original_action || body.action_taken,
            selected: body.override_action,
            message: `User overridden: Preferred [${body.override_action}] over [${body.original_action || body.action_taken}]. Updating bias for similar incidents.`
        }) : null,
        actor: 'human'
    });
    // If override, also log a learning entry
    if (isOverride && body.approved) {
        await supabase.from('incident_logs').insert({
            incident_id: id,
            step: 'tool_execution',
            thought_process: `Human override: Selected "${body.override_action}" instead of agent-suggested "${body.original_action || body.action_taken}". Updating decision bias for future incidents.`,
            tool_call: toJson({
                name: body.override_action,
                params: body.parameters || {},
                override: true
            }),
            tool_result: toJson({
                message: `Executing override: ${body.override_action}`
            })
        });
    }
    // Update incident status ΓÇö approved goes DIRECTLY to resolved (not in_progress)
    if (body.approved) {
        await supabase.from('incidents').update({
            status: 'resolved'
        }).eq('id', id);
    } else {
        await supabase.from('incidents').update({
            status: 'failed'
        }).eq('id', id);
    }
    return __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$cityboy$2f$aegis_sre$2f$node_modules$2f$next$2f$server$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["NextResponse"].json({
        status: 'ok',
        action: newAction,
        override: isOverride,
        resolved: body.approved
    });
}
}),
];

//# sourceMappingURL=%5Broot-of-the-server%5D__6ca9617b._.js.map