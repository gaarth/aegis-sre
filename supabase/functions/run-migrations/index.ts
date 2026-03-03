// supabase/functions/run-migrations/index.ts
// ONE-SHOT migration runner — deploy, call once, delete.
// Uses Deno's Postgres driver to apply DDL migrations.

import { Client } from "https://deno.land/x/postgres@v0.17.0/mod.ts";

const DB_URL = Deno.env.get("SUPABASE_DB_URL");

const SCHEMA_SQL = `
CREATE EXTENSION IF NOT EXISTS vector;
CREATE EXTENSION IF NOT EXISTS "pgcrypto";

DO $$ BEGIN
  CREATE TYPE incident_severity AS ENUM ('critical', 'warning', 'info');
EXCEPTION WHEN duplicate_object THEN NULL; END $$;

DO $$ BEGIN
  CREATE TYPE incident_status AS ENUM (
    'open','investigating','in_progress','pending_approval','resolved','safe_mode','failed'
  );
EXCEPTION WHEN duplicate_object THEN NULL; END $$;

CREATE TABLE IF NOT EXISTS incidents (
  id               uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  source           text              NOT NULL,
  severity         incident_severity NOT NULL DEFAULT 'warning',
  status           incident_status   NOT NULL DEFAULT 'open',
  metadata         jsonb,
  idempotency_key  text              UNIQUE NOT NULL,
  created_at       timestamptz       NOT NULL DEFAULT now(),
  updated_at       timestamptz       NOT NULL DEFAULT now()
);

CREATE OR REPLACE FUNCTION update_updated_at_column()
RETURNS TRIGGER LANGUAGE plpgsql AS $$
BEGIN NEW.updated_at = now(); RETURN NEW; END;
$$;

DROP TRIGGER IF EXISTS trg_incidents_updated_at ON incidents;
CREATE TRIGGER trg_incidents_updated_at
  BEFORE UPDATE ON incidents
  FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

CREATE INDEX IF NOT EXISTS idx_incidents_status     ON incidents (status);
CREATE INDEX IF NOT EXISTS idx_incidents_created_at ON incidents (created_at DESC);
CREATE INDEX IF NOT EXISTS idx_incidents_source     ON incidents (source);

CREATE TABLE IF NOT EXISTS incident_logs (
  id                   bigint GENERATED ALWAYS AS IDENTITY PRIMARY KEY,
  incident_id          uuid        NOT NULL REFERENCES incidents (id) ON DELETE CASCADE,
  step                 text        NOT NULL,
  thought_process      text,
  current_hypothesis   text,
  confidence           numeric(4,3) CHECK (confidence >= 0 AND confidence <= 1),
  tool_call            jsonb,
  tool_result          jsonb,
  token_usage          jsonb,
  created_at           timestamptz NOT NULL DEFAULT now()
);

CREATE INDEX IF NOT EXISTS idx_incident_logs_incident_id ON incident_logs (incident_id);
CREATE INDEX IF NOT EXISTS idx_incident_logs_created_at  ON incident_logs (created_at DESC);

CREATE TABLE IF NOT EXISTS incident_memory (
  id            uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  incident_id   uuid         REFERENCES incidents (id) ON DELETE SET NULL,
  embedding     vector(1536) NOT NULL,
  rca_summary   text         NOT NULL,
  success_score numeric(3,2) CHECK (success_score >= 0 AND success_score <= 1),
  created_at    timestamptz  NOT NULL DEFAULT now()
);

CREATE INDEX IF NOT EXISTS idx_incident_memory_created_at ON incident_memory (created_at DESC);

CREATE TABLE IF NOT EXISTS audit_logs (
  id            bigint GENERATED ALWAYS AS IDENTITY PRIMARY KEY,
  incident_id   uuid         REFERENCES incidents (id) ON DELETE CASCADE,
  action_taken  text         NOT NULL,
  parameters    jsonb,
  result        jsonb,
  actor         text         NOT NULL DEFAULT 'agent' CHECK (actor IN ('agent', 'human')),
  token_usage   jsonb,
  created_at    timestamptz  NOT NULL DEFAULT now()
);

CREATE INDEX IF NOT EXISTS idx_audit_logs_incident_id ON audit_logs (incident_id);
CREATE INDEX IF NOT EXISTS idx_audit_logs_created_at  ON audit_logs (created_at DESC);
CREATE INDEX IF NOT EXISTS idx_audit_logs_actor       ON audit_logs (actor);

CREATE TABLE IF NOT EXISTS reports (
  id            uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  incident_id   uuid        NOT NULL REFERENCES incidents (id) ON DELETE CASCADE,
  content       text        NOT NULL DEFAULT '',
  is_complete   boolean     NOT NULL DEFAULT false,
  created_at    timestamptz NOT NULL DEFAULT now(),
  updated_at    timestamptz NOT NULL DEFAULT now()
);

DROP TRIGGER IF EXISTS trg_reports_updated_at ON reports;
CREATE TRIGGER trg_reports_updated_at
  BEFORE UPDATE ON reports
  FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

CREATE INDEX IF NOT EXISTS idx_reports_incident_id ON reports (incident_id);

CREATE TABLE IF NOT EXISTS rate_limits (
  id          bigint GENERATED ALWAYS AS IDENTITY PRIMARY KEY,
  window_key  text         NOT NULL UNIQUE,
  invocations integer      NOT NULL DEFAULT 0,
  window_end  timestamptz  NOT NULL,
  created_at  timestamptz  NOT NULL DEFAULT now()
);

CREATE INDEX IF NOT EXISTS idx_rate_limits_window_end ON rate_limits (window_end);
`;

