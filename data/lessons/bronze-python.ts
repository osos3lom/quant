/**
 * data/lessons/bronze-python.ts
 * المستوى البرونزي — المرحلة الأولى: مراجعة Python كما وردت في المادة الأصلية.
 * Bronze, stage 1: the Python review sections (§2–§8) of the source material.
 *
 * المصدر: "المادة العلمية للمرحلة التحضيرية" — QWorld / QSaudiArabia
 * إعداد: Abuzer Yakaryılmaz · خلود بندر المطيري · جود عوض الشهري
 *
 * هذه المرحلة بايثون صِرف بلا مكتبات عددية، التزاماً بترتيب المادة الأصلية.
 */
import type { Notebook } from "@/types/lessons";

export const bronzePythonNotebooks: Notebook[] = [
  /* ================================================================ */
  /* §2 مقدمة إلى دفاتر Jupyter                                       */
  /* ================================================================ */
  {
    slug: "intro-jupyter",
    track: "bronze",
    stage: 1,
    titleAr: "مقدمة إلى دفاتر Jupyter",
    titleEn: "Introduction to Jupyter Notebooks",
    summary:
      "بنية الدفتر التفاعلي: خلايا الشيفرة وخلايا النصوص المنسّقة، طرق التنفيذ، كتابة المعادلات بـ LaTeX، والأوامر السحرية.",
    order: 1,
    estimatedMinutes: 18,
    objectives: [
      "التمييز بين خلايا الشيفرة وخلايا النصوص المنسّقة",
      "تنفيذ الخلايا بـ Shift+Enter و Ctrl+Enter",
      "كتابة المعادلات الرياضية داخل خلايا Markdown",
      "استعمال الأوامر السحرية %%writefile و %run و %load",
    ],
    prerequisites: [],
    keywords: ["jupyter", "notebook", "دفتر", "خلية", "markdown", "magic", "أوامر سحرية"],
    cells: [
      {
        id: "p1-intro",
        kind: "markdown",
        content: String.raw`## بنية الدفتر التفاعلي

يتألّف دفتر Jupyter من خلية واحدة أو أكثر. وسنستخدم في هذا الدرس نوعين رئيسيين من الخلايا:

- **خلايا الشيفرة (Code)**: لكتابة شيفرة Python وتنفيذها.
- **خلايا النصوص المنسّقة (Markdown)**: لكتابة الشروحات والملاحظات والمعادلات الرياضية، أو لإدراج الصور والرسومات.

لتنفيذ الخلية والانتقال إلى التالية اضغط **Shift+Enter**، ولتنفيذها مع البقاء فيها اضغط **Ctrl+Enter** أو انقر على زر التشغيل. تظهر النتيجة أسفل الخلية مباشرة، ويمكنك تعديل قيمة \`range\` ثم إعادة تشغيلها.`,
      },
      {
        id: "p1-hello",
        kind: "code",
        caption: "المثال الأول من المادة الأصلية: طباعة نمط متزايد من النجوم",
        code: `print("Hello world")
pattern = "*"
for i in range(10):
    print(pattern)
    pattern += "*"`,
      },
      {
        id: "p1-latex",
        kind: "markdown",
        content: String.raw`## المعادلات داخل خلايا Markdown

يمكن تنسيق محتوى خلية النصوص باستخدام Markdown و HTML، وكتابة التعبيرات الرياضية باستخدام LaTeX، مثل:

$$x^2 + y^2 = 9$$

$$\sum_{i=1}^{4} (i + 2)^3$$

$$\begin{pmatrix} 1 & 0 & -1 \\ 2 & -2 & 0 \\ 3 & -1 & -2 \end{pmatrix}$$`,
      },
      {
        id: "p1-tips",
        kind: "markdown",
        callout: "tip",
        calloutTitle: "تلميحات التنقّل",
        content: String.raw`- إظهار أرقام الأسطر: \`View → Toggle Line Numbers\`
- وضع الأوامر (Command mode): اضغط \`Esc\` للدخول إليه، و \`Enter\` للعودة إلى وضع التحرير.
- من قائمة \`Insert\` تضيف خلية قبل الحالية أو بعدها، ومن قائمة \`Edit\` تحذف الخلية المحددة أو تدمجها أو تقسّمها.`,
      },
      {
        id: "p1-magic",
        kind: "markdown",
        content: String.raw`## الأوامر السحرية (Magic Commands)

هذه أوامر مضمّنة في IPython تُنفَّذ داخل خلايا الشيفرة:

- \`%%writefile FILENAME.py\` في **أول سطر** من الخلية: يحفظ محتوى الخلية في ملف خارجي، ويستبدل الملف السابق ما لم يُستخدم الخيار \`-a\` (اختصار Append) الذي يُلحق المحتوى بنهاية الملف.
- \`%run FILENAME.py\`: يشغّل الملف كبرنامج Python دون استبدال محتوى الخلية الحالية.
- \`%load first.py\`: يحمّل محتوى ملف إلى الخلية الحالية بغرض عرضه أو تعديله.`,
      },
      {
        id: "p1-magic-note",
        kind: "markdown",
        callout: "note",
        calloutTitle: "الفرق في منصتنا",
        content: String.raw`الأوامر السحرية تخص بيئة IPython الكاملة. أمّا هنا فالنواة تعمل داخل متصفحك، ونظام الملفات مؤقت في الذاكرة، لذا لن تجد الملفات بعد إغلاق الصفحة. جرّب البديل التالي الذي يكتب ملفاً ثم يقرأه في الجلسة نفسها.`,
      },
      {
        id: "p1-files",
        kind: "code",
        caption: "الكتابة إلى ملف وقراءته — بديل %%writefile داخل المتصفح",
        code: `source = 'print("Hello from a file")'

with open("first.py", "w", encoding="utf-8") as file:
    file.write(source)

with open("first.py", encoding="utf-8") as file:
    print("محتوى الملف:", file.read())

exec(source)`,
      },
      {
        id: "p1-ex1",
        kind: "exercise",
        prompt: String.raw`### تمرين: نمط النجوم المعكوس

اكتب حلقة \`for\` تطبع نمطاً من النجوم يبدأ بعشر نجوم وينقص واحدة في كل سطر حتى نجمة واحدة.

خزّن الأسطر في قائمة اسمها \`lines\` **وأيضاً** اطبعها، بحيث يكون أول عنصر \`"**********"\` وآخر عنصر \`"*"\`.`,
        template: `lines = []
# اكتب الكود هنا

for line in lines:
    print(line)`,
        hints: [
          "استعمل `range(10, 0, -1)` للعدّ التنازلي من 10 إلى 1.",
          "النجمة المتكرّرة تُبنى بضرب السلسلة: `\"*\" * n`.",
        ],
        solution: `lines = []
for n in range(10, 0, -1):
    lines.append("*" * n)

for line in lines:
    print(line)`,
        validator: `assert "lines" in globals(), "لم تُعرّف القائمة lines بعد."
assert len(lines) == 10, "يجب أن تحتوي القائمة على عشرة أسطر."
assert lines[0] == "*" * 10, "السطر الأول يجب أن يحتوي عشر نجوم."
assert lines[-1] == "*", "السطر الأخير يجب أن يحتوي نجمة واحدة."
assert all(lines[i] == "*" * (10 - i) for i in range(10)), "يجب أن تنقص النجوم واحدة في كل سطر."`,
        points: 20,
      },
    ],
  },

  /* ================================================================ */
  /* §3 مرجع سريع لـ Python                                           */
  /* ================================================================ */
  {
    slug: "python-reference",
    track: "bronze",
    stage: 1,
    titleAr: "مرجع سريع لـ Python",
    titleEn: "Python Quick Reference",
    summary:
      "جولة سريعة على عناصر Python التي سنستعملها: المتغيّرات والسلاسل والعوامل والكائنات والقوائم والصفوف والقواميس والحلقات والشروط والدوال والأعداد العشوائية.",
    order: 2,
    estimatedMinutes: 30,
    objectives: [
      "التعامل مع المتغيّرات والسلاسل النصية والعوامل الحسابية",
      "التمييز بين القوائم والصفوف والقواميس",
      "استعمال len() والحلقات والجمل الشرطية والعوامل المنطقية",
      "تعريف الدوال وتوليد الأعداد العشوائية",
    ],
    prerequisites: ["مقدمة إلى دفاتر Jupyter"],
    keywords: [
      "variables", "strings", "tuple", "dictionary", "list", "functions", "random",
      "متغيرات", "سلاسل", "صفوف", "قواميس", "دوال", "عشوائية",
    ],
    cells: [
      {
        id: "p2-vars",
        kind: "code",
        caption: "المتغيّرات: اسم يخزّن قيمة في الذاكرة",
        code: `number = 5   # عدد صحيح (int)
real = -3.4  # عدد عشري (float)
name = "Ada" # سلسلة نصية (str)
surname = "Lovelace" # سلسلة نصية (str)
boolean1 = True # قيمة منطقية (bool)
boolean2 = False # قيمة منطقية (bool)

print(number, real, name, surname, boolean1, boolean2)
print(type(number), type(real), type(name), type(boolean1))`,
      },
      {
        id: "p2-strings",
        kind: "code",
        caption: "السلاسل النصية: تسلسل من الأحرف يبدأ ترقيمه من الصفر",
        code: `str1 = "I am a string"
str2 = 'I am also a string value'

print("the char at 0 is", str1[0])
print("the char at", len(str1) - 1, "is", str1[len(str1) - 1])

for ch in "Ada":
    print(ch)

str3 = """I am the first line,
   I am the second line,
I am the third line
"""
print(str3)`,
      },
      {
        id: "p2-arith",
        kind: "code",
        caption: "العوامل الحسابية",
        code: `a = 13
b = 5
print("a =", a)
print("b =", b)

print("a + b =", a + b)
print("a - b =", a - b)
print("a * b =", a * b)
print("a / b =", a / b)
# القسمة مع التقريب إلى أسفل
print("a//b =", a // b)
# باقي القسمة
print("a mod b =", a % b)
# الأس
print("b*b =", b ** 2)
print("b*b*b =", b ** 3)
print("sqrt(b)=", b ** 0.5)`,
      },
      {
        id: "p2-collections",
        kind: "code",
        caption: "الكائنات: القوائم والصفوف والقواميس",
        code: `# القائمة: مرتّبة وقابلة للتعديل، بين قوسين مربعين
mylist = [10, 8, 6, 4, 2]
print(mylist)

# الصف: مرتّب لكنه غير قابل للتعديل، بين قوسين دائريين
mytuple = (1, 4, 5, 'Jood')
print(mytuple)

# القاموس: أزواج مفتاح وقيمة، بين قوسين معقوفين
mydictionary = {
    'name': "Joud",
    'surname': 'Alshehri',
    'age': 23,
}
print(mydictionary)
print(mydictionary['surname'])`,
      },
      {
        id: "p2-mixed",
        kind: "code",
        caption: "قائمة تضم كائنات من أنواع مختلفة، ودالة len()",
        code: `mylist = [10, 8, 6, 4, 2]
mytuple = (1, 4, 5, 'Jood')
mydictionary = {'name': "Joud", 'surname': 'Alshehri', 'age': 23}

list_of_other_objects = [mylist, mytuple, 3, "Ada", mydictionary]
for item in list_of_other_objects:
    print(item)

print()
print(len("Asja Karaindrou"))
print(len([1, 2, 3, 4]))
print(len(mydictionary))`,
      },
      {
        id: "p2-loops",
        kind: "code",
        caption: "الحلقات: while و for",
        code: `i = 10
while i > 0:
    print(i, end=" ")
    i = i - 1
print()

for i in range(-5, 6):   # من -5 إلى 5
    print(i, end=" ")
print()

for i in range(0, 23, 4):  # 0, 4, 8, 12, 16, 20
    print(i, end=" ")
print()

mydictionary = {'name': "Jood", 'surname': 'Alshehri', 'age': 23}
for key in mydictionary:
    print("key is", key, "and its value is", mydictionary[key])`,
      },
      {
        id: "p2-logic",
        kind: "code",
        caption: "الجمل الشرطية والعوامل المنطقية وعوامل المقارنة",
        code: `for a in range(4, 7):
    if a < 5:
        print(a, "is less than 5")
    elif a == 5:
        print(a, "is equal to 5")
    else:
        print(a, "is greater than 5")

i, j = -3, 4
if i < 0 and j > 0:
    print(i, "is negative AND", j, "is positive")
if i == 2 or j == 4:
    print("i OR j matched")
if not (i == 2):
    print(i, "is NOT equal to 2")
print(4 != 3, 2 <= 5, 5 >= 3)`,
      },
      {
        id: "p2-nested",
        kind: "code",
        caption: "القوائم المتداخلة ثنائية الأبعاد وعمليات القوائم",
        code: `A = [
    [1, 2, 3],
    [-2, -4, -6],
    [3, 6, 9],
]
for row in A:
    print(row)
print("العنصر A[0][1] =", A[0][1])

list1 = [1, 2, 3]
list2 = [4, 5, 6]
print(list1 + list2)

numbers = [0, 1, 2]
numbers.append(3)
numbers = numbers + [4]
print(numbers)`,
      },
      {
        id: "p2-functions",
        kind: "code",
        caption: "الدوال والأعداد العشوائية",
        code: `def summation_of_integers(n):
    summation = 0
    for integer in range(n + 1):
        summation += integer
    return summation

print(summation_of_integers(10))
print(summation_of_integers(20))

from random import randrange
print(randrange(10), "is picked randomly between 0 and 9")
print(randrange(-9, 10), "is picked randomly between -9 and 9")
print(randrange(0, 20, 3), "is picked randomly from [0,3,6,9,12,15,18]")`,
      },
      {
        id: "p2-ex1",
        kind: "exercise",
        prompt: String.raw`### تمرين: قاموس من قائمة

اكتب دالة \`build_profile(pairs)\` تستقبل قائمة من الصفوف على شكل \`(key, value)\` وتُعيد **قاموساً** يقابلها.

مثال: المُدخل \`[("name", "Joud"), ("age", 23)]\` يعطي \`{"name": "Joud", "age": 23}\`.`,
        template: `def build_profile(pairs):
    # اكتب الكود هنا
    pass

print(build_profile([("name", "Joud"), ("age", 23)]))`,
        hints: [
          "ابدأ بقاموس فارغ `result = {}` ثم مُرّ على الأزواج بحلقة for.",
          "يمكنك تفكيك الصف مباشرة في الحلقة: `for key, value in pairs:`.",
        ],
        solution: `def build_profile(pairs):
    result = {}
    for key, value in pairs:
        result[key] = value
    return result

print(build_profile([("name", "Joud"), ("age", 23)]))`,
        validator: `assert "build_profile" in globals(), "لم تُعرّف الدالة build_profile بعد."
r = build_profile([("name", "Joud"), ("age", 23)])
assert isinstance(r, dict), "يجب أن تُعيد الدالة قاموساً."
assert r == {"name": "Joud", "age": 23}, "القاموس الناتج لا يطابق الأزواج المُدخلة."
assert build_profile([]) == {}, "القائمة الفارغة يجب أن تعطي قاموساً فارغاً."
assert len(build_profile([("a", 1), ("b", 2), ("c", 3)])) == 3, "يجب أن تعمل مع أي عدد من الأزواج."`,
        points: 25,
      },
    ],
  },

  /* ================================================================ */
  /* §4 الرسم باستخدام Matplotlib                                     */
  /* ================================================================ */
  {
    slug: "matplotlib-drawing",
    track: "bronze",
    stage: 1,
    titleAr: "الرسم باستخدام Matplotlib",
    titleEn: "Drawing with Matplotlib",
    summary:
      "أدوات الرسم التي سنستعملها طوال المنهج: النقاط والأسهم والدوائر والمخططات، وصولاً إلى رسم حالة الكيوبت على دائرة الوحدة.",
    order: 3,
    estimatedMinutes: 30,
    objectives: [
      "إنشاء مساحة رسم بأبعاد ودقة محددة",
      "رسم النقاط والأسهم والدوائر وإضافة النصوص",
      "بناء الدوال المساعدة لرسم المحاور ودائرة الوحدة",
      "رسم متجه حالة كيوبت ذي سعات حقيقية",
    ],
    prerequisites: ["مرجع سريع لـ Python"],
    keywords: ["matplotlib", "رسم", "plot", "annotate", "دائرة الوحدة", "كيوبت", "bar"],
    cells: [
      {
        id: "p3-md",
        kind: "markdown",
        content: String.raw`## أدوات الرسم الأساسية

نستعرض هنا أدوات الوحدة البرمجية \`matplotlib.pyplot\` التي سنستخدمها لاحقاً في حل المهام.

- إنشاء مساحة رسم: \`plt.figure(figsize=(6, 6), dpi=100)\` — زيادة \`dpi\` تزيد عدد البكسلات ودقة الصورة لكنها لا تغيّر الأبعاد الفيزيائية المحددة عبر \`figsize\`.
- رسم نقطة زرقاء عند $(x, y)$: \`plt.plot(x, y, "bo")\` — و \`"ro"\` للحمراء و \`"go"\` للخضراء.
- رسم سهم من $(x, y)$ إلى $(x + dx, y + dy)$ باستخدام \`annotate\`.
- رسم دائرة مركزها $(x, y)$ ونصف قطرها $r$، وإضافة نص، ومخطط أعمدة.`,
      },
      {
        id: "p3-basics",
        kind: "code",
        caption: "النقاط والأسهم بالألوان الثلاثة",
        code: `import matplotlib.pyplot as plt

plt.figure(figsize=(5, 5), dpi=100)

plt.plot(1, 1, "bo")
plt.plot(-1, 1, "ro")
plt.plot(1, -1, "go")

arrow_style = {"arrowstyle": "->", "color": "red",
               "linewidth": 1.5, "linestyle": "dotted"}
plt.annotate("", xy=(0.8, 0.8), xytext=(0, 0), arrowprops=arrow_style)
plt.annotate("", xy=(-0.8, 0.8), xytext=(0, 0), arrowprops={"arrowstyle": "->"})

plt.xlim(-1.5, 1.5)
plt.ylim(-1.5, 1.5)
plt.grid(alpha=0.3)
plt.show()`,
      },
      {
        id: "p3-shapes",
        kind: "code",
        caption: "الدوائر والنصوص ومخطط الأعمدة",
        code: `import matplotlib.pyplot as plt

plt.figure(figsize=(4.5, 4.5), dpi=100)
plt.gca().add_patch(plt.Circle((0, 0), 1, color="black", fill=False))
plt.text(0.05, 0.05, "origin")
plt.gca().set_aspect("equal", adjustable="box")
plt.xlim(-1.3, 1.3)
plt.ylim(-1.3, 1.3)
plt.show()

plt.figure(figsize=(4.5, 3), dpi=100)
plt.bar(["|0>", "|1>"], [0.36, 0.64])
plt.show()`,
      },
      {
        id: "p3-helpers-md",
        kind: "markdown",
        callout: "note",
        calloutTitle: "الدوال المعرّفة مسبقاً",
        content: String.raw`في مادة QWorld الأصلية تُحمَّل دوال رسم جاهزة من الملف \`qworld/include/drawing.py\` عبر الأمر \`%run\`. وبما أن نواتنا تعمل داخل المتصفح، سنعرّف الدوال نفسها هنا مباشرة.

هذه الدوال تمثّل متجه حالة كيوبت ذي **سعات حقيقية فقط**:

$$|\psi\rangle = x|0\rangle + y|1\rangle, \qquad x^2 + y^2 = 1$$

ولا تمثّل الدائرة جميع حالات الكيوبت العامة ذات السعات المركبة؛ إذ تُستخدم كرة بلوخ لتمثيل الحالة العامة. كما أن $|\psi\rangle$ و $-|\psi\rangle$ تختلفان بطور كلي فقط وتمثّلان الحالة الفيزيائية نفسها.`,
      },
      {
        id: "p3-drawing",
        kind: "code",
        caption: "دوال الرسم المساعدة كما في المادة الأصلية",
        code: `import matplotlib.pyplot as plt

def draw_axes():
    points = [(1.3, 0), (0, 1.3), (-1.3, 0), (0, -1.3)]
    arrows = [(1.1, 0), (0, 1.1), (-1.1, 0), (0, -1.1)]
    for x, y in points:
        plt.plot(x, y, alpha=0)
    for dx, dy in arrows:
        plt.annotate("", xy=(dx, dy), xytext=(0, 0),
                     arrowprops={"arrowstyle": "->", "color": "black"})

def draw_unit_circle():
    unit_circle = plt.Circle((0, 0), 1, color="black", fill=False)
    plt.gca().add_patch(unit_circle)
    plt.gca().set_aspect("equal", adjustable="box")

def draw_quantum_state(x, y, name):
    norm = (x ** 2 + y ** 2) ** 0.5
    if abs(norm - 1.0) >= 1e-9:
        raise ValueError("x and y must satisfy x**2 + y**2 = 1")
    plt.annotate("", xy=(x, y), xytext=(0, 0),
                 arrowprops={"arrowstyle": "->", "color": "blue"})
    plt.text(1.12 * x, 1.12 * y, name)
    plt.gca().set_aspect("equal", adjustable="box")

print("تم تعريف دوال الرسم")`,
      },
      {
        id: "p3-qubit",
        kind: "code",
        caption: "رسم الكيوبت على دائرة الوحدة مع حالة اختيارية",
        code: `import matplotlib.pyplot as plt

def draw_qubit():
    plt.figure(figsize=(6, 6), dpi=100)
    plt.plot(0, 0, "ro")
    draw_axes()
    draw_unit_circle()
    basis_states = {
        "|0>": (1, 0),
        "|1>": (0, 1),
        "-|0>": (-1, 0),
        "-|1>": (0, -1),
    }
    for label, (x, y) in basis_states.items():
        plt.plot(x, y, "o")
        plt.text(1.08 * x, 1.08 * y, label)
    plt.xlim(-1.3, 1.3)
    plt.ylim(-1.3, 1.3)
    plt.gca().set_aspect("equal", adjustable="box")
    plt.axis("off")

draw_qubit()
draw_quantum_state(0.6, 0.8, "|psi>")
plt.show()`,
      },
      {
        id: "p3-ex1",
        kind: "exercise",
        prompt: String.raw`### تمرين: رسم حالة مُطبَّعة

اكتب دالة \`plot_state(x, y)\` ترسم الكيوبت مع متجه الحالة $(x, y)$ **بعد التحقق من التطبيع**:

- إذا كان $x^2 + y^2 \neq 1$ (بهامش $10^{-9}$) فارفع \`ValueError\`.
- وإلا فارسم دائرة الوحدة والمحاور والمتجه.

ثم أعِد الدالة القيمة \`True\` عند النجاح.`,
        template: `import matplotlib.pyplot as plt

def plot_state(x, y):
    # اكتب الكود هنا
    pass

print(plot_state(0.6, 0.8))`,
        hints: [
          "احسب `norm = (x**2 + y**2) ** 0.5` ثم قارن `abs(norm - 1) >= 1e-9`.",
          "استعمل الدوال التي عرّفناها: `draw_qubit()` ثم `draw_quantum_state(x, y, ...)` ثم `plt.show()`.",
        ],
        solution: `import matplotlib.pyplot as plt

def plot_state(x, y):
    norm = (x ** 2 + y ** 2) ** 0.5
    if abs(norm - 1.0) >= 1e-9:
        raise ValueError("x and y must satisfy x**2 + y**2 = 1")
    draw_qubit()
    draw_quantum_state(x, y, "|psi>")
    plt.show()
    return True

print(plot_state(0.6, 0.8))`,
        validator: `assert "plot_state" in globals(), "لم تُعرّف الدالة plot_state بعد."
assert plot_state(0.6, 0.8) is True, "يجب أن تُعيد الدالة True عند نجاح الرسم."
raised = False
try:
    plot_state(1, 1)
except ValueError:
    raised = True
assert raised, "الحالة غير المُطبَّعة (1, 1) يجب أن ترفع ValueError."
assert plot_state(0, 1) is True, "الحالة |1> مُطبَّعة ويجب أن تُرسم بنجاح."`,
        points: 35,
      },
    ],
  },

  /* ================================================================ */
  /* §5 أساسيات المتغيّرات                                            */
  /* ================================================================ */
  {
    slug: "variables-basics",
    track: "bronze",
    stage: 1,
    titleAr: "أساسيات المتغيّرات",
    titleEn: "Variable Basics",
    summary:
      "الإسناد وإعادة الاستخدام، الفرق بين = و ==، القسمة وباقيها، والأقواس وأولوية العمليات — مع تمارين المادة الأصلية الثلاثة.",
    order: 4,
    estimatedMinutes: 20,
    objectives: [
      "إسناد القيم وإعادة استخدام المتغيّر في التعبير نفسه",
      "التمييز بين عامل الإسناد = وعامل المقارنة ==",
      "استعمال / و // و %",
      "حساب تعبير مركّب باستعمال الأقواس وأولوية العمليات",
    ],
    prerequisites: ["مرجع سريع لـ Python"],
    keywords: ["variables", "متغيرات", "إسناد", "أولوية العمليات", "قسمة"],
    cells: [
      {
        id: "p4-md",
        kind: "markdown",
        content: String.raw`## الإسناد وإعادة استخدام المتغيّر

المتغيّر اسم يرتبط بقيمة، ويمكن إعادة إسناد قيمة جديدة إليه أثناء التنفيذ.

تُستخدم العلامة \`=\` لإسناد قيمة إلى متغيّر، وليست عامل مساواة رياضياً. أمّا \`==\` فتُستخدم لمقارنة قيمتين.`,
      },
      {
        id: "p4-assign",
        kind: "code",
        code: `a = 2
b = 4
c = a + b
print(a, b, c)

# إعادة إسناد c باستعمال قيمتها الحالية
c = c * 3
print(c)

print("هل a تساوي 2؟", a == 2)`,
      },
      {
        id: "p4-div",
        kind: "code",
        caption: "القسمة العادية والقسمة مع التقريب إلى أسفل وباقي القسمة",
        code: `a = 33
b = 6
print(a / b)   # 5.5
print(a // b)  # 5
print(a % b)   # 3`,
      },
      {
        id: "p4-precedence",
        kind: "code",
        caption: "الأقواس وأولوية العمليات: نحسب التعبير على خطوات",
        code: `# -3 x (123 - 34 x 11) + 4 x (5 + 23 x 15)
left = 34 * 11
left = 123 - left
left = -3 * left

right = 23 * 15
right = 5 + right
right = 4 * right

result = left + right
print(result)
print("بخطوة واحدة:", -3 * (123 - 34 * 11) + 4 * (5 + 23 * 15))`,
      },
      {
        id: "p4-ex1",
        kind: "exercise",
        prompt: String.raw`### تمرين 1

عرّف المتغيّرات \`n1\` و \`n2\` و \`n3\` بالقيم $3$ و $-4$ و $6$، ثم احسب \`r1\` واطبع قيمته:

$$r_1 = (2n_1 + 3n_2) \times 2 - 5n_3$$

يجب أن يكون الناتج عدداً سالباً مقداره $42$.`,
        template: `# اكتب الكود هنا
n1 =
n2 =
n3 =
r1 =
print(r1)`,
        hints: [
          "انتبه إلى الأقواس: يُحسب `(2*n1 + 3*n2)` أولاً ثم يُضرب في 2.",
          "الناتج المتوقّع هو -42 تماماً.",
        ],
        solution: `n1 = 3
n2 = -4
n3 = 6
r1 = (2 * n1 + 3 * n2) * 2 - 5 * n3
print(r1)`,
        validator: `for name in ("n1", "n2", "n3", "r1"):
    assert name in globals(), "لم تُعرّف المتغيّر " + name + " بعد."
assert n1 == 3 and n2 == -4 and n3 == 6, "قيم المتغيّرات يجب أن تكون 3 و -4 و 6."
assert r1 == -42, "الناتج المتوقّع هو -42، راجع ترتيب العمليات والأقواس."`,
        points: 20,
      },
      {
        id: "p4-ex2",
        kind: "exercise",
        prompt: String.raw`### تمرين 2

باستعمال المتغيّرات نفسها احسب \`r2\`:

$$r_2 = \frac{(n_1 - n_2)(n_2 - n_3)}{(n_3 - n_1)(n_3 + 1)}$$

استعمل \`round(number, ndigits)\` إذا أردت تقريب الناتج.`,
        template: `# المتغيّرات n1, n2, n3 معرّفة من التمرين السابق
r2 =
print(r2)`,
        hints: [
          "البسط: `(n1 - n2) * (n2 - n3)` والمقام: `(n3 - n1) * (n3 + 1)`.",
          "استعمل القسمة العادية `/` لا `//` كي تحصل على عدد عشري.",
        ],
        solution: `r2 = ((n1 - n2) * (n2 - n3)) / ((n3 - n1) * (n3 + 1))
print(r2)
print(round(r2, 4))`,
        validator: `assert "r2" in globals(), "لم تُعرّف المتغيّر r2 بعد."
expected = ((3 - (-4)) * ((-4) - 6)) / ((6 - 3) * (6 + 1))
assert abs(r2 - expected) < 1e-9, "الناتج المتوقّع تقريباً " + str(round(expected, 4)) + " — راجع البسط والمقام."`,
        points: 20,
      },
      {
        id: "p4-ex3",
        kind: "exercise",
        prompt: String.raw`### تمرين 3

عرّف متغيّرين للاسم واسم العائلة، ثم اطبعهما بعد العبارة \`hello from the quantum world to\`.

خزّن الجملة الكاملة في متغيّر اسمه \`greeting\`.`,
        template: `first_name =
last_name =
greeting =
print(greeting)`,
        hints: [
          "يمكنك الدمج بعلامة + مع الانتباه إلى المسافات، أو استعمال f-string.",
          'مثال: `greeting = f"hello from the quantum world to {first_name} {last_name}"`.',
        ],
        solution: `first_name = "Joud"
last_name = "Alshehri"
greeting = f"hello from the quantum world to {first_name} {last_name}"
print(greeting)`,
        validator: `for name in ("first_name", "last_name", "greeting"):
    assert name in globals(), "لم تُعرّف المتغيّر " + name + " بعد."
assert isinstance(greeting, str), "يجب أن يكون greeting سلسلة نصية."
assert "hello from the quantum world to" in greeting, "يجب أن تبدأ الجملة بالعبارة المطلوبة."
assert str(first_name) in greeting and str(last_name) in greeting, "يجب أن تظهر قيمتا الاسم واسم العائلة داخل الجملة."`,
        points: 20,
      },
    ],
  },

  /* ================================================================ */
  /* §6 أساسيات الحلقات                                               */
  /* ================================================================ */
  {
    slug: "loops-basics",
    track: "bronze",
    stage: 1,
    titleAr: "أساسيات الحلقات",
    titleEn: "Loop Basics",
    summary:
      "حلقة for على النطاقات والتسلسلات، تجميع القيم، حلقة while وشرط توقّفها، وإيقاف الحلقة عند بلوغ قيمة — مع تمارين المادة الأصلية.",
    order: 5,
    estimatedMinutes: 22,
    objectives: [
      "استعمال range وتحويلها إلى قائمة",
      "تجميع القيم داخل حلقة",
      "كتابة حلقة while بشرط توقّف صحيح",
      "إيجاد أصغر قيمة تحقّق شرطاً تراكمياً",
    ],
    prerequisites: ["أساسيات المتغيّرات"],
    keywords: ["loops", "for", "while", "range", "حلقات", "تجميع"],
    cells: [
      {
        id: "p5-md",
        kind: "markdown",
        content: String.raw`## for و while

نستخدم \`for\` عندما نريد المرور على عناصر نطاق أو تسلسل، و \`while\` عندما يستمر التكرار ما دام شرط معين محققاً.

**ملاحظة مهمة:** يجب إزاحة جميع الأسطر التابعة للحلقة بالمقدار نفسه؛ فالإزاحة جزء من بنية Python وليست تجميلاً.`,
      },
      {
        id: "p5-for",
        kind: "code",
        caption: "حلقة for و range وتحويلها إلى قائمة",
        code: `for i in range(10):
    print(i, end=" ")
print()

print(list(range(10, 45, 2)))`,
      },
      {
        id: "p5-accumulate",
        kind: "code",
        caption: "تجميع القيم داخل الحلقة",
        code: `total = 0
for i in range(1, 11):
    total += i
print(total)  # 55`,
      },
      {
        id: "p5-while",
        kind: "code",
        caption: "حلقة while: يجب أن تتغيّر قيمة تؤثّر في الشرط داخل الحلقة",
        code: `total = 0
current_number = 1
while current_number <= 256:
    total += current_number
    current_number *= 2
print(total)  # 511`,
      },
      {
        id: "p5-threshold",
        kind: "code",
        caption: "أصغر n يجعل مجموع الأعداد من 1 إلى n لا يقل عن 1000",
        code: `S = 0
n = 0
while S < 1000:
    n += 1
    S += n
print("n =", n, "S =", S)  # n = 45, S = 1035`,
      },
      {
        id: "p5-ex1",
        kind: "exercise",
        prompt: String.raw`### تمرين 1

احسب باستعمال حلقة \`for\` مجموع مضاعفات العدد $3$ من $3$ إلى $51$. خزّن الناتج في \`total3\`.

يجب أن تكون النتيجة $459$.`,
        template: `total3 = 0
# اكتب الكود هنا
print(total3)`,
        hints: [
          "استعمل `range(3, 52, 3)` — لاحظ أن الحد الأعلى مستبعد لذا نكتب 52.",
          "اجمع داخل الحلقة: `total3 += i`.",
        ],
        solution: `total3 = 0
for i in range(3, 52, 3):
    total3 += i
print(total3)`,
        validator: `assert "total3" in globals(), "لم تُعرّف المتغيّر total3 بعد."
assert total3 == 459, "المجموع المتوقّع هو 459 — تأكّد من تضمين العدد 51 نفسه."`,
        points: 20,
      },
      {
        id: "p5-ex2",
        kind: "exercise",
        prompt: String.raw`### تمرين 2

احسب مجموع قوى العدد $3$ من الأس $0$ إلى الأس $8$، وخزّنه في \`powers_sum\`:

$$3^0 + 3^1 + 3^2 + \cdots + 3^8$$

يجب أن تكون النتيجة $9841$.`,
        template: `powers_sum = 0
# اكتب الكود هنا
print(powers_sum)`,
        hints: [
          "المدى المطلوب هو `range(9)` أي من 0 إلى 8.",
          "أضف `3 ** i` في كل تكرار.",
        ],
        solution: `powers_sum = 0
for i in range(9):
    powers_sum += 3 ** i
print(powers_sum)`,
        validator: `assert "powers_sum" in globals(), "لم تُعرّف المتغيّر powers_sum بعد."
assert powers_sum == 9841, "المجموع المتوقّع هو 9841 — تأكّد من البدء بالأس صفر والانتهاء بالأس 8."`,
        points: 20,
      },
      {
        id: "p5-ex3",
        kind: "exercise",
        prompt: String.raw`### تمرين 3

اختر أعداداً عشوائية من $0$ إلى $9$ حتى يظهر العدد $3$، ثم اطبع عدد المحاولات وخزّنه في \`attempts\`.

استعمل \`randrange(10)\` وحلقة \`while\`.`,
        template: `from random import randrange

attempts = 0
# اكتب الكود هنا
print("عدد المحاولات:", attempts)`,
        hints: [
          "ابدأ باختيار عدد قبل الحلقة، ثم كرّر ما دام العدد لا يساوي 3.",
          "زد `attempts` بمقدار واحد مع كل اختيار جديد.",
        ],
        solution: `from random import randrange

attempts = 0
picked = -1
while picked != 3:
    picked = randrange(10)
    attempts += 1
print("عدد المحاولات:", attempts)`,
        validator: `assert "attempts" in globals(), "لم تُعرّف المتغيّر attempts بعد."
assert isinstance(attempts, int), "يجب أن يكون attempts عدداً صحيحاً."
assert attempts >= 1, "لا بد من محاولة واحدة على الأقل."
assert "picked" in globals(), "احتفظ بالعدد المختار في متغيّر (مثلاً picked) كي نتحقّق من شرط التوقّف."
assert picked == 3, "يجب أن تتوقّف الحلقة عند ظهور العدد 3."`,
        points: 25,
      },
    ],
  },

  /* ================================================================ */
  /* §7 أساسيات الجمل الشرطية                                         */
  /* ================================================================ */
  {
    slug: "conditionals-basics",
    track: "bronze",
    stage: 1,
    titleAr: "أساسيات الجمل الشرطية",
    titleEn: "Conditional Basics",
    summary:
      "بنية if/else و if/elif/else، ودالة اختبار الأعداد الأولية كما وردت في المادة الأصلية — مع تمرينَي العشوائية والاحتمال.",
    order: 6,
    estimatedMinutes: 22,
    objectives: [
      "كتابة بنية if/else وبنية متعدّدة الفروع",
      "فهم أن أول فرع يتحقّق شرطه هو الذي يُنفَّذ",
      "بناء دالة is_prime بكفاءة",
      "تقدير احتمال تجريبياً بالتكرار",
    ],
    prerequisites: ["أساسيات الحلقات"],
    keywords: ["conditionals", "if", "elif", "else", "prime", "شرطية", "أولية"],
    cells: [
      {
        id: "p6-ifelse",
        kind: "code",
        caption: "بنية if و else مع عدد عشوائي",
        code: `from random import randrange

r = randrange(10)
print("the picked number is", r)
if r < 6:
    print("it is less than 6")
else:
    print("it is greater than or equal to 6")`,
      },
      {
        id: "p6-elif",
        kind: "code",
        caption: "تُفحص الشروط بالترتيب ويُنفَّذ أول فرع يتحقّق شرطه فقط",
        code: `from random import randrange

r = randrange(2, 100, 2)
print("r =", r)
if r < 25:
    print("less than 25")
elif r <= 50:
    print("between 25 and 50")
elif r <= 75:
    print("between 51 and 75")
else:
    print("greater than 75")`,
      },
      {
        id: "p6-prime",
        kind: "code",
        caption: "دالة الأعداد الأولية كما في المادة الأصلية: نستبعد الزوجية ثم نقفز باثنين",
        code: `def is_prime(number):
    if number < 2:
        return False
    if number == 2:
        return True
    if number % 2 == 0:
        return False
    divisor = 3
    while divisor * divisor <= number:
        if number % divisor == 0:
            return False
        divisor += 2
    return True

for number in range(2, 30):
    if is_prime(number):
        print(number, end=" ")
print()`,
      },
      {
        id: "p6-ex1",
        kind: "exercise",
        prompt: String.raw`### تمرين 1

اختر عدداً صحيحاً عشوائياً من $10$ إلى $50$، ثم حدّد باستعمال \`%\` ما إذا كان زوجياً أم فردياً.

خزّن العدد في \`number\` والنتيجة النصية في \`parity\` بحيث تكون \`"even"\` أو \`"odd"\`.`,
        template: `from random import randrange

number = randrange(10, 51)
parity =
# اكتب الكود هنا
print(number, parity)`,
        hints: [
          "العدد زوجي إذا كان `number % 2 == 0`.",
          "استعمل if/else لإسناد القيمة المناسبة إلى parity.",
        ],
        solution: `from random import randrange

number = randrange(10, 51)
if number % 2 == 0:
    parity = "even"
else:
    parity = "odd"
print(number, parity)`,
        validator: `assert "number" in globals() and "parity" in globals(), "عرّف المتغيّرين number و parity."
assert 10 <= number <= 50, "يجب أن يقع العدد بين 10 و 50."
assert parity in ("even", "odd"), 'يجب أن تكون parity إما "even" أو "odd".'
expected = "even" if number % 2 == 0 else "odd"
assert parity == expected, "تصنيف العدد غير صحيح — راجع شرط باقي القسمة."`,
        points: 20,
      },
      {
        id: "p6-ex2",
        kind: "exercise",
        prompt: String.raw`### تمرين 2

كرّر اختيار عدد عشوائي من $0$ إلى $99$ عدداً كبيراً من المرات، ثم احسب نسبة القيم الواقعة بين $0$ و $49$.

خزّن النسبة في \`ratio\`. يُتوقّع أن تقترب من $0.5$ كلما زاد عدد المحاولات.`,
        template: `from random import randrange

trials = 10000
count = 0
# اكتب الكود هنا
ratio =
print(ratio)`,
        hints: [
          "زد العدّاد عندما يكون العدد المختار أصغر من 50.",
          "النسبة هي `count / trials` — استعمل القسمة العادية.",
        ],
        solution: `from random import randrange

trials = 10000
count = 0
for _ in range(trials):
    if randrange(100) < 50:
        count += 1
ratio = count / trials
print(ratio)`,
        validator: `assert "ratio" in globals(), "لم تُعرّف المتغيّر ratio بعد."
assert "trials" in globals() and trials >= 1000, "استعمل عدداً كبيراً من المحاولات (1000 على الأقل)."
assert 0.0 <= ratio <= 1.0, "النسبة يجب أن تقع بين صفر وواحد."
assert abs(ratio - 0.5) < 0.06, "النسبة يجب أن تقترب من 0.5 — راجع الشرط أو زد عدد المحاولات."`,
        points: 25,
      },
    ],
  },

  /* ================================================================ */
  /* §8 أساسيات القوائم                                               */
  /* ================================================================ */
  {
    slug: "lists-basics",
    track: "bronze",
    stage: 1,
    titleAr: "أساسيات القوائم",
    titleEn: "List Basics",
    summary:
      "العمليات التي نحتاجها لاحقاً لتمثيل المتجهات والمصفوفات: الوصول والتعديل، الدمج والتكرار، القوائم المتداخلة، والبناء التراكمي.",
    order: 7,
    estimatedMinutes: 22,
    objectives: [
      "الوصول إلى عناصر القائمة وتعديلها",
      "دمج القوائم وتكرارها وإضافة عناصر إليها",
      "استعمال القوائم المتداخلة لتمثيل الصفوف والأعمدة",
      "بناء قائمة تراكمياً داخل حلقة",
    ],
    prerequisites: ["أساسيات الجمل الشرطية"],
    keywords: ["lists", "قوائم", "append", "nested", "متداخلة", "fibonacci"],
    cells: [
      {
        id: "p7-access",
        kind: "code",
        caption: "الوصول إلى العناصر وتعديلها",
        code: `L = [10, 12, 14, 16, 18, 20]
print(L[0], L[-1])

for i in range(len(L)):
    L[i] *= 2
print(L)`,
      },
      {
        id: "p7-combine",
        kind: "code",
        caption: "الإضافة والدمج والتكرار",
        code: `L1 = [1, 2, 3, 4]
L2 = [-5, -6, -7, -8]

combined = L1 + L2
combined.append(10)
repeated = [0] * 5

print(combined)
print(repeated)`,
      },
      {
        id: "p7-note",
        kind: "markdown",
        callout: "warning",
        calloutTitle: "انتبه لضرب القائمة",
        content: String.raw`ضرب القائمة في عدد صحيح **يكرّر عناصرها** ولا يضرب القيم العددية الموجودة داخلها:

\`[1, 2] * 3\` يعطي \`[1, 2, 1, 2, 1, 2]\` وليس \`[3, 6]\`.

هذا فرق جوهري عن المتجهات الرياضية، وسنعالجه في درس المتجهات باشتقاق مختصر.`,
      },
      {
        id: "p7-nested",
        kind: "code",
        caption: "القوائم المتداخلة تمثّل الصفوف والأعمدة",
        code: `A = [
    [1, 2, 3],
    [-2, -4, -6],
    [3, 6, 9],
]
for row in A:
    print(row)

print([1, 2] * 3)`,
      },
      {
        id: "p7-cumulative",
        kind: "code",
        caption: "بناء قائمة تراكمياً: قيم المجموع S(n) من n=0 إلى n=20",
        code: `values = [0]
S = 0
for n in range(1, 21):
    S += n
    values.append(S)
print(values)`,
      },
      {
        id: "p7-ex1",
        kind: "exercise",
        prompt: String.raw`### تمرين 1

أنشئ قائمة اسمها \`fibonacci\` تضم أول $30$ عنصراً من متتالية فيبوناتشي التي تبدأ بـ $1$ و $1$، بحيث يساوي كل عنصر جديد مجموع العنصرين السابقين.`,
        template: `fibonacci = [1, 1]
# اكتب الكود هنا
print(fibonacci)`,
        hints: [
          "كرّر 28 مرة إضافية للوصول إلى 30 عنصراً.",
          "العنصر الجديد هو `fibonacci[-1] + fibonacci[-2]`.",
        ],
        solution: `fibonacci = [1, 1]
for _ in range(28):
    fibonacci.append(fibonacci[-1] + fibonacci[-2])
print(fibonacci)`,
        validator: `assert "fibonacci" in globals(), "لم تُعرّف القائمة fibonacci بعد."
assert len(fibonacci) == 30, "يجب أن تحتوي القائمة على 30 عنصراً بالضبط."
assert fibonacci[0] == 1 and fibonacci[1] == 1, "تبدأ المتتالية بالعنصرين 1 و 1."
assert fibonacci[29] == 832040, "العنصر الثلاثون يجب أن يساوي 832040."
assert all(fibonacci[i] == fibonacci[i-1] + fibonacci[i-2] for i in range(2, 30)), "كل عنصر يجب أن يساوي مجموع العنصرين السابقين."`,
        points: 25,
      },
      {
        id: "p7-ex2",
        kind: "exercise",
        prompt: String.raw`### تمرين 2

أنشئ قائمة \`N\` من $11$ عنصراً، بحيث تكون \`N[i]\` قائمة فرعية تحتوي أربع قيم: الفهرس نفسه، ومربّعه، ومكعّبه، ومجموع مربّعه ومكعّبه، وذلك للفهرس $i$ من $0$ إلى $10$.`,
        template: `N = []
# اكتب الكود هنا
for row in N:
    print(row)`,
        hints: [
          "لكل i من 0 إلى 10 أضف القائمة `[i, i**2, i**3, i**2 + i**3]`.",
          "يمكن حلّها بسطر واحد باشتقاق مختصر داخل قائمة.",
        ],
        solution: `N = []
for i in range(11):
    N.append([i, i ** 2, i ** 3, i ** 2 + i ** 3])

for row in N:
    print(row)`,
        validator: `assert "N" in globals(), "لم تُعرّف القائمة N بعد."
assert len(N) == 11, "يجب أن تحتوي N على 11 عنصراً."
assert all(len(row) == 4 for row in N), "كل عنصر يجب أن يكون قائمة من أربع قيم."
assert list(N[0]) == [0, 0, 0, 0], "العنصر الأول يجب أن يكون [0, 0, 0, 0]."
assert list(N[2]) == [2, 4, 8, 12], "العنصر عند الفهرس 2 يجب أن يكون [2, 4, 8, 12]."
assert list(N[10]) == [10, 100, 1000, 1100], "العنصر الأخير يجب أن يكون [10, 100, 1000, 1100]."`,
        points: 25,
      },
    ],
  },
];
