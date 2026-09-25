"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { NAV_ITEMS } from "@/libs/navigation";
import { mockLetters } from "@/libs/mockLetters";

const footerLetter = mockLetters[0];

export default function Sidebar() {
  const pathname = usePathname();

  return (
    <aside className="hidden md:flex md:w-60 md:shrink-0 md:flex-col md:justify-between md:border-r md:border-[var(--border)] md:py-8">
      <div>
        <Link href="/" className="flex items-baseline gap-1.5 px-6 pb-10">
          <span className="font-serif-brand text-xl italic text-[var(--foreground)]">
            hq
          </span>
          <span className="text-[13px] text-[var(--muted)]">unsent.cc</span>
        </Link>

        <nav className="flex flex-col px-3">
          {NAV_ITEMS.map((item) => {
            const active =
              item.href === "/"
                ? pathname === "/"
                : pathname.startsWith(item.href);

            return (
              <Link
                key={item.href}
                href={item.href}
                className="group relative flex items-center px-3 py-2 text-sm"
              >
                <span
                  className={`absolute left-0 h-4 w-[2px] rounded-full transition-colors ${
                    active ? "bg-[var(--accent)]" : "bg-transparent"
                  }`}
                />
                <span
                  className={`transition-colors ${
                    active
                      ? "text-[var(--foreground)]"
                      : "text-[var(--muted)] group-hover:text-[var(--foreground)]"
                  }`}
                >
                  {item.label}
                </span>
              </Link>
            );
          })}
        </nav>
      </div>

      {/* A quiet reminder of what's actually flowing through the system */}
      <div className="px-6">
        <p className="font-serif-brand text-[13px] italic leading-relaxed text-[var(--muted)]">
          “{footerLetter.message.slice(0, 64)}…”
        </p>
        <p className="mt-2 text-[11px] text-[var(--muted)]">
          to {footerLetter.to} · most felt today
        </p>
      </div>
    </aside>
  );
}
