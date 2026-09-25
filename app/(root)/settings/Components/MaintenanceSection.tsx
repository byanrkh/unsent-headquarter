"use client";

import { useState, useTransition } from "react";
import Toggle from "./Toggle";
import { setMaintenanceMode } from "../actions";

export default function MaintenanceSection({
  initialValue,
}: {
  initialValue: boolean;
}) {
  const [enabled, setEnabled] = useState(initialValue);
  const [isPending, startTransition] = useTransition();
  const [error, setError] = useState<string | null>(null);

  function handleChange(value: boolean) {
    setEnabled(value); // optimistic
    setError(null);

    startTransition(async () => {
      try {
        await setMaintenanceMode(value);
      } catch {
        setEnabled(!value); // revert kalau gagal
        setError("Couldn't save — try again.");
      }
    });
  }

  return (
    <div className="flex flex-col gap-1 py-6 sm:flex-row sm:items-center sm:justify-between">
      <div>
        <p className="text-[var(--foreground)]">Maintenance mode</p>
        <p className="mt-0.5 text-sm text-[var(--muted)]">
          {enabled
            ? "unsent.cc is showing the maintenance page to everyone."
            : "unsent.cc is live for everyone."}
        </p>
        {error && <p className="mt-1 text-sm text-[var(--accent)]">{error}</p>}
      </div>
      <Toggle checked={enabled} onChange={handleChange} disabled={isPending} />
    </div>
  );
}
