/**
 * data/modules/measurement.ts
 * الوحدة 4: القياس الكمي ومصفوفة الكثافة — Measurement & Density Matrices.
 */
import type { Exercise } from "@/types/quantum";

export const measurementExercise: Exercise = {
  slug: "measurement-density",
  titleAr: "القياس الكمي ومصفوفة الكثافة",
  titleEn: "Quantum Measurement & Density Matrices",
  summary:
    "قاعدة بورن ومؤثرات الإسقاط، ثم الانتقال إلى صياغة مصفوفة الكثافة: النقاء، الحالات المختلطة، الأثر الجزئي، والقيم المتوقعة.",
  category: "measurement",
  difficulty: "advanced",
  estimatedMinutes: 25,
  objectives: [
    "تطبيق مؤثرات الإسقاط وحساب الحالة بعد القياس",
    "بناء مصفوفة الكثافة لحالة نقية وأخرى مختلطة",
    "استعمال النقاء للتمييز بين التراكب والخليط الإحصائي",
    "حساب القيم المتوقعة والأثر الجزئي",
  ],
  keywords: [
    "قياس",
    "مصفوفة كثافة",
    "نقاء",
    "أثر جزئي",
    "حالة مختلطة",
    "قيمة متوقعة",
    "measurement",
    "density matrix",
    "purity",
    "partial trace",
    "mixed state",
    "expectation",
  ],
  questions: [
    {
      id: "ms-1-projector",
      type: "multiple-choice",
      prompt:
        "قِس الحالة $|\\psi\\rangle = \\tfrac{3}{5}|0\\rangle + \\tfrac{4}{5}|1\\rangle$ في الأساس الحسابي وكانت النتيجة $1$. ما حالة الكيوبت مباشرة بعد القياس؟",
      math: "|\\psi'\\rangle = \\frac{P_1 |\\psi\\rangle}{\\sqrt{\\langle \\psi | P_1 | \\psi \\rangle}}, \\qquad P_1 = |1\\rangle\\langle 1|",
      hint: "طبّق مؤثر الإسقاط ثم أعد التطبيع.",
      points: 15,
      tags: ["إسقاط", "projector", "انهيار"],
      choices: [
        { id: "a", text: "$|1\\rangle$" },
        {
          id: "b",
          text: "$\\tfrac{4}{5}|1\\rangle$",
          rebuttal: "هذه الحالة قبل إعادة التطبيع، وطولها لا يساوي الواحد.",
        },
        {
          id: "c",
          text: "الحالة نفسها $|\\psi\\rangle$ دون تغيير",
          rebuttal: "القياس الإسقاطي يغيّر الحالة حتماً ما لم تكن أصلاً متجهاً ذاتياً للمقيس.",
        },
        {
          id: "d",
          text: "$\\tfrac{3}{5}|0\\rangle - \\tfrac{4}{5}|1\\rangle$",
          rebuttal: "القياس لا يقلب أطواراً؛ إنه يُسقِط الحالة على الفضاء الجزئي الموافق للنتيجة.",
        },
      ],
      correctId: "a",
      explanation:
        "القياس الإسقاطي يُسقِط الحالة على الفضاء الجزئي الموافق للنتيجة ثم يعيد تطبيعها. وبما أن هذا الفضاء أحادي البعد هنا، تنهار الحالة إلى $|1\\rangle$ تماماً، وأي قياس لاحق سيعطي $1$ بيقين.",
      steps: [
        {
          text: "نطبّق مؤثر الإسقاط:",
          math: "P_1 |\\psi\\rangle = |1\\rangle\\langle 1|\\psi\\rangle = \\tfrac{4}{5}|1\\rangle",
        },
        {
          text: "نحسب احتمال النتيجة:",
          math: "P(1) = \\langle \\psi | P_1 | \\psi \\rangle = \\left(\\tfrac{4}{5}\\right)^{2} = \\tfrac{16}{25}",
        },
        {
          text: "نقسم على جذر الاحتمال لإعادة التطبيع:",
          math: "|\\psi'\\rangle = \\frac{\\tfrac{4}{5}|1\\rangle}{\\tfrac{4}{5}} = |1\\rangle",
        },
      ],
    },
    {
      id: "ms-2-density-pure",
      type: "fill-blank",
      prompt:
        "اكتب عناصر مصفوفة الكثافة للحالة النقية $|+\\rangle$، أي $\\rho = |+\\rangle\\langle +|$.",
      math: "\\rho = |+\\rangle\\langle +| = \\begin{pmatrix} \\rho_{00} & \\rho_{01} \\\\ \\rho_{10} & \\rho_{11} \\end{pmatrix}",
      hint: "كل عنصر يساوي حاصل ضرب اتساع في مرافق اتساع، وكلاهما هنا $\\tfrac{1}{\\sqrt{2}}$.",
      points: 20,
      tags: ["مصفوفة كثافة", "density matrix", "تماسك"],
      blanks: [
        {
          id: "r00",
          label: "العنصر القطري الأول",
          labelMath: "\\rho_{00} =",
          answers: ["1/2", "0.5", ".5", "0.50"],
          display: "\\tfrac{1}{2}",
          placeholder: "1/2",
        },
        {
          id: "r01",
          label: "عنصر التماسك",
          labelMath: "\\rho_{01} =",
          answers: ["1/2", "0.5", ".5", "0.50"],
          display: "\\tfrac{1}{2}",
          placeholder: "1/2",
        },
        {
          id: "r11",
          label: "العنصر القطري الثاني",
          labelMath: "\\rho_{11} =",
          answers: ["1/2", "0.5", ".5", "0.50"],
          display: "\\tfrac{1}{2}",
          placeholder: "1/2",
        },
      ],
      explanation:
        "كل عناصر المصفوفة تساوي $\\tfrac{1}{2}$. العنصران القطريان يمثّلان الاحتمالات، أما العنصران خارج القطر فيُسمّيان حدَّي التماسك (coherence) وهما ما يميّز التراكب الحقيقي عن الخليط الإحصائي.",
      steps: [
        {
          text: "نكتب المتجه ومرافقه:",
          math: "|+\\rangle = \\tfrac{1}{\\sqrt{2}}\\begin{pmatrix} 1 \\\\ 1 \\end{pmatrix}, \\qquad \\langle +| = \\tfrac{1}{\\sqrt{2}}\\begin{pmatrix} 1 & 1 \\end{pmatrix}",
        },
        {
          text: "نُجري الضرب الخارجي:",
          math: "\\rho = \\tfrac{1}{2}\\begin{pmatrix} 1 & 1 \\\\ 1 & 1 \\end{pmatrix}",
        },
        {
          text: "نتحقق من الأثر والنقاء:",
          math: "\\mathrm{Tr}(\\rho) = 1, \\qquad \\mathrm{Tr}(\\rho^{2}) = 1",
        },
      ],
    },
    {
      id: "ms-3-purity",
      type: "multiple-choice",
      prompt: "ما القيمة التي يأخذها النقاء $\\mathrm{Tr}(\\rho^2)$ للحالة المختلطة القصوى لكيوبت واحد؟",
      math: "\\rho = \\frac{I}{2} = \\begin{pmatrix} \\tfrac{1}{2} & 0 \\\\ 0 & \\tfrac{1}{2} \\end{pmatrix}",
      hint: "احسب مربّع المصفوفة أولاً ثم خذ أثرها.",
      points: 15,
      tags: ["نقاء", "purity", "حالة مختلطة"],
      choices: [
        { id: "a", text: "$1$", rebuttal: "القيمة $1$ خاصة بالحالات النقية حصراً." },
        { id: "b", text: "$\\tfrac{1}{2}$" },
        { id: "c", text: "$0$", rebuttal: "النقاء لكيوبت لا ينزل تحت $\\tfrac{1}{2}$ إطلاقاً." },
        { id: "d", text: "$2$", rebuttal: "النقاء محصور دائماً في المجال $[\\tfrac{1}{d}, 1]$." },
      ],
      correctId: "b",
      explanation:
        "النقاء يقيس بُعد الحالة عن كونها نقية، ويقع لكيوبت في المجال $[\\tfrac{1}{2}, 1]$. القيمة $\\tfrac{1}{2}$ تعني اختلاطاً أقصى، وهي حالة تقع في مركز كرة بلوخ بمتجه بلوخ معدوم.",
      steps: [
        {
          text: "نحسب مربّع المصفوفة:",
          math: "\\rho^{2} = \\left(\\tfrac{I}{2}\\right)^{2} = \\tfrac{I}{4}",
        },
        { text: "نأخذ الأثر:", math: "\\mathrm{Tr}\\left(\\tfrac{I}{4}\\right) = \\tfrac{1}{4} + \\tfrac{1}{4} = \\tfrac{1}{2}" },
        {
          text: "نقارن بالحالة النقية:",
          math: "\\mathrm{Tr}(\\rho_{\\text{pure}}^{2}) = 1 > \\tfrac{1}{2}",
        },
      ],
    },
    {
      id: "ms-4-superposition-vs-mixture",
      type: "multiple-choice",
      prompt:
        "ما الفرق بين التراكب $|+\\rangle$ والخليط الإحصائي المتساوي بين $|0\\rangle$ و $|1\\rangle$؟ وكيف نميّزهما تجريبياً؟",
      math: "\\rho_{+} = \\tfrac{1}{2}\\begin{pmatrix} 1 & 1 \\\\ 1 & 1 \\end{pmatrix}, \\qquad \\rho_{\\text{mix}} = \\tfrac{1}{2}\\begin{pmatrix} 1 & 0 \\\\ 0 & 1 \\end{pmatrix}",
      hint: "القياس في الأساس الحسابي يعطي النتيجة نفسها؛ جرّب أساساً آخر.",
      points: 20,
      tags: ["تماسك", "coherence", "حالة مختلطة"],
      choices: [
        { id: "a", text: "يختلفان في حدود التماسك، ويُميَّزان بالقياس في أساس $X$" },
        {
          id: "b",
          text: "لا فرق بينهما إطلاقاً؛ كلاهما يعطي $50\\%$ لكل نتيجة",
          rebuttal:
            "التساوي يقتصر على الأساس الحسابي؛ أما في أساس $X$ فالتراكب يعطي نتيجة مؤكّدة والخليط يبقى عشوائياً.",
        },
        {
          id: "c",
          text: "الخليط أنقى من التراكب",
          rebuttal: "العكس هو الصحيح: نقاء التراكب يساوي $1$ ونقاء الخليط $\\tfrac{1}{2}$.",
        },
        {
          id: "d",
          text: "التراكب لا يمكن وصفه بمصفوفة كثافة",
          rebuttal: "كل حالة كمية توصف بمصفوفة كثافة، والحالة النقية تحقق $\\rho = |\\psi\\rangle\\langle\\psi|$.",
        },
      ],
      correctId: "a",
      explanation:
        "الفرق كله في العنصرين خارج القطر. القياس في الأساس الحسابي يخفي هذا الفرق تماماً، أما القياس في أساس $X$ فيكشفه: التراكب يعطي النتيجة $+$ بيقين، بينما يظل الخليط عشوائياً بنسبة النصف. وضياع هذه الحدود بفعل البيئة هو تعريف التفكك الكمي.",
      steps: [
        {
          text: "احتمالات القياس في الأساس الحسابي متطابقة:",
          math: "P(0) = P(1) = \\tfrac{1}{2}",
        },
        {
          text: "أما في أساس $X$ فالتراكب مؤكّد النتيجة:",
          math: "\\langle + | \\rho_{+} | + \\rangle = 1",
        },
        {
          text: "بينما يبقى الخليط عشوائياً:",
          math: "\\langle + | \\rho_{\\text{mix}} | + \\rangle = \\tfrac{1}{2}",
        },
      ],
    },
    {
      id: "ms-5-expectation",
      type: "fill-blank",
      prompt:
        "احسب القيمة المتوقعة $\\langle Z \\rangle$ للحالة $|\\psi\\rangle = \\tfrac{1}{2}|0\\rangle + \\tfrac{\\sqrt{3}}{2}|1\\rangle$، ثم القيمة المتوقعة $\\langle Z \\rangle$ للحالة $|+\\rangle$.",
      math: "\\langle Z \\rangle = \\langle \\psi | Z | \\psi \\rangle = P(0) - P(1)",
      hint: "القيمة المتوقعة للمقيس $Z$ هي فرق الاحتمالين.",
      points: 20,
      tags: ["قيمة متوقعة", "expectation value", "مقيس"],
      blanks: [
        {
          id: "z1",
          label: "القيمة المتوقعة الأولى",
          labelMath: "\\langle Z \\rangle_{\\psi} =",
          answers: ["-1/2", "-0.5", "-.5", "-0.50"],
          display: "-\\tfrac{1}{2}",
          placeholder: "-1/2",
        },
        {
          id: "z2",
          label: "القيمة المتوقعة الثانية",
          labelMath: "\\langle Z \\rangle_{+} =",
          answers: ["0", "zero", "صفر"],
          display: "0",
          placeholder: "0",
        },
      ],
      explanation:
        "القيمة المتوقعة للمقيس $Z$ هي فرق احتمالَي النتيجتين. في الحالة الأولى تميل الكفة إلى $|1\\rangle$ فتكون النتيجة سالبة، وفي الحالة $|+\\rangle$ يتساوى الاحتمالان فتنعدم القيمة المتوقعة تماماً — وهو ما يوافق أن متجه بلوخ يقع في المستوى الاستوائي.",
      steps: [
        {
          text: "نحسب الاحتمالين للحالة الأولى:",
          math: "P(0) = \\tfrac{1}{4}, \\qquad P(1) = \\tfrac{3}{4}",
        },
        {
          text: "نأخذ الفرق:",
          math: "\\langle Z \\rangle = \\tfrac{1}{4} - \\tfrac{3}{4} = -\\tfrac{1}{2}",
        },
        {
          text: "وللحالة $|+\\rangle$ يتساوى الاحتمالان:",
          math: "\\langle Z \\rangle_{+} = \\tfrac{1}{2} - \\tfrac{1}{2} = 0",
        },
      ],
    },
    {
      id: "ms-6-partial-trace",
      type: "multiple-choice",
      prompt:
        "ما مصفوفة الكثافة المختزلة للكيوبت الأول في حالة بيل $|\\Phi^{+}\\rangle$، أي ما ناتج الأثر الجزئي على الكيوبت الثاني؟",
      math: "\\rho_A = \\mathrm{Tr}_B\\big(|\\Phi^{+}\\rangle\\langle \\Phi^{+}|\\big)",
      hint: "احسب النقاء المتوقع لجزء من نظام متشابك تشابكاً تاماً.",
      points: 20,
      tags: ["أثر جزئي", "partial trace", "تشابك"],
      choices: [
        { id: "a", text: "$\\rho_A = \\tfrac{I}{2}$، أي حالة مختلطة قصوى" },
        {
          id: "b",
          text: "$\\rho_A = |+\\rangle\\langle +|$",
          rebuttal: "لو كانت النتيجة حالة نقية لكان النظام قابلاً للفصل، وهذا يناقض التشابك.",
        },
        {
          id: "c",
          text: "$\\rho_A = |0\\rangle\\langle 0|$",
          rebuttal: "هذا يعني أن الكيوبت الأول محدَّد سلفاً، بينما احتمالا نتيجتيه متساويان.",
        },
        {
          id: "d",
          text: "$\\rho_A = |\\Phi^{+}\\rangle\\langle \\Phi^{+}|$",
          rebuttal: "الأثر الجزئي يُنقص بُعد الفضاء من أربعة إلى اثنين، فلا يمكن أن يبقى الناتج في فضاء كيوبتين.",
        },
      ],
      correctId: "a",
      explanation:
        "هذه هي بصمة التشابك التام: النظام الكلي في حالة نقية، لكن كل جزء منه بمفرده مختلط اختلاطاً أقصى. المعلومة ليست في الأجزاء بل في الارتباط بينها.",
      steps: [
        {
          text: "نكتب مصفوفة الكثافة الكلية:",
          math: "\\rho = \\tfrac{1}{2}\\big(|00\\rangle\\langle 00| + |00\\rangle\\langle 11| + |11\\rangle\\langle 00| + |11\\rangle\\langle 11|\\big)",
        },
        {
          text: "نأخذ الأثر على الكيوبت الثاني فتختفي الحدود المتقاطعة:",
          math: "\\mathrm{Tr}_B\\big(|00\\rangle\\langle 11|\\big) = |0\\rangle\\langle 1| \\cdot \\langle 1|0\\rangle = 0",
        },
        {
          text: "يبقى الحدّان القطريان:",
          math: "\\rho_A = \\tfrac{1}{2}|0\\rangle\\langle 0| + \\tfrac{1}{2}|1\\rangle\\langle 1| = \\tfrac{I}{2}",
        },
      ],
    },
    {
      id: "ms-7-density-conditions",
      type: "multiple-choice",
      prompt: "أيٌّ من الشروط التالية ليس شرطاً لازماً لمصفوفة كثافة صالحة؟",
      hint: "استعرض شروط الأثر والهيرميتية والموجبية، ثم ابحث عن الشرط الزائد.",
      points: 15,
      tags: ["شروط", "density matrix", "موجبية"],
      choices: [
        { id: "a", text: "أن تكون قابلة للعكس، أي $\\det(\\rho) \\neq 0$" },
        {
          id: "b",
          text: "أن يكون أثرها مساوياً للواحد $\\mathrm{Tr}(\\rho) = 1$",
          rebuttal: "هذا شرط لازم فعلاً لأنه يضمن أن مجموع الاحتمالات يساوي واحداً.",
        },
        {
          id: "c",
          text: "أن تكون هيرميتية $\\rho = \\rho^{\\dagger}$",
          rebuttal: "شرط لازم أيضاً لأنه يضمن أن تكون القيم الذاتية حقيقية.",
        },
        {
          id: "d",
          text: "أن تكون شبه معرَّفة موجبة $\\rho \\succeq 0$",
          rebuttal: "شرط لازم كذلك لأنه يمنع ظهور احتمالات سالبة.",
        },
      ],
      correctId: "a",
      explanation:
        "قابلية العكس ليست شرطاً؛ بل إن كل حالة نقية لها محدّد معدوم لأن إحدى قيمها الذاتية تساوي صفراً. الشروط الثلاثة اللازمة هي: الهيرميتية، والأثر الواحدي، والموجبية.",
      steps: [
        {
          text: "مثال مضاد مباشر لحالة نقية:",
          math: "\\rho = |0\\rangle\\langle 0| = \\begin{pmatrix} 1 & 0 \\\\ 0 & 0 \\end{pmatrix}",
        },
        { text: "نحسب محدّدها:", math: "\\det(\\rho) = 0" },
        {
          text: "ومع ذلك تحقّق كل الشروط اللازمة:",
          math: "\\mathrm{Tr}(\\rho) = 1, \\qquad \\rho = \\rho^{\\dagger}, \\qquad \\lambda_i \\in \\{0, 1\\} \\geq 0",
        },
      ],
    },
    {
      id: "ms-8-bloch-vector",
      type: "fill-blank",
      prompt:
        "طول متجه بلوخ $|\\vec{r}|$ يميّز الحالات. ما قيمته لحالة نقية؟ وما قيمته للحالة المختلطة القصوى $\\rho = I/2$؟",
      math: "\\rho = \\frac{1}{2}\\big(I + \\vec{r} \\cdot \\vec{\\sigma}\\big), \\qquad \\mathrm{Tr}(\\rho^{2}) = \\frac{1 + |\\vec{r}|^{2}}{2}",
      hint: "استعمل العلاقة بين النقاء وطول المتجه.",
      points: 20,
      tags: ["متجه بلوخ", "bloch vector", "نقاء"],
      blanks: [
        {
          id: "pure",
          label: "الطول لحالة نقية",
          labelMath: "|\\vec{r}|_{\\text{pure}} =",
          answers: ["1", "واحد"],
          display: "1",
          placeholder: "1",
        },
        {
          id: "mixed",
          label: "الطول للحالة المختلطة القصوى",
          labelMath: "|\\vec{r}|_{\\text{mixed}} =",
          answers: ["0", "صفر", "zero"],
          display: "0",
          placeholder: "0",
        },
      ],
      explanation:
        "الحالات النقية تقع على سطح كرة بلوخ حيث $|\\vec{r}| = 1$، والحالة المختلطة القصوى تقع في المركز حيث $|\\vec{r}| = 0$. أما الحالات المختلطة جزئياً فتملأ داخل الكرة، ولذلك يُقال إن مجموعة الحالات هي الكرة المصمتة لا سطحها وحده.",
      steps: [
        {
          text: "نبدأ من علاقة النقاء بطول المتجه:",
          math: "\\mathrm{Tr}(\\rho^{2}) = \\frac{1 + |\\vec{r}|^{2}}{2}",
        },
        {
          text: "للحالة النقية النقاء يساوي واحداً:",
          math: "1 = \\frac{1 + |\\vec{r}|^{2}}{2} \\;\\Longrightarrow\\; |\\vec{r}| = 1",
        },
        {
          text: "وللحالة المختلطة القصوى النقاء يساوي نصفاً:",
          math: "\\tfrac{1}{2} = \\frac{1 + |\\vec{r}|^{2}}{2} \\;\\Longrightarrow\\; |\\vec{r}| = 0",
        },
      ],
    },
    {
      id: "ms-9-measurement-basis",
      type: "multiple-choice",
      prompt:
        "كيف نقيس كيوبتاً في أساس $X$ على جهاز لا يدعم إلا القياس في الأساس الحسابي؟",
      hint: "استعمل بوابة تُحوّل أساس $X$ إلى الأساس الحسابي قبل القياس.",
      points: 15,
      tags: ["تغيير أساس", "basis change", "قياس"],
      choices: [
        { id: "a", text: "نطبّق بوابة $H$ قبل القياس مباشرة" },
        {
          id: "b",
          text: "نطبّق بوابة $X$ قبل القياس",
          rebuttal: "بوابة $X$ تقلب البت داخل الأساس نفسه ولا تغيّر أساس القياس.",
        },
        {
          id: "c",
          text: "نطبّق بوابة $Z$ بعد القياس",
          rebuttal: "أي بوابة تُطبَّق بعد القياس لا تؤثر في النتيجة المسجَّلة أصلاً.",
        },
        {
          id: "d",
          text: "لا يمكن ذلك مطلقاً",
          rebuttal: "تغيير الأساس قبل القياس أسلوب قياسي مستعمل في كل معالج كمي تقريباً.",
        },
      ],
      correctId: "a",
      explanation:
        "بوابة هادامارد تحوّل $|+\\rangle \\to |0\\rangle$ و $|-\\rangle \\to |1\\rangle$، فيصبح القياس الحسابي مكافئاً تماماً للقياس في أساس $X$. وبالمثل نستعمل $S^{\\dagger}$ ثم $H$ للقياس في أساس $Y$.",
      steps: [
        {
          text: "أثر البوابة على متجهات أساس $X$:",
          math: "H|+\\rangle = |0\\rangle, \\qquad H|-\\rangle = |1\\rangle",
        },
        {
          text: "فيصير الاحتمال المقيس هو المطلوب نفسه:",
          math: "|\\langle 0 | H | \\psi \\rangle|^{2} = |\\langle + | \\psi \\rangle|^{2}",
        },
        {
          text: "وللقياس في أساس $Y$ نستعمل التركيب:",
          math: "Y\\text{-basis} \\;\\equiv\\; S^{\\dagger} \\to H \\to Z\\text{-measure}",
        },
      ],
    },
    {
      id: "ms-10-repeated-measurement",
      type: "multiple-choice",
      prompt:
        "قِس كيوبتاً في الحالة $|+\\rangle$ في الأساس الحسابي فحصلت على النتيجة $0$. ثم أعِد القياس فوراً في الأساس نفسه. ما احتمال الحصول على $0$ مرة أخرى؟",
      hint: "ما حالة الكيوبت بعد القياس الأول؟",
      points: 15,
      tags: ["قياس متكرر", "projective measurement", "انهيار"],
      choices: [
        { id: "a", text: "$100\\%$" },
        {
          id: "b",
          text: "$50\\%$",
          rebuttal: "هذا احتمال القياس الأول فقط؛ فبعد الانهيار لم تعد الحالة تراكباً.",
        },
        { id: "c", text: "$25\\%$", rebuttal: "لا يوجد أي مبرر لضرب الاحتمالين هنا لأن القياس الثاني ليس مستقلاً." },
        {
          id: "d",
          text: "$0\\%$",
          rebuttal: "القياس لا يقلب الحالة إلى النتيجة المعاكسة؛ بل يُثبّتها على النتيجة المرصودة.",
        },
      ],
      correctId: "a",
      explanation:
        "القياس الإسقاطي مُتَمَاثِل القوة (idempotent): بعد أن انهارت الحالة إلى $|0\\rangle$ صارت متجهاً ذاتياً للمقيس، فيعطي القياس المتكرر النتيجة نفسها بيقين. وهذا الاتساق شرط ضروري لأن يكون القياس ذا معنى فيزيائي.",
      steps: [
        {
          text: "الحالة بعد القياس الأول:",
          math: "|+\\rangle \\;\\xrightarrow{\\; m = 0 \\;}\\; |0\\rangle",
        },
        {
          text: "احتمال القياس الثاني بقاعدة بورن:",
          math: "P(0) = |\\langle 0 | 0 \\rangle|^{2} = 1",
        },
        {
          text: "وهو ما يعبّر عنه تماثل قوة مؤثر الإسقاط:",
          math: "P_0^{2} = P_0",
        },
      ],
    },
  ],
};
