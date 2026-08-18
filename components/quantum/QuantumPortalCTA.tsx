"use client";

import Link from "next/link";
import { ArrowLeft, Sparkles, Sigma } from "lucide-react";

export function QuantumPortalCTA() {
  return (
    <div className="relative overflow-hidden rounded-3xl border border-emerald-500/30 bg-gradient-to-b from-emerald-50 via-white to-emerald-50 p-6 sm:p-14 lg:p-16 text-center shadow-xl dark:from-slate-950 dark:via-slate-900 dark:to-slate-950 dark:shadow-2xl">
      {/* Background Ambient Glow */}
      <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_50%_50%,rgba(48,176,80,0.12),transparent_70%)]" />
      <div className="pointer-events-none absolute -bottom-16 left-1/2 -translate-x-1/2 h-64 w-96 rounded-full bg-gold-400/10 blur-3xl" />

      <div className="relative z-10 mx-auto max-w-2xl">
        <span className="inline-flex items-center gap-1.5 sm:gap-2 rounded-full border border-brand-200 bg-brand-50 px-3.5 py-1.5 text-xs font-semibold text-brand-800 dark:border-emerald-500/40 dark:bg-emerald-500/10 dark:text-emerald-300">
          <Sparkles className="h-3.5 w-3.5 text-brand-600 dark:text-emerald-400" />
          البوابة الكمية مفتوحة الآن
        </span>

        <h2 className="mt-4 sm:mt-5 text-2xl sm:text-4xl lg:text-5xl font-black leading-tight text-slate-900 dark:text-white">
          تجاوز حدود الحساب الكلاسيكي
        </h2>

        <p className="mt-3 sm:mt-4 text-xs sm:text-base lg:text-lg text-slate-600 dark:text-slate-300 leading-relaxed">
          انتقل من النظريات إلى التطبيق الرياضي المباشر. ابدأ الآن واختبر قدرتك على بناء وإدارة الحالات والدوائر الكمية.
        </p>

        <div className="mt-6 sm:mt-8 flex flex-col justify-center gap-3 sm:flex-row">
          <Link
            href="/exercises"
            className="inline-flex items-center justify-center gap-2 rounded-xl bg-slate-900 px-7 py-3.5 text-sm sm:text-base font-bold text-white shadow-lg transition hover:bg-slate-800 active:scale-95 dark:bg-gradient-to-r dark:from-emerald-600 dark:via-brand-500 dark:to-brand-400 dark:shadow-xl dark:shadow-emerald-500/25"
          >
            ابدأ رحلة الحوسبة الكمية
            <ArrowLeft className="h-4 w-4 sm:h-5 sm:w-5" />
          </Link>
          <Link
            href="/cheatsheet"
            className="inline-flex items-center justify-center gap-2 rounded-xl border border-slate-200 bg-white px-7 py-3.5 text-sm sm:text-base font-semibold text-slate-700 transition hover:bg-slate-100 dark:border-slate-700 dark:bg-slate-900/80 dark:text-slate-200 dark:hover:bg-slate-800"
          >
            <Sigma className="h-4 w-4 sm:h-5 sm:w-5 text-gold-600 dark:text-gold-400" />
            استكشف مرجع القوانين
          </Link>
        </div>
      </div>
    </div>
  );
}
