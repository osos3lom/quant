/**
 * components/ExercisesBrowser.tsx
 * دليل التمارين: بحث فوري + فلاتر + شبكة البطاقات (مكوّن عميل).
 */
"use client";

import { useMemo, useState } from "react";
import { SearchX } from "lucide-react";
import type { Exercise, ExerciseFilters } from "@/types/quantum";
import { filterExercises, sortByDifficulty } from "@/data/exercises";
import { ExerciseCard } from "./ExerciseCard";
import { FilterBar } from "./FilterBar";

const INITIAL_FILTERS: ExerciseFilters = {
  query: "",
  category: "all",
  difficulty: "all",
};

export function ExercisesBrowser({ exercises }: { exercises: Exercise[] }) {
  const [filters, setFilters] = useState<ExerciseFilters>(INITIAL_FILTERS);

  const results = useMemo(
    () => sortByDifficulty(filterExercises(exercises, filters)),
    [exercises, filters],
  );

  return (
    <div className="space-y-7">
      <div className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm dark:border-slate-800 dark:bg-slate-900">
        <FilterBar filters={filters} onChange={setFilters} resultCount={results.length} />
      </div>

      {results.length > 0 ? (
        <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {results.map((exercise) => (
            <ExerciseCard key={exercise.slug} exercise={exercise} />
          ))}
        </div>
      ) : (
        <div className="rounded-2xl border border-dashed border-slate-300 py-16 text-center dark:border-slate-700">
          <SearchX className="mx-auto mb-3 h-9 w-9 text-slate-400" />
          <p className="font-semibold text-slate-900 dark:text-white">
            لا توجد تمارين مطابقة
          </p>
          <p className="mt-1 text-sm text-slate-500 dark:text-slate-400">
            جرّب كلمة مفتاحية أخرى أو أعد ضبط الفلاتر.
          </p>
          <button
            type="button"
            onClick={() => setFilters(INITIAL_FILTERS)}
            className="mt-5 rounded-xl bg-slate-900 px-5 py-2.5 text-sm font-semibold text-white transition hover:bg-slate-700 dark:bg-white dark:text-slate-900 dark:hover:bg-slate-200"
          >
            إعادة ضبط الفلاتر
          </button>
        </div>
      )}
    </div>
  );
}
