/**
 * components/lessons/NotebookCell.tsx
 * خلية دفتر بأسلوب Colab: زر تشغيل دائري، مخرجات قابلة للطي، خلايا نصية قابلة للطي.
 */
"use client";

import { useState } from "react";
import {
  BadgeCheck,
  CheckCircle2,
  ChevronDown,
  ChevronRight,
  CircleAlert,
  Eye,
  Info,
  Lightbulb,
  Loader2,
  Play,
  RotateCcw,
  TriangleAlert,
  XCircle,
} from "lucide-react";
import type { CellStatus, ExecutionResult, LessonCell } from "@/types/lessons";
import { cn } from "@/lib/utils";
import { CodeEditor } from "./CodeEditor";
import { Markdown } from "./Markdown";
import { CellOutput } from "./PlotRenderer";

export interface ExerciseVerdict {
  passed: boolean;
  message: string;
}

interface NotebookCellProps {
  cell: LessonCell;
  status: CellStatus;
  executionCount: number | null;
  result?: ExecutionResult;
  code: string;
  onCodeChange: (value: string) => void;
  onRun: () => void;
  onReset: () => void;
  onCheck?: () => void;
  verdict?: ExerciseVerdict | null;
  kernelBusy: boolean;
}

/* ------------------------------------------------------------------ */
/* زر التشغيل الدائري — مثل Colab                                      */
/* ------------------------------------------------------------------ */

function CircularRunButton({
  onClick,
  busy,
  disabled,
  status,
  executionCount,
}: {
  onClick: () => void;
  busy: boolean;
  disabled?: boolean;
  status: CellStatus;
  executionCount: number | null;
}) {
  return (
    <div className="flex flex-col items-center gap-1">
      <button
        type="button"
        onClick={onClick}
        disabled={disabled || busy}
        title="تشغيل الخلية (Ctrl + Enter)"
        className={cn(
          "flex h-8 w-8 items-center justify-center rounded-full border-2 transition",
          "hover:scale-110 active:scale-95",
          "disabled:cursor-not-allowed disabled:opacity-40 disabled:hover:scale-100",
          status === "running"
            ? "border-brand-400 bg-brand-50 dark:border-brand-500 dark:bg-brand-500/10"
            : status === "error"
              ? "border-rose-400 bg-rose-50 dark:border-rose-500 dark:bg-rose-500/10"
              : status === "done"
                ? "border-brand-300 bg-brand-50 dark:border-brand-500/40 dark:bg-brand-500/10"
                : "border-slate-300 bg-white hover:border-brand-400 hover:bg-brand-50 dark:border-slate-600 dark:bg-slate-900 dark:hover:border-brand-500 dark:hover:bg-brand-500/10",
        )}
      >
        {busy ? (
          <Loader2 className="h-4 w-4 animate-spin text-brand-600 dark:text-brand-400" />
        ) : (
          <Play className="h-3.5 w-3.5 fill-current text-brand-700 dark:text-brand-400" />
        )}
      </button>
      <span
        dir="ltr"
        className={cn(
          "select-none font-mono text-[10px] tabular-nums leading-none",
          status === "running" && "text-brand-600 dark:text-brand-400",
          status === "error" && "text-rose-500 dark:text-rose-400",
          status === "done" && "text-brand-600 dark:text-brand-300",
          status === "idle" && "text-slate-400 dark:text-slate-500",
        )}
      >
        {status === "running"
          ? "[*]"
          : status === "error"
            ? "[!]"
            : executionCount != null
              ? `[${executionCount}]`
              : "[ ]"}
      </span>
    </div>
  );
}

/* ------------------------------------------------------------------ */
/* قسم مخرجات قابل للطي                                                */
/* ------------------------------------------------------------------ */

