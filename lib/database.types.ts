// lib/database.types.ts
// Supabase v2 compatible types for project: ekgrkamujzzjzksdpkeg
// Format matches @supabase/supabase-js v2.49+ requirements

export type Json = string | number | boolean | null | { [key: string]: Json | undefined } | Json[];

export type IncidentSeverity = 'critical' | 'warning' | 'info';
export type IncidentStatus =
    | 'open'
    | 'investigating'
    | 'in_progress'
    | 'pending_approval'
    | 'resolved'
    | 'safe_mode'
    | 'failed';

export type Database = {
    public: {
        Tables: {
            incidents: {
                Row: {
                    id: string;
                    source: string;
                    severity: IncidentSeverity;
                    status: IncidentStatus;
                    metadata: Json | null;
                    idempotency_key: string;
                    created_at: string;
                    updated_at: string;
                };
                Insert: {
                    id?: string;
                    source: string;
                    severity?: IncidentSeverity;
                    status?: IncidentStatus;
                    metadata?: Json | null;
                    idempotency_key: string;
                    created_at?: string;
                    updated_at?: string;
                };
                Update: {
                    id?: string;
                    source?: string;
                    severity?: IncidentSeverity;
                    status?: IncidentStatus;
                    metadata?: Json | null;
                    idempotency_key?: string;
                    created_at?: string;
                    updated_at?: string;
                };
                Relationships: [];
            };

            incident_logs: {
                Row: {
                    id: number;
                    incident_id: string;
                    step: string;
                    thought_process: string | null;
                    current_hypothesis: string | null;
                    confidence: number | null;
                    tool_call: Json | null;
                    tool_result: Json | null;
                    token_usage: Json | null;
                    created_at: string;
                };
                Insert: {
                    incident_id: string;
                    step: string;
                    thought_process?: string | null;
                    current_hypothesis?: string | null;
                    confidence?: number | null;
                    tool_call?: Json | null;
                    tool_result?: Json | null;
                    token_usage?: Json | null;
                    created_at?: string;
                };
                Update: {
                    incident_id?: string;
                    step?: string;
                    thought_process?: string | null;
                    current_hypothesis?: string | null;
                    confidence?: number | null;
                    tool_call?: Json | null;
                    tool_result?: Json | null;
                    token_usage?: Json | null;
                };
                Relationships: [
                    {
                        foreignKeyName: 'incident_logs_incident_id_fkey';
                        columns: ['incident_id'];
                        isOneToOne: false;
                        referencedRelation: 'incidents';
                        referencedColumns: ['id'];
                    }
                ];
            };

            incident_memory: {
                Row: {
                    id: string;
                    incident_id: string | null;
                    embedding: number[];
                    rca_summary: string;
                    success_score: number | null;
                    created_at: string;
                };
                Insert: {
                    id?: string;
                    incident_id?: string | null;
                    embedding: number[];
                    rca_summary: string;
                    success_score?: number | null;
                    created_at?: string;
                };
                Update: {
                    incident_id?: string | null;
                    embedding?: number[];
                    rca_summary?: string;
                    success_score?: number | null;
                };
                Relationships: [];
            };

            audit_logs: {
                Row: {
                    id: number;
                    incident_id: string | null;
                    action_taken: string;
                    parameters: Json | null;
                    result: Json | null;
                    actor: 'agent' | 'human';
                    token_usage: Json | null;
                    created_at: string;
                };
                Insert: {
                    incident_id?: string | null;
                    action_taken: string;
                    parameters?: Json | null;
                    result?: Json | null;
                    actor?: 'agent' | 'human';
                    token_usage?: Json | null;
                    created_at?: string;
                };
                Update: {
                    incident_id?: string | null;
                    action_taken?: string;
                    parameters?: Json | null;
                    result?: Json | null;
                    actor?: 'agent' | 'human';
                    token_usage?: Json | null;
                };
                Relationships: [];
            };

            reports: {
                Row: {
                    id: string;
                    incident_id: string;
                    content: string;
                    is_complete: boolean;
                    created_at: string;
                    updated_at: string;
                };
                Insert: {
                    id?: string;
                    incident_id: string;
                    content?: string;
                    is_complete?: boolean;
                    created_at?: string;
                    updated_at?: string;
                };
                Update: {
                    content?: string;
                    is_complete?: boolean;
                    updated_at?: string;
                };
                Relationships: [
                    {
                        foreignKeyName: 'reports_incident_id_fkey';
                        columns: ['incident_id'];
                        isOneToOne: false;
                        referencedRelation: 'incidents';
                        referencedColumns: ['id'];
                    }
                ];
            };

            rate_limits: {
                Row: {
                    id: number;
                    window_key: string;
                    invocations: number;
                    window_end: string;
                    created_at: string;
                };
                Insert: {
                    window_key: string;
                    invocations?: number;
                    window_end: string;
                    created_at?: string;
                };
                Update: {
                    invocations?: number;
                    window_end?: string;
                };
                Relationships: [];
            };
        };

        Views: Record<string, never>;

        Functions: {
            upsert_incident: {
                Args: {
                    p_source: string;
                    p_severity: IncidentSeverity;
                    p_metadata: Json;
                    p_idempotency_key: string;
                };
                Returns: Array<{ id: string; is_new: boolean }>;
            };
            check_rate_limit: {
                Args: { p_function_name: string; p_limit?: number };
                Returns: boolean;
            };
            get_incident_context: {
                Args: { p_source: string; p_limit?: number };
                Returns: Array<{
                    id: string;
                    status: IncidentStatus;
                    severity: IncidentSeverity;
                    metadata: Json;
                    created_at: string;
                }>;
            };
            search_incident_memory: {
                Args: { p_embedding: number[]; p_match_count?: number; p_min_score?: number };
                Returns: Array<{
                    id: string;
                    rca_summary: string;
                    success_score: number;
                    similarity: number;
                }>;
            };
        };

        Enums: {
            incident_severity: IncidentSeverity;
            incident_status: IncidentStatus;
        };

        CompositeTypes: Record<string, never>;
    };
};

// ── Convenience type aliases ──────────────────────────────────
export type Incident = Database['public']['Tables']['incidents']['Row'];
export type IncidentInsert = Database['public']['Tables']['incidents']['Insert'];
export type IncidentLog = Database['public']['Tables']['incident_logs']['Row'];
export type IncidentLogInsert = Database['public']['Tables']['incident_logs']['Insert'];
export type IncidentMemory = Database['public']['Tables']['incident_memory']['Row'];
export type AuditLog = Database['public']['Tables']['audit_logs']['Row'];
export type AuditLogInsert = Database['public']['Tables']['audit_logs']['Insert'];
export type Report = Database['public']['Tables']['reports']['Row'];
export type ReportInsert = Database['public']['Tables']['reports']['Insert'];
export type RateLimit = Database['public']['Tables']['rate_limits']['Row'];
