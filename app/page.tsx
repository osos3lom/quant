/**
 * app/page.tsx
 * الصفحة الرئيسية: نظرة عامة على المنصة والتصنيفات الستة.
 */
import Link from "next/link";
import { ArrowLeft, BookOpen, Sigma, Sparkles } from "lucide-react";
import { CATEGORIES } from "@/data/taxonomy";
import { EXERCISES, TOTAL_QUESTIONS } from "@/data/exercises";
import { CategoryIcon } from "@/components/CategoryIcon";
import { KaTeXMath } from "@/components/KaTeXMath";
import { cn } from "@/lib/utils";

export default function HomePage() {
  return (
    <div>
      {/* الواجهة الترحيبية */}
      <section className="relative overflow-hidden border-b border-slate-200 dark:border-slate-800">
        <div className="quantum-grid absolute inset-0 -z-10" aria-hidden="true" />
        <div className="mx-auto max-w-6xl px-4 py-16 text-center sm:px-6 sm:py-24">
          <span className="inline-flex items-center gap-1.5 rounded-full border border-sky-200 bg-sky-50 px-3 py-1 text-xs font-semibold text-sky-700 dark:border-sky-500/30 dark:bg-sky-500/10 dark:text-sky-300">
            <Sparkles className="h-3.5 w-3.5" />
            {EXERCISES.length} وحدات · {TOTAL_QUESTIONS} سؤالاً تفاعلياً
          </span>

          <h1 className="mt-5 text-3xl font-extrabold leading-tight text-slate-900 sm:text-5xl dark:text-white">
            أتقن الحوسبة الكمية
            <br />
            <span className="bg-gradient-to-l from-sky-500 via-violet-500 to-fuchsia-500 bg-clip-text text-transparent">
              بالتمرين لا بالحفظ
            </span>
          </h1>

          <p className="mx-auto mt-5 max-w-2xl text-base leading-relaxed text-slate-600 sm:text-lg dark:text-slate-400">
            تمارين عربية تفاعلية تبدأ من متجه الحالة وتنتهي عند تصحيح الأخطاء الكمية، مع
            تغذية راجعة فورية وحلول رياضية مفصّلة بترميز ديراك.
          </p>

          <div className="mx-auto mt-6 max-w-md rounded-2xl border border-slate-200 bg-white/80 px-4 py-3 backdrop-blur dark:border-slate-800 dark:bg-slate-900/70">
            <KaTeXMath
              math="|\psi\rangle = \alpha|0\rangle + \beta|1\rangle, \qquad |\alpha|^2 + |\beta|^2 = 1"
              display
              className="my-0"
            />
          </div>

          <div className="mt-8 flex flex-col justify-center gap-3 sm:flex-row">
            <Link
              href="/exercises"
              className="inline-flex items-center justify-center gap-2 rounded-xl bg-slate-900 px-7 py-3.5 text-sm font-semibold text-white transition hover:bg-slate-700 dark:bg-white dark:text-slate-900 dark:hover:bg-slate-200"
            >
              <BookOpen className="h-4 w-4" />
              ابدأ التمارين
              <ArrowLeft className="h-4 w-4" />
            </Link>
            <Link
              href="/cheatsheet"
              className="inline-flex items-center justify-center gap-2 rounded-xl border border-slate-200 bg-white px-7 py-3.5 text-sm font-semibold text-slate-700 transition hover:bg-slate-50 dark:border-slate-700 dark:bg-slate-900 dark:text-slate-200 dark:hover:bg-slate-800"
            >
              <Sigma className="h-4 w-4" />
              ملخص القوانين
            </Link>
          </div>
        </div>
      </section>

      {/* التصنيفات */}
      <section className="mx-auto max-w-6xl px-4 py-14 sm:px-6">
        <h2 className="text-xl font-bold text-slate-900 sm:text-2xl dark:text-white">
          ستة مسارات علمية متكاملة
        </h2>
        <p className="mt-1.5 text-sm text-slate-600 dark:text-slate-400">
          كل مسار يبدأ من الأساس الرياضي وينتهي بتطبيق عملي، بترتيب يبني بعضه على بعض.
        </p>

        <div className="mt-7 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {CATEGORIES.map((category) => {
            const exercise = EXERCISES.find((item) => item.category === category.id);
            return (
              <Link
                key={category.id}
                href={exercise ? `/exercises/${exercise.slug}` : "/exercises"}
                className="group rounded-2xl border border-slate-200 bg-white p-5 transition hover:-translate-y-0.5 hover:shadow-lg hover:shadow-slate-200/60 dark:border-slate-800 dark:bg-slate-900 dark:hover:shadow-black/30"
              >
                <span
                  className={cn(
                    "mb-3 flex h-11 w-11 items-center justify-center rounded-xl bg-gradient-to-br text-white",
                    category.gradient,
                  )}
                >
                  <CategoryIcon name={category.icon} className="h-5 w-5" />
                </span>
                <h3 className="text-base font-bold text-slate-900 dark:text-white">
                  {category.nameAr}
                </h3>
                <p className="mt-0.5 text-xs text-slate-500" dir="ltr">
                  {category.nameEn}
                </p>
                <p className="mt-2.5 text-sm leading-relaxed text-slate-600 dark:text-slate-400">
                  {category.descriptionAr}
                </p>
                <span className="mt-4 inline-flex items-center gap-1.5 text-sm font-semibold text-sky-600 dark:text-sky-400">
                  ابدأ المسار
                  <ArrowLeft className="h-4 w-4 transition group-hover:-translate-x-0.5" />
                </span>
              </Link>
            );
          })}
        </div>
      </section>
    </div>
  );
}
