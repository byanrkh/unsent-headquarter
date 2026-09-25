import Sidebar from "@/components/Sidebar";
import ConfirmProvider from "@/components/ConfirmProvider";

export default function RootGroupLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <ConfirmProvider>
      <div className="flex min-h-screen">
        <Sidebar />
        <div className="flex-1">{children}</div>
      </div>
    </ConfirmProvider>
  );
}
