"use client";

import { useEffect, useRef } from "react";
import { KaTeXMath } from "@/components/KaTeXMath";

interface Particle {
  x: number;
  y: number;
  z: number;
  baseX: number;
  baseY: number;
  baseZ: number;
  speed: number;
  radius: number;
  alpha: number;
  color: string;
  phase: number;
}

export function QuantumHeroCanvas() {
  const containerRef = useRef<HTMLDivElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const container = containerRef.current;
    const canvas = canvasRef.current;
    if (!container || !canvas) return;

    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    let width = container.clientWidth;
    let height = container.clientHeight;
    let animationFrameId: number;
    let isRunning = true;

    let mouseX = 0;
    let mouseY = 0;
    let targetRotX = 0;
    let targetRotY = 0;
    let rotX = 0;
    let rotY = 0;

    const dpr = Math.min(window.devicePixelRatio || 1, 2);

    const setupCanvas = () => {
      width = container.clientWidth;
      height = container.clientHeight;
      canvas.width = width * dpr;
      canvas.height = height * dpr;
      canvas.style.width = `${width}px`;
      canvas.style.height = `${height}px`;
      ctx.scale(dpr, dpr);
    };

    setupCanvas();

    const particleCount = width < 640 ? 110 : 250;
    const particles: Particle[] = [];
    const sphereRadius = Math.min(width, height) * 0.32;

    const colors = [
      "rgba(96, 212, 124, ", 
      "rgba(48, 176, 80, ",  
      "rgba(212, 175, 55, ", 
      "rgba(160, 232, 178, " 
    ];

    for (let i = 0; i < particleCount; i++) {
      const theta = Math.acos(2 * Math.random() - 1);
      const phi = 2 * Math.PI * Math.random();
      const r = sphereRadius * (0.35 + 0.65 * Math.cbrt(Math.random()));

      const x = r * Math.sin(theta) * Math.cos(phi);
      const y = r * Math.sin(theta) * Math.sin(phi);
      const z = r * Math.cos(theta);

      particles.push({
        x,
        y,
        z,
        baseX: x,
        baseY: y,
        baseZ: z,
        speed: 0.005 + Math.random() * 0.015,
        radius: 1.2 + Math.random() * 2.2,
        alpha: 0.35 + Math.random() * 0.55,
        color: colors[Math.floor(Math.random() * colors.length)],
        phase: Math.random() * Math.PI * 2,
      });
    }

    const entangledPairs: [number, number][] = [];
    for (let i = 0; i < particleCount; i += 8) {
      const target = (i + Math.floor(particleCount / 2)) % particleCount;
      entangledPairs.push([i, target]);
    }

    let time = 0;

    const render = () => {
      time += 0.015;
      ctx.clearRect(0, 0, width, height);

      const cx = width / 2;
      const cy = height / 2;

      rotX += (targetRotX - rotX) * 0.05;
      rotY += (targetRotY - rotY) * 0.05;

      const cosX = Math.cos(rotX + time * 0.1);
      const sinX = Math.sin(rotX + time * 0.1);
      const cosY = Math.cos(rotY + time * 0.15);
      const sinY = Math.sin(rotY + time * 0.15);

      const nucleusRadius = 30 + Math.sin(time * 2) * 4;
      const grad = ctx.createRadialGradient(cx, cy, 2, cx, cy, nucleusRadius * 2.5);
      grad.addColorStop(0, "rgba(212, 175, 55, 0.95)");
      grad.addColorStop(0.3, "rgba(48, 176, 80, 0.65)");
      grad.addColorStop(0.7, "rgba(16, 79, 9, 0.2)");
      grad.addColorStop(1, "rgba(0, 0, 0, 0)");

      ctx.beginPath();
      ctx.arc(cx, cy, nucleusRadius * 2.5, 0, Math.PI * 2);
      ctx.fillStyle = grad;
      ctx.fill();

      ctx.beginPath();
      ctx.ellipse(cx, cy, sphereRadius * 0.9, sphereRadius * 0.3, time * 0.2, 0, Math.PI * 2);
      ctx.strokeStyle = "rgba(48, 176, 80, 0.25)";
      ctx.lineWidth = 1;
      ctx.stroke();

      ctx.beginPath();
      ctx.ellipse(cx, cy, sphereRadius * 0.4, sphereRadius * 0.95, -time * 0.15, 0, Math.PI * 2);
      ctx.strokeStyle = "rgba(212, 175, 55, 0.2)";
      ctx.lineWidth = 1;
      ctx.stroke();

      const projected: { x: number; y: number; scale: number; alpha: number; color: string; radius: number }[] = [];

      for (let i = 0; i < particles.length; i++) {
        const p = particles[i];
        
        const wave = Math.sin(time * 2 + p.phase) * 8;
        const currentR = Math.sqrt(p.baseX * p.baseX + p.baseY * p.baseY + p.baseZ * p.baseZ) + wave;
        const scaleRadius = currentR / (sphereRadius || 1);

        const bx = p.baseX * scaleRadius;
        const by = p.baseY * scaleRadius;
        const bz = p.baseZ * scaleRadius;

        let y1 = by * cosX - bz * sinX;
        let z1 = by * sinX + bz * cosX;
        let x1 = bx * cosY + z1 * sinY;
        let z2 = -bx * sinY + z1 * cosY;

        const dx = x1 - mouseX;
        const dy = y1 - mouseY;
        const dist = Math.sqrt(dx * dx + dy * dy);
        if (dist < 120) {
          const force = (120 - dist) / 120;
          x1 += (dx / dist) * force * 20;
          y1 += (dy / dist) * force * 20;
        }

        const perspective = 600 / (600 + z2);
        const px = cx + x1 * perspective;
        const py = cy + y1 * perspective;
        const alpha = Math.max(0.15, (p.alpha * (z2 + sphereRadius * 1.5)) / (sphereRadius * 2.5));

        projected.push({
          x: px,
          y: py,
          scale: perspective,
          alpha,
          color: p.color,
          radius: p.radius * perspective,
        });
      }

      ctx.lineWidth = 0.6;
      for (const [idxA, idxB] of entangledPairs) {
        const pA = projected[idxA];
        const pB = projected[idxB];
        if (!pA || !pB) continue;

        const dist = Math.hypot(pA.x - pB.x, pA.y - pB.y);
        if (dist < sphereRadius * 1.2) {
          const lineAlpha = (1 - dist / (sphereRadius * 1.2)) * 0.3;
          ctx.beginPath();
          ctx.moveTo(pA.x, pA.y);
          ctx.lineTo(pB.x, pB.y);
          ctx.strokeStyle = `rgba(96, 212, 124, ${lineAlpha.toFixed(2)})`;
          ctx.stroke();
        }
      }

      projected.sort((a, b) => a.scale - b.scale);
      for (const p of projected) {
        ctx.beginPath();
        ctx.arc(p.x, p.y, Math.max(0.8, p.radius), 0, Math.PI * 2);
        ctx.fillStyle = `${p.color}${p.alpha.toFixed(2)})`;
        ctx.fill();
      }

      if (isRunning) {
        animationFrameId = requestAnimationFrame(render);
      }
    };

    render();

    const handleMouseMove = (e: MouseEvent) => {
      const rect = canvas.getBoundingClientRect();
      mouseX = e.clientX - rect.left - width / 2;
      mouseY = e.clientY - rect.top - height / 2;
      targetRotY = (mouseX / width) * 0.8;
      targetRotX = -(mouseY / height) * 0.8;
    };

    const handleResize = () => {
      setupCanvas();
    };

    const observer = new IntersectionObserver(([entry]) => {
      isRunning = entry.isIntersecting;
      if (isRunning) {
        render();
      } else {
        cancelAnimationFrame(animationFrameId);
      }
    });

    observer.observe(container);
    window.addEventListener("mousemove", handleMouseMove);
    window.addEventListener("resize", handleResize);

    return () => {
      isRunning = false;
      cancelAnimationFrame(animationFrameId);
      observer.disconnect();
      window.removeEventListener("mousemove", handleMouseMove);
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  return (
    <div
      ref={containerRef}
      className="relative h-[320px] w-full sm:h-[440px] lg:h-[520px] cursor-crosshair select-none overflow-hidden rounded-3xl border border-slate-200 bg-white/40 dark:border-slate-800 dark:bg-slate-900/40 p-2 shadow-xl backdrop-blur-md"
    >
      <canvas ref={canvasRef} className="h-full w-full rounded-2xl" />

      {/* Floating Dirac Superposition Hud Overlay */}
      <div className="absolute top-3 right-3 sm:top-5 sm:right-5 flex items-center gap-1.5 sm:gap-2 rounded-full border border-emerald-500/30 bg-slate-900/90 dark:bg-slate-950/90 px-3 py-1 sm:px-3.5 sm:py-1.5 backdrop-blur-md text-[11px] sm:text-xs font-mono text-emerald-400 shadow-lg">
        <span className="h-2 w-2 rounded-full bg-emerald-400 animate-ping" />
        <KaTeXMath math="|\psi\rangle = \frac{1}{\sqrt{2}}(|0\rangle + |1\rangle)" className="my-0 text-xs sm:text-sm" />
      </div>

      <div className="absolute bottom-3 left-3 sm:bottom-5 sm:left-5 flex items-center gap-2 sm:gap-3 rounded-xl sm:rounded-2xl border border-slate-700/50 bg-slate-900/90 dark:bg-slate-950/90 px-3 py-2 sm:px-4 sm:py-2.5 backdrop-blur-md text-[11px] sm:text-xs text-slate-300 shadow-xl">
        <div className="flex flex-col">
          <span className="text-[9px] sm:text-[10px] text-slate-400 font-semibold uppercase tracking-wider">حالة التراكب (Superposition)</span>
          <span className="font-mono text-emerald-300 font-bold text-xs sm:text-sm">P(0) = 50% · P(1) = 50%</span>
        </div>
      </div>
    </div>
  );
}
