# 🚨 ERRORS LOG — Sentinel Governor (SG-1)
# I MUST READ THIS BEFORE WRITING ANY CODE.
# Every error here is a lesson I already paid for. Do NOT repeat them.

---

## ERR-001: `"type": "module"` in package.json breaks PostCSS/Tailwind
- **What happened:** Added `"type": "module"` to package.json. This caused `postcss.config.js` (which uses `module.exports`) to fail with `ReferenceError: module is not defined in ES module scope`.
- **Root cause:** Next.js manages its own ESM/CJS boundary. When `"type": "module"` is set, Node treats ALL `.js` files as ESM, breaking any file that uses `module.exports` (like postcss.config.js).
- **Fix:** NEVER add `"type": "module"` to a Next.js project's package.json. Next.js handles this internally.
- **Rule:** ❌ Never set `"type": "module"` in Next.js projects.

---

## ERR-002: tailwind.config.ts missing `export default config`
- **What happened:** Created `tailwind.config.ts` with `const config: Config = { ... }` but forgot to add `export default config;` at the end.
- **Root cause:** TypeScript file with no export is not a valid module.
- **Fix:** ALWAYS end typed config files with `export default config;`
- **Rule:** ✅ Every `*.config.ts` must have an explicit `export default`.

---

## ERR-003: Supabase RPC `check_rate_limit` returning `null` treated as rate-limited
- **What happened:** Used `if (!withinLimit)` to check rate limit. When the RPC errored or returned `null`, this falsely triggered the 429 response — blocking ALL requests.
- **Root cause:** `!null === true` in JavaScript. The RPC can return `null` on error, which is NOT the same as "rate limit exceeded" (which is `false`).
- **Fix:** Check `withinLimit === false` explicitly, and only when there's no RPC error.
- **Rule:** ✅ NEVER use `!value` for boolean RPC results. Always use `value === false`.
- **Pattern:**
```typescript
const { data, error } = await supabase.rpc('check_rate_limit', { ... });
if (!error && data === false) { /* rate limited */ }
```

---

## ERR-004: Groq API key format — hex string is NOT a Groq key
- **What happened:** Placed a hex string (`1f97e13b40...`) as `GROQ_API_KEY`. Groq returned `401 Invalid API Key` on every call, causing all incidents to fall back to `safe_mode`.
- **Root cause:** Valid Groq API keys always start with `gsk_`. A hex string is not a valid API key.
- **Fix:** Groq keys MUST start with `gsk_`. Get them from https://console.groq.com/keys.
- **Rule:** ✅ Groq keys start with `gsk_`. If a key doesn't match this prefix, it's wrong.

---

## ERR-005: Next.js caches `.env.local` — restart required after changes
- **What happened:** Updated `GROQ_API_KEY` in `.env.local` but the dev server kept using the old (invalid) key. Requests continued returning `safe_mode`.
- **Root cause:** Next.js loads `.env.local` at startup and caches it. Hot reload does NOT reload env vars.
- **Fix:** ALWAYS restart the dev server (`npm run dev`) after changing `.env.local`.
- **Rule:** ✅ After ANY env var change → kill and restart `npm run dev`.

---

## ERR-006: Groq RCA Zod schema too strict — LLM output varies
- **What happened:** Initial `RcaResponseSchema` required ALL fields (`hypothesis`, `root_cause`, `confidence`, `reasoning`, `tool_request`). Llama-3.3-70b-versatile sometimes omits fields or uses different key names, causing `safeParse` to fail and triggering `safe_mode`.
- **Root cause:** LLMs don't reliably produce exact schemas, even with `response_format: { type: 'json_object' }`.
- **Fix:** Make non-critical fields `.optional().default(...)` and use `.transform()` for enum-like fields to normalize unexpected values.
- **Rule:** ✅ ALWAYS make LLM output schemas PERMISSIVE with defaults. Only `hypothesis` is truly required.
- **Pattern:**
```typescript
const Schema = z.object({
    hypothesis: z.string(),                        // Required
    root_cause: z.string().optional().default(''), // Optional + default
    confidence: z.number().min(0).max(1).optional().default(0.5),
    tool_request: z.object({
        name: z.string().transform(normalize),     // Transform, don't enum
        params: z.record(z.unknown()).optional().default({}),
    }).optional().default({ name: 'none', params: {} }),
});
```

---

## ERR-007: `Record<string, unknown>` not assignable to `Json` type
- **What happened:** TypeScript lint errors everywhere when inserting objects with `Record<string, unknown>` into Supabase columns typed as `Json`.
- **Root cause:** Supabase's `Json` type is `string | number | boolean | null | { [key: string]: Json | undefined } | Json[]`. `Record<string, unknown>` has `unknown` values which don't match `Json | undefined`.
- **Fix:** Cast with `as unknown as Json` or use `JSON.parse(JSON.stringify(obj))` to ensure JSON-safe values.
- **Rule:** ✅ When inserting JSON objects into Supabase, cast to `Json` type explicitly.

---

## ERR-008: Supabase CLI requires access token — cannot use service_role JWT
- **What happened:** Tried to use `npx supabase link --project-ref` and Supabase Management API with the service_role JWT. Both returned 401 Unauthorized.
- **Root cause:** Supabase CLI and Management API require a PERSONAL ACCESS TOKEN (from dashboard Settings → Access Tokens), not the project service_role JWT.
- **Fix:** Use the Supabase dashboard SQL editor for migrations, or configure a personal access token.
- **Rule:** ✅ Service role JWT ≠ Personal Access Token. They serve different purposes.

---

