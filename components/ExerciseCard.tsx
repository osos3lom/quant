/**
 * components/ExerciseCard.tsx
 * بطاقة تمرين: العنوان، التصنيف، الصعوبة، عدد الأسئلة، ومؤشر الإنجاز من التخزين المحلي.
 */
"use client";

import Link from "next/link";
import { ArrowLeft, CheckCircle2, Clock, ListChecks } from "lucide-react";
import type { Exercise } from "@/types/quantum";
import { getCategory, getDifficulty } from "@/data/taxonomy";
import { exerciseCompletion } from "@/lib/progress";
import { useMounted, useProgress } from "@/lib/use-progress";
import { cn } from "@/lib/utils";
import { CategoryIcon } from "./CategoryIcon";
import { ProgressBar } from "./ProgressBar";

export function ExerciseCard({ exercise }: { exercise: Exercise }) {
  const progress = useProgress();
  const mounted = useMounted();

  const category = getCategory(exercise.category);
  const difficulty = getDifficulty(exercise.difficulty);
  const entry = progress.exercises[exercise.slug];
  const completion = exerciseCompletion(progress, exercise.slug, exercise.questions.length);
  const started = mounted && Boolean(entry);
  const finished = mounted && Boolean(entry?.completed);

  return (
    <article
      className={cn(
        "group relative flex flex-col overflow-hidden rounded-2xl border bg-white p-5 transition",
        "border-slate-200 hover:-translate-y-0.5 hover:border-slate-300 hover:shadow-lg hover:shadow-slate-200/60",
        "dark:border-slate-800 dark:bg-slate-900 dark:hover:border-slate-700 dark:hover:shadow-black/30",
      )}
    >
      {/* شريط لوني علوي يعبّر عن التصنيف */}
      <span
        className={cn(
          "absolute inset-x-0 top-0 h-1 bg-gradient-to-l",
          category.gradient,
        )}
      />

      <div className="mb-3 flex items-start gap-3">
        <span
          className={cn(
            "flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-gradient-to-br text-white shadow-sm",
            category.gradient,
          )}
        >
          <CategoryIcon name={category.icon} className="h-5 w-5" />
        </span>
        <div className="min-w-0 flex-1">
          <h3 className="text-base font-bold leading-6 text-slate-900 dark:text-white">
            {exercise.titleAr}
          </h3>
          <p className="mt-0.5 truncate text-xs text-slate-500 dark:text-slate-500" dir="ltr">
            {exercise.titleEn}
          </p>
        </div>
      </div>

      <div className="mb-3 flex flex-wrap gap-1.5">
        <span
          className={cn(
            "rounded-md px-2 py-1 text-[11px] font-semibold ring-1 ring-inset",
            category.badgeClass,
          )}
        >
          {category.nameAr}
        </span>
        <span
          className={cn(
            "rounded-md px-2 py-1 text-[11px] font-semibold ring-1 ring-inset",
            difficulty.badgeClass,
          )}
        >
          {difficulty.nameAr}
        </span>
      </div>

      <p className="mb-4 line-clamp-3 grow text-sm leading-relaxed text-slate-600 dark:text-slate-400">
        {exercise.summary}
      </p>

      <div className="mb-4 flex items-center gap-4 text-xs font-medium text-slate-500 dark:text-slate-400">
        <span className="flex items-center gap-1.5">
          <ListChecks className="h-4 w-4" />
          {exercise.questions.length} أسئلة
        </span>
        <span className="flex items-center gap-1.5">
          <Clock className="h-4 w-4" />
          {exercise.estimatedMinutes} دقيقة
        </span>
      </div>

      <div className="mb-4">
        {finished ? (
          <div className="flex items-center gap-1.5 text-xs font-semibold text-emerald-600 dark:text-emerald-400">
            <CheckCircle2 className="h-4 w-4" />
            مكتمل بنسبة {completion}%
            {entry && entry.attempts > 1 && (
              <span className="font-normal text-slate-500 dark:text-slate-500">
                · {entry.attempts} محاولات
              </span>
            )}
          </div>
        ) : started && completion > 0 ? (
          <ProgressBar
            value={completion}
            size="sm"
            label="قيد التقدّم"
            showValue
            barClassName="bg-gradient-to-l from-amber-500 to-orange-400"
          />
        ) : (
          <span className="text-xs font-medium text-slate-400 dark:text-slate-500">
            لم تبدأ بعد
          </span>
        )}
      </div>

      <Link
        href={`/exercises/${exercise.slug}`}
        className={cn(
          "flex items-center justify-center gap-2 rounded-xl px-4 py-2.5 text-sm font-semibold transition",
          "bg-slate-900 text-white hover:bg-slate-700",
          "dark:bg-white dark:text-slate-900 dark:hover:bg-slate-200",
        )}
      >
        {finished ? "إعادة التمرين" : started ? "متابعة التمرين" : "ابدأ التمرين"}
        <ArrowLeft className="h-4 w-4 transition group-hover:-translate-x-0.5" />
      </Link>
    </article>
  );
}
