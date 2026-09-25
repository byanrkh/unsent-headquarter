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
    <header className="flex items-baseline justify-between gap-4 border-b border-[var(--border)] px-4 py-5 sm:px-6 sm:py-6 md:px-10">
      <div className="min-w-0">
        <h1 className="font-serif-brand truncate text-2xl leading-none text-[var(--foreground)] sm:text-[28px]">
          {title}
        </h1>
        {description && (
          <p className="mt-1.5 text-sm text-[var(--muted)]">{description}</p>
        )}
      </div>
      <p className="font-serif-brand hidden shrink-0 text-sm italic text-[var(--muted)] sm:block">
        {today}
      </p>
    </header>
  );
}
