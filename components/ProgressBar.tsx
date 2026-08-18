/**
 * components/ProgressBar.tsx
 * شريط تقدّم يدعم الاتجاه RTL (يمتلئ من اليمين إلى اليسار).
 */
import { cn } from "@/lib/utils";
import { clamp } from "@/lib/utils";

interface ProgressBarProps {
  /** النسبة من 0 إلى 100 */
  value: number;
  /** تسمية تُقرأ بقارئ الشاشة */
  label?: string;
  className?: string;
  /** أصناف تدرّج لوني للشريط الممتلئ */
  barClassName?: string;
  size?: "sm" | "md" | "lg";
  /** إظهار النسبة كنص فوق الشريط */
  showValue?: boolean;
}

const sizes = {
  sm: "h-1.5",
  md: "h-2.5",
  lg: "h-3.5",
} as const;

export function ProgressBar({
  value,
  label,
  className,
  barClassName,
  size = "md",
  showValue = false,
}: ProgressBarProps) {
  const pct = clamp(Math.round(value), 0, 100);

  return (
    <div className={cn("w-full", className)}>
      {(label || showValue) && (
        <div className="mb-1.5 flex items-center justify-between text-xs font-medium text-slate-600 dark:text-slate-400">
          {label && <span>{label}</span>}
          {showValue && <span className="tabular-nums">{pct}%</span>}
        </div>
      )}
      <div
        role="progressbar"
        aria-valuenow={pct}
        aria-valuemin={0}
        aria-valuemax={100}
        aria-label={label}
        className={cn(
          "w-full overflow-hidden rounded-full bg-slate-200/80 dark:bg-brand-800/60",
          sizes[size],
        )}
      >
        <div
          className={cn(
            "h-full rounded-full transition-[width] duration-500 ease-out",
            "bg-gradient-to-l from-brand-600 to-brand-400",
            barClassName,
          )}
          style={{ width: `${pct}%` }}
        />
      </div>
    </div>
  );
}
