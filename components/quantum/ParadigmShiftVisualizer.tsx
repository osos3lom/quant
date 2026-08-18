"use client";

import { useState, useEffect, useRef } from "react";
import { Cpu, Atom, Sparkles } from "lucide-react";
import { KaTeXMath } from "@/components/KaTeXMath";

export function ParadigmShiftVisualizer() {
  const [activeTab, setActiveTab] = useState<"classical" | "quantum">("quantum");
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    let width = (canvas.width = canvas.parentElement?.clientWidth || 600);
    let height = (canvas.height = 200);
    let time = 0;
    let animId: number;

    const isDark = document.documentElement.classList.contains("dark");

    const render = () => {
      time += 0.03;
      ctx.clearRect(0, 0, width, height);

      if (activeTab === "classical") {
        ctx.beginPath();
        ctx.moveTo(20, height / 2 + 35);

        const period = 100;
        for (let x = 20; x < width - 20; x += 2) {
          const cycle = Math.floor((x + time * 60) / period) % 2;
          const y = height / 2 + (cycle === 0 ? 35 : -35);
          ctx.lineTo(x, y);
        }

        ctx.strokeStyle = isDark ? "#A4C5B0" : "#104F09";
        ctx.lineWidth = 3;
        ctx.stroke();

        ctx.font = "bold 12px monospace";
        ctx.fillStyle = isDark ? "#6E9A80" : "#234435";
        ctx.fillText("BIT = 0", 30, height / 2 + 55);
        ctx.fillText("BIT = 1", 130, height / 2 - 45);
      } else {
        ctx.beginPath();
        const cy = height / 2;

        ctx.moveTo(20, cy);
        for (let x = 20; x < width - 20; x += 3) {
          const y = cy + Math.sin(x * 0.025 + time) * 30;
          ctx.lineTo(x, y);
        }
        ctx.strokeStyle = isDark ? "rgba(48, 176, 80, 0.9)" : "rgba(16, 98, 7, 0.95)";
        ctx.lineWidth = 2.5;
        ctx.stroke();

        ctx.beginPath();
        ctx.moveTo(20, cy);
        for (let x = 20; x < width - 20; x += 3) {
          const y = cy + Math.sin(x * 0.025 - time * 1.5 + Math.PI / 3) * 30;
          ctx.lineTo(x, y);
        }
        ctx.strokeStyle = isDark ? "rgba(212, 175, 55, 0.8)" : "rgba(161, 126, 24, 0.85)";
        ctx.lineWidth = 2;
        ctx.setLineDash([4, 4]);
        ctx.stroke();
        ctx.setLineDash([]);

        const grad = ctx.createLinearGradient(0, 0, width, 0);
        grad.addColorStop(0, isDark ? "rgba(48, 176, 80, 0.05)" : "rgba(48, 176, 80, 0.1)");
        grad.addColorStop(0.5, isDark ? "rgba(212, 175, 55, 0.15)" : "rgba(212, 175, 55, 0.2)");
        grad.addColorStop(1, isDark ? "rgba(48, 176, 80, 0.05)" : "rgba(48, 176, 80, 0.1)");

        ctx.fillStyle = grad;
        ctx.fillRect(20, cy - 45, width - 40, 90);
      }

      animId = requestAnimationFrame(render);
    };

    render();

    return () => cancelAnimationFrame(animId);
  }, [activeTab]);

  return (
    <div className="relative overflow-hidden rounded-3xl border border-slate-200 bg-white p-5 sm:p-10 shadow-xl dark:border-slate-800 dark:bg-slate-950">
      <div className="pointer-events-none absolute -top-24 -left-24 h-72 w-72 rounded-full bg-brand-500/10 blur-3xl" />
      <div className="pointer-events-none absolute -bottom-24 -right-24 h-72 w-72 rounded-full bg-gold-400/10 blur-3xl" />

      <div className="flex flex-col items-center text-center">
        <span className="inline-flex items-center gap-1.5 rounded-full border border-emerald-500/30 bg-emerald-500/10 px-3.5 py-1 text-xs font-semibold text-brand-700 dark:text-emerald-400">
          <Sparkles className="h-3.5 w-3.5" />
          تحوّل النموذج الفكري · The Paradigm Shift
        </span>

        <h2 className="mt-4 text-xl font-extrabold text-slate-900 sm:text-3xl lg:text-4xl dark:text-white">
          من ثنائية الترانزستور إلى لاتناهي التراكب
        </h2>
        <p className="mt-2.5 max-w-xl text-xs sm:text-sm lg:text-base leading-relaxed text-slate-600 dark:text-slate-400">
          الحاسوب الكلاسيكي يفحص خياراً واحداً في كل لحظة. الكيوبت يختبر كافة الاحتمالات في وقت واحد.
        </p>

        <div className="mt-6 sm:mt-8 inline-flex rounded-2xl border border-slate-200 bg-slate-100 p-1.5 dark:border-slate-800 dark:bg-slate-900/80 backdrop-blur-md">
          <button
            onClick={() => setActiveTab("classical")}
            className={`flex items-center gap-1.5 sm:gap-2 rounded-xl px-3.5 py-2 sm:px-5 sm:py-2.5 text-xs sm:text-sm font-semibold transition ${
              activeTab === "classical"
                ? "bg-white text-slate-900 shadow-md dark:bg-slate-800 dark:text-slate-200"
                : "text-slate-600 hover:text-slate-900 dark:text-slate-400 dark:hover:text-white"
            }`}
          >
            <Cpu className="h-3.5 w-3.5 sm:h-4 sm:w-4 text-slate-500" />
            الحوسبة الكلاسيكية (Bit)
          </button>
          <button
            onClick={() => setActiveTab("quantum")}
            className={`flex items-center gap-1.5 sm:gap-2 rounded-xl px-3.5 py-2 sm:px-5 sm:py-2.5 text-xs sm:text-sm font-semibold transition ${
              activeTab === "quantum"
                ? "bg-gradient-to-r from-emerald-600 via-brand-600 to-brand-500 text-white shadow-md shadow-emerald-500/20"
                : "text-slate-600 hover:text-slate-900 dark:text-slate-400 dark:hover:text-white"
            }`}
          >
            <Atom className="h-3.5 w-3.5 sm:h-4 sm:w-4 text-gold-400 animate-spin-slow" />
            الحوسبة الكمية (Qubit)
          </button>
        </div>

        <div className="mt-6 sm:mt-8 w-full overflow-hidden rounded-2xl border border-slate-200 bg-slate-50 p-2 sm:p-4 dark:border-slate-800/80 dark:bg-slate-900/40">
          <canvas ref={canvasRef} className="w-full block" />
        </div>

        <div className="mt-5 sm:mt-6 flex w-full max-w-2xl flex-col items-center justify-between gap-3 rounded-2xl border border-slate-200 bg-slate-50 p-4 sm:flex-row sm:px-6 dark:border-slate-800 dark:bg-slate-900/60">
          {activeTab === "classical" ? (
            <div className="w-full text-right">
              <span className="text-xs text-slate-500 font-semibold uppercase dark:text-slate-400">حالة البت الكلاسيكي</span>
              <div className="mt-1 text-slate-800 dark:text-slate-300">
                <KaTeXMath math="x \in \{0, 1\} \implies \text{مستقل ومتسلسل}" display className="my-0 text-xs sm:text-sm" />
              </div>
            </div>
          ) : (
            <div className="w-full text-right">
              <span className="text-xs text-brand-700 font-semibold uppercase dark:text-emerald-400">معادلة حالة الكيوبت (Hilbert Space)</span>
              <div className="mt-1 text-brand-800 dark:text-emerald-300">
                <KaTeXMath
                  math="|\psi\rangle = \alpha|0\rangle + \beta|1\rangle, \qquad |\alpha|^2 + |\beta|^2 = 1"
                  display
                  className="my-0 text-xs sm:text-base"
                />
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