const RLS_SQL = `
ALTER TABLE incidents        ENABLE ROW LEVEL SECURITY;
ALTER TABLE incident_logs    ENABLE ROW LEVEL SECURITY;
ALTER TABLE incident_memory  ENABLE ROW LEVEL SECURITY;
ALTER TABLE audit_logs       ENABLE ROW LEVEL SECURITY;
ALTER TABLE reports          ENABLE ROW LEVEL SECURITY;
ALTER TABLE rate_limits      ENABLE ROW LEVEL SECURITY;

DO $$ BEGIN
  CREATE POLICY "lead_sre_incidents_all" ON incidents AS PERMISSIVE FOR ALL TO authenticated
    USING (auth.jwt() ->> 'role' = 'lead_sre') WITH CHECK (auth.jwt() ->> 'role' = 'lead_sre');
EXCEPTION WHEN duplicate_object THEN NULL; END $$;

DO $$ BEGIN
  CREATE POLICY "viewer_incidents_select" ON incidents AS PERMISSIVE FOR SELECT TO authenticated
    USING (auth.jwt() ->> 'role' = 'viewer');
EXCEPTION WHEN duplicate_object THEN NULL; END $$;

DO $$ BEGIN
  CREATE POLICY "lead_sre_incident_logs_select" ON incident_logs AS PERMISSIVE FOR SELECT TO authenticated
    USING (auth.jwt() ->> 'role' = 'lead_sre');
EXCEPTION WHEN duplicate_object THEN NULL; END $$;

DO $$ BEGIN
  CREATE POLICY "viewer_incident_logs_select" ON incident_logs AS PERMISSIVE FOR SELECT TO authenticated
    USING (auth.jwt() ->> 'role' = 'viewer');
EXCEPTION WHEN duplicate_object THEN NULL; END $$;

DO $$ BEGIN
  CREATE POLICY "lead_sre_audit_logs_select" ON audit_logs AS PERMISSIVE FOR SELECT TO authenticated
    USING (auth.jwt() ->> 'role' = 'lead_sre');
EXCEPTION WHEN duplicate_object THEN NULL; END $$;

DO $$ BEGIN
  CREATE POLICY "Maya can approve actions" ON audit_logs AS PERMISSIVE FOR UPDATE TO authenticated
    USING (auth.jwt() ->> 'role' = 'lead_sre') WITH CHECK (auth.jwt() ->> 'role' = 'lead_sre');
EXCEPTION WHEN duplicate_object THEN NULL; END $$;

DO $$ BEGIN
  CREATE POLICY "lead_sre_reports_all" ON reports AS PERMISSIVE FOR ALL TO authenticated
    USING (auth.jwt() ->> 'role' = 'lead_sre') WITH CHECK (auth.jwt() ->> 'role' = 'lead_sre');
EXCEPTION WHEN duplicate_object THEN NULL; END $$;

DO $$ BEGIN
  CREATE POLICY "viewer_reports_select" ON reports AS PERMISSIVE FOR SELECT TO authenticated
    USING (auth.jwt() ->> 'role' = 'viewer');
EXCEPTION WHEN duplicate_object THEN NULL; END $$;

DO $$ BEGIN
  CREATE POLICY "lead_sre_incident_memory_select" ON incident_memory AS PERMISSIVE FOR SELECT TO authenticated
    USING (auth.jwt() ->> 'role' = 'lead_sre');
EXCEPTION WHEN duplicate_object THEN NULL; END $$;

CREATE OR REPLACE FUNCTION is_lead_sre()
RETURNS boolean LANGUAGE sql STABLE SECURITY DEFINER AS $$
  SELECT auth.jwt() ->> 'role' = 'lead_sre';
$$;

CREATE OR REPLACE FUNCTION is_viewer()
RETURNS boolean LANGUAGE sql STABLE SECURITY DEFINER AS $$
  SELECT auth.jwt() ->> 'role' = 'viewer';
$$;
`;

