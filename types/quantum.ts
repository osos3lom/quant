/**
 * types/quantum.ts
 * تعريفات الأنواع الأساسية لمنصة "تمارين الحوسبة الكمية".
 * Core type definitions for the Quantum Computing Exercises platform.
 */

/* ------------------------------------------------------------------ */
/* التصنيفات — Categories                                              */
/* ------------------------------------------------------------------ */

/** مُعرّف التصنيف العلمي — Scientific category identifier. */
export type CategoryId =
  | "qubits" // الكيوبتات والتراكب الكمي
  | "gates" // البوابات الكمية
  | "circuits" // الدوائر الكمية والتشابك
  | "measurement" // القياس ومصفوفة الكثافة
  | "algorithms" // الخوارزميات والبروتوكولات
  | "qec"; // تصحيح الأخطاء وأساسيات العتاد

/** وصف تصنيف كامل — Full category descriptor. */
export interface Category {
  id: CategoryId;
  /** الاسم العربي المعروض في الواجهة */
  nameAr: string;
  /** الاسم الإنجليزي (مرجعي) */
  nameEn: string;
  /** وصف مختصر بالعربية */
  descriptionAr: string;
  /** اسم أيقونة lucide-react */
  icon: string;
  /** تدرّج لوني لبطاقة التصنيف (أصناف Tailwind) */
  gradient: string;
  /** لون الوسم (أصناف Tailwind) */
  badgeClass: string;
}

/* ------------------------------------------------------------------ */
/* مستويات الصعوبة — Difficulty levels                                 */
/* ------------------------------------------------------------------ */

/** مستوى الصعوبة — Difficulty level identifier. */
export type DifficultyId = "beginner" | "intermediate" | "advanced" | "expert";

export interface Difficulty {
  id: DifficultyId;
  /** مبتدئ / متوسط / متقدم / خبير */
  nameAr: string;
  nameEn: string;
  /** ترتيب رقمي للفرز (1 = الأسهل) */
  rank: 1 | 2 | 3 | 4;
  badgeClass: string;
}

/* ------------------------------------------------------------------ */
/* الأسئلة — Questions                                                 */
/* ------------------------------------------------------------------ */

/** نوع السؤال — Question type. */
export type QuestionType = "multiple-choice" | "fill-blank";

/** خطوة في الحل المفصّل — One step of a worked solution. */
export interface SolutionStep {
  /** شرح الخطوة بالعربية */
  text: string;
  /** معادلة KaTeX تُعرض ككتلة مستقلة بالاتجاه LTR */
  math?: string;
}

interface QuestionBase {
  id: string;
  type: QuestionType;
  /** نص السؤال بالعربية؛ يدعم الرياضيات السطرية بين علامتَي $...$ */
  prompt: string;
  /** معادلة رئيسية تُعرض ككتلة تحت نص السؤال */
  math?: string;
  /** تلميح اختياري قابل للطي */
  hint?: string;
  /** الشرح النهائي بالعربية */
  explanation: string;
  /** الحل خطوة بخطوة */
  steps?: SolutionStep[];
  /** النقاط الممنوحة عند الإجابة الصحيحة */
  points: number;
  /** وسوم للبحث الفوري */
  tags?: string[];
}

/** خيار في سؤال الاختيار من متعدد. */
export interface Choice {
  id: string;
  /** نص الخيار؛ يدعم $...$ للرياضيات */
  text: string;
  /** تفنيد الخيار الخاطئ (يظهر عند اختياره) */
  rebuttal?: string;
}

/** سؤال اختيار من متعدد — Multiple choice question. */
export interface MultipleChoiceQuestion extends QuestionBase {
  type: "multiple-choice";
  choices: Choice[];
  /** مُعرّف الخيار الصحيح */
  correctId: string;
}

/** فراغ واحد داخل سؤال التعبئة (معامل اتساع أو عنصر مصفوفة). */
export interface Blank {
  id: string;
  /** تسمية الحقل بالعربية، مثل: "معامل الاتساع α" */
  label: string;
  /** رمز رياضي يُعرض بجانب الحقل، مثل: "\alpha =" */
  labelMath?: string;
  /** الإجابات المقبولة (تُقارن بعد التطبيع) */
  answers: string[];
  /** الإجابة النموذجية المعروضة في الحل */
  display: string;
  placeholder?: string;
}

/** سؤال تعبئة فراغات — Fill-in-the-blank question. */
export interface FillBlankQuestion extends QuestionBase {
  type: "fill-blank";
  blanks: Blank[];
}

