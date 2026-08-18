/**
 * components/Navbar.tsx
 * شريط تنقّل عائم بحواف دائرية وزجاج بلوري (Glassmorphic Floating Nav).
 * يتحوّل إلى شريط سفلي (Floating Bottom Bar) على شاشات الجوال.
 */
"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import {
  Atom,
  BookOpen,
  ChartNoAxesColumn,
  Flame,
  Home,
  NotebookPen,
  Sigma,
} from "lucide-react";
import { ThemeToggle } from "./ThemeToggle";
import { useMounted, useProgress } from "@/lib/use-progress";
import { cn } from "@/lib/utils";

const NAV_ITEMS = [
  { href: "/", label: "الرئيسية", icon: Home },
  { href: "/lessons", label: "الدروس", icon: NotebookPen },
  { href: "/exercises", label: "التمارين", icon: BookOpen },
  { href: "/cheatsheet", label: "القوانين", icon: Sigma },
  { href: "/stats", label: "إحصائياتي", icon: ChartNoAxesColumn },
];

export function Navbar() {
  const pathname = usePathname();
  const progress = useProgress();
  const mounted = useMounted();

  function isActive(href: string): boolean {
    if (href === "/") return pathname === "/";
    return pathname === href || pathname.startsWith(`${href}/`);
  }

  return (
    <>
      {/* DESKTOP FLOATING NAVBAR (Top Floating Glass Pill) */}
      <header className="fixed top-4 left-1/2 -translate-x-1/2 z-50 hidden md:flex w-[calc(100%-2rem)] max-w-5xl">
        <nav className="flex h-14 w-full items-center justify-between px-5 rounded-full border border-slate-200/80 bg-white/75 backdrop-blur-xl shadow-lg shadow-slate-900/5 dark:border-slate-800/80 dark:bg-slate-950/80 dark:shadow-black/40 transition-all duration-300">
          {/* Logo */}
          <Link href="/" className="flex items-center gap-2.5 shrink-0 group">
            <span className="flex h-9 w-9 items-center justify-center rounded-full bg-gradient-to-br from-brand-600 to-brand-400 text-white shadow-md transition group-hover:scale-105 dark:from-emerald-500 dark:to-gold-400">
              <Atom className="h-5 w-5" />
            </span>
            <span className="text-sm font-black text-slate-900 dark:text-white tracking-tight">
              تمارين الحوسبة الكمية
            </span>
          </Link>

          {/* Desktop Nav Links */}
          <div className="flex items-center gap-1">
            {NAV_ITEMS.filter((item) => item.href !== "/").map((link) => {
              const active = isActive(link.href);
              return (
                <Link
                  key={link.href}
                  href={link.href}
                  className={cn(
                    "flex items-center gap-1.5 rounded-full px-4 py-2 text-xs font-bold transition-all duration-200",
                    active
                      ? "bg-brand-500/10 text-brand-700 dark:bg-emerald-500/15 dark:text-emerald-300 shadow-sm"
                      : "text-slate-600 hover:bg-slate-100 hover:text-slate-900 dark:text-slate-400 dark:hover:bg-slate-900 dark:hover:text-white",
                  )}
                >
                  <link.icon className="h-4 w-4" />
                  {link.label}
                </Link>
              );
            })}
          </div>

          {/* XP & Theme Controls */}
          <div className="flex items-center gap-2">
            {mounted && progress.xp > 0 && (
              <span className="flex items-center gap-1.5 rounded-full bg-amber-500/10 px-3 py-1 text-xs font-bold text-amber-700 dark:bg-gold-400/15 dark:text-gold-300 border border-amber-500/20 dark:border-gold-400/30">
                <Flame className="h-3.5 w-3.5 text-amber-600 dark:text-gold-400" />
                <span className="tabular-nums">{progress.xp}</span>
                <span className="text-[10px]">نقطة</span>
              </span>
            )}
            <ThemeToggle />
          </div>
        </nav>
      </header>

      {/* MOBILE TOP HEADER (Micro Floating Pills for Logo & Controls) */}
      <div className="fixed top-3 left-3 right-3 z-50 flex items-center justify-between md:hidden pointer-events-none">
        {/* Right: Floating Logo */}
        <Link
          href="/"
          className="pointer-events-auto flex items-center gap-2 rounded-full border border-slate-200/80 bg-white/85 px-3 py-1.5 backdrop-blur-xl shadow-md dark:border-slate-800/80 dark:bg-slate-950/85"
        >
          <span className="flex h-7 w-7 items-center justify-center rounded-full bg-brand-600 text-white dark:bg-emerald-500">
            <Atom className="h-4 w-4" />
          </span>
          <span className="text-xs font-bold text-slate-900 dark:text-white">
            الحوسبة الكمية
          </span>
        </Link>

        {/* Left: XP & Theme Toggle */}
        <div className="pointer-events-auto flex items-center gap-1.5 rounded-full border border-slate-200/80 bg-white/85 p-1 backdrop-blur-xl shadow-md dark:border-slate-800/80 dark:bg-slate-950/85">
          {mounted && progress.xp > 0 && (
            <span className="flex items-center gap-1 px-2 text-[11px] font-bold text-amber-700 dark:text-gold-400">
              <Flame className="h-3 w-3 text-amber-600 dark:text-gold-400" />
              <span className="tabular-nums">{progress.xp}</span>
            </span>
          )}
          <ThemeToggle className="h-8 w-8 rounded-full border-none bg-transparent" />
        </div>
      </div>

      {/* MOBILE FLOATING BOTTOM BAR (Bottom Floating Glass Navigation) */}
      <div className="fixed bottom-3 left-3 right-3 z-50 flex md:hidden">
        <nav className="grid grid-cols-5 items-center justify-items-center h-16 w-full rounded-2xl border border-slate-200/80 bg-white/85 backdrop-blur-2xl px-1 shadow-2xl dark:border-slate-800/80 dark:bg-slate-950/90 transition-all duration-300">
          {NAV_ITEMS.map((link) => {
            const active = isActive(link.href);
            return (
              <Link
                key={link.href}
                href={link.href}
                className={cn(
                  "flex flex-col items-center justify-center w-full h-12 rounded-xl transition-all duration-200",
                  active
                    ? "text-brand-700 dark:text-emerald-400 font-bold"
                    : "text-slate-500 hover:text-slate-900 dark:text-slate-400 dark:hover:text-white",
                )}
              >
                <div
                  className={cn(
                    "flex h-7 w-11 items-center justify-center rounded-full transition-all duration-200",
                    active
                      ? "bg-brand-500/15 text-brand-700 dark:bg-emerald-500/20 dark:text-emerald-300 scale-105"
                      : "bg-transparent",
                  )}
                >
                  <link.icon className="h-4 w-4" />
                </div>
                <span className="text-[10px] font-semibold mt-0.5 tracking-tight">
                  {link.label}
                </span>
              </Link>
            );
          })}
        </nav>
      </div>
    </>
  );
}
