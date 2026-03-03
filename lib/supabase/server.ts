// lib/supabase/server.ts
// Server-side Supabase client (uses service_role for internal calls)
// Only import this in Server Components or Route Handlers

import { createClient as createSupabaseClient } from '@supabase/supabase-js';
import type { Database } from '../database.types';

/** Service-role client — bypasses RLS. Use for server-side only. */
export function createServiceClient() {
    const url = process.env.NEXT_PUBLIC_SUPABASE_URL;
    const key = process.env.SUPABASE_SERVICE_ROLE_KEY;
    if (!url || !key) throw new Error('Supabase env vars not configured');
    return createSupabaseClient<Database>(url, key, {
        auth: { persistSession: false },
    });
}

/** Anon client — respects RLS. Use for user-scoped server queries. */
export function createAnonServerClient() {
    const url = process.env.NEXT_PUBLIC_SUPABASE_URL;
    const key = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;
    if (!url || !key) throw new Error('Supabase env vars not configured');
    return createSupabaseClient<Database>(url, key, {
        auth: { persistSession: false },
    });
}
