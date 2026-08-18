/**
 * components/QuestionRenderer.tsx
 * عرض سؤال واحد (اختيار من متعدد أو تعبئة فراغات) مع التغذية الراجعة الفورية والحل خطوة بخطوة.
 */
"use client";

import { useEffect, useState } from "react";
import {
  ArrowLeft,
  CheckCircle2,
  ChevronDown,
  Lightbulb,
  Trophy,
  XCircle,
} from "lucide-react";
import type { AnswerState, Question } from "@/types/quantum";
import { cn } from "@/lib/utils";
import { KaTeXMath, MathText } from "./KaTeXMath";

const CHOICE_LABELS = ["أ", "ب", "ج", "د", "هـ", "و"];

interface QuestionRendererProps {
  question: Question;
  answer: AnswerState;
  /** تحديث الإجابة قبل التحقق */
  onChange: (partial: Partial<AnswerState>) => void;
  /** التحقق من الإجابة الحالية */
  onCheck: () => void;
  /** الانتقال للسؤال التالي أو إنهاء التمرين */
  onNext: () => void;
  isLast: boolean;
}

export function QuestionRenderer({
  question,
  answer,
  onChange,
  onCheck,
  onNext,
  isLast,
}: QuestionRendererProps) {
  const [hintOpen, setHintOpen] = useState(false);

  // نطوي التلميح تلقائياً عند الانتقال لسؤال جديد
  useEffect(() => {
    setHintOpen(false);
  }, [question.id]);

  const checked = answer.checked;
  const canCheck =
    question.type === "multiple-choice"
      ? Boolean(answer.choiceId)
      : question.blanks.every((blank) => (answer.values?.[blank.id] ?? "").trim().length > 0);

  return (
    <div className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm sm:p-7 dark:border-slate-800 dark:bg-slate-900">
      {/* نص السؤال */}
      <MathText
        as="p"
        text={question.prompt}
        className="text-base font-semibold text-slate-900 sm:text-lg dark:text-white"
      />

      {question.math && (
        <div className="rounded-xl bg-slate-50 dark:bg-slate-800/50">
          <KaTeXMath math={question.math} display />
        </div>
      )}

      {/* التلميح القابل للطي */}
      {question.hint && (
        <div className="mt-4">
          <button
            type="button"
            onClick={() => setHintOpen((value) => !value)}
            aria-expanded={hintOpen}
            className="inline-flex items-center gap-1.5 rounded-lg px-2.5 py-1.5 text-sm font-medium text-amber-700 transition hover:bg-amber-50 dark:text-amber-400 dark:hover:bg-amber-500/10"
          >
            <Lightbulb className="h-4 w-4" />
            {hintOpen ? "إخفاء التلميح" : "عرض تلميح"}
            <ChevronDown
              className={cn("h-4 w-4 transition-transform", hintOpen && "rotate-180")}
            />
          </button>
          {hintOpen && (
            <div className="mt-2 rounded-xl border border-amber-200 bg-amber-50 px-4 py-3 text-sm text-amber-900 dark:border-amber-500/30 dark:bg-amber-500/10 dark:text-amber-200">
              <MathText text={question.hint} />
            </div>
          )}
        </div>
      )}

      {/* الإجابات */}
      <div className="mt-5">
        {question.type === "multiple-choice" ? (
          <ul className="space-y-2.5">
            {question.choices.map((choice, index) => {
              const selected = answer.choiceId === choice.id;
              const isCorrect = choice.id === question.correctId;
              const showAsCorrect = checked && isCorrect;
              const showAsWrong = checked && selected && !isCorrect;

              return (
                <li key={choice.id}>
                  <button
                    type="button"
                    disabled={checked}
                    onClick={() => onChange({ choiceId: choice.id })}
                    className={cn(
                      "flex w-full items-start gap-3 rounded-xl border p-3.5 text-start transition",
                      "disabled:cursor-default",
                      !checked &&
                        (selected
                          ? "border-sky-500 bg-sky-50 ring-2 ring-sky-500/20 dark:border-sky-400 dark:bg-sky-500/10"
                          : "border-slate-200 hover:border-slate-300 hover:bg-slate-50 dark:border-slate-700 dark:hover:border-slate-600 dark:hover:bg-slate-800/60"),
                      showAsCorrect &&
                        "border-emerald-500 bg-emerald-50 dark:border-emerald-500 dark:bg-emerald-500/10",
                      showAsWrong &&
                        "border-rose-500 bg-rose-50 dark:border-rose-500 dark:bg-rose-500/10",
                      checked &&
                        !showAsCorrect &&
                        !showAsWrong &&
                        "border-slate-200 opacity-60 dark:border-slate-700",
                    )}
                  >
                    <span
                      className={cn(
                        "flex h-7 w-7 shrink-0 items-center justify-center rounded-lg text-sm font-bold",
                        showAsCorrect
                          ? "bg-emerald-500 text-white"
                          : showAsWrong
                            ? "bg-rose-500 text-white"
                            : selected
                              ? "bg-sky-500 text-white"
                              : "bg-slate-100 text-slate-600 dark:bg-slate-800 dark:text-slate-400",
                      )}
                    >
                      {CHOICE_LABELS[index] ?? index + 1}
                    </span>
                    <MathText
                      text={choice.text}
                      className="flex-1 text-sm text-slate-800 sm:text-base dark:text-slate-200"
                    />
                    {showAsCorrect && (
                      <CheckCircle2 className="h-5 w-5 shrink-0 text-emerald-600 dark:text-emerald-400" />
                    )}
                    {showAsWrong && (
                      <XCircle className="h-5 w-5 shrink-0 text-rose-600 dark:text-rose-400" />
                    )}
                  </button>
                </li>
              );
            })}
          </ul>
        ) : (
          <div className="grid gap-3 sm:grid-cols-2">
            {question.blanks.map((blank) => {
              const value = answer.values?.[blank.id] ?? "";
              const result = answer.blankResults?.[blank.id];

              return (
                <div
                  key={blank.id}
                  className={cn(
                    "rounded-xl border p-3.5 transition",
                    checked && result === true
                      ? "border-emerald-500 bg-emerald-50 dark:border-emerald-500 dark:bg-emerald-500/10"
                      : checked && result === false
                        ? "border-rose-500 bg-rose-50 dark:border-rose-500 dark:bg-rose-500/10"
                        : "border-slate-200 dark:border-slate-700",
                  )}
                >
                  <div className="mb-2 flex items-center gap-2">
                    <span className="text-xs font-medium text-slate-500 dark:text-slate-400">
                      {blank.label}
                    </span>
                    {blank.labelMath && (
                      <KaTeXMath math={blank.labelMath} className="text-sm" />
                    )}
                  </div>
                  <input
                    type="text"
                    dir="ltr"
                    inputMode="text"
                    autoComplete="off"
                    spellCheck={false}
                    disabled={checked}
                    value={value}
                    placeholder={blank.placeholder}
                    aria-label={blank.label}
                    onChange={(event) =>
                      onChange({
                        values: { ...(answer.values ?? {}), [blank.id]: event.target.value },
                      })
                    }
                    onKeyDown={(event) => {
                      if (event.key === "Enter" && canCheck && !checked) onCheck();
                    }}
                    className={cn(
                      "w-full rounded-lg border bg-white px-3 py-2.5 text-start font-mono text-sm outline-none transition",
                      "border-slate-200 focus:border-sky-400 focus:ring-4 focus:ring-sky-500/10",
                      "disabled:bg-slate-50 disabled:text-slate-500",
                      "dark:border-slate-700 dark:bg-slate-950 dark:text-white dark:disabled:bg-slate-900",
                    )}
                  />
                  {checked && result === false && (
                    <p className="mt-2 flex flex-wrap items-center gap-1.5 text-xs text-rose-700 dark:text-rose-300">
                      الإجابة الصحيحة:
                      <KaTeXMath math={blank.display} />
                    </p>
                  )}
                </div>
              );
            })}
          </div>
        )}
      </div>

      {/* التغذية الراجعة */}
      {checked && (
        <div
          className={cn(
            "mt-5 rounded-xl border p-4 sm:p-5",
            answer.correct
              ? "border-emerald-200 bg-emerald-50/60 dark:border-emerald-500/30 dark:bg-emerald-500/5"
              : "border-rose-200 bg-rose-50/60 dark:border-rose-500/30 dark:bg-rose-500/5",
          )}
        >
          <div className="mb-3 flex items-center gap-2">
            {answer.correct ? (
              <>
                <CheckCircle2 className="h-5 w-5 text-emerald-600 dark:text-emerald-400" />
                <span className="font-bold text-emerald-800 dark:text-emerald-300">
                  إجابة صحيحة
                </span>
                <span className="flex items-center gap-1 rounded-md bg-emerald-100 px-2 py-0.5 text-xs font-semibold text-emerald-800 dark:bg-emerald-500/15 dark:text-emerald-300">
                  <Trophy className="h-3 w-3" />+{answer.earnedPoints} نقطة
                </span>
              </>
            ) : (
              <>
                <XCircle className="h-5 w-5 text-rose-600 dark:text-rose-400" />
                <span className="font-bold text-rose-800 dark:text-rose-300">
                  إجابة غير صحيحة
                </span>
              </>
            )}
          </div>

          {/* تفنيد الخيار الخاطئ المُختار */}
          {!answer.correct &&
            question.type === "multiple-choice" &&
            (() => {
              const picked = question.choices.find((c) => c.id === answer.choiceId);
              if (!picked?.rebuttal) return null;
              return (
                <div className="mb-3 rounded-lg border border-rose-200 bg-white/70 p-3 dark:border-rose-500/20 dark:bg-slate-900/60">
                  <p className="mb-1 text-xs font-semibold text-rose-700 dark:text-rose-300">
                    لماذا هذا الخيار غير صحيح؟
                  </p>
                  <MathText
                    text={picked.rebuttal}
                    className="text-sm text-slate-700 dark:text-slate-300"
                  />
                </div>
              );
            })()}

          {/* الحل خطوة بخطوة */}
          {question.steps && question.steps.length > 0 && (
            <ol className="mb-3 space-y-3">
              {question.steps.map((step, index) => (
                <li key={index} className="flex gap-3">
                  <span className="mt-0.5 flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-slate-900 text-xs font-bold text-white dark:bg-white dark:text-slate-900">
                    {index + 1}
                  </span>
                  <div className="min-w-0 flex-1">
                    <MathText
                      text={step.text}
                      className="text-sm text-slate-700 dark:text-slate-300"
                    />
                    {step.math && (
                      <div className="mt-1 rounded-lg bg-white/70 dark:bg-slate-900/60">
                        <KaTeXMath math={step.math} display className="my-2" />
                      </div>
                    )}
                  </div>
                </li>
              ))}
            </ol>
          )}

          <div className="rounded-lg border-s-4 border-slate-900 bg-white/70 p-3 dark:border-white dark:bg-slate-900/60">
            <p className="mb-1 text-xs font-semibold text-slate-500 dark:text-slate-400">
              الخلاصة
            </p>
            <MathText
              text={question.explanation}
              className="text-sm text-slate-800 dark:text-slate-200"
            />
          </div>
        </div>
      )}

      {/* أزرار الإجراء */}
      <div className="mt-6 flex flex-col gap-3 sm:flex-row-reverse sm:items-center sm:justify-start">
        {!checked ? (
          <button
            type="button"
            onClick={onCheck}
            disabled={!canCheck}
            className={cn(
              "flex items-center justify-center gap-2 rounded-xl px-6 py-3 text-sm font-semibold transition",
              canCheck
                ? "bg-sky-600 text-white hover:bg-sky-700"
                : "cursor-not-allowed bg-slate-200 text-slate-400 dark:bg-slate-800 dark:text-slate-600",
            )}
          >
            تحقّق من الإجابة
          </button>
        ) : (
          <button
            type="button"
            onClick={onNext}
            className="flex items-center justify-center gap-2 rounded-xl bg-slate-900 px-6 py-3 text-sm font-semibold text-white transition hover:bg-slate-700 dark:bg-white dark:text-slate-900 dark:hover:bg-slate-200"
          >
            {isLast ? "عرض النتيجة النهائية" : "السؤال التالي"}
            <ArrowLeft className="h-4 w-4" />
          </button>
        )}
        {!checked && !canCheck && (
          <span className="text-xs text-slate-500 dark:text-slate-400">
            {question.type === "multiple-choice"
              ? "اختر إجابة للمتابعة"
              : "أكمل جميع الحقول للمتابعة"}
          </span>
        )}
      </div>
    </div>
  );
}
