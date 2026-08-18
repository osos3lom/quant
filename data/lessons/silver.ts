/**
 * data/lessons/silver.ts
 * منهج المستوى الفضي (QSilver): الكيوبتات، البوابات، كرة بلوخ، والتشابك.
 */
import type { Notebook } from "@/types/lessons";

export const silverNotebooks: Notebook[] = [
  /* ================================================================ */
  {
    slug: "qubit-states",
    track: "silver",
    titleAr: "حالات الكيوبت والتراكب الكمي",
    titleEn: "Qubit States & Superposition",
    summary:
      "من المتجه المطبَّع إلى الحالة الكمية: بناء حالات الكيوبت في numpy، تطبيقها، ومحاكاة القياس بقاعدة بورن.",
    order: 1,
    estimatedMinutes: 25,
    objectives: [
      "بناء متجه حالة مُطبَّع في numpy",
      "حساب احتمالات القياس بقاعدة بورن",
      "محاكاة قياس متكرّر ورسم توزيعه",
      "التمييز بين الطور العام والطور النسبي",
    ],
    prerequisites: ["إتمام المستوى البرونزي أو معرفة مكافئة"],
    keywords: ["qubit", "كيوبت", "تراكب", "born", "قياس", "superposition"],
    cells: [
      {
        id: "s1-md",
        kind: "markdown",
        content: String.raw`## من المتجه إلى الكيوبت

حالة الكيوبت متجه عقدي مُطبَّع في فضاء ذي بُعدين:

$$|\psi\rangle = \alpha|0\rangle + \beta|1\rangle, \qquad |\alpha|^2 + |\beta|^2 = 1$$

واحتمال قياس كل نتيجة يُعطى بقاعدة بورن: $P(0) = |\alpha|^2$ و $P(1) = |\beta|^2$.`,
      },
      {
        id: "s1-build",
        kind: "code",
        caption: "بناء الحالات الأساسية وحالات التراكب",
        code: `import numpy as np

ket0 = np.array([1, 0], dtype=complex)
ket1 = np.array([0, 1], dtype=complex)
plus = (ket0 + ket1) / np.sqrt(2)
minus = (ket0 - ket1) / np.sqrt(2)

for name, state in [("|0>", ket0), ("|+>", plus), ("|->", minus)]:
    probs = np.abs(state) ** 2
    print(f"{name}: P(0) = {probs[0]:.3f}, P(1) = {probs[1]:.3f}")`,
      },
      {
        id: "s1-measure",
        kind: "code",
        caption: "محاكاة 1000 قياس للحالة |+> ورسم التوزيع",
        code: `import numpy as np
import matplotlib.pyplot as plt

rng = np.random.default_rng(42)
plus = np.array([1, 1]) / np.sqrt(2)
probs = np.abs(plus) ** 2

shots = 1000
outcomes = rng.choice([0, 1], size=shots, p=probs)
counts = [int(np.sum(outcomes == 0)), int(np.sum(outcomes == 1))]
print("النتائج:", {"0": counts[0], "1": counts[1]})

fig, ax = plt.subplots(figsize=(4.5, 3.2))
ax.bar(["|0>", "|1>"], counts, color=["#0D5C43", "#22C55E"])
ax.set_ylabel("count")
ax.set_title("1000 shots on |+>")
plt.show()`,
      },
      {
        id: "s1-phase",
        kind: "code",
        caption: "الطور العام غير قابل للرصد، أما الطور النسبي فيغيّر كل شيء",
        code: `import numpy as np

plus = np.array([1, 1]) / np.sqrt(2)
global_phase = np.exp(1j * np.pi / 3) * plus
minus = np.array([1, -1]) / np.sqrt(2)

print("احتمالات |+>          :", np.round(np.abs(plus) ** 2, 4))
print("احتمالات e^{iθ}|+>    :", np.round(np.abs(global_phase) ** 2, 4))
print("تداخل مع |+> للحالة |->:", round(float(np.abs(np.vdot(plus, minus)) ** 2), 6))`,
      },
      {
        id: "s1-ex",
        kind: "exercise",
        prompt: String.raw`### تمرين: بناء حالة مُطبَّعة

اكتب دالة ` + "`make_state(alpha, beta)`" + String.raw` تُعيد مصفوفة numpy تمثّل حالة الكيوبت بعد **تطبيعها**، حتى لو لم يكن المُدخل مُطبَّعاً أصلاً.

مثال: المُدخل $(3, 4)$ يعطي $(0.6, 0.8)$.`,
        template: `import numpy as np

def make_state(alpha, beta):
    # اكتب الكود هنا
    pass

print(make_state(3, 4))`,
        hints: [
          "أنشئ المتجه: `v = np.array([alpha, beta], dtype=complex)`.",
          "ثم اقسمه على طوله: `return v / np.linalg.norm(v)`.",
        ],
        solution: `import numpy as np

def make_state(alpha, beta):
    v = np.array([alpha, beta], dtype=complex)
    return v / np.linalg.norm(v)

print(make_state(3, 4))`,
        validator: `import numpy as np
assert "make_state" in globals(), "لم تُعرّف الدالة make_state بعد."
s = make_state(3, 4)
assert abs(np.linalg.norm(s) - 1) < 1e-9, "الحالة الناتجة يجب أن تكون مُطبَّعة."
assert abs(abs(s[0]) - 0.6) < 1e-9, "المركّبة الأولى للمدخل (3,4) يجب أن تساوي 0.6."
assert abs(abs(s[1]) - 0.8) < 1e-9, "المركّبة الثانية للمدخل (3,4) يجب أن تساوي 0.8."
t = make_state(1, 1)
assert abs(np.linalg.norm(t) - 1) < 1e-9, "التطبيع يجب أن يعمل مع أي مُدخل."`,
        points: 30,
      },
    ],
  },

  /* ================================================================ */
  {
    slug: "single-qubit-gates",
    track: "silver",
    titleAr: "البوابات الأحادية وكرة بلوخ",
    titleEn: "Single-Qubit Gates & the Bloch Sphere",
    summary:
      "بوابات باولي وهادامارد وبوابات الطور كمصفوفات وحدوية، وربط أثرها بدوران متجه بلوخ.",
    order: 2,
    estimatedMinutes: 28,
    objectives: [
      "تطبيق بوابات X و Z و H على الحالات",
      "التحقق من وحدوية البوابات برمجياً",
      "حساب متجه بلوخ من متجه الحالة",
      "تركيب البوابات وإثبات متطابقات مثل HZH = X",
    ],
    prerequisites: ["حالات الكيوبت والتراكب الكمي"],
    keywords: ["gates", "بوابات", "bloch", "بلوخ", "hadamard", "pauli"],
    cells: [
      {
        id: "s2-md",
        kind: "markdown",
        content: String.raw`## البوابات مصفوفات وحدوية

$$X = \begin{pmatrix} 0 & 1 \\ 1 & 0 \end{pmatrix}, \quad Z = \begin{pmatrix} 1 & 0 \\ 0 & -1 \end{pmatrix}, \quad H = \frac{1}{\sqrt{2}}\begin{pmatrix} 1 & 1 \\ 1 & -1 \end{pmatrix}$$

الشرط الوحيد لصلاحية البوابة هو الوحدوية $U^{\dagger}U = I$، وهي التي تضمن حفظ الاحتمالات وقابلية عكس العملية.`,
      },
      {
        id: "s2-gates",
        kind: "code",
        caption: "تعريف البوابات وتطبيقها",
        code: `import numpy as np

I = np.eye(2, dtype=complex)
X = np.array([[0, 1], [1, 0]], dtype=complex)
Y = np.array([[0, -1j], [1j, 0]], dtype=complex)
Z = np.array([[1, 0], [0, -1]], dtype=complex)
H = np.array([[1, 1], [1, -1]], dtype=complex) / np.sqrt(2)
S = np.array([[1, 0], [0, 1j]], dtype=complex)

ket0 = np.array([1, 0], dtype=complex)

print("X|0> =", np.round(X @ ket0, 3))
print("H|0> =", np.round(H @ ket0, 3))
print("Z(H|0>) =", np.round(Z @ (H @ ket0), 3))

for name, G in [("X", X), ("Y", Y), ("Z", Z), ("H", H), ("S", S)]:
    print(name, "وحدوية؟", np.allclose(G.conj().T @ G, I))`,
      },
      {
        id: "s2-identity",
        kind: "code",
        caption: "إثبات المتطابقة HZH = X عددياً",
        code: `import numpy as np

X = np.array([[0, 1], [1, 0]], dtype=complex)
Z = np.array([[1, 0], [0, -1]], dtype=complex)
H = np.array([[1, 1], [1, -1]], dtype=complex) / np.sqrt(2)

print(np.round(H @ Z @ H, 10))
print("HZH == X ؟", np.allclose(H @ Z @ H, X))
print("HXH == Z ؟", np.allclose(H @ X @ H, Z))
print("S² == Z ؟", np.allclose(np.array([[1,0],[0,1j]]) @ np.array([[1,0],[0,1j]]), Z))`,
      },
      {
        id: "s2-bloch",
        kind: "code",
        caption: "من متجه الحالة إلى متجه بلوخ",
        code: `import numpy as np

X = np.array([[0, 1], [1, 0]], dtype=complex)
Y = np.array([[0, -1j], [1j, 0]], dtype=complex)
Z = np.array([[1, 0], [0, -1]], dtype=complex)

def bloch_vector(state):
    return [round(float(np.real(np.vdot(state, G @ state))), 6) for G in (X, Y, Z)]

ket0 = np.array([1, 0], dtype=complex)
plus = np.array([1, 1], dtype=complex) / np.sqrt(2)
minus = np.array([1, -1], dtype=complex) / np.sqrt(2)
plus_i = np.array([1, 1j], dtype=complex) / np.sqrt(2)

print("|0>  ->", bloch_vector(ket0))
print("|+>  ->", bloch_vector(plus))
print("|->  ->", bloch_vector(minus))
print("|+i> ->", bloch_vector(plus_i))`,
      },
      {
        id: "s2-ex",
        kind: "exercise",
        prompt: String.raw`### تمرين: بوابة الدوران حول المحور Y

بوابة الدوران $R_y(\theta)$ تُعطى بالمصفوفة:

$$R_y(\theta) = \begin{pmatrix} \cos\frac{\theta}{2} & -\sin\frac{\theta}{2} \\ \sin\frac{\theta}{2} & \cos\frac{\theta}{2} \end{pmatrix}$$

اكتب دالة ` + "`ry(theta)`" + String.raw` تُعيد هذه المصفوفة كمصفوفة numpy. تحقّق أن $R_y(\pi)$ تحوّل $|0\rangle$ إلى $|1\rangle$ (بفارق إشارة).`,
        template: `import numpy as np

def ry(theta):
    # اكتب الكود هنا
    pass

print(np.round(ry(np.pi), 6))`,
        hints: [
          "احسب نصف الزاوية أولاً: `h = theta / 2`.",
          "استعمل `np.cos(h)` و `np.sin(h)` داخل `np.array([[...], [...]])`.",
        ],
        solution: `import numpy as np

def ry(theta):
    h = theta / 2
    return np.array([[np.cos(h), -np.sin(h)],
                     [np.sin(h), np.cos(h)]], dtype=complex)

print(np.round(ry(np.pi), 6))`,
        validator: `import numpy as np
assert "ry" in globals(), "لم تُعرّف الدالة ry بعد."
R0 = np.array(ry(0))
assert np.allclose(R0, np.eye(2)), "الدوران بزاوية صفر يجب أن يعطي مصفوفة الهوية."
Rp = np.array(ry(np.pi))
assert np.allclose(Rp.conj().T @ Rp, np.eye(2)), "المصفوفة يجب أن تكون وحدوية لأي زاوية."
out = Rp @ np.array([1, 0], dtype=complex)
assert abs(abs(out[1]) - 1) < 1e-9, "الدوران بزاوية π يجب أن ينقل |0> إلى |1>."
Rh = np.array(ry(np.pi / 2)) @ np.array([1, 0], dtype=complex)
assert abs(abs(Rh[0]) - 2 ** -0.5) < 1e-9, "الدوران بزاوية π/2 يجب أن يعطي تراكباً متساوياً."`,
        points: 35,
      },
    ],
  },

  /* ================================================================ */
  {
    slug: "entanglement-bell",
    track: "silver",
    titleAr: "التشابك وحالات بيل",
    titleEn: "Entanglement & Bell States",
    summary:
      "بناء حالات بيل الأربع بدائرة من بوابتين، اختبار قابلية الفصل، وحساب المصفوفة المختزلة التي تكشف التشابك.",
    order: 3,
    estimatedMinutes: 30,
    objectives: [
      "بناء بوابة CNOT وتطبيقها على حالات كيوبتين",
      "توليد حالات بيل الأربع",
      "اختبار قابلية الفصل عددياً",
      "حساب الأثر الجزئي والمصفوفة المختزلة",
    ],
    prerequisites: ["البوابات الأحادية وكرة بلوخ"],
    keywords: ["entanglement", "تشابك", "bell", "بيل", "cnot", "أثر جزئي"],
    cells: [
      {
        id: "s3-md",
        kind: "markdown",
        content: String.raw`## دائرة حالة بيل

بوابتان فقط تكفيان لتوليد التشابك التام:

$$|00\rangle \xrightarrow{\;H \otimes I\;} \frac{|00\rangle + |10\rangle}{\sqrt{2}} \xrightarrow{\;\text{CNOT}\;} \frac{|00\rangle + |11\rangle}{\sqrt{2}} = |\Phi^{+}\rangle$$`,
      },
      {
        id: "s3-bell",
        kind: "code",
        caption: "توليد حالات بيل الأربع من مُدخلات الأساس الحسابي",
        code: `import numpy as np

H = np.array([[1, 1], [1, -1]], dtype=complex) / np.sqrt(2)
I = np.eye(2, dtype=complex)
CNOT = np.array([[1, 0, 0, 0],
                 [0, 1, 0, 0],
                 [0, 0, 0, 1],
                 [0, 0, 1, 0]], dtype=complex)

basis = {"00": [1, 0, 0, 0], "01": [0, 1, 0, 0],
         "10": [0, 0, 1, 0], "11": [0, 0, 0, 1]}

for label, vec in basis.items():
    bell = CNOT @ (np.kron(H, I) @ np.array(vec, dtype=complex))
    print(f"|{label}> -> {np.round(np.real(bell), 3)}")`,
      },
      {
        id: "s3-separable",
        kind: "code",
        caption: "اختبار قابلية الفصل: a00·a11 مقابل a01·a10",
        code: `import numpy as np

def is_separable(state):
    a00, a01, a10, a11 = state
    return bool(abs(a00 * a11 - a01 * a10) < 1e-9)

bell = np.array([1, 0, 0, 1], dtype=complex) / np.sqrt(2)
product = np.kron([1, 1] / np.sqrt(2), [1, 1] / np.sqrt(2))

print("حالة بيل قابلة للفصل؟", is_separable(bell))
print("الحالة |+>⊗|+> قابلة للفصل؟", is_separable(product))`,
      },
      {
        id: "s3-partial",
        kind: "code",
        caption: "الأثر الجزئي: كل جزء من حالة بيل مختلط اختلاطاً أقصى",
        code: `import numpy as np

bell = np.array([1, 0, 0, 1], dtype=complex) / np.sqrt(2)
rho = np.outer(bell, bell.conj())

rho_A = np.trace(rho.reshape(2, 2, 2, 2), axis1=1, axis2=3)
print("المصفوفة المختزلة للكيوبت الأول:")
print(np.round(np.real(rho_A), 4))
print("النقاء:", round(float(np.real(np.trace(rho_A @ rho_A))), 4))
print("نقاء الحالة الكلية:", round(float(np.real(np.trace(rho @ rho))), 4))`,
      },
      {
        id: "s3-ex",
        kind: "exercise",
        prompt: String.raw`### تمرين: قياس الارتباط في حالة بيل

اكتب دالة ` + "`bell_probabilities(state)`" + String.raw` تستقبل متجه حالة كيوبتين وتُعيد قائمة من أربعة احتمالات للنتائج ` + "`00, 01, 10, 11`" + String.raw` بالترتيب.

طبّقها على حالة بيل ولاحظ أن النتيجتين المختلطتين احتمالهما صفر — وهذا هو الارتباط التام.`,
        template: `import numpy as np

def bell_probabilities(state):
    # اكتب الكود هنا
    pass

bell = np.array([1, 0, 0, 1], dtype=complex) / np.sqrt(2)
print(bell_probabilities(bell))`,
        hints: [
          "الاحتمال هو مربّع مقدار الاتساع: `np.abs(state) ** 2`.",
          "حوّل الناتج إلى قائمة عادية بـ `.tolist()` أو باشتقاق مختصر.",
        ],
        solution: `import numpy as np

def bell_probabilities(state):
    return [float(p) for p in np.abs(np.array(state)) ** 2]

bell = np.array([1, 0, 0, 1], dtype=complex) / np.sqrt(2)
print(bell_probabilities(bell))`,
        validator: `import numpy as np
assert "bell_probabilities" in globals(), "لم تُعرّف الدالة bell_probabilities بعد."
b = np.array([1, 0, 0, 1], dtype=complex) / np.sqrt(2)
p = list(bell_probabilities(b))
assert len(p) == 4, "يجب أن تُعيد الدالة أربعة احتمالات."
assert abs(p[0] - 0.5) < 1e-9, "احتمال النتيجة 00 في حالة بيل يساوي 0.5."
assert abs(p[3] - 0.5) < 1e-9, "احتمال النتيجة 11 في حالة بيل يساوي 0.5."
assert abs(p[1]) < 1e-9 and abs(p[2]) < 1e-9, "النتيجتان 01 و 10 مستحيلتان في حالة بيل."
assert abs(sum(p) - 1) < 1e-9, "مجموع الاحتمالات يجب أن يساوي واحداً."`,
        points: 35,
      },
    ],
  },
];
