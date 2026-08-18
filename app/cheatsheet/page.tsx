/**
 * app/cheatsheet/page.tsx
 * ملخص القوانين: مرجع سريع لأهم صيغ الحوسبة الكمية (مُصيَّر بالكامل وقت البناء).
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
    <div className="mx-auto max-w-4xl px-4 py-10 sm:px-6 sm:py-14">
      <header className="mb-9">
        <h1 className="text-2xl font-extrabold text-slate-900 sm:text-3xl dark:text-white">
          ملخص القوانين
        </h1>
        <p className="mt-2 max-w-2xl text-sm leading-relaxed text-slate-600 sm:text-base dark:text-slate-400">
          كل ما تحتاجه من صيغ أثناء حل التمارين، مجموعاً في صفحة واحدة ومرتّباً حسب
          الموضوع. المعادلات معروضة بالاتجاه اللاتيني داخل صفحة عربية.
        </p>
      </header>

      {/* فهرس سريع */}
      <nav className="mb-9 flex flex-wrap gap-2">
        {CHEATSHEET.map((section) => (
          <a
            key={section.id}
            href={`#${section.id}`}
            className="rounded-full bg-slate-100 px-3.5 py-1.5 text-sm font-medium text-slate-700 transition hover:bg-slate-200 dark:bg-slate-800 dark:text-slate-300 dark:hover:bg-slate-700"
          >
            {section.title}
          </a>
        ))}
      </nav>

      <div className="space-y-10">
        {CHEATSHEET.map((section) => (
          <section key={section.id} id={section.id} className="scroll-mt-20">
            <h2 className="mb-4 flex items-center gap-2.5 text-lg font-bold text-slate-900 sm:text-xl dark:text-white">
              <span className="flex h-9 w-9 items-center justify-center rounded-lg bg-slate-900 text-white dark:bg-gold-400 dark:text-brand-950">
                <CategoryIcon name={section.icon} className="h-4 w-4" />
              </span>
              {section.title}
            </h2>

            <div className="grid gap-3 sm:grid-cols-2">
              {section.items.map((item) => (
                <article
                  key={item.title}
                  className="rounded-2xl border border-slate-200 bg-white p-4 dark:border-slate-800 dark:bg-slate-900"
                >
                  <h3 className="text-sm font-bold text-slate-900 dark:text-white">
                    {item.title}
                  </h3>
                  <div className="mt-1 rounded-lg bg-slate-50 dark:bg-slate-800/50">
                    <KaTeXMath math={item.math} display />
                  </div>
                  {item.note && (
                    <p className="mt-2 text-xs leading-relaxed text-slate-600 dark:text-slate-400">
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
