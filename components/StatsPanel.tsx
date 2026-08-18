/**
 * components/StatsPanel.tsx
 * لوحة الإحصائيات: نقاط الخبرة، الدقة، سلسلة الأيام، تقدّم كل وحدة، وسجل المحاولات.
 */
"use client";

import Link from "next/link";
import { useState } from "react";
import {
  Award,
  CalendarDays,
  CheckCircle2,
  Flame,
  History,
  Target,
  Trash2,
} from "lucide-react";
import { EXERCISES } from "@/data/exercises";
import { getCategory, getDifficulty } from "@/data/taxonomy";
import {
  exerciseCompletion,
  levelFromXp,
  overallAccuracy,
  resetProgress,
} from "@/lib/progress";
import { useMounted, useProgress } from "@/lib/use-progress";
import { cn, formatDate, formatDuration } from "@/lib/utils";
import { ProgressBar } from "./ProgressBar";

function StatCard({
  icon: Icon,
  value,
  label,
  tone,
}: {
  icon: typeof Award;
  value: string;
  label: string;
  tone: string;
}) {
  return (
    <div className="rounded-2xl border border-slate-200 bg-white p-5 dark:border-slate-800 dark:bg-slate-900">
      <span
        className={cn(
          "mb-3 flex h-10 w-10 items-center justify-center rounded-xl",
          tone,
        )}
      >
        <Icon className="h-5 w-5" />
      </span>
      <p className="text-2xl font-bold text-slate-900 tabular-nums dark:text-white">
        {value}
      </p>
      <p className="mt-0.5 text-xs text-slate-500 dark:text-slate-400">{label}</p>
    </div>
  );
}

