import { NextResponse } from 'next/server';
import { createClient } from '@supabase/supabase-js';
import { getEventById } from '@/lib/simulation';

const supabase = createClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.SUPABASE_SERVICE_ROLE_KEY!
);

export async function POST(req: Request) {
    try {
        const body = await req.json() as { event_id?: string; level?: string; fix_label?: string };

        // Get current state
        const { data: current } = await supabase
            .from('simulation_state')
            .select('*')
            .eq('id', 'singleton')
            .single();

        const activeIds: string[] = current?.active_chaos || [];

        // Find target event to heal
        let targetId: string | null = null;
        if (body.event_id) {
            targetId = activeIds.includes(body.event_id) ? body.event_id : null;
        } else if (body.level) {
            targetId = activeIds.find(id => {
                const ev = getEventById(id);
                return ev?.level === body.level;
            }) || null;
        } else {
            targetId = activeIds[0] || null;
        }

        if (!targetId) {
            return NextResponse.json({ error: 'No matching active event to heal' }, { status: 404 });
        }

        const healedEvent = getEventById(targetId);

        // Remove healed event from active list
        const remaining = activeIds.filter(id => id !== targetId);

        // Recalculate state from remaining active events
        let api_health: string = 'healthy';
        let cdn_status: string = 'healthy';
        let db_latency = 0;
        let webhook_valid = true;
        let cache_fresh = true;

        for (const id of remaining) {
            const ev = getEventById(id);
            if (ev?.mutations) {
                if (ev.mutations.api_health === 'degraded') api_health = 'degraded';
                if (ev.mutations.cdn_status === 'broken') cdn_status = 'broken';
                if (ev.mutations.db_latency) db_latency = Math.max(db_latency, ev.mutations.db_latency);
                if (ev.mutations.webhook_valid === false) webhook_valid = false;
                if (ev.mutations.cache_fresh === false) cache_fresh = false;
            }
        }

        const { error: updateErr } = await supabase
            .from('simulation_state')
            .update({
                api_health, cdn_status, db_latency, webhook_valid, cache_fresh,
                active_chaos: remaining,
                updated_at: new Date().toISOString(),
            })
            .eq('id', 'singleton');

        if (updateErr) {
            return NextResponse.json({ error: updateErr.message }, { status: 500 });
        }

        // Log heal event to simulation_events_log
        const fixLabel = body.fix_label || healedEvent?.healLabel || 'Auto-fix applied';
        await supabase.from('simulation_events_log').insert({
            event_id: targetId,
            event_label: healedEvent?.label || targetId,
            level: healedEvent?.level || 'UNKNOWN',
            action: 'healed',
            fix_applied: fixLabel,
            description: healedEvent?.description || '',
            severity: healedEvent?.incident?.severity || 'info',
        }).then(() => { });

        return NextResponse.json({
            status: 'healed',
            event: { id: targetId, label: healedEvent?.label },
            fixApplied: fixLabel,
            remainingActive: remaining.length,
        });
    } catch (e) {
        return NextResponse.json({ error: (e as Error).message }, { status: 500 });
    }
}
