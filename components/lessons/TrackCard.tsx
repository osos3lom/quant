/**
 * components/lessons/TrackCard.tsx
 * بطاقة مسار تعليمي مع مؤشّر التقدّم المقروء من التخزين المحلي.
 */
"use client";

import Link from "next/link";
import { ArrowLeft, BookOpen, CheckCircle2, Clock, Trophy } from "lucide-react";
import type { Track } from "@/types/lessons";
import { getNotebooksByTrack, trackStats } from "@/data/lessons";
import { lessonKey } from "@/lib/progress";
import { useMounted, useProgress } from "@/lib/use-progress";
import { cn } from "@/lib/utils";
import { CategoryIcon } from "@/components/CategoryIcon";
import { ProgressBar } from "@/components/ProgressBar";

export function TrackCard({ track }: { track: Track }) {
  const progress = useProgress();
  const mounted = useMounted();

  const notebooks = getNotebooksByTrack(track.id);
  const stats = trackStats(track.id);

  const completed = mounted
    ? notebooks.filter(
        (notebook) => progress.lessons[lessonKey(track.id, notebook.slug)]?.completed,
      ).length
    : 0;
  const started = mounted
    ? notebooks.filter((notebook) => progress.lessons[lessonKey(track.id, notebook.slug)])
        .length
    : 0;

  const earnedXp = mounted
    ? notebooks.reduce((sum, notebook) => {
        const entry = progress.lessons[lessonKey(track.id, notebook.slug)];
        if (!entry) return sum;
        return (
          sum +
          notebook.cells.reduce((cellSum, cell) => {
            if (cell.kind !== "exercise") return cellSum;
            return entry.solvedExercises.includes(cell.id)
              ? cellSum + cell.points
              : cellSum;
          }, 0)
        );
      }, 0)
    : 0;

  const completion = notebooks.length
    ? Math.round((completed / notebooks.length) * 100)
    : 0;

  return (
    <article className="group relative flex flex-col overflow-hidden rounded-2xl border border-slate-200 bg-white p-6 transition hover:-translate-y-0.5 hover:shadow-lg hover:shadow-brand-900/5 dark:border-slate-800 dark:bg-slate-900 dark:hover:shadow-black/30">
      <span
        className={cn("absolute inset-x-0 top-0 h-1.5 bg-gradient-to-l", track.gradient)}
      />

      <div className="mb-4 flex items-start gap-3">
        <span
          className={cn(
            "flex h-12 w-12 shrink-0 items-center justify-center rounded-xl bg-gradient-to-br text-white shadow-sm",
            track.gradient,
          )}
        >
          <CategoryIcon name={track.icon} className="h-6 w-6" />
        </span>
        <div className="min-w-0 flex-1">
          <div className="flex flex-wrap items-center gap-2">
            <h2 className="text-lg font-bold text-slate-900 dark:text-white">
              {track.nameAr}
            </h2>
            <span
              className={cn(
                "rounded-md px-2 py-0.5 text-[11px] font-bold ring-1 ring-inset",
                track.badgeClass,
              )}
              dir="ltr"
            >
              {track.codeName}
            </span>
          </div>
          <p className="mt-0.5 text-xs text-slate-500 dark:text-slate-400">
            {track.tagline}
          </p>
        </div>
      </div>

      <p className="mb-5 grow text-sm leading-relaxed text-slate-600 dark:text-slate-400">
        {track.description}
      </p>

      <div className="mb-4 grid grid-cols-3 gap-2 text-center">
        <div className="rounded-xl bg-slate-50 p-2.5 dark:bg-slate-800/60">
          <p className="flex items-center justify-center gap-1 text-sm font-bold text-slate-900 tabular-nums dark:text-white">
            <BookOpen className="h-3.5 w-3.5 text-brand-600 dark:text-brand-400" />
            {stats.notebooks}
          </p>
          <p className="mt-0.5 text-[11px] text-slate-500 dark:text-slate-400">دفاتر</p>
        </div>
        <div className="rounded-xl bg-slate-50 p-2.5 dark:bg-slate-800/60">
          <p className="flex items-center justify-center gap-1 text-sm font-bold text-slate-900 tabular-nums dark:text-white">
            <Clock className="h-3.5 w-3.5 text-brand-600 dark:text-brand-400" />
            {track.estimatedHours}
          </p>
          <p className="mt-0.5 text-[11px] text-slate-500 dark:text-slate-400">ساعات</p>
        </div>
        <div className="rounded-xl bg-slate-50 p-2.5 dark:bg-slate-800/60">
          <p className="flex items-center justify-center gap-1 text-sm font-bold text-slate-900 tabular-nums dark:text-white">
            <Trophy className="h-3.5 w-3.5 text-brand-600 dark:text-brand-400" />
            {stats.points}
          </p>
          <p className="mt-0.5 text-[11px] text-slate-500 dark:text-slate-400">نقطة</p>
        </div>
      </div>

      <div className="mb-4">
        {mounted && completed > 0 ? (
          <ProgressBar
            value={completion}
            size="sm"
            label={`${completed} من ${notebooks.length} دفاتر مكتملة`}
            showValue
            barClassName="bg-gradient-to-l from-brand-700 to-brand-400"
          />
        ) : mounted && started > 0 ? (
          <span className="flex items-center gap-1.5 text-xs font-medium text-brand-700 dark:text-brand-400">
            <CheckCircle2 className="h-3.5 w-3.5" />
            بدأت {started} من {notebooks.length} دفاتر
          </span>
        ) : (
          <span className="text-xs font-medium text-slate-400 dark:text-slate-500">
            لم تبدأ هذا المسار بعد
          </span>
        )}
        {mounted && earnedXp > 0 && (
          <p className="mt-1.5 text-[11px] text-slate-500 dark:text-slate-400">
            جمعت {earnedXp} نقطة من تمارين هذا المسار
          </p>
        )}
      </div>

      <Link
        href={`/lessons/${track.id}`}
        className="flex items-center justify-center gap-2 rounded-xl bg-brand-700 px-4 py-2.5 text-sm font-semibold text-white transition hover:bg-brand-600"
      >
        {completed > 0 ? "تابع المسار" : "ابدأ المسار"}
        <ArrowLeft className="h-4 w-4 transition group-hover:-translate-x-0.5" />
      </Link>
    </article>
  );
}
