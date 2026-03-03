// app/api/incidents/[id]/route.ts
// Server-side API route for fetching a single incident with all related data
// Uses service_role to bypass RLS

import { NextRequest, NextResponse } from 'next/server';
import { createClient } from '@supabase/supabase-js';
import type { Database } from '@/lib/database.types';

function getServiceClient() {
    return createClient<Database>(
        process.env.NEXT_PUBLIC_SUPABASE_URL!,
        process.env.SUPABASE_SERVICE_ROLE_KEY!,
        { auth: { persistSession: false } }
    );
}

export async function GET(
    _req: NextRequest,
    { params }: { params: Promise<{ id: string }> }
) {
    const { id } = await params;
    const supabase = getServiceClient();

    const [incRes, logRes, auditRes, repRes] = await Promise.all([
        supabase.from('incidents').select('*').eq('id', id).single(),
        supabase.from('incident_logs').select('*').eq('incident_id', id).order('created_at', { ascending: true }),
        supabase.from('audit_logs').select('*').eq('incident_id', id).order('created_at', { ascending: true }),
        supabase.from('reports').select('*').eq('incident_id', id).single(),
    ]);

    if (incRes.error) {
        return NextResponse.json({ error: 'Incident not found' }, { status: 404 });
    }

    return NextResponse.json({
        incident: incRes.data,
        logs: logRes.data ?? [],
        auditLogs: auditRes.data ?? [],
        report: repRes.data ?? null,
    });
}
