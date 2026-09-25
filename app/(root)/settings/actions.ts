"use server";

import { revalidatePath } from "next/cache";
import { createClient } from "@/libs/supabase/server";

export async function setMaintenanceMode(value: boolean) {
  const supabase = await createClient();
  const { error } = await supabase
    .from("site_settings")
    .update({ maintenance_mode: value, updated_at: new Date().toISOString() })
    .eq("id", 1);

  if (error) throw new Error(error.message);

  revalidatePath("/settings");
}