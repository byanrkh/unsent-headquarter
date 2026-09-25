import Sidebar from "@/components/Sidebar";
import ConfirmProvider from "@/components/ConfirmProvider";
import { getMostFeltLetter } from "@/libs/letters";

// Sidebar footer reads via the admin client (no cookies() call), so force
// dynamic rendering here too — same reasoning as /letters and /reports.
export const dynamic = "force-dynamic";

export default async function RootGroupLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const footerLetter = await getMostFeltLetter();

  return (
    <ConfirmProvider>
      <div className="flex min-h-screen flex-col md:flex-row">
        <Sidebar footerLetter={footerLetter} />
        <div className="min-w-0 flex-1">{children}</div>
      </div>
    </ConfirmProvider>
  );
}
