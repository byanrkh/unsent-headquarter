import Link from "next/link";
import Topbar from "@/components/Topbar";
import Container from "@/components/Container";
import Stat from "@/components/Stat";
import Sparkline from "@/components/Sparkline";
import { HeartIcon, FlagIcon, ArrowUpRightIcon } from "@/components/Icons";
import { mockStats, mockLetters, last7Days } from "@/libs/mockLetters";

export default function DashboardPage() {
  const recent = mockLetters.slice(0, 3);
  const deltaFromYesterday =
    last7Days[last7Days.length - 1] - last7Days[last7Days.length - 2];

  return (
    <>
      <Topbar title="Overview" description="What's moved through unsent.cc." />

      <Container className="py-10">
        {/* Hero: today's count is the one bold moment on the page */}
        <div className="flex flex-col gap-8 sm:flex-row sm:items-end sm:justify-between">
          <div>
            <p className="text-sm text-[var(--muted)]">Letters today</p>
            <p className="font-serif-brand mt-1 text-[64px] leading-none text-[var(--foreground)]">
              {mockStats.lettersToday}
            </p>
            <p className="font-serif-brand mt-2 text-sm italic text-[var(--muted)]">
              {deltaFromYesterday >= 0 ? "+" : ""}
              {deltaFromYesterday} since yesterday
            </p>
          </div>
          <Sparkline data={last7Days} className="h-16 w-full sm:w-48" />
        </div>

        {/* Secondary stats — a divided row, not a grid of shadowed cards */}
        <div className="mt-10 flex flex-col divide-y divide-[var(--border)] border-y border-[var(--border)] sm:flex-row sm:divide-x sm:divide-y-0">
          <Stat label="Total letters" value={mockStats.totalLetters} />
          <Stat label="Felt reactions" value={mockStats.totalFelt} />
          <Stat
            label="Pending reports"
            value={mockStats.pendingReports}
            tone={mockStats.pendingReports > 0 ? "accent" : "default"}
          />
        </div>

        {/* Recent activity, styled like the letters themselves */}
        <div className="mt-12">
          <div className="flex items-baseline justify-between">
            <h2 className="font-serif-brand text-lg text-[var(--foreground)]">
              Recently sent
            </h2>
            <Link
              href="/letters"
              className="flex items-center gap-1 text-sm text-[var(--muted)] transition-colors hover:text-[var(--accent)]"
            >
              View all
              <ArrowUpRightIcon />
            </Link>
          </div>

          <ul className="mt-4 divide-y divide-[var(--border)] border-t border-[var(--border)]">
            {recent.map((letter) => (
              <li key={letter.id} className="flex items-start gap-6 py-5">
                <p className="font-serif-brand w-40 shrink-0 text-sm text-[var(--muted)]">
                  to {letter.to}
                </p>
                <p className="font-serif-brand flex-1 italic text-[var(--foreground)]">
                  “{letter.message}”
                </p>
                <div className="flex shrink-0 items-center gap-4 text-sm text-[var(--muted)]">
                  <span className="flex items-center gap-1">
                    <HeartIcon />
                    {letter.feltCount}
                  </span>
                  {letter.reportCount > 0 && (
                    <span className="flex items-center gap-1 text-[var(--accent)]">
                      <FlagIcon />
                      {letter.reportCount}
                    </span>
                  )}
                </div>
              </li>
            ))}
          </ul>
        </div>
      </Container>
    </>
  );
}
