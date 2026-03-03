-- ============================================================
-- MIGRATION: 20240003_functions.sql
-- Sentinel Governor (SG-1) — DB Functions & Security
-- ============================================================

-- ── Idempotency guard function ────────────────────────────────
-- Returns existing incident id if idempotency_key already exists.
-- Used by Edge Function to safe-guard duplicate webhooks.
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
  -- Attempt insert; on conflict return existing id
  INSERT INTO incidents (source, severity, metadata, idempotency_key)
  VALUES (p_source, p_severity, p_metadata, p_idempotency_key)
  ON CONFLICT (idempotency_key) DO NOTHING
  RETURNING incidents.id INTO v_id;

  IF v_id IS NULL THEN
    -- Already exists
    SELECT incidents.id INTO v_id FROM incidents WHERE idempotency_key = p_idempotency_key;
    v_is_new := false;
  ELSE
    v_is_new := true;
  END IF;

  RETURN QUERY SELECT v_id, v_is_new;
END;
$$;

-- ── Rate limit check function ─────────────────────────────────
-- Returns true if the call is within limits, false if exceeded.
-- Atomically increments the counter for the current 1-minute window.
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

-- ── Fetch incident context (last N incidents from same source) ──
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
  WHERE i.source = p_source
    AND i.status = 'resolved'
  ORDER BY i.created_at DESC
  LIMIT p_limit;
END;
$$;

-- ── Semantic memory search (pgvector cosine similarity) ───────
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

-- ── Cleanup job for expired rate limit windows ─────────────────
-- Can be called by a cron job (pg_cron or external scheduler)
CREATE OR REPLACE FUNCTION purge_rate_limit_windows()
RETURNS void LANGUAGE plpgsql SECURITY DEFINER AS $$
BEGIN
  DELETE FROM rate_limits WHERE window_end < now() - interval '5 minutes';
END;
$$;
