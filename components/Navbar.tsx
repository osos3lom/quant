/**
 * components/Navbar.tsx
 * شريط تنقّل علوي بالاتجاه RTL مع عرض نقاط الخبرة وزر الوضع الليلي.
 */
"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useState } from "react";
import { Atom, BookOpen, ChartNoAxesColumn, Flame, Menu, Sigma, X } from "lucide-react";
import { ThemeToggle } from "./ThemeToggle";
import { useMounted, useProgress } from "@/lib/use-progress";
import { cn } from "@/lib/utils";

const LINKS = [
  { href: "/exercises", label: "التمارين", icon: BookOpen },
  { href: "/cheatsheet", label: "ملخص القوانين", icon: Sigma },
  { href: "/stats", label: "إحصائياتي", icon: ChartNoAxesColumn },
];

export function Navbar() {
  const pathname = usePathname();
  const progress = useProgress();
  const mounted = useMounted();
  const [open, setOpen] = useState(false);

  function isActive(href: string): boolean {
    return pathname === href || pathname.startsWith(`${href}/`);
  }

  return (
    <header className="sticky top-0 z-50 border-b border-slate-200/70 bg-white/80 backdrop-blur-md dark:border-slate-800 dark:bg-slate-950/80">
      <nav className="mx-auto flex h-16 max-w-6xl items-center gap-3 px-4 sm:px-6">
        <Link href="/" className="flex items-center gap-2.5 shrink-0">
          <span className="flex h-9 w-9 items-center justify-center rounded-xl bg-gradient-to-br from-sky-500 to-violet-500 text-white shadow-sm">
            <Atom className="h-5 w-5" />
          </span>
          <span className="hidden text-base font-bold text-slate-900 sm:block dark:text-white">
            تمارين الحوسبة الكمية
          </span>
        </Link>

        <div className="hidden items-center gap-1 md:flex">
          {LINKS.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              className={cn(
                "flex items-center gap-1.5 rounded-lg px-3 py-2 text-sm font-medium transition",
                isActive(link.href)
                  ? "bg-sky-50 text-sky-700 dark:bg-sky-500/10 dark:text-sky-300"
                  : "text-slate-600 hover:bg-slate-100 hover:text-slate-900 dark:text-slate-400 dark:hover:bg-slate-800 dark:hover:text-white",
              )}
            >
              <link.icon className="h-4 w-4" />
              {link.label}
            </Link>
          ))}
        </div>

        <div className="ms-auto flex items-center gap-2">
          {mounted && progress.xp > 0 && (
            <span className="hidden items-center gap-1.5 rounded-lg bg-amber-50 px-2.5 py-1.5 text-xs font-semibold text-amber-700 sm:flex dark:bg-amber-500/10 dark:text-amber-300">
              <Flame className="h-3.5 w-3.5" />
              <span className="tabular-nums">{progress.xp}</span>
              نقطة
            </span>
          )}
          <ThemeToggle />
          <button
            type="button"
            onClick={() => setOpen((value) => !value)}
            aria-label="فتح القائمة"
            aria-expanded={open}
            className="inline-flex h-9 w-9 items-center justify-center rounded-xl border border-slate-200 text-slate-600 md:hidden dark:border-slate-700 dark:text-slate-300"
          >
            {open ? <X className="h-[18px] w-[18px]" /> : <Menu className="h-[18px] w-[18px]" />}
          </button>
        </div>
      </nav>

      {open && (
        <div className="border-t border-slate-200 bg-white px-4 py-2 md:hidden dark:border-slate-800 dark:bg-slate-950">
          {LINKS.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              onClick={() => setOpen(false)}
              className={cn(
                "flex items-center gap-2 rounded-lg px-3 py-2.5 text-sm font-medium",
                isActive(link.href)
                  ? "bg-sky-50 text-sky-700 dark:bg-sky-500/10 dark:text-sky-300"
                  : "text-slate-600 dark:text-slate-300",
              )}
            >
              <link.icon className="h-4 w-4" />
              {link.label}
            </Link>
          ))}
        </div>
      )}
    </header>
  );
}
