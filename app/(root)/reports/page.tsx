import Topbar from "@/components/Topbar";
import Container from "@/components/Container";
import { FlagIcon } from "@/components/Icons";
import { mockLetters } from "@/libs/mockLetters";

function formatDate(iso: string) {
  return new Date(iso).toLocaleDateString("en-US", {
    month: "short",
    day: "numeric",
  });
}

export default function ReportsPage() {
  const reported = mockLetters
    .filter((letter) => letter.reportCount > 0)
    .sort((a, b) => b.reportCount - a.reportCount);

  return (
    <>
      <Topbar
        title="Reports"
        description={
          reported.length > 0
            ? `${reported.length} letter${reported.length > 1 ? "s" : ""} flagged by readers.`
            : "Nothing flagged right now."
        }
      />

      <Container className="py-10">
        {reported.length === 0 ? (
          <p className="text-sm text-[var(--muted)]">
            The queue is empty — nothing needs a look.
          </p>
        ) : (
          <ul className="divide-y divide-[var(--border)] border-t border-[var(--border)]">
            {reported.map((letter) => (
              <li
                key={letter.id}
                className="flex flex-col gap-3 py-6 sm:flex-row sm:items-start sm:justify-between sm:gap-6"
              >
                <div className="min-w-0 flex-1">
                  <p className="text-sm text-[var(--muted)]">
                    to{" "}
                    <span className="text-[var(--foreground)]">
                      {letter.to}
                    </span>{" "}
                    · {formatDate(letter.createdAt)}
                  </p>
                  <p className="font-serif-brand mt-1.5 italic leading-relaxed text-[var(--foreground)]">
                    “{letter.message}”
                  </p>
                </div>

                <div className="flex shrink-0 items-center gap-4">
                  <span className="flex items-center gap-1 text-sm text-[var(--accent)]">
                    <FlagIcon />
                    {letter.reportCount} report
                    {letter.reportCount > 1 ? "s" : ""}
                  </span>
                  <button
                    type="button"
                    className="rounded-full border border-[var(--border)] px-3 py-1.5 text-sm text-[var(--foreground)] transition-colors hover:border-[var(--accent)] hover:text-[var(--accent)]"
                  >
                    Hide
                  </button>
                </div>
              </li>
            ))}
          </ul>
        )}
      </Container>
    </>
  );
}
