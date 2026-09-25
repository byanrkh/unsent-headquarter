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
    <div className="overflow-x-auto rounded-lg border border-[var(--border)]">
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
  );
}
