/**
 * app/cheatsheet/page.tsx
 * ملخص القوانين: مرجع سريع لأهم صيغ الحوسبة الكمية (مُصيَّر بالكامل وقت البناء ومُعدَّل للاستجابة الشاملة على الجوال).
 */
import type { Metadata } from "next";
import { CHEATSHEET } from "@/data/cheatsheet";
import { CategoryIcon } from "@/components/CategoryIcon";
import { KaTeXMath } from "@/components/KaTeXMath";

export const metadata: Metadata = {
  title: "ملخص القوانين",
  description:
    "مرجع سريع لأهم قوانين وصيغ الحوسبة الكمية: الحالات، البوابات، التشابك، القياس، الخوارزميات، وتصحيح الأخطاء.",
};

export default function CheatsheetPage() {
  return (
    <div className="mx-auto max-w-4xl px-3.5 py-6 sm:px-6 sm:py-14">
      <header className="mb-6 sm:mb-9">
        <h1 className="text-2xl font-extrabold text-slate-900 sm:text-3xl lg:text-4xl dark:text-white">
          ملخص القوانين الكمية
        </h1>
        <p className="mt-2 max-w-2xl text-xs sm:text-sm lg:text-base leading-relaxed text-slate-600 dark:text-slate-400">
          مرجع شامل وسريع لكافة القوانين والصيغ الرياضياتية المستخدمة في الحوسبة الكمية مرتبة حسب المسارات العلمية.
        </p>
      </header>

      {/* فهرس سريع أفقي للجوال */}
      <nav className="mb-6 sm:mb-9 flex overflow-x-auto pb-2 gap-1.5 sm:flex-wrap sm:gap-2 no-scrollbar">
        {CHEATSHEET.map((section) => (
          <a
            key={section.id}
            href={`#${section.id}`}
            className="whitespace-nowrap rounded-full bg-slate-100 px-3.5 py-1.5 text-xs font-semibold text-slate-700 transition hover:bg-slate-200 dark:bg-slate-800 dark:text-slate-300 dark:hover:bg-slate-700"
          >
            {section.title}
          </a>
        ))}
      </nav>

      <div className="space-y-8 sm:space-y-12">
        {CHEATSHEET.map((section) => (
          <section key={section.id} id={section.id} className="scroll-mt-20">
            <h2 className="mb-3.5 flex items-center gap-2 text-base font-bold text-slate-900 sm:text-xl dark:text-white">
              <span className="flex h-8 w-8 sm:h-9 sm:w-9 items-center justify-center rounded-lg bg-slate-900 text-white dark:bg-gold-400 dark:text-brand-950 shadow-sm">
                <CategoryIcon name={section.icon} className="h-4 w-4" />
              </span>
              {section.title}
            </h2>

            <div className="grid gap-3 grid-cols-1 sm:grid-cols-2">
              {section.items.map((item) => (
                <article
                  key={item.title}
                  className="rounded-2xl border border-slate-200 bg-white p-3.5 sm:p-5 dark:border-slate-800 dark:bg-slate-900 shadow-sm transition hover:shadow-md"
                >
                  <h3 className="text-xs sm:text-sm font-bold text-slate-900 dark:text-white">
                    {item.title}
                  </h3>
                  
                  <div className="mt-2 overflow-x-auto rounded-xl border border-slate-100 bg-slate-50/90 p-2 sm:p-3 dark:border-slate-800/80 dark:bg-slate-950/60 max-w-full">
                    <KaTeXMath math={item.math} display className="my-0.5 text-xs sm:text-sm" />
                  </div>
                  
                  {item.note && (
                    <p className="mt-2 text-[11px] sm:text-xs leading-relaxed text-slate-600 dark:text-slate-400">
                      {item.note}
                    </p>
                  )}
                </article>
              ))}
            </div>
          </section>
        ))}
      </div>
    </div>
  );
}
