/**
 * lib/progress.ts
 * تخزين التقدّم محلياً في localStorage مع مخزن صغير قابل للاشتراك.
 * Local progress store (localStorage) with a tiny subscribable store for React.
 */
"use client";

import type { LessonProgressEntry, TrackId } from "@/types/lessons";
import type {
  AttemptRecord,
  ExerciseProgress,
  ExerciseResult,
  ProgressState,
} from "@/types/quantum";
import { daysBetween, todayKey } from "./utils";

export const STORAGE_KEY = "quantum-exercises:progress:v1";
const MAX_HISTORY = 30;

/** الحالة الابتدائية الفارغة. */
export function emptyProgress(): ProgressState {
  return {
    version: 1,
    lessons: {},
    xp: 0,
    dayStreak: 0,
    bestDayStreak: 0,
    lastActiveDay: null,
    totalCorrect: 0,
    totalAnswered: 0,
    exercises: {},
    history: [],
  };
}

/* ------------------------------------------------------------------ */
/* المخزن — subscribable store                                         */
/* ------------------------------------------------------------------ */

let cache: ProgressState | null = null;
const listeners = new Set<() => void>();

function isBrowser(): boolean {
  return typeof window !== "undefined";
}

/** قراءة الحالة من التخزين المحلي مع التحقق من صحتها. */
export function loadProgress(): ProgressState {
  if (!isBrowser()) return emptyProgress();
  if (cache) return cache;

  try {
    const raw = window.localStorage.getItem(STORAGE_KEY);
    if (!raw) {
      cache = emptyProgress();
      return cache;
    }
    const parsed = JSON.parse(raw) as Partial<ProgressState>;
    cache = { ...emptyProgress(), ...parsed };
    if (typeof cache.exercises !== "object" || cache.exercises === null) {
      cache.exercises = {};
    }
    // الحقل أُضيف بعد الإصدار الأول، فقد تكون النسخة المحفوظة بلا دروس
    if (typeof cache.lessons !== "object" || cache.lessons === null) {
      cache.lessons = {};
    }
    if (!Array.isArray(cache.history)) cache.history = [];
    return cache;
  } catch {
    cache = emptyProgress();
    return cache;
  }
}

function commit(next: ProgressState): ProgressState {
  cache = next;
  if (isBrowser()) {
    try {
      window.localStorage.setItem(STORAGE_KEY, JSON.stringify(next));
    } catch {
      /* التخزين ممتلئ أو محظور — نتجاهل بصمت */
    }
  }
  listeners.forEach((listener) => listener());
  return next;
}

/** الاشتراك في تغيّرات التقدّم (يُستعمل مع useSyncExternalStore). */
export function subscribe(listener: () => void): () => void {
  listeners.add(listener);
  if (isBrowser()) {
    const onStorage = (event: StorageEvent) => {
      if (event.key === STORAGE_KEY) {
        cache = null;
        listener();
      }
    };
    window.addEventListener("storage", onStorage);
    return () => {
      listeners.delete(listener);
      window.removeEventListener("storage", onStorage);
    };
  }
  return () => listeners.delete(listener);
}

/** لقطة الحالة الحالية (مرجع ثابت ما لم تتغيّر). */
export function getSnapshot(): ProgressState {
  return loadProgress();
}

/** لقطة الخادم أثناء التصيير المسبق — دائماً فارغة. */
const SERVER_SNAPSHOT = emptyProgress();
export function getServerSnapshot(): ProgressState {
  return SERVER_SNAPSHOT;
}

/* ------------------------------------------------------------------ */
/* عمليات التحديث — mutations                                          */
/* ------------------------------------------------------------------ */

