import { FlagIcon } from "@/components/Icons";
import type { AdminLetter } from "@/libs/letters";

function formatDate(iso: string) {
  return new Date(iso).toLocaleDateString("en-US", {
    month: "short",
    day: "numeric",
  });
}

export default function LetterCard({
  letter,
  isPending,
  onDelete,
}: {
  letter: AdminLetter;
  isPending: boolean;
  onDelete: (letterId: string) => void;
}) {
  return (
    <li className="group flex flex-col gap-3 py-6 sm:flex-row sm:items-start sm:justify-between sm:gap-6">
      <div className="min-w-0 flex-1">
        <p className="text-sm text-[var(--muted)]">
          to <span className="text-[var(--foreground)]">{letter.to_name}</span>
        </p>
        <p className="font-serif-brand mt-1.5 break-words italic leading-relaxed text-[var(--foreground)]">
          “{letter.message}”
        </p>
      </div>

      <div className="flex shrink-0 items-center gap-5 text-sm text-[var(--muted)]">
        {letter.reportCount > 0 && (
          <span className="flex items-center gap-1 text-[var(--accent)]">
            <FlagIcon />
            {letter.reportCount}
          </span>
        )}
        <span className="w-12 text-right">{formatDate(letter.created_at)}</span>
        <button
          type="button"
          disabled={isPending}
          onClick={() => onDelete(letter.id)}
          className="text-right text-[var(--muted)] opacity-100 transition-opacity hover:text-[var(--accent)] disabled:opacity-50 sm:opacity-0 sm:group-hover:opacity-100"
        >
          Delete
        </button>
      </div>
    </li>
  );
}
