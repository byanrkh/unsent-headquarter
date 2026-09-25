import LoginForm from "./Components/LoginForm";

export default function LoginPage() {
  return (
    <main className="flex min-h-screen items-center justify-center px-6">
      <div className="w-full max-w-sm">
        <div className="mb-10 text-center">
          <span className="font-serif-brand text-2xl italic text-[var(--foreground)]">
            hq
          </span>
          <span className="ml-1.5 text-sm text-[var(--muted)]">unsent.cc</span>
        </div>
        <LoginForm />
      </div>
    </main>
  );
}
