# 🧠 LEARNINGS — Sentinel Governor (SG-1)
# I MUST READ THIS BEFORE WRITING ANY CODE.
# These are proven patterns that produce working, production-grade code.

---

## LRN-001: Supabase Typed Client Setup (v2.49+)

The `Database` type MUST match this exact structure for `@supabase/supabase-js` to resolve types:

```typescript
export type Database = {
    public: {
        Tables: {
            table_name: {
                Row: { ... };       // SELECT results
                Insert: { ... };    // INSERT input (optional fields have ?)
                Update: { ... };    // UPDATE input (all fields optional)
                Relationships: [];  // FK references (can be empty array)
            };
        };
        Views: Record<string, never>;
        Functions: { ... };
        Enums: { ... };
        CompositeTypes: Record<string, never>;
    };
};
```

**Critical:** Include `Relationships`, `Views`, `Enums`, and `CompositeTypes` even if empty.
**Critical:** `Insert` types must mark server-generated fields (id, created_at, updated_at) as optional with `?`.

---

## LRN-002: Supabase Client Architecture for Next.js

Three clients, three use cases:

| Client | File | Key Used | RLS | Use Case |
|---|---|---|---|---|
| Browser | `lib/supabase/client.ts` | Anon key | ✅ Enforced | Dashboard, user-facing queries |
| Server Anon | `lib/supabase/server.ts` | Anon key | ✅ Enforced | Server components, user-scoped |
| Service | `lib/supabase/server.ts` | Service role | ❌ Bypassed | API routes, internal operations |

**Rule:** The webhook route (`/api/webhook`) MUST use the service role client because it needs to write to `incidents`, `incident_logs`, `audit_logs`, and `reports` without RLS restrictions.

**Rule:** Set `{ auth: { persistSession: false } }` on ALL server-side clients — there is no session to persist on the server.

---

## LRN-003: The Webhook Pipeline Architecture

The full incident processing pipeline in `/api/webhook/route.ts` follows this exact order:

```
1. Parse + Zod validate payload
2. Rate limit check (Supabase RPC)
3. Idempotency upsert (Supabase RPC → is_new boolean)
4. Set status → 'investigating'
5. Fetch context (last 5 incidents for same source)
6. Groq RCA call (JSON mode, temperature=0)
7. Zod validate Groq response (permissive schema)
8. Log RCA step → incident_logs
9. Log RCA audit → audit_logs
10. Safety interceptor (allowlist check)
11. Tool execution (DRY_RUN mode)
12. Set final status → 'resolved' / 'pending_approval'
13. Post-mortem generation (streaming, non-fatal)
14. Return JSON response
```

**Rule:** If Groq fails at step 6, jump DIRECTLY to safe_mode fallback. Do NOT attempt steps 7-13.
**Rule:** Post-mortem (step 13) is wrapped in try/catch — failure here must NOT affect the incident status.

---

## LRN-004: Groq API Integration Patterns

### Working Configuration
```typescript
const completion = await groq.chat.completions.create({
    model: 'llama-3.3-70b-versatile',
    temperature: 0,             // Deterministic for RCA
    max_tokens: 1024,
    response_format: { type: 'json_object' },
    messages: [
        { role: 'system', content: systemPrompt },
        { role: 'user', content: userPrompt },
    ],
});
```

### Key facts:
- `response_format: { type: 'json_object' }` ensures Groq returns valid JSON (not markdown-wrapped)
- Even with JSON mode, the schema STILL needs permissive Zod validation
- Token usage is on `completion.usage.prompt_tokens` and `.completion_tokens`
- Use `withRetry()` wrapper for 429 rate limit handling with exponential backoff
- AbortController timeout at 10s for fallback behavior
- The response is in `completion.choices[0].message.content` as a STRING — must JSON.parse()

---

## LRN-005: Rate Limiting with Supabase RPC

The `check_rate_limit` function:
1. Creates/updates a row in `rate_limits` (window_key = `{function_name}:{minute}`)
2. Uses `ON CONFLICT DO UPDATE SET invocations = invocations + 1`
3. Returns `boolean` — `true` if within limit, `false` if exceeded

**Critical pattern for consuming this:**
```typescript
const { data: withinLimit, error: rlError } = await supabase.rpc('check_rate_limit', {
    p_function_name: 'process-incident',
    p_limit: 30,
});
// FAIL OPEN: only block on explicit false, never on null/error
if (!rlError && withinLimit === false) {
    return NextResponse.json({ error: 'Rate limited' }, { status: 429 });
}
```

---

## LRN-006: Idempotency via `upsert_incident` RPC

The function uses `INSERT ... ON CONFLICT (idempotency_key) DO NOTHING` and returns `{ id, is_new }`.

**Pattern:**
```typescript
const { data, error } = await supabase.rpc('upsert_incident', { ... });
const { id: incidentId, is_new: isNew } = data[0] as { id: string; is_new: boolean };
if (!isNew) return NextResponse.json({ status: 'already_processed' });
```

**Rule:** Each test/mock webhook MUST use a unique `idempotency_key` or it will return `already_processed`.

---

## LRN-007: Safety Interceptor Logic

The tool allowlist is the last line of defense before execution:

```typescript
const TOOL_ALLOWLIST = new Set(['get_metrics', 'scale_workload', 'throttle_jobs', 'none']);
```

Decision tree:
- `name === 'none'` → No action needed → `pending_approval`
- `!TOOL_ALLOWLIST.has(name)` → BLOCKED → `pending_approval` + audit log
- In allowlist → Execute tool (DRY_RUN mode) → `resolved`

**Rule:** The Zod schema already transforms unknown tool names to 'none', so the BLOCKED path is defense-in-depth for direct API callers.

---

