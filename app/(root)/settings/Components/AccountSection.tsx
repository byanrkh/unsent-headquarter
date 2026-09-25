import { signOut } from "@/app/actions/auth";

export default function AccountSection({ email }: { email: string }) {
  return (
    <div className="flex flex-col gap-1 py-6 sm:flex-row sm:items-center sm:justify-between">
      <div>
        <p className="text-[var(--foreground)]">Account</p>
        <p className="mt-0.5 text-sm text-[var(--muted)]">
          Signed in as {email}
        </p>
      </div>
      <form action={signOut}>
        <button
          type="submit"
          className="rounded-full border border-[var(--border)] px-3 py-1.5 text-sm text-[var(--foreground)] transition-colors hover:border-[var(--accent)] hover:text-[var(--accent)]"
        >
          Sign out
        </button>
      </form>
    </div>
  );
}
