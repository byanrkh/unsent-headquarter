"use server";

import { revalidatePath } from "next/cache";
import { createAdminClient } from "@/libs/supabase/admin";
import { deleteLetterRecord } from "@/libs/letters";

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
 * Delete letter: shared logic in libs/letters.ts also handles /letters —
 * this just adds the revalidations relevant to this page.
 */
export async function deleteLetter(letterId: string) {
  await deleteLetterRecord(letterId);

  revalidatePath("/reports");
  revalidatePath("/letters");
  revalidatePath("/");
}