/**
 * data/lessons/index.ts
 * المدخل الموحّد لمنصة الدروس: المسارات الثلاثة ودفاترها ودوال البحث والتنقّل.
 * Single entry point for the lessons platform: the three tracks, their notebooks, and helpers.
 */
import type { Notebook, Stage, Track, TrackId } from "@/types/lessons";
import { bronzePythonNotebooks } from "./bronze-python";
import { bronzeAlgebraNotebooks } from "./bronze-algebra";
import { bronzeNumpyNotebooks } from "./bronze-numpy";
import { silverNotebooks } from "./silver";
import { goldNotebooks } from "./gold";

/* ------------------------------------------------------------------ */
/* المسارات الثلاثة                                                    */
/* ------------------------------------------------------------------ */

export const TRACKS: Track[] = [
  {
    id: "bronze",
    nameAr: "المستوى البرونزي",
    nameEn: "Bronze Level",
    codeName: "QPrep",
    tagline: "التحضيري: بايثون والجبر الخطي",
    description:
      "نقطة الانطلاق لكل متدرّب، وهو مقسّم إلى مرحلتين: الأولى تغطّي المادة الأصلية كاملة ببايثون الصِرف من دفاتر Jupyter إلى الضرب التنسوري، والثانية تعيد بناء العمليات نفسها بأدوات numpy تمهيداً للمستوى الفضي.",
    icon: "Sprout",
    gradient: "from-brand-600 to-brand-400",
    badgeClass:
      "bg-brand-100 text-brand-700 dark:bg-brand-500/15 dark:text-brand-300 ring-brand-500/25",
    order: 1,
    estimatedHours: 6,
    prerequisites: ["لا يتطلّب أي خبرة برمجية سابقة"],
  },
  {
    id: "silver",
    nameAr: "المستوى الفضي",
    nameEn: "Silver Level",
    codeName: "QSilver",
    tagline: "الكيوبتات والبوابات والتشابك",
    description:
      "من المتجه المطبَّع إلى الكيوبت الحقيقي: التراكب، البوابات الأحادية، كرة بلوخ، ثم بوابات التحكّم وحالات بيل المتشابكة — كل ذلك ببرمجة عملية في المتصفح.",
    icon: "Atom",
    gradient: "from-brand-700 to-brand-500",
    badgeClass:
      "bg-brand-200 text-brand-800 dark:bg-brand-600/25 dark:text-brand-200 ring-brand-600/30",
    order: 2,
    estimatedHours: 4,
    prerequisites: ["إتمام المستوى البرونزي أو إتقان الجبر الخطي الأساسي"],
  },
  {
    id: "gold",
    nameAr: "المستوى الذهبي",
    nameEn: "Gold Level",
    codeName: "QGold",
    tagline: "الخوارزميات وتصحيح الأخطاء",
    description:
      "الخوارزميات التي تمنح الحوسبة الكمية قوّتها: غروفر للبحث، ارتداد الطور وتقدير الطور الذي تقوم عليه خوارزمية شور، ثم أكواد تصحيح الأخطاء التي تجعل كل هذا ممكناً عملياً.",
    icon: "Trophy",
    gradient: "from-brand-800 to-brand-600",
    badgeClass:
      "bg-brand-700 text-white dark:bg-brand-600 dark:text-white ring-brand-700/40",
    order: 3,
    estimatedHours: 5,
    prerequisites: ["إتمام المستوى الفضي", "معرفة بالأعداد العقدية والمصفوفات"],
  },
];

/* ------------------------------------------------------------------ */
/* الدفاتر                                                             */
/* ------------------------------------------------------------------ */

/** كل دفاتر المنصة مرتّبة حسب المسار ثم الترتيب الداخلي. */
export const NOTEBOOKS: Notebook[] = [
  ...bronzePythonNotebooks,
  ...bronzeAlgebraNotebooks,
  ...bronzeNumpyNotebooks,
  ...silverNotebooks,
  ...goldNotebooks,
].sort((a, b) => a.order - b.order);

/* ------------------------------------------------------------------ */
/* المراحل داخل المستوى البرونزي                                       */
/* ------------------------------------------------------------------ */