function CollapsibleOutput({ result }: { result: ExecutionResult }) {
  const [open, setOpen] = useState(true);

  const hasContent =
    result.stdout.trim().length > 0 ||
    result.stderr.trim().length > 0 ||
    Boolean(result.result) ||
    result.images.length > 0 ||
    Boolean(result.error);

  if (!hasContent) {
    return (
      <div className="mt-2 border-t border-slate-100 pt-2 dark:border-slate-800">
        <p className="text-[11px] text-slate-400 dark:text-slate-500">
          تم التنفيذ بنجاح · {result.durationMs} م.ث
        </p>
      </div>
    );
  }

  return (
    <div className="mt-2 border-t border-slate-100 dark:border-slate-800">
      <button
        type="button"
        onClick={() => setOpen((v) => !v)}
        className="flex w-full items-center gap-1.5 py-2 text-[11px] font-medium text-slate-500 transition hover:text-slate-700 dark:text-slate-400 dark:hover:text-slate-200"
      >
        {open ? (
          <ChevronDown className="h-3 w-3" />
        ) : (
          <ChevronRight className="h-3 w-3" />
        )}
        {open ? "إخفاء المخرجات" : "إظهار المخرجات"}
        <span className="tabular-nums">· {result.durationMs} م.ث</span>
      </button>
      {open && <CellOutput result={result} />}
    </div>
  );
}

/* ------------------------------------------------------------------ */
/* خلية نصية قابلة للطي                                                */
/* ------------------------------------------------------------------ */

const CALLOUT_STYLES = {
  note: {
    box: "border-brand-200 bg-brand-50/70 dark:border-brand-500/25 dark:bg-brand-500/5",
    title: "text-brand-800 dark:text-brand-200",
    icon: Info,
    defaultTitle: "ملاحظة",
  },
  tip: {
    box: "border-amber-200 bg-amber-50/70 dark:border-amber-500/25 dark:bg-amber-500/5",
    title: "text-amber-900 dark:text-amber-200",
    icon: Lightbulb,
    defaultTitle: "تلميح",
  },
  warning: {
    box: "border-rose-200 bg-rose-50/70 dark:border-rose-500/25 dark:bg-rose-500/5",
    title: "text-rose-900 dark:text-rose-200",
    icon: TriangleAlert,
    defaultTitle: "انتبه",
  },
} as const;

/* ------------------------------------------------------------------ */
/* الخلية الرئيسية                                                      */
/* ------------------------------------------------------------------ */

