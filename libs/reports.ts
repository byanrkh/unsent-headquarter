import { createAdminClient } from "@/libs/supabase/admin";

export type ReportRow = {
  id: string;
  reason: string;
  created_at: string;
};

export type ReportedLetterGroup = {
  letter: {
    id: string;
    to_name: string;
    message: string;
    created_at: string;
  };
  reports: ReportRow[];
};

// Shape Supabase returns for the `reports -> letters` FK join below. The
// nested `letters` key matches the related table name.
type ReportJoinRow = {
  id: string;
  reason: string;
  created_at: string;
  letters: {
    id: string;
    to_name: string;
    message: string;
    created_at: string;
  } | null;
};

/**
 * Fetches every open report joined with its letter, then groups the rows
 * by letter — a single letter can be reported more than once, and the
 * admin should see all of those reasons together, not as separate rows.
 * Most-reported letters are surfaced first.
 */
export async function getReportedLetters(): Promise<ReportedLetterGroup[]> {
  const supabase = createAdminClient();

  const { data, error } = await supabase
    .from("reports")
    .select(
      `
      id,
      reason,
      created_at,
      letters (
        id,
        to_name,
        message,
        created_at
      )
    `,
    )
    .order("created_at", { ascending: false })
    .returns<ReportJoinRow[]>();

  if (error) {
    console.error("Failed to fetch reports:", error.message);
    return [];
  }

  const groups = new Map<string, ReportedLetterGroup>();

  for (const row of data ?? []) {
    // A report whose letter no longer exists has no `letters` row. This
    // shouldn't happen once deleteLetter() also clears its reports, but
    // guards against any orphaned rows from before that existed.
    if (!row.letters) continue;

    const report: ReportRow = {
      id: row.id,
      reason: row.reason,
      created_at: row.created_at,
    };

    const existing = groups.get(row.letters.id);
    if (existing) {
      existing.reports.push(report);
    } else {
      groups.set(row.letters.id, { letter: row.letters, reports: [report] });
    }
  }

  return Array.from(groups.values()).sort(
    (a, b) => b.reports.length - a.reports.length,
  );
}