export type Question = MultipleChoiceQuestion | FillBlankQuestion;

/* ------------------------------------------------------------------ */
/* التمارين — Exercises                                                */
/* ------------------------------------------------------------------ */

/** وحدة تمارين كاملة — A full exercise module. */
export interface Exercise {
  /** المُعرّف في المسار /exercises/[slug] */
  slug: string;
  titleAr: string;
  titleEn: string;
  /** وصف تعريفي بالعربية */
  summary: string;
  category: CategoryId;
  difficulty: DifficultyId;
  /** الزمن التقديري بالدقائق */
  estimatedMinutes: number;
  /** أهداف التعلّم بالعربية */
  objectives: string[];
  /** كلمات مفتاحية للبحث (عربية وإنجليزية) */
  keywords: string[];
  questions: Question[];
}

/* ------------------------------------------------------------------ */
/* التقدّم المحلي — Local progress (localStorage)                      */
/* ------------------------------------------------------------------ */

/** نتيجة محاولة واحدة على تمرين. */
export interface ExerciseProgress {
  slug: string;
  /** أفضل نسبة دقة محققة (0–100) */
  bestAccuracy: number;
  /** آخر نسبة دقة (0–100) */
  lastAccuracy: number;
  /** عدد الأسئلة التي تمت الإجابة عنها في آخر محاولة */
  answered: number;
  /** إجمالي أسئلة التمرين */
  total: number;
  /** عدد المحاولات */
  attempts: number;
  /** أفضل مجموع نقاط */
  bestPoints: number;
  /** هل أُنهي التمرين مرة واحدة على الأقل */
  completed: boolean;
  /** أفضل سلسلة إجابات صحيحة متتالية داخل التمرين */
  bestStreak: number;
  /** آخر تحديث (ISO) */
  updatedAt: string;
}

/** الحالة الكاملة المحفوظة في localStorage. */
export interface ProgressState {
  version: number;
  /** تقدّم دفاتر الدروس، مفهرساً بـ `${track}/${slug}` */
  lessons: Record<string, import("./lessons").LessonProgressEntry>;
  /** نقاط الخبرة التراكمية */
  xp: number;
  /** سلسلة الأيام المتتالية للنشاط */
  dayStreak: number;
  /** أطول سلسلة أيام */
  bestDayStreak: number;
  /** آخر يوم نشاط بصيغة YYYY-MM-DD */
  lastActiveDay: string | null;
  /** إجمالي الإجابات الصحيحة عبر كل التمارين */
  totalCorrect: number;
  /** إجمالي الأسئلة المُجابة عبر كل التمارين */
  totalAnswered: number;
  /** سجل التمارين مفهرساً بالـ slug */
  exercises: Record<string, ExerciseProgress>;
  /** سجل زمني لآخر المحاولات */
  history: AttemptRecord[];
}

/** قيد في سجل المحاولات. */
export interface AttemptRecord {
  slug: string;
  titleAr: string;
  correct: number;
  total: number;
  points: number;
  accuracy: number;
  /** الزمن المستغرق بالثواني */
  seconds: number;
  /** تاريخ الإنجاز (ISO) */
  at: string;
}

/* ------------------------------------------------------------------ */
/* حالة واجهة الحل — Runner UI state                                   */
/* ------------------------------------------------------------------ */

/** إجابة المستخدم على سؤال واحد. */
export interface AnswerState {
  questionId: string;
  /** الخيار المُختار (اختيار من متعدد) */
  choiceId?: string;
  /** قيم الفراغات مفهرسة بمُعرّف الفراغ */
  values?: Record<string, string>;
  /** هل تم التحقق منها */
  checked: boolean;
  correct: boolean;
  /** نتيجة كل فراغ على حدة */
  blankResults?: Record<string, boolean>;
  earnedPoints: number;
}

/** ملخص نهائي للتمرين. */
export interface ExerciseResult {
  correct: number;
  total: number;
  points: number;
  maxPoints: number;
  accuracy: number;
  seconds: number;
  bestStreak: number;
  wrongQuestionIds: string[];
}

/* ------------------------------------------------------------------ */
/* أدوات الفلترة — Filtering                                           */
/* ------------------------------------------------------------------ */

export type CategoryFilter = CategoryId | "all";
export type DifficultyFilter = DifficultyId | "all";

export interface ExerciseFilters {
  query: string;
  category: CategoryFilter;
  difficulty: DifficultyFilter;
}
