import { createClient } from "@/libs/supabase/server";

export async function getMaintenanceMode(): Promise<boolean> {
  const supabase = await createClient();
  const { data, error } = await supabase
    .from("site_settings")
    .select("maintenance_mode")
    .eq("id", 1)
    .single();

  if (error) {
    console.error("Failed to read maintenance mode:", error.message);
    return false;
  }

  return data.maintenance_mode;
}