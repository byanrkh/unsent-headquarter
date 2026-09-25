"use client";

import { mockLetters } from "@/libs/mockLetters";

function formatDate(iso: string) {
  return new Date(iso).toLocaleDateString("en-US", {
    month: "short",
    day: "numeric",
  });
}

export default function LettersTable() {
  return (
    <div className="rounded-lg border border-[var(--border)]">
      {/* Mobile: stacked cards */}
      <ul className="divide-y divide-[var(--border)] sm:hidden">
        {mockLetters.map((letter) => (
          <li key={letter.id} className="flex flex-col gap-2 p-4">
            <div className="flex items-start justify-between gap-3">
              <p className="min-w-0 break-words text-sm text-[var(--foreground)]">
                {letter.to}
              </p>
              <button
                type="button"
                className="shrink-0 text-sm text-[var(--muted)] hover:text-[var(--accent)]"
              >
                {letter.status === "visible" ? "Hide" : "Unhide"}
              </button>
            </div>
            <p className="break-words text-sm text-[var(--foreground)]">
              {letter.message}
            </p>
            <div className="flex items-center gap-4 text-xs text-[var(--muted)]">
              <span>{letter.feltCount} felt</span>
              <span
                className={
                  letter.reportCount > 0 ? "text-[var(--accent)]" : undefined
                }
              >
                {letter.reportCount} reports
              </span>
              <span>{formatDate(letter.createdAt)}</span>
            </div>
          </li>
        ))}
      </ul>

      {/* sm and up: table */}
      <div className="hidden overflow-x-auto sm:block">
        <table className="w-full text-left text-sm">
          <thead>
            <tr className="border-b border-[var(--border)] text-[var(--muted)]">
              <th className="px-4 py-3 font-normal">To</th>
              <th className="px-4 py-3 font-normal">Message</th>
              <th className="px-4 py-3 font-normal">Felt</th>
              <th className="px-4 py-3 font-normal">Reports</th>
              <th className="px-4 py-3 font-normal">Sent</th>
              <th className="px-4 py-3 font-normal" />
            </tr>
          </thead>
          <tbody>
            {mockLetters.map((letter) => (
              <tr
                key={letter.id}
                className="border-b border-[var(--border)] last:border-0"
              >
                <td className="px-4 py-3 text-[var(--foreground)]">
                  {letter.to}
                </td>
                <td className="max-w-xs truncate px-4 py-3 text-[var(--foreground)]">
                  {letter.message}
                </td>
                <td className="px-4 py-3 text-[var(--muted)]">
                  {letter.feltCount}
                </td>
                <td
                  className={`px-4 py-3 ${
                    letter.reportCount > 0
                      ? "text-[var(--accent)]"
                      : "text-[var(--muted)]"
                  }`}
                >
                  {letter.reportCount}
                </td>
                <td className="px-4 py-3 text-[var(--muted)]">
                  {formatDate(letter.createdAt)}
                </td>
                <td className="px-4 py-3 text-right">
                  <button
                    type="button"
                    className="text-[var(--muted)] hover:text-[var(--accent)]"
                  >
                    {letter.status === "visible" ? "Hide" : "Unhide"}
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
