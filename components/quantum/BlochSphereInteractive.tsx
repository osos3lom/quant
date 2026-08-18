"use client";

import { useState, useEffect, useRef } from "react";
import { KaTeXMath, MathText } from "@/components/KaTeXMath";

export function BlochSphereInteractive() {
  const [theta, setTheta] = useState<number>(Math.PI / 2);
  const [phi, setPhi] = useState<number>(0);
  const canvasRef = useRef<HTMLCanvasElement>(null);

  const p0 = Math.pow(Math.cos(theta / 2), 2);
  const p1 = Math.pow(Math.sin(theta / 2), 2);

  const applyPreset = (presetTheta: number, presetPhi: number) => {
    setTheta(presetTheta);
    setPhi(presetPhi);
  };

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    const isDark = document.documentElement.classList.contains("dark");

    const width = (canvas.width = canvas.parentElement?.clientWidth || 360);
    const height = (canvas.height = Math.min(width * 0.85, 320));
    const cx = width / 2;
    const cy = height / 2;
    const radius = Math.min(width, height) * 0.36;

    ctx.clearRect(0, 0, width, height);

    // Sphere background fill
    const sphereGrad = ctx.createRadialGradient(cx, cy, radius * 0.1, cx, cy, radius);
    sphereGrad.addColorStop(0, isDark ? "rgba(48, 176, 80, 0.15)" : "rgba(48, 176, 80, 0.12)");
    sphereGrad.addColorStop(0.7, isDark ? "rgba(16, 79, 9, 0.08)" : "rgba(200, 240, 210, 0.2)");
    sphereGrad.addColorStop(1, isDark ? "rgba(2, 14, 8, 0.4)" : "rgba(240, 250, 244, 0.6)");

    ctx.beginPath();
    ctx.arc(cx, cy, radius, 0, Math.PI * 2);
    ctx.fillStyle = sphereGrad;
    ctx.fill();
    ctx.strokeStyle = isDark ? "rgba(48, 176, 80, 0.35)" : "rgba(19, 98, 7, 0.35)";
    ctx.lineWidth = 1.5;
    ctx.stroke();

    // Equator ellipse
    ctx.beginPath();
    ctx.ellipse(cx, cy, radius, radius * 0.35, 0, 0, Math.PI * 2);
    ctx.strokeStyle = isDark ? "rgba(96, 212, 124, 0.3)" : "rgba(48, 176, 80, 0.4)";
    ctx.lineWidth = 1;
    ctx.setLineDash([3, 3]);
    ctx.stroke();
    ctx.setLineDash([]);

    // Axes Z
    ctx.beginPath();
    ctx.moveTo(cx, cy - radius - 15);
    ctx.lineTo(cx, cy + radius + 15);
    ctx.strokeStyle = isDark ? "rgba(212, 175, 55, 0.6)" : "rgba(161, 126, 24, 0.8)";
    ctx.lineWidth = 1.5;
    ctx.stroke();

    // Axes X & Y
    ctx.beginPath();
    ctx.moveTo(cx - radius - 15, cy);
    ctx.lineTo(cx + radius + 15, cy);
    ctx.strokeStyle = isDark ? "rgba(110, 154, 128, 0.4)" : "rgba(78, 119, 98, 0.4)";
    ctx.lineWidth = 1;
    ctx.stroke();

    // Axis Labels
    ctx.font = "bold 13px sans-serif";
    ctx.fillStyle = isDark ? "#D4AF37" : "#7D6114";
    ctx.fillText("|0⟩", cx - 8, cy - radius - 18);
    ctx.fillText("|1⟩", cx - 8, cy + radius + 25);

    ctx.fillStyle = isDark ? "#60D47C" : "#136207";
    ctx.fillText("|+⟩", cx + radius + 18, cy + 4);
    ctx.fillText("|-⟩", cx - radius - 30, cy + 4);

    const vecX = radius * Math.sin(theta) * Math.cos(phi);
    const vecZ = radius * Math.sin(theta) * Math.sin(phi);
    const vecY = -radius * Math.cos(theta);

    const projX = cx + vecX + vecZ * 0.3;
    const projY = cy + vecY + vecZ * 0.15;

    // Vector line
    ctx.beginPath();
    ctx.moveTo(cx, cy);
    ctx.lineTo(projX, projY);
    ctx.strokeStyle = isDark ? "#60D47C" : "#136207";
    ctx.lineWidth = 3;
    ctx.stroke();

    // Vector tip glow
    const tipGrad = ctx.createRadialGradient(projX, projY, 1, projX, projY, 10);
    tipGrad.addColorStop(0, "#FFFFFF");
    tipGrad.addColorStop(0.4, isDark ? "#60D47C" : "#30B050");
    tipGrad.addColorStop(1, "rgba(96, 212, 124, 0)");

    ctx.beginPath();
    ctx.arc(projX, projY, 10, 0, Math.PI * 2);
    ctx.fillStyle = tipGrad;
    ctx.fill();

    ctx.beginPath();
    ctx.arc(projX, projY, 4.5, 0, Math.PI * 2);
    ctx.fillStyle = "#FFFFFF";
    ctx.fill();
  }, [theta, phi]);

  return (
    <div className="relative rounded-2xl sm:rounded-3xl border border-slate-200 bg-white p-4 sm:p-8 shadow-xl dark:border-slate-800 dark:bg-slate-950">
      <div className="grid gap-6 lg:grid-cols-12 lg:items-center">
        {/* Left Column: Controls & Mathematics */}
        <div className="flex flex-col space-y-4 sm:space-y-6 lg:col-span-6 text-right">
          <div>
            <span className="text-[11px] sm:text-xs font-semibold uppercase tracking-wider text-brand-700 dark:text-gold-400">
              كرة بلوخ التفاعلية · Bloch Sphere Hilbert Space
            </span>
            <h3 className="mt-1.5 text-lg font-extrabold text-slate-900 sm:text-2xl lg:text-3xl dark:text-white">
              <MathText text="تصفّح متجه الحالة الكمية $|\psi\rangle$" />
            </h3>
            <p className="mt-1.5 text-xs sm:text-sm leading-relaxed text-slate-600 dark:text-slate-400">
              <MathText text="حرك زاوية القطب $\theta$ والطور $\phi$ لتشاهد تراكب المتجه في الفضاء الثلاثي الأبعاد وسعة الاحتمال." />
            </p>
          </div>

          {/* Presets */}
          <div className="flex flex-wrap gap-1.5 sm:gap-2">
            {[
              { label: "|0⟩", note: "أرضي", t: 0, p: 0 },
              { label: "|1⟩", note: "مثار", t: Math.PI, p: 0 },
              { label: "|+⟩", note: "هادامارد", t: Math.PI / 2, p: 0 },
              { label: "|-⟩", note: "عكس", t: Math.PI / 2, p: Math.PI },
              { label: "|i⟩", note: "تخيلي", t: Math.PI / 2, p: Math.PI / 2 },
            ].map((item, idx) => (
              <button
                key={idx}
                onClick={() => applyPreset(item.t, item.p)}
                className="flex items-center gap-1 rounded-lg sm:rounded-xl border border-slate-200 bg-slate-50 px-2.5 py-1 sm:px-3 sm:py-1.5 text-xs transition hover:border-brand-500 dark:border-slate-700 dark:bg-slate-900 dark:hover:border-gold-400"
              >
                <span dir="ltr" className="font-mono font-bold text-brand-700 dark:text-gold-400 text-xs">
                  {item.label}
                </span>
                <span className="text-[10px] text-slate-500 dark:text-slate-400">({item.note})</span>
              </button>
            ))}
          </div>

          {/* Sliders */}
          <div className="space-y-3 rounded-xl sm:rounded-2xl border border-slate-200 bg-slate-50 p-3 sm:p-4 dark:border-slate-800 dark:bg-slate-900/60">
            <div>
              <div className="flex items-center justify-between text-xs text-slate-700 dark:text-slate-300 mb-1">
                <KaTeXMath math={`\\theta = ${((theta * 180) / Math.PI).toFixed(0)}^\\circ`} className="my-0 text-xs font-mono" />
                <MathText text="زاوية القطب $\\theta$" className="text-xs" />
              </div>
              <input
                type="range"
                min="0"
                max={Math.PI}
                step="0.01"
                value={theta}
                onChange={(e) => setTheta(parseFloat(e.target.value))}
                className="w-full accent-brand-600 dark:accent-emerald-500 cursor-pointer"
              />
            </div>

            <div>
              <div className="flex items-center justify-between text-xs text-slate-700 dark:text-slate-300 mb-1">
                <KaTeXMath math={`\\phi = ${((phi * 180) / Math.PI).toFixed(0)}^\\circ`} className="my-0 text-xs font-mono" />
                <MathText text="زاوية الطور $\\phi$" className="text-xs" />
              </div>
              <input
                type="range"
                min="0"
                max={Math.PI * 2}
                step="0.01"
                value={phi}
                onChange={(e) => setPhi(parseFloat(e.target.value))}
                className="w-full accent-gold-500 dark:accent-gold-400 cursor-pointer"
              />
            </div>
          </div>

          {/* Probability Cards (Mobile Compact Layout) */}
          <div className="grid grid-cols-2 gap-2 text-right">
            <div className="rounded-xl border border-slate-200 bg-slate-50 p-2.5 sm:p-3 dark:border-slate-800 dark:bg-slate-900/90">
              <div className="flex items-center justify-between">
                <span className="text-[10px] sm:text-xs text-slate-500 font-semibold dark:text-slate-400">احتمالية القياس</span>
                <KaTeXMath math="|0\rangle" className="my-0 text-[11px] font-mono text-gold-600 dark:text-gold-400" />
              </div>
              <div className="mt-1 font-mono text-sm sm:text-lg font-bold text-gold-600 dark:text-gold-400">
                {(p0 * 100).toFixed(1)}%
              </div>
              <div className="mt-1 h-1.5 w-full rounded-full bg-slate-200 dark:bg-slate-800 overflow-hidden">
                <div
                  className="h-full bg-gold-500 dark:bg-gold-400 transition-all duration-300"
                  style={{ width: `${p0 * 100}%` }}
                />
              </div>
            </div>

            <div className="rounded-xl border border-slate-200 bg-slate-50 p-2.5 sm:p-3 dark:border-slate-800 dark:bg-slate-900/90">
              <div className="flex items-center justify-between">
                <span className="text-[10px] sm:text-xs text-slate-500 font-semibold dark:text-slate-400">احتمالية القياس</span>
                <KaTeXMath math="|1\rangle" className="my-0 text-[11px] font-mono text-brand-600 dark:text-emerald-400" />
              </div>
              <div className="mt-1 font-mono text-sm sm:text-lg font-bold text-brand-600 dark:text-emerald-400">
                {(p1 * 100).toFixed(1)}%
              </div>
              <div className="mt-1 h-1.5 w-full rounded-full bg-slate-200 dark:bg-slate-800 overflow-hidden">
                <div
                  className="h-full bg-brand-600 dark:bg-emerald-400 transition-all duration-300"
                  style={{ width: `${p1 * 100}%` }}
                />
              </div>
            </div>
          </div>
        </div>

        {/* Right Column: Interactive 3D Sphere Canvas */}
        <div className="relative flex items-center justify-center lg:col-span-6 w-full max-w-full overflow-hidden">
          <div className="w-full overflow-hidden rounded-xl border border-slate-200 bg-slate-50 p-1.5 dark:border-emerald-500/20 dark:bg-slate-900/40 shadow-inner">
            <canvas ref={canvasRef} className="mx-auto block max-w-full" />
          </div>
        </div>
      </div>
    </div>
  );
}
