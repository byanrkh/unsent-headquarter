import Topbar from "@/components/Topbar";
import Container from "@/components/Container";
import { createClient } from "@/libs/supabase/server";
import { getMaintenanceMode } from "@/libs/siteSettings";
import MaintenanceSection from "./Components/MaintenanceSection";
import AccountSection from "./Components/AccountSection";

export default async function SettingsPage() {
  const supabase = await createClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();

  const maintenanceMode = await getMaintenanceMode();

  return (
    <>
      <Topbar title="Settings" description="Admin preferences for hq." />
      <Container className="py-10">
        <div className="divide-y divide-[var(--border)] border-t border-[var(--border)]">
          <MaintenanceSection initialValue={maintenanceMode} />
          <AccountSection email={user?.email ?? "unknown"} />
        </div>
      </Container>
    </>
  );
}
