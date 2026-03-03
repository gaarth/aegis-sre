// app/api/incidents/[id]/approve/route.ts
// Server-side API route for human approval/rejection/override of pending incidents
// Supports HITL governance: approve, reject, or override with a different action
// Uses service_role to bypass RLS

import { NextRequest, NextResponse } from 'next/server';
import { createClient } from '@supabase/supabase-js';
import type { Database, Json } from '@/lib/database.types';

function getServiceClient() {
    return createClient<Database>(
        process.env.NEXT_PUBLIC_SUPABASE_URL!,
        process.env.SUPABASE_SERVICE_ROLE_KEY!,
        { auth: { persistSession: false } }
    );
}

function toJson(obj: unknown): Json {
    return JSON.parse(JSON.stringify(obj)) as Json;
}

export async function POST(
    req: NextRequest,
    { params }: { params: Promise<{ id: string }> }
) {
    const { id } = await params;
    const body = await req.json() as {
        approved: boolean;
        action_taken: string;
        parameters?: Record<string, unknown>;
        override_action?: string;      // If user selected a different fix
        original_action?: string;       // The agent's original suggestion
    };

    const supabase = getServiceClient();

    const isOverride = !!body.override_action && body.override_action !== body.original_action;
    const finalAction = body.override_action || body.action_taken;

    const newAction = body.approved
        ? (isOverride ? `OVERRIDE:${finalAction}` : `${body.action_taken}_APPROVED`)
        : `${body.action_taken}_REJECTED`;

    // Log the human decision
    await supabase.from('audit_logs').insert({
        incident_id: id,
        action_taken: newAction,
        parameters: body.parameters ? toJson(body.parameters) : null,
        result: isOverride
            ? toJson({
                override: true,
                original: body.original_action || body.action_taken,
                selected: body.override_action,
                message: `User overridden: Preferred [${body.override_action}] over [${body.original_action || body.action_taken}]. Updating bias for similar incidents.`,
            })
            : null,
        actor: 'human',
    });

    // If override, also log a learning entry
    if (isOverride && body.approved) {
        await supabase.from('incident_logs').insert({
            incident_id: id,
            step: 'tool_execution',
            thought_process: `Human override: Selected "${body.override_action}" instead of agent-suggested "${body.original_action || body.action_taken}". Updating decision bias for future incidents.`,
            tool_call: toJson({ name: body.override_action, params: body.parameters || {}, override: true }),
            tool_result: toJson({ message: `Executing override: ${body.override_action}` }),
        });
    }

    // Update incident status — approved goes DIRECTLY to resolved (not in_progress)
    if (body.approved) {
        await supabase.from('incidents').update({ status: 'resolved' }).eq('id', id);
    } else {
        await supabase.from('incidents').update({ status: 'failed' }).eq('id', id);
    }

    return NextResponse.json({
        status: 'ok',
        action: newAction,
        override: isOverride,
        resolved: body.approved,
    });
}
