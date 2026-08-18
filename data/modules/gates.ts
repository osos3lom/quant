/**
 * data/modules/gates.ts
 * الوحدة 2: البوابات الكمية الأحادية والمتعددة — Quantum Gates.
 */
import type { Exercise } from "@/types/quantum";

export const gatesExercise: Exercise = {
  slug: "quantum-gates",
  titleAr: "البوابات الكمية الأحادية والمتعددة",
  titleEn: "Single & Multi-Qubit Quantum Gates",
  summary:
    "تمرّن على بوابات باولي وهادامارد وبوابات الطور، وعلى بوابات التحكم CNOT و Toffoli و SWAP، مع حساب المصفوفات وأثرها على الحالات.",
  category: "gates",
  difficulty: "intermediate",
  estimatedMinutes: 20,
  objectives: [
    "تطبيق بوابات باولي وهادامارد على الحالات الأساسية",
    "استعمال بوابات الطور $S$ و $T$ وربطها ببعضها",
    "فهم عمل بوابات التحكم على حالات متعددة الكيوبتات",
    "التحقق من وحدوية البوابات وخصائصها الجبرية",
  ],
  keywords: [
    "بوابة",
    "هادامارد",
    "باولي",
    "طور",
    "سي نوت",
    "توفولي",
    "تبديل",
    "وحدوية",
    "gate",
    "hadamard",
    "pauli",
    "cnot",
    "toffoli",
    "swap",
    "unitary",
  ],
  questions: [
    {
      id: "gt-1-h-on-zero",
      type: "multiple-choice",
      prompt: "ما ناتج تطبيق بوابة هادامارد على الحالة $|0\\rangle$؟",
      math: "H = \\frac{1}{\\sqrt{2}}\\begin{pmatrix} 1 & 1 \\\\ 1 & -1 \\end{pmatrix}, \\qquad H|0\\rangle = \\;?",
      hint: "اضرب المصفوفة في المتجه العمودي $\\begin{pmatrix} 1 \\\\ 0 \\end{pmatrix}$.",
      points: 10,
      tags: ["هادامارد", "hadamard", "تراكب"],
      choices: [
        { id: "a", text: "$|+\\rangle = \\tfrac{1}{\\sqrt{2}}(|0\\rangle + |1\\rangle)$" },
        {
          id: "b",
          text: "$|-\\rangle = \\tfrac{1}{\\sqrt{2}}(|0\\rangle - |1\\rangle)$",
          rebuttal: "هذا ناتج $H|1\\rangle$ حيث يظهر الطور النسبي السالب.",
        },
        { id: "c", text: "$|1\\rangle$", rebuttal: "قلب البت هو عمل البوابة $X$ لا البوابة $H$." },
        {
          id: "d",
          text: "$|0\\rangle$",
          rebuttal: "البوابة $H$ تُخرج الكيوبت من الأساس الحسابي إلى تراكب متساوٍ.",
        },
      ],
      correctId: "a",
      explanation:
        "بوابة هادامارد تنقل الأساس الحسابي إلى أساس $X$: فتحوّل $|0\\rangle$ إلى $|+\\rangle$ و $|1\\rangle$ إلى $|-\\rangle$، وهي أداة توليد التراكب الأساسية في أي دائرة كمية.",
      steps: [
        {
          text: "نكتب عملية الضرب:",
          math: "H|0\\rangle = \\frac{1}{\\sqrt{2}}\\begin{pmatrix} 1 & 1 \\\\ 1 & -1 \\end{pmatrix}\\begin{pmatrix} 1 \\\\ 0 \\end{pmatrix}",
        },
        {
          text: "نأخذ العمود الأول من المصفوفة:",
          math: "= \\frac{1}{\\sqrt{2}}\\begin{pmatrix} 1 \\\\ 1 \\end{pmatrix}",
        },
        {
          text: "نعيد الكتابة بترميز ديراك:",
          math: "= \\tfrac{1}{\\sqrt{2}}\\big(|0\\rangle + |1\\rangle\\big) = |+\\rangle",
        },
      ],
    },
    {
      id: "gt-2-z-on-plus",
      type: "multiple-choice",
      prompt: "ما ناتج تطبيق بوابة باولي $Z$ على الحالة $|+\\rangle$؟",
      math: "Z = \\begin{pmatrix} 1 & 0 \\\\ 0 & -1 \\end{pmatrix}, \\qquad Z|+\\rangle = \\;?",
      hint: "البوابة $Z$ تترك $|0\\rangle$ كما هي وتضيف إشارة سالبة إلى $|1\\rangle$.",
      points: 10,
      tags: ["باولي", "pauli", "طور"],
      choices: [
        { id: "a", text: "$|+\\rangle$", rebuttal: "الحالة $|+\\rangle$ ليست متجهاً ذاتياً للبوابة $Z$." },
        { id: "b", text: "$|-\\rangle$" },
        {
          id: "c",
          text: "$|0\\rangle$",
          rebuttal: "البوابات الكمية وحدوية وعكوسة، ولا يمكنها طيّ تراكب إلى حالة أساسية واحدة.",
        },
        {
          id: "d",
          text: "$-|+\\rangle$",
          rebuttal:
            "الإشارة تظهر على الحد الثاني فقط، فهي طور نسبي لا طور عام.",
        },
      ],
      correctId: "b",
      explanation:
        "البوابة $Z$ تقلب الطور النسبي فتبدّل بين $|+\\rangle$ و $|-\\rangle$، أي إنها تعمل داخل أساس $X$ عمل البوابة $X$ داخل الأساس الحسابي.",
      steps: [
        {
          text: "نطبّق $Z$ على كل حد:",
          math: "Z|+\\rangle = \\tfrac{1}{\\sqrt{2}}\\big(Z|0\\rangle + Z|1\\rangle\\big)",
        },
        { text: "نستعمل أثر البوابة على الأساس:", math: "Z|0\\rangle = |0\\rangle, \\qquad Z|1\\rangle = -|1\\rangle" },
        {
          text: "نجمع النتيجة:",
          math: "= \\tfrac{1}{\\sqrt{2}}\\big(|0\\rangle - |1\\rangle\\big) = |-\\rangle",
        },
      ],
    },
    {
      id: "gt-3-hzh",
      type: "multiple-choice",
      prompt: "ما البوابة المكافئة للتركيب $HZH$؟",
      math: "H Z H = \\;?",
      hint: "جرّب أثر التركيب على $|0\\rangle$ ثم على $|1\\rangle$.",
      points: 15,
      tags: ["تكافؤ", "hadamard", "تحويل أساس"],
      choices: [
        { id: "a", text: "البوابة $X$" },
        { id: "b", text: "البوابة $Z$", rebuttal: "الإحاطة ببوابتَي هادامارد تبدّل دور المحورين $X$ و $Z$." },
        { id: "c", text: "البوابة $Y$", rebuttal: "الحصول على $Y$ يتطلب طوراً عقدياً لا يُنتجه هذا التركيب." },
        {
          id: "d",
          text: "بوابة الهوية $I$",
          rebuttal: "الهوية تنتج من $HH$ وليس من $HZH$.",
        },
      ],
      correctId: "a",
      explanation:
        "بوابة هادامارد تُبدّل بين المحورين $X$ و $Z$ على كرة بلوخ، لذا $HZH = X$ وبالمثل $HXH = Z$. هذه العلاقة أساسية لتحويل قياس في أساس $X$ إلى قياس في الأساس الحسابي.",
      steps: [
        {
          text: "نتتبّع أثر التركيب على $|0\\rangle$:",
          math: "|0\\rangle \\xrightarrow{H} |+\\rangle \\xrightarrow{Z} |-\\rangle \\xrightarrow{H} |1\\rangle",
        },
        {
          text: "ثم أثره على $|1\\rangle$:",
          math: "|1\\rangle \\xrightarrow{H} |-\\rangle \\xrightarrow{Z} |+\\rangle \\xrightarrow{H} |0\\rangle",
        },
        {
          text: "هذا بالضبط عمل بوابة قلب البت:",
          math: "HZH = X = \\begin{pmatrix} 0 & 1 \\\\ 1 & 0 \\end{pmatrix}",
        },
      ],
    },
    {
      id: "gt-4-s-matrix",
      type: "fill-blank",
      prompt:
        "بوابة الطور $S$ قطرية وتضيف طوراً مقداره $\\tfrac{\\pi}{2}$ إلى الحالة $|1\\rangle$. اكتب العنصرين القطريين لمصفوفتها.",
      math: "S = \\begin{pmatrix} s_{11} & 0 \\\\ 0 & s_{22} \\end{pmatrix}, \\qquad S|1\\rangle = e^{i\\pi/2}|1\\rangle",
      hint: "تذكّر أن $e^{i\\pi/2} = i$.",
      points: 15,
      tags: ["بوابة طور", "phase gate", "مصفوفة"],
      blanks: [
        {
          id: "s11",
          label: "العنصر القطري الأول",
          labelMath: "s_{11} =",
          answers: ["1"],
          display: "1",
          placeholder: "1",
        },
        {
          id: "s22",
          label: "العنصر القطري الثاني",
          labelMath: "s_{22} =",
          answers: ["i", "+i", "e^(ipi/2)", "e^{ipi/2}"],
          display: "i = e^{i\\pi/2}",
          placeholder: "i",
        },
      ],
      explanation:
        "بوابة الطور $S$ تترك $|0\\rangle$ دون تغيير وتضرب $|1\\rangle$ في $i$، ويصح أن نكتب $S = \\sqrt{Z}$ لأن $S^2 = Z$.",
      steps: [
        {
          text: "الصيغة العامة لبوابة طور بزاوية $\\phi$:",
          math: "P(\\phi) = \\begin{pmatrix} 1 & 0 \\\\ 0 & e^{i\\phi} \\end{pmatrix}",
        },
        {
          text: "نعوّض بالزاوية المطلوبة:",
          math: "\\phi = \\tfrac{\\pi}{2} \\;\\Longrightarrow\\; e^{i\\pi/2} = i",
        },
        {
          text: "إذن المصفوفة ونتيجتها المهمة:",
          math: "S = \\begin{pmatrix} 1 & 0 \\\\ 0 & i \\end{pmatrix}, \\qquad S^{2} = \\begin{pmatrix} 1 & 0 \\\\ 0 & -1 \\end{pmatrix} = Z",
        },
      ],
    },
    {
      id: "gt-5-t-gate",
      type: "multiple-choice",
      prompt: "ما العلاقة الصحيحة بين بوابة $T$ وبوابة $S$؟",
      math: "T = \\begin{pmatrix} 1 & 0 \\\\ 0 & e^{i\\pi/4} \\end{pmatrix}, \\qquad S = \\begin{pmatrix} 1 & 0 \\\\ 0 & i \\end{pmatrix}",
      hint: "اضرب البوابة $T$ في نفسها وراقب الطور الناتج.",
      points: 10,
      tags: ["بوابة T", "t gate", "طور"],
      choices: [
        { id: "a", text: "$T^{2} = S$" },
        { id: "b", text: "$T^{2} = Z$", rebuttal: "هذه علاقة البوابة $S$ لا البوابة $T$؛ الصحيح $T^4 = Z$." },
        {
          id: "c",
          text: "$T = S^{2}$",
          rebuttal: "العلاقة معكوسة: $T$ أصغر من $S$ في مقدار الطور لا أكبر.",
        },
        { id: "d", text: "$T = S^{\\dagger}$", rebuttal: "البوابة $S^{\\dagger}$ تضيف الطور $-i$ وهو أمر مختلف تماماً." },
      ],
      correctId: "a",
      explanation:
        "بوابة $T$ نصف بوابة $S$ في الطور، فتطبيقها مرتين يعطي $S$ وأربع مرات يعطي $Z$. وتُسمّى $T$ أيضاً $\\sqrt{S}$، وهي بوابة غير كليفوردية ومكلفة في تصحيح الأخطاء.",
      steps: [
        {
          text: "نضرب البوابة في نفسها:",
          math: "T^{2} = \\begin{pmatrix} 1 & 0 \\\\ 0 & e^{i\\pi/4} \\end{pmatrix}\\begin{pmatrix} 1 & 0 \\\\ 0 & e^{i\\pi/4} \\end{pmatrix}",
        },
        {
          text: "نجمع الأطوار في العنصر القطري:",
          math: "= \\begin{pmatrix} 1 & 0 \\\\ 0 & e^{i\\pi/2} \\end{pmatrix} = \\begin{pmatrix} 1 & 0 \\\\ 0 & i \\end{pmatrix} = S",
        },
        { text: "وبالتالي سلسلة العلاقات:", math: "T^{2} = S, \\qquad T^{4} = S^{2} = Z" },
      ],
    },
    {
      id: "gt-6-cnot",
      type: "multiple-choice",
      prompt:
        "تعمل بوابة $\\text{CNOT}$ بحيث يكون الكيوبت الأول متحكّماً والثاني هدفاً، بترتيب $|q_1 q_0\\rangle$. ما ناتج $\\text{CNOT}\\,|10\\rangle$؟",
      math: "\\text{CNOT}: |c\\rangle|t\\rangle \\mapsto |c\\rangle|t \\oplus c\\rangle",
      hint: "الهدف ينقلب فقط عندما يكون المتحكّم في الحالة $|1\\rangle$.",
      points: 10,
      tags: ["cnot", "بوابة تحكم", "controlled"],
      choices: [
        { id: "a", text: "$|10\\rangle$", rebuttal: "المتحكّم هنا يساوي $1$، لذا لا بد أن ينقلب الهدف." },
        { id: "b", text: "$|11\\rangle$" },
        { id: "c", text: "$|01\\rangle$", rebuttal: "بوابة $\\text{CNOT}$ لا تغيّر كيوبت التحكم أبداً." },
        {
          id: "d",
          text: "$\\tfrac{1}{\\sqrt{2}}(|10\\rangle + |11\\rangle)$",
          rebuttal: "البوابة لا تولّد تراكباً عند تطبيقها على حالة أساسية؛ ذلك دور هادامارد.",
        },
      ],
      correctId: "b",
      explanation:
        "بما أن كيوبت التحكم يساوي $1$، يُطبَّق قلب البت على الهدف فيتحوّل $0$ إلى $1$، وتبقى قيمة التحكم كما هي: $|10\\rangle \\mapsto |11\\rangle$.",
      steps: [
        {
          text: "قاعدة عمل البوابة:",
          math: "\\text{CNOT}|c, t\\rangle = |c,\\ t \\oplus c\\rangle",
        },
        { text: "نعوّض بالقيم $c = 1$ و $t = 0$:", math: "t \\oplus c = 0 \\oplus 1 = 1" },
        {
          text: "إذن الحالة الناتجة:",
          math: "\\text{CNOT}|10\\rangle = |11\\rangle",
        },
      ],
    },
    {
      id: "gt-7-unitarity",
      type: "multiple-choice",
      prompt: "ما الشرط الذي يجب أن تحققه أي مصفوفة $U$ لتمثّل بوابة كمية صالحة؟",
      hint: "يجب أن يبقى مجموع الاحتمالات مساوياً للواحد بعد التطبيق.",
      points: 10,
      tags: ["وحدوية", "unitary", "عكوسية"],
      choices: [
        { id: "a", text: "$U^{\\dagger}U = U U^{\\dagger} = I$" },
        {
          id: "b",
          text: "أن تكون المصفوفة هيرميتية $U = U^{\\dagger}$",
          rebuttal:
            "بعض البوابات هيرميتية مثل $X$ و $H$، لكن ذلك ليس شرطاً عاماً؛ البوابة $S$ مثلاً وحدوية وغير هيرميتية.",
        },
        {
          id: "c",
          text: "أن يكون محدّدها مساوياً للواحد تماماً",
          rebuttal:
            "المحدّد يكفي أن يكون مقداره $1$؛ فمثلاً $\\det(Z) = -1$ ومع ذلك $Z$ بوابة صالحة.",
        },
        {
          id: "d",
          text: "أن تكون جميع عناصرها حقيقية",
          rebuttal: "بوابات مثل $S$ و $T$ و $Y$ تحوي عناصر عقدية وهي بوابات صالحة.",
        },
      ],
      correctId: "a",
      explanation:
        "الوحدوية تضمن حفظ الطول أي حفظ مجموع الاحتمالات، وتضمن كذلك عكوسية العملية لأن $U^{-1} = U^{\\dagger}$، وهذا سبب كون كل بوابة كمية قابلة للعكس.",
      steps: [
        {
          text: "الطول بعد تطبيق البوابة:",
          math: "\\langle \\psi | U^{\\dagger} U | \\psi \\rangle = \\langle \\psi | \\psi \\rangle = 1",
        },
        { text: "ومن ثم تكون البوابة عكوسة:", math: "U^{-1} = U^{\\dagger}" },
        {
          text: "مثال للتحقق:",
          math: "H^{\\dagger}H = \\tfrac{1}{2}\\begin{pmatrix} 1 & 1 \\\\ 1 & -1 \\end{pmatrix}\\begin{pmatrix} 1 & 1 \\\\ 1 & -1 \\end{pmatrix} = I",
        },
      ],
    },
    {
      id: "gt-8-anticommute",
      type: "fill-blank",
      prompt:
        "احسب قيمة المُبدِّل المضاد $\\{X, Z\\} = XZ + ZX$، ثم قيمة المربّع $X^2$. اكتب $0$ أو $I$ بحسب الناتج.",
      math: "X = \\begin{pmatrix} 0 & 1 \\\\ 1 & 0 \\end{pmatrix}, \\qquad Z = \\begin{pmatrix} 1 & 0 \\\\ 0 & -1 \\end{pmatrix}",
      hint: "احسب $XZ$ و $ZX$ كلاً على حدة ثم اجمعهما.",
      points: 20,
      tags: ["مبدل مضاد", "anticommutator", "باولي"],
      blanks: [
        {
          id: "anti",
          label: "قيمة المُبدِّل المضاد",
          labelMath: "\\{X, Z\\} =",
          answers: ["0", "zero", "المصفوفة الصفرية", "صفر"],
          display: "0",
          placeholder: "0 أو I",
        },
        {
          id: "square",
          label: "قيمة المربّع",
          labelMath: "X^{2} =",
          answers: ["i", "I", "الهوية", "identity", "1"],
          display: "I",
          placeholder: "0 أو I",
        },
      ],
      explanation:
        "مصفوفات باولي تتبادل تبادلاً مضاداً فيما بينها، أي $\\{X,Z\\} = 0$، ومربّع كل منها يساوي مصفوفة الهوية. هاتان الخاصيتان أساس جبر باولي المستعمل في تصحيح الأخطاء.",
      steps: [
        {
          text: "نحسب الضرب في الاتجاه الأول:",
          math: "XZ = \\begin{pmatrix} 0 & 1 \\\\ 1 & 0 \\end{pmatrix}\\begin{pmatrix} 1 & 0 \\\\ 0 & -1 \\end{pmatrix} = \\begin{pmatrix} 0 & -1 \\\\ 1 & 0 \\end{pmatrix}",
        },
        {
          text: "ثم في الاتجاه المعاكس:",
          math: "ZX = \\begin{pmatrix} 1 & 0 \\\\ 0 & -1 \\end{pmatrix}\\begin{pmatrix} 0 & 1 \\\\ 1 & 0 \\end{pmatrix} = \\begin{pmatrix} 0 & 1 \\\\ -1 & 0 \\end{pmatrix}",
        },
        {
          text: "نجمعهما ونحسب المربّع:",
          math: "XZ + ZX = 0, \\qquad X^{2} = I",
        },
      ],
    },
    {
      id: "gt-9-toffoli",
      type: "multiple-choice",
      prompt:
        "بوابة توفولي $\\text{CCNOT}$ تعمل على ثلاثة كيوبتات. ما ناتج تطبيقها على الحالة $|110\\rangle$ حيث الكيوبتان الأوّلان متحكّمان؟",
      math: "\\text{CCNOT}: |c_1 c_2 t\\rangle \\mapsto |c_1 c_2,\\ t \\oplus (c_1 \\wedge c_2)\\rangle",
      hint: "الهدف ينقلب فقط إذا كان المتحكّمان معاً في الحالة $|1\\rangle$.",
      points: 15,
      tags: ["توفولي", "toffoli", "ccnot"],
      choices: [
        { id: "a", text: "$|110\\rangle$", rebuttal: "المتحكّمان كلاهما يساوي $1$، لذا لا بد أن ينقلب الهدف." },
        { id: "b", text: "$|111\\rangle$" },
        { id: "c", text: "$|100\\rangle$", rebuttal: "بوابة توفولي لا تغيّر كيوبتات التحكم." },
        {
          id: "d",
          text: "$|011\\rangle$",
          rebuttal: "لا يوجد أي تبديل بين الكيوبتات في هذه البوابة؛ ذلك دور بوابة $\\text{SWAP}$.",
        },
      ],
      correctId: "b",
      explanation:
        "بما أن $c_1 \\wedge c_2 = 1$ ينقلب الهدف من $0$ إلى $1$. وتوفولي بوابة كلاسيكية شاملة أيضاً، إذ يمكن بناء بوابة $\\text{AND}$ منها، وهو ما يجعل الحوسبة الكمية قادرة على محاكاة أي حساب كلاسيكي.",
      steps: [
        { text: "نفحص شرط الانقلاب:", math: "c_1 \\wedge c_2 = 1 \\wedge 1 = 1" },
        { text: "نطبّق الجمع بترديد الاثنين على الهدف:", math: "t \\oplus 1 = 0 \\oplus 1 = 1" },
        { text: "الحالة الناتجة:", math: "\\text{CCNOT}|110\\rangle = |111\\rangle" },
      ],
    },
    {
      id: "gt-10-swap",
      type: "multiple-choice",
      prompt: "كم عدد بوابات $\\text{CNOT}$ اللازمة لبناء بوابة $\\text{SWAP}$؟",
      math: "\\text{SWAP} = \\text{CNOT}_{12}\\,\\text{CNOT}_{21}\\,\\text{CNOT}_{12}",
      hint: "الحيلة تعتمد على تبديل اتجاه التحكم بين كل خطوة وأخرى.",
      points: 15,
      tags: ["swap", "تفكيك", "decomposition"],
      choices: [
        { id: "a", text: "بوابة واحدة", rebuttal: "بوابة $\\text{CNOT}$ واحدة تنسخ معلومة في اتجاه واحد فقط ولا تُبادل." },
        { id: "b", text: "بوابتان", rebuttal: "بوابتان تعيدان أحد الكيوبتين إلى قيمته الأصلية دون إتمام التبادل." },
        { id: "c", text: "ثلاث بوابات" },
        { id: "d", text: "أربع بوابات", rebuttal: "ثلاث بوابات تكفي، والرابعة زائدة وتُفسد النتيجة." },
      ],
      correctId: "c",
      explanation:
        "ثلاث بوابات $\\text{CNOT}$ متعاقبة مع تبديل اتجاه التحكم تحقّق التبادل الكامل. هذا التفكيك مهم عملياً لأن كثيراً من المعالجات لا توفّر بوابة $\\text{SWAP}$ أصلية.",
      steps: [
        {
          text: "نتتبّع الحالة $|a, b\\rangle$ خطوة بخطوة:",
          math: "|a, b\\rangle \\xrightarrow{\\text{CNOT}_{12}} |a,\\ a \\oplus b\\rangle",
        },
        {
          text: "ثم نعكس اتجاه التحكم:",
          math: "\\xrightarrow{\\text{CNOT}_{21}} |a \\oplus (a \\oplus b),\\ a \\oplus b\\rangle = |b,\\ a \\oplus b\\rangle",
        },
        {
          text: "وأخيراً نعيد الاتجاه الأول:",
          math: "\\xrightarrow{\\text{CNOT}_{12}} |b,\\ b \\oplus (a \\oplus b)\\rangle = |b, a\\rangle",
        },
      ],
    },
  ],
};
