export default function Topbar({
  title,
  description,
}: {
  title: string;
  description?: string;
}) {
  const today = new Date().toLocaleDateString("en-US", {
    weekday: "long",
    month: "long",
    day: "numeric",
  });

  return (
    <header className="flex items-baseline justify-between border-b border-[var(--border)] px-6 py-6 md:px-10">
      <div>
        <h1 className="font-serif-brand text-[28px] leading-none text-[var(--foreground)]">
          {title}
        </h1>
        {description && (
          <p className="mt-1.5 text-sm text-[var(--muted)]">{description}</p>
        )}
      </div>
      <p className="font-serif-brand hidden text-sm italic text-[var(--muted)] sm:block">
        {today}
      </p>
    </header>
  );
}
