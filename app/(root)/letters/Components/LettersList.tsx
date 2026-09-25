"use client";

import { useMemo, useState } from "react";
import { SearchIcon } from "@/components/Icons";
import { mockLetters } from "@/libs/mockLetters";
import LetterCard from "./LetterCard";

type Filter = "all" | "reported" | "hidden";

const FILTERS: { label: string; value: Filter }[] = [
  { label: "All", value: "all" },
  { label: "Reported", value: "reported" },
  { label: "Hidden", value: "hidden" },
];

export default function LettersList() {
  const [query, setQuery] = useState("");
  const [filter, setFilter] = useState<Filter>("all");

  const letters = useMemo(() => {
    return mockLetters.filter((letter) => {
      const matchesQuery =
        query.trim() === "" ||
        letter.to.toLowerCase().includes(query.toLowerCase()) ||
        letter.message.toLowerCase().includes(query.toLowerCase());

      const matchesFilter =
        filter === "all" ||
        (filter === "reported" && letter.reportCount > 0) ||
        (filter === "hidden" && letter.status === "hidden");

      return matchesQuery && matchesFilter;
    });
  }, [query, filter]);

  return (
    <div>
      <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <div className="flex items-center gap-2 border-b border-[var(--border)] py-2 sm:w-72">
          <SearchIcon className="h-4 w-4 text-[var(--muted)]" />
          <input
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="Search by name or message"
            className="w-full bg-transparent text-sm text-[var(--foreground)] placeholder:text-[var(--muted)] focus:outline-none"
          />
        </div>

        <div className="flex gap-1">
          {FILTERS.map((f) => (
            <button
              key={f.value}
              type="button"
              onClick={() => setFilter(f.value)}
              className={`rounded-full px-3 py-1.5 text-sm transition-colors ${
                filter === f.value
                  ? "bg-[var(--surface)] text-[var(--foreground)]"
                  : "text-[var(--muted)] hover:text-[var(--foreground)]"
              }`}
            >
              {f.label}
            </button>
          ))}
        </div>
      </div>

      {letters.length === 0 ? (
        <p className="mt-10 text-sm text-[var(--muted)]">
          Nothing matches that search.
        </p>
      ) : (
        <ul className="mt-4 divide-y divide-[var(--border)] border-t border-[var(--border)]">
          {letters.map((letter) => (
            <LetterCard key={letter.id} letter={letter} />
          ))}
        </ul>
      )}
    </div>
  );
}
