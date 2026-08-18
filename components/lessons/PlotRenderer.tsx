/**
 * components/lessons/PlotRenderer.tsx
 * عرض مخرجات الخلية: النص المطبوع، قيمة آخر تعبير، رسوم matplotlib، والأخطاء بتلميح عربي.
 */
"use client";

import { AlertTriangle, ImageIcon } from "lucide-react";
import type { ExecutionResult } from "@/types/lessons";
import { arabicErrorHint } from "@/lib/usePyodide";
import { cn } from "@/lib/utils";

function OutputBlock({
  children,
  tone = "default",
}: {
  children: React.ReactNode;
  tone?: "default" | "error" | "value";
}) {
  return (
    <pre
      dir="ltr"
      className={cn(
        "code-surface m-0 overflow-x-auto rounded-lg px-3.5 py-2.5 whitespace-pre-wrap",
        tone === "error" &&
          "bg-rose-50 text-rose-800 dark:bg-rose-500/10 dark:text-rose-200",
        tone === "value" &&
          "bg-brand-50 text-brand-800 dark:bg-brand-500/10 dark:text-brand-100",
        tone === "default" &&
          "bg-slate-50 text-slate-800 dark:bg-slate-950/70 dark:text-slate-200",
      )}
    >
      {children}
    </pre>
  );
}

export function PlotRenderer({ images }: { images: string[] }) {
  if (!images.length) return null;

  return (
    <div className="space-y-2">
      {images.map((image, index) => (
        <figure
          key={index}
          className="overflow-hidden rounded-lg border border-slate-200 bg-white p-2 dark:border-slate-800 dark:bg-white"
        >
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            src={`data:image/png;base64,${image}`}
            alt={`رسم بياني ${index + 1} من مخرجات الخلية`}
            className="mx-auto block h-auto max-w-full"
          />
          <figcaption className="mt-1 flex items-center justify-center gap-1 text-[11px] text-slate-500">
            <ImageIcon className="h-3 w-3" />
            رسم matplotlib
          </figcaption>
        </figure>
      ))}
    </div>
  );
}

export function CellOutput({ result }: { result: ExecutionResult }) {
  const hasStdout = result.stdout.trim().length > 0;
  const hasStderr = result.stderr.trim().length > 0;
  const hasValue = Boolean(result.result);
  const hasImages = result.images.length > 0;
  const isEmpty =
    !hasStdout && !hasStderr && !hasValue && !hasImages && !result.error;

  const hint = result.error ? arabicErrorHint(result.error.type) : null;

  return (
    <div className="space-y-2">
      {hasStdout && <OutputBlock>{result.stdout.replace(/\n$/, "")}</OutputBlock>}

      {hasStderr && !result.error && (
        <OutputBlock tone="error">{result.stderr.replace(/\n$/, "")}</OutputBlock>
      )}

      {hasValue && <OutputBlock tone="value">{result.result}</OutputBlock>}

      {hasImages && <PlotRenderer images={result.images} />}

      {result.error && (
        <div className="rounded-lg border border-rose-200 bg-rose-50/70 p-3 dark:border-rose-500/25 dark:bg-rose-500/5">
          <div className="mb-2 flex items-center gap-1.5 text-xs font-bold text-rose-800 dark:text-rose-300">
            <AlertTriangle className="h-3.5 w-3.5" />
            {result.error.type}
          </div>
          <OutputBlock tone="error">
            {result.error.traceback.replace(/\n$/, "")}
          </OutputBlock>
          {hint && (
            <p className="mt-2 rounded-lg bg-amber-50 px-3 py-2 text-xs leading-relaxed text-amber-900 dark:bg-amber-500/10 dark:text-amber-200">
              💡 {hint}
            </p>
          )}
        </div>
      )}

      {isEmpty && (
        <p className="rounded-lg bg-slate-50 px-3.5 py-2.5 text-xs text-slate-500 dark:bg-slate-950/70 dark:text-slate-400">
          تم التنفيذ بنجاح دون مخرجات مطبوعة.
        </p>
      )}
    </div>
  );
}
