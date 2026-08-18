/**
 * components/lessons/NotebookCard.tsx
 * بطاقة دفتر داخل صفحة المسار: المتطلبات، الزمن، التمارين، ومؤشّر الإنجاز.
 */
"use client";

import Link from "next/link";
import { ArrowLeft, CheckCircle2, Clock, Code2, Link2, Trophy } from "lucide-react";
import type { Notebook } from "@/types/lessons";
import { notebookStats } from "@/data/lessons";
import { lessonKey, notebookCompletion } from "@/lib/progress";
import { useMounted, useProgress } from "@/lib/use-progress";
import { cn } from "@/lib/utils";
import { ProgressBar } from "@/components/ProgressBar";

export function NotebookCard({ notebook }: { notebook: Notebook }) {
  const progress = useProgress();
  const mounted = useMounted();

  const stats = notebookStats(notebook);
  const entry = mounted
    ? progress.lessons[lessonKey(notebook.track, notebook.slug)]
    : undefined;
  const completion = mounted
    ? notebookCompletion(
        progress,
        notebook.track,
        notebook.slug,
        stats.runnable,
        stats.exercises,
      )
    : 0;

  return (
    <article
      className={cn(
        "group flex flex-col gap-4 rounded-2xl border bg-white p-5 transition sm:flex-row sm:items-center",
        entry?.completed
          ? "border-brand-300 dark:border-brand-500/40"
          : "border-slate-200 hover:border-slate-300 dark:border-slate-800 dark:hover:border-slate-700",
        "dark:bg-slate-900",
      )}
    >
      {/* رقم الدفتر */}
      <span
        className={cn(
          "flex h-11 w-11 shrink-0 items-center justify-center rounded-xl text-base font-bold",
          entry?.completed
            ? "bg-brand-700 text-white"
            : "bg-slate-100 text-slate-600 dark:bg-slate-800 dark:text-slate-300",
        )}
      >
        {entry?.completed ? <CheckCircle2 className="h-5 w-5" /> : notebook.order}
      </span>

      <div className="min-w-0 flex-1">
        <h3 className="text-base font-bold text-slate-900 dark:text-white">
          {notebook.titleAr}
        </h3>
        <p className="mt-0.5 text-xs text-slate-500 dark:text-slate-500" dir="ltr">
          {notebook.titleEn}
        </p>
        <p className="mt-2 text-sm leading-relaxed text-slate-600 dark:text-slate-400">
          {notebook.summary}
        </p>

        <div className="mt-3 flex flex-wrap items-center gap-3 text-[11px] font-medium text-slate-500 dark:text-slate-400">
          <span className="flex items-center gap-1">
            <Clock className="h-3.5 w-3.5" />
            {notebook.estimatedMinutes} دقيقة
          </span>
          <span className="flex items-center gap-1">
            <Code2 className="h-3.5 w-3.5" />
            {stats.runnable} خلايا شيفرة
          </span>
          <span className="flex items-center gap-1">
            <Trophy className="h-3.5 w-3.5" />
            {stats.exercises} تمارين · {stats.points} نقطة
          </span>
        </div>

        {notebook.prerequisites.length > 0 && (
          <p className="mt-2 flex items-start gap-1.5 text-[11px] text-slate-500 dark:text-slate-400">
            <Link2 className="mt-0.5 h-3 w-3 shrink-0" />
            يتطلّب: {notebook.prerequisites.join(" · ")}
          </p>
        )}

        {mounted && entry && (
          <div className="mt-3 max-w-xs">
            <ProgressBar
              value={completion}
              size="sm"
              showValue
              label={entry.completed ? "مكتمل" : "قيد التقدّم"}
              barClassName={
                entry.completed
                  ? "bg-gradient-to-l from-brand-700 to-brand-500"
                  : "bg-gradient-to-l from-brand-600 to-brand-400"
              }
            />
          </div>
        )}
      </div>

      <Link
        href={`/lessons/${notebook.track}/${notebook.slug}`}
        className="flex shrink-0 items-center justify-center gap-2 rounded-xl bg-slate-900 px-5 py-2.5 text-sm font-semibold text-white transition hover:bg-brand-700 dark:bg-gold-400 dark:text-brand-950 dark:hover:bg-gold-300"
      >
        {entry?.completed ? "مراجعة" : entry ? "متابعة" : "افتح الدفتر"}
        <ArrowLeft className="h-4 w-4 transition group-hover:-translate-x-0.5" />
      </Link>
    </article>
  );
}
