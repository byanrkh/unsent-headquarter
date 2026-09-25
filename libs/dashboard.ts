import { getLetters, type AdminLetter } from "@/libs/letters";

export type DashboardStats = {
  totalLetters: number;
  lettersToday: number;
  deltaFromYesterday: number;
  pendingReports: number;
  /** Letters submitted per day, oldest to newest — last entry is today. */
  last7Days: number[];
  recent: AdminLetter[];
};

// `created_at` comes back as a UTC ISO string from Supabase — slicing the
// date portion gives a stable per-day bucket key without pulling in a date
// library just for this.
function dayKey(iso: string) {
  return iso.slice(0, 10);
}

export async function getDashboardStats(): Promise<DashboardStats> {
  const letters = await getLetters(); // already newest-first

  const totalLetters = letters.length;
  const pendingReports = letters.filter((l) => l.reportCount > 0).length;
  const recent = letters.slice(0, 3);

  // Last 7 calendar days in UTC, oldest first, ending today.
  const days: string[] = [];
  const today = new Date();
  for (let i = 6; i >= 0; i--) {
    const d = new Date(today);
    d.setUTCDate(d.getUTCDate() - i);
    days.push(d.toISOString().slice(0, 10));
  }

  const countsByDay = new Map<string, number>();
  for (const letter of letters) {
    const key = dayKey(letter.created_at);
    countsByDay.set(key, (countsByDay.get(key) ?? 0) + 1);
  }

  const last7Days = days.map((day) => countsByDay.get(day) ?? 0);
  const lettersToday = last7Days[last7Days.length - 1];
  const lettersYesterday = last7Days[last7Days.length - 2] ?? 0;
  const deltaFromYesterday = lettersToday - lettersYesterday;

  return {
    totalLetters,
    lettersToday,
    deltaFromYesterday,
    pendingReports,
    last7Days,
    recent,
  };
}