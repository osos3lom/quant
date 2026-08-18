/**
 * components/lessons/SourceCredit.tsx
 * بطاقة نسبة المادة العلمية إلى مصدرها ومؤلّفيها.
 */
import { BookMarked, ExternalLink } from "lucide-react";
import { QPREP_SOURCE } from "@/data/lessons/attribution";
import { cn } from "@/lib/utils";

export function SourceCredit({
  className,
  compact = false,
}: {
  className?: string;
  compact?: boolean;
}) {
  const source = QPREP_SOURCE;

  if (compact) {
    return (
      <p className={cn("text-xs leading-relaxed text-slate-500 dark:text-slate-400", className)}>
        المادة العلمية مبنية على{" "}
        <span className="font-semibold text-slate-700 dark:text-slate-300">
          {source.titleAr}
        </span>{" "}
        ({source.publisher})، إعداد: {source.authors.join(" · ")}.
      </p>
    );
  }

  return (
    <section
      className={cn(
        "rounded-2xl border border-slate-200 bg-white p-5 dark:border-slate-800 dark:bg-slate-900",
        className,
      )}
    >
      <h2 className="mb-3 flex items-center gap-2 text-sm font-bold text-slate-900 dark:text-white">
        <BookMarked className="h-4 w-4 text-brand-600 dark:text-brand-400" />
        المصدر العلمي والمؤلّفون
      </h2>

      <dl className="space-y-2 text-sm">
        <div className="flex flex-wrap gap-x-2">
          <dt className="text-slate-500 dark:text-slate-400">المادة:</dt>
          <dd className="font-medium text-slate-800 dark:text-slate-200">
            {source.titleAr} — {source.titleEn}
          </dd>
        </div>
        <div className="flex flex-wrap gap-x-2">
          <dt className="text-slate-500 dark:text-slate-400">الناشر:</dt>
          <dd className="font-medium text-slate-800 dark:text-slate-200">
            {source.publisher} · {source.series} · {source.year}
          </dd>
        </div>
        <div className="flex flex-wrap gap-x-2">
          <dt className="text-slate-500 dark:text-slate-400">إعداد:</dt>
          <dd className="font-medium text-slate-800 dark:text-slate-200">
            {source.authors.join(" · ")}
          </dd>
        </div>
      </dl>

      <a
        href={source.url}
        target="_blank"
        rel="noopener noreferrer"
        className="mt-3 inline-flex items-center gap-1.5 text-sm font-semibold text-brand-600 hover:underline dark:text-brand-400"
        dir="ltr"
      >
        {source.url}
        <ExternalLink className="h-3.5 w-3.5" />
      </a>

      <p className="mt-3 border-t border-slate-100 pt-3 text-xs leading-relaxed text-slate-500 dark:border-slate-800 dark:text-slate-400">
        هذه المنصة إعادة تقديم تفاعلية للمادة، وجميع الحقوق العلمية محفوظة لمؤلّفي المصدر
        أعلاه.
      </p>
    </section>
  );
}
