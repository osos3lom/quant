/**
 * app/stats/page.tsx
 * إحصائياتي — تُقرأ كلها من التخزين المحلي في المتصفح.
 */
import type { Metadata } from "next";
import { StatsPanel } from "@/components/StatsPanel";

export const metadata: Metadata = {
  title: "إحصائياتي",
  description:
    "تابع نقاط الخبرة والدقة وسلسلة الأيام وتقدّمك في كل وحدة من وحدات الحوسبة الكمية.",
};

export default function StatsPage() {
  return (
    <div className="mx-auto max-w-4xl px-4 py-10 sm:px-6 sm:py-14">
      <header className="mb-8">
        <h1 className="text-2xl font-extrabold text-slate-900 sm:text-3xl dark:text-white">
          إحصائياتي
        </h1>
        <p className="mt-2 max-w-2xl text-sm leading-relaxed text-slate-600 sm:text-base dark:text-slate-400">
          كل ما تراه هنا محفوظ في متصفحك وحده عبر localStorage — لا حسابات ولا خوادم.
        </p>
      </header>

      <StatsPanel />
    </div>
  );
}
