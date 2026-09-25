"use client";

import { useState, useTransition } from "react";
import { FlagIcon } from "@/components/Icons";
import { useConfirm } from "@/components/ConfirmProvider";
import type { ReportedLetterGroup } from "@/libs/reports";
import { dismissReport, deleteLetter } from "../actions";

function formatDate(iso: string) {
  return new Date(iso).toLocaleDateString("en-US", {
    month: "short",
    day: "numeric",
  });
}

function formatDateTime(iso: string) {
  return new Date(iso).toLocaleString("en-US", {
    month: "short",
    day: "numeric",
    hour: "numeric",
    minute: "2-digit",
  });
}

export default function ReportsList({
  initialGroups,
}: {
  initialGroups: ReportedLetterGroup[];
}) {
  const [groups, setGroups] = useState(initialGroups);
  const [isPending, startTransition] = useTransition();
  const [error, setError] = useState<string | null>(null);
  const confirm = useConfirm();

  function handleDismiss(letterId: string, reportId: string) {
    setError(null);
    const prev = groups;

    // Optimistically drop just this report — if it was the letter's last
    // one, the whole card disappears along with it.
    setGroups((current) =>
      current
        .map((g) =>
          g.letter.id === letterId
            ? { ...g, reports: g.reports.filter((r) => r.id !== reportId) }
            : g,
        )
        .filter((g) => g.reports.length > 0),
    );

    startTransition(async () => {
      try {
        await dismissReport(reportId);
      } catch {
        setGroups(prev); // revert kalau gagal
        setError("Couldn't dismiss that report — try again.");
      }
    });
  }

  async function handleDeleteLetter(letterId: string) {
    const confirmed = await confirm({
      title: "Delete this letter?",
      description: "This also clears all of its reports. This can't be undone.",
      confirmLabel: "Delete",
      destructive: true,
    });
    if (!confirmed) return;

    setError(null);
    const prev = groups;

    setGroups((current) => current.filter((g) => g.letter.id !== letterId));

    startTransition(async () => {
      try {
        await deleteLetter(letterId);
      } catch {
        setGroups(prev); // revert kalau gagal
        setError("Couldn't delete that letter — try again.");
      }
    });
  }

  if (groups.length === 0) {
    return (
      <p className="text-sm text-[var(--muted)]">
        The queue is empty — nothing needs a look.
      </p>
    );
  }

  return (
    <div>
      {error && <p className="mb-4 text-sm text-[var(--accent)]">{error}</p>}

      <ul className="divide-y divide-[var(--border)] border-t border-[var(--border)]">
        {groups.map((group) => (
          <li key={group.letter.id} className="flex flex-col gap-4 py-6">
            <div className="flex flex-col gap-3 sm:flex-row sm:items-start sm:justify-between sm:gap-6">
              <div className="min-w-0 flex-1">
                <p className="text-sm text-[var(--muted)]">
                  to{" "}
                  <span className="text-[var(--foreground)]">
                    {group.letter.to_name}
                  </span>{" "}
                  · sent {formatDate(group.letter.created_at)}
                </p>
                <p className="font-serif-brand mt-1.5 break-words italic leading-relaxed text-[var(--foreground)]">
                  “{group.letter.message}”
                </p>
              </div>

              <div className="flex shrink-0 items-center gap-4">
                <span className="flex items-center gap-1 text-sm text-[var(--accent)]">
                  <FlagIcon />
                  {group.reports.length} report
                  {group.reports.length > 1 ? "s" : ""}
                </span>
                <button
                  type="button"
                  disabled={isPending}
                  onClick={() => handleDeleteLetter(group.letter.id)}
                  className="rounded-full border border-[var(--border)] px-3 py-1.5 text-sm text-[var(--foreground)] transition-colors hover:border-[var(--accent)] hover:text-[var(--accent)] disabled:opacity-50"
                >
                  Delete letter
                </button>
              </div>
            </div>

            {/* Individual reports for this letter — reason + when, each dismissible on its own */}
            <ul className="ml-0 flex flex-col gap-2 border-l border-[var(--border)] pl-4 sm:ml-1">
              {group.reports.map((report) => (
                <li
                  key={report.id}
                  className="flex flex-wrap items-center justify-between gap-x-4 gap-y-1 text-sm"
                >
                  <p className="min-w-0 break-words text-[var(--foreground)]">
                    {report.reason}
                    <span className="ml-2 whitespace-nowrap text-[var(--muted)]">
                      {formatDateTime(report.created_at)}
                    </span>
                  </p>
                  <button
                    type="button"
                    disabled={isPending}
                    onClick={() => handleDismiss(group.letter.id, report.id)}
                    className="shrink-0 text-[var(--muted)] transition-colors hover:text-[var(--accent)] disabled:opacity-50"
                  >
                    Dismiss
                  </button>
                </li>
              ))}
            </ul>
          </li>
        ))}
      </ul>
    </div>
  );
}
