-- ============================================================
-- MIGRATION: 20240001_schema.sql
-- Sentinel Governor (SG-1) — Core Schema
-- ============================================================

-- ── Extensions ──────────────────────────────────────────────
CREATE EXTENSION IF NOT EXISTS vector;
CREATE EXTENSION IF NOT EXISTS "pgcrypto";

-- ── ENUM types ───────────────────────────────────────────────
DO $$ BEGIN
  CREATE TYPE incident_severity AS ENUM ('critical', 'warning', 'info');
EXCEPTION WHEN duplicate_object THEN NULL; END $$;

DO $$ BEGIN
  CREATE TYPE incident_status AS ENUM (
    'open',
    'investigating',
    'in_progress',
    'pending_approval',
    'resolved',
    'safe_mode',
    'failed'
  );
EXCEPTION WHEN duplicate_object THEN NULL; END $$;

-- ── Table: incidents ─────────────────────────────────────────
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

-- Auto-update updated_at
CREATE OR REPLACE FUNCTION update_updated_at_column()
RETURNS TRIGGER LANGUAGE plpgsql AS $$
BEGIN
  NEW.updated_at = now();
  RETURN NEW;
END;
$$;

DROP TRIGGER IF EXISTS trg_incidents_updated_at ON incidents;
CREATE TRIGGER trg_incidents_updated_at
  BEFORE UPDATE ON incidents
  FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

CREATE INDEX IF NOT EXISTS idx_incidents_status     ON incidents (status);
CREATE INDEX IF NOT EXISTS idx_incidents_created_at ON incidents (created_at DESC);
CREATE INDEX IF NOT EXISTS idx_incidents_source      ON incidents (source);

-- ── Table: incident_logs (Agent State Persistence) ───────────
CREATE TABLE IF NOT EXISTS incident_logs (
  id                   bigint GENERATED ALWAYS AS IDENTITY PRIMARY KEY,
  incident_id          uuid        NOT NULL REFERENCES incidents (id) ON DELETE CASCADE,
  step                 text        NOT NULL,  -- e.g. 'rca', 'tool_call', 'post_mortem'
  thought_process      text,
  current_hypothesis   text,
  confidence           numeric(4,3) CHECK (confidence >= 0 AND confidence <= 1),
  tool_call            jsonb,
  tool_result          jsonb,
  token_usage          jsonb,       -- {prompt_tokens, completion_tokens, total_tokens}
  created_at           timestamptz NOT NULL DEFAULT now()
);

CREATE INDEX IF NOT EXISTS idx_incident_logs_incident_id  ON incident_logs (incident_id);
CREATE INDEX IF NOT EXISTS idx_incident_logs_created_at   ON incident_logs (created_at DESC);

-- Enable Realtime on incident_logs
ALTER PUBLICATION supabase_realtime ADD TABLE incident_logs;

-- ── Table: incident_memory (Long-Term Memory) ─────────────────
CREATE TABLE IF NOT EXISTS incident_memory (
  id            uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  incident_id   uuid         REFERENCES incidents (id) ON DELETE SET NULL,
  embedding     vector(1536) NOT NULL,
  rca_summary   text         NOT NULL,
  success_score numeric(3,2) CHECK (success_score >= 0 AND success_score <= 1),
  created_at    timestamptz  NOT NULL DEFAULT now()
);

-- IVFFlat index for cosine similarity search (build after sufficient data)
-- CREATE INDEX ON incident_memory USING ivfflat (embedding vector_cosine_ops) WITH (lists = 100);
CREATE INDEX IF NOT EXISTS idx_incident_memory_created_at ON incident_memory (created_at DESC);

-- ── Table: audit_logs (Safety & Token Tracking) ──────────────
CREATE TABLE IF NOT EXISTS audit_logs (
  id            bigint GENERATED ALWAYS AS IDENTITY PRIMARY KEY,
  incident_id   uuid         REFERENCES incidents (id) ON DELETE CASCADE,
  action_taken  text         NOT NULL,          -- e.g. 'scale_workload', 'BLOCKED', 'VALIDATION_FAILED'
  parameters    jsonb,                           -- Inputs sent to tool
  result        jsonb,                           -- Tool output or error
  actor         text         NOT NULL DEFAULT 'agent' CHECK (actor IN ('agent', 'human')),
  token_usage   jsonb,                           -- {prompt_tokens, completion_tokens, model}
  created_at    timestamptz  NOT NULL DEFAULT now()
);

CREATE INDEX IF NOT EXISTS idx_audit_logs_incident_id  ON audit_logs (incident_id);
CREATE INDEX IF NOT EXISTS idx_audit_logs_created_at   ON audit_logs (created_at DESC);
CREATE INDEX IF NOT EXISTS idx_audit_logs_actor        ON audit_logs (actor);

-- ── Table: reports (Post-Mortem Streaming) ───────────────────
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

-- ── Table: rate_limits (Feedback Loop Prevention) ────────────
CREATE TABLE IF NOT EXISTS rate_limits (
  id          bigint GENERATED ALWAYS AS IDENTITY PRIMARY KEY,
  window_key  text         NOT NULL UNIQUE,  -- e.g. 'process-incident:2024-01-01T00:00'
  invocations integer      NOT NULL DEFAULT 0,
  window_end  timestamptz  NOT NULL,
  created_at  timestamptz  NOT NULL DEFAULT now()
);

CREATE INDEX IF NOT EXISTS idx_rate_limits_window_end ON rate_limits (window_end);

-- ── Cleanup expired rate limit windows function ───────────────
CREATE OR REPLACE FUNCTION cleanup_expired_rate_limits()
RETURNS void LANGUAGE plpgsql SECURITY DEFINER AS $$
BEGIN
  DELETE FROM rate_limits WHERE window_end < now();
END;
$$;
