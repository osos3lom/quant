/**
 * data/taxonomy.ts
 * التصنيفات العلمية ومستويات الصعوبة — Categories & difficulty levels.
 */
import type { Category, CategoryId, Difficulty, DifficultyId } from "@/types/quantum";

export const CATEGORIES: Category[] = [
  {
    id: "qubits",
    nameAr: "الكيوبتات والتراكب الكمي",
    nameEn: "Qubits & Superposition",
    descriptionAr:
      "الحالات النقية، كرة بلوخ، متجهات الحالة، الضرب الداخلي والخارجي، وشرط التطبيع.",
    icon: "Atom",
    gradient: "from-brand-500 to-brand-300",
    badgeClass:
      "bg-brand-100 text-brand-700 dark:bg-brand-500/15 dark:text-brand-300 ring-brand-500/20",
  },
  {
    id: "gates",
    nameAr: "البوابات الكمية",
    nameEn: "Quantum Gates",
    descriptionAr:
      "بوابات باولي X و Y و Z، بوابة هادامارد، بوابات الطور S و T، وبوابات التحكم CNOT و Toffoli و SWAP.",
    icon: "ToggleRight",
    gradient: "from-brand-600 to-brand-400",
    badgeClass:
      "bg-brand-100 text-brand-700 dark:bg-brand-500/15 dark:text-brand-300 ring-brand-500/20",
  },
  {
    id: "circuits",
    nameAr: "الدوائر الكمية والتشابك",
    nameEn: "Quantum Circuits & Entanglement",
    descriptionAr:
      "حالات بيل، حالات GHZ، الضرب التنسوري، والتكافؤ بين الدوائر الكمية.",
    icon: "Workflow",
    gradient: "from-emerald-600 to-brand-400",
    badgeClass:
      "bg-brand-100 text-brand-700 dark:bg-brand-500/15 dark:text-brand-300 ring-brand-500/20",
  },
  {
    id: "measurement",
    nameAr: "القياس ومصفوفة الكثافة",
    nameEn: "Measurement & Density Matrices",
    descriptionAr:
      "قاعدة بورن، مؤثرات الإسقاط، الحالات المختلطة، النقاء، والأثر الجزئي.",
    icon: "Gauge",
    gradient: "from-brand-700 to-brand-500",
    badgeClass:
      "bg-brand-100 text-brand-700 dark:bg-brand-500/15 dark:text-brand-300 ring-brand-500/20",
  },
  {
    id: "algorithms",
    nameAr: "الخوارزميات والبروتوكولات",
    nameEn: "Algorithms & Protocols",
    descriptionAr:
      "النقل الآني الكمي، دويتش-جوزا، خوارزمية غروفر للبحث، وأساسيات خوارزمية شور.",
    icon: "Binary",
    gradient: "from-teal-600 to-brand-400",
    badgeClass:
      "bg-brand-100 text-brand-700 dark:bg-brand-500/15 dark:text-brand-300 ring-brand-500/20",
  },
  {
    id: "qec",
    nameAr: "تصحيح الأخطاء والعتاد",
    nameEn: "Error Correction & Hardware",
    descriptionAr:
      "التفكك الكمي، أكواد قلب البت والطور، كود شور، المُثبِّتات، وأنظمة NISQ.",
    icon: "ShieldCheck",
    gradient: "from-brand-800 to-brand-600",
    badgeClass:
      "bg-brand-100 text-brand-700 dark:bg-brand-500/15 dark:text-brand-300 ring-brand-500/20",
  },
];

export const DIFFICULTIES: Difficulty[] = [
  {
    id: "beginner",
    nameAr: "مبتدئ",
    nameEn: "Beginner",
    rank: 1,
    badgeClass:
      "bg-brand-50 text-brand-600 dark:bg-brand-500/10 dark:text-brand-300 ring-brand-400/25",
  },
  {
    id: "intermediate",
    nameAr: "متوسط",
    nameEn: "Intermediate",
    rank: 2,
    badgeClass:
      "bg-brand-100 text-brand-700 dark:bg-brand-500/15 dark:text-brand-300 ring-brand-500/25",
  },
  {
    id: "advanced",
    nameAr: "متقدم",
    nameEn: "Advanced",
    rank: 3,
    badgeClass:
      "bg-brand-200 text-brand-800 dark:bg-brand-600/25 dark:text-brand-200 ring-brand-600/30",
  },
  {
    id: "expert",
    nameAr: "خبير",
    nameEn: "Expert",
    rank: 4,
    badgeClass:
      "bg-brand-700 text-white dark:bg-brand-600 dark:text-white ring-brand-700/40",
  },
];

const categoryMap = new Map(CATEGORIES.map((c) => [c.id, c]));
const difficultyMap = new Map(DIFFICULTIES.map((d) => [d.id, d]));

export function getCategory(id: CategoryId): Category {
  const found = categoryMap.get(id);
  if (!found) throw new Error(`تصنيف غير معروف: ${id}`);
  return found;
}

export function getDifficulty(id: DifficultyId): Difficulty {
  const found = difficultyMap.get(id);
  if (!found) throw new Error(`مستوى صعوبة غير معروف: ${id}`);
  return found;
}
