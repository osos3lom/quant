/**
 * app/exercises/[slug]/page.tsx
 * واجهة حل التمرين. تُولَّد كل المسارات مسبقاً عبر generateStaticParams للتصدير الثابت.
 */
import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { ArrowRight, Target } from "lucide-react";
import {
  EXERCISES,
  getAllSlugs,
  getExerciseBySlug,
  getMaxPoints,
  getNextExercise,
} from "@/data/exercises";
import { getCategory, getDifficulty } from "@/data/taxonomy";
import { CategoryIcon } from "@/components/CategoryIcon";
import { ExerciseRunner } from "@/components/ExerciseRunner";
import { cn } from "@/lib/utils";

/** كل مسارات التمارين تُبنى وقت التصدير. */
export function generateStaticParams(): { slug: string }[] {
  return getAllSlugs().map((slug) => ({ slug }));
}

/** لا مسارات ديناميكية خارج القائمة المولَّدة — مطلوب للتصدير الثابت. */
export const dynamicParams = false;

interface PageProps {
  params: Promise<{ slug: string }>;
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { slug } = await params;
  const exercise = getExerciseBySlug(slug);
  if (!exercise) return { title: "تمرين غير موجود" };

  return {
    title: exercise.titleAr,
    description: exercise.summary,
    keywords: exercise.keywords,
  };
}

export default async function ExercisePage({ params }: PageProps) {
  const { slug } = await params;
  const exercise = getExerciseBySlug(slug);
  if (!exercise) notFound();

  const category = getCategory(exercise.category);
  const difficulty = getDifficulty(exercise.difficulty);
  const next = getNextExercise(slug);
  const order = EXERCISES.findIndex((item) => item.slug === slug) + 1;

  return (
    <div className="mx-auto max-w-3xl px-4 py-8 sm:px-6 sm:py-12">
      <Link
        href="/exercises"
        className="mb-6 inline-flex items-center gap-1.5 text-sm font-medium text-slate-600 transition hover:text-slate-900 dark:text-slate-400 dark:hover:text-white"
      >
        <ArrowRight className="h-4 w-4" />
        العودة إلى دليل التمارين
      </Link>

      <header className="mb-7">
        <div className="mb-3 flex items-center gap-3">
          <span
            className={cn(
              "flex h-12 w-12 shrink-0 items-center justify-center rounded-xl bg-gradient-to-br text-white shadow-sm",
              category.gradient,
            )}
          >
            <CategoryIcon name={category.icon} className="h-6 w-6" />
          </span>
          <div className="min-w-0">
            <p className="text-xs font-medium text-slate-500 dark:text-slate-400">
              الوحدة {order} من {EXERCISES.length} · {category.nameAr}
            </p>
            <h1 className="text-xl font-extrabold text-slate-900 sm:text-2xl dark:text-white">
              {exercise.titleAr}
            </h1>
          </div>
        </div>

        <p className="text-sm leading-relaxed text-slate-600 dark:text-slate-400">
          {exercise.summary}
        </p>

        <div className="mt-4 flex flex-wrap items-center gap-2 text-xs">
          <span
            className={cn(
              "rounded-md px-2 py-1 font-semibold ring-1 ring-inset",
              difficulty.badgeClass,
            )}
          >
            {difficulty.nameAr}
          </span>
          <span className="rounded-md bg-slate-100 px-2 py-1 font-medium text-slate-600 dark:bg-slate-800 dark:text-slate-300">
            {exercise.questions.length} أسئلة
          </span>
          <span className="rounded-md bg-slate-100 px-2 py-1 font-medium text-slate-600 dark:bg-slate-800 dark:text-slate-300">
            {getMaxPoints(exercise)} نقطة
          </span>
          <span className="rounded-md bg-slate-100 px-2 py-1 font-medium text-slate-600 dark:bg-slate-800 dark:text-slate-300">
            نحو {exercise.estimatedMinutes} دقيقة
          </span>
        </div>

        <details className="mt-4 rounded-xl border border-slate-200 bg-white p-4 dark:border-slate-800 dark:bg-slate-900">
          <summary className="flex cursor-pointer list-none items-center gap-2 text-sm font-semibold text-slate-900 dark:text-white">
            <Target className="h-4 w-4 text-sky-500" />
            أهداف هذه الوحدة
          </summary>
          <ul className="mt-3 space-y-2">
            {exercise.objectives.map((objective) => (
              <li
                key={objective}
                className="flex gap-2 text-sm text-slate-600 dark:text-slate-400"
              >
                <span className="mt-2 h-1.5 w-1.5 shrink-0 rounded-full bg-sky-500" />
                {objective}
              </li>
            ))}
          </ul>
        </details>
      </header>

      <ExerciseRunner
        exercise={exercise}
        nextExercise={next ? { slug: next.slug, titleAr: next.titleAr } : undefined}
      />
    </div>
  );
}
