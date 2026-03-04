#!/usr/bin/env node
// scripts/create-simulation-state.mjs
// Creates the simulation_state table using Supabase Management API with PAT

const PROJECT_REF = 'ekgrkamujzzjzksdpkeg';
const ACCESS_TOKEN = 'sbp_3eb66e918ec67d2878bd9d569d741deb15590ebd';

async function execSQL(sql) {
    const response = await fetch(
        `https://api.supabase.com/v1/projects/${PROJECT_REF}/database/query`,
        {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${ACCESS_TOKEN}`,
            },
            body: JSON.stringify({ query: sql }),
        }
    );
    const text = await response.text();
    return { status: response.status, body: text };
}

const statements = [
    `CREATE TABLE IF NOT EXISTS simulation_state (
      id            text PRIMARY KEY DEFAULT 'singleton',
      api_health    text NOT NULL DEFAULT 'healthy',
      cdn_status    text NOT NULL DEFAULT 'healthy',
      db_latency    integer NOT NULL DEFAULT 0,
      webhook_valid boolean NOT NULL DEFAULT true,
      cache_fresh   boolean NOT NULL DEFAULT true,
      active_chaos  jsonb NOT NULL DEFAULT '[]'::jsonb,
      updated_at    timestamptz NOT NULL DEFAULT now()
    );`,

    `INSERT INTO simulation_state (id) VALUES ('singleton') ON CONFLICT DO NOTHING;`,

    `DROP TRIGGER IF EXISTS trg_simulation_state_updated_at ON simulation_state;`,

    `CREATE TRIGGER trg_simulation_state_updated_at
      BEFORE UPDATE ON simulation_state
      FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();`,

    `ALTER PUBLICATION supabase_realtime ADD TABLE simulation_state;`,

    `ALTER TABLE simulation_state ENABLE ROW LEVEL SECURITY;`,

    `DROP POLICY IF EXISTS "Allow public read of simulation_state" ON simulation_state;`,

    `CREATE POLICY "Allow public read of simulation_state"
      ON simulation_state FOR SELECT USING (true);`,

    `DROP POLICY IF EXISTS "Allow service_role full access to simulation_state" ON simulation_state;`,

    `CREATE POLICY "Allow service_role full access to simulation_state"
      ON simulation_state FOR ALL TO service_role
      USING (true) WITH CHECK (true);`,
];

console.log('🚀 Creating simulation_state table...\n');

let success = 0;
let failed = 0;

for (let i = 0; i < statements.length; i++) {
    const stmt = statements[i];
    const preview = stmt.substring(0, 70).replace(/\n/g, ' ').trim();

    try {
        const result = await execSQL(stmt);
        if (result.status >= 200 && result.status < 300) {
            console.log(`  ✓ [${i + 1}/${statements.length}] ${preview}...`);
            success++;
        } else {
            const msg = result.body;
            if (msg.includes('already exists') || msg.includes('duplicate') || msg.includes('already been added')) {
                console.log(`  ~ [${i + 1}/${statements.length}] Already exists (ok): ${preview}...`);
                success++;
            } else {
                console.warn(`  ✗ [${i + 1}/${statements.length}] FAILED (${result.status}): ${msg.substring(0, 150)}`);
                failed++;
            }
        }
    } catch (err) {
        console.error(`  ✗ [${i + 1}/${statements.length}] Network error: ${err.message}`);
        failed++;
    }
}

console.log(`\n${'═'.repeat(50)}`);
console.log(`✅ Success: ${success} | ✗ Failed: ${failed}`);
if (failed === 0) {
    console.log('🎉 simulation_state table ready!');
} else {
    console.log('⚠️  Some statements failed — check output above.');
    process.exit(1);
}
