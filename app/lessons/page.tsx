/**
 * app/lessons/page.tsx
 * دليل المسارات الثلاثة: البرونزي والفضي والذهبي.
 */
import type { Metadata } from "next";
import { Cpu, Sparkles } from "lucide-react";
import { TRACKS, TOTAL_NOTEBOOKS, trackStats } from "@/data/lessons";
import { TrackCard } from "@/components/lessons/TrackCard";
import { SourceCredit } from "@/components/lessons/SourceCredit";

export const metadata: Metadata = {
  title: "الدروس التفاعلية",
  description:
    "ثلاثة مسارات لإتقان الحوسبة الكمية عبر دفاتر تفاعلية تشغّل بايثون داخل متصفحك: البرونزي والفضي والذهبي.",
};

export default function LessonsPage() {
  const totalExercises = TRACKS.reduce(
    (sum, track) => sum + trackStats(track.id).exercises,
    0,
  );

  return (
    <div className="mx-auto max-w-6xl px-4 py-10 sm:px-6 sm:py-14">
      <header className="mb-9">
        <span className="inline-flex items-center gap-1.5 rounded-full border border-brand-200 bg-brand-50 px-3 py-1 text-xs font-semibold text-brand-700 dark:border-brand-500/30 dark:bg-brand-500/10 dark:text-brand-300">
          <Sparkles className="h-3.5 w-3.5" />
          {TOTAL_NOTEBOOKS} دفاتر تفاعلية · {totalExercises} تمريناً برمجياً
        </span>

        <h1 className="mt-4 text-2xl font-extrabold text-slate-900 sm:text-3xl dark:text-white">
          الدروس التفاعلية
        </h1>
        <p className="mt-2 max-w-3xl text-sm leading-relaxed text-slate-600 sm:text-base dark:text-slate-400">
          مسار تعليمي متدرّج مستوحى من منهج QWorld، مقسّم إلى ثلاثة مستويات إتقان. كل درس
          دفتر تفاعلي بأسلوب Jupyter: تقرأ الشرح بالعربية، وتكتب بايثون، وتشغّله فوراً،
          وترى الرسوم البيانية تحت الخلية مباشرة.
        </p>

        <div className="mt-4 flex items-start gap-2 rounded-xl border border-brand-200 bg-brand-50/60 px-4 py-3 dark:border-brand-500/25 dark:bg-brand-500/5">
          <Cpu className="mt-0.5 h-4 w-4 shrink-0 text-brand-700 dark:text-brand-400" />
          <p className="text-xs leading-relaxed text-brand-900 dark:text-brand-200">
            بايثون يعمل بالكامل داخل متصفحك عبر Pyodide و WebAssembly — بلا خوادم وبلا
            تثبيت أي شيء. تُحمَّل النواة عند أول تشغيل فقط، ثم تبقى جاهزة لبقية الجلسة،
            ويُحفظ تقدّمك محلياً على جهازك.
          </p>
        </div>
      </header>

      <div className="grid gap-6 lg:grid-cols-3">
        {TRACKS.map((track) => (
          <TrackCard key={track.id} track={track} />
        ))}
      </div>

      <SourceCredit className="mt-10" />
    </div>
  );
}
