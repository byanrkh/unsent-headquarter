"use client";

import { useState } from "react";
import { HeartIcon, FlagIcon } from "@/components/Icons";
import type { AdminLetter } from "@/libs/mockLetters";

function formatDate(iso: string) {
  return new Date(iso).toLocaleDateString("en-US", {
    month: "short",
    day: "numeric",
  });
}

export default function LetterCard({ letter }: { letter: AdminLetter }) {
  const [status, setStatus] = useState(letter.status);
  const hidden = status === "hidden";

  return (
    <li
      className={`group flex flex-col gap-3 py-6 transition-opacity sm:flex-row sm:items-start sm:justify-between sm:gap-6 ${
        hidden ? "opacity-50" : ""
      }`}
    >
      <div className="min-w-0 flex-1">
        <p className="text-sm text-[var(--muted)]">
          to <span className="text-[var(--foreground)]">{letter.to}</span>
        </p>
        <p className="font-serif-brand mt-1.5 italic leading-relaxed text-[var(--foreground)]">
          “{letter.message}”
        </p>
      </div>

      <div className="flex shrink-0 items-center gap-5 text-sm text-[var(--muted)]">
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
        <span className="w-12 text-right">{formatDate(letter.createdAt)}</span>
        <button
          type="button"
          onClick={() => setStatus(hidden ? "visible" : "hidden")}
          className="w-14 text-right text-[var(--muted)] opacity-0 transition-opacity hover:text-[var(--accent)] group-hover:opacity-100"
        >
          {hidden ? "Unhide" : "Hide"}
        </button>
      </div>
    </li>
  );
}