export function NotebookCell({
  cell,
  status,
  executionCount,
  result,
  code,
  onCodeChange,
  onRun,
  onReset,
  onCheck,
  verdict,
  kernelBusy,
}: NotebookCellProps) {
  const [hintsOpen, setHintsOpen] = useState(false);
  const [solutionOpen, setSolutionOpen] = useState(false);
  const [mdCollapsed, setMdCollapsed] = useState(false);

  /* --------------------------- خلية نصية --------------------------- */
  if (cell.kind === "markdown") {
    if (cell.callout) {
      const style = CALLOUT_STYLES[cell.callout];
      const Icon = style.icon;
      return (
        <section className={cn("rounded-xl border p-4", style.box)}>
          <h3 className={cn("mb-2 flex items-center gap-2 text-sm font-bold", style.title)}>
            <Icon className="h-4 w-4" />
            {cell.calloutTitle ?? style.defaultTitle}
          </h3>
          <Markdown content={cell.content} />
        </section>
      );
    }

    return (
      <section className="group relative rounded-xl border border-transparent px-1 transition hover:border-slate-200 hover:bg-slate-50/50 dark:hover:border-slate-800 dark:hover:bg-slate-900/50">
        <button
          type="button"
          onClick={() => setMdCollapsed((v) => !v)}
          className="absolute top-3 -right-1 flex h-5 w-5 items-center justify-center rounded opacity-0 transition group-hover:opacity-100 hover:bg-slate-200 dark:hover:bg-slate-700"
          title={mdCollapsed ? "توسيع" : "طي"}
        >
          {mdCollapsed ? (
            <ChevronRight className="h-3.5 w-3.5 text-slate-500" />
          ) : (
            <ChevronDown className="h-3.5 w-3.5 text-slate-500" />
          )}
        </button>
        {mdCollapsed ? (
          <p
            onClick={() => setMdCollapsed(false)}
            className="cursor-pointer truncate py-2 text-sm text-slate-500 dark:text-slate-400"
          >
            {cell.content.replace(/[#*_`~\[\]]/g, "").slice(0, 80)}…
          </p>
        ) : (
          <div className="py-1">
            <Markdown content={cell.content} />
          </div>
        )}
      </section>
    );
  }

  /* -------------------------- خلية شيفرة --------------------------- */
  if (cell.kind === "code") {
    return (
      <section
        className={cn(
          "group relative flex gap-3 rounded-xl border bg-white p-3 transition dark:bg-slate-900",
          status === "error"
            ? "border-rose-300 dark:border-rose-500/40"
            : status === "done"
              ? "border-brand-200 dark:border-brand-500/30"
              : "border-slate-200 hover:border-slate-300 dark:border-slate-800 dark:hover:border-slate-700",
        )}
      >
        {/* عمود التشغيل الأيسر */}
        <div className="flex shrink-0 flex-col items-center pt-1">
          <CircularRunButton
            onClick={onRun}
            busy={status === "running"}
            disabled={kernelBusy}
            status={status}
            executionCount={executionCount}
          />
        </div>

        {/* محتوى الخلية */}
        <div className="min-w-0 flex-1">
          {cell.caption && (
            <p className="mb-2 text-xs font-medium text-slate-500 dark:text-slate-400">
              {cell.caption}
            </p>
          )}

          <CodeEditor
            value={code}
            onChange={onCodeChange}
            onRun={onRun}
            readOnly={cell.readOnly}
            minLines={2}
          />

          {result && <CollapsibleOutput result={result} />}

          {code !== cell.code && (
            <button
              type="button"
              onClick={onReset}
              className="mt-2 inline-flex items-center gap-1 text-[11px] font-medium text-slate-500 transition hover:text-slate-800 dark:text-slate-400 dark:hover:text-white"
            >
              <RotateCcw className="h-3 w-3" />
              استعادة الشيفرة الأصلية
            </button>
          )}
        </div>
      </section>
    );
  }

  /* -------------------------- خلية تمرين --------------------------- */
  return (
    <section
      className={cn(
        "overflow-hidden rounded-xl border-2 bg-white transition dark:bg-slate-900",
        verdict?.passed
          ? "border-brand-500 dark:border-brand-500"
          : verdict && !verdict.passed
            ? "border-rose-400 dark:border-rose-500/60"
            : "border-brand-200 dark:border-brand-500/30",
      )}
    >
      <header className="flex items-center gap-2 border-b border-slate-100 bg-brand-50/60 px-4 py-2 dark:border-slate-800 dark:bg-brand-500/5">
        <BadgeCheck className="h-4 w-4 text-brand-700 dark:text-brand-400" />
        <h3 className="text-sm font-bold text-brand-800 dark:text-brand-200">
          تمرين تفاعلي
        </h3>
        <span className="ms-auto rounded-md bg-brand-100 px-2 py-0.5 text-[11px] font-semibold text-brand-800 dark:bg-brand-500/15 dark:text-brand-200">
          {cell.points} نقطة
        </span>
      </header>

      <div className="p-3 sm:p-4">
        <Markdown content={cell.prompt} className="mb-3" />

        <div className="flex gap-3">
          {/* عمود التشغيل */}
          <div className="flex shrink-0 flex-col items-center pt-1">
            <CircularRunButton
              onClick={onRun}
              busy={status === "running"}
              disabled={kernelBusy}
              status={status}
              executionCount={executionCount}
            />
          </div>

          <div className="min-w-0 flex-1">
            <CodeEditor value={code} onChange={onCodeChange} onRun={onRun} minLines={4} />

            <div className="mt-2 flex flex-wrap items-center gap-2">
              <button
                type="button"
                onClick={onCheck}
                disabled={kernelBusy || status === "running"}
                className={cn(
                  "inline-flex items-center gap-1.5 rounded-lg px-4 py-2 text-xs font-semibold transition",
                  "bg-brand-600 text-white hover:bg-brand-700",
                  "disabled:cursor-not-allowed disabled:bg-slate-200 disabled:text-slate-400",
                  "dark:disabled:bg-slate-800 dark:disabled:text-slate-600",
                )}
              >
                <CheckCircle2 className="h-3.5 w-3.5" />
                تحقّق من الحل
              </button>

              {cell.hints.length > 0 && (
                <button
                  type="button"
                  onClick={() => setHintsOpen((v) => !v)}
                  aria-expanded={hintsOpen}
                  className="inline-flex items-center gap-1.5 rounded-lg px-3 py-2 text-xs font-medium text-amber-700 transition hover:bg-amber-50 dark:text-amber-400 dark:hover:bg-amber-500/10"
                >
                  <Lightbulb className="h-3.5 w-3.5" />
                  {hintsOpen ? "إخفاء التلميحات" : `تلميحات (${cell.hints.length})`}
                  <ChevronDown className={cn("h-3.5 w-3.5 transition", hintsOpen && "rotate-180")} />
                </button>
              )}

              <button
                type="button"
                onClick={() => setSolutionOpen((v) => !v)}
                aria-expanded={solutionOpen}
                className="inline-flex items-center gap-1.5 rounded-lg px-3 py-2 text-xs font-medium text-slate-500 transition hover:bg-slate-100 dark:text-slate-400 dark:hover:bg-slate-800"
              >
                <Eye className="h-3.5 w-3.5" />
                {solutionOpen ? "إخفاء الحل" : "إظهار الحل"}
              </button>

              <button
                type="button"
                onClick={onReset}
                className="inline-flex items-center gap-1 text-[11px] font-medium text-slate-500 transition hover:text-slate-800 dark:text-slate-400 dark:hover:text-white"
              >
                <RotateCcw className="h-3 w-3" />
                إعادة القالب
              </button>
            </div>

            {hintsOpen && (
              <ol className="mt-3 space-y-2 rounded-lg border border-amber-200 bg-amber-50 p-3 dark:border-amber-500/25 dark:bg-amber-500/5">
                {cell.hints.map((hint, index) => (
                  <li key={index} className="flex gap-2 text-xs leading-relaxed text-amber-900 dark:text-amber-200">
                    <span className="font-bold">{index + 1}.</span>
                    <Markdown content={hint} className="text-xs" />
                  </li>
                ))}
              </ol>
            )}

            {solutionOpen && (
              <div className="mt-3">
                <p className="mb-1.5 text-[11px] font-semibold text-slate-500 dark:text-slate-400">
                  الحل النموذجي
                </p>
                <CodeEditor value={cell.solution} onChange={() => undefined} readOnly minLines={2} />
                <button
                  type="button"
                  onClick={() => onCodeChange(cell.solution)}
                  className="mt-2 text-[11px] font-medium text-brand-600 hover:underline dark:text-brand-400"
                >
                  نسخ الحل إلى المحرّر
                </button>
              </div>
            )}

            {result && <CollapsibleOutput result={result} />}

            {verdict && (
              <div
                className={cn(
                  "mt-3 flex items-start gap-2 rounded-lg border p-3 text-sm",
                  verdict.passed
                    ? "border-brand-300 bg-brand-50 text-brand-900 dark:border-brand-500/40 dark:bg-brand-500/10 dark:text-brand-100"
                    : "border-rose-300 bg-rose-50 text-rose-900 dark:border-rose-500/40 dark:bg-rose-500/10 dark:text-rose-100",
                )}
              >
                {verdict.passed ? (
                  <CheckCircle2 className="mt-0.5 h-4 w-4 shrink-0" />
                ) : (
                  <XCircle className="mt-0.5 h-4 w-4 shrink-0" />
                )}
                <span className="leading-relaxed">{verdict.message}</span>
              </div>
            )}

            {!verdict && status === "error" && (
              <p className="mt-2 flex items-center gap-1.5 text-xs text-rose-600 dark:text-rose-400">
                <CircleAlert className="h-3.5 w-3.5" />
                صحّح الخطأ أعلاه ثم أعد المحاولة.
              </p>
            )}
          </div>
        </div>
      </div>
    </section>
  );
}
