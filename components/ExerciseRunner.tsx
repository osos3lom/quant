/**
 * components/ExerciseRunner.tsx
 * واجهة حل التمرين: شريط التقدّم، المؤقت، سلسلة الإجابات الصحيحة، ثم شاشة النتيجة النهائية.
 */
"use client";

import { useCallback, useEffect, useMemo, useRef, useState } from "react";
import Link from "next/link";
import {
  ArrowLeft,
  Flame,
  Pause,
  Play,
  RotateCcw,
  Target,
  Timer,
  Trophy,
} from "lucide-react";
import type { AnswerState, Exercise, ExerciseResult } from "@/types/quantum";
import { getCategory, getDifficulty } from "@/data/taxonomy";
import { getMaxPoints } from "@/data/exercises";
import { gradeBlanks } from "@/lib/answers";
import { completeExercise, recordAnswer, startAttempt } from "@/lib/progress";
import { cn, formatDuration } from "@/lib/utils";
import { KaTeXMath, MathText } from "./KaTeXMath";
import { ProgressBar } from "./ProgressBar";
import { QuestionRenderer } from "./QuestionRenderer";

function emptyAnswer(questionId: string): AnswerState {
  return {
    questionId,
    values: {},
    checked: false,
    correct: false,
    earnedPoints: 0,
  };
}

interface ExerciseRunnerProps {
  exercise: Exercise;
  /** التمرين التالي في المسار التعليمي، إن وجد */
  nextExercise?: { slug: string; titleAr: string };
}

