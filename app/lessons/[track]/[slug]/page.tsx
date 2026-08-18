/**
 * app/lessons/[track]/[slug]/page.tsx
 * مشغّل الدفتر التفاعلي. كل الأزواج (مسار، دفتر) تُبنى مسبقاً للتصدير الثابت.
 */
import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { ArrowRight, Clock, Link2, Target } from "lucide-react";
import type { TrackId } from "@/types/lessons";
import {
  getAllLessonParams,
  getNextNotebook,
  getNotebook,
  getNotebooksByTrack,
  getTrack,
  isTrackId,
  notebookStats,
} from "@/data/lessons";
import { CategoryIcon } from "@/components/CategoryIcon";
import { NotebookPlayer } from "@/components/lessons/NotebookPlayer";
import { SourceCredit } from "@/components/lessons/SourceCredit";
import { QPREP_SOURCE } from "@/data/lessons/attribution";
import { cn } from "@/lib/utils";

/** كل دفاتر المنصة تُبنى وقت التصدير. */
export function generateStaticParams(): { track: string; slug: string }[] {
  return getAllLessonParams();
}

/** لا مسارات ديناميكية خارج القائمة المولَّدة — مطلوب للتصدير الثابت. */
export const dynamicParams = false;

interface PageProps {
  params: Promise<{ track: string; slug: string }>;
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { track, slug } = await params;
  const notebook = isTrackId(track) ? getNotebook(track as TrackId, slug) : undefined;
  if (!notebook) return { title: "درس غير موجود" };

  return {
    title: notebook.titleAr,
    description: notebook.summary,
    keywords: notebook.keywords,
  };
}

export default async function NotebookPage({ params }: PageProps) {
  const { track, slug } = await params;
  if (!isTrackId(track)) notFound();

  const trackId = track as TrackId;
  const notebook = getNotebook(trackId, slug);
  const info = getTrack(trackId);
  if (!notebook || !info) notFound();

  const next = getNextNotebook(trackId, slug);
  const stats = notebookStats(notebook);
  const total = getNotebooksByTrack(trackId).length;

  return (
    <div className="mx-auto max-w-4xl px-4 py-8 sm:px-6 sm:py-12">
      <Link
        href={`/lessons/${trackId}`}
        className="mb-6 inline-flex items-center gap-1.5 text-sm font-medium text-slate-600 transition hover:text-slate-900 dark:text-slate-400 dark:hover:text-white"
      >
        <ArrowRight className="h-4 w-4" />
        العودة إلى {info.nameAr}
      </Link>

      <header className="mb-7">
        <div className="mb-3 flex items-start gap-3">
          <span
            className={cn(
              "flex h-12 w-12 shrink-0 items-center justify-center rounded-xl bg-gradient-to-br text-white shadow-sm",
              info.gradient,
            )}
          >
            <CategoryIcon name={info.icon} className="h-6 w-6" />
          </span>
          <div className="min-w-0">
            <p className="text-xs font-medium text-slate-500 dark:text-slate-400">
              {info.nameAr} · الدفتر {notebook.order} من {total}
            </p>
            <h1 className="text-xl font-extrabold text-slate-900 sm:text-2xl dark:text-white">
              {notebook.titleAr}
            </h1>
            <p className="mt-0.5 text-xs text-slate-500 dark:text-slate-500" dir="ltr">
              {notebook.titleEn}
            </p>
          </div>
        </div>

        <p className="text-sm leading-relaxed text-slate-600 dark:text-slate-400">
          {notebook.summary}
        </p>

        <div className="mt-4 flex flex-wrap gap-2 text-xs">
          <span className="flex items-center gap-1.5 rounded-md bg-slate-100 px-2 py-1 font-medium text-slate-600 dark:bg-slate-800 dark:text-slate-300">
            <Clock className="h-3.5 w-3.5" />
            نحو {notebook.estimatedMinutes} دقيقة
          </span>
          <span className="rounded-md bg-slate-100 px-2 py-1 font-medium text-slate-600 dark:bg-slate-800 dark:text-slate-300">
            {stats.runnable} خلايا كود
          </span>
          <span className="rounded-md bg-slate-100 px-2 py-1 font-medium text-slate-600 dark:bg-slate-800 dark:text-slate-300">
            {stats.exercises} تمارين · {stats.points} نقطة
          </span>
        </div>

        {notebook.prerequisites.length > 0 && (
          <p className="mt-3 flex items-start gap-1.5 text-xs text-slate-500 dark:text-slate-400">
            <Link2 className="mt-0.5 h-3.5 w-3.5 shrink-0" />
            يُفترض أنك أتممت: {notebook.prerequisites.join(" · ")}
          </p>
        )}

        <details className="mt-4 rounded-xl border border-slate-200 bg-white p-4 dark:border-slate-800 dark:bg-slate-900">
          <summary className="flex cursor-pointer list-none items-center gap-2 text-sm font-semibold text-slate-900 dark:text-white">
            <Target className="h-4 w-4 text-brand-600 dark:text-brand-400" />
            أهداف هذا الدفتر
          </summary>
          <ul className="mt-3 space-y-2">
            {notebook.objectives.map((objective) => (
              <li
                key={objective}
                className="flex gap-2 text-sm text-slate-600 dark:text-slate-400"
              >
                <span className="mt-2 h-1.5 w-1.5 shrink-0 rounded-full bg-brand-500" />
                {objective}
              </li>
            ))}
          </ul>
        </details>
      </header>

      <NotebookPlayer
        notebook={notebook}
        nextNotebook={next ? { slug: next.slug, titleAr: next.titleAr } : null}
      />

      {QPREP_SOURCE.tracks.includes(trackId) && (
        <SourceCredit compact className="mt-6 border-t border-slate-200 pt-5 dark:border-slate-800" />
      )}
    </div>
  );
}
