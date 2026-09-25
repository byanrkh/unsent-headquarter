import { createClient as createSupabaseClient } from "@supabase/supabase-js";

/**
 * Service-role client for admin-only reads/writes that need to bypass RLS
 * (e.g. reading `reports`, which intentionally has no SELECT policy for
 * regular `authenticated` users — only an INSERT policy so visitors can
 * submit reports).
 *
 * SERVER-ONLY. Never import this into a Client Component, never send
 * `SUPABASE_SERVICE_ROLE_KEY` to the browser. It has full access to every
 * table regardless of RLS.
 */
export function createAdminClient() {
  return createSupabaseClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.SUPABASE_SERVICE_ROLE_KEY!,
    {
      auth: {
        autoRefreshToken: false,
        persistSession: false,
      },
    },
  );
}