/**
 * components/lessons/NotebookPlayer.tsx
 * مشغّل الدفتر: يدير نواة بايثون، حالة كل خلية، التحقق من التمارين، وحفظ التقدّم.
 */
"use client";

import { useCallback, useEffect, useMemo, useRef, useState } from "react";
import Link from "next/link";
import {
  ArrowLeft,
  CircleStop,
  Cpu,
  Loader2,
  PlayCircle,
  RefreshCw,
  Sparkles,
} from "lucide-react";
import type {
  CellStatus,
  ExecutionResult,
  LessonCell,
  Notebook,
} from "@/types/lessons";
import {
  markNotebookCompleted,
  recordCellRun,
  recordExerciseSolved,
} from "@/lib/progress";
import { usePyodide } from "@/lib/usePyodide";
import { cn } from "@/lib/utils";
import { ProgressBar } from "@/components/ProgressBar";
import { NotebookCell, type ExerciseVerdict } from "./NotebookCell";

/** الشيفرة الأصلية لخلية قابلة للتشغيل. */
function initialCode(cell: LessonCell): string {
  if (cell.kind === "code") return cell.code;
  if (cell.kind === "exercise") return cell.template;
  return "";
}

/** يستخرج رسالة عربية مفهومة من فشل التحقق. */
function verdictFromValidation(result: Omit<ExecutionResult, "executionCount">): ExerciseVerdict {
  if (!result.error) {
    return {
      passed: true,
      message: "أحسنت! الحل صحيح وطابق كل الشروط المطلوبة.",
    };
  }

  if (result.error.type === "AssertionError" && result.error.message) {
    return { passed: false, message: result.error.message };
  }

  return {
    passed: false,
    message: `لم يكتمل التحقق بسبب ${result.error.type}: ${
      result.error.message || "راجع الشيفرة أعلاه"
    }`,
  };
}

interface NotebookPlayerProps {
  notebook: Notebook;
  nextNotebook?: { slug: string; titleAr: string } | null;
}

