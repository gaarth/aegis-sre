// app/api/simulation/state/route.ts
// GET — returns current simulation_state singleton row
// POST — resets simulation_state to healthy defaults

import { NextResponse } from 'next/server';
import { createClient } from '@supabase/supabase-js';
import type { Database } from '@/lib/database.types';

function getServiceClient() {
    return createClient<Database>(
        process.env.NEXT_PUBLIC_SUPABASE_URL!,
        process.env.SUPABASE_SERVICE_ROLE_KEY!,
        { auth: { persistSession: false } }
    );
}

export async function GET() {
    const supabase = getServiceClient();
    const { data, error } = await supabase
        .from('simulation_state')
        .select('*')
        .eq('id', 'singleton')
        .single();

    if (error) {
        return NextResponse.json({ error: error.message }, { status: 500 });
    }
    return NextResponse.json(data);
}

export async function POST() {
    const supabase = getServiceClient();

    const { error } = await supabase
        .from('simulation_state')
        .update({
            api_health: 'healthy',
            cdn_status: 'healthy',
            db_latency: 0,
            webhook_valid: true,
            cache_fresh: true,
            active_chaos: [],
        })
        .eq('id', 'singleton');

    if (error) {
        return NextResponse.json({ error: error.message }, { status: 500 });
    }

    return NextResponse.json({ status: 'reset' });
}
