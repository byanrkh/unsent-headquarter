import type { Metadata } from "next";
import "./globals.css";
import { newsreader } from "@/libs/Font";

export const metadata: Metadata = {
  title: {
    default: "hq — unsent.cc",
    template: "%s — hq.unsent.cc",
  },
  description: "Internal dashboard for unsent.cc.",
  robots: { index: false, follow: false }, // internal tool, keep it out of search
};

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en" className={newsreader.variable}>
      <body className="antialiased">{children}</body>
    </html>
  );
}