const FUNCTIONS_SQL = `
CREATE OR REPLACE FUNCTION upsert_incident(
  p_source          text,
  p_severity        incident_severity,
  p_metadata        jsonb,
  p_idempotency_key text
)
RETURNS TABLE (id uuid, is_new boolean)
LANGUAGE plpgsql SECURITY DEFINER AS $$
DECLARE
  v_id   uuid;
  v_is_new boolean := false;
BEGIN
  INSERT INTO incidents (source, severity, metadata, idempotency_key)
  VALUES (p_source, p_severity, p_metadata, p_idempotency_key)
  ON CONFLICT (idempotency_key) DO NOTHING
  RETURNING incidents.id INTO v_id;

  IF v_id IS NULL THEN
    SELECT incidents.id INTO v_id FROM incidents WHERE idempotency_key = p_idempotency_key;
    v_is_new := false;
  ELSE
    v_is_new := true;
  END IF;

  RETURN QUERY SELECT v_id, v_is_new;
END;
$$;

CREATE OR REPLACE FUNCTION check_rate_limit(
  p_function_name text,
  p_limit         integer DEFAULT 10
)
RETURNS boolean
LANGUAGE plpgsql SECURITY DEFINER AS $$
DECLARE
  v_window_key  text;
  v_window_end  timestamptz;
  v_invocations integer;
BEGIN
  v_window_end  := date_trunc('minute', now()) + interval '1 minute';
  v_window_key  := p_function_name || ':' || date_trunc('minute', now())::text;

  INSERT INTO rate_limits (window_key, invocations, window_end)
  VALUES (v_window_key, 1, v_window_end)
  ON CONFLICT (window_key) DO UPDATE
    SET invocations = rate_limits.invocations + 1
  RETURNING invocations INTO v_invocations;

  RETURN v_invocations <= p_limit;
END;
$$;

CREATE OR REPLACE FUNCTION get_incident_context(
  p_source text,
  p_limit  integer DEFAULT 5
)
RETURNS TABLE (
  id         uuid,
  status     incident_status,
  severity   incident_severity,
  metadata   jsonb,
  created_at timestamptz
)
LANGUAGE plpgsql SECURITY DEFINER AS $$
BEGIN
  RETURN QUERY
  SELECT i.id, i.status, i.severity, i.metadata, i.created_at
  FROM incidents i
  WHERE i.source = p_source AND i.status = 'resolved'
  ORDER BY i.created_at DESC
  LIMIT p_limit;
END;
$$;

CREATE OR REPLACE FUNCTION search_incident_memory(
  p_embedding vector(1536),
  p_match_count integer DEFAULT 3,
  p_min_score   float DEFAULT 0.7
)
RETURNS TABLE (
  id            uuid,
  rca_summary   text,
  success_score numeric(3,2),
  similarity    float
)
LANGUAGE plpgsql SECURITY DEFINER AS $$
BEGIN
  RETURN QUERY
  SELECT
    m.id,
    m.rca_summary,
    m.success_score,
    1 - (m.embedding <=> p_embedding) AS similarity
  FROM incident_memory m
  WHERE 1 - (m.embedding <=> p_embedding) >= p_min_score
  ORDER BY m.embedding <=> p_embedding
  LIMIT p_match_count;
END;
$$;
`;

Deno.serve(async (_req: Request): Promise<Response> => {
    if (!DB_URL) {
        return Response.json({ error: "SUPABASE_DB_URL not set" }, { status: 500 });
    }

    const results: Array<{ migration: string; success: boolean; error?: string }> = [];

    const client = new Client(DB_URL);
    await client.connect();

    const migrations = [
        { name: "01_schema", sql: SCHEMA_SQL },
        { name: "02_rls", sql: RLS_SQL },
        { name: "03_functions", sql: FUNCTIONS_SQL },
    ];

    for (const migration of migrations) {
        try {
            await client.queryArray(migration.sql);
            results.push({ migration: migration.name, success: true });
        } catch (err) {
            const msg = err instanceof Error ? err.message : String(err);
            results.push({ migration: migration.name, success: false, error: msg });
        }
    }

    await client.end();

    const allOk = results.every(r => r.success);
    return Response.json({
        status: allOk ? "all_migrations_applied" : "some_failed",
        results
    }, { status: allOk ? 200 : 500 });
});
