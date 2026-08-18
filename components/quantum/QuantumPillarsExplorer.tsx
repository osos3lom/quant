"use client";

import { useState, useEffect, useRef } from "react";
import Link from "next/link";
import { ArrowLeft, Atom, ToggleRight, Workflow, Gauge, Binary, ShieldCheck } from "lucide-react";
import { CATEGORIES } from "@/data/taxonomy";
import { EXERCISES } from "@/data/exercises";
import { KaTeXMath } from "@/components/KaTeXMath";

const ICON_MAP: Record<string, any> = {
  Atom,
  ToggleRight,
  Workflow,
  Gauge,
  Binary,
  ShieldCheck,
};

const FORMULA_MAP: Record<string, string> = {
  qubits: "|\\psi\\rangle = \\alpha|0\\rangle + \\beta|1\\rangle",
  gates: "H = \\frac{1}{\\sqrt{2}}\\begin{pmatrix} 1 & 1 \\\\ 1 & -1 \\end{pmatrix}",
  circuits: "CNOT |10\\rangle = |11\\rangle",
  measurement: "P(x) = |\\langle x | \\psi \\rangle|^2",
  algorithms: "U_{Grover} = (2|s\\rangle\\langle s| - I) R_w",
  qec: "S = \\langle Z_1 Z_2 \\rangle = +1",
};

