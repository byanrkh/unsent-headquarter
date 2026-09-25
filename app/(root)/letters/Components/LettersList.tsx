"use client";

import { useMemo, useState, useTransition } from "react";
import { SearchIcon } from "@/components/Icons";
import { useConfirm } from "@/components/ConfirmProvider";
import type { AdminLetter } from "@/libs/letters";
import { deleteLetter } from "../actions";
import LetterCard from "./LetterCard";

type Filter = "all" | "reported";

const FILTERS: { label: string; value: Filter }[] = [
  { label: "All", value: "all" },
  { label: "Reported", value: "reported" },
];

export default function LettersList({
  initialLetters,
}: {
  initialLetters: AdminLetter[];
}) {
  const [letters, setLetters] = useState(initialLetters);
  const [query, setQuery] = useState("");
  const [filter, setFilter] = useState<Filter>("all");
  const [isPending, startTransition] = useTransition();
  const [error, setError] = useState<string | null>(null);
  const confirm = useConfirm();

  const visible = useMemo(() => {
    return letters.filter((letter) => {
      const matchesQuery =
        query.trim() === "" ||
        letter.to_name.toLowerCase().includes(query.toLowerCase()) ||
        letter.message.toLowerCase().includes(query.toLowerCase());

      const matchesFilter = filter === "all" || letter.reportCount > 0;

      return matchesQuery && matchesFilter;
    });
  }, [letters, query, filter]);

  async function handleDelete(letterId: string) {
    const confirmed = await confirm({
      title: "Delete this letter?",
      description: "This also clears any reports on it. This can't be undone.",
      confirmLabel: "Delete",
      destructive: true,
    });
    if (!confirmed) return;

    setError(null);
    const prev = letters;

    setLetters((current) => current.filter((l) => l.id !== letterId));

    startTransition(async () => {
      try {
        await deleteLetter(letterId);
      } catch {
        setLetters(prev); // revert kalau gagal
        setError("Couldn't delete that letter — try again.");
      }
    });
  }

  const reportedCount = letters.filter((l) => l.reportCount > 0).length;

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
              className={`flex items-center gap-1.5 rounded-full px-3 py-1.5 text-sm transition-colors ${
                filter === f.value
                  ? "bg-[var(--surface)] text-[var(--foreground)]"
                  : "text-[var(--muted)] hover:text-[var(--foreground)]"
              }`}
            >
              {f.label}
              {f.value === "reported" && reportedCount > 0 && (
                <span className="text-[var(--accent)]">{reportedCount}</span>
              )}
            </button>
          ))}
        </div>
      </div>

      {error && <p className="mt-4 text-sm text-[var(--accent)]">{error}</p>}

      {visible.length === 0 ? (
        <p className="mt-10 text-sm text-[var(--muted)]">
          {letters.length === 0
            ? "No letters yet."
            : "Nothing matches that search."}
        </p>
      ) : (
        <ul className="mt-4 divide-y divide-[var(--border)] border-t border-[var(--border)]">
          {visible.map((letter) => (
            <LetterCard
              key={letter.id}
              letter={letter}
              isPending={isPending}
              onDelete={handleDelete}
            />
          ))}
        </ul>
      )}
    </div>
  );
}