/** تحديث سلسلة الأيام المتتالية بناءً على تاريخ اليوم. */
function withDayStreak(state: ProgressState): ProgressState {
  const today = todayKey();
  if (state.lastActiveDay === today) return state;

  let dayStreak = 1;
  if (state.lastActiveDay) {
    const gap = daysBetween(state.lastActiveDay, today);
    dayStreak = gap === 1 ? state.dayStreak + 1 : gap <= 0 ? state.dayStreak : 1;
  }

  return {
    ...state,
    dayStreak,
    bestDayStreak: Math.max(state.bestDayStreak, dayStreak),
    lastActiveDay: today,
  };
}

/** تسجيل تقدّم أثناء الحل (بعد كل سؤال) دون إنهاء التمرين. */
export function recordAnswer(params: {
  slug: string;
  total: number;
  correct: boolean;
  points: number;
}): ProgressState {
  const state = withDayStreak(loadProgress());
  const previous = state.exercises[params.slug];

  const next: ExerciseProgress = {
    slug: params.slug,
    bestAccuracy: previous?.bestAccuracy ?? 0,
    lastAccuracy: previous?.lastAccuracy ?? 0,
    answered: (previous?.answered ?? 0) + 1,
    total: params.total,
    attempts: previous?.attempts ?? 0,
    bestPoints: previous?.bestPoints ?? 0,
    completed: previous?.completed ?? false,
    bestStreak: previous?.bestStreak ?? 0,
    updatedAt: new Date().toISOString(),
  };

  return commit({
    ...state,
    xp: state.xp + (params.correct ? params.points : 0),
    totalCorrect: state.totalCorrect + (params.correct ? 1 : 0),
    totalAnswered: state.totalAnswered + 1,
    exercises: { ...state.exercises, [params.slug]: next },
  });
}

/** تصفير عدّاد الأسئلة المُجابة عند بدء محاولة جديدة. */
export function startAttempt(slug: string, total: number): ProgressState {
  const state = loadProgress();
  const previous = state.exercises[slug];
  const next: ExerciseProgress = {
    slug,
    bestAccuracy: previous?.bestAccuracy ?? 0,
    lastAccuracy: previous?.lastAccuracy ?? 0,
    answered: 0,
    total,
    attempts: previous?.attempts ?? 0,
    bestPoints: previous?.bestPoints ?? 0,
    completed: previous?.completed ?? false,
    bestStreak: previous?.bestStreak ?? 0,
    updatedAt: new Date().toISOString(),
  };
  return commit({ ...state, exercises: { ...state.exercises, [slug]: next } });
}

/** تسجيل نتيجة نهائية عند إنهاء التمرين. */
export function completeExercise(
  slug: string,
  titleAr: string,
  result: ExerciseResult,
): ProgressState {
  const state = withDayStreak(loadProgress());
  const previous = state.exercises[slug];

  const next: ExerciseProgress = {
    slug,
    bestAccuracy: Math.max(previous?.bestAccuracy ?? 0, result.accuracy),
    lastAccuracy: result.accuracy,
    answered: result.total,
    total: result.total,
    attempts: (previous?.attempts ?? 0) + 1,
    bestPoints: Math.max(previous?.bestPoints ?? 0, result.points),
    completed: true,
    bestStreak: Math.max(previous?.bestStreak ?? 0, result.bestStreak),
    updatedAt: new Date().toISOString(),
  };

  const record: AttemptRecord = {
    slug,
    titleAr,
    correct: result.correct,
    total: result.total,
    points: result.points,
    accuracy: result.accuracy,
    seconds: result.seconds,
    at: new Date().toISOString(),
  };

  return commit({
    ...state,
    exercises: { ...state.exercises, [slug]: next },
    history: [record, ...state.history].slice(0, MAX_HISTORY),
  });
}

/** حذف كل بيانات التقدّم. */
export function resetProgress(): ProgressState {
  return commit(emptyProgress());
}

/* ------------------------------------------------------------------ */
/* دفاتر الدروس — lesson notebooks                                     */
/* ------------------------------------------------------------------ */

/** مفتاح التخزين لدفتر واحد. */
export function lessonKey(track: TrackId, slug: string): string {
  return `${track}/${slug}`;
}

