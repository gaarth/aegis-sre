-- ============================================================
-- MIGRATION: 20240002_rls.sql
-- Sentinel Governor (SG-1) — Row Level Security Policies
-- ============================================================

-- ── Enable RLS on every table ────────────────────────────────
ALTER TABLE incidents        ENABLE ROW LEVEL SECURITY;
ALTER TABLE incident_logs    ENABLE ROW LEVEL SECURITY;
ALTER TABLE incident_memory  ENABLE ROW LEVEL SECURITY;
ALTER TABLE audit_logs       ENABLE ROW LEVEL SECURITY;
ALTER TABLE reports          ENABLE ROW LEVEL SECURITY;
ALTER TABLE rate_limits      ENABLE ROW LEVEL SECURITY;

-- ============================================================
-- TABLE: incidents
-- ============================================================

-- Governor (service_role) — full access via RLS bypass
-- Note: service_role bypasses RLS by Supabase default.
-- These policies are for authenticated users only.

-- Maya (lead_sre) — full read/write
CREATE POLICY "lead_sre_incidents_all"
  ON incidents
  AS PERMISSIVE FOR ALL
  TO authenticated
  USING     (auth.jwt() ->> 'role' = 'lead_sre')
  WITH CHECK (auth.jwt() ->> 'role' = 'lead_sre');

-- Viewer (executive) — read-only
CREATE POLICY "viewer_incidents_select"
  ON incidents
  AS PERMISSIVE FOR SELECT
  TO authenticated
  USING (auth.jwt() ->> 'role' = 'viewer');

-- ============================================================
-- TABLE: incident_logs
-- ============================================================

-- Maya — read all logs
CREATE POLICY "lead_sre_incident_logs_select"
  ON incident_logs
  AS PERMISSIVE FOR SELECT
  TO authenticated
  USING (auth.jwt() ->> 'role' = 'lead_sre');

-- Viewer — read all logs (for real-time monitoring)
CREATE POLICY "viewer_incident_logs_select"
  ON incident_logs
  AS PERMISSIVE FOR SELECT
  TO authenticated
  USING (auth.jwt() ->> 'role' = 'viewer');

-- ============================================================
-- TABLE: audit_logs
-- ============================================================

-- Maya — read + UPDATE (for human approval of pending actions)
CREATE POLICY "lead_sre_audit_logs_select"
  ON audit_logs
  AS PERMISSIVE FOR SELECT
  TO authenticated
  USING (auth.jwt() ->> 'role' = 'lead_sre');

CREATE POLICY "Maya can approve actions"
  ON audit_logs
  AS PERMISSIVE FOR UPDATE
  TO authenticated
  USING     (auth.jwt() ->> 'role' = 'lead_sre')
  WITH CHECK (auth.jwt() ->> 'role' = 'lead_sre');

-- ============================================================
-- TABLE: reports
-- ============================================================

-- Maya — full read/write
CREATE POLICY "lead_sre_reports_all"
  ON reports
  AS PERMISSIVE FOR ALL
  TO authenticated
  USING     (auth.jwt() ->> 'role' = 'lead_sre')
  WITH CHECK (auth.jwt() ->> 'role' = 'lead_sre');

-- Viewer — read-only
CREATE POLICY "viewer_reports_select"
  ON reports
  AS PERMISSIVE FOR SELECT
  TO authenticated
  USING (auth.jwt() ->> 'role' = 'viewer');

-- ============================================================
-- TABLE: incident_memory
-- ============================================================

-- Maya — read-only (no human editing of vector memory)
CREATE POLICY "lead_sre_incident_memory_select"
  ON incident_memory
  AS PERMISSIVE FOR SELECT
  TO authenticated
  USING (auth.jwt() ->> 'role' = 'lead_sre');

-- ============================================================
-- TABLE: rate_limits
-- ============================================================
-- rate_limits is internal-only; no authenticated user access.
-- Only service_role (bypasses RLS) can touch this table.
-- No policies needed — all authenticated queries will be blocked.

-- ============================================================
-- HELPER: Custom JWT claim check function (SECURITY DEFINER)
-- ============================================================
CREATE OR REPLACE FUNCTION is_lead_sre()
RETURNS boolean LANGUAGE sql STABLE SECURITY DEFINER AS $$
  SELECT auth.jwt() ->> 'role' = 'lead_sre';
$$;

CREATE OR REPLACE FUNCTION is_viewer()
RETURNS boolean LANGUAGE sql STABLE SECURITY DEFINER AS $$
  SELECT auth.jwt() ->> 'role' = 'viewer';
$$;
