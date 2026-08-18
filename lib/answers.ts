/**
 * lib/answers.ts
 * تقييم إجابات الفراغات — normalisation & grading of fill-in-the-blank answers.
 *
 * الهدف قبول الصيغ المكافئة: الكسور والأعداد العشرية والرموز اللاتينية والعربية،
 * مع تجاهل المسافات وأوامر LaTeX وعلامات الدولار.
 */
import type { Blank } from "@/types/quantum";

const ARABIC_INDIC = /[٠-٩۰-۹]/g;

/** تحويل الأرقام العربية الهندية إلى أرقام لاتينية. */
function latinizeDigits(input: string): string {
  return input.replace(ARABIC_INDIC, (ch) => {
    const code = ch.charCodeAt(0);
    const base = code >= 0x06f0 ? 0x06f0 : 0x0660;
    return String(code - base);
  });
}

/**
 * تطبيع إجابة نصية إلى صيغة قابلة للمقارنة.
 * يزيل المسافات وعلامات LaTeX ويوحّد رموز الجذر والأقواس الكمية.
 */
export function normalizeAnswer(input: string): string {
  let s = latinizeDigits(input.trim().toLowerCase());

  s = s
    .replace(/\$/g, "")
    .replace(/\\left|\\right/g, "")
    // الجذر أولاً حتى لا تبقى أقواس متداخلة داخل \frac مثل \frac{\sqrt{3}}{2}
    .replace(/\\sqrt\s*\{([^{}]*)\}/g, "sqrt($1)") // \sqrt{2} -> sqrt(2)
    .replace(/√\s*\(?([0-9a-z]+)\)?/g, "sqrt($1)") // √2 -> sqrt(2)
    .replace(/\\[tdc]?frac\s*\{([^{}]*)\}\s*\{([^{}]*)\}/g, "$1/$2") // \frac{a}{b} -> a/b
    .replace(/\\rangle|⟩/g, ">")
    .replace(/\\langle|⟨/g, "<")
    .replace(/\\pi|π/g, "pi")
    .replace(/\\cdot|×/g, "*")
    .replace(/[\\{}\[\]\s,]/g, "") // أوامر LaTeX والأقواس والمسافات
    .replace(/−|–|—/g, "-") // إشارات ناقص غير قياسية
    .replace(/^\+/, ""); // إشارة موجب بادئة

  // sqrt2 و sqrt(2) صيغتان مقبولتان بالتساوي
  s = s.replace(/sqrt\(([^)]*)\)/g, "sqrt$1");

  return s;
}

/** محاولة تقييم القيمة عددياً: كسور، نسب مئوية، وأعداد عشرية. */
export function toNumber(input: string): number | null {
  const s = normalizeAnswer(input);
  if (!s) return null;

  const percent = s.match(/^(-?\d*\.?\d+)%$/);
  if (percent) return Number(percent[1]) / 100;

  const fraction = s.match(/^(-?\d*\.?\d+)\/(-?\d*\.?\d+)$/);
  if (fraction) {
    const denominator = Number(fraction[2]);
    if (denominator === 0) return null;
    return Number(fraction[1]) / denominator;
  }

  // صيغ من نوع sqrt3/2 أو 1/sqrt2
  const sqrtOverNumber = s.match(/^(-?)sqrt(\d*\.?\d+)\/(-?\d*\.?\d+)$/);
  if (sqrtOverNumber) {
    const sign = sqrtOverNumber[1] === "-" ? -1 : 1;
    const denominator = Number(sqrtOverNumber[3]);
    if (denominator === 0) return null;
    return (sign * Math.sqrt(Number(sqrtOverNumber[2]))) / denominator;
  }

  const numberOverSqrt = s.match(/^(-?\d*\.?\d+)\/sqrt(\d*\.?\d+)$/);
  if (numberOverSqrt) {
    const root = Math.sqrt(Number(numberOverSqrt[2]));
    if (root === 0) return null;
    return Number(numberOverSqrt[1]) / root;
  }

  const plain = s.match(/^-?\d*\.?\d+$/);
  if (plain) return Number(s);

  return null;
}

/** مقارنة عددية بهامش تسامح نسبي. */
function numericallyEqual(a: number, b: number): boolean {
  const tolerance = Math.max(0.005, Math.abs(b) * 0.01);
  return Math.abs(a - b) <= tolerance;
}

/** هل الإجابة المُدخلة صحيحة بالنسبة لفراغ معيّن؟ */
export function isBlankCorrect(blank: Blank, value: string): boolean {
  const given = normalizeAnswer(value ?? "");
  if (!given) return false;

  // 1) مطابقة نصية بعد التطبيع
  if (blank.answers.some((answer) => normalizeAnswer(answer) === given)) {
    return true;
  }

  // 2) مطابقة عددية بهامش تسامح
  const givenNumber = toNumber(value);
  if (givenNumber === null) return false;

  return blank.answers.some((answer) => {
    const expected = toNumber(answer);
    return expected !== null && numericallyEqual(givenNumber, expected);
  });
}

/** تقييم كل فراغات السؤال دفعةً واحدة. */
export function gradeBlanks(
  blanks: Blank[],
  values: Record<string, string>,
): { results: Record<string, boolean>; allCorrect: boolean } {
  const results: Record<string, boolean> = {};
  for (const blank of blanks) {
    results[blank.id] = isBlankCorrect(blank, values[blank.id] ?? "");
  }
  return {
    results,
    allCorrect: blanks.every((blank) => results[blank.id]),
  };
}
