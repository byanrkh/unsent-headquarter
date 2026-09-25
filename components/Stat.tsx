export default function Stat({
  label,
  value,
  tone = "default",
}: {
  label: string;
  value: string | number;
  tone?: "default" | "accent";
}) {
  return (
    <div className="flex flex-1 flex-col gap-1 px-6 py-5 first:pl-0 last:pr-0">
      <p className="text-sm text-[var(--muted)]">{label}</p>
      <p
        className={`font-serif-brand text-2xl ${
          tone === "accent"
            ? "text-[var(--accent)]"
            : "text-[var(--foreground)]"
        }`}
      >
        {value}
      </p>
    </div>
  );
}