## LRN-008: DRY_RUN Tool Execution

When `TOOL_DRY_RUN=true`, tool execution produces a mock result without calling any real infrastructure:

```typescript
const isDryRun = process.env.TOOL_DRY_RUN === 'true';
const toolResult = isDryRun
    ? { message: `[DRY RUN] Would execute ${toolName}`, params }
    : { message: `Executed ${toolName}` };
```

**Rule:** The `toolResult` MUST be logged to both `incident_logs.tool_result` AND `audit_logs.result` for full traceability.

---

## LRN-009: Next.js Configuration Rules

1. **No `"type": "module"` in `package.json`** → Next.js handles ESM internally
2. **`tailwind.config.ts` must use `export default config`** → not `module.exports`
3. **`postcss.config.js` uses `module.exports`** → this is correct for `.js` extension
4. **`.env.local` changes require dev server restart**
5. **`tsconfig.json` should exclude `supabase/functions/`** → those are Deno files, not Node

---

## LRN-010: Supabase Realtime Configuration

Realtime must be EXPLICITLY enabled per table in the Supabase dashboard:
- `incidents` → Realtime enabled
- `incident_logs` → Realtime enabled
- Other tables → Realtime NOT needed

Client subscription pattern:
```typescript
const channel = supabase
    .channel('channel-name')
    .on('postgres_changes', {
        event: '*',    // or 'INSERT' / 'UPDATE'
        schema: 'public',
        table: 'incidents',
        filter: `id=eq.${id}`,  // Optional row-level filter
    }, (payload) => { ... })
    .subscribe();
```

**Cleanup:** Always `supabase.removeChannel(channel)` in useEffect cleanup.

---

## LRN-011: TypeScript Casting for Supabase JSON Columns

When inserting objects into `Json | null` columns, the Supabase client expects exact `Json` types. Use this pattern:

```typescript
// For tool_call, tool_result, token_usage, parameters, result columns:
tool_call: someObject as unknown as Json,
// Or if the object is already JSON-safe:
token_usage: { model: MODEL, prompt_tokens: 0, completion_tokens: 0, total_tokens: 0 } as Json,
```

---

## LRN-012: Production Build Checklist

Before declaring Phase 1 complete:
- [ ] `npm run build` passes with 0 errors
- [ ] Mock webhook returns `status: "processed"` (not `safe_mode`)
- [ ] Duplicate webhook returns `status: "already_processed"`
- [ ] Incident appears in Supabase `incidents` table
- [ ] `incident_logs` has RCA step with hypothesis + confidence
- [ ] `audit_logs` has token usage data
- [ ] `reports` has post-mortem markdown
- [ ] Dashboard loads at http://localhost:3000/dashboard
- [ ] Incident detail page shows Thought Stream
- [ ] Rate limiting works (33+ requests in 1 min → 429)

---

## LRN-013: File Structure Decisions

```
app/
  page.tsx                        → Redirect to /dashboard
  dashboard/page.tsx              → Situation Room (client component, polls /api/incidents)
  incidents/[id]/page.tsx         → Incident detail + Thought Stream (polls /api/incidents/[id])
  api/webhook/route.ts            → Full incident pipeline (server-side, service_role)
  api/incidents/route.ts          → GET list of incidents (server-side, service_role)
  api/incidents/[id]/route.ts     → GET single incident with logs, audit, report
  api/incidents/[id]/approve/route.ts → POST approval/rejection (server-side)
lib/
  database.types.ts               → Supabase typed schema (hand-crafted)
  supabase/client.ts              → Browser client (anon key) — NOT used in dashboard
  supabase/server.ts              → Server clients (service + anon)
```

**Rule:** All dashboard data fetching goes through Next.js API routes (server-side, service_role). This avoids RLS issues and Supabase client re-creation in React components.

---

## LRN-014: Server-Side API Route Pattern for Dashboard

Instead of querying Supabase directly from browser components (which requires RLS policies for anon), use server-side API routes:

```typescript
// app/api/incidents/route.ts — server-side, uses service_role
export async function GET() {
    const supabase = createClient<Database>(url, serviceRoleKey, { auth: { persistSession: false } });
    const { data } = await supabase.from('incidents').select('*').order('created_at', { ascending: false }).limit(50);
    return NextResponse.json(data);
}

// app/dashboard/page.tsx — client-side, fetches from API route
const fetchIncidents = useCallback(async () => {
    const res = await fetch('/api/incidents');
    if (res.ok) setIncidents(await res.json());
}, []);
```

**Rule:** Dashboard → `fetch('/api/...')` → server route → `service_role` → Supabase → response. No browser Supabase SDK needed for reads.

---

## LRN-015: Polling vs Realtime — When to Use Each

For the SG-1 dashboard, **polling every 3s** is more reliable than Realtime for these reasons:
1. Realtime requires RLS SELECT policies for the subscribing role (anon)
2. Supabase Realtime subscriptions can silently disconnect
3. Polling through server-side API routes always uses service_role (no RLS issues)
4. 3-second polling is fast enough for an SRE dashboard

**Pattern:**
```typescript
// Stable useCallback with empty deps (no Supabase dependency)
const fetchData = useCallback(async () => { ... }, []);

// Poll every 3 seconds
useEffect(() => {
    const interval = setInterval(fetchData, 3000);
    return () => clearInterval(interval);
}, [fetchData]);
```

**Rule:** Use polling for dashboard-level data. Reserve Realtime for specific features (e.g., streaming thought logs during active incidents) where sub-second latency matters.

---

## TEMPLATE — Copy this for new learnings:
```
## LRN-XXX: [Title]
[Description]
**Rule:** [Key takeaway]
**Pattern:**
```typescript
// Code example
```
```
