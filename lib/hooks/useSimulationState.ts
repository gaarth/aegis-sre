// lib/hooks/useSimulationState.ts
// Real-time subscription to simulation_state table via Supabase Realtime

'use client';

import { useState, useEffect, useCallback } from 'react';
import { createClient } from '@/lib/supabase/client';
import type { SimulationState } from '@/lib/simulation';
import { DEFAULT_SIM_STATE } from '@/lib/simulation';
import type { RealtimePostgresChangesPayload } from '@supabase/supabase-js';

export function useSimulationState() {
    const [simState, setSimState] = useState<SimulationState>(DEFAULT_SIM_STATE);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);

    const parseRow = (row: Record<string, unknown>): SimulationState => ({
        id: (row.id as string) || 'singleton',
        api_health: (row.api_health as SimulationState['api_health']) || 'healthy',
        cdn_status: (row.cdn_status as SimulationState['cdn_status']) || 'healthy',
        db_latency: (row.db_latency as number) || 0,
        webhook_valid: row.webhook_valid !== false,
        cache_fresh: row.cache_fresh !== false,
        active_chaos: Array.isArray(row.active_chaos) ? row.active_chaos as string[] : [],
        updated_at: (row.updated_at as string) || new Date().toISOString(),
    });

    const fetchState = useCallback(async () => {
        try {
            const supabase = createClient();
            const { data, error: fetchError } = await supabase
                .from('simulation_state')
                .select('*')
                .eq('id', 'singleton')
                .single();

            if (fetchError) {
                setError(fetchError.message);
                return;
            }

            if (data) {
                setSimState(parseRow(data as unknown as Record<string, unknown>));
            }
        } catch (err) {
            setError(err instanceof Error ? err.message : 'Unknown error');
        } finally {
            setLoading(false);
        }
    }, []);

    useEffect(() => {
        // Initial fetch
        fetchState();

        // Realtime subscription
        const supabase = createClient();
        const channel = supabase
            .channel('simulation_state_changes')
            .on(
                'postgres_changes',
                {
                    event: '*',
                    schema: 'public',
                    table: 'simulation_state',
                    filter: 'id=eq.singleton',
                },
                (payload: RealtimePostgresChangesPayload<Record<string, unknown>>) => {
                    if (payload.new && typeof payload.new === 'object' && 'id' in payload.new) {
                        setSimState(parseRow(payload.new as Record<string, unknown>));
                    }
                }
            )
            .subscribe();

        return () => {
            supabase.removeChannel(channel);
        };
    }, [fetchState]);

    // Helper: is any chaos active?
    const hasActiveChaos = simState.active_chaos.length > 0;

    // Helper: is a specific chaos type active?
    const isChaosActive = (chaosId: string) =>
        simState.active_chaos.includes(chaosId);

    // Helper: overall health score (0 = all broken, 100 = perfect)
    const healthScore = (() => {
        let score = 100;
        if (simState.api_health === 'degraded') score -= 40;
        if (simState.cdn_status === 'broken') score -= 20;
        if (simState.db_latency >= 5000) score -= 30;
        if (!simState.webhook_valid) score -= 20;
        if (!simState.cache_fresh) score -= 10;
        return Math.max(0, score);
    })();

    return {
        simState,
        loading,
        error,
        hasActiveChaos,
        isChaosActive,
        healthScore,
        refetch: fetchState,
    };
}
