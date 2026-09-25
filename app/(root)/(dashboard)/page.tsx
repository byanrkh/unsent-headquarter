import Link from "next/link";
import Topbar from "@/components/Topbar";
import Container from "@/components/Container";
import Stat from "@/components/Stat";
import Sparkline from "@/components/Sparkline";
import { FlagIcon, ArrowUpRightIcon } from "@/components/Icons";
import { getDashboardStats } from "@/libs/dashboard";

// Uses the admin client under the hood (no cookies() call), so force
// dynamic rendering — same reasoning as /letters and /reports.
export const dynamic = "force-dynamic";

export default async function DashboardPage() {
  const stats = await getDashboardStats();

  return (
    <>
      <Topbar title="Overview" description="What's moved through unsent.cc." />

      <Container className="py-8 sm:py-10">
        {/* Hero: today's count is the one bold moment on the page */}
        <div className="flex flex-col gap-6 sm:flex-row sm:items-end sm:justify-between sm:gap-8">
          <div>
            <p className="text-sm text-[var(--muted)]">Letters today</p>
            <p className="font-serif-brand mt-1 text-[44px] leading-none text-[var(--foreground)] sm:text-[64px]">
              {stats.lettersToday}
            </p>
            <p className="font-serif-brand mt-2 text-sm italic text-[var(--muted)]">
              {stats.deltaFromYesterday >= 0 ? "+" : ""}
              {stats.deltaFromYesterday} since yesterday
            </p>
          </div>
          <Sparkline data={stats.last7Days} className="h-16 w-full sm:w-48" />
        </div>

        {/* Secondary stats — a divided row, not a grid of shadowed cards */}
        <div className="mt-8 flex flex-col divide-y divide-[var(--border)] border-y border-[var(--border)] sm:mt-10 sm:flex-row sm:divide-x sm:divide-y-0">
          <Stat label="Total letters" value={stats.totalLetters} />
          <Stat
            label="Pending reports"
            value={stats.pendingReports}
            tone={stats.pendingReports > 0 ? "accent" : "default"}
          />
        </div>

        {/* Recent activity, styled like the letters themselves */}
        <div className="mt-10 sm:mt-12">
          <div className="flex items-baseline justify-between gap-4">
            <h2 className="font-serif-brand text-lg text-[var(--foreground)]">
              Recently sent
            </h2>
            <Link
              href="/letters"
              className="flex shrink-0 items-center gap-1 text-sm text-[var(--muted)] transition-colors hover:text-[var(--accent)]"
            >
              View all
              <ArrowUpRightIcon />
            </Link>
          </div>

          {stats.recent.length === 0 ? (
            <p className="mt-4 text-sm text-[var(--muted)]">No letters yet.</p>
          ) : (
            <ul className="mt-4 divide-y divide-[var(--border)] border-t border-[var(--border)]">
              {stats.recent.map((letter) => (
                <li
                  key={letter.id}
                  className="flex flex-col gap-1.5 py-5 sm:flex-row sm:items-start sm:gap-6"
                >
                  <p className="font-serif-brand shrink-0 text-sm text-[var(--muted)] sm:w-40">
                    to {letter.to_name}
                  </p>
                  <p className="font-serif-brand min-w-0 flex-1 break-words italic text-[var(--foreground)]">
                    “{letter.message}”
                  </p>
                  {letter.reportCount > 0 && (
                    <span className="flex shrink-0 items-center gap-1 text-sm text-[var(--accent)]">
                      <FlagIcon />
                      {letter.reportCount}
                    </span>
                  )}
                </li>
              ))}
            </ul>
          )}
        </div>
      </Container>
    </>
  );
}