function lessonEntry(
  state: ProgressState,
  track: TrackId,
  slug: string,
): LessonProgressEntry {
  return (
    state.lessons[lessonKey(track, slug)] ?? {
      slug,
      track,
      ranCells: [],
      solvedExercises: [],
      completed: false,
      updatedAt: new Date().toISOString(),
    }
  );
}

/** يسجّل تشغيل خلية كود داخل دفتر. */
export function recordCellRun(
  track: TrackId,
  slug: string,
  cellId: string,
): ProgressState {
  const state = withDayStreak(loadProgress());
  const entry = lessonEntry(state, track, slug);
  if (entry.ranCells.includes(cellId)) return commit(state);

  const next: LessonProgressEntry = {
    ...entry,
    ranCells: [...entry.ranCells, cellId],
    updatedAt: new Date().toISOString(),
  };

  return commit({
    ...state,
    lessons: { ...state.lessons, [lessonKey(track, slug)]: next },
  });
}

/** يسجّل حل تمرين داخل دفتر ويمنح نقاط الخبرة مرة واحدة فقط. */
export function recordExerciseSolved(
  track: TrackId,
  slug: string,
  cellId: string,
  points: number,
): ProgressState {
  const state = withDayStreak(loadProgress());
  const entry = lessonEntry(state, track, slug);
  if (entry.solvedExercises.includes(cellId)) return commit(state);

  const next: LessonProgressEntry = {
    ...entry,
    solvedExercises: [...entry.solvedExercises, cellId],
    updatedAt: new Date().toISOString(),
  };

  return commit({
    ...state,
    xp: state.xp + points,
    lessons: { ...state.lessons, [lessonKey(track, slug)]: next },
  });
}

/** يعلّم الدفتر مكتملاً. */
export function markNotebookCompleted(track: TrackId, slug: string): ProgressState {
  const state = withDayStreak(loadProgress());
  const entry = lessonEntry(state, track, slug);
  // لا نُخطر المشتركين إن لم يتغيّر شيء، كي لا تتكرّر دورة التصيير
  if (entry.completed) return state;

  return commit({
    ...state,
    lessons: {
      ...state.lessons,
      [lessonKey(track, slug)]: {
        ...entry,
        completed: true,
        updatedAt: new Date().toISOString(),
      },
    },
  });
}

/**
 * نسبة إنجاز دفتر واحد (0–100):
 * تُحتسب من خلايا الكود المُشغَّلة والتمارين المحلولة معاً.
 */
export function notebookCompletion(
  state: ProgressState,
  track: TrackId,
  slug: string,
  totalRunnable: number,
  totalExercises: number,
): number {
  const entry = state.lessons[lessonKey(track, slug)];
  if (!entry) return 0;
  const total = totalRunnable + totalExercises;
  if (!total) return entry.completed ? 100 : 0;
  const done = entry.ranCells.length + entry.solvedExercises.length;
  return Math.min(100, Math.round((done / total) * 100));
}

/* ------------------------------------------------------------------ */
/* اشتقاقات — derived values                                           */
/* ------------------------------------------------------------------ */

/** نسبة إنجاز تمرين واحد (0–100). */
export function exerciseCompletion(
  state: ProgressState,
  slug: string,
  total: number,
): number {
  const entry = state.exercises[slug];
  if (!entry) return 0;
  if (entry.completed) return Math.max(entry.bestAccuracy, 0);
  if (!total) return 0;
  return Math.round((entry.answered / total) * 100);
}

/** الدقة الكلية عبر كل التمارين (0–100). */
export function overallAccuracy(state: ProgressState): number {
  if (!state.totalAnswered) return 0;
  return Math.round((state.totalCorrect / state.totalAnswered) * 100);
}

/** المستوى المشتق من نقاط الخبرة: كل 500 نقطة مستوى. */
export function levelFromXp(xp: number): { level: number; progress: number } {
  const level = Math.floor(xp / 500) + 1;
  const progress = Math.round(((xp % 500) / 500) * 100);
  return { level, progress };
}