export function StatsPanel() {
  const progress = useProgress();
  const mounted = useMounted();
  const [confirming, setConfirming] = useState(false);

  if (!mounted) {
    return (
      <div className="rounded-2xl border border-dashed border-slate-300 py-16 text-center text-sm text-slate-500 dark:border-slate-700 dark:text-slate-400">
        جارٍ تحميل بياناتك المحفوظة محلياً…
      </div>
    );
  }

  const { level, progress: levelProgress } = levelFromXp(progress.xp);
  const accuracy = overallAccuracy(progress);
  const completedCount = EXERCISES.filter(
    (exercise) => progress.exercises[exercise.slug]?.completed,
  ).length;

  const hasData = progress.totalAnswered > 0;

  return (
    <div className="space-y-8">
      {/* البطاقات الأربع */}
      <div className="grid grid-cols-2 gap-4 lg:grid-cols-4">
        <StatCard
          icon={Award}
          value={String(progress.xp)}
          label="نقطة خبرة"
          tone="bg-amber-100 text-amber-700 dark:bg-amber-500/15 dark:text-amber-300"
        />
        <StatCard
          icon={Target}
          value={`${accuracy}%`}
          label="الدقة الكلية"
          tone="bg-sky-100 text-sky-700 dark:bg-sky-500/15 dark:text-sky-300"
        />
        <StatCard
          icon={Flame}
          value={String(progress.dayStreak)}
          label="أيام متتالية"
          tone="bg-rose-100 text-rose-700 dark:bg-rose-500/15 dark:text-rose-300"
        />
        <StatCard
          icon={CheckCircle2}
          value={`${completedCount}/${EXERCISES.length}`}
          label="وحدات مكتملة"
          tone="bg-emerald-100 text-emerald-700 dark:bg-emerald-500/15 dark:text-emerald-300"
        />
      </div>

      {/* المستوى */}
      <section className="rounded-2xl border border-slate-200 bg-white p-5 dark:border-slate-800 dark:bg-slate-900">
        <div className="mb-3 flex items-center justify-between">
          <div>
            <h2 className="text-base font-bold text-slate-900 dark:text-white">
              المستوى {level}
            </h2>
            <p className="text-xs text-slate-500 dark:text-slate-400">
              كل 500 نقطة خبرة ترفعك مستوى واحداً
            </p>
          </div>
          <span className="rounded-lg bg-slate-100 px-3 py-1.5 text-sm font-semibold text-slate-700 tabular-nums dark:bg-slate-800 dark:text-slate-300">
            {progress.totalCorrect}/{progress.totalAnswered} إجابة صحيحة
          </span>
        </div>
        <ProgressBar
          value={levelProgress}
          size="lg"
          barClassName="bg-gradient-to-l from-violet-500 to-fuchsia-400"
        />
      </section>

      {/* تقدّم الوحدات */}
      <section>
        <h2 className="mb-4 text-lg font-bold text-slate-900 dark:text-white">
          تقدّمك في الوحدات
        </h2>
        <div className="space-y-3">
          {EXERCISES.map((exercise) => {
            const entry = progress.exercises[exercise.slug];
            const completion = exerciseCompletion(
              progress,
              exercise.slug,
              exercise.questions.length,
            );
            const category = getCategory(exercise.category);
            const difficulty = getDifficulty(exercise.difficulty);

            return (
              <Link
                key={exercise.slug}
                href={`/exercises/${exercise.slug}`}
                className="flex flex-col gap-3 rounded-2xl border border-slate-200 bg-white p-4 transition hover:border-slate-300 sm:flex-row sm:items-center dark:border-slate-800 dark:bg-slate-900 dark:hover:border-slate-700"
              >
                <div className="min-w-0 flex-1">
                  <div className="flex flex-wrap items-center gap-2">
                    <h3 className="text-sm font-bold text-slate-900 dark:text-white">
                      {exercise.titleAr}
                    </h3>
                    <span
                      className={cn(
                        "rounded px-1.5 py-0.5 text-[10px] font-semibold ring-1 ring-inset",
                        difficulty.badgeClass,
                      )}
                    >
                      {difficulty.nameAr}
                    </span>
                  </div>
                  <p className="mt-0.5 text-xs text-slate-500 dark:text-slate-400">
                    {category.nameAr} ·{" "}
                    {entry?.completed
                      ? `أفضل دقة ${entry.bestAccuracy}% في ${entry.attempts} محاولة`
                      : entry && entry.answered > 0
                        ? `${entry.answered} من ${exercise.questions.length} أسئلة`
                        : "لم تبدأ بعد"}
                  </p>
                </div>
                <div className="w-full sm:w-48">
                  <ProgressBar
                    value={completion}
                    size="sm"
                    showValue
                    barClassName={
                      entry?.completed
                        ? "bg-gradient-to-l from-emerald-500 to-teal-400"
                        : "bg-gradient-to-l from-sky-500 to-cyan-400"
                    }
                  />
                </div>
              </Link>
            );
          })}
        </div>
      </section>

      {/* سجل المحاولات */}
      {progress.history.length > 0 && (
        <section>
          <h2 className="mb-4 flex items-center gap-2 text-lg font-bold text-slate-900 dark:text-white">
            <History className="h-5 w-5 text-slate-400" />
            آخر المحاولات
          </h2>
          <div className="overflow-x-auto rounded-2xl border border-slate-200 dark:border-slate-800">
            <table className="w-full min-w-[560px] text-sm">
              <thead className="bg-slate-50 text-xs text-slate-500 dark:bg-slate-800/60 dark:text-slate-400">
                <tr>
                  <th className="px-4 py-3 text-start font-semibold">التمرين</th>
                  <th className="px-4 py-3 text-start font-semibold">النتيجة</th>
                  <th className="px-4 py-3 text-start font-semibold">الدقة</th>
                  <th className="px-4 py-3 text-start font-semibold">الزمن</th>
                  <th className="px-4 py-3 text-start font-semibold">التاريخ</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-200 bg-white dark:divide-slate-800 dark:bg-slate-900">
                {progress.history.map((record, index) => (
                  <tr key={`${record.slug}-${record.at}-${index}`}>
                    <td className="px-4 py-3 font-medium text-slate-900 dark:text-white">
                      {record.titleAr}
                    </td>
                    <td className="px-4 py-3 text-slate-600 tabular-nums dark:text-slate-400">
                      {record.correct}/{record.total}
                    </td>
                    <td className="px-4 py-3">
                      <span
                        className={cn(
                          "rounded-md px-2 py-0.5 text-xs font-semibold tabular-nums",
                          record.accuracy >= 70
                            ? "bg-emerald-100 text-emerald-700 dark:bg-emerald-500/15 dark:text-emerald-300"
                            : "bg-amber-100 text-amber-800 dark:bg-amber-500/15 dark:text-amber-300",
                        )}
                      >
                        {record.accuracy}%
                      </span>
                    </td>
                    <td className="px-4 py-3 text-slate-600 tabular-nums dark:text-slate-400">
                      {formatDuration(record.seconds)}
                    </td>
                    <td className="px-4 py-3 text-slate-500 dark:text-slate-400">
                      {formatDate(record.at)}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </section>
      )}

      {/* حالة فارغة */}
      {!hasData && (
        <div className="rounded-2xl border border-dashed border-slate-300 py-14 text-center dark:border-slate-700">
          <CalendarDays className="mx-auto mb-3 h-9 w-9 text-slate-400" />
          <p className="font-semibold text-slate-900 dark:text-white">
            لا توجد بيانات بعد
          </p>
          <p className="mt-1 text-sm text-slate-500 dark:text-slate-400">
            ابدأ أول تمرين وسيظهر تقدّمك هنا مباشرة.
          </p>
          <Link
            href="/exercises"
            className="mt-5 inline-block rounded-xl bg-slate-900 px-5 py-2.5 text-sm font-semibold text-white transition hover:bg-slate-700 dark:bg-white dark:text-slate-900 dark:hover:bg-slate-200"
          >
            تصفّح التمارين
          </Link>
        </div>
      )}

      {/* حذف البيانات */}
      {hasData && (
        <section className="rounded-2xl border border-rose-200 bg-rose-50/60 p-5 dark:border-rose-500/25 dark:bg-rose-500/5">
          <h2 className="text-sm font-bold text-rose-900 dark:text-rose-200">
            حذف بيانات التقدّم
          </h2>
          <p className="mt-1 text-xs text-rose-800/80 dark:text-rose-300/80">
            يمسح النقاط والسجل وكل تقدّم الوحدات من هذا المتصفح. لا يمكن التراجع.
          </p>
          {confirming ? (
            <div className="mt-3 flex flex-wrap gap-2">
              <button
                type="button"
                onClick={() => {
                  resetProgress();
                  setConfirming(false);
                }}
                className="inline-flex items-center gap-1.5 rounded-lg bg-rose-600 px-4 py-2 text-xs font-semibold text-white transition hover:bg-rose-700"
              >
                <Trash2 className="h-3.5 w-3.5" />
                نعم، احذف كل شيء
              </button>
              <button
                type="button"
                onClick={() => setConfirming(false)}
                className="rounded-lg border border-rose-300 px-4 py-2 text-xs font-semibold text-rose-800 transition hover:bg-rose-100 dark:border-rose-500/40 dark:text-rose-200 dark:hover:bg-rose-500/10"
              >
                إلغاء
              </button>
            </div>
          ) : (
            <button
              type="button"
              onClick={() => setConfirming(true)}
              className="mt-3 inline-flex items-center gap-1.5 rounded-lg border border-rose-300 px-4 py-2 text-xs font-semibold text-rose-800 transition hover:bg-rose-100 dark:border-rose-500/40 dark:text-rose-200 dark:hover:bg-rose-500/10"
            >
              <Trash2 className="h-3.5 w-3.5" />
              حذف بياناتي
            </button>
          )}
        </section>
      )}
    </div>
  );
}
