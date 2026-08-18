/**
 * components/FilterBar.tsx
 * شريط البحث الفوري وفلاتر التصنيف والصعوبة.
 */
"use client";

import { Search, X } from "lucide-react";
import type {
  CategoryFilter,
  DifficultyFilter,
  ExerciseFilters,
} from "@/types/quantum";
import { CATEGORIES, DIFFICULTIES } from "@/data/taxonomy";
import { cn } from "@/lib/utils";

interface FilterBarProps {
  filters: ExerciseFilters;
  onChange: (filters: ExerciseFilters) => void;
  /** عدد التمارين المطابقة حالياً */
  resultCount: number;
}

function Chip({
  active,
  onClick,
  children,
}: {
  active: boolean;
  onClick: () => void;
  children: React.ReactNode;
}) {
  return (
    <button
      type="button"
      onClick={onClick}
      aria-pressed={active}
      className={cn(
        "rounded-full px-3.5 py-1.5 text-sm font-medium transition",
        active
          ? "bg-slate-900 text-white shadow-sm dark:bg-white dark:text-slate-900"
          : "bg-slate-100 text-slate-600 hover:bg-slate-200 dark:bg-slate-800 dark:text-slate-300 dark:hover:bg-slate-700",
      )}
    >
      {children}
    </button>
  );
}

export function FilterBar({ filters, onChange, resultCount }: FilterBarProps) {
  const isFiltered =
    Boolean(filters.query) || filters.category !== "all" || filters.difficulty !== "all";

  return (
    <div className="space-y-4">
      {/* البحث الفوري */}
      <div className="relative">
        <Search className="pointer-events-none absolute start-4 top-1/2 h-4 w-4 -translate-y-1/2 text-slate-400" />
        <input
          type="search"
          value={filters.query}
          onChange={(event) => onChange({ ...filters, query: event.target.value })}
          placeholder="ابحث عن مفهوم كمي: تشابك، هادامارد، كرة بلوخ، غروفر…"
          aria-label="البحث في التمارين"
          className={cn(
            "w-full rounded-2xl border py-3.5 ps-11 pe-4 text-sm outline-none transition",
            "border-slate-200 bg-white text-slate-900 placeholder:text-slate-400",
            "focus:border-sky-400 focus:ring-4 focus:ring-sky-500/10",
            "dark:border-slate-800 dark:bg-slate-900 dark:text-white dark:placeholder:text-slate-500 dark:focus:border-sky-500",
          )}
        />
        {filters.query && (
          <button
            type="button"
            onClick={() => onChange({ ...filters, query: "" })}
            aria-label="مسح البحث"
            className="absolute end-3 top-1/2 -translate-y-1/2 rounded-lg p-1.5 text-slate-400 hover:bg-slate-100 hover:text-slate-600 dark:hover:bg-slate-800"
          >
            <X className="h-4 w-4" />
          </button>
        )}
      </div>

      {/* فلتر التصنيفات */}
      <div>
        <p className="mb-2 text-xs font-semibold uppercase tracking-wide text-slate-500 dark:text-slate-400">
          التصنيف
        </p>
        <div className="flex flex-wrap gap-2">
          <Chip
            active={filters.category === "all"}
            onClick={() => onChange({ ...filters, category: "all" })}
          >
            الكل
          </Chip>
          {CATEGORIES.map((category) => (
            <Chip
              key={category.id}
              active={filters.category === category.id}
              onClick={() =>
                onChange({ ...filters, category: category.id as CategoryFilter })
              }
            >
              {category.nameAr}
            </Chip>
          ))}
        </div>
      </div>

      {/* فلتر الصعوبة */}
      <div>
        <p className="mb-2 text-xs font-semibold uppercase tracking-wide text-slate-500 dark:text-slate-400">
          مستوى الصعوبة
        </p>
        <div className="flex flex-wrap gap-2">
          <Chip
            active={filters.difficulty === "all"}
            onClick={() => onChange({ ...filters, difficulty: "all" })}
          >
            الكل
          </Chip>
          {DIFFICULTIES.map((difficulty) => (
            <Chip
              key={difficulty.id}
              active={filters.difficulty === difficulty.id}
              onClick={() =>
                onChange({ ...filters, difficulty: difficulty.id as DifficultyFilter })
              }
            >
              {difficulty.nameAr}
            </Chip>
          ))}
        </div>
      </div>

      <div className="flex items-center justify-between border-t border-slate-200 pt-3 text-sm dark:border-slate-800">
        <span className="text-slate-600 dark:text-slate-400">
          <span className="font-semibold text-slate-900 tabular-nums dark:text-white">
            {resultCount}
          </span>{" "}
          تمرين مطابق
        </span>
        {isFiltered && (
          <button
            type="button"
            onClick={() => onChange({ query: "", category: "all", difficulty: "all" })}
            className="text-sm font-medium text-sky-600 hover:underline dark:text-sky-400"
          >
            إعادة ضبط الفلاتر
          </button>
        )}
      </div>
    </div>
  );
}
