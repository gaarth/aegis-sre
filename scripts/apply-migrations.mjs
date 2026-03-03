#!/usr/bin/env node
// scripts/apply-migrations.mjs
// Uses Supabase Management API v1 to execute SQL directly
// No CLI login needed — uses service_role for DB operations
// via their pg connection over HTTPS (Supabase REST SQL hack)

import { readFileSync } from 'fs';
import { join, dirname } from 'path';
import { fileURLToPath } from 'url';

const __dirname = dirname(fileURLToPath(import.meta.url));

// Credentials (hardcoded for one-shot migration execution)
const PROJECT_REF = 'ekgrkamujzzjzksdpkeg';
const SERVICE_KEY = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImVrZ3JrYW11anp6anprc2Rwa2VnIiwicm9sZSI6InNlcnZpY2Vfcm9sZSIsImlhdCI6MTc3MjA0MDk5MiwiZXhwIjoyMDg3NjE2OTkyfQ.h-0rRMYtGS9NxE-JgNHM6t2RH_xuO1cbBrJfRTuaTlY';
const SUPABASE_URL = `https://${PROJECT_REF}.supabase.co`;

// Split SQL into individual statements for execution
function splitStatements(sql) {
    // Remove comments and split by semicolons, keeping $$ blocks intact
    const statements = [];
    let current = '';
    let inDollarQuote = false;
    let dollarTag = '';

    const lines = sql.split('\n');
    for (const line of lines) {
        // Skip comment-only lines
        if (line.trimStart().startsWith('--')) {
            continue;
        }
        current += line + '\n';

        // Detect $$ dollar quoting
        const dollarMatches = line.match(/\$\w*\$/g);
        if (dollarMatches) {
            for (const match of dollarMatches) {
                if (!inDollarQuote) {
                    inDollarQuote = true;
                    dollarTag = match;
                } else if (match === dollarTag) {
                    inDollarQuote = false;
                    dollarTag = '';
                }
            }
        }

        if (!inDollarQuote && line.includes(';')) {
            const trimmed = current.trim();
            if (trimmed && trimmed !== ';') {
                statements.push(trimmed);
            }
            current = '';
        }
    }

    if (current.trim()) {
        statements.push(current.trim());
    }

    return statements.filter(s => s.length > 1);
}

// Execute SQL via Supabase REST API using a custom RPC approach
// Supabase exposes a query endpoint for service_role
async function execSQL(sql) {
    // Use the PostgREST /rpc path won't work for DDL
    // Instead use the Management API endpoint for SQL
    const response = await fetch(
        `https://api.supabase.com/v1/projects/${PROJECT_REF}/database/query`,
        {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${SERVICE_KEY}`,
            },
            body: JSON.stringify({ query: sql }),
        }
    );

    const text = await response.text();
    return { status: response.status, body: text };
}

const migrations = [
    { file: '../supabase/migrations/20240001_schema.sql', label: '01 — Core Schema' },
    { file: '../supabase/migrations/20240002_rls.sql', label: '02 — RLS Policies' },
    { file: '../supabase/migrations/20240003_functions.sql', label: '03 — DB Functions' },
];

console.log('🚀 Sentinel Governor (SG-1) — Direct Migration Runner\n');

let totalSuccess = 0;
let totalFailed = 0;

for (const migration of migrations) {
    const sql = readFileSync(join(__dirname, migration.file), 'utf-8');
    const statements = splitStatements(sql);

    console.log(`\n▶ ${migration.label} (${statements.length} statements)`);

    for (let i = 0; i < statements.length; i++) {
        const stmt = statements[i];
        const preview = stmt.substring(0, 60).replace(/\n/g, ' ').trim();

        try {
            const result = await execSQL(stmt);

            if (result.status >= 200 && result.status < 300) {
                console.log(`  ✓ [${i + 1}/${statements.length}] ${preview}...`);
                totalSuccess++;
            } else {
                // Some "errors" are OK (e.g., already exists)
                let parsed;
                try { parsed = JSON.parse(result.body); } catch { parsed = { message: result.body }; }
                const msg = parsed?.message || result.body;

                if (msg.includes('already exists') || msg.includes('duplicate') || msg.includes('already been added')) {
                    console.log(`  ~ [${i + 1}/${statements.length}] Already exists (ok): ${preview}...`);
                    totalSuccess++;
                } else {
                    console.warn(`  ✗ [${i + 1}/${statements.length}] FAILED (${result.status}): ${msg.substring(0, 100)}`);
                    console.warn(`    SQL: ${preview}...`);
                    totalFailed++;
                }
            }
        } catch (err) {
            console.error(`  ✗ [${i + 1}/${statements.length}] Network error: ${err.message}`);
            totalFailed++;
        }
    }
}

console.log(`\n${'═'.repeat(50)}`);
console.log(`✅ Success: ${totalSuccess} | ✗ Failed: ${totalFailed}`);
if (totalFailed === 0) {
    console.log('🎉 All migrations applied successfully!');
} else {
    console.log('⚠️  Some statements failed — check output above.');
    process.exit(1);
}
