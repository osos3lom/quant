"use client";

import { useState, useEffect, useRef } from "react";
import { Zap, RefreshCw, GitCommit } from "lucide-react";
import { KaTeXMath, MathText } from "@/components/KaTeXMath";

export function QuantumEntanglementCanvas() {
  const [qubitAState, setQubitAState] = useState<"superposition" | "0" | "1">("superposition");
  const [qubitBState, setQubitBState] = useState<"superposition" | "0" | "1">("superposition");
  const canvasRef = useRef<HTMLCanvasElement>(null);

  const measureState = () => {
    const outcome = Math.random() < 0.5 ? "0" : "1";
    setQubitAState(outcome);
    setQubitBState(outcome);
  };

  const resetState = () => {
    setQubitAState("superposition");
    setQubitBState("superposition");
  };

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    let width = (canvas.width = canvas.parentElement?.clientWidth || 650);
    let height = (canvas.height = Math.min(width * 0.4, 220));
    let time = 0;
    let animId: number;

    const isDark = document.documentElement.classList.contains("dark");

    const render = () => {
      time += 0.04;
      ctx.clearRect(0, 0, width, height);

      const nodeAX = width * 0.22;
      const nodeBX = width * 0.78;
      const cy = height / 2;

      // Energy Threads
      const lineCount = 6;
      for (let i = 0; i < lineCount; i++) {
        ctx.beginPath();
        ctx.moveTo(nodeAX, cy);

        const offset = (i - lineCount / 2) * 10;
        const cp1x = width * 0.4;
        const cp1y = cy + Math.sin(time + i) * 24 + offset;
        const cp2x = width * 0.6;
        const cp2y = cy - Math.cos(time + i * 0.8) * 24 + offset;

        ctx.bezierCurveTo(cp1x, cp1y, cp2x, cp2y, nodeBX, cy);

        const isSuper = qubitAState === "superposition";
        ctx.strokeStyle = isSuper
          ? isDark ? `rgba(96, 212, 124, ${0.18 + Math.sin(time * 2 + i) * 0.1})` : `rgba(48, 176, 80, ${0.25 + Math.sin(time * 2 + i) * 0.1})`
          : qubitAState === "0"
          ? isDark ? "rgba(212, 175, 55, 0.5)" : "rgba(161, 126, 24, 0.6)"
          : isDark ? "rgba(48, 176, 80, 0.7)" : "rgba(19, 98, 7, 0.8)";
        ctx.lineWidth = isSuper ? 1.5 : 2.5;
        ctx.stroke();
      }

      // Pulses
      if (qubitAState === "superposition") {
        for (let p = 0; p < 4; p++) {
          const progress = ((time * 0.6 + p * 0.25) % 1);
          const px = nodeAX + (nodeBX - nodeAX) * progress;
          const py = cy + Math.sin(progress * Math.PI * 3 + time) * 10;

          ctx.beginPath();
          ctx.arc(px, py, 3, 0, Math.PI * 2);
          ctx.fillStyle = isDark ? "#E8C55F" : "#A17E18";
          ctx.fill();
        }
      }

      // Node A
      const radius = width < 480 ? 24 : 30;
      ctx.beginPath();
      ctx.arc(nodeAX, cy, radius, 0, Math.PI * 2);
      ctx.fillStyle = qubitAState === "superposition"
        ? isDark ? "#0E3022" : "#E2F2E9"
        : qubitAState === "0"
        ? isDark ? "#3D2F0C" : "#FAF0D4"
        : isDark ? "#104F09" : "#D0F4D8";
      ctx.fill();
      ctx.strokeStyle = qubitAState === "superposition"
        ? isDark ? "#60D47C" : "#1C8C28"
        : qubitAState === "0"
        ? isDark ? "#D4AF37" : "#A17E18"
        : isDark ? "#30B050" : "#104F09";
      ctx.lineWidth = 2.5;
      ctx.stroke();

      // Node A Label
      ctx.font = `bold ${width < 480 ? 12 : 14}px monospace`;
      ctx.fillStyle = isDark ? "#FFFFFF" : "#052D1E";
      ctx.textAlign = "center";
      ctx.textBaseline = "middle";
      ctx.fillText(qubitAState === "superposition" ? "|ψ_A⟩" : `|${qubitAState}⟩`, nodeAX, cy);

      // Node B
      ctx.beginPath();
      ctx.arc(nodeBX, cy, radius, 0, Math.PI * 2);
      ctx.fillStyle = qubitBState === "superposition"
        ? isDark ? "#0E3022" : "#E2F2E9"
        : qubitBState === "0"
        ? isDark ? "#3D2F0C" : "#FAF0D4"
        : isDark ? "#104F09" : "#D0F4D8";
      ctx.fill();
      ctx.strokeStyle = qubitBState === "superposition"
        ? isDark ? "#60D47C" : "#1C8C28"
        : qubitBState === "0"
        ? isDark ? "#D4AF37" : "#A17E18"
        : isDark ? "#30B050" : "#104F09";
      ctx.lineWidth = 2.5;
      ctx.stroke();

      // Node B Label
      ctx.fillText(qubitBState === "superposition" ? "|ψ_B⟩" : `|${qubitBState}⟩`, nodeBX, cy);

      animId = requestAnimationFrame(render);
    };

    render();

    return () => cancelAnimationFrame(animId);
  }, [qubitAState, qubitBState]);

  return (
    <div className="relative rounded-3xl border border-slate-200 bg-white p-5 sm:p-10 shadow-xl dark:border-slate-800 dark:bg-slate-950">
      <div className="flex flex-col items-center text-center">
        <span className="inline-flex items-center gap-1.5 rounded-full border border-gold-400/30 bg-gold-400/10 px-3.5 py-1 text-xs font-semibold text-gold-700 dark:text-gold-400">
          <GitCommit className="h-3.5 w-3.5" />
          <MathText text="التشابك الكمي المزدوج · Bell State $|\Phi^+\rangle$" />
        </span>

        <h3 className="mt-4 text-xl font-extrabold text-slate-900 sm:text-3xl dark:text-white">
          تأثير لحظي يخترق حدود المسافة Spatial Entanglement
        </h3>
        <p className="mt-2 max-w-xl text-xs sm:text-sm text-slate-600 dark:text-slate-400">
          حين ينشأ التشابك بين كيوبتين، فإن قياس أحدهما يحسم حالة الآخر في نفس اللحظة فورياً.
        </p>

        <div className="mt-6 flex flex-wrap justify-center gap-2.5 sm:gap-3">
          <button
            onClick={measureState}
            className="flex items-center gap-2 rounded-xl bg-slate-900 px-5 py-2.5 sm:px-6 sm:py-3 text-xs sm:text-sm font-semibold text-white shadow-md transition hover:bg-slate-800 active:scale-95 dark:bg-gradient-to-r dark:from-emerald-600 dark:to-brand-500 dark:shadow-emerald-500/20"
          >
            <Zap className="h-4 w-4 text-gold-400" />
            إجراء القياس (Collapse Wavefunction)
          </button>
          <button
            onClick={resetState}
            className="flex items-center gap-2 rounded-xl border border-slate-200 bg-slate-100 px-4 py-2.5 sm:px-5 sm:py-3 text-xs sm:text-sm font-semibold text-slate-700 transition hover:bg-slate-200 dark:border-slate-700 dark:bg-slate-900 dark:text-slate-300 dark:hover:bg-slate-800"
          >
            <RefreshCw className="h-4 w-4 text-slate-500 dark:text-slate-400" />
            إعادة التراكب (Reset Superposition)
          </button>
        </div>

        <div className="mt-6 sm:mt-8 w-full overflow-hidden rounded-2xl border border-slate-200 bg-slate-50 p-2 dark:border-slate-800 dark:bg-slate-900/40">
          <canvas ref={canvasRef} className="w-full block" />
        </div>

        <div className="mt-5 sm:mt-6 flex w-full max-w-xl flex-col sm:flex-row items-center justify-between gap-2 rounded-2xl border border-slate-200 bg-slate-50 px-4 py-3 sm:px-6 text-xs text-slate-700 dark:border-slate-800 dark:bg-slate-900/80 dark:text-slate-300">
          <span className="font-semibold text-slate-600 dark:text-slate-400">حالة بيل (Bell State):</span>
          <div className="text-brand-700 dark:text-emerald-300 font-mono">
            <KaTeXMath
              math="|\Phi^+\rangle = \frac{|00\rangle + |11\rangle}{\sqrt{2}}"
              display
              className="my-0 text-xs sm:text-sm"
            />
          </div>
        </div>
      </div>
    </div>
  );
}
