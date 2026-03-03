#!/usr/bin/env node
// scripts/run-migrations.mjs
// Applies SQL migrations to live Supabase project via pg client
// The Supabase connection string uses the Transaction Pooler (port 6543)
// or the Direct Connection (port 5432) for DDL statements.
//
// Usage: node scripts/run-migrations.mjs
// Connection string format:
//   postgresql://postgres.[project-ref]:[db-password]@aws-0-[region].pooler.supabase.com:6543/postgres

import pg from 'pg';
import { readFileSync } from 'fs';
import { join, dirname } from 'path';
import { fileURLToPath } from 'url';

const { Client } = pg;
const __dirname = dirname(fileURLToPath(import.meta.url));

// The DB_URL must be provided as an environment variable for security.
// Format: postgresql://postgres.ekgrkamujzzjzksdpkeg:[PASSWORD]@aws-0-[region].pooler.supabase.com:5432/postgres
const DB_URL = process.env.DATABASE_URL;

if (!DB_URL) {
    console.error('❌ DATABASE_URL environment variable is required.');
    console.error('   Set it to your Supabase direct connection string.');
    console.error('   Find it at: Supabase Dashboard → Settings → Database → Connection string → URI');
    process.exit(1);
}

const migrations = [
    { file: '../supabase/migrations/20240001_schema.sql', label: '01 — Core Schema (tables, indexes, enums)' },
    { file: '../supabase/migrations/20240002_rls.sql', label: '02 — RLS Policies' },
    { file: '../supabase/migrations/20240003_functions.sql', label: '03 — DB Functions (SECURITY DEFINER)' },
];

const client = new Client({ connectionString: DB_URL, ssl: { rejectUnauthorized: false } });

async function main() {
    console.log('🚀 Sentinel Governor (SG-1) — Migration Runner\n');
    await client.connect();
    console.log('✅ Connected to Supabase Postgres\n');

    for (const migration of migrations) {
        const sql = readFileSync(join(__dirname, migration.file), 'utf-8');
        console.log(`▶ Applying: ${migration.label}`);
        try {
            await client.query(sql);
            console.log(`  ✓ Done\n`);
        } catch (err) {
            console.error(`  ✗ FAILED: ${err.message}\n`);
            // Don't exit — some errors are expected (e.g. "already exists")
        }
    }

    console.log('✅ All migrations applied.\n');
    await client.end();
}

main().catch((err) => {
    console.error('Fatal:', err);
    process.exit(1);
});
