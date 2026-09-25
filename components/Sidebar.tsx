"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";
import { NAV_ITEMS } from "@/libs/navigation";
import type { FooterLetter } from "@/libs/letters";
import { MenuIcon, CloseIcon } from "@/components/Icons";

function FooterQuote({ letter }: { letter: FooterLetter }) {
  return (
    <div className="px-6">
      <p className="font-serif-brand text-[13px] italic leading-relaxed text-[var(--muted)]">
        “{letter.message.slice(0, 64)}
        {letter.message.length > 64 ? "…" : ""}”
      </p>
      <p className="mt-2 text-[11px] text-[var(--muted)]">
        to {letter.to_name} · most felt
      </p>
    </div>
  );
}

export default function Sidebar({
  footerLetter,
  pendingReportsCount,
}: {
  footerLetter: FooterLetter | null;
  pendingReportsCount: number;
}) {
  const pathname = usePathname();
  const [open, setOpen] = useState(false);

  // Tutup drawer tiap kali pindah halaman.
  useEffect(() => {
    setOpen(false);
  }, [pathname]);

  // Kunci scroll body selagi drawer mobile terbuka.
  useEffect(() => {
    document.body.style.overflow = open ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [open]);

  return (
    <>
      {/* Top bar mobile — pengganti sidebar yang hidden di layar kecil */}
      <header className="flex items-center justify-between border-b border-[var(--border)] px-4 py-3 sm:px-6 md:hidden">
        <Link href="/" className="flex items-baseline gap-1.5">
          <span className="font-serif-brand text-lg italic text-[var(--foreground)]">
            hq
          </span>
          <span className="text-xs text-[var(--muted)]">unsent.cc</span>
        </Link>

        <button
          type="button"
          aria-label={open ? "Close menu" : "Open menu"}
          aria-expanded={open}
          onClick={() => setOpen((v) => !v)}
          className="flex h-9 w-9 items-center justify-center rounded-full text-[var(--foreground)] transition-colors hover:bg-[var(--surface)]"
        >
          {open ? <CloseIcon /> : <MenuIcon />}
        </button>
      </header>

      {/* Overlay gelap di belakang drawer */}
      {open && (
        <div
          className="fixed inset-0 z-40 bg-black/30 md:hidden"
          onClick={() => setOpen(false)}
          aria-hidden="true"
        />
      )}

      {/* Drawer nav mobile, slide dari kiri */}
      <div
        className={`fixed inset-y-0 left-0 z-50 flex w-72 max-w-[80vw] flex-col justify-between overflow-y-auto bg-[var(--background)] py-8 shadow-xl transition-transform duration-300 ease-out md:hidden ${
          open ? "translate-x-0" : "-translate-x-full"
        }`}
      >
        <div>
          <Link
            href="/"
            onClick={() => setOpen(false)}
            className="flex items-baseline gap-1.5 px-6 pb-10"
          >
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
                  onClick={() => setOpen(false)}
                  className="group relative flex items-center px-3 py-3 text-sm"
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
                  {item.href === "/reports" && pendingReportsCount > 0 && (
                    <span className="ml-2 inline-flex h-4 min-w-4 items-center justify-center rounded-full bg-[var(--accent)] px-1 text-[10px] font-medium text-white">
                      {pendingReportsCount > 9 ? "9+" : pendingReportsCount}
                    </span>
                  )}
                </Link>
              );
            })}
          </nav>
        </div>

        {footerLetter && <FooterQuote letter={footerLetter} />}
      </div>

      {/* Sidebar desktop — sama persis kayak sebelumnya, hidden di mobile */}
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
                  {item.href === "/reports" && pendingReportsCount > 0 && (
                    <span className="ml-2 inline-flex h-4 min-w-4 items-center justify-center rounded-full bg-[var(--accent)] px-1 text-[10px] font-medium text-white">
                      {pendingReportsCount > 9 ? "9+" : pendingReportsCount}
                    </span>
                  )}
                </Link>
              );
            })}
          </nav>
        </div>

        {footerLetter && <FooterQuote letter={footerLetter} />}
      </aside>
    </>
  );
}
