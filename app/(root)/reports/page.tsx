import Topbar from "@/components/Topbar";
import Container from "@/components/Container";
import { getReportedLetters } from "@/libs/reports";
import ReportsList from "./Components/ReportsList";

// Without this, Next.js may statically cache the page since the admin
// client (unlike the cookie-based one) doesn't call cookies() to opt the
// route into dynamic rendering on its own.
export const dynamic = "force-dynamic";

export default async function ReportsPage() {
  const groups = await getReportedLetters();
  const totalReports = groups.reduce((sum, g) => sum + g.reports.length, 0);

  return (
    <>
      <Topbar
        title="Reports"
        description={
          groups.length > 0
            ? `${groups.length} letter${groups.length > 1 ? "s" : ""} flagged, ${totalReports} report${
                totalReports > 1 ? "s" : ""
              } total.`
            : "Nothing flagged right now."
        }
      />

      <Container className="py-10">
        <ReportsList initialGroups={groups} />
      </Container>
    </>
  );
}
