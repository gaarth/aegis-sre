import { NextResponse } from 'next/server';
import { createClient } from '@supabase/supabase-js';
import { getRandomEvent, type ChaosEvent } from '@/lib/simulation';

const supabase = createClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.SUPABASE_SERVICE_ROLE_KEY!
);

export async function POST(req: Request) {
    try {
        const { level } = await req.json() as { level: string };
        if (!['HIGH', 'MEDIUM', 'LOW'].includes(level)) {
            return NextResponse.json({ error: 'Invalid level' }, { status: 400 });
        }

        // Get current state
        const { data: current } = await supabase
            .from('simulation_state')
            .select('*')
            .eq('id', 'singleton')
            .single();

        const activeIds: string[] = current?.active_chaos || [];

        // Pick random event
        const event: ChaosEvent | null = getRandomEvent(level as 'HIGH' | 'MEDIUM' | 'LOW', activeIds);
        if (!event) {
            return NextResponse.json({ error: 'All events of this level are already active' }, { status: 409 });
        }

        // Merge mutations from all active events + new one
        const allActive = [...activeIds, event.id];
        const merged: Record<string, unknown> = {};

        // Build combined state from all active events
        const { getEventById } = await import('@/lib/simulation');
        let api_health: string = 'healthy';
        let cdn_status: string = 'healthy';
        let db_latency = 0;
        let webhook_valid = true;
        let cache_fresh = true;

        for (const id of allActive) {
            const ev = getEventById(id);
            if (ev?.mutations) {
                if (ev.mutations.api_health === 'degraded') api_health = 'degraded';
                if (ev.mutations.cdn_status === 'broken') cdn_status = 'broken';
                if (ev.mutations.db_latency) db_latency = Math.max(db_latency, ev.mutations.db_latency);
                if (ev.mutations.webhook_valid === false) webhook_valid = false;
                if (ev.mutations.cache_fresh === false) cache_fresh = false;
            }
        }

        Object.assign(merged, {
            api_health, cdn_status, db_latency, webhook_valid, cache_fresh,
            active_chaos: allActive,
            updated_at: new Date().toISOString(),
        });

        const { error: updateErr } = await supabase
            .from('simulation_state')
            .update(merged)
            .eq('id', 'singleton');

        if (updateErr) {
            return NextResponse.json({ error: updateErr.message }, { status: 500 });
        }

        // Log event to simulation_events_log
        await supabase.from('simulation_events_log').insert({
            event_id: event.id,
            event_label: event.label,
            level: event.level,
            action: 'injected',
            fix_applied: null,
            description: event.description,
            severity: event.incident.severity,
        }).then(() => { });

        return NextResponse.json({
            status: 'chaos_injected',
            event: { id: event.id, label: event.label, level: event.level, impactLabel: event.impactLabel },
            activeCount: allActive.length,
        });
    } catch (e) {
        return NextResponse.json({ error: (e as Error).message }, { status: 500 });
    }
}