## ERR-009: PowerShell `curl` is an alias for `Invoke-WebRequest`
- **What happened:** Used `curl -s -X POST ... -H "Content-Type: application/json" -d '...'` in PowerShell. It failed because PowerShell's `curl` is aliased to `Invoke-WebRequest`, which has different syntax.
- **Fix:** Use `Invoke-RestMethod -Uri "..." -Method POST -ContentType "application/json" -Body '...'` on Windows/PowerShell.
- **Rule:** ✅ On Windows, ALWAYS use `Invoke-RestMethod` instead of `curl`.

---

## ERR-010: Idempotency key reuse causes "already_processed" on retry
- **What happened:** During debugging, reused the same `idempotency_key` across multiple test POSTs. The upsert function returned `is_new: false`, so the webhook correctly returned `already_processed` — but this looked like a failure.
- **Root cause:** The idempotency system works correctly. The "error" was that I wasn't using unique keys for each test.
- **Fix:** ALWAYS use a unique `idempotency_key` for each test POST (e.g., `smoke-test-${Date.now()}`).
- **Rule:** ✅ Each test webhook must have a unique idempotency_key.

---

## ERR-011: `ChatCompletionChunk` does not have `.usage` property in streaming
- **What happened:** Tried to access `chunk.usage` in the Groq streaming loop for the post-mortem. TypeScript errors: `Property 'usage' does not exist on type 'ChatCompletionChunk'`.
- **Root cause:** The Groq SDK's streaming chunks don't include a `.usage` field in their TypeScript types (even though the API may return it in the final chunk).
- **Fix:** Use `(chunk as any).usage` or track tokens from the non-streaming RCA call only. For production, use the `stream_options: { include_usage: true }` parameter if supported.
- **Rule:** ✅ Don't rely on `.usage` in streaming chunks. Track tokens from non-streaming calls.

---

## TEMPLATE — Copy this for new errors:
```
## ERR-XXX: [Short title]
- **What happened:**
- **Root cause:**
- **Fix:**
- **Rule:**
```

---

## ERR-012: `upsert_incident` RPC returns empty array for duplicate keys → 500 crash
- **What happened:** Sending a webhook with a duplicate `idempotency_key` caused a 500 error. The line `const { id, is_new } = upsertData[0]` throws because `upsertData` is an empty array.
- **Root cause:** The `ON CONFLICT DO NOTHING` in the RPC function returns zero rows when the key already exists, not a row with `is_new: false`.
- **Fix:** Check `!upsertData || upsertData.length === 0` BEFORE destructuring. If empty, fetch the existing incident ID by idempotency_key.
- **Rule:** ✅ ALWAYS check array length before destructuring `rpc()` results. `ON CONFLICT DO NOTHING` returns empty.

---

## ERR-013: `z.record(z.unknown())` fails in Zod 3.24 — requires 2 args
- **What happened:** `npm run build` failed with `Expected 2-3 arguments, but got 1` on `z.record(z.unknown())`.
- **Root cause:** Zod 3.24 changed `z.record()` to require both key and value schemas: `z.record(keySchema, valueSchema)`.
- **Fix:** Use `z.record(z.string(), z.unknown())` instead of `z.record(z.unknown())`.
- **Rule:** ✅ In Zod 3.24+, always use `z.record(z.string(), z.unknown())` for arbitrary object schemas.

---

## ERR-014: Stale `.next` cache causes `TypeError: Cannot read properties of undefined (reading '/_app')`
- **What happened:** After running `npm run build` (production) and then switching back to `npm run dev`, the dashboard returned 500 with `TypeError: Cannot read properties of undefined (reading '/_app')`.
- **Root cause:** The production build writes to `.next/` cache. When the dev server starts, it reads stale build artifacts that reference Pages Router internals (`/_app`) that don't exist in App Router mode.
- **Fix:** Run `Remove-Item -Recurse -Force .next` before restarting `npm run dev` after a production build.
- **Rule:** ✅ ALWAYS clear `.next` cache after running `npm run build` before switching back to `npm run dev`.

---

## ERR-015: Browser Supabase client with anon key returns ZERO rows — RLS blocks reads
- **What happened:** Dashboard loaded but showed 0 incidents. The `createClient()` from `@supabase/ssr` uses the anon key, which is subject to RLS. No SELECT policy existed for anon role, so all queries returned empty.
- **Root cause:** RLS was enabled on all tables (correct), but no SELECT policy was created for the `anon` role. The dashboard was querying Supabase *directly from the browser* using the anon key.
- **Fix:** Created server-side API routes (`/api/incidents`, `/api/incidents/[id]`) that use the service_role key to bypass RLS. Dashboard fetches from these routes instead of hitting Supabase directly.
- **Rule:** ✅ NEVER query Supabase directly from the browser without ensuring RLS policies exist for the anon role. Prefer server-side API routes with service_role.

---

## ERR-016: `createClient()` called inside component body → new instance every render → broken hooks
- **What happened:** `const supabase = createClient()` was called inside the component function body (not in a ref or outside). This created a new Supabase client on every render. Since `supabase` was in the dependency arrays of `useCallback` and `useEffect`, every render created new callbacks and new subscriptions → infinite loops or no updates.
- **Root cause:** React re-creates anything derived from a dependency that changes every render. A new client object !== the old client object.
- **Fix:** Removed direct Supabase client usage from UI components entirely. All data fetching goes through server-side API routes (`fetch('/api/incidents')`). For polling, use `setInterval` with a stable `useCallback` that has no Supabase dependency.
- **Rule:** ✅ NEVER create Supabase client instances inside React component bodies. Use server-side API routes or create the client OUTSIDE the component with `useMemo`/module-level singleton.
