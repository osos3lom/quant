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
    gradient: "from-sky-500 to-cyan-400",
    badgeClass:
      "bg-sky-100 text-sky-700 dark:bg-sky-500/15 dark:text-sky-300 ring-sky-500/20",
  },
  {
    id: "gates",
    nameAr: "البوابات الكمية",
    nameEn: "Quantum Gates",
    descriptionAr:
      "بوابات باولي X و Y و Z، بوابة هادامارد، بوابات الطور S و T، وبوابات التحكم CNOT و Toffoli و SWAP.",
    icon: "ToggleRight",
    gradient: "from-violet-500 to-fuchsia-400",
    badgeClass:
      "bg-violet-100 text-violet-700 dark:bg-violet-500/15 dark:text-violet-300 ring-violet-500/20",
  },
  {
    id: "circuits",
    nameAr: "الدوائر الكمية والتشابك",
    nameEn: "Quantum Circuits & Entanglement",
    descriptionAr:
      "حالات بيل، حالات GHZ، الضرب التنسوري، والتكافؤ بين الدوائر الكمية.",
    icon: "Workflow",
    gradient: "from-emerald-500 to-teal-400",
    badgeClass:
      "bg-emerald-100 text-emerald-700 dark:bg-emerald-500/15 dark:text-emerald-300 ring-emerald-500/20",
  },
  {
    id: "measurement",
    nameAr: "القياس ومصفوفة الكثافة",
    nameEn: "Measurement & Density Matrices",
    descriptionAr:
      "قاعدة بورن، مؤثرات الإسقاط، الحالات المختلطة، النقاء، والأثر الجزئي.",
    icon: "Gauge",
    gradient: "from-amber-500 to-orange-400",
    badgeClass:
      "bg-amber-100 text-amber-800 dark:bg-amber-500/15 dark:text-amber-300 ring-amber-500/20",
  },
  {
    id: "algorithms",
    nameAr: "الخوارزميات والبروتوكولات",
    nameEn: "Algorithms & Protocols",
    descriptionAr:
      "النقل الآني الكمي، دويتش-جوزا، خوارزمية غروفر للبحث، وأساسيات خوارزمية شور.",
    icon: "Binary",
    gradient: "from-rose-500 to-pink-400",
    badgeClass:
      "bg-rose-100 text-rose-700 dark:bg-rose-500/15 dark:text-rose-300 ring-rose-500/20",
  },
  {
    id: "qec",
    nameAr: "تصحيح الأخطاء والعتاد",
    nameEn: "Error Correction & Hardware",
    descriptionAr:
      "التفكك الكمي، أكواد قلب البت والطور، كود شور، المُثبِّتات، وأنظمة NISQ.",
    icon: "ShieldCheck",
    gradient: "from-indigo-500 to-blue-400",
    badgeClass:
      "bg-indigo-100 text-indigo-700 dark:bg-indigo-500/15 dark:text-indigo-300 ring-indigo-500/20",
  },
];

export const DIFFICULTIES: Difficulty[] = [
  {
    id: "beginner",
    nameAr: "مبتدئ",
    nameEn: "Beginner",
    rank: 1,
    badgeClass:
      "bg-emerald-100 text-emerald-700 dark:bg-emerald-500/15 dark:text-emerald-300 ring-emerald-500/25",
  },
  {
    id: "intermediate",
    nameAr: "متوسط",
    nameEn: "Intermediate",
    rank: 2,
    badgeClass:
      "bg-sky-100 text-sky-700 dark:bg-sky-500/15 dark:text-sky-300 ring-sky-500/25",
  },
  {
    id: "advanced",
    nameAr: "متقدم",
    nameEn: "Advanced",
    rank: 3,
    badgeClass:
      "bg-amber-100 text-amber-800 dark:bg-amber-500/15 dark:text-amber-300 ring-amber-500/25",
  },
  {
    id: "expert",
    nameAr: "خبير",
    nameEn: "Expert",
    rank: 4,
    badgeClass:
      "bg-rose-100 text-rose-700 dark:bg-rose-500/15 dark:text-rose-300 ring-rose-500/25",
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
