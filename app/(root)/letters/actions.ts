"use server";

import { revalidatePath } from "next/cache";
import { deleteLetterRecord } from "@/libs/letters";

export async function deleteLetter(letterId: string) {
  await deleteLetterRecord(letterId);

  revalidatePath("/letters");
  revalidatePath("/reports");
  revalidatePath("/");
}