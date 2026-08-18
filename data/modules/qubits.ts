/**
 * data/modules/qubits.ts
 * الوحدة 1: الكيوبتات والتراكب الكمي — Qubits & Superposition.
 */
import type { Exercise } from "@/types/quantum";

export const qubitsExercise: Exercise = {
  slug: "qubits-superposition",
  titleAr: "الكيوبتات والتراكب الكمي",
  titleEn: "Qubits & Superposition",
  summary:
    "ابدأ من حجر الأساس: متجهات الحالة، شرط التطبيع، قاعدة بورن، الضرب الداخلي والخارجي، وتمثيل الحالات النقية على كرة بلوخ.",
  category: "qubits",
  difficulty: "beginner",
  estimatedMinutes: 15,
  objectives: [
    "كتابة حالة كيوبت عامة والتحقق من شرط التطبيع",
    "حساب احتمالات القياس باستعمال قاعدة بورن",
    "إتقان الضرب الداخلي والخارجي في ترميز ديراك",
    "ربط الحالة النقية بموقعها على كرة بلوخ",
  ],
  keywords: [
    "كيوبت",
    "تراكب",
    "تطبيع",
    "كرة بلوخ",
    "ديراك",
    "ضرب داخلي",
    "قاعدة بورن",
    "qubit",
    "superposition",
    "bloch sphere",
    "dirac",
    "born rule",
  ],
  questions: [
    {
      id: "qb-1-normalization",
      type: "multiple-choice",
      prompt:
        "لتكن حالة كيوبت $|\\psi\\rangle = \\tfrac{3}{5}|0\\rangle + \\beta|1\\rangle$ حيث $\\beta$ عدد حقيقي موجب. ما قيمة $\\beta$ التي تجعل الحالة مُطبَّعة؟",
      math: "|\\psi\\rangle = \\tfrac{3}{5}\\,|0\\rangle + \\beta\\,|1\\rangle, \\qquad \\beta \\in \\mathbb{R}^{+}",
      hint: "شرط التطبيع هو $|\\alpha|^2 + |\\beta|^2 = 1$.",
      points: 10,
      tags: ["تطبيع", "normalization"],
      choices: [
        {
          id: "a",
          text: "$\\beta = \\tfrac{2}{5}$",
          rebuttal:
            "هذه القيمة تعطي $\\tfrac{9}{25} + \\tfrac{4}{25} = \\tfrac{13}{25} \\neq 1$، فالحالة غير مُطبَّعة.",
        },
        { id: "b", text: "$\\beta = \\tfrac{4}{5}$" },
        {
          id: "c",
          text: "$\\beta = \\tfrac{16}{25}$",
          rebuttal:
            "هنا خلطٌ بين معامل الاتساع ومربّعه: القيمة $\\tfrac{16}{25}$ هي الاحتمال لا الاتساع.",
        },
        {
          id: "d",
          text: "$\\beta = \\tfrac{1}{\\sqrt{2}}$",
          rebuttal:
            "هذه القيمة صحيحة فقط حين يتساوى مقدارا الاتساعين، وهو ليس الحال هنا.",
        },
      ],
      correctId: "b",
      explanation:
        "شرط التطبيع يفرض أن يكون مجموع مربّعات مقادير الاتساعات مساوياً للواحد، ومنه $\\beta = \\tfrac{4}{5}$ (نأخذ الجذر الموجب لأن $\\beta$ حقيقي موجب).",
      steps: [
        { text: "نكتب شرط التطبيع:", math: "|\\alpha|^2 + |\\beta|^2 = 1" },
        {
          text: "نعوّض بقيمة الاتساع الأول:",
          math: "\\left(\\tfrac{3}{5}\\right)^{2} + \\beta^{2} = 1 \\quad\\Longrightarrow\\quad \\tfrac{9}{25} + \\beta^{2} = 1",
        },
        {
          text: "نعزل ثم نأخذ الجذر الموجب:",
          math: "\\beta^{2} = \\tfrac{16}{25} \\quad\\Longrightarrow\\quad \\beta = \\tfrac{4}{5}",
        },
      ],
    },
    {
      id: "qb-2-born",
      type: "multiple-choice",
      prompt:
        "ما احتمال الحصول على النتيجة $1$ عند قياس الحالة التالية في الأساس الحسابي $\\{|0\\rangle, |1\\rangle\\}$؟",
      math: "|\\psi\\rangle = \\frac{1}{\\sqrt{3}}\\,|0\\rangle + \\sqrt{\\frac{2}{3}}\\,|1\\rangle",
      hint: "قاعدة بورن: $P(1) = |\\langle 1|\\psi\\rangle|^2$.",
      points: 10,
      tags: ["قاعدة بورن", "born rule", "احتمال"],
      choices: [
        {
          id: "a",
          text: "$\\tfrac{1}{3}$",
          rebuttal: "هذا احتمال النتيجة $0$ لا النتيجة $1$.",
        },
        {
          id: "b",
          text: "$\\sqrt{\\tfrac{2}{3}}$",
          rebuttal: "هذا معامل الاتساع نفسه؛ الاحتمال هو مربّع مقداره.",
        },
        { id: "c", text: "$\\tfrac{2}{3}$" },
        {
          id: "d",
          text: "$\\tfrac{1}{2}$",
          rebuttal: "التوزيع يكون متساوياً فقط حين يتساوى مقدارا الاتساعين.",
        },
      ],
      correctId: "c",
      explanation:
        "الاحتمال يساوي مربّع مقدار الاتساع المرافق للنتيجة، أي $P(1) = \\tfrac{2}{3}$، ونتحقق أن مجموع الاحتمالات يساوي الواحد.",
      steps: [
        {
          text: "نطبّق قاعدة بورن على النتيجة $1$:",
          math: "P(1) = |\\langle 1 | \\psi \\rangle|^{2} = |\\beta|^{2}",
        },
        {
          text: "نعوّض بمعامل الاتساع:",
          math: "P(1) = \\left|\\sqrt{\\tfrac{2}{3}}\\right|^{2} = \\tfrac{2}{3}",
        },
        {
          text: "نتحقق من اكتمال التوزيع الاحتمالي:",
          math: "P(0) + P(1) = \\tfrac{1}{3} + \\tfrac{2}{3} = 1",
        },
      ],
    },
    {
      id: "qb-3-bloch-plus",
      type: "multiple-choice",
      prompt:
        "أين تقع الحالة $|+\\rangle = \\tfrac{1}{\\sqrt{2}}\\big(|0\\rangle + |1\\rangle\\big)$ على كرة بلوخ؟",
      hint: "القطبان $\\pm z$ محجوزان للحالتين $|0\\rangle$ و $|1\\rangle$.",
      points: 10,
      tags: ["كرة بلوخ", "bloch sphere", "تراكب"],
      choices: [
        {
          id: "a",
          text: "عند القطب الشمالي، أي المحور $+z$",
          rebuttal: "القطب الشمالي هو الحالة $|0\\rangle$ تحديداً.",
        },
        { id: "b", text: "على المحور $+x$ عند خط الاستواء" },
        {
          id: "c",
          text: "على المحور $+y$ عند خط الاستواء",
          rebuttal:
            "المحور $+y$ يقابل الحالة $\\tfrac{1}{\\sqrt{2}}(|0\\rangle + i|1\\rangle)$ ذات الطور النسبي $i$.",
        },
        {
          id: "d",
          text: "في مركز الكرة",
          rebuttal:
            "المركز يقابل الحالة المختلطة القصوى $\\rho = I/2$، وهي ليست حالة نقية.",
        },
      ],
      correctId: "b",
      explanation:
        "الحالات النقية تقع على سطح الكرة. بمطابقة $|+\\rangle$ مع الصيغة العامة نجد $\\theta = \\tfrac{\\pi}{2}$ و $\\varphi = 0$، أي متجه بلوخ $\\vec{r} = (1,0,0)$.",
      steps: [
        {
          text: "الصيغة العامة لحالة نقية بدلالة زوايا بلوخ:",
          math: "|\\psi\\rangle = \\cos\\tfrac{\\theta}{2}\\,|0\\rangle + e^{i\\varphi}\\sin\\tfrac{\\theta}{2}\\,|1\\rangle",
        },
        {
          text: "بالمطابقة مع الحالة المعطاة:",
          math: "\\cos\\tfrac{\\theta}{2} = \\tfrac{1}{\\sqrt{2}} \\Rightarrow \\theta = \\tfrac{\\pi}{2}, \\qquad e^{i\\varphi} = 1 \\Rightarrow \\varphi = 0",
        },
        {
          text: "نحسب متجه بلوخ:",
          math: "\\vec{r} = (\\sin\\theta\\cos\\varphi,\\ \\sin\\theta\\sin\\varphi,\\ \\cos\\theta) = (1, 0, 0)",
        },
      ],
    },
    {
      id: "qb-4-inner-product",
      type: "fill-blank",
      prompt:
        "احسب الضرب الداخلي $\\langle 0 | + \\rangle$ ثم الاحتمال الموافق $|\\langle 0|+\\rangle|^2$. اكتب الإجابة ككسر أو عدد عشري.",
      math: "\\langle 0 | + \\rangle = \\langle 0 | \\left( \\frac{|0\\rangle + |1\\rangle}{\\sqrt{2}} \\right) = \\;?",
      hint: "استعمل $\\langle 0|0\\rangle = 1$ و $\\langle 0|1\\rangle = 0$ مع خطية الضرب الداخلي.",
      points: 15,
      tags: ["ضرب داخلي", "inner product", "تعامد"],
      blanks: [
        {
          id: "amp",
          label: "قيمة الضرب الداخلي",
          labelMath: "\\langle 0 | + \\rangle =",
          answers: [
            "1/sqrt(2)",
            "1/sqrt2",
            "1/√2",
            "0.707",
            "0.7071",
            "0.70711",
            "sqrt(2)/2",
            "√2/2",
            "0.71",
          ],
          display: "\\tfrac{1}{\\sqrt{2}} \\approx 0.7071",
          placeholder: "1/sqrt(2)",
        },
        {
          id: "prob",
          label: "الاحتمال الموافق",
          labelMath: "|\\langle 0 | + \\rangle|^{2} =",
          answers: ["1/2", "0.5", ".5", "0.50", "50%"],
          display: "\\tfrac{1}{2} = 0.5",
          placeholder: "1/2",
        },
      ],
      explanation:
        "بفضل خطية الضرب الداخلي وتعامد الأساس الحسابي يبقى الحد الأول فقط، فيكون الاتساع $\\tfrac{1}{\\sqrt{2}}$ والاحتمال $\\tfrac{1}{2}$.",
      steps: [
        {
          text: "نوزّع القوس على الحدّين:",
          math: "\\langle 0|+\\rangle = \\tfrac{1}{\\sqrt{2}}\\big(\\langle 0|0\\rangle + \\langle 0|1\\rangle\\big)",
        },
        {
          text: "نستعمل تعامد الأساس:",
          math: "\\langle 0|0\\rangle = 1, \\qquad \\langle 0|1\\rangle = 0",
        },
        {
          text: "نحصل على الاتساع ثم الاحتمال:",
          math: "\\langle 0|+\\rangle = \\tfrac{1}{\\sqrt{2}}, \\qquad \\left|\\tfrac{1}{\\sqrt{2}}\\right|^{2} = \\tfrac{1}{2}",
        },
      ],
    },
    {
      id: "qb-5-invalid-state",
      type: "multiple-choice",
      prompt: "أيٌّ من المتجهات التالية لا يمثّل حالة كيوبت صالحة؟",
      hint: "افحص شرط التطبيع لكل خيار على حدة.",
      points: 10,
      tags: ["تطبيع", "حالة صالحة"],
      choices: [
        { id: "a", text: "$\\tfrac{1}{2}|0\\rangle + \\tfrac{1}{2}|1\\rangle$" },
        {
          id: "b",
          text: "$\\tfrac{1}{\\sqrt{2}}|0\\rangle - \\tfrac{1}{\\sqrt{2}}|1\\rangle$",
          rebuttal:
            "هذه هي الحالة $|-\\rangle$ ومجموع مربّعات مقاديرها $1$؛ الإشارة السالبة طور نسبي مسموح.",
        },
        {
          id: "c",
          text: "$\\tfrac{i}{\\sqrt{2}}|0\\rangle + \\tfrac{1}{\\sqrt{2}}|1\\rangle$",
          rebuttal:
            "الاتساعات العقدية مسموحة، ولدينا $|i/\\sqrt{2}|^2 = \\tfrac{1}{2}$ فالحالة مُطبَّعة.",
        },
        {
          id: "d",
          text: "$\\tfrac{3}{5}|0\\rangle + \\tfrac{4i}{5}|1\\rangle$",
          rebuttal: "لدينا $\\tfrac{9}{25} + \\tfrac{16}{25} = 1$، إذن الحالة صالحة.",
        },
      ],
      correctId: "a",
      explanation:
        "طول المتجه في الخيار الأول هو $\\tfrac{1}{\\sqrt{2}}$ لا $1$، فهو غير مُطبَّع. وضربه في $\\sqrt{2}$ يعطي الحالة $|+\\rangle$.",
      steps: [
        {
          text: "نحسب مربّع الطول للخيار الأول:",
          math: "\\left|\\tfrac{1}{2}\\right|^{2} + \\left|\\tfrac{1}{2}\\right|^{2} = \\tfrac{1}{2} \\neq 1",
        },
        {
          text: "لاحظ أن الطور العقدي أو الإشارة لا يغيّران المقدار:",
          math: "\\left|\\tfrac{i}{\\sqrt{2}}\\right|^{2} = \\tfrac{1}{2}, \\qquad \\left|-\\tfrac{1}{\\sqrt{2}}\\right|^{2} = \\tfrac{1}{2}",
        },
        {
          text: "التطبيع الصحيح للخيار الأول:",
          math: "\\sqrt{2}\\left(\\tfrac{1}{2}|0\\rangle + \\tfrac{1}{2}|1\\rangle\\right) = |+\\rangle",
        },
      ],
    },
    {
      id: "qb-6-outer-product",
      type: "fill-blank",
      prompt:
        "اكتب عناصر مصفوفة مؤثر الإسقاط $P_0 = |0\\rangle\\langle 0|$ في الأساس الحسابي (أدخل الأعداد فقط).",
      math: "|0\\rangle\\langle 0| = \\begin{pmatrix} 1 \\\\ 0 \\end{pmatrix}\\begin{pmatrix} 1 & 0 \\end{pmatrix} = \\begin{pmatrix} a_{11} & a_{12} \\\\ a_{21} & a_{22} \\end{pmatrix}",
      hint: "ضرب متجه عمودي في متجه سطري يعطي مصفوفة $2\\times 2$.",
      points: 15,
      tags: ["ضرب خارجي", "outer product", "مؤثر إسقاط"],
      blanks: [
        { id: "a11", label: "العنصر الأول", labelMath: "a_{11} =", answers: ["1"], display: "1", placeholder: "0 أو 1" },
        { id: "a12", label: "العنصر الثاني", labelMath: "a_{12} =", answers: ["0"], display: "0", placeholder: "0 أو 1" },
        { id: "a21", label: "العنصر الثالث", labelMath: "a_{21} =", answers: ["0"], display: "0", placeholder: "0 أو 1" },
        { id: "a22", label: "العنصر الرابع", labelMath: "a_{22} =", answers: ["0"], display: "0", placeholder: "0 أو 1" },
      ],
      explanation:
        "الضرب الخارجي $|0\\rangle\\langle 0|$ ينتج مصفوفة عنصرها العلوي الأيسر فقط يساوي $1$، وهي مؤثر الإسقاط على $|0\\rangle$ وتحقق $P_0^2 = P_0$.",
      steps: [
        {
          text: "نكتب المتجهين صراحة:",
          math: "|0\\rangle = \\begin{pmatrix} 1 \\\\ 0 \\end{pmatrix}, \\qquad \\langle 0| = \\begin{pmatrix} 1 & 0 \\end{pmatrix}",
        },
        {
          text: "نُجري الضرب الخارجي:",
          math: "|0\\rangle\\langle 0| = \\begin{pmatrix} 1\\cdot 1 & 1\\cdot 0 \\\\ 0\\cdot 1 & 0\\cdot 0 \\end{pmatrix} = \\begin{pmatrix} 1 & 0 \\\\ 0 & 0 \\end{pmatrix}",
        },
        {
          text: "نتحقق من خاصيتَي الإسقاط والاكتمال:",
          math: "P_0^{2} = P_0, \\qquad P_0 + P_1 = I",
        },
      ],
    },
    {
      id: "qb-7-global-phase",
      type: "multiple-choice",
      prompt:
        "ما الفرق الفيزيائي بين الحالتين $|\\psi\\rangle$ و $e^{i\\gamma}|\\psi\\rangle$ حيث $\\gamma$ عدد حقيقي؟",
      hint: "احسب احتمال أي نتيجة قياس في الحالتين وقارن.",
      points: 10,
      tags: ["طور عام", "global phase"],
      choices: [
        { id: "a", text: "لا يوجد أي فرق قابل للرصد؛ الطور العام غير فيزيائي" },
        {
          id: "b",
          text: "تتغيّر احتمالات القياس بمقدار $\\gamma$",
          rebuttal: "الاحتمالات لا تتغيّر إطلاقاً لأن $|e^{i\\gamma}|^2 = 1$.",
        },
        {
          id: "c",
          text: "تنتقل الحالة إلى النقطة المقابلة على كرة بلوخ",
          rebuttal:
            "متجه بلوخ لا يتأثر بالطور العام، والنقطة المقابلة تعني حالة متعامدة تماماً.",
        },
        {
          id: "d",
          text: "تصبح الحالة غير مُطبَّعة",
          rebuttal: "الضرب في طور وحدوي يحافظ على التطبيع تماماً.",
        },
      ],
      correctId: "a",
      explanation:
        "أي قياس يعطي النتيجة نفسها لأن الطور العام يختفي عند أخذ مربّع المقدار. أما الطور النسبي بين حدَّي التراكب فهو قابل للرصد ويغيّر النتائج فعلاً.",
      steps: [
        {
          text: "احتمال أي نتيجة في الحالة المطوّرة بالطور:",
          math: "\\left|\\langle \\phi | e^{i\\gamma} |\\psi\\rangle\\right|^{2} = |e^{i\\gamma}|^{2}\\,|\\langle\\phi|\\psi\\rangle|^{2}",
        },
        { text: "وبما أن مقدار الطور يساوي الواحد:", math: "= |\\langle \\phi|\\psi\\rangle|^{2}" },
        {
          text: "بالمقابل، الطور النسبي يغيّر الحالة فيزيائياً:",
          math: "\\tfrac{1}{\\sqrt{2}}(|0\\rangle + |1\\rangle) = |+\\rangle \\;\\neq\\; \\tfrac{1}{\\sqrt{2}}(|0\\rangle - |1\\rangle) = |-\\rangle",
        },
      ],
    },
    {
      id: "qb-8-bloch-angles",
      type: "multiple-choice",
      prompt:
        "ما زوايا بلوخ $(\\theta, \\varphi)$ الموافقة للحالة $|-\\rangle = \\tfrac{1}{\\sqrt{2}}\\big(|0\\rangle - |1\\rangle\\big)$؟",
      hint: "لاحظ أن $-1 = e^{i\\pi}$.",
      points: 15,
      tags: ["كرة بلوخ", "طور نسبي"],
      choices: [
        {
          id: "a",
          text: "$\\theta = 0,\\ \\varphi = \\pi$",
          rebuttal: "القيمة $\\theta = 0$ تعني القطب الشمالي أي الحالة $|0\\rangle$.",
        },
        { id: "b", text: "$\\theta = \\tfrac{\\pi}{2},\\ \\varphi = \\pi$" },
        {
          id: "c",
          text: "$\\theta = \\pi,\\ \\varphi = 0$",
          rebuttal: "هذه زوايا الحالة $|1\\rangle$ عند القطب الجنوبي.",
        },
        {
          id: "d",
          text: "$\\theta = \\tfrac{\\pi}{2},\\ \\varphi = \\tfrac{\\pi}{2}$",
          rebuttal: "هذه زوايا الحالة الواقعة على المحور $+y$.",
        },
      ],
      correctId: "b",
      explanation:
        "تساوي مقدارَي الاتساع يضع الحالة على خط الاستواء $\\theta = \\tfrac{\\pi}{2}$، والإشارة السالبة تعني طوراً نسبياً $\\varphi = \\pi$، أي المتجه $\\vec{r} = (-1,0,0)$.",
      steps: [
        {
          text: "من الصيغة العامة:",
          math: "|\\psi\\rangle = \\cos\\tfrac{\\theta}{2}|0\\rangle + e^{i\\varphi}\\sin\\tfrac{\\theta}{2}|1\\rangle",
        },
        {
          text: "تساوي المقدارين يعطي:",
          math: "\\cos\\tfrac{\\theta}{2} = \\sin\\tfrac{\\theta}{2} = \\tfrac{1}{\\sqrt{2}} \\;\\Longrightarrow\\; \\theta = \\tfrac{\\pi}{2}",
        },
        {
          text: "والإشارة السالبة تُكتب كطور:",
          math: "-1 = e^{i\\pi} \\;\\Longrightarrow\\; \\varphi = \\pi, \\qquad \\vec{r} = (-1,0,0)",
        },
      ],
    },
    {
      id: "qb-9-amplitude-from-prob",
      type: "fill-blank",
      prompt:
        "كيوبت في الحالة $|\\psi\\rangle = \\alpha|0\\rangle + \\beta|1\\rangle$ مع $\\alpha$ حقيقي موجب. إذا كان احتمال قياس $0$ يساوي $0.25$، فما قيمة $\\alpha$ وما قيمة $|\\beta|$؟",
      hint: "لدينا $|\\alpha|^2 = P(0)$، ثم استعمل شرط التطبيع لإيجاد $|\\beta|$.",
      points: 15,
      tags: ["اتساع", "amplitude", "تطبيع"],
      blanks: [
        {
          id: "alpha",
          label: "معامل الاتساع الأول",
          labelMath: "\\alpha =",
          answers: ["1/2", "0.5", ".5", "0.50"],
          display: "\\tfrac{1}{2} = 0.5",
          placeholder: "1/2",
        },
        {
          id: "beta",
          label: "مقدار الاتساع الثاني",
          labelMath: "|\\beta| =",
          answers: ["sqrt(3)/2", "√3/2", "0.866", "0.8660", "0.87", "sqrt3/2"],
          display: "\\tfrac{\\sqrt{3}}{2} \\approx 0.866",
          placeholder: "sqrt(3)/2",
        },
      ],
      explanation:
        "من قاعدة بورن $\\alpha = \\sqrt{0.25} = \\tfrac{1}{2}$، ومن التطبيع $|\\beta| = \\sqrt{0.75} = \\tfrac{\\sqrt{3}}{2}$، أي احتمال $75\\%$ للنتيجة $1$.",
      steps: [
        {
          text: "من قاعدة بورن:",
          math: "|\\alpha|^{2} = P(0) = 0.25 \\;\\Longrightarrow\\; \\alpha = \\tfrac{1}{2}",
        },
        { text: "من شرط التطبيع:", math: "|\\beta|^{2} = 1 - 0.25 = 0.75" },
        {
          text: "نأخذ الجذر التربيعي:",
          math: "|\\beta| = \\sqrt{\\tfrac{3}{4}} = \\tfrac{\\sqrt{3}}{2} \\approx 0.866",
        },
      ],
    },
    {
      id: "qb-10-orthogonality",
      type: "multiple-choice",
      prompt: "ما قيمة الضرب الداخلي $\\langle + | - \\rangle$؟",
      math: "|+\\rangle = \\frac{|0\\rangle + |1\\rangle}{\\sqrt{2}}, \\qquad |-\\rangle = \\frac{|0\\rangle - |1\\rangle}{\\sqrt{2}}",
      hint: "وزّع الضرب واستعمل $\\langle 0|0\\rangle = \\langle 1|1\\rangle = 1$.",
      points: 10,
      tags: ["تعامد", "أساس هادامارد"],
      choices: [
        {
          id: "a",
          text: "$1$",
          rebuttal: "القيمة $1$ تعني أن الحالتين متطابقتان، وهذا غير صحيح.",
        },
        {
          id: "b",
          text: "$\\tfrac{1}{\\sqrt{2}}$",
          rebuttal: "هذه قيمة $\\langle 0|+\\rangle$ وليست المطلوبة.",
        },
        { id: "c", text: "$0$" },
        {
          id: "d",
          text: "$-1$",
          rebuttal: "هذه القيمة تعني حالتين متطابقتين بفارق طور عام، وليس الأمر كذلك.",
        },
      ],
      correctId: "c",
      explanation:
        "الحالتان $|+\\rangle$ و $|-\\rangle$ متعامدتان، لذا تشكّلان أساساً صالحاً للقياس يُسمّى أساس هادامارد أو الأساس $X$.",
      steps: [
        {
          text: "نضرب القوسين ونوزّع:",
          math: "\\langle +|-\\rangle = \\tfrac{1}{2}\\big(\\langle 0| + \\langle 1|\\big)\\big(|0\\rangle - |1\\rangle\\big)",
        },
        {
          text: "نفكّ الحدود الأربعة:",
          math: "= \\tfrac{1}{2}\\big(\\langle 0|0\\rangle - \\langle 0|1\\rangle + \\langle 1|0\\rangle - \\langle 1|1\\rangle\\big)",
        },
        { text: "نعوّض بقيم التعامد:", math: "= \\tfrac{1}{2}(1 - 0 + 0 - 1) = 0" },
      ],
    },
  ],
};
