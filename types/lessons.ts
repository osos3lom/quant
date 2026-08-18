/**
 * types/lessons.ts
 * أنواع منصة الدروس التفاعلية (دفاتر بأسلوب Jupyter).
 * Types for the interactive lessons platform (Jupyter-style notebooks).
 */

/* ------------------------------------------------------------------ */
/* المسارات — Tracks                                                   */
/* ------------------------------------------------------------------ */

/** مُعرّف المسار التعليمي — Mastery track identifier. */
export type TrackId = "bronze" | "silver" | "gold";

export interface Track {
  id: TrackId;
  /** المستوى البرونزي / الفضي / الذهبي */
  nameAr: string;
  nameEn: string;
  /** الاسم المرجعي في منهج QWorld مثل QPrep / QSilver / QGold */
  codeName: string;
  /** جملة تعريفية قصيرة */
  tagline: string;
  description: string;
  /** اسم أيقونة lucide-react */
  icon: string;
  gradient: string;
  badgeClass: string;
  /** ترتيب العرض (1 = الأول) */
  order: number;
  /** الزمن التقديري لإنهاء المسار بالساعات */
  estimatedHours: number;
  /** المتطلبات السابقة بالعربية */
  prerequisites: string[];
}

/** مرحلة داخل مسار — a stage grouping notebooks inside one track. */
export interface Stage {
  id: number;
  trackId: TrackId;
  nameAr: string;
  nameEn: string;
  description: string;
  icon: string;
}

/* ------------------------------------------------------------------ */
/* الخلايا — Notebook cells                                            */
/* ------------------------------------------------------------------ */

export type CellKind = "markdown" | "code" | "exercise";

/** نوع الملاحظة الجانبية داخل خلية نصية. */
export type CalloutTone = "note" | "tip" | "warning";

interface CellBase {
  id: string;
}

/** خلية نصية: شرح عربي بصيغة Markdown مبسّطة مع رياضيات $...$. */
export interface MarkdownCell extends CellBase {
  kind: "markdown";
  content: string;
  /** يحوّل الخلية إلى صندوق ملاحظة ملوّن */
  callout?: CalloutTone;
  /** عنوان الملاحظة عند استعمال callout */
  calloutTitle?: string;
}

/** خلية شيفرة توضيحية: قابلة للتعديل والتشغيل. */
export interface CodeCell extends CellBase {
  kind: "code";
  code: string;
  /** يمنع التعديل ويُبقي التشغيل متاحاً (افتراضياً قابلة للتعديل) */
  readOnly?: boolean;
  /** تعليق عربي يظهر فوق الخلية */
  caption?: string;
}

/** خلية تمرين تفاعلي: قالب + مُقيِّم + تلميحات + حل. */
export interface ExerciseCell extends CellBase {
  kind: "exercise";
  /** نص المسألة بصيغة Markdown عربية */
  prompt: string;
  /** الشيفرة الابتدائية التي تظهر للمتدرّب */
  template: string;
  /** تلميحات متدرّجة قابلة للطي */
  hints: string[];
  /** الحل النموذجي */
  solution: string;
  /**
   * شيفرة بايثون للتحقق تعمل في نطاق الدفتر نفسه بعد تشغيل حل المتدرّب.
   * تنجح إن لم تُطلق استثناءً، وتفشل عبر assert برسالة عربية.
   */
  validator: string;
  /** نقاط الخبرة الممنوحة عند النجاح */
  points: number;
}

export type LessonCell = MarkdownCell | CodeCell | ExerciseCell;

/* ------------------------------------------------------------------ */
/* الدفاتر — Notebooks                                                 */
/* ------------------------------------------------------------------ */

export interface Notebook {
  /** المُعرّف في المسار /lessons/[track]/[slug] */
  slug: string;
  track: TrackId;
  /**
   * المرحلة داخل المسار (يُستعمل حالياً في المستوى البرونزي):
   * 1 = بايثون بصورته الصِرفة كما في المادة الأصلية، 2 = الأدوات العددية (numpy).
   */
  stage?: number;
  titleAr: string;
  titleEn: string;
  summary: string;
  /** ترتيب الدفتر داخل المسار */
  order: number;
  estimatedMinutes: number;
  objectives: string[];
  /** عناوين المتطلبات السابقة بالعربية */
  prerequisites: string[];
  keywords: string[];
  cells: LessonCell[];
}

/* ------------------------------------------------------------------ */
/* تنفيذ بايثون — Python execution                                     */
/* ------------------------------------------------------------------ */

/** حالة نواة بايثون العاملة في المتصفح. */
export type KernelStatus = "idle" | "loading" | "ready" | "running" | "error";

/** حالة تنفيذ خلية واحدة. */
export type CellStatus = "idle" | "running" | "done" | "error";

/** خطأ بايثون مُفكّك. */
export interface PythonError {
  type: string;
  message: string;
  traceback: string;
}

/** ناتج تشغيل خلية واحدة. */
export interface ExecutionResult {
  stdout: string;
  stderr: string;
  /** تمثيل قيمة آخر تعبير في الخلية (كما في Jupyter) */
  result: string | null;
  /** صور PNG بصيغة base64 ناتجة عن matplotlib */
  images: string[];
  error: PythonError | null;
  durationMs: number;
  /** رقم التنفيذ المعروض في شارة الخلية [1] */
  executionCount: number;
}

/* ------------------------------------------------------------------ */
/* التقدّم — Lesson progress                                           */
/* ------------------------------------------------------------------ */

export interface LessonProgressEntry {
  slug: string;
  track: TrackId;
  /** مُعرّفات خلايا الشيفرة التي شُغِّلت */
  ranCells: string[];
  /** مُعرّفات التمارين التي نجح المتدرّب فيها */
  solvedExercises: string[];
  completed: boolean;
  updatedAt: string;
}
