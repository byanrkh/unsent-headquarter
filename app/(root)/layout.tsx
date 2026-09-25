import Sidebar from "@/components/Sidebar";
import ConfirmProvider from "@/components/ConfirmProvider";
import { getMostFeltLetter } from "@/libs/letters";
import { getPendingReportsCount } from "@/libs/reports";

export const dynamic = "force-dynamic";

export default async function RootGroupLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const [footerLetter, pendingReportsCount] = await Promise.all([
    getMostFeltLetter(),
    getPendingReportsCount(),
  ]);

  return (
    <ConfirmProvider>
      <div className="flex min-h-screen flex-col md:flex-row">
        <Sidebar
          footerLetter={footerLetter}
          pendingReportsCount={pendingReportsCount}
        />
        <div className="min-w-0 flex-1">{children}</div>
      </div>
    </ConfirmProvider>
  );
}
