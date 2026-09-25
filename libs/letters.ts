import { createAdminClient } from "@/libs/supabase/admin";

export type AdminLetter = {
  id: string;
  to_name: string;
  message: string;
  created_at: string;
  reportCount: number;
};

export type FooterLetter = {
  to_name: string;
  message: string;
};

/**
 * Fetches every letter with how many open reports it has. Uses the
 * admin client for both queries — `reports` has no SELECT policy for
 * regular authenticated users (see libs/supabase/admin.ts), so this needs
 * to bypass RLS the same way libs/reports.ts does.
 */
export async function getLetters(): Promise<AdminLetter[]> {
  const supabase = createAdminClient();

  const [lettersRes, reportsRes] = await Promise.all([
    supabase
      .from("letters")
      .select("id, to_name, message, created_at")
      .order("created_at", { ascending: false }),
    supabase.from("reports").select("letter_id"),
  ]);

  if (lettersRes.error) {
    console.error("Failed to fetch letters:", lettersRes.error.message);
    return [];
  }

  if (reportsRes.error) {
    // Non-fatal — letters still render, just without report counts.
    console.error(
      "Failed to fetch report counts:",
      reportsRes.error.message,
    );
  }

  const counts = new Map<string, number>();
  for (const row of reportsRes.data ?? []) {
    counts.set(row.letter_id, (counts.get(row.letter_id) ?? 0) + 1);
  }

  return (lettersRes.data ?? []).map((letter) => ({
    ...letter,
    reportCount: counts.get(letter.id) ?? 0,
  }));
}

/**
 * Fetches the single letter with the highest `felt_count` — shown in the
 * sidebar footer. Returns null if the table is empty or the read fails,
 * so callers can just hide the footer instead of crashing the layout.
 */
export async function getMostFeltLetter(): Promise<FooterLetter | null> {
  const supabase = createAdminClient();

  const { data, error } = await supabase
    .from("letters")
    .select("to_name, message")
    .order("felt_count", { ascending: false })
    .limit(1)
    .maybeSingle();

  if (error) {
    console.error("Failed to fetch most-felt letter:", error.message);
    return null;
  }

  return data;
}

/**
 * Core delete logic, shared by the /letters and /reports server actions
 * so there's one place that knows a letter's reports must be cleared
 * first (no guaranteed ON DELETE CASCADE on `reports.letter_id`).
 *
 * Does NOT call revalidatePath — callers revalidate whichever paths are
 * relevant to where the action was triggered from.
 */
export async function deleteLetterRecord(letterId: string): Promise<void> {
  const supabase = createAdminClient();

  const { error: reportsError } = await supabase
    .from("reports")
    .delete()
    .eq("letter_id", letterId);

  if (reportsError) throw new Error(reportsError.message);

  const { error: letterError } = await supabase
    .from("letters")
    .delete()
    .eq("id", letterId);

  if (letterError) throw new Error(letterError.message);
}