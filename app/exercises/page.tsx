/**
 * app/exercises/page.tsx
 * دليل التمارين والتصنيفات — يُصيَّر مسبقاً ثم يتولّى مكوّن العميل البحث والفلترة.
 */
import type { Metadata } from "next";
import { EXERCISES, TOTAL_QUESTIONS } from "@/data/exercises";
import { ExercisesBrowser } from "@/components/ExercisesBrowser";

export const metadata: Metadata = {
  title: "دليل التمارين",
  description:
    "تصفّح تمارين الحوسبة الكمية حسب التصنيف ومستوى الصعوبة، مع بحث فوري في المفاهيم الكمية.",
};

export default function ExercisesPage() {
  return (
    <div className="mx-auto max-w-6xl px-4 py-10 sm:px-6 sm:py-14">
      <header className="mb-8">
        <h1 className="text-2xl font-extrabold text-slate-900 sm:text-3xl dark:text-white">
          دليل التمارين
        </h1>
        <p className="mt-2 max-w-2xl text-sm leading-relaxed text-slate-600 sm:text-base dark:text-slate-400">
          {EXERCISES.length} وحدات تمارين تضم {TOTAL_QUESTIONS} سؤالاً في الحوسبة الكمية،
          موزّعة على ستة تصنيفات علمية وأربعة مستويات صعوبة. اختر ما يناسب مستواك، وسيُحفظ
          تقدّمك تلقائياً على جهازك.
        </p>
      </header>

      <ExercisesBrowser exercises={EXERCISES} />
    </div>
  );
}
