/**
 * data/lessons/attribution.ts
 * نسبة المادة العلمية إلى مصدرها ومؤلّفيها.
 * Attribution for the source curriculum and its authors.
 *
 * محتوى المستوى التحضيري (البرونزي) مبني على المادة العلمية الرسمية
 * لسلسلة QSeries من QWorld / QSaudiArabia.
 */

export interface SourceAttribution {
  /** عنوان المادة الأصلية */
  titleAr: string;
  titleEn: string;
  /** الجهة الناشرة */
  publisher: string;
  /** السلسلة والإصدار */
  series: string;
  year: string;
  /** الموقع الرسمي */
  url: string;
  /** أسماء المؤلّفين كما وردت في المصدر */
  authors: string[];
  /** المسارات التي تعتمد على هذا المصدر */
  tracks: string[];
}

export const QPREP_SOURCE: SourceAttribution = {
  titleAr: "المادة العلمية للمرحلة التحضيرية",
  titleEn: "QPreparatory — Scientific Material",
  publisher: "QWorld / QSaudiArabia",
  series: "QSERIES · SCIENTIFIC MATERIAL",
  year: "2026",
  url: "https://qworld.net/qsaudiarabia",
  authors: ["Abuzer Yakaryılmaz", "خلود بندر المطيري", "جود عوض الشهري"],
  tracks: ["bronze"],
};

/** نص النسبة المختصر المعروض في الواجهة. */
export const ATTRIBUTION_NOTE =
  "المادة العلمية للمستوى البرونزي مبنية على منهج QPrep الرسمي من QWorld / QSaudiArabia. جميع الحقوق العلمية محفوظة لمؤلّفي المصدر.";
