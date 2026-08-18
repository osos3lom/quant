/**
 * app/lessons/[track]/page.tsx
 * صفحة مسار واحد: قائمة الدفاتر بمتطلباتها وأزمنتها ومؤشّرات إنجازها.
 * تُولَّد المسارات الثلاثة مسبقاً عبر generateStaticParams.
 */
import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { ArrowRight, Clock, ListChecks, Target, Trophy } from "lucide-react";
import type { TrackId } from "@/types/lessons";
import {
  getAllTrackParams,
  getNotebooksByStage,
  getNotebooksByTrack,
  getStages,
  getTrack,
  isTrackId,
  trackStats,
} from "@/data/lessons";
import { CategoryIcon } from "@/components/CategoryIcon";
import { NotebookCard } from "@/components/lessons/NotebookCard";
import { SourceCredit } from "@/components/lessons/SourceCredit";
import { QPREP_SOURCE } from "@/data/lessons/attribution";
import { cn } from "@/lib/utils";

export function generateStaticParams(): { track: string }[] {
  return getAllTrackParams();
}

/** لا مسارات خارج القائمة المولَّدة — مطلوب للتصدير الثابت. */
export const dynamicParams = false;

interface PageProps {
  params: Promise<{ track: string }>;
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { track } = await params;
  const info = isTrackId(track) ? getTrack(track) : undefined;
  if (!info) return { title: "مسار غير موجود" };

  return {
    title: info.nameAr,
    description: info.description,
  };
}

export default async function TrackPage({ params }: PageProps) {
  const { track } = await params;
  if (!isTrackId(track)) notFound();

  const trackId = track as TrackId;
  const info = getTrack(trackId);
  if (!info) notFound();

  const notebooks = getNotebooksByTrack(trackId);
  const stats = trackStats(trackId);
  const stages = getStages(trackId);

  return (
    <div className="mx-auto max-w-4xl px-4 py-10 sm:px-6 sm:py-14">
      <Link
        href="/lessons"
        className="mb-6 inline-flex items-center gap-1.5 text-sm font-medium text-slate-600 transition hover:text-slate-900 dark:text-slate-400 dark:hover:text-white"
      >
        <ArrowRight className="h-4 w-4" />
        كل المسارات
      </Link>

      <header className="mb-8">
        <div className="mb-4 flex items-start gap-4">
          <span
            className={cn(
              "flex h-14 w-14 shrink-0 items-center justify-center rounded-2xl bg-gradient-to-br text-white shadow-sm",
              info.gradient,
            )}
          >
            <CategoryIcon name={info.icon} className="h-7 w-7" />
          </span>
          <div className="min-w-0">
            <div className="flex flex-wrap items-center gap-2">
              <h1 className="text-2xl font-extrabold text-slate-900 sm:text-3xl dark:text-white">
                {info.nameAr}
              </h1>
              <span
                className={cn(
                  "rounded-md px-2 py-0.5 text-xs font-bold ring-1 ring-inset",
                  info.badgeClass,
                )}
                dir="ltr"
              >
                {info.codeName}
              </span>
            </div>
            <p className="mt-1 text-sm text-slate-500 dark:text-slate-400">
              {info.tagline}
            </p>
          </div>
        </div>

        <p className="text-sm leading-relaxed text-slate-600 sm:text-base dark:text-slate-400">
          {info.description}
        </p>

        <div className="mt-5 flex flex-wrap gap-2 text-xs">
          <span className="flex items-center gap-1.5 rounded-lg bg-slate-100 px-3 py-1.5 font-medium text-slate-700 dark:bg-slate-800 dark:text-slate-300">
            <ListChecks className="h-3.5 w-3.5" />
            {stats.notebooks} دفاتر
          </span>
          <span className="flex items-center gap-1.5 rounded-lg bg-slate-100 px-3 py-1.5 font-medium text-slate-700 dark:bg-slate-800 dark:text-slate-300">
            <Clock className="h-3.5 w-3.5" />
            نحو {Math.round(stats.minutes / 60)} ساعات ({stats.minutes} دقيقة)
          </span>
          <span className="flex items-center gap-1.5 rounded-lg bg-slate-100 px-3 py-1.5 font-medium text-slate-700 dark:bg-slate-800 dark:text-slate-300">
            <Trophy className="h-3.5 w-3.5" />
            {stats.exercises} تمريناً · {stats.points} نقطة
          </span>
        </div>

        {info.prerequisites.length > 0 && (
          <div className="mt-4 rounded-xl border border-slate-200 bg-white p-4 dark:border-slate-800 dark:bg-slate-900">
            <h2 className="mb-2 flex items-center gap-2 text-sm font-semibold text-slate-900 dark:text-white">
              <Target className="h-4 w-4 text-brand-600 dark:text-brand-400" />
              متطلبات المسار
            </h2>
            <ul className="space-y-1.5">
              {info.prerequisites.map((item) => (
                <li
                  key={item}
                  className="flex gap-2 text-sm text-slate-600 dark:text-slate-400"
                >
                  <span className="mt-2 h-1.5 w-1.5 shrink-0 rounded-full bg-brand-500" />
                  {item}
                </li>
              ))}
            </ul>
          </div>
        )}
      </header>

      {stages.length > 0 ? (
        <div className="space-y-10">
          {stages.map((stage) => {
            const stageNotebooks = getNotebooksByStage(trackId, stage.id);
            if (!stageNotebooks.length) return null;

            return (
              <section key={stage.id}>
                <div className="mb-4 flex items-start gap-3 rounded-2xl border border-brand-200 bg-brand-50/60 p-4 dark:border-brand-500/25 dark:bg-brand-500/5">
                  <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-brand-700 text-sm font-bold text-white">
                    {stage.id}
                  </span>
                  <div className="min-w-0">
                    <h2 className="text-base font-bold text-brand-900 dark:text-brand-100">
                      {stage.nameAr}
                    </h2>
                    <p className="mt-1 text-xs leading-relaxed text-brand-800/80 dark:text-brand-200/80">
                      {stage.description}
                    </p>
                    <p className="mt-1.5 text-[11px] font-medium text-brand-700 dark:text-brand-300">
                      {stageNotebooks.length} دفاتر
                    </p>
                  </div>
                </div>

                <div className="space-y-4">
                  {stageNotebooks.map((notebook) => (
                    <NotebookCard key={notebook.slug} notebook={notebook} />
                  ))}
                </div>
              </section>
            );
          })}
        </div>
      ) : (
        <div className="space-y-4">
          {notebooks.map((notebook) => (
            <NotebookCard key={notebook.slug} notebook={notebook} />
          ))}
        </div>
      )}

      {QPREP_SOURCE.tracks.includes(trackId) && <SourceCredit className="mt-8" />}
    </div>
  );
}
