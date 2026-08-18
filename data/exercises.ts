/**
 * data/exercises.ts
 * المدخل الموحّد لقاعدة بيانات التمارين — single entry point for the exercise database.
 * تحتوي المنصة على 6 وحدات تمارين كمية كاملة، كل وحدة بعشرة أسئلة مع الشرح الرياضي وصيغ KaTeX.
 */
import type {
  CategoryId,
  DifficultyId,
  Exercise,
  ExerciseFilters,
  Question,
} from "@/types/quantum";
import { qubitsExercise } from "./modules/qubits";
import { gatesExercise } from "./modules/gates";
import { circuitsExercise } from "./modules/circuits";
import { measurementExercise } from "./modules/measurement";
import { algorithmsExercise } from "./modules/algorithms";
import { qecExercise } from "./modules/qec";
import { DIFFICULTIES, getCategory, getDifficulty } from "./taxonomy";

/** كل وحدات التمارين مرتّبة تصاعدياً حسب الصعوبة المنطقية للتعلّم. */
export const EXERCISES: Exercise[] = [
  qubitsExercise,
  gatesExercise,
  circuitsExercise,
  measurementExercise,
  algorithmsExercise,
  qecExercise,
];

const bySlug = new Map(EXERCISES.map((e) => [e.slug, e]));

/** يعيد تمريناً واحداً بالـ slug، أو undefined إن لم يوجد. */
export function getExerciseBySlug(slug: string): Exercise | undefined {
  return bySlug.get(slug);
}

/** كل المسارات الممكنة — تُستعمل في generateStaticParams للتصدير الثابت. */
export function getAllSlugs(): string[] {
  return EXERCISES.map((e) => e.slug);
}

/** التمرين التالي في الترتيب (للانتقال من شاشة النتيجة). */
export function getNextExercise(slug: string): Exercise | undefined {
  const index = EXERCISES.findIndex((e) => e.slug === slug);
  if (index === -1 || index === EXERCISES.length - 1) return undefined;
  return EXERCISES[index + 1];
}

/** مجموع النقاط الممكنة في تمرين. */
export function getMaxPoints(exercise: Exercise): number {
  return exercise.questions.reduce((sum, q) => sum + q.points, 0);
}

/** عدد التمارين في كل تصنيف. */
export function countByCategory(category: CategoryId): number {
  return EXERCISES.filter((e) => e.category === category).length;
}

/** إجمالي عدد الأسئلة في المنصة. */
export const TOTAL_QUESTIONS = EXERCISES.reduce(
  (sum, e) => sum + e.questions.length,
  0,
);

/** تطبيع نص البحث: يزيل التشكيل ويوحّد الألف والياء والهاء. */
export function normalizeArabic(input: string): string {
  return input
    .trim()
    .toLowerCase()
    .replace(/[ً-ْٰ]/g, "") // التشكيل
    .replace(/[آأإٱ]/g, "ا") // أ إ آ -> ا
    .replace(/ى/g, "ي") // ى -> ي
    .replace(/ة/g, "ه") // ة -> ه
    .replace(/ـ/g, ""); // التطويل
}

/** فلترة التمارين حسب البحث والتصنيف والصعوبة. */
export function filterExercises(
  exercises: Exercise[],
  filters: ExerciseFilters,
): Exercise[] {
  const query = normalizeArabic(filters.query);

  return exercises.filter((exercise) => {
    if (filters.category !== "all" && exercise.category !== filters.category) {
      return false;
    }
    if (filters.difficulty !== "all" && exercise.difficulty !== filters.difficulty) {
      return false;
    }
    if (!query) return true;

    const haystack = normalizeArabic(
      [
        exercise.titleAr,
        exercise.titleEn,
        exercise.summary,
        getCategory(exercise.category).nameAr,
        getCategory(exercise.category).nameEn,
        getDifficulty(exercise.difficulty).nameAr,
        ...exercise.keywords,
        ...exercise.objectives,
        ...exercise.questions.flatMap((q: Question) => q.tags ?? []),
      ].join(" "),
    );

    return haystack.includes(query);
  });
}

/** ترتيب التمارين حسب رتبة الصعوبة ثم العنوان. */
export function sortByDifficulty(exercises: Exercise[]): Exercise[] {
  const rank = new Map<DifficultyId, number>(
    DIFFICULTIES.map((d) => [d.id, d.rank]),
  );
  return [...exercises].sort(
    (a, b) => (rank.get(a.difficulty) ?? 0) - (rank.get(b.difficulty) ?? 0),
  );
}

export { CATEGORIES, DIFFICULTIES, getCategory, getDifficulty } from "./taxonomy";
