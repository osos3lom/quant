"use client";

import { useState } from "react";
import { CheckCircle2, HelpCircle, Sparkles, BookOpen, Sigma, Shield } from "lucide-react";
import { KaTeXMath, MathText } from "@/components/KaTeXMath";
import { TOTAL_QUESTIONS, EXERCISES } from "@/data/exercises";

export function QuantumProofLab() {
  const [selectedOption, setSelectedOption] = useState<number | null>(null);
  const [isAnswered, setIsAnswered] = useState(false);

  const correctAnswer = 1;

  const handleSelect = (idx: number) => {
    setSelectedOption(idx);
    setIsAnswered(true);
  };

  return (
    <div className="relative rounded-3xl border border-slate-200 bg-white p-5 sm:p-10 shadow-xl dark:border-slate-800 dark:bg-slate-950">
      <div className="text-center mb-6 sm:mb-8">
        <span className="inline-flex items-center gap-1.5 rounded-full border border-gold-400/30 bg-gold-400/10 px-3.5 py-1 text-xs font-semibold text-gold-700 dark:text-gold-400">
          <Sparkles className="h-3.5 w-3.5" />
          مختبر الإثبات والتجربة المباشرة · Empirical Dirac Lab
        </span>
        <h2 className="mt-3 text-xl font-extrabold text-slate-900 sm:text-3xl lg:text-4xl dark:text-white">
          جرب التفكير الكمي بنفسك الآن
        </h2>
        <p className="mt-2 text-xs sm:text-sm text-slate-600 dark:text-slate-400 max-w-lg mx-auto">
          اختبر إدراكك لبوابة هادامارد والتراكب الكمي في مسألة تفاعلية سريعة.
        </p>
      </div>

      {/* Dirac Exercise Card Sandbox */}
      <div className="mx-auto max-w-2xl rounded-2xl border border-slate-200 bg-slate-50 p-5 sm:p-8 dark:border-slate-800 dark:bg-slate-900/80">
        <div className="flex items-center gap-2 text-xs text-brand-700 dark:text-emerald-400 font-mono font-semibold">
          <HelpCircle className="h-4 w-4" />
          مسألة عينة · Hadamard Gate Action
        </div>

        <h3 className="mt-3 text-base sm:text-lg font-bold text-slate-900 dark:text-white text-right">
          <MathText text="عند تطبيق بوابة هادامارد $H$ على الحالة الفراغية $|0\rangle$، ما هي المتجهة الناتجة؟" />
        </h3>

        <div className="mt-3 rounded-xl border border-slate-200 bg-white p-3 text-center dark:border-slate-800 dark:bg-slate-950">
          <KaTeXMath math="H|0\rangle = ?" display className="my-0 text-brand-700 dark:text-emerald-300 text-base sm:text-lg" />
        </div>

        {/* Options */}
        <div className="mt-4 sm:mt-5 space-y-2.5">
          {[
            { label: "|1\\rangle", isCorrect: false },
            { label: "\\frac{|0\\rangle + |1\\rangle}{\\sqrt{2}}", isCorrect: true },
            { label: "\\frac{|0\\rangle - |1\\rangle}{\\sqrt{2}}", isCorrect: false },
          ].map((opt, idx) => {
            const isSelected = selectedOption === idx;
            const isCorrect = idx === correctAnswer;

            let btnStyle = "border-slate-200 bg-white text-slate-800 hover:border-slate-300 dark:border-slate-800 dark:bg-slate-950/70 dark:text-slate-300";
            if (isAnswered && isSelected) {
              btnStyle = isCorrect
                ? "border-emerald-500 bg-emerald-50 text-emerald-900 font-bold dark:border-emerald-500 dark:bg-emerald-500/15 dark:text-emerald-300"
                : "border-red-500 bg-red-50 text-red-900 dark:border-red-500 dark:bg-red-500/15 dark:text-red-300";
            } else if (isAnswered && isCorrect) {
              btnStyle = "border-emerald-500/50 bg-emerald-50 text-emerald-800 dark:border-emerald-500/50 dark:bg-emerald-500/10 dark:text-emerald-300";
            }

            return (
              <button
                key={idx}
                onClick={() => handleSelect(idx)}
                className={`w-full flex items-center justify-between rounded-xl border px-3.5 py-2.5 sm:px-4 sm:py-3 text-xs sm:text-sm transition ${btnStyle}`}
              >
                <div className="flex items-center gap-2.5 sm:gap-3">
                  <span className="font-mono text-xs text-slate-400">[{idx + 1}]</span>
                  <KaTeXMath math={opt.label} className="my-0 text-xs sm:text-sm" />
                </div>
                {isAnswered && isCorrect && (
                  <CheckCircle2 className="h-4 w-4 sm:h-5 sm:w-5 text-emerald-500" />
                )}
              </button>
            );
          })}
        </div>

        {/* Solution Feedback */}
        {isAnswered && (
          <div className="mt-4 sm:mt-5 rounded-xl border border-emerald-500/30 bg-emerald-50 p-3.5 sm:p-4 text-right text-xs text-emerald-900 dark:bg-emerald-500/10 dark:text-emerald-300">
            <span className="font-bold block mb-1">إثبات الخطوة الرياضية:</span>
            <KaTeXMath
              math="H|0\rangle = \frac{1}{\sqrt{2}}\begin{pmatrix}1 & 1 \\ 1 & -1\end{pmatrix} \begin{pmatrix}1 \\ 0\end{pmatrix} = \frac{1}{\sqrt{2}}\begin{pmatrix}1 \\ 1\end{pmatrix} = \frac{|0\rangle+|1\rangle}{\sqrt{2}}"
              display
              className="my-0 text-[11px] sm:text-xs"
            />
          </div>
        )}
      </div>

      {/* Metrics */}
      <div className="mt-8 sm:mt-12 grid grid-cols-1 gap-3 sm:grid-cols-3 text-center">
        <div className="rounded-2xl border border-slate-200 bg-slate-50 p-4 sm:p-5 dark:border-slate-800 dark:bg-slate-900/50">
          <BookOpen className="mx-auto h-5 w-5 sm:h-6 sm:w-6 text-brand-600 dark:text-emerald-400 mb-1.5" />
          <div className="font-mono text-xl sm:text-2xl font-extrabold text-slate-900 dark:text-white">{EXERCISES.length} مسارات</div>
          <p className="mt-0.5 text-[11px] sm:text-xs text-slate-500 dark:text-slate-400">تغطي كامل أساسيات الحوسبة الكمية</p>
        </div>

        <div className="rounded-2xl border border-slate-200 bg-slate-50 p-4 sm:p-5 dark:border-slate-800 dark:bg-slate-900/50">
          <Sigma className="mx-auto h-5 w-5 sm:h-6 sm:w-6 text-gold-600 dark:text-gold-400 mb-1.5" />
          <div className="font-mono text-xl sm:text-2xl font-extrabold text-slate-900 dark:text-white">{TOTAL_QUESTIONS}+ سؤال تفاعلي</div>
          <p className="mt-0.5 text-[11px] sm:text-xs text-slate-500 dark:text-slate-400">مع حلول مفصلة بترميز ديراك الخطوي</p>
        </div>

        <div className="rounded-2xl border border-slate-200 bg-slate-50 p-4 sm:p-5 dark:border-slate-800 dark:bg-slate-900/50">
          <Shield className="mx-auto h-5 w-5 sm:h-6 sm:w-6 text-teal-600 dark:text-teal-400 mb-1.5" />
          <div className="font-mono text-xl sm:text-2xl font-extrabold text-slate-900 dark:text-white">100% تنفيذ محلي</div>
          <p className="mt-0.5 text-[11px] sm:text-xs text-slate-500 dark:text-slate-400">يعمل بالكامل في المتصفح بدون خوادم</p>
        </div>
      </div>
    </div>
  );
}