export function QuantumPillarsExplorer() {
  const [activeCategoryId, setActiveCategoryId] = useState<string>("qubits");
  const canvasRef = useRef<HTMLCanvasElement>(null);

  const activeCategory = CATEGORIES.find((c) => c.id === activeCategoryId) || CATEGORIES[0];
  const activeExercise = EXERCISES.find((item) => item.category === activeCategoryId);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    let width = (canvas.width = canvas.parentElement?.clientWidth || 450);
    let height = (canvas.height = Math.min(width * 0.5, 200));
    let time = 0;
    let animId: number;

    const isDark = document.documentElement.classList.contains("dark");

    const render = () => {
      time += 0.03;
      ctx.clearRect(0, 0, width, height);
      const cx = width / 2;
      const cy = height / 2;

      if (activeCategoryId === "qubits") {
        const r = 55;
        ctx.beginPath();
        ctx.arc(cx, cy, r, 0, Math.PI * 2);
        ctx.strokeStyle = isDark ? "rgba(48, 176, 80, 0.3)" : "rgba(19, 98, 7, 0.3)";
        ctx.stroke();

        const vx = cx + Math.cos(time) * r;
        const vy = cy + Math.sin(time) * (r * 0.4);
        ctx.beginPath();
        ctx.moveTo(cx, cy);
        ctx.lineTo(vx, vy);
        ctx.strokeStyle = isDark ? "#60D47C" : "#136207";
        ctx.lineWidth = 2.5;
        ctx.stroke();

        ctx.beginPath();
        ctx.arc(vx, vy, 5, 0, Math.PI * 2);
        ctx.fillStyle = isDark ? "#D4AF37" : "#A17E18";
        ctx.fill();
      } else if (activeCategoryId === "gates") {
        for (let i = -1; i <= 1; i += 2) {
          for (let j = -1; j <= 1; j += 2) {
            const gx = cx + i * 38;
            const gy = cy + j * 38;

            ctx.beginPath();
            ctx.roundRect(gx - 22, gy - 22, 44, 44, 10);
            ctx.fillStyle = isDark ? "#0E3022" : "#D0F4D8";
            ctx.fill();
            ctx.strokeStyle = isDark ? "#30B050" : "#1C8C28";
            ctx.lineWidth = 1.5;
            ctx.stroke();

            ctx.font = "bold 14px sans-serif";
            ctx.fillStyle = isDark ? "#E8C55F" : "#104F09";
            ctx.textAlign = "center";
            ctx.textBaseline = "middle";
            ctx.fillText(i === -1 ? "H" : "Z", gx, gy);
          }
        }
      } else if (activeCategoryId === "circuits") {
        const rails = [cy - 24, cy + 24];
        for (const ry of rails) {
          ctx.beginPath();
          ctx.moveTo(30, ry);
          ctx.lineTo(width - 30, ry);
          ctx.strokeStyle = isDark ? "rgba(110, 154, 128, 0.3)" : "rgba(78, 119, 98, 0.4)";
          ctx.lineWidth = 2;
          ctx.stroke();
        }

        const pulseX = 30 + ((time * 100) % (width - 60));
        ctx.beginPath();
        ctx.arc(pulseX, rails[0], 6, 0, Math.PI * 2);
        ctx.fillStyle = isDark ? "#60D47C" : "#136207";
        ctx.fill();

        ctx.beginPath();
        ctx.arc(pulseX, rails[1], 6, 0, Math.PI * 2);
        ctx.fillStyle = isDark ? "#D4AF37" : "#A17E18";
        ctx.fill();
      } else if (activeCategoryId === "measurement") {
        const barWidth = 30;
        const heights = [Math.sin(time) * 35 + 50, Math.cos(time) * 35 + 50];
        const colors = isDark ? ["#30B050", "#D4AF37"] : ["#136207", "#A17E18"];

        heights.forEach((h, idx) => {
          const bx = cx + (idx === 0 ? -38 : 10);
          const by = cy + 40 - h;
          ctx.fillStyle = colors[idx];
          ctx.fillRect(bx, by, barWidth, h);
        });
      } else if (activeCategoryId === "algorithms") {
        const bars = 8;
        for (let b = 0; b < bars; b++) {
          const isTarget = b === 3;
          const bh = isTarget ? 75 + Math.sin(time * 4) * 12 : 20;
          const bx = cx - (bars * 16) / 2 + b * 16;
          ctx.fillStyle = isTarget ? (isDark ? "#D4AF37" : "#A17E18") : (isDark ? "#1C8C28" : "#A0E8B2");
          ctx.fillRect(bx, cy + 35 - bh, 10, bh);
        }
      } else {
        const grid = 4;
        for (let r = 0; r < grid; r++) {
          for (let c = 0; c < grid; c++) {
            const gx = cx - (grid * 20) / 2 + c * 20 + 10;
            const gy = cy - (grid * 20) / 2 + r * 20 + 10;
            const active = (r + c + Math.floor(time * 2)) % 2 === 0;

            ctx.beginPath();
            ctx.arc(gx, gy, active ? 5 : 2.5, 0, Math.PI * 2);
            ctx.fillStyle = active ? (isDark ? "#60D47C" : "#136207") : (isDark ? "#234435" : "#CCE3D5");
            ctx.fill();
          }
        }
      }

      animId = requestAnimationFrame(render);
    };

    render();

    return () => cancelAnimationFrame(animId);
  }, [activeCategoryId]);

  return (
    <div className="relative rounded-3xl border border-slate-200 bg-white p-5 sm:p-10 shadow-xl dark:border-slate-800 dark:bg-slate-950">
      <div className="text-center mb-6 sm:mb-8">
        <span className="text-xs font-semibold uppercase tracking-wider text-brand-700 dark:text-emerald-400">
          مسارات المعرفة الكمية · Six Scientific Pillars
        </span>
        <h2 className="mt-2 text-xl font-extrabold text-slate-900 sm:text-3xl lg:text-4xl dark:text-white">
          استكشف أركان الحوسبة الكمية الستة
        </h2>
        <p className="mt-2 text-xs sm:text-sm text-slate-600 dark:text-slate-400">
          كل مسار مصمم ليبني فهمك الرياضي والتطبيقي خطوة بخطوة.
        </p>
      </div>

      {/* Hex Spatial Grid Buttons */}
      <div className="grid grid-cols-2 gap-2 sm:grid-cols-3 lg:grid-cols-6 mb-6 sm:mb-8">
        {CATEGORIES.map((category) => {
          const IconComponent = ICON_MAP[category.icon] || Atom;
          const isActive = category.id === activeCategoryId;
          return (
            <button
              key={category.id}
              onClick={() => setActiveCategoryId(category.id)}
              className={`flex flex-col items-center rounded-2xl p-3 sm:p-4 transition-all duration-300 ${
                isActive
                  ? "border-2 border-brand-500 bg-emerald-50 text-slate-900 shadow-md scale-102 dark:border-emerald-400 dark:bg-slate-900 dark:text-white dark:shadow-emerald-500/20"
                  : "border border-slate-200 bg-slate-50 hover:bg-slate-100 dark:border-slate-800 dark:bg-slate-900/50 dark:hover:bg-slate-900"
              }`}
            >
              <div
                className={`mb-2 flex h-9 w-9 items-center justify-center rounded-xl transition ${
                  isActive
                    ? "bg-brand-600 text-white dark:bg-emerald-500 dark:text-slate-950"
                    : "bg-slate-200 text-slate-700 dark:bg-slate-800 dark:text-emerald-400"
                }`}
              >
                <IconComponent className="h-4 w-4 sm:h-5 sm:w-5" />
              </div>
              <span className="text-[11px] sm:text-xs font-bold text-slate-900 dark:text-slate-200 text-center line-clamp-1">
                {category.nameAr}
              </span>
              <span className="text-[9px] text-slate-500 dark:text-slate-400 font-mono mt-0.5">
                {category.nameEn}
              </span>
            </button>
          );
        })}
      </div>

      {/* Live Pillar Showcase Box */}
      <div className="grid gap-6 lg:grid-cols-12 items-center rounded-2xl border border-slate-200 bg-slate-50 p-5 sm:p-8 dark:border-slate-800 dark:bg-slate-900/70">
        <div className="lg:col-span-7 text-right">
          <div className="flex items-center gap-2">
            <span className="rounded-full border border-emerald-500/30 bg-emerald-500/10 px-3 py-1 text-xs font-semibold text-brand-700 dark:text-emerald-400">
              {activeCategory.nameEn}
            </span>
          </div>

          <h3 className="mt-3 text-xl font-extrabold text-slate-900 sm:text-2xl dark:text-white">
            {activeCategory.nameAr}
          </h3>

          <p className="mt-2 text-xs sm:text-sm leading-relaxed text-slate-600 dark:text-slate-300">
            {activeCategory.descriptionAr}
          </p>

          <div className="mt-4 rounded-xl border border-slate-200 bg-white px-4 py-2.5 dark:border-slate-800 dark:bg-slate-950">
            <KaTeXMath
              math={FORMULA_MAP[activeCategoryId] || "|\\psi\\rangle"}
              display
              className="my-0 text-xs sm:text-sm text-brand-700 dark:text-emerald-300"
            />
          </div>

          <div className="mt-5 sm:mt-6">
            <Link
              href={activeExercise ? `/exercises/${activeExercise.slug}` : "/exercises"}
              className="inline-flex items-center gap-2 rounded-xl bg-slate-900 px-5 py-2.5 sm:px-6 sm:py-3 text-xs sm:text-sm font-semibold text-white transition hover:bg-slate-800 dark:bg-gradient-to-r dark:from-emerald-600 dark:to-brand-500 dark:shadow-emerald-500/20"
            >
              ابدأ هذا المسار العلمي
              <ArrowLeft className="h-4 w-4" />
            </Link>
          </div>
        </div>

        <div className="lg:col-span-5">
          <div className="overflow-hidden rounded-xl border border-slate-200 bg-white p-2 dark:border-emerald-500/20 dark:bg-slate-950 shadow-inner">
            <canvas ref={canvasRef} className="w-full block" />
          </div>
        </div>
      </div>
    </div>
  );
}
