/**
 * data/lessons/bronze-numpy.ts
 * المستوى البرونزي — المرحلة الثانية: الأدوات العددية (numpy).
 * Bronze, stage 2: the numerical toolkit (numpy).
 *
 * إضافة تكميلية بعد إتقان المرحلة الأولى ببايثون الصِرف: نعيد بناء العمليات نفسها
 * بأدوات numpy، ونقارن النتائج للتأكد من التطابق قبل الانتقال إلى المستوى الفضي.
 */
import type { Notebook } from "@/types/lessons";

export const bronzeNumpyNotebooks: Notebook[] = [
  /* ================================================================ */
  {
    slug: "numpy-basics",
    track: "bronze",
    stage: 2,
    titleAr: "مدخل إلى numpy",
    titleEn: "Introduction to numpy",
    summary:
      "لماذا ننتقل من القوائم إلى المصفوفات العددية: إنشاء المصفوفات، العمليات على المستوى العنصري، الأبعاد، والمقارنة بالتنفيذ اليدوي.",
    order: 13,
    estimatedMinutes: 22,
    objectives: [
      "إنشاء مصفوفة numpy ومعرفة شكلها ونوعها",
      "إجراء العمليات الحسابية على مستوى العناصر",
      "مقارنة نتائج numpy بنتائج بايثون الصِرف",
      "إدراك الفرق بين ضرب القوائم وضرب المصفوفات العددية",
    ],
    prerequisites: ["إتمام المرحلة الأولى من المستوى البرونزي"],
    keywords: ["numpy", "array", "shape", "dtype", "مصفوفات عددية"],
    cells: [
      {
        id: "n1-md",
        kind: "markdown",
        content: String.raw`## لماذا numpy؟

في المرحلة الأولى بنينا كل عملية بأيدينا بقوائم Python، وهذا هو الأساس الذي يجب أن يترسّخ أولاً. لكن القائمة ليست متجهاً رياضياً:

- \`[1, 2] * 3\` **يكرّر** العناصر ولا يضربها.
- \`[1, 2] + [3, 4]\` **يدمج** القائمتين ولا يجمعهما.

مكتبة numpy تعطينا نوعاً جديداً يتصرّف كما نتوقّع رياضياً، وبسرعة أعلى بكثير.`,
      },
      {
        id: "n1-create",
        kind: "code",
        caption: "الفرق العملي بين القائمة والمصفوفة العددية",
        code: `import numpy as np

list_version = [1, 2]
array_version = np.array([1, 2])

print("قائمة × 3 :", list_version * 3)
print("مصفوفة × 3:", array_version * 3)
print()
print("دمج القوائم :", [1, 2] + [3, 4])
print("جمع المصفوفات:", np.array([1, 2]) + np.array([3, 4]))`,
      },
      {
        id: "n1-shape",
        kind: "code",
        caption: "الشكل والنوع والأبعاد",
        code: `import numpy as np

v = np.array([1, -2, 0, 5])
M = np.array([
    [8, 0, -1],
    [-2, -3, 1],
])

print("v:", v, "| الشكل:", v.shape, "| النوع:", v.dtype)
print("M الشكل:", M.shape, "| عدد العناصر:", M.size)
print("M المنقولة:\\n", M.T)
print("مصفوفة الهوية:\\n", np.eye(3))
print("أصفار:", np.zeros(4), "| آحاد:", np.ones(3))`,
      },
      {
        id: "n1-compare",
        kind: "code",
        caption: "المقارنة: الطريقة اليدوية مقابل numpy — النتيجة نفسها",
        code: `import numpy as np
from math import sqrt

u = [-3, -2, 0, -1, 4]
v = [-1, -1, 2, -3, 5]

manual_sum = [u[i] + v[i] for i in range(len(u))]
manual_dot = sum(u[i] * v[i] for i in range(len(u)))
manual_len = sqrt(sum(e ** 2 for e in u))

nu, nv = np.array(u), np.array(v)

print("الجمع  :", manual_sum, "|", nu + nv)
print("القياسي:", manual_dot, "|", np.dot(nu, nv))
print("الطول  :", round(manual_len, 6), "|", round(float(np.linalg.norm(nu)), 6))`,
      },
      {
        id: "n1-ex",
        kind: "exercise",
        prompt: String.raw`### تمرين: جسر بين الطريقتين

اكتب دالة \`compare_norms(v)\` تستقبل **قائمة** أعداد وتُعيد صفاً \`(manual, numpy_value, match)\` حيث:

- \`manual\`: الطول محسوباً بايثون الصِرف.
- \`numpy_value\`: الطول محسوباً بـ \`np.linalg.norm\`.
- \`match\`: قيمة منطقية تدل على تساويهما بهامش $10^{-9}$.`,
        template: `import numpy as np

def compare_norms(v):
    # اكتب الكود هنا
    pass

print(compare_norms([3, 4]))`,
        hints: [
          "الطول اليدوي: `sum(x ** 2 for x in v) ** 0.5`.",
          "حوّل القائمة أولاً: `np.linalg.norm(np.array(v))`، ثم قارن بـ abs(a - b) < 1e-9.",
        ],
        solution: `import numpy as np

def compare_norms(v):
    manual = sum(x ** 2 for x in v) ** 0.5
    numpy_value = float(np.linalg.norm(np.array(v)))
    return (manual, numpy_value, abs(manual - numpy_value) < 1e-9)

print(compare_norms([3, 4]))`,
        validator: `assert "compare_norms" in globals(), "لم تُعرّف الدالة compare_norms بعد."
r = compare_norms([3, 4])
assert len(r) == 3, "يجب أن تُعيد الدالة ثلاث قيم."
assert abs(r[0] - 5) < 1e-9, "الطول اليدوي للمتجه [3,4] يساوي 5."
assert abs(r[1] - 5) < 1e-9, "طول numpy يجب أن يساوي 5 أيضاً."
assert r[2] is True or r[2] == True, "يجب أن تدل القيمة الثالثة على التطابق."
r2 = compare_norms([1, 1, 1, 1])
assert abs(r2[0] - 2) < 1e-9, "طول المتجه [1,1,1,1] يساوي 2."`,
        points: 30,
      },
    ],
  },

  /* ================================================================ */
  {
    slug: "numpy-linear-algebra",
    track: "bronze",
    stage: 2,
    titleAr: "الجبر الخطي بـ numpy",
    titleEn: "Linear Algebra with numpy",
    summary:
      "إعادة بناء عمليات المرحلة الأولى بأدوات numpy: الضرب القياسي، ضرب المصفوفات بالمؤثّر @، المنقول، والضرب التنسوري بـ kron.",
    order: 14,
    estimatedMinutes: 25,
    objectives: [
      "استعمال np.dot و np.vdot والمؤثّر @",
      "حساب المنقول والمرافق المنقول",
      "استعمال np.kron للضرب التنسوري",
      "التحقق من الخصائص الجبرية عددياً",
    ],
    prerequisites: ["مدخل إلى numpy"],
    keywords: ["numpy", "dot", "matmul", "kron", "transpose", "جبر خطي"],
    cells: [
      {
        id: "n2-dot",
        kind: "code",
        caption: "الضرب القياسي وضرب المصفوفات",
        code: `import numpy as np

u = np.array([-3, -2, 0, -1, 4])
v = np.array([-1, -1, 2, -3, 5])
print("u · v =", np.dot(u, v))

A = np.array([[1, 2], [3, 4]])
B = np.array([[0, 1], [1, 0]])
print("A @ B =\\n", A @ B)
print("B @ A =\\n", B @ A)
print("هل الضرب إبدالي؟", np.array_equal(A @ B, B @ A))`,
      },
      {
        id: "n2-matvec",
        kind: "code",
        caption: "ضرب مصفوفة في متجه — قارن بالنتيجة اليدوية [1, 15, -2]",
        code: `import numpy as np

M = np.array([
    [-1, 0, 1],
    [-2, -3, 4],
    [1, 5, 6],
])
v = np.array([1, -3, 2])

print(M @ v)
print("المنقولة:\\n", M.T)
print("(AB)ᵀ = BᵀAᵀ ؟",
      np.array_equal((M @ M).T, M.T @ M.T))`,
      },
      {
        id: "n2-kron",
        kind: "code",
        caption: "الضرب التنسوري بـ np.kron — قارن بـ tensor_vectors اليدوية",
        code: `import numpy as np

u = np.array([-2, 3])
v = np.array([1, 2, -3])

print("u ⊗ v =", np.kron(u, v))
print("v ⊗ u =", np.kron(v, u))

A = np.array([[1, 2], [3, 4]])
B = np.array([[0, 5], [6, 7]])
T = np.kron(A, B)
print("أبعاد A ⊗ B:", T.shape)
print(T)`,
      },
      {
        id: "n2-complex",
        kind: "markdown",
        callout: "warning",
        calloutTitle: "الأعداد العقدية: dot مقابل vdot",
        content: String.raw`مع المتجهات العقدية لا نجمع حواصل الضرب مباشرة، بل نأخذ **مرافق** مركّبات المتجه الأول:

$$\langle u | v \rangle = \sum_i \overline{u_i}\, v_i$$

الدالة \`np.vdot\` تأخذ المرافق تلقائياً، بينما \`np.dot\` لا تفعل. هذا الفرق مصدر أخطاء شائعة جداً، وسيصبح جوهرياً في المستوى الفضي.`,
      },
      {
        id: "n2-complex-code",
        kind: "code",
        caption: "الفرق العملي بين dot و vdot",
        code: `import numpy as np

a = np.array([1 + 1j, 2])
print("np.dot  (خطأ شائع):", np.dot(a, a))
print("np.vdot (الصحيح)  :", np.vdot(a, a))
print("مربّع الطول       :", np.linalg.norm(a) ** 2)`,
      },
      {
        id: "n2-ex",
        kind: "exercise",
        prompt: String.raw`### تمرين: التحقق من عدم الإبدالية

اكتب دالة \`commutator(A, B)\` تُعيد المُبدِّل:

$$[A, B] = AB - BA$$

كمصفوفة numpy. ثم تحقّق أن مُبدِّل مصفوفتَي باولي $X$ و $Z$ **ليس** صفراً.`,
        template: `import numpy as np

def commutator(A, B):
    # اكتب الكود هنا
    pass

X = np.array([[0, 1], [1, 0]])
Z = np.array([[1, 0], [0, -1]])
print(commutator(X, Z))`,
        hints: [
          "استعمل المؤثّر `@` لضرب المصفوفات لا `*` الذي يضرب عنصراً بعنصر.",
          "المطلوب ببساطة: `return A @ B - B @ A`.",
        ],
        solution: `import numpy as np

def commutator(A, B):
    return A @ B - B @ A

X = np.array([[0, 1], [1, 0]])
Z = np.array([[1, 0], [0, -1]])
print(commutator(X, Z))`,
        validator: `import numpy as np
assert "commutator" in globals(), "لم تُعرّف الدالة commutator بعد."
X = np.array([[0, 1], [1, 0]])
Z = np.array([[1, 0], [0, -1]])
I = np.eye(2)
c = np.array(commutator(X, Z))
assert c.shape == (2, 2), "يجب أن يكون الناتج مصفوفة 2×2."
assert not np.allclose(c, np.zeros((2, 2))), "مُبدِّل X و Z لا يساوي صفراً — تأكّد من استعمال @ لا *."
assert np.allclose(c, np.array([[0, -2], [2, 0]])), "الناتج المتوقّع هو [[0, -2], [2, 0]]."
assert np.allclose(np.array(commutator(X, X)), np.zeros((2, 2))), "مُبدِّل المصفوفة مع نفسها يساوي صفراً."
assert np.allclose(np.array(commutator(X, I)), np.zeros((2, 2))), "أي مصفوفة تتبادل مع الهوية."`,
        points: 35,
      },
    ],
  },

  /* ================================================================ */
  {
    slug: "numpy-quantum-states",
    track: "bronze",
    stage: 2,
    titleAr: "حالات الكيوبت بـ numpy",
    titleEn: "Qubit States with numpy",
    summary:
      "الجسر إلى المستوى الفضي: بناء متجهات الحالة المُطبَّعة، حساب الاحتمالات، ورسم توزيع القياس — تمهيداً للبوابات الكمية.",
    order: 15,
    estimatedMinutes: 25,
    objectives: [
      "بناء متجه حالة مُطبَّع بـ numpy",
      "حساب احتمالات القياس من الاتساعات",
      "بناء حالة كيوبتين بالضرب التنسوري",
      "رسم توزيع نتائج القياس",
    ],
    prerequisites: ["الجبر الخطي بـ numpy"],
    keywords: ["qubit", "state", "احتمالات", "كيوبت", "تطبيع", "قياس"],
    cells: [
      {
        id: "n3-md",
        kind: "markdown",
        content: String.raw`## من المتجه إلى الحالة

بعد أن أتقنّا المتجهات والمصفوفات، صار متجه الحالة الكمية حالة خاصة من المتجه: **متجه مُطبَّع** طوله واحد.

$$|\psi\rangle = \alpha|0\rangle + \beta|1\rangle, \qquad |\alpha|^2 + |\beta|^2 = 1$$

واحتمال كل نتيجة قياس هو مربّع مقدار الاتساع المقابل — وهذه هي قاعدة بورن التي سنبني عليها المستوى الفضي بالكامل.`,
      },
      {
        id: "n3-states",
        kind: "code",
        caption: "بناء الحالات الأساسية وحالات التراكب",
        code: `import numpy as np

ket0 = np.array([1, 0], dtype=complex)
ket1 = np.array([0, 1], dtype=complex)
plus = (ket0 + ket1) / np.sqrt(2)
minus = (ket0 - ket1) / np.sqrt(2)

for name, state in [("|0>", ket0), ("|1>", ket1), ("|+>", plus), ("|->", minus)]:
    probs = np.abs(state) ** 2
    print(f"{name}: الطول = {np.linalg.norm(state):.3f} | P(0) = {probs[0]:.3f} | P(1) = {probs[1]:.3f}")`,
      },
      {
        id: "n3-two",
        kind: "code",
        caption: "حالة كيوبتين بالضرب التنسوري",
        code: `import numpy as np

ket0 = np.array([1, 0], dtype=complex)
plus = np.array([1, 1], dtype=complex) / np.sqrt(2)

state = np.kron(plus, ket0)
labels = ["00", "01", "10", "11"]

print("الحالة:", np.round(state.real, 4))
for label, amp in zip(labels, state):
    print(f"P({label}) = {abs(amp) ** 2:.3f}")
print("المجموع:", round(float(np.sum(np.abs(state) ** 2)), 6))`,
      },
      {
        id: "n3-plot",
        kind: "code",
        caption: "محاكاة القياس ورسم التوزيع",
        code: `import numpy as np
import matplotlib.pyplot as plt

rng = np.random.default_rng(42)
plus = np.array([1, 1]) / np.sqrt(2)
probs = np.abs(plus) ** 2

shots = 1000
outcomes = rng.choice([0, 1], size=shots, p=probs)
counts = [int(np.sum(outcomes == 0)), int(np.sum(outcomes == 1))]
print("النتائج:", {"|0>": counts[0], "|1>": counts[1]})

plt.figure(figsize=(4.5, 3.2), dpi=100)
plt.bar(["|0>", "|1>"], counts, color=["#0D5C43", "#22C55E"])
plt.ylabel("count")
plt.title("1000 shots on |+>")
plt.show()`,
      },
      {
        id: "n3-ex",
        kind: "exercise",
        prompt: String.raw`### تمرين: حالة مُطبَّعة واحتمالاتها

اكتب دالة \`state_and_probs(alpha, beta)\` تُعيد صفاً \`(state, probs)\` حيث:

- \`state\`: مصفوفة numpy عقدية تمثّل الحالة **بعد التطبيع**.
- \`probs\`: قائمة الاحتمالين $[P(0), P(1)]$.

مثال: المُدخل $(3, 4)$ يعطي حالة $(0.6, 0.8)$ واحتمالين $[0.36, 0.64]$.`,
        template: `import numpy as np

def state_and_probs(alpha, beta):
    # اكتب الكود هنا
    pass

s, p = state_and_probs(3, 4)
print(s)
print(p)`,
        hints: [
          "أنشئ المتجه بـ `np.array([alpha, beta], dtype=complex)` ثم اقسمه على `np.linalg.norm`.",
          "الاحتمالات هي `np.abs(state) ** 2` — حوّلها إلى قائمة بـ `.tolist()`.",
        ],
        solution: `import numpy as np

def state_and_probs(alpha, beta):
    v = np.array([alpha, beta], dtype=complex)
    state = v / np.linalg.norm(v)
    probs = (np.abs(state) ** 2).tolist()
    return (state, probs)

s, p = state_and_probs(3, 4)
print(s)
print(p)`,
        validator: `import numpy as np
assert "state_and_probs" in globals(), "لم تُعرّف الدالة state_and_probs بعد."
s, p = state_and_probs(3, 4)
s = np.array(s)
assert abs(np.linalg.norm(s) - 1) < 1e-9, "الحالة الناتجة يجب أن تكون مُطبَّعة."
assert abs(abs(s[0]) - 0.6) < 1e-9, "المركّبة الأولى يجب أن تساوي 0.6."
assert len(p) == 2, "يجب أن تُعيد احتمالين."
assert abs(p[0] - 0.36) < 1e-9 and abs(p[1] - 0.64) < 1e-9, "الاحتمالان المتوقّعان هما 0.36 و 0.64."
assert abs(sum(p) - 1) < 1e-9, "مجموع الاحتمالين يجب أن يساوي واحداً."
s2, p2 = state_and_probs(1, 1)
assert abs(p2[0] - 0.5) < 1e-9, "الحالة (1,1) بعد التطبيع تعطي احتمالين متساويين."`,
        points: 35,
      },
    ],
  },
];
