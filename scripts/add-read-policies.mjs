// scripts/add-read-policies.mjs
// Quick script to add anon read policies via Supabase service_role
// This uses the supabase-js client with service_role key

import { createClient } from '@supabase/supabase-js';

const url = 'https://ekgrkamujzzjzksdpkeg.supabase.co';
const key = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImVrZ3JrYW11anp6anprc2Rwa2VnIiwicm9sZSI6InNlcnZpY2Vfcm9sZSIsImlhdCI6MTc3MjA0MDk5MiwiZXhwIjoyMDg3NjE2OTkyfQ.h-0rRMYtGS9NxE-JgNHM6t2RH_xuO1cbBrJfRTuaTlY';

const supabase = createClient(url, key);

// Try to read using anon key to test if policies exist
const anonClient = createClient(url, 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImVrZ3JrYW11anp6anprc2Rwa2VnIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NzIwNDA5OTIsImV4cCI6MjA4NzYxNjk5Mn0.ZTdGX4F7_xm2lUN834abYsNpKKvLOyzcYCH2xMy38KU');

async function main() {
    // Test anon read
    const { data, error } = await anonClient.from('incidents').select('id').limit(1);
    console.log('Anon read test:', data?.length ?? 0, 'rows, error:', error?.message ?? 'none');

    if (error || (data && data.length === 0)) {
        console.log('\n⚠️  Anon key cannot read incidents. RLS policies likely missing.');
        console.log('Please add these policies in Supabase Dashboard → SQL Editor:\n');
        console.log(`
CREATE POLICY anon_read_incidents ON public.incidents FOR SELECT USING (true);
CREATE POLICY anon_read_incident_logs ON public.incident_logs FOR SELECT USING (true);
CREATE POLICY anon_read_audit_logs ON public.audit_logs FOR SELECT USING (true);
CREATE POLICY anon_read_reports ON public.reports FOR SELECT USING (true);
        `);
    } else {
        console.log('✅ Anon key can read incidents — policies are already in place.');
    }

    // Test service role read (should always work)
    const { data: svcData } = await supabase.from('incidents').select('id').limit(1);
    console.log('\nService role read:', svcData?.length ?? 0, 'rows');
}

main().catch(console.error);
