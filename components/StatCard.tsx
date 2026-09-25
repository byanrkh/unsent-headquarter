export default function StatCard({
  label,
  value,
  accent = false,
}: {
  label: string;
  value: string | number;
  accent?: boolean;
}) {
  return (
    <div className="rounded-lg border border-[var(--border)] p-5">
      <p className="text-sm text-[var(--muted)]">{label}</p>
      <p
        className={`font-serif-brand mt-2 text-3xl ${
          accent ? "text-[var(--accent)]" : "text-[var(--foreground)]"
        }`}
      >
        {value}
      </p>
    </div>
  );
}