export function NotebookPlayer({ notebook, nextNotebook }: NotebookPlayerProps) {
  const notebookKey = `${notebook.track}/${notebook.slug}`;
  const kernel = usePyodide(notebookKey);

  const [codes, setCodes] = useState<Record<string, string>>(() =>
    Object.fromEntries(notebook.cells.map((cell) => [cell.id, initialCode(cell)])),
  );
  const [results, setResults] = useState<Record<string, ExecutionResult>>({});
  const [statuses, setStatuses] = useState<Record<string, CellStatus>>({});
  const [verdicts, setVerdicts] = useState<Record<string, ExerciseVerdict | null>>({});
  const [runningAll, setRunningAll] = useState(false);
  const executionCounter = useRef(0);

  const runnableCells = useMemo(
    () => notebook.cells.filter((cell) => cell.kind === "code"),
    [notebook.cells],
  );
  const exerciseCells = useMemo(
    () => notebook.cells.filter((cell) => cell.kind === "exercise"),
    [notebook.cells],
  );

  const solvedCount = exerciseCells.filter((cell) => verdicts[cell.id]?.passed).length;
  const ranCount = runnableCells.filter((cell) => statuses[cell.id] === "done").length;
  const totalSteps = runnableCells.length + exerciseCells.length;
  const doneSteps = ranCount + solvedCount;
  const completion = totalSteps ? Math.round((doneSteps / totalSteps) * 100) : 0;
  const finished = totalSteps > 0 && doneSteps === totalSteps;

  const busy = kernel.status === "loading" || runningAll;

  /** ينفّذ شيفرة خلية ويحدّث حالتها ومخرجاتها. */
  const executeCell = useCallback(
    async (cell: LessonCell, source: string) => {
      setStatuses((previous) => ({ ...previous, [cell.id]: "running" }));

      try {
        const payload = await kernel.run(source);
        executionCounter.current += 1;
        const result: ExecutionResult = {
          ...payload,
          executionCount: executionCounter.current,
        };

        setResults((previous) => ({ ...previous, [cell.id]: result }));
        setStatuses((previous) => ({
          ...previous,
          [cell.id]: result.error ? "error" : "done",
        }));

        if (!result.error && cell.kind === "code") {
          recordCellRun(notebook.track, notebook.slug, cell.id);
        }

        return result;
      } catch (error) {
        const message = error instanceof Error ? error.message : String(error);
        const failure: ExecutionResult = {
          stdout: "",
          stderr: "",
          result: null,
          images: [],
          error: { type: "KernelError", message, traceback: message },
          durationMs: 0,
          executionCount: executionCounter.current,
        };
        setResults((previous) => ({ ...previous, [cell.id]: failure }));
        setStatuses((previous) => ({ ...previous, [cell.id]: "error" }));
        return failure;
      }
    },
    [kernel, notebook.slug, notebook.track],
  );

  const handleRun = useCallback(
    (cell: LessonCell) => {
      void executeCell(cell, codes[cell.id] ?? "");
    },
    [codes, executeCell],
  );

  /** يشغّل حل المتدرّب ثم شيفرة التحقق في النطاق نفسه. */
  const handleCheck = useCallback(
    async (cell: LessonCell) => {
      if (cell.kind !== "exercise") return;

      const runResult = await executeCell(cell, codes[cell.id] ?? "");
      if (runResult.error) {
        setVerdicts((previous) => ({
          ...previous,
          [cell.id]: {
            passed: false,
            message: `توقّف التنفيذ عند ${runResult.error?.type}. صحّح الخطأ الظاهر تحت الخلية ثم أعد المحاولة.`,
          },
        }));
        return;
      }

      setStatuses((previous) => ({ ...previous, [cell.id]: "running" }));
      try {
        const validation = await kernel.run(cell.validator);
        const verdict = verdictFromValidation(validation);
        setVerdicts((previous) => ({ ...previous, [cell.id]: verdict }));
        setStatuses((previous) => ({
          ...previous,
          [cell.id]: verdict.passed ? "done" : "error",
        }));

        if (verdict.passed) {
          recordExerciseSolved(notebook.track, notebook.slug, cell.id, cell.points);
        }
      } catch (error) {
        const message = error instanceof Error ? error.message : String(error);
        setVerdicts((previous) => ({
          ...previous,
          [cell.id]: { passed: false, message },
        }));
        setStatuses((previous) => ({ ...previous, [cell.id]: "error" }));
      }
    },
    [codes, executeCell, kernel, notebook.slug, notebook.track],
  );

  /** يشغّل كل خلايا الشيفرة بالترتيب. */
  const handleRunAll = useCallback(async () => {
    setRunningAll(true);
    try {
      for (const cell of notebook.cells) {
        if (cell.kind !== "code") continue;
        // eslint-disable-next-line no-await-in-loop -- الترتيب مقصود: الحالة تتراكم بين الخلايا
        const result = await executeCell(cell, codes[cell.id] ?? "");
        if (result.error) break;
      }
    } finally {
      setRunningAll(false);
    }
  }, [codes, executeCell, notebook.cells]);

  /** يمسح متغيّرات الدفتر ومخرجات الخلايا. */
  const handleRestart = useCallback(async () => {
    await kernel.reset().catch(() => undefined);
    executionCounter.current = 0;
    setResults({});
    setStatuses({});
    setVerdicts({});
  }, [kernel]);

  const handleCodeChange = useCallback((cellId: string, value: string) => {
    setCodes((previous) => ({ ...previous, [cellId]: value }));
  }, []);

  const handleResetCell = useCallback((cell: LessonCell) => {
    setCodes((previous) => ({ ...previous, [cell.id]: initialCode(cell) }));
  }, []);

  // نسجّل اكتمال الدفتر بعد التصيير لا أثناءه
  useEffect(() => {
    if (finished) markNotebookCompleted(notebook.track, notebook.slug);
  }, [finished, notebook.slug, notebook.track]);

  const kernelLabel =
    kernel.status === "ready" || kernel.status === "running"
      ? "النواة جاهزة"
      : kernel.status === "loading"
        ? "جارٍ تحميل بايثون…"
        : kernel.status === "error"
          ? "تعذّر تحميل النواة"
          : "النواة غير محمّلة";

  return (
    <div className="space-y-2">
      {/* شريط النواة والتقدّم */}
      <section className="sticky top-16 z-30 rounded-xl border border-slate-200 bg-white/95 p-3 backdrop-blur dark:border-slate-800 dark:bg-slate-900/95">
        <div className="mb-2.5 flex flex-wrap items-center gap-2">
          <span
            className={cn(
              "inline-flex items-center gap-1.5 rounded-lg px-2.5 py-1.5 text-xs font-semibold",
              kernel.status === "ready" || kernel.status === "running"
                ? "bg-brand-100 text-brand-800 dark:bg-brand-500/15 dark:text-brand-200"
                : kernel.status === "error"
                  ? "bg-rose-100 text-rose-700 dark:bg-rose-500/15 dark:text-rose-300"
                  : "bg-slate-100 text-slate-600 dark:bg-slate-800 dark:text-slate-300",
            )}
          >
            {kernel.status === "loading" ? (
              <Loader2 className="h-3.5 w-3.5 animate-spin" />
            ) : (
              <Cpu className="h-3.5 w-3.5" />
            )}
            {kernelLabel}
          </span>

          {kernel.status === "idle" && (
            <button
              type="button"
              onClick={kernel.preload}
              className="inline-flex items-center gap-1.5 rounded-lg bg-brand-700 px-3 py-1.5 text-xs font-semibold text-white transition hover:bg-brand-600"
            >
              <PlayCircle className="h-3.5 w-3.5" />
              تشغيل النواة
            </button>
          )}

          <div className="ms-auto flex items-center gap-1.5">
            <button
              type="button"
              onClick={handleRunAll}
              disabled={busy}
              className="inline-flex items-center gap-1.5 rounded-lg border border-slate-200 px-3 py-1.5 text-xs font-semibold text-slate-700 transition hover:bg-slate-50 disabled:opacity-50 dark:border-slate-700 dark:text-slate-200 dark:hover:bg-slate-800"
            >
              {runningAll ? (
                <Loader2 className="h-3.5 w-3.5 animate-spin" />
              ) : (
                <PlayCircle className="h-3.5 w-3.5" />
              )}
              تشغيل الكل
            </button>
            <button
              type="button"
              onClick={handleRestart}
              title="مسح المتغيّرات والمخرجات"
              className="inline-flex items-center gap-1.5 rounded-lg border border-slate-200 px-3 py-1.5 text-xs font-semibold text-slate-700 transition hover:bg-slate-50 dark:border-slate-700 dark:text-slate-200 dark:hover:bg-slate-800"
            >
              <RefreshCw className="h-3.5 w-3.5" />
              إعادة الضبط
            </button>
            <button
              type="button"
              onClick={kernel.interrupt}
              title="إيقاف تنفيذ معلّق (يعيد تشغيل النواة)"
              className="inline-flex items-center gap-1.5 rounded-lg border border-rose-200 px-3 py-1.5 text-xs font-semibold text-rose-700 transition hover:bg-rose-50 dark:border-rose-500/40 dark:text-rose-300 dark:hover:bg-rose-500/10"
            >
              <CircleStop className="h-3.5 w-3.5" />
              إيقاف
            </button>
          </div>
        </div>

        <ProgressBar
          value={completion}
          size="sm"
          label={`${doneSteps} من ${totalSteps} خطوة`}
          showValue
          barClassName="bg-gradient-to-l from-brand-700 to-brand-400"
        />
      </section>

      {/* الخلايا */}
      <div className="space-y-2">
        {notebook.cells.map((cell) => (
          <NotebookCell
            key={cell.id}
            cell={cell}
            status={statuses[cell.id] ?? "idle"}
            executionCount={results[cell.id]?.executionCount ?? null}
            result={results[cell.id]}
            code={codes[cell.id] ?? ""}
            onCodeChange={(value) => handleCodeChange(cell.id, value)}
            onRun={() => handleRun(cell)}
            onReset={() => handleResetCell(cell)}
            onCheck={() => void handleCheck(cell)}
            verdict={verdicts[cell.id] ?? null}
            kernelBusy={busy}
          />
        ))}
      </div>

      {/* خاتمة الدفتر */}
      <section
        className={cn(
          "rounded-xl border p-6 text-center transition",
          finished
            ? "border-brand-300 bg-brand-50 dark:border-brand-500/40 dark:bg-brand-500/10"
            : "border-slate-200 bg-white dark:border-slate-800 dark:bg-slate-900",
        )}
      >
        {finished ? (
          <>
            <Sparkles className="mx-auto mb-2 h-7 w-7 text-brand-700 dark:text-brand-300" />
            <h2 className="text-lg font-bold text-brand-900 dark:text-brand-100">
              أتممت هذا الدفتر
            </h2>
            <p className="mt-1 text-sm text-brand-800/80 dark:text-brand-200/80">
              شغّلت كل الخلايا وحللت {solvedCount} من {exerciseCells.length} تمارين.
            </p>
          </>
        ) : (
          <p className="text-sm text-slate-600 dark:text-slate-400">
            أكملت {doneSteps} من {totalSteps} خطوة في هذا الدفتر. شغّل الخلايا المتبقّية
            وحلّ التمارين لإتمامه.
          </p>
        )}

        <div className="mt-4 flex flex-col justify-center gap-2 sm:flex-row">
          <Link
            href={`/lessons/${notebook.track}`}
            className="inline-flex items-center justify-center gap-2 rounded-xl border border-slate-200 px-5 py-2.5 text-sm font-semibold text-slate-700 transition hover:bg-slate-50 dark:border-slate-700 dark:text-slate-200 dark:hover:bg-slate-800"
          >
            كل دفاتر المسار
          </Link>
          {nextNotebook && (
            <Link
              href={`/lessons/${notebook.track}/${nextNotebook.slug}`}
              className="inline-flex items-center justify-center gap-2 rounded-xl bg-brand-700 px-5 py-2.5 text-sm font-semibold text-white transition hover:bg-brand-600"
            >
              الدفتر التالي: {nextNotebook.titleAr}
              <ArrowLeft className="h-4 w-4" />
            </Link>
          )}
        </div>
      </section>
    </div>
  );
}