export const STAGES: Stage[] = [
  {
    id: 1,
    trackId: "bronze",
    nameAr: "المرحلة الأولى: بايثون والجبر الخطي",
    nameEn: "Stage 1 — Python & Linear Algebra",
    description:
      "المادة الأصلية كاملة ببايثون الصِرف: من دفاتر Jupyter إلى الضرب التنسوري، بلا أي مكتبات عددية، كما وردت في منهج QPrep.",
    icon: "Sprout",
  },
  {
    id: 2,
    trackId: "bronze",
    nameAr: "المرحلة الثانية: الأدوات العددية (numpy)",
    nameEn: "Stage 2 — Numerical Tools (numpy)",
    description:
      "بعد إتقان البناء اليدوي، نعيد العمليات نفسها بأدوات numpy ونقارن النتائج، تمهيداً للانتقال إلى المستوى الفضي.",
    icon: "Atom",
  },
];

/** مراحل مسار معيّن مرتّبة. */
export function getStages(track: TrackId): Stage[] {
  return STAGES.filter((stage) => stage.trackId === track).sort((a, b) => a.id - b.id);
}

/** دفاتر مرحلة واحدة داخل مسار. */
export function getNotebooksByStage(track: TrackId, stage: number): Notebook[] {
  return getNotebooksByTrack(track).filter((notebook) => notebook.stage === stage);
}

const trackMap = new Map(TRACKS.map((track) => [track.id, track]));

export function getTrack(id: TrackId): Track | undefined {
  return trackMap.get(id);
}

/** دفاتر مسار واحد مرتّبة. */
export function getNotebooksByTrack(track: TrackId): Notebook[] {
  return NOTEBOOKS.filter((notebook) => notebook.track === track).sort(
    (a, b) => a.order - b.order,
  );
}

/** دفتر واحد بمساره ومُعرّفه. */
export function getNotebook(track: TrackId, slug: string): Notebook | undefined {
  return NOTEBOOKS.find(
    (notebook) => notebook.track === track && notebook.slug === slug,
  );
}

/** الدفتر التالي داخل المسار نفسه. */
export function getNextNotebook(track: TrackId, slug: string): Notebook | undefined {
  const list = getNotebooksByTrack(track);
  const index = list.findIndex((notebook) => notebook.slug === slug);
  if (index === -1 || index === list.length - 1) return undefined;
  return list[index + 1];
}

/** كل الأزواج (مسار، دفتر) — تُستعمل في generateStaticParams. */
export function getAllLessonParams(): { track: string; slug: string }[] {
  return NOTEBOOKS.map((notebook) => ({
    track: notebook.track,
    slug: notebook.slug,
  }));
}

/** كل مُعرّفات المسارات — تُستعمل في generateStaticParams. */
export function getAllTrackParams(): { track: string }[] {
  return TRACKS.map((track) => ({ track: track.id }));
}

/** التحقق من أن نصاً ما يمثّل مساراً صالحاً. */
export function isTrackId(value: string): value is TrackId {
  return trackMap.has(value as TrackId);
}

/* ------------------------------------------------------------------ */
/* إحصاءات مشتقة                                                       */
/* ------------------------------------------------------------------ */

/** عدد الخلايا القابلة للتشغيل والتمارين في دفتر. */
export function notebookStats(notebook: Notebook): {
  runnable: number;
  exercises: number;
  points: number;
} {
  const runnable = notebook.cells.filter((cell) => cell.kind === "code").length;
  const exerciseCells = notebook.cells.filter((cell) => cell.kind === "exercise");
  return {
    runnable,
    exercises: exerciseCells.length,
    points: exerciseCells.reduce(
      (sum, cell) => sum + (cell.kind === "exercise" ? cell.points : 0),
      0,
    ),
  };
}

/** مجاميع مسار كامل. */
export function trackStats(track: TrackId): {
  notebooks: number;
  minutes: number;
  exercises: number;
  points: number;
} {
  const list = getNotebooksByTrack(track);
  return list.reduce(
    (totals, notebook) => {
      const stats = notebookStats(notebook);
      return {
        notebooks: totals.notebooks + 1,
        minutes: totals.minutes + notebook.estimatedMinutes,
        exercises: totals.exercises + stats.exercises,
        points: totals.points + stats.points,
      };
    },
    { notebooks: 0, minutes: 0, exercises: 0, points: 0 },
  );
}

/** إجمالي عدد الدفاتر في المنصة. */
export const TOTAL_NOTEBOOKS = NOTEBOOKS.length;
