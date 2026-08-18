/**
 * data/lessons/bronze-algebra.ts
 * المستوى البرونزي — المرحلة الأولى (تتمة): الجبر الخطي للحوسبة الكمية (§9–§13).
 * Bronze, stage 1 (continued): linear algebra sections of the source material.
 *
 * المصدر: "المادة العلمية للمرحلة التحضيرية" — QWorld / QSaudiArabia
 * إعداد: Abuzer Yakaryılmaz · خلود بندر المطيري · جود عوض الشهري
 *
 * بايثون صِرف بلا numpy — الأدوات العددية تأتي في المرحلة الثانية.
 */
import type { Notebook } from "@/types/lessons";

export const bronzeAlgebraNotebooks: Notebook[] = [
  /* ================================================================ */
  /* §9 المتجهات                                                      */
  /* ================================================================ */
  {
    slug: "vectors",
    track: "bronze",
    stage: 1,
    titleAr: "المتجهات",
    titleEn: "Vectors",
    summary:
      "المتجه ومركّباته وبُعده، متجه الصف والعمود والمنقول، الضرب في عدد قياسي، جمع المتجهات، والطول الإقليدي.",
    order: 8,
    estimatedMinutes: 25,
    objectives: [
      "تمثيل المتجه بقائمة Python",
      "ضرب المتجه في عدد قياسي وجمع متجهين",
      "حساب الطول الإقليدي للمتجه",
      "رسم المتجهات على المستوى الإحداثي",
    ],
    prerequisites: ["أساسيات القوائم", "الرسم باستخدام Matplotlib"],
    keywords: ["vectors", "متجهات", "norm", "طول", "منقول", "جمع"],
    cells: [
      {
        id: "a1-md",
        kind: "markdown",
        content: String.raw`## المتجه

المتجه ترتيب محدد من الأعداد يُعامل بوصفه كياناً رياضياً واحداً. تُسمّى الأعداد **مركّبات** المتجه، ويُسمّى عددها **بُعد** المتجه. ويمكن تمثيله في Python باستخدام قائمة.

$$v = (1, -2, 0, 5)^T$$

يمكن كتابة المتجه أفقياً بوصفه **متجه صف**، أو رأسياً بوصفه **متجه عمود**. ويشير الرمز $T$ إلى المنقول الذي يحوّل متجه الصف إلى متجه عمود.`,
      },
      {
        id: "a1-scalar",
        kind: "code",
        caption: "ضرب المتجه في عدد قياسي: نضرب كل مركّبة",
        code: `# 3v = 3(1, -2, 0, 5) = (3, -6, 0, 15)
v = [1, -2, 0, 5]
scalar = 3
result = [scalar * entry for entry in v]
print(result)`,
      },
      {
        id: "a1-add",
        kind: "code",
        caption: "جمع المتجهات: يجب تساوي البُعدين أولاً",
        code: `u = [-3, -2, 0, -1, 4]
v = [-1, -1, 2, -3, 5]

if len(u) != len(v):
    raise ValueError("dimensions must match")

result = [u[i] + v[i] for i in range(len(u))]
print(result)`,
      },
      {
        id: "a1-norm",
        kind: "code",
        caption: "الطول الإقليدي: الجذر التربيعي لمجموع مربّعات المركّبات",
        code: `from math import sqrt

v = [-1, -3, 5, 3, 1, 2]
length_squared = sum(entry ** 2 for entry in v)
length = sqrt(length_squared)
print(length)

u = [-3, 4]
print("طول (-3, 4) =", sqrt(sum(e ** 2 for e in u)))  # 5.0`,
      },
      {
        id: "a1-note",
        kind: "markdown",
        callout: "note",
        calloutTitle: "أثر الضرب القياسي على الطول",
        content: String.raw`عند ضرب المتجه $v$ في عدد قياسي $r$ فإن:

$$\|rv\| = |r|\,\|v\|$$

لذلك نستخدم **القيمة المطلقة** للعدد القياسي؛ فالضرب في عدد سالب يعكس الاتجاه لكنه لا يجعل الطول سالباً.`,
      },
      {
        id: "a1-plot",
        kind: "code",
        caption: "تمثيل المتجهات بيانياً: سهم من نقطة الأصل",
        code: `import matplotlib.pyplot as plt

def draw_vector(x, y, color, label):
    plt.annotate("", xy=(x, y), xytext=(0, 0),
                 arrowprops={"arrowstyle": "->", "color": color, "linewidth": 2})
    plt.text(x * 1.08, y * 1.08, label)

plt.figure(figsize=(5, 5), dpi=100)
draw_vector(1, 2, "#0D5C43", "v = (1,2)")
draw_vector(-3, 4, "#22C55E", "u = (-3,4)")
plt.axhline(0, color="#94a3b8", linewidth=0.8)
plt.axvline(0, color="#94a3b8", linewidth=0.8)
plt.xlim(-5, 5)
plt.ylim(-5, 5)
plt.grid(alpha=0.3)
plt.gca().set_aspect("equal", adjustable="box")
plt.show()`,
      },
      {
        id: "a1-ex1",
        kind: "exercise",
        prompt: String.raw`### تمرين 1

أنشئ متجهين \`u\` و \`v\` بُعد كل منهما $7$ ومركّباتهما أعداد صحيحة عشوائية من $-10$ إلى $10$، ثم احسب مجموعهما وخزّنه في \`total\`.`,
        template: `from random import randrange

u = []
v = []
total = []
# اكتب الكود هنا
print(u)
print(v)
print(total)`,
        hints: [
          "`randrange(-10, 11)` يعطي عدداً من -10 إلى 10 لأن الحد الأعلى مستبعد.",
          "اجمع بالفهرس: `[u[i] + v[i] for i in range(7)]`.",
        ],
        solution: `from random import randrange

u = [randrange(-10, 11) for _ in range(7)]
v = [randrange(-10, 11) for _ in range(7)]
total = [u[i] + v[i] for i in range(len(u))]
print(u)
print(v)
print(total)`,
        validator: `for name in ("u", "v", "total"):
    assert name in globals(), "لم تُعرّف المتجه " + name + " بعد."
assert len(u) == 7 and len(v) == 7, "بُعد كل متجه يجب أن يكون 7."
assert len(total) == 7, "المجموع يجب أن يكون بالبُعد نفسه."
assert all(-10 <= e <= 10 for e in u + v), "المركّبات يجب أن تقع بين -10 و 10."
assert all(total[i] == u[i] + v[i] for i in range(7)), "كل مركّبة في المجموع يجب أن تساوي مجموع المركّبتين المتناظرتين."`,
        points: 25,
      },
      {
        id: "a1-ex2",
        kind: "exercise",
        prompt: String.raw`### تمرين 2

للمتجهين نفسيهما، احسب المتجه $3u - 2v$ وخزّنه في \`combo\`.`,
        template: `combo = []
# اكتب الكود هنا
print(combo)`,
        hints: [
          "اضرب كل متجه في معامله ثم اطرح بالفهرس.",
          "بسطر واحد: `[3 * u[i] - 2 * v[i] for i in range(len(u))]`.",
        ],
        solution: `combo = [3 * u[i] - 2 * v[i] for i in range(len(u))]
print(combo)`,
        validator: `assert "combo" in globals(), "لم تُعرّف المتجه combo بعد."
assert len(combo) == 7, "الناتج يجب أن يكون بالبُعد 7."
assert all(combo[i] == 3 * u[i] - 2 * v[i] for i in range(7)), "راجع المعاملين: المطلوب 3u - 2v."`,
        points: 25,
      },
    ],
  },

  /* ================================================================ */
  /* §10 الضرب القياسي                                                */
  /* ================================================================ */
  {
    slug: "dot-product",
    track: "bronze",
    stage: 1,
    titleAr: "الضرب القياسي",
    titleEn: "Dot Product",
    summary:
      "الضرب القياسي بين متجهين، علاقته بطول المتجه، وشرط التعامد — وهو ما يقابل الضرب الداخلي في ترميز ديراك لاحقاً.",
    order: 9,
    estimatedMinutes: 22,
    objectives: [
      "حساب الضرب القياسي لمتجهين لهما البُعد نفسه",
      "اشتقاق الطول من الضرب القياسي للمتجه في نفسه",
      "اختبار تعامد متجهين",
      "التحقق من أن تغيير الإشارة لا يكسر التعامد",
    ],
    prerequisites: ["المتجهات"],
    keywords: ["dot product", "ضرب قياسي", "تعامد", "orthogonal", "طول"],
    cells: [
      {
        id: "a2-md",
        kind: "markdown",
        content: String.raw`## الضرب القياسي

الضرب القياسي عملية بين متجهين لهما البُعد نفسه، وناتجها **عدد قياسي**. نحسبه بضرب المركّبات المتناظرة ثم جمع النواتج:

$$u \cdot v = u_1v_1 + u_2v_2 + \cdots + u_nv_n$$`,
      },
      {
        id: "a2-dot",
        kind: "code",
        caption: "الحساب المباشر بحلقة",
        code: `u = [-3, -2, 0, -1, 4]
v = [-1, -1, 2, -3, 5]

dot_product = 0
for i in range(len(u)):
    dot_product += u[i] * v[i]

print(dot_product)  # 28`,
      },
      {
        id: "a2-length",
        kind: "code",
        caption: "العلاقة بين الضرب القياسي وطول المتجه",
        code: `from math import sqrt

def dot(u, v):
    if len(u) != len(v):
        raise ValueError("dimensions must match")
    return sum(u[i] * v[i] for i in range(len(u)))

u = [-3, -4]
print("u · u =", dot(u, u))
print("‖u‖ =", sqrt(dot(u, u)))  # 5.0`,
      },
      {
        id: "a2-ortho",
        kind: "code",
        caption: "التعامد: ناتج الضرب القياسي يساوي صفراً",
        code: `def dot(u, v):
    return sum(u[i] * v[i] for i in range(len(u)))

print(dot([0, -5], [-4, 0]))   # متعامدان
print(dot([-3, -4], [-4, 3]))  # متعامدان أيضاً
print(dot([1, 1], [1, 1]))     # غير متعامدين`,
      },
      {
        id: "a2-ex1",
        kind: "exercise",
        prompt: String.raw`### تمرين 1

احسب الضرب القياسي للمتجهين الآتيين وخزّنه في \`d1\`:

$$u = (4, 3, 6, 5)^T, \qquad v = (-3, 4, -5, 6)^T$$

يجب أن تكون النتيجة **صفراً**.`,
        template: `u1 = [4, 3, 6, 5]
v1 = [-3, 4, -5, 6]
d1 =
# اكتب الكود هنا
print(d1)`,
        hints: [
          "اضرب المركّبات المتناظرة ثم اجمع: 4·(-3) + 3·4 + 6·(-5) + 5·6.",
          "يمكن بسطر واحد: `sum(u1[i] * v1[i] for i in range(len(u1)))`.",
        ],
        solution: `u1 = [4, 3, 6, 5]
v1 = [-3, 4, -5, 6]
d1 = sum(u1[i] * v1[i] for i in range(len(u1)))
print(d1)`,
        validator: `assert "d1" in globals(), "لم تُعرّف المتغيّر d1 بعد."
assert d1 == 0, "الضرب القياسي لهذين المتجهين يساوي صفراً — راجع حسابك."`,
        points: 20,
      },
      {
        id: "a2-ex2",
        kind: "exercise",
        prompt: String.raw`### تمرين 2

ليكن $u = (-3, -4)^T$. احسب $u \cdot u$ وخزّنه في \`uu\`، ثم استنتج طول $u$ وخزّنه في \`u_length\`.`,
        template: `u2 = [-3, -4]
uu =
u_length =
print(uu, u_length)`,
        hints: [
          "`uu` هو مجموع مربّعات المركّبات.",
          "الطول هو الجذر التربيعي: `uu ** 0.5` أو `sqrt(uu)`.",
        ],
        solution: `from math import sqrt

u2 = [-3, -4]
uu = sum(e ** 2 for e in u2)
u_length = sqrt(uu)
print(uu, u_length)`,
        validator: `assert "uu" in globals() and "u_length" in globals(), "عرّف المتغيّرين uu و u_length."
assert uu == 25, "الضرب القياسي للمتجه في نفسه يساوي 25."
assert abs(u_length - 5) < 1e-9, "طول المتجه (-3, -4) يساوي 5."`,
        points: 20,
      },
      {
        id: "a2-ex3",
        kind: "exercise",
        prompt: String.raw`### تمرين 3

تحقّق برمجياً من أن تغيير إشارة أحد المتجهين المتعامدين أو كليهما **لا يغيّر تعامدهما**.

اكتب دالة \`stays_orthogonal(u, v)\` تُعيد \`True\` إذا كانت التوليفات الأربع $(u,v)$ و $(-u,v)$ و $(u,-v)$ و $(-u,-v)$ كلها متعامدة.`,
        template: `def stays_orthogonal(u, v):
    # اكتب الكود هنا
    pass

print(stays_orthogonal([4, 3, 6, 5], [-3, 4, -5, 6]))
print(stays_orthogonal([1, 1], [1, 1]))`,
        hints: [
          "عرّف دالة مساعدة للنفي: `neg = [-e for e in u]`.",
          "افحص أن الضرب القياسي يساوي صفراً في الحالات الأربع، بهامش تسامح صغير.",
        ],
        solution: `def stays_orthogonal(u, v):
    def dot(a, b):
        return sum(a[i] * b[i] for i in range(len(a)))
    nu = [-e for e in u]
    nv = [-e for e in v]
    pairs = [(u, v), (nu, v), (u, nv), (nu, nv)]
    return all(abs(dot(a, b)) < 1e-9 for a, b in pairs)

print(stays_orthogonal([4, 3, 6, 5], [-3, 4, -5, 6]))
print(stays_orthogonal([1, 1], [1, 1]))`,
        validator: `assert "stays_orthogonal" in globals(), "لم تُعرّف الدالة stays_orthogonal بعد."
assert stays_orthogonal([4, 3, 6, 5], [-3, 4, -5, 6]) is True, "هذان المتجهان متعامدان وتبقى كل التوليفات متعامدة."
assert stays_orthogonal([0, -5], [-4, 0]) is True, "المتجهان (0,-5) و (-4,0) متعامدان."
assert stays_orthogonal([1, 1], [1, 1]) is False, "هذان المتجهان غير متعامدين أصلاً."
assert stays_orthogonal([1, 2], [2, 1]) is False, "الضرب القياسي هنا يساوي 4 لا صفراً."`,
        points: 30,
      },
    ],
  },

  /* ================================================================ */
  /* §11 المصفوفات                                                    */
  /* ================================================================ */
  {
    slug: "matrices",
    track: "bronze",
    stage: 1,
    titleAr: "المصفوفات",
    titleEn: "Matrices",
    summary:
      "المصفوفة وأبعادها وفهرستها، الضرب في عدد قياسي، جمع المصفوفات، المنقول، ضرب مصفوفة في متجه، وضرب مصفوفتين وعدم إبداليته.",
    order: 10,
    estimatedMinutes: 30,
    objectives: [
      "تمثيل المصفوفة بقائمة متداخلة والوصول إلى عناصرها",
      "ضرب المصفوفة في عدد قياسي وجمع مصفوفتين",
      "حساب المنقول وضرب مصفوفة في متجه",
      "ضرب مصفوفتين وإثبات أن الضرب غير إبدالي",
    ],
    prerequisites: ["الضرب القياسي"],
    keywords: ["matrices", "مصفوفات", "transpose", "منقول", "ضرب مصفوفات", "إبدالي"],
    cells: [
      {
        id: "a3-md",
        kind: "markdown",
        content: String.raw`## المصفوفة

المصفوفة ترتيب مستطيل من الأعداد موزّع على صفوف وأعمدة. إذا احتوت $m$ صفوف و $n$ أعمدة فأبعادها $m \times n$، وتُمثَّل في Python بقائمة متداخلة ثنائية الأبعاد.

يرمز $M_{ij}$ إلى العنصر في الصف $i$ والعمود $j$. تبدأ الفهارس الرياضية عادةً من $1$، بينما تبدأ فهارس قوائم Python من $0$؛ لذلك نصل إلى $M_{ij}$ في Python باستخدام \`M[i-1][j-1]\`.`,
      },
      {
        id: "a3-build",
        kind: "code",
        caption: "بناء مصفوفة والوصول إلى عناصرها",
        code: `M = [
    [8, 0, -1, 0, 2],
    [-2, -3, 1, 1, 4],
    [0, 0, 1, -7, 1],
    [1, 4, -2, 5, 9],
]
for row in M:
    print(row)

print("الأبعاد:", len(M), "×", len(M[0]))
print(M[0][0])  # الصف الأول، العمود الأول
print(M[2][3])  # الصف الثالث، العمود الرابع
print(M[3][4])  # الصف الرابع، العمود الخامس`,
      },
      {
        id: "a3-scalar-add",
        kind: "code",
        caption: "الضرب في عدد قياسي ثم جمع المصفوفتين",
        code: `M = [
    [8, 0, -1, 0, 2],
    [-2, -3, 1, 1, 4],
    [0, 0, 1, -7, 1],
    [1, 4, -2, 5, 9],
]

scalar = -2
N = []
for row in M:
    N.append([scalar * entry for entry in row])

K = []
for i in range(len(M)):
    new_row = []
    for j in range(len(M[0])):
        new_row.append(M[i][j] + N[i][j])
    K.append(new_row)

for row in K:
    print(row)
print("لاحظ: M + (-2M) = -M")`,
      },
      {
        id: "a3-transpose",
        kind: "code",
        caption: "المنقول: تبديل الصفوف بالأعمدة",
        code: `M = [
    [-2, 3, 0, 4],
    [-1, 1, 5, 9],
]

MT = []
for j in range(len(M[0])):
    MT.append([M[i][j] for i in range(len(M))])

print("الأصلية:", len(M), "×", len(M[0]))
print("المنقولة:", len(MT), "×", len(MT[0]))
for row in MT:
    print(row)`,
      },
      {
        id: "a3-matvec",
        kind: "code",
        caption: "ضرب مصفوفة في متجه: كل مركّبة ناتجة ضرب قياسي لصف في المتجه",
        code: `M = [
    [-1, 0, 1],
    [-2, -3, 4],
    [1, 5, 6],
]
v = [1, -3, 2]

u = []
for row in M:
    entry = sum(row[j] * v[j] for j in range(len(v)))
    u.append(entry)

print(u)  # [1, 15, -2]`,
      },
      {
        id: "a3-matmul",
        kind: "code",
        caption: "ضرب مصفوفتين: العنصر (i,j) ضرب قياسي للصف i من A والعمود j من B",
        code: `def matrix_multiply(A, B):
    if len(A[0]) != len(B):
        raise ValueError("incompatible matrix dimensions")
    result = []
    for i in range(len(A)):
        row = []
        for j in range(len(B[0])):
            value = sum(A[i][k] * B[k][j] for k in range(len(B)))
            row.append(value)
        result.append(row)
    return result

A = [[1, 2], [3, 4]]
B = [[0, 1], [1, 0]]
for row in matrix_multiply(A, B):
    print(row)`,
      },
      {
        id: "a3-noncommute",
        kind: "code",
        caption: "الضرب غير إبدالي: AB قد يختلف عن BA",
        code: `A = [[1, 2], [3, 4]]
B = [[0, 1], [1, 0]]

AB = matrix_multiply(A, B)
BA = matrix_multiply(B, A)

print("AB =", AB)
print("BA =", BA)
print("هل AB = BA؟", AB == BA)`,
      },
      {
        id: "a3-note",
        kind: "markdown",
        callout: "warning",
        calloutTitle: "شروط التعريف",
        content: String.raw`- حاصل الضرب $AB$ معرّف فقط عندما يساوي **عدد أعمدة $A$ عدد صفوف $B$**.
- الضرب ليس إبدالياً في العموم؛ فقد يكون $AB \neq BA$، بل قد يكون أحد الضربين غير معرّف أصلاً.

هذه الخاصية جوهرية في الحوسبة الكمية: ترتيب تطبيق البوابات يغيّر النتيجة، ومن هنا يأتي مفهوم المُبدِّل $[A, B] = AB - BA$.`,
      },
      {
        id: "a3-ex1",
        kind: "exercise",
        prompt: String.raw`### تمرين 1

أنشئ مصفوفتين \`A\` و \`B\` أبعادهما $3 \times 4$ وعناصرهما أعداد صحيحة عشوائية من $-5$ إلى $5$، ثم احسب:

$$C = 3A - 2B$$`,
        template: `from random import randrange

A = []
B = []
C = []
# اكتب الكود هنا
for row in C:
    print(row)`,
        hints: [
          "لبناء صف عشوائي: `[randrange(-5, 6) for _ in range(4)]` وكرّره ثلاث مرات.",
          "احسب C بحلقتين متداخلتين: `3 * A[i][j] - 2 * B[i][j]`.",
        ],
        solution: `from random import randrange

A = [[randrange(-5, 6) for _ in range(4)] for _ in range(3)]
B = [[randrange(-5, 6) for _ in range(4)] for _ in range(3)]

C = []
for i in range(3):
    row = []
    for j in range(4):
        row.append(3 * A[i][j] - 2 * B[i][j])
    C.append(row)

for row in C:
    print(row)`,
        validator: `for name in ("A", "B", "C"):
    assert name in globals(), "لم تُعرّف المصفوفة " + name + " بعد."
assert len(A) == 3 and len(A[0]) == 4, "أبعاد A يجب أن تكون 3 × 4."
assert len(B) == 3 and len(B[0]) == 4, "أبعاد B يجب أن تكون 3 × 4."
assert len(C) == 3 and len(C[0]) == 4, "أبعاد C يجب أن تكون 3 × 4."
assert all(-5 <= A[i][j] <= 5 and -5 <= B[i][j] <= 5 for i in range(3) for j in range(4)), "العناصر يجب أن تقع بين -5 و 5."
assert all(C[i][j] == 3 * A[i][j] - 2 * B[i][j] for i in range(3) for j in range(4)), "راجع الصيغة: المطلوب C = 3A - 2B."`,
        points: 30,
      },
      {
        id: "a3-ex2",
        kind: "exercise",
        prompt: String.raw`### تمرين 2

اكتب دالة \`transpose(M)\` تُعيد منقول المصفوفة، ثم طبّقها على \`A\` و \`B\` من التمرين السابق وتحقّق من أن أبعاد الناتج $4 \times 3$.

$$(M^T)_{ji} = M_{ij}$$`,
        template: `def transpose(M):
    # اكتب الكود هنا
    pass

AT = transpose(A)
BT = transpose(B)
print(len(AT), "×", len(AT[0]))`,
        hints: [
          "عدد صفوف الناتج يساوي عدد أعمدة الأصل: `len(M[0])`.",
          "اشتقاق مزدوج: `[[M[i][j] for i in range(len(M))] for j in range(len(M[0]))]`.",
        ],
        solution: `def transpose(M):
    return [[M[i][j] for i in range(len(M))] for j in range(len(M[0]))]

AT = transpose(A)
BT = transpose(B)
print(len(AT), "×", len(AT[0]))`,
        validator: `assert "transpose" in globals(), "لم تُعرّف الدالة transpose بعد."
r = transpose([[1, 2, 3], [4, 5, 6]])
assert r == [[1, 4], [2, 5], [3, 6]], "منقول المصفوفة 2×3 يجب أن يكون 3×2 بالترتيب الصحيح."
assert "AT" in globals() and len(AT) == 4 and len(AT[0]) == 3, "أبعاد منقول A يجب أن تكون 4 × 3."
assert transpose(transpose([[1, 2, 3], [4, 5, 6]])) == [[1, 2, 3], [4, 5, 6]], "منقول المنقول يعيد المصفوفة الأصلية."`,
        points: 30,
      },
      {
        id: "a3-ex3",
        kind: "exercise",
        prompt: String.raw`### تمرين 3

اختر مصفوفتين مربّعتين $2 \times 2$، ثم احسب $AB$ و $BA$ وقدّم مثالاً يوضّح أنهما **غير متساويين**.

خزّن الناتجين في \`AB\` و \`BA\`، وخزّن في \`P\` و \`Q\` المصفوفتين اللتين استعملتهما.`,
        template: `def matmul(X, Y):
    # اكتب الكود هنا
    pass

P = [[1, 2], [3, 4]]
Q = [[0, 1], [1, 0]]
AB = matmul(P, Q)
BA = matmul(Q, P)
print(AB)
print(BA)
print("متساويتان؟", AB == BA)`,
        hints: [
          "العنصر (i,j) هو `sum(X[i][k] * Y[k][j] for k in range(len(Y)))`.",
          "اختر مصفوفتين لا تتبادلان — مثل مصفوفة اعتباطية مع مصفوفة التبديل [[0,1],[1,0]].",
        ],
        solution: `def matmul(X, Y):
    result = []
    for i in range(len(X)):
        row = []
        for j in range(len(Y[0])):
            row.append(sum(X[i][k] * Y[k][j] for k in range(len(Y))))
        result.append(row)
    return result

P = [[1, 2], [3, 4]]
Q = [[0, 1], [1, 0]]
AB = matmul(P, Q)
BA = matmul(Q, P)
print(AB)
print(BA)
print("متساويتان؟", AB == BA)`,
        validator: `assert "matmul" in globals(), "لم تُعرّف الدالة matmul بعد."
assert matmul([[1, 2], [3, 4]], [[1, 0], [0, 1]]) == [[1, 2], [3, 4]], "الضرب في مصفوفة الهوية يجب أن يعيد المصفوفة نفسها."
assert matmul([[1, 2], [3, 4]], [[0, 1], [1, 0]]) == [[2, 1], [4, 3]], "راجع صيغة ضرب المصفوفات."
for name in ("P", "Q", "AB", "BA"):
    assert name in globals(), "لم تُعرّف " + name + " بعد."
assert AB == matmul(P, Q) and BA == matmul(Q, P), "AB و BA يجب أن يكونا ناتجَي الضرب بالترتيبين."
assert AB != BA, "اختر مصفوفتين لا تتبادلان كي يظهر أن الضرب غير إبدالي."`,
        points: 35,
      },
    ],
  },

  /* ================================================================ */
  /* §12 الضرب التنسوري                                               */
  /* ================================================================ */
  {
    slug: "tensor-product",
    track: "bronze",
    stage: 1,
    titleAr: "الضرب التنسوري",
    titleEn: "Tensor Product",
    summary:
      "العملية التي تبني فضاءً مركّباً من فضاءين: الضرب التنسوري للمتجهات وللمصفوفات، وأثر ترتيب العاملين.",
    order: 11,
    estimatedMinutes: 28,
    objectives: [
      "حساب الضرب التنسوري لمتجهين بأبعاد مختلفة",
      "إدراك أن ترتيب العاملين يغيّر الناتج",
      "حساب الضرب التنسوري لمصفوفتين",
      "التحقق من أبعاد النواتج",
    ],
    prerequisites: ["المصفوفات"],
    keywords: ["tensor", "ضرب تنسوري", "kron", "أبعاد", "كيوبتين"],
    cells: [
      {
        id: "a4-md",
        kind: "markdown",
        content: String.raw`## الضرب التنسوري

الضرب التنسوري عملية تُستخدم لبناء فضاء مركّب من فضاءين. في الحوسبة الكمية يُستخدم لتمثيل الحالة المشتركة لنظام يتكوّن من كيوبتين أو أكثر، ويُرمز إليه بالرمز $\otimes$.

إذا كان $u$ ذا بُعد $m$ و $v$ ذا بُعد $n$، فإن $u \otimes v$ متجه بُعده $mn$، ويتكوّن من ضرب كل مركّبة في $u$ في المتجه $v$ كاملاً:

$$u \otimes v = (u_1v_1, \ldots, u_1v_n, u_2v_1, \ldots, u_mv_n)^T$$

$$(-2, 3)^T \otimes (1, 2, -3)^T = (-2, -4, 6, 3, 6, -9)^T$$`,
      },
      {
        id: "a4-vectors",
        kind: "code",
        caption: "الضرب التنسوري لمتجهين",
        code: `def tensor_vectors(u, v):
    result = []
    for u_entry in u:
        for v_entry in v:
            result.append(u_entry * v_entry)
    return result

u = [-2, 3]
v = [1, 2, -3]
print(tensor_vectors(u, v))
print("البُعد:", len(u), "×", len(v), "=", len(tensor_vectors(u, v)))`,
      },
      {
        id: "a4-order",
        kind: "code",
        caption: "الترتيب مهم: u ⊗ v يختلف عن v ⊗ u رغم تساوي البُعدين",
        code: `u = [-2, 3]
v = [1, 2, -3]

uv = tensor_vectors(u, v)
vu = tensor_vectors(v, u)

print("u ⊗ v =", uv)
print("v ⊗ u =", vu)
print("متساويان؟", uv == vu)
print("البُعد نفسه؟", len(uv) == len(vu))`,
      },
      {
        id: "a4-matrices",
        kind: "code",
        caption: "الضرب التنسوري لمصفوفتين: كل عنصر يُستبدل بالكتلة aᵢⱼB",
        code: `def tensor_matrices(A, B):
    result = []
    for row_a in A:
        for row_b in B:
            new_row = []
            for a in row_a:
                new_row.extend(a * b for b in row_b)
            result.append(new_row)
    return result

A = [[1, 2], [3, 4]]
B = [[0, 5], [6, 7]]
T = tensor_matrices(A, B)
for row in T:
    print(row)
print("الأبعاد:", len(T), "×", len(T[0]))`,
      },
      {
        id: "a4-dims",
        kind: "markdown",
        callout: "note",
        calloutTitle: "قاعدة الأبعاد",
        content: String.raw`إذا كانت $A$ أبعادها $m \times n$ وكانت $B$ أبعادها $p \times q$، فإن أبعاد $A \otimes B$ هي:

$$(mp) \times (nq)$$

ومن هنا يأتي النمو الأسّي: نظام من $n$ كيوبتاً يعيش في فضاء بُعده $2^n$.`,
      },
      {
        id: "a4-ex1",
        kind: "exercise",
        prompt: String.raw`### تمرين 1

احسب $u \otimes v$ و $v \otimes u$ للمتجهين الآتيين، وخزّنهما في \`uv\` و \`vu\`:

$$u = (-2, -1, 0, 1)^T, \qquad v = (1, 2, 3)^T$$`,
        template: `u3 = [-2, -1, 0, 1]
v3 = [1, 2, 3]

uv =
vu =
print(uv)
print(vu)`,
        hints: [
          "الحلقة الخارجية على المتجه الأول والداخلية على الثاني.",
          "بسطر واحد: `[a * b for a in u3 for b in v3]` — وانتبه إلى عكس الترتيب في الحالة الثانية.",
        ],
        solution: `u3 = [-2, -1, 0, 1]
v3 = [1, 2, 3]

uv = [a * b for a in u3 for b in v3]
vu = [a * b for a in v3 for b in u3]
print(uv)
print(vu)`,
        validator: `assert "uv" in globals() and "vu" in globals(), "عرّف المتجهين uv و vu."
assert len(uv) == 12 and len(vu) == 12, "بُعد كل ناتج يجب أن يساوي 4 × 3 = 12."
assert list(uv) == [-2, -4, -6, -1, -2, -3, 0, 0, 0, 1, 2, 3], "راجع ترتيب الحلقتين في u ⊗ v."
assert list(vu) == [-2, -1, 0, 1, -4, -2, 0, 2, -6, -3, 0, 3], "راجع ترتيب الحلقتين في v ⊗ u."
assert list(uv) != list(vu), "الناتجان يجب أن يختلفا رغم تساوي البُعد."`,
        points: 30,
      },
      {
        id: "a4-ex2",
        kind: "exercise",
        prompt: String.raw`### تمرين 2

احسب $A \otimes B$ و $B \otimes A$ للمصفوفتين الآتيتين، ثم قارن أبعاد الناتجين.

$$A = \begin{pmatrix} -1 & 0 & 1 \\ -2 & -1 & 2 \end{pmatrix}, \qquad B = \begin{pmatrix} 0 & 2 \\ 3 & -1 \\ -1 & 1 \end{pmatrix}$$

خزّن الناتجين في \`AB_tensor\` و \`BA_tensor\`.`,
        template: `A4 = [[-1, 0, 1], [-2, -1, 2]]
B4 = [[0, 2], [3, -1], [-1, 1]]

AB_tensor =
BA_tensor =
print(len(AB_tensor), "×", len(AB_tensor[0]))
print(len(BA_tensor), "×", len(BA_tensor[0]))`,
        hints: [
          "استعمل الدالة `tensor_matrices` التي عرّفناها أعلاه.",
          "الأبعاد المتوقّعة: A هي 2×3 و B هي 3×2، إذن A⊗B تكون 6×6 وكذلك B⊗A، لكن العناصر مختلفة.",
        ],
        solution: `A4 = [[-1, 0, 1], [-2, -1, 2]]
B4 = [[0, 2], [3, -1], [-1, 1]]

AB_tensor = tensor_matrices(A4, B4)
BA_tensor = tensor_matrices(B4, A4)
print(len(AB_tensor), "×", len(AB_tensor[0]))
print(len(BA_tensor), "×", len(BA_tensor[0]))`,
        validator: `assert "AB_tensor" in globals() and "BA_tensor" in globals(), "عرّف الناتجين AB_tensor و BA_tensor."
assert len(AB_tensor) == 6 and len(AB_tensor[0]) == 6, "أبعاد A ⊗ B يجب أن تكون 6 × 6."
assert len(BA_tensor) == 6 and len(BA_tensor[0]) == 6, "أبعاد B ⊗ A يجب أن تكون 6 × 6."
assert AB_tensor[0][0] == 0 and AB_tensor[0][1] == -2, "العنصران الأولان في الصف الأول من A ⊗ B هما 0 و -2."
assert AB_tensor != BA_tensor, "الناتجان يجب أن يختلفا رغم تطابق الأبعاد."`,
        points: 35,
      },
    ],
  },

  /* ================================================================ */
  /* §13 التمارين النهائية                                            */
  /* ================================================================ */
  {
    slug: "final-exercises",
    track: "bronze",
    stage: 1,
    titleAr: "التمارين النهائية",
    titleEn: "Final Exercises",
    summary:
      "تمارين ختامية تجمع المتجهات والضرب القياسي والمصفوفات والضرب التنسوري في مسائل مركّبة تُقيَّم آلياً.",
    order: 12,
    estimatedMinutes: 30,
    objectives: [
      "تطبيق عمليات المتجهات والمصفوفات معاً",
      "بناء دوال قابلة لإعادة الاستعمال",
      "التحقق من الخصائص الجبرية برمجياً",
    ],
    prerequisites: ["الضرب التنسوري"],
    keywords: ["تمارين", "exercises", "مراجعة", "تطبيق"],
    cells: [
      {
        id: "a5-md",
        kind: "markdown",
        content: String.raw`## تمارين ختامية

تجمع هذه التمارين مفاهيم المتجهات والضرب القياسي والمصفوفات والضرب التنسوري.

في المادة الأصلية تُفتح هذه التمارين من ملف \`Exercises_Basic_Math.html\` عبر المتصفح. أمّا هنا فهي مدمجة مباشرة في الدفتر ومُقيَّمة آلياً، فلا تحتاج إلى أي ملفات خارجية.`,
      },
      {
        id: "a5-ex1",
        kind: "exercise",
        prompt: String.raw`### تمرين 1: تطبيع متجه

اكتب دالة \`normalize(v)\` تُعيد قائمة جديدة تمثّل المتجه بعد التطبيع، أي بطول يساوي واحداً:

$$\hat{v} = \frac{v}{\|v\|}$$

بايثون صِرف بلا مكتبات خارجية.`,
        template: `def normalize(v):
    # اكتب الكود هنا
    pass

print(normalize([3, 4]))`,
        hints: [
          "احسب الطول أولاً: `length = sum(x ** 2 for x in v) ** 0.5`.",
          "ثم أعد `[x / length for x in v]`.",
        ],
        solution: `def normalize(v):
    length = sum(x ** 2 for x in v) ** 0.5
    return [x / length for x in v]

print(normalize([3, 4]))`,
        validator: `assert "normalize" in globals(), "لم تُعرّف الدالة normalize بعد."
r = normalize([3, 4])
assert abs(r[0] - 0.6) < 1e-9 and abs(r[1] - 0.8) < 1e-9, "المتجه [3,4] بعد التطبيع هو [0.6, 0.8]."
r4 = normalize([1, 1, 1, 1])
assert abs(sum(x ** 2 for x in r4) - 1) < 1e-9, "مجموع مربّعات المركّبات يجب أن يساوي واحداً."`,
        points: 25,
      },
      {
        id: "a5-ex2",
        kind: "exercise",
        prompt: String.raw`### تمرين 2: ضرب مصفوفة في متجه

اكتب دالة \`mat_vec(M, v)\` تُعيد حاصل ضرب المصفوفة في متجه العمود، مع رفع \`ValueError\` إذا لم يساوِ عدد أعمدة $M$ بُعد $v$.

تحقّق من أن ضرب المصفوفة أدناه في $(1, -3, 2)$ يعطي $(1, 15, -2)$.`,
        template: `def mat_vec(M, v):
    # اكتب الكود هنا
    pass

M5 = [[-1, 0, 1], [-2, -3, 4], [1, 5, 6]]
print(mat_vec(M5, [1, -3, 2]))`,
        hints: [
          "افحص التوافق أولاً: `if len(M[0]) != len(v): raise ValueError(...)`.",
          "كل مركّبة ناتجة هي `sum(row[j] * v[j] for j in range(len(v)))`.",
        ],
        solution: `def mat_vec(M, v):
    if len(M[0]) != len(v):
        raise ValueError("incompatible dimensions")
    return [sum(row[j] * v[j] for j in range(len(v))) for row in M]

M5 = [[-1, 0, 1], [-2, -3, 4], [1, 5, 6]]
print(mat_vec(M5, [1, -3, 2]))`,
        validator: `assert "mat_vec" in globals(), "لم تُعرّف الدالة mat_vec بعد."
assert list(mat_vec([[-1, 0, 1], [-2, -3, 4], [1, 5, 6]], [1, -3, 2])) == [1, 15, -2], "الناتج المتوقّع هو [1, 15, -2]."
assert list(mat_vec([[1, 0], [0, 1]], [7, -2])) == [7, -2], "الضرب في مصفوفة الهوية يعيد المتجه نفسه."
raised = False
try:
    mat_vec([[1, 2, 3]], [1, 2])
except ValueError:
    raised = True
assert raised, "يجب رفع ValueError عند عدم توافق الأبعاد."`,
        points: 30,
      },
      {
        id: "a5-ex3",
        kind: "exercise",
        prompt: String.raw`### تمرين 3: خاصية المنقول في الضرب

تحقّق برمجياً من المتطابقة:

$$(AB)^T = B^T A^T$$

اكتب دالة \`check_transpose_rule(A, B)\` تُعيد \`True\` إذا تحقّقت المتطابقة للمصفوفتين المعطاتين.`,
        template: `def check_transpose_rule(A, B):
    # اكتب الكود هنا
    pass

print(check_transpose_rule([[1, 2], [3, 4]], [[0, 1], [1, 0]]))`,
        hints: [
          "ستحتاج دالتَي المنقول والضرب — عرّفهما داخل الدالة أو استعمل ما كتبته سابقاً.",
          "احسب الطرفين وقارنهما بـ `==` لأن العناصر أعداد صحيحة هنا.",
        ],
        solution: `def check_transpose_rule(A, B):
    def T(M):
        return [[M[i][j] for i in range(len(M))] for j in range(len(M[0]))]

    def mul(X, Y):
        return [[sum(X[i][k] * Y[k][j] for k in range(len(Y)))
                 for j in range(len(Y[0]))] for i in range(len(X))]

    return T(mul(A, B)) == mul(T(B), T(A))

print(check_transpose_rule([[1, 2], [3, 4]], [[0, 1], [1, 0]]))`,
        validator: `assert "check_transpose_rule" in globals(), "لم تُعرّف الدالة check_transpose_rule بعد."
assert check_transpose_rule([[1, 2], [3, 4]], [[0, 1], [1, 0]]) is True, "المتطابقة صحيحة لهاتين المصفوفتين."
assert check_transpose_rule([[2, 0], [1, 3]], [[1, 4], [-2, 5]]) is True, "المتطابقة يجب أن تتحقّق لأي مصفوفتين متوافقتين."
assert check_transpose_rule([[1, 2, 3], [4, 5, 6]], [[1, 0], [0, 1], [2, 2]]) is True, "جرّب مصفوفات غير مربّعة أيضاً."`,
        points: 35,
      },
      {
        id: "a5-ex4",
        kind: "exercise",
        prompt: String.raw`### تمرين 4: من الضرب التنسوري إلى الاحتمالات

لنظام كيوبتين في حالة قابلة للفصل $|\psi\rangle = a \otimes b$ حيث $a$ و $b$ متجهان مُطبَّعان ثنائيا البُعد.

اكتب دالة \`joint_probabilities(a, b)\` تُعيد قائمة الاحتمالات الأربعة للنتائج $00, 01, 10, 11$ بالترتيب، أي مربّع كل مركّبة من الضرب التنسوري.`,
        template: `def joint_probabilities(a, b):
    # اكتب الكود هنا
    pass

r = 2 ** -0.5
print(joint_probabilities([r, r], [1, 0]))`,
        hints: [
          "احسب الضرب التنسوري أولاً: `[x * y for x in a for y in b]`.",
          "ثم ارفع كل مركّبة للمربّع.",
        ],
        solution: `def joint_probabilities(a, b):
    state = [x * y for x in a for y in b]
    return [amp ** 2 for amp in state]

r = 2 ** -0.5
print(joint_probabilities([r, r], [1, 0]))`,
        validator: `assert "joint_probabilities" in globals(), "لم تُعرّف الدالة joint_probabilities بعد."
r = 2 ** -0.5
p = list(joint_probabilities([r, r], [1, 0]))
assert len(p) == 4, "يجب أن تُعيد الدالة أربعة احتمالات."
assert abs(sum(p) - 1) < 1e-9, "مجموع الاحتمالات يجب أن يساوي واحداً."
assert abs(p[0] - 0.5) < 1e-9 and abs(p[2] - 0.5) < 1e-9, "النتيجتان 00 و 10 احتمال كل منهما 0.5 في هذه الحالة."
assert abs(p[1]) < 1e-9 and abs(p[3]) < 1e-9, "النتيجتان 01 و 11 مستحيلتان لأن الكيوبت الثاني في الحالة |0>."
q = list(joint_probabilities([1, 0], [0, 1]))
assert abs(q[1] - 1) < 1e-9, "الحالة |0>⊗|1> تعطي النتيجة 01 بيقين."`,
        points: 35,
      },
    ],
  },
];