export function ExerciseRunner({ exercise, nextExercise }: ExerciseRunnerProps) {
  const questions = exercise.questions;
  const maxPoints = useMemo(() => getMaxPoints(exercise), [exercise]);
  const category = getCategory(exercise.category);
  const difficulty = getDifficulty(exercise.difficulty);

  const [index, setIndex] = useState(0);
  const [answers, setAnswers] = useState<Record<string, AnswerState>>({});
  const [streak, setStreak] = useState(0);
  const [bestStreak, setBestStreak] = useState(0);
  const [seconds, setSeconds] = useState(0);
  const [paused, setPaused] = useState(false);
  const [finished, setFinished] = useState(false);
  const topRef = useRef<HTMLDivElement>(null);

  const question = questions[index];
  const answer = answers[question?.id ?? ""] ?? emptyAnswer(question?.id ?? "");

  // بداية محاولة جديدة: نصفّر عدّاد الأسئلة المُجابة في التخزين المحلي
  useEffect(() => {
    startAttempt(exercise.slug, questions.length);
  }, [exercise.slug, questions.length]);

  // المؤقت
  useEffect(() => {
    if (paused || finished) return;
    const id = window.setInterval(() => setSeconds((value) => value + 1), 1000);
    return () => window.clearInterval(id);
  }, [paused, finished]);

  const updateAnswer = useCallback(
    (partial: Partial<AnswerState>) => {
      setAnswers((previous) => {
        const current = previous[question.id] ?? emptyAnswer(question.id);
        return { ...previous, [question.id]: { ...current, ...partial } };
      });
    },
    [question?.id],
  );

  const handleCheck = useCallback(() => {
    const current = answers[question.id] ?? emptyAnswer(question.id);
    let correct = false;
    let blankResults: Record<string, boolean> | undefined;

    if (question.type === "multiple-choice") {
      correct = current.choiceId === question.correctId;
    } else {
      const graded = gradeBlanks(question.blanks, current.values ?? {});
      blankResults = graded.results;
      correct = graded.allCorrect;
    }

    const earnedPoints = correct ? question.points : 0;

    setAnswers((previous) => ({
      ...previous,
      [question.id]: { ...current, checked: true, correct, blankResults, earnedPoints },
    }));

    setStreak((value) => {
      const next = correct ? value + 1 : 0;
      setBestStreak((best) => Math.max(best, next));
      return next;
    });

    recordAnswer({
      slug: exercise.slug,
      total: questions.length,
      correct,
      points: question.points,
    });
  }, [answers, exercise.slug, question, questions.length]);

  const result: ExerciseResult = useMemo(() => {
    const list = questions.map((q) => answers[q.id]).filter(Boolean) as AnswerState[];
    const correct = list.filter((a) => a.correct).length;
    const points = list.reduce((sum, a) => sum + a.earnedPoints, 0);
    return {
      correct,
      total: questions.length,
      points,
      maxPoints,
      accuracy: questions.length ? Math.round((correct / questions.length) * 100) : 0,
      seconds,
      bestStreak,
      wrongQuestionIds: questions
        .filter((q) => answers[q.id] && !answers[q.id].correct)
        .map((q) => q.id),
    };
  }, [answers, bestStreak, maxPoints, questions, seconds]);

  const handleNext = useCallback(() => {
    if (index < questions.length - 1) {
      setIndex((value) => value + 1);
      topRef.current?.scrollIntoView({ behavior: "smooth", block: "start" });
      return;
    }
    setFinished(true);
    completeExercise(exercise.slug, exercise.titleAr, result);
    topRef.current?.scrollIntoView({ behavior: "smooth", block: "start" });
  }, [exercise.slug, exercise.titleAr, index, questions.length, result]);

  const handleRetry = useCallback(() => {
    setAnswers({});
    setIndex(0);
    setStreak(0);
    setBestStreak(0);
    setSeconds(0);
    setPaused(false);
    setFinished(false);
    startAttempt(exercise.slug, questions.length);
    topRef.current?.scrollIntoView({ behavior: "smooth", block: "start" });
  }, [exercise.slug, questions.length]);

  const answeredCount = Object.values(answers).filter((a) => a.checked).length;
  const progressValue = finished
    ? 100
    : Math.round((answeredCount / questions.length) * 100);

  /* ---------------------------------------------------------------- */
  /* شاشة النتيجة النهائية                                             */
  /* ---------------------------------------------------------------- */
  if (finished) {
    const wrongQuestions = questions.filter((q) => result.wrongQuestionIds.includes(q.id));
    const grade =
      result.accuracy >= 90
        ? { text: "أداء ممتاز", tone: "text-emerald-600 dark:text-emerald-400" }
        : result.accuracy >= 70
          ? { text: "أداء جيد جداً", tone: "text-brand-600 dark:text-brand-400" }
          : result.accuracy >= 50
            ? { text: "أداء مقبول", tone: "text-amber-600 dark:text-amber-400" }
            : { text: "يحتاج مراجعة", tone: "text-rose-600 dark:text-rose-400" };

    return (
      <div ref={topRef} className="space-y-6">
        <section className="rounded-2xl border border-slate-200 bg-white p-6 text-center shadow-sm sm:p-10 dark:border-slate-800 dark:bg-slate-900">
          <span className="mx-auto mb-4 flex h-16 w-16 items-center justify-center rounded-2xl bg-gradient-to-br from-brand-600 to-brand-400 text-white dark:from-gold-500 dark:to-gold-300 dark:text-brand-950">
            <Trophy className="h-8 w-8" />
          </span>
          <h2 className="text-2xl font-bold text-slate-900 dark:text-white">
            انتهى التمرين
          </h2>
          <p className={cn("mt-1 text-sm font-semibold", grade.tone)}>{grade.text}</p>

          <div className="mx-auto mt-6 grid max-w-2xl grid-cols-2 gap-3 sm:grid-cols-4">
            <div className="rounded-xl bg-slate-50 p-4 dark:bg-slate-800/60">
              <p className="text-2xl font-bold text-slate-900 tabular-nums dark:text-white">
                {result.accuracy}%
              </p>
              <p className="mt-0.5 text-xs text-slate-500 dark:text-slate-400">الدقة</p>
            </div>
            <div className="rounded-xl bg-slate-50 p-4 dark:bg-slate-800/60">
              <p className="text-2xl font-bold text-slate-900 tabular-nums dark:text-white">
                {result.correct}/{result.total}
              </p>
              <p className="mt-0.5 text-xs text-slate-500 dark:text-slate-400">
                إجابات صحيحة
              </p>
            </div>
            <div className="rounded-xl bg-slate-50 p-4 dark:bg-slate-800/60">
              <p className="text-2xl font-bold text-slate-900 tabular-nums dark:text-white">
                {result.points}
              </p>
              <p className="mt-0.5 text-xs text-slate-500 dark:text-slate-400">
                من {maxPoints} نقطة
              </p>
            </div>
            <div className="rounded-xl bg-slate-50 p-4 dark:bg-slate-800/60">
              <p className="text-2xl font-bold text-slate-900 tabular-nums dark:text-white">
                {formatDuration(result.seconds)}
              </p>
              <p className="mt-0.5 text-xs text-slate-500 dark:text-slate-400">الزمن</p>
            </div>
          </div>

          <div className="mx-auto mt-6 max-w-2xl">
            <ProgressBar
              value={result.accuracy}
              size="lg"
              barClassName={
                result.accuracy >= 70
                  ? "bg-gradient-to-l from-emerald-500 to-teal-400"
                  : "bg-gradient-to-l from-amber-500 to-orange-400"
              }
            />
            <p className="mt-2 text-xs text-slate-500 dark:text-slate-400">
              أطول سلسلة إجابات صحيحة متتالية: {result.bestStreak}
            </p>
          </div>

          <div className="mt-7 flex flex-col justify-center gap-3 sm:flex-row">
            <button
              type="button"
              onClick={handleRetry}
              className="flex items-center justify-center gap-2 rounded-xl border border-slate-200 px-6 py-3 text-sm font-semibold text-slate-700 transition hover:bg-slate-50 dark:border-slate-700 dark:text-slate-200 dark:hover:bg-slate-800"
            >
              <RotateCcw className="h-4 w-4" />
              إعادة المحاولة
            </button>
            {nextExercise ? (
              <Link
                href={`/exercises/${nextExercise.slug}`}
                className="flex items-center justify-center gap-2 rounded-xl bg-slate-900 px-6 py-3 text-sm font-semibold text-white transition hover:bg-slate-700 dark:bg-gold-400 dark:text-brand-950 dark:hover:bg-gold-300"
              >
                التمرين التالي: {nextExercise.titleAr}
                <ArrowLeft className="h-4 w-4" />
              </Link>
            ) : (
              <Link
                href="/exercises"
                className="flex items-center justify-center gap-2 rounded-xl bg-slate-900 px-6 py-3 text-sm font-semibold text-white transition hover:bg-slate-700 dark:bg-gold-400 dark:text-brand-950 dark:hover:bg-gold-300"
              >
                العودة إلى دليل التمارين
                <ArrowLeft className="h-4 w-4" />
              </Link>
            )}
          </div>
        </section>

        {/* مراجعة الأسئلة الخاطئة */}
        {wrongQuestions.length > 0 && (
          <section className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm dark:border-slate-800 dark:bg-slate-900">
            <h3 className="mb-4 flex items-center gap-2 text-lg font-bold text-slate-900 dark:text-white">
              <Target className="h-5 w-5 text-rose-500" />
              مراجعة الأسئلة الخاطئة ({wrongQuestions.length})
            </h3>
            <ul className="space-y-5">
              {wrongQuestions.map((q) => (
                <li
                  key={q.id}
                  className="rounded-xl border border-rose-200 bg-rose-50/50 p-4 dark:border-rose-500/25 dark:bg-rose-500/5"
                >
                  <MathText
                    text={q.prompt}
                    className="text-sm font-semibold text-slate-900 dark:text-white"
                  />
                  {q.math && <KaTeXMath math={q.math} display />}

                  <div className="mt-3 rounded-lg bg-white/80 p-3 dark:bg-slate-900/70">
                    <p className="mb-1.5 text-xs font-semibold text-emerald-700 dark:text-emerald-400">
                      الإجابة الصحيحة
                    </p>
                    {q.type === "multiple-choice" ? (
                      <MathText
                        text={
                          q.choices.find((c) => c.id === q.correctId)?.text ?? ""
                        }
                        className="text-sm text-slate-800 dark:text-slate-200"
                      />
                    ) : (
                      <ul className="space-y-1.5">
                        {q.blanks.map((blank) => (
                          <li
                            key={blank.id}
                            className="flex flex-wrap items-center gap-2 text-sm text-slate-800 dark:text-slate-200"
                          >
                            <span className="text-xs text-slate-500 dark:text-slate-400">
                              {blank.label}:
                            </span>
                            <KaTeXMath math={blank.display} />
                          </li>
                        ))}
                      </ul>
                    )}
                  </div>

                  <div className="mt-3">
                    <MathText
                      text={q.explanation}
                      className="text-sm text-slate-700 dark:text-slate-300"
                    />
                  </div>
                </li>
              ))}
            </ul>
          </section>
        )}
      </div>
    );
  }

  /* ---------------------------------------------------------------- */
  /* واجهة الحل                                                        */
  /* ---------------------------------------------------------------- */
  return (
    <div ref={topRef} className="space-y-5">
      {/* شريط التقدّم العلوي */}
      <section className="rounded-2xl border border-slate-200 bg-white p-4 shadow-sm sm:p-5 dark:border-slate-800 dark:bg-slate-900">
        <div className="mb-3 flex flex-wrap items-center justify-between gap-3">
          <div className="flex items-center gap-2 text-sm font-semibold text-slate-900 dark:text-white">
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

          <div className="flex items-center gap-2">
            <span className="flex items-center gap-1.5 rounded-lg bg-slate-100 px-2.5 py-1.5 text-xs font-semibold text-slate-700 tabular-nums dark:bg-slate-800 dark:text-slate-300">
              <Timer className="h-3.5 w-3.5" />
              {formatDuration(seconds)}
            </span>
            <button
              type="button"
              onClick={() => setPaused((value) => !value)}
              aria-label={paused ? "استئناف المؤقت" : "إيقاف المؤقت مؤقتاً"}
              className="inline-flex h-8 w-8 items-center justify-center rounded-lg border border-slate-200 text-slate-600 transition hover:bg-slate-50 dark:border-slate-700 dark:text-slate-300 dark:hover:bg-slate-800"
            >
              {paused ? <Play className="h-3.5 w-3.5" /> : <Pause className="h-3.5 w-3.5" />}
            </button>
            {streak > 1 && (
              <span className="flex items-center gap-1 rounded-lg bg-gold-100 px-2.5 py-1.5 text-xs font-bold text-gold-800 dark:bg-gold-400/15 dark:text-gold-300">
                <Flame className="h-3.5 w-3.5" />
                {streak} متتالية
              </span>
            )}
          </div>
        </div>

        <ProgressBar
          value={progressValue}
          label={`السؤال ${index + 1} من ${questions.length}`}
          showValue
        />
      </section>

      {paused ? (
        <section className="rounded-2xl border border-slate-200 bg-white p-10 text-center dark:border-slate-800 dark:bg-slate-900">
          <Pause className="mx-auto mb-3 h-8 w-8 text-slate-400" />
          <p className="font-semibold text-slate-900 dark:text-white">التمرين متوقف مؤقتاً</p>
          <p className="mt-1 text-sm text-slate-500 dark:text-slate-400">
            المؤقت متوقف والسؤال مخفي حتى تستأنف.
          </p>
          <button
            type="button"
            onClick={() => setPaused(false)}
            className="mt-5 inline-flex items-center gap-2 rounded-xl bg-brand-600 px-6 py-3 text-sm font-semibold text-white transition hover:bg-brand-700"
          >
            <Play className="h-4 w-4" />
            استئناف
          </button>
        </section>
      ) : (
        <QuestionRenderer
          question={question}
          answer={answer}
          onChange={updateAnswer}
          onCheck={handleCheck}
          onNext={handleNext}
          isLast={index === questions.length - 1}
        />
      )}
    </div>
  );
}
