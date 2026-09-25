"use server";

import { revalidatePath } from "next/cache";
import { createAdminClient } from "@/libs/supabase/admin";

/**
 * Dismiss: the letter stays, only this one report record is removed.
 */
export async function dismissReport(reportId: string) {
  const supabase = createAdminClient();

  const { error } = await supabase
    .from("reports")
    .delete()
    .eq("id", reportId);

  if (error) throw new Error(error.message);

  revalidatePath("/reports");
}

/**
 * Delete letter: removes the letter itself, and — since we can't assume
 * the `reports.letter_id` FK has ON DELETE CASCADE set up in Supabase —
 * explicitly clears its reports first so nothing orphaned is left behind.
 */
export async function deleteLetter(letterId: string) {
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

  revalidatePath("/reports");
  revalidatePath("/letters");
  revalidatePath("/");
}