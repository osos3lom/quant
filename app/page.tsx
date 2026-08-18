/**
 * app/page.tsx
 * الصفحة الرئيسية: تجربة تفاعلية وبصرية غامضة وسينمائية للحوسبة الكمية.
 * نمط النقاط الكمية (quantum-grid) يغطي الخلفية بالكامل وبصورة متناسقة دون انقطاع.
 */
import Link from "next/link";
import { ArrowLeft, BookOpen, Sigma, Sparkles } from "lucide-react";
import { EXERCISES, TOTAL_QUESTIONS } from "@/data/exercises";
import { QuantumHeroCanvas } from "@/components/quantum/QuantumHeroCanvas";
import { ParadigmShiftVisualizer } from "@/components/quantum/ParadigmShiftVisualizer";
import { BlochSphereInteractive } from "@/components/quantum/BlochSphereInteractive";
import { QuantumEntanglementCanvas } from "@/components/quantum/QuantumEntanglementCanvas";
import { QuantumPillarsExplorer } from "@/components/quantum/QuantumPillarsExplorer";
import { QuantumProofLab } from "@/components/quantum/QuantumProofLab";
import { QuantumPortalCTA } from "@/components/quantum/QuantumPortalCTA";

export default function HomePage() {
  return (
    <div className="relative min-h-screen">
      {/* Background Dotted Grid Pattern across entire page */}
      <div className="quantum-grid fixed inset-0 pointer-events-none -z-10" aria-hidden="true" />

      {/* 1. HERO SECTION: Enter the Quantum World */}
      <section className="relative px-4 pt-6 pb-14 sm:px-6 sm:pt-14 lg:pt-16">
        <div className="mx-auto max-w-6xl">
          <div className="text-center max-w-3xl mx-auto mb-8 sm:mb-12">
            <span className="inline-flex items-center gap-1.5 sm:gap-2 rounded-full border border-brand-200 bg-brand-50 px-3.5 py-1.5 text-xs font-semibold text-brand-800 dark:border-emerald-500/30 dark:bg-emerald-500/10 dark:text-emerald-300">
              <Sparkles className="h-3.5 w-3.5 text-brand-600 dark:text-emerald-400" />
              منصة تفاعلية عربية بالكامل · {EXERCISES.length} مسارات و {TOTAL_QUESTIONS} سؤالاً
            </span>

            <h1 className="mt-5 text-3xl font-black tracking-tight leading-tight sm:text-5xl lg:text-6xl text-slate-900 dark:text-white">
              أتقن الحوسبة الكمية
              <br />
              <span className="bg-gradient-to-l from-brand-700 via-brand-600 to-brand-500 bg-clip-text text-transparent dark:from-emerald-400 dark:via-brand-300 dark:to-gold-400">
                بالتفاعل والرياضيات المباشرة
              </span>
            </h1>

            <p className="mt-3.5 text-sm sm:text-base lg:text-lg text-slate-600 dark:text-slate-300 leading-relaxed max-w-xl mx-auto">
              تجاوز حدود الحساب الثنائي واستكشف متجهات الحالة والتراكب والتشابك الكمي من خلال تجربة علمية بصرية غامرة.
            </p>

            <div className="mt-6 sm:mt-8 flex flex-col justify-center gap-3 sm:flex-row">
              <Link
                href="/exercises"
                className="inline-flex items-center justify-center gap-2 rounded-xl bg-slate-900 px-7 py-3.5 text-sm font-bold text-white shadow-lg transition hover:bg-slate-800 active:scale-95 dark:bg-gradient-to-r dark:from-emerald-600 dark:via-brand-500 dark:to-brand-400 dark:shadow-emerald-500/25"
              >
                <BookOpen className="h-4 w-4" />
                ابدأ التمارين الكمية
                <ArrowLeft className="h-4 w-4" />
              </Link>
              <Link
                href="/cheatsheet"
                className="inline-flex items-center justify-center gap-2 rounded-xl border border-slate-200 bg-white px-7 py-3.5 text-sm font-semibold text-slate-700 transition hover:bg-slate-100 dark:border-slate-800 dark:bg-slate-900/80 dark:text-slate-200 dark:hover:bg-slate-800"
              >
                <Sigma className="h-4 w-4 text-brand-600 dark:text-gold-400" />
                ملخص القوانين
              </Link>
            </div>
          </div>

          {/* Interactive 3D Quantum Particle Cloud Hero Canvas */}
          <div className="mt-6 sm:mt-8">
            <QuantumHeroCanvas />
          </div>
        </div>
      </section>

      {/* Narrative Story Sections Container */}
      <div className="mx-auto max-w-6xl px-4 space-y-16 sm:space-y-28 lg:space-y-32 sm:px-6 pb-20 sm:pb-28">
        {/* 2. THE PARADIGM SHIFT: Classical vs Quantum */}
        <section className="scroll-mt-24">
          <ParadigmShiftVisualizer />
        </section>

        {/* 3. THE QUANTUM CONCEPT: Superposition & Bloch Sphere */}
        <section className="scroll-mt-24">
          <BlochSphereInteractive />
        </section>

        {/* 4. THE SYSTEM: Entanglement & Circuits */}
        <section className="scroll-mt-24">
          <QuantumEntanglementCanvas />
        </section>

        {/* 5. THE CAPABILITIES: Visualizing the 6 Pillars */}
        <section className="scroll-mt-24">
          <QuantumPillarsExplorer />
        </section>

        {/* 6. THE PROOF: Empirical Dirac Sandbox & Stats */}
        <section className="scroll-mt-24">
          <QuantumProofLab />
        </section>

        {/* 7. FINAL CTA: Transcending Classical Thought */}
        <section className="scroll-mt-24">
          <QuantumPortalCTA />
        </section>
      </div>
    </div>
  );
}
