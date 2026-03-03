#!/usr/bin/env node
// scripts/migrate.mjs
// Applies SQL migrations to live Supabase project via REST API
// Usage: node scripts/migrate.mjs

import { readFileSync } from 'fs';
import { join, dirname } from 'path';
import { fileURLToPath } from 'url';

const __dirname = dirname(fileURLToPath(import.meta.url));

const SUPABASE_URL = process.env.NEXT_PUBLIC_SUPABASE_URL || 'https://ekgrkamujzzjzksdpkeg.supabase.co';
const SERVICE_ROLE_KEY = process.env.SUPABASE_SERVICE_ROLE_KEY || 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImVrZ3JrYW11anp6anprc2Rwa2VnIiwicm9sZSI6InNlcnZpY2Vfcm9sZSIsImlhdCI6MTc3MjA0MDk5MiwiZXhwIjoyMDg3NjE2OTkyfQ.h-0rRMYtGS9NxE-JgNHM6t2RH_xuO1cbBrJfRTuaTlY';

const SQL_API = `${SUPABASE_URL}/rest/v1/rpc/exec_sql`;

async function runSQL(sql, label) {
    console.log(`\n▶ Running: ${label}`);

    // Use Supabase's pg query endpoint
    const resp = await fetch(`${SUPABASE_URL}/rest/v1/`, {
        method: 'GET',
        headers: {
            'apikey': SERVICE_ROLE_KEY,
            'Authorization': `Bearer ${SERVICE_ROLE_KEY}`,
        },
    });

    // Use the SQL execution via the management API approach
    // We'll batch execute each statement
    const response = await fetch(`${SUPABASE_URL}/rest/v1/rpc/`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
            'apikey': SERVICE_ROLE_KEY,
            'Authorization': `Bearer ${SERVICE_ROLE_KEY}`,
        },
        body: JSON.stringify({ query: sql }),
    });

    console.log(`  Status: ${response.status}`);
    const text = await response.text();
    if (!response.ok) {
        console.error(`  ✗ Error: ${text}`);
        return false;
    }
    console.log(`  ✓ Success`);
    return true;
}

const migrations = [
    { file: '../supabase/migrations/20240001_schema.sql', label: '01 — Core Schema' },
    { file: '../supabase/migrations/20240002_rls.sql', label: '02 — RLS Policies' },
    { file: '../supabase/migrations/20240003_functions.sql', label: '03 — DB Functions' },
];

for (const migration of migrations) {
    const sql = readFileSync(join(__dirname, migration.file), 'utf-8');
    await runSQL(sql, migration.label);
}

console.log('\n✅ Migration runner complete.');
