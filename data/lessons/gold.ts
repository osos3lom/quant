/**
 * data/lessons/gold.ts
 * منهج المستوى الذهبي (QGold): الخوارزميات الكمية وتصحيح الأخطاء.
 */
import type { Notebook } from "@/types/lessons";

export const goldNotebooks: Notebook[] = [
  /* ================================================================ */
  {
    slug: "grover-search",
    track: "gold",
    titleAr: "خوارزمية غروفر للبحث",
    titleEn: "Grover's Search Algorithm",
    summary:
      "بناء الأوراكل ومؤثّر الانتشار خطوة بخطوة، ورؤية الاتساع يتركّز على الحل مع كل تكرار حتى العدد الأمثل.",
    order: 1,
    estimatedMinutes: 35,
    objectives: [
      "بناء أوراكل يقلب طور الحل المطلوب",
      "بناء مؤثّر الانتشار حول المتوسط",
      "تتبّع احتمال النجاح عبر التكرارات",
      "التحقق من العدد الأمثل للتكرارات",
    ],
    prerequisites: ["إتمام المستوى الفضي أو معرفة مكافئة"],
    keywords: ["grover", "غروفر", "بحث", "oracle", "أوراكل", "amplitude"],
    cells: [
      {
        id: "g1-md",
        kind: "markdown",
        content: String.raw`## فكرة غروفر

نبدأ من تراكب متساوٍ على كل المدخلات، ثم نكرّر خطوتين:

1. **الأوراكل**: يقلب إشارة اتساع الحل المطلوب فقط.
2. **الانتشار**: انعكاس حول متوسط الاتساعات، فيكبر اتساع الحل ويصغر الباقي.

العدد الأمثل للتكرارات هو $k \approx \frac{\pi}{4}\sqrt{N}$، وتجاوزه **يُنقص** احتمال النجاح لأن المتجه يدور متجاوزاً الحل.`,
      },
      {
        id: "g1-build",
        kind: "code",
        caption: "الأوراكل ومؤثّر الانتشار على فضاء من ثماني حالات",
        code: `import numpy as np

N = 8
target = 5

def oracle(state, marked):
    out = state.copy()
    out[marked] = -out[marked]
    return out

def diffusion(state):
    mean = np.mean(state)
    return 2 * mean - state

state = np.ones(N) / np.sqrt(N)
print("الاتساع الابتدائي لكل حالة:", round(float(state[0]), 4))
print("احتمال الحل قبل البدء:", round(float(state[target] ** 2), 4))`,
      },
      {
        id: "g1-iterate",
        kind: "code",
        caption: "تتبّع احتمال النجاح عبر التكرارات",
        code: `import numpy as np

N = 8
target = 5
state = np.ones(N) / np.sqrt(N)

for step in range(1, 7):
    state[target] = -state[target]
    state = 2 * np.mean(state) - state
    probability = float(state[target] ** 2)
    print(f"بعد {step} تكرار: احتمال الحل = {probability:.4f}")

optimal = int(np.floor(np.pi / 4 * np.sqrt(N)))
print("العدد الأمثل نظرياً:", optimal)`,
      },
      {
        id: "g1-plot",
        kind: "code",
        caption: "رسم منحنى احتمال النجاح — لاحظ الهبوط بعد النقطة المثلى",
        code: `import numpy as np
import matplotlib.pyplot as plt

N = 8
target = 5
state = np.ones(N) / np.sqrt(N)
probabilities = [float(state[target] ** 2)]

for _ in range(10):
    state[target] = -state[target]
    state = 2 * np.mean(state) - state
    probabilities.append(float(state[target] ** 2))

fig, ax = plt.subplots(figsize=(5, 3.2))
ax.plot(range(len(probabilities)), probabilities, marker="o", color="#0D5C43")
ax.axvline(np.pi / 4 * np.sqrt(N), color="#22C55E", linestyle="--", label="optimal k")
ax.set_xlabel("iterations")
ax.set_ylabel("success probability")
ax.set_ylim(0, 1.05)
ax.grid(alpha=0.3)
ax.legend()
plt.show()`,
      },
      {
        id: "g1-ex",
        kind: "exercise",
        prompt: String.raw`### تمرين: عدد التكرارات الأمثل

اكتب دالة ` + "`optimal_iterations(n_items)`" + String.raw` تُعيد **عدداً صحيحاً** هو عدد تكرارات غروفر الأمثل:

$$k = \left\lfloor \frac{\pi}{4}\sqrt{N} \right\rfloor$$

تحقّق أن $N = 4$ يعطي تكراراً واحداً، وأن $N = 10^6$ يعطي $785$.`,
        template: `import numpy as np

def optimal_iterations(n_items):
    # اكتب الكود هنا
    pass

print(optimal_iterations(4), optimal_iterations(1000000))`,
        hints: [
          "استعمل `np.sqrt(n_items)` ثم اضرب في `np.pi / 4`.",
          "قرّب لأسفل وحوّل إلى عدد صحيح: `int(np.floor(...))`.",
        ],
        solution: `import numpy as np

def optimal_iterations(n_items):
    return int(np.floor(np.pi / 4 * np.sqrt(n_items)))

print(optimal_iterations(4), optimal_iterations(1000000))`,
        validator: `assert "optimal_iterations" in globals(), "لم تُعرّف الدالة optimal_iterations بعد."
k4 = optimal_iterations(4)
assert isinstance(k4, int), "يجب أن تُعيد الدالة عدداً صحيحاً لا عدداً عشرياً."
assert k4 == 1, "للحالة N=4 العدد الأمثل هو تكرار واحد."
assert optimal_iterations(1000000) == 785, "للحالة N=10^6 العدد الأمثل هو 785."
assert optimal_iterations(16) == 3, "للحالة N=16 العدد الأمثل هو 3."`,
        points: 40,
      },
    ],
  },

  /* ================================================================ */
  {
    slug: "phase-estimation",
    track: "gold",
    titleAr: "ارتداد الطور وتقدير الطور",
    titleEn: "Phase Kickback & Phase Estimation",
    summary:
      "المحرّك الخفي خلف خوارزمية شور: كيف ينتقل الطور من المتجه الذاتي إلى كيوبت التحكّم، وكيف يقرأه تحويل فورييه الكمي.",
    order: 2,
    estimatedMinutes: 35,
    objectives: [
      "إظهار ارتداد الطور عددياً",
      "بناء مصفوفة تحويل فورييه الكمي والتحقق من وحدويتها",
      "تقدير طور مجهول من توزيع القياس",
      "ربط تقدير الطور بإيجاد الدور في خوارزمية شور",
    ],
    prerequisites: ["خوارزمية غروفر للبحث"],
    keywords: ["phase", "طور", "qft", "فورييه", "shor", "تقدير", "kickback"],
    cells: [
      {
        id: "g2-md",
        kind: "markdown",
        content: String.raw`## ارتداد الطور

إذا كان الهدف متجهاً ذاتياً للبوابة، أي $U|u\rangle = e^{i\varphi}|u\rangle$، فإن البوابة المحكومة تترك الهدف كما هو وتنقل الطور إلى **كيوبت التحكّم**:

$$\text{CU}\,|+\rangle|u\rangle = \left(\frac{|0\rangle + e^{i\varphi}|1\rangle}{\sqrt{2}}\right) \otimes |u\rangle$$

وهذا ما يجعل طوراً غير مرئي أصلاً قابلاً للقياس عبر التداخل.`,
      },
      {
        id: "g2-kickback",
        kind: "code",
        caption: "ارتداد الطور: الهدف لا يتغيّر والتحكّم يكتسب الطور",
        code: `import numpy as np

phi = np.pi / 3
U = np.array([[1, 0], [0, np.exp(1j * phi)]], dtype=complex)

CU = np.eye(4, dtype=complex)
CU[2:, 2:] = U

plus = np.array([1, 1], dtype=complex) / np.sqrt(2)
u = np.array([0, 1], dtype=complex)

state = np.kron(plus, u)
result = CU @ state

print("قبل:", np.round(state, 3))
print("بعد:", np.round(result, 3))
print("الطور المكتسب:", round(float(np.angle(result[3] / result[1])), 6))
print("الطور المتوقّع:", round(float(phi), 6))`,
      },
      {
        id: "g2-qft",
        kind: "code",
        caption: "مصفوفة تحويل فورييه الكمي والتحقق من وحدويتها",
        code: `import numpy as np

def qft_matrix(n_qubits):
    N = 2 ** n_qubits
    omega = np.exp(2j * np.pi / N)
    return np.array([[omega ** (j * k) for k in range(N)] for j in range(N)]) / np.sqrt(N)

F = qft_matrix(2)
print(np.round(F, 3))
print("وحدوية؟", np.allclose(F.conj().T @ F, np.eye(4)))`,
      },
      {
        id: "g2-estimate",
        kind: "code",
        caption: "تقدير طور مقداره 0.25 بدقة كيوبتين",
        code: `import numpy as np

def qft_matrix(n_qubits):
    N = 2 ** n_qubits
    omega = np.exp(2j * np.pi / N)
    return np.array([[omega ** (j * k) for k in range(N)] for j in range(N)]) / np.sqrt(N)

n = 2
N = 2 ** n
theta = 0.25

register = np.array([np.exp(2j * np.pi * theta * k) for k in range(N)]) / np.sqrt(N)
measured = qft_matrix(n).conj().T @ register
probabilities = np.abs(measured) ** 2

for index, p in enumerate(probabilities):
    print(f"القيمة {index} (أي θ = {index / N}): احتمال {p:.4f}")

best = int(np.argmax(probabilities))
print("الطور المُقدَّر:", best / N)`,
      },
      {
        id: "g2-ex",
        kind: "exercise",
        prompt: String.raw`### تمرين: قراءة الطور من الاتساعات

اكتب دالة ` + "`extract_phase(control_state)`" + String.raw` تستقبل حالة كيوبت التحكّم على الصورة $\frac{1}{\sqrt{2}}(|0\rangle + e^{i\varphi}|1\rangle)$ وتُعيد الطور $\varphi$ بالراديان في المجال $[0, 2\pi)$.`,
        template: `import numpy as np

def extract_phase(control_state):
    # اكتب الكود هنا
    pass

s = np.array([1, np.exp(1j * np.pi / 3)]) / np.sqrt(2)
print(extract_phase(s))`,
        hints: [
          "النسبة بين المركّبتين تحمل الطور: `control_state[1] / control_state[0]`.",
          "استعمل `np.angle(...)` ثم أضف `2 * np.pi` إذا كانت النتيجة سالبة.",
        ],
        solution: `import numpy as np

def extract_phase(control_state):
    ratio = control_state[1] / control_state[0]
    phase = float(np.angle(ratio))
    return phase if phase >= 0 else phase + 2 * np.pi

s = np.array([1, np.exp(1j * np.pi / 3)]) / np.sqrt(2)
print(extract_phase(s))`,
        validator: `import numpy as np
assert "extract_phase" in globals(), "لم تُعرّف الدالة extract_phase بعد."
s1 = np.array([1, np.exp(1j * np.pi / 3)]) / np.sqrt(2)
assert abs(extract_phase(s1) - np.pi / 3) < 1e-6, "الطور المتوقّع للحالة الأولى هو π/3."
s2 = np.array([1, 1]) / np.sqrt(2)
assert abs(extract_phase(s2)) < 1e-6, "الحالة |+> طورها النسبي صفر."
s3 = np.array([1, -1]) / np.sqrt(2)
assert abs(extract_phase(s3) - np.pi) < 1e-6, "الحالة |-> طورها النسبي π."
s4 = np.array([1, np.exp(1j * 5 * np.pi / 3)]) / np.sqrt(2)
assert abs(extract_phase(s4) - 5 * np.pi / 3) < 1e-6, "أعد الطور في المجال [0, 2π) لا بقيمة سالبة."`,
        points: 45,
      },
    ],
  },

  /* ================================================================ */
  {
    slug: "error-correction",
    track: "gold",
    titleAr: "تصحيح الأخطاء الكمية عملياً",
    titleEn: "Quantum Error Correction in Practice",
    summary:
      "بناء كود قلب البت ذي الثلاثة كيوبتات، حقن خطأ، قراءة المتلازمة، ثم استعادة الحالة دون قياس المعلومة نفسها.",
    order: 3,
    estimatedMinutes: 35,
    objectives: [
      "ترميز كيوبت منطقي في ثلاثة كيوبتات فيزيائية",
      "حقن خطأ قلب بت ومعاينة أثره",
      "استخراج المتلازمة وتحديد موضع الخطأ",
      "تطبيق التصحيح واستعادة الحالة الأصلية",
    ],
    prerequisites: ["ارتداد الطور وتقدير الطور"],
    keywords: ["qec", "تصحيح الأخطاء", "syndrome", "متلازمة", "bit flip", "stabilizer"],
    cells: [
      {
        id: "g3-md",
        kind: "markdown",
        content: String.raw`## كود قلب البت

نوزّع الكيوبت المنطقي على ثلاثة كيوبتات فيزيائية:

$$|0\rangle_L = |000\rangle, \qquad |1\rangle_L = |111\rangle$$

ثم نقيس المُثبِّتين $Z_1Z_2$ و $Z_2Z_3$. هذان القياسان يكشفان **موضع** الخطأ دون كشف أي شيء عن معاملَي الاتساع، فتبقى المعلومة الكمية سليمة — وهذه هي العبقرية المركزية في تصحيح الأخطاء الكمية.`,
      },
      {
        id: "g3-encode",
        kind: "code",
        caption: "ترميز حالة اعتباطية في ثلاثة كيوبتات",
        code: `import numpy as np

alpha, beta = 0.6, 0.8

logical = np.zeros(8, dtype=complex)
logical[0] = alpha   # |000>
logical[7] = beta    # |111>

labels = [format(i, "03b") for i in range(8)]
for label, amp in zip(labels, logical):
    if abs(amp) > 1e-12:
        print(f"|{label}>: {amp.real:.2f}")`,
      },
      {
        id: "g3-inject",
        kind: "code",
        caption: "حقن خطأ قلب بت على الكيوبت الأوسط",
        code: `import numpy as np

alpha, beta = 0.6, 0.8
logical = np.zeros(8, dtype=complex)
logical[0] = alpha
logical[7] = beta

X = np.array([[0, 1], [1, 0]], dtype=complex)
I = np.eye(2, dtype=complex)
X2 = np.kron(np.kron(I, X), I)

corrupted = X2 @ logical
labels = [format(i, "03b") for i in range(8)]
print("الحالة بعد الخطأ:")
for label, amp in zip(labels, corrupted):
    if abs(amp) > 1e-12:
        print(f"|{label}>: {amp.real:.2f}")`,
      },
      {
        id: "g3-syndrome",
        kind: "code",
        caption: "قراءة المتلازمة: مقارنة البتات دون قراءة الاتساعات",
        code: `def syndrome(bits):
    s1 = 1 if bits[0] == bits[1] else -1
    s2 = 1 if bits[1] == bits[2] else -1
    return (s1, s2)

table = {(1, 1): "لا يوجد خطأ", (-1, 1): "خطأ في الكيوبت 1",
         (-1, -1): "خطأ في الكيوبت 2", (1, -1): "خطأ في الكيوبت 3"}

for bits in ["000", "100", "010", "001"]:
    s = syndrome(bits)
    print(f"|{bits}> -> المتلازمة {s} -> {table[s]}")`,
      },
      {
        id: "g3-correct",
        kind: "code",
        caption: "التصحيح الكامل: من الحالة المعطوبة إلى الحالة الأصلية",
        code: `import numpy as np

alpha, beta = 0.6, 0.8
logical = np.zeros(8, dtype=complex)
logical[0] = alpha
logical[7] = beta

X = np.array([[0, 1], [1, 0]], dtype=complex)
I = np.eye(2, dtype=complex)

def x_on(position):
    ops = [I, I, I]
    ops[position] = X
    return np.kron(np.kron(ops[0], ops[1]), ops[2])

corrupted = x_on(1) @ logical
recovered = x_on(1) @ corrupted

print("هل استُعيدت الحالة الأصلية؟", np.allclose(recovered, logical))
print("الاتساعات المستعادة:", round(float(recovered[0].real), 3), round(float(recovered[7].real), 3))`,
      },
      {
        id: "g3-ex",
        kind: "exercise",
        prompt: String.raw`### تمرين: جدول المتلازمة

اكتب دالة ` + "`locate_error(s1, s2)`" + String.raw` تستقبل قيمتَي المتلازمة (كلٌّ منهما $+1$ أو $-1$) وتُعيد رقم الكيوبت المعطوب: $1$ أو $2$ أو $3$، أو $0$ إن لم يكن هناك خطأ.

تذكّر: المُثبِّت الأول يقارن الكيوبتين 1 و2، والثاني يقارن 2 و3، والكيوبت الأوسط هو الوحيد المشترك بينهما.`,
        template: `def locate_error(s1, s2):
    # اكتب الكود هنا
    pass

print(locate_error(1, 1), locate_error(-1, 1), locate_error(-1, -1), locate_error(1, -1))`,
        hints: [
          "إذا كان المُثبِّتان موجبين فلا خطأ إطلاقاً.",
          "الخطأ في الكيوبت الأوسط هو الوحيد الذي يقلب إشارة المُثبِّتين معاً.",
        ],
        solution: `def locate_error(s1, s2):
    if s1 == 1 and s2 == 1:
        return 0
    if s1 == -1 and s2 == 1:
        return 1
    if s1 == -1 and s2 == -1:
        return 2
    return 3

print(locate_error(1, 1), locate_error(-1, 1), locate_error(-1, -1), locate_error(1, -1))`,
        validator: `assert "locate_error" in globals(), "لم تُعرّف الدالة locate_error بعد."
assert locate_error(1, 1) == 0, "المتلازمة (+1,+1) تعني عدم وجود خطأ."
assert locate_error(-1, 1) == 1, "المتلازمة (-1,+1) تدل على الكيوبت الأول."
assert locate_error(-1, -1) == 2, "المتلازمة (-1,-1) تدل على الكيوبت الأوسط."
assert locate_error(1, -1) == 3, "المتلازمة (+1,-1) تدل على الكيوبت الثالث."`,
        points: 45,
      },
    ],
  },
];
