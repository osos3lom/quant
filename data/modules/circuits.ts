/**
 * data/modules/circuits.ts
 * الوحدة 3: الدوائر الكمية والتشابك — Quantum Circuits & Entanglement.
 */
import type { Exercise } from "@/types/quantum";

export const circuitsExercise: Exercise = {
  slug: "circuits-entanglement",
  titleAr: "الدوائر الكمية والتشابك",
  titleEn: "Quantum Circuits & Entanglement",
  summary:
    "من الضرب التنسوري إلى حالات بيل و GHZ: كيف تُبنى الدوائر متعددة الكيوبتات، وكيف نميّز الحالة المتشابكة من الحالة القابلة للفصل.",
  category: "circuits",
  difficulty: "intermediate",
  estimatedMinutes: 22,
  objectives: [
    "حساب الضرب التنسوري لحالتين وبناء فضاء متعدد الكيوبتات",
    "توليد حالات بيل الأربع وتمييزها",
    "التفريق بين الحالة القابلة للفصل والحالة المتشابكة",
    "إثبات تكافؤ دوائر كمية مختلفة الشكل",
  ],
  keywords: [
    "تشابك",
    "بيل",
    "جي إتش زد",
    "ضرب تنسوري",
    "دائرة",
    "قابل للفصل",
    "entanglement",
    "bell state",
    "ghz",
    "tensor product",
    "circuit",
    "separable",
  ],
  questions: [
    {
      id: "ci-1-tensor",
      type: "multiple-choice",
      prompt: "ما ناتج الضرب التنسوري $|0\\rangle \\otimes |+\\rangle$؟",
      math: "|0\\rangle \\otimes |+\\rangle = |0\\rangle \\otimes \\frac{|0\\rangle + |1\\rangle}{\\sqrt{2}}",
      hint: "وزّع الضرب التنسوري على حدَّي التراكب.",
      points: 10,
      tags: ["ضرب تنسوري", "tensor product"],
      choices: [
        { id: "a", text: "$\\tfrac{1}{\\sqrt{2}}\\big(|00\\rangle + |01\\rangle\\big)$" },
        {
          id: "b",
          text: "$\\tfrac{1}{\\sqrt{2}}\\big(|00\\rangle + |11\\rangle\\big)$",
          rebuttal: "هذه حالة بيل $|\\Phi^{+}\\rangle$ وهي متشابكة ولا يمكن كتابتها كضرب تنسوري.",
        },
        {
          id: "c",
          text: "$\\tfrac{1}{\\sqrt{2}}\\big(|00\\rangle + |10\\rangle\\big)$",
          rebuttal: "هذا ناتج $|+\\rangle \\otimes |0\\rangle$ أي بترتيب معكوس للكيوبتين.",
        },
        { id: "d", text: "$|01\\rangle$", rebuttal: "أُهمل هنا الحد الأول من التراكب كلياً." },
      ],
      correctId: "a",
      explanation:
        "الضرب التنسوري خطي في كل مُعامل، فيوزَّع على حدَّي التراكب مع بقاء الكيوبت الأول $|0\\rangle$ في موضعه. الناتج حالة قابلة للفصل وليست متشابكة.",
      steps: [
        {
          text: "نوزّع الضرب التنسوري:",
          math: "|0\\rangle \\otimes \\tfrac{1}{\\sqrt{2}}\\big(|0\\rangle + |1\\rangle\\big) = \\tfrac{1}{\\sqrt{2}}\\big(|0\\rangle\\otimes|0\\rangle + |0\\rangle\\otimes|1\\rangle\\big)",
        },
        {
          text: "نختصر الترميز:",
          math: "= \\tfrac{1}{\\sqrt{2}}\\big(|00\\rangle + |01\\rangle\\big)",
        },
        {
          text: "وبصيغة المتجهات:",
          math: "\\tfrac{1}{\\sqrt{2}}\\begin{pmatrix} 1 & 1 & 0 & 0 \\end{pmatrix}^{T}",
        },
      ],
    },
    {
      id: "ci-2-bell-circuit",
      type: "multiple-choice",
      prompt:
        "دائرة تبدأ بالحالة $|00\\rangle$، ثم تُطبَّق بوابة $H$ على الكيوبت الأول، ثم بوابة $\\text{CNOT}$ بتحكّم من الأول إلى الثاني. ما الحالة النهائية؟",
      math: "|00\\rangle \\xrightarrow{H \\otimes I} \\;?\\; \\xrightarrow{\\text{CNOT}} \\;?",
      hint: "طبّق البوابتين بالترتيب وتذكّر أن $\\text{CNOT}$ خطية على حدود التراكب.",
      points: 15,
      tags: ["حالة بيل", "bell state", "دائرة"],
      choices: [
        { id: "a", text: "$|\\Phi^{+}\\rangle = \\tfrac{1}{\\sqrt{2}}\\big(|00\\rangle + |11\\rangle\\big)$" },
        {
          id: "b",
          text: "$|\\Psi^{+}\\rangle = \\tfrac{1}{\\sqrt{2}}\\big(|01\\rangle + |10\\rangle\\big)$",
          rebuttal: "هذه الحالة تنتج إذا بدأنا من $|01\\rangle$ بدل $|00\\rangle$.",
        },
        {
          id: "c",
          text: "$\\tfrac{1}{\\sqrt{2}}\\big(|00\\rangle + |01\\rangle\\big)$",
          rebuttal: "هذه الحالة بعد بوابة هادامارد وحدها؛ لم تُطبَّق بوابة $\\text{CNOT}$ بعد.",
        },
        {
          id: "d",
          text: "$|11\\rangle$",
          rebuttal: "بوابة $\\text{CNOT}$ لا تُلغي التراكب الذي أنشأته هادامارد.",
        },
      ],
      correctId: "a",
      explanation:
        "هذه الدائرة المؤلفة من بوابتين هي المولّد القياسي لحالات بيل. النتيجة حالة متشابكة تماماً: قياس أي كيوبت يحدّد فوراً نتيجة الآخر رغم أن كل نتيجة منفردة عشوائية بالكامل.",
      steps: [
        {
          text: "أثر بوابة هادامارد على الكيوبت الأول:",
          math: "(H \\otimes I)|00\\rangle = \\tfrac{1}{\\sqrt{2}}\\big(|00\\rangle + |10\\rangle\\big)",
        },
        {
          text: "نطبّق $\\text{CNOT}$ على كل حد:",
          math: "\\text{CNOT}|00\\rangle = |00\\rangle, \\qquad \\text{CNOT}|10\\rangle = |11\\rangle",
        },
        {
          text: "الحالة النهائية:",
          math: "\\tfrac{1}{\\sqrt{2}}\\big(|00\\rangle + |11\\rangle\\big) = |\\Phi^{+}\\rangle",
        },
      ],
    },
    {
      id: "ci-3-separable-test",
      type: "multiple-choice",
      prompt: "أيٌّ من الحالات التالية قابلة للفصل، أي غير متشابكة؟",
      hint: "حاول كتابة كل حالة على صورة $(a|0\\rangle + b|1\\rangle)\\otimes(c|0\\rangle + d|1\\rangle)$.",
      points: 15,
      tags: ["قابل للفصل", "separable", "تشابك"],
      choices: [
        { id: "a", text: "$\\tfrac{1}{2}\\big(|00\\rangle + |01\\rangle + |10\\rangle + |11\\rangle\\big)$" },
        {
          id: "b",
          text: "$\\tfrac{1}{\\sqrt{2}}\\big(|00\\rangle + |11\\rangle\\big)$",
          rebuttal: "هذه حالة بيل $|\\Phi^{+}\\rangle$ وهي متشابكة تماماً.",
        },
        {
          id: "c",
          text: "$\\tfrac{1}{\\sqrt{2}}\\big(|01\\rangle - |10\\rangle\\big)$",
          rebuttal: "هذه الحالة المفردة $|\\Psi^{-}\\rangle$ وهي أشهر مثال على التشابك التام.",
        },
        {
          id: "d",
          text: "$\\tfrac{1}{\\sqrt{3}}\\big(|00\\rangle + |01\\rangle + |11\\rangle\\big)$",
          rebuttal: "شرط الفصل $a_{00}a_{11} = a_{01}a_{10}$ غير محقق هنا لأن الطرف الأيمن يساوي صفراً.",
        },
      ],
      correctId: "a",
      explanation:
        "الحالة الأولى تُكتب ببساطة $|+\\rangle \\otimes |+\\rangle$ فهي قابلة للفصل. والمعيار العملي لحالة كيوبتين هو الشرط $a_{00}a_{11} = a_{01}a_{10}$: إذا تحقّق فالحالة قابلة للفصل، وإلا فهي متشابكة.",
      steps: [
        {
          text: "نُخرج العامل المشترك من الحالة الأولى:",
          math: "\\tfrac{1}{2}\\big(|00\\rangle + |01\\rangle + |10\\rangle + |11\\rangle\\big) = \\tfrac{1}{\\sqrt{2}}(|0\\rangle+|1\\rangle) \\otimes \\tfrac{1}{\\sqrt{2}}(|0\\rangle+|1\\rangle)",
        },
        {
          text: "نطبّق معيار الفصل على معاملاتها:",
          math: "a_{00}a_{11} = \\tfrac{1}{2}\\cdot\\tfrac{1}{2} = a_{01}a_{10} = \\tfrac{1}{2}\\cdot\\tfrac{1}{2} \\;\\checkmark",
        },
        {
          text: "بينما في حالة بيل يفشل الشرط:",
          math: "a_{00}a_{11} = \\tfrac{1}{2} \\neq a_{01}a_{10} = 0",
        },
      ],
    },
    {
      id: "ci-4-ghz",
      type: "fill-blank",
      prompt:
        "حالة GHZ لثلاثة كيوبتات هي $\\tfrac{1}{\\sqrt{2}}(|000\\rangle + |111\\rangle)$. ما احتمال الحصول على النتيجة $000$ عند قياس الكيوبتات الثلاثة؟ وكم عدد الحالات الأساسية التي احتمالها غير صفري؟",
      math: "|\\text{GHZ}\\rangle = \\frac{1}{\\sqrt{2}}\\big(|000\\rangle + |111\\rangle\\big)",
      hint: "الفضاء يحوي $2^3 = 8$ حالة أساسية لكن معظم اتساعاتها أصفار.",
      points: 15,
      tags: ["ghz", "قياس", "تشابك متعدد"],
      blanks: [
        {
          id: "p000",
          label: "احتمال النتيجة",
          labelMath: "P(000) =",
          answers: ["1/2", "0.5", ".5", "50%", "0.50"],
          display: "\\tfrac{1}{2}",
          placeholder: "1/2",
        },
        {
          id: "count",
          label: "عدد النتائج الممكنة",
          labelMath: "N_{\\neq 0} =",
          answers: ["2", "اثنان", "اثنين"],
          display: "2",
          placeholder: "2",
        },
      ],
      explanation:
        "الاتساعان الوحيدان غير الصفريين هما اتساعا $|000\\rangle$ و $|111\\rangle$، وكلٌّ منهما يعطي احتمالاً قدره $\\tfrac{1}{2}$. لذا لا نحصل أبداً على نتيجة مثل $010$ رغم أن الفضاء يتّسع لثماني حالات.",
      steps: [
        {
          text: "نطبّق قاعدة بورن على الحد الأول:",
          math: "P(000) = \\left|\\tfrac{1}{\\sqrt{2}}\\right|^{2} = \\tfrac{1}{2}",
        },
        {
          text: "وبالمثل للحد الثاني:",
          math: "P(111) = \\tfrac{1}{2}, \\qquad P(000) + P(111) = 1",
        },
        {
          text: "أما بقية الحالات الست فاحتمالها معدوم:",
          math: "P(001) = P(010) = \\dots = 0",
        },
      ],
    },
    {
      id: "ci-5-hilbert-dim",
      type: "multiple-choice",
      prompt:
        "ما بُعد فضاء هيلبرت لنظام مؤلف من $n$ كيوبتاً؟ وكم عدد المعاملات العقدية اللازمة لوصف حالة نظام من $50$ كيوبتاً؟",
      math: "\\dim \\mathcal{H}_{n} = \\;?",
      hint: "كل كيوبت إضافي يضاعف عدد الحالات الأساسية.",
      points: 10,
      tags: ["فضاء هيلبرت", "hilbert space", "تعقيد"],
      choices: [
        { id: "a", text: "$2^{n}$، أي نحو $10^{15}$ معامل لخمسين كيوبتاً" },
        { id: "b", text: "$2n$، أي $100$ معامل", rebuttal: "النمو أسّي لا خطي؛ الخطية هي سمة الأنظمة الكلاسيكية." },
        { id: "c", text: "$n^{2}$، أي $2500$ معامل", rebuttal: "النمو التربيعي لا يصف تركيب الفضاء التنسوري." },
        { id: "d", text: "$n!$", rebuttal: "لا يوجد أي مبرر توافيقي لهذه الصيغة في تركيب فضاء الحالات." },
      ],
      correctId: "a",
      explanation:
        "يتركّب فضاء النظام تنسورياً فيصبح بُعده $2^n$. ومع $50$ كيوبتاً نحتاج نحو $1.1 \\times 10^{15}$ معامل عقدي، وهو السبب الجوهري لصعوبة محاكاة الأنظمة الكمية كلاسيكياً.",
      steps: [
        {
          text: "بُعد الفضاء لكيوبت واحد ثم للتركيب التنسوري:",
          math: "\\dim(\\mathcal{H}_1) = 2, \\qquad \\dim(\\mathcal{H}_A \\otimes \\mathcal{H}_B) = \\dim(\\mathcal{H}_A)\\cdot\\dim(\\mathcal{H}_B)",
        },
        { text: "بالتكرار على $n$ كيوبتاً:", math: "\\dim \\mathcal{H}_{n} = 2^{n}" },
        {
          text: "نعوّض بالعدد المطلوب:",
          math: "2^{50} \\approx 1.13 \\times 10^{15}",
        },
      ],
    },
    {
      id: "ci-6-cnot-on-plus",
      type: "multiple-choice",
      prompt:
        "ما ناتج تطبيق بوابة $\\text{CNOT}$ على الحالة $|+\\rangle \\otimes |0\\rangle$ مع كون الكيوبت الأول متحكّماً؟",
      math: "\\text{CNOT}\\big(|+\\rangle \\otimes |0\\rangle\\big) = \\;?",
      hint: "اكتب $|+\\rangle$ كتراكب ثم طبّق البوابة على كل حد.",
      points: 15,
      tags: ["cnot", "تشابك", "خطية"],
      choices: [
        { id: "a", text: "$\\tfrac{1}{\\sqrt{2}}\\big(|00\\rangle + |11\\rangle\\big)$، وهي حالة متشابكة" },
        {
          id: "b",
          text: "$|+\\rangle \\otimes |0\\rangle$ دون تغيير",
          rebuttal: "الحد الذي يحمل تحكّماً بقيمة $1$ يتغيّر فعلاً، لذا تتبدّل الحالة الكلية.",
        },
        {
          id: "c",
          text: "$|+\\rangle \\otimes |+\\rangle$",
          rebuttal: "بوابة $\\text{CNOT}$ لا تنشئ تراكباً في كيوبت الهدف بمعزل عن التحكم.",
        },
        {
          id: "d",
          text: "$\\tfrac{1}{\\sqrt{2}}\\big(|01\\rangle + |10\\rangle\\big)$",
          rebuttal: "هذه الحالة تنتج لو كان الهدف يبدأ من $|1\\rangle$ بدل $|0\\rangle$.",
        },
      ],
      correctId: "a",
      explanation:
        "بفضل خطية البوابة يبقى الحد $|00\\rangle$ كما هو بينما يتحوّل $|10\\rangle$ إلى $|11\\rangle$، فتنشأ حالة بيل. هذا يوضّح أن التشابك يولد من تطبيق بوابة تحكّم على تراكب.",
      steps: [
        {
          text: "نفكّ التراكب في الكيوبت المتحكّم:",
          math: "|+\\rangle \\otimes |0\\rangle = \\tfrac{1}{\\sqrt{2}}\\big(|00\\rangle + |10\\rangle\\big)",
        },
        {
          text: "نطبّق البوابة على كل حد بمفرده:",
          math: "\\text{CNOT}|00\\rangle = |00\\rangle, \\qquad \\text{CNOT}|10\\rangle = |11\\rangle",
        },
        {
          text: "النتيجة حالة بيل غير قابلة للفصل:",
          math: "\\tfrac{1}{\\sqrt{2}}\\big(|00\\rangle + |11\\rangle\\big) = |\\Phi^{+}\\rangle",
        },
      ],
    },
    {
      id: "ci-7-bell-basis",
      type: "multiple-choice",
      prompt: "كم عدد حالات بيل التي تشكّل أساساً كاملاً لفضاء كيوبتين؟ وما خاصيتها المشتركة؟",
      math: "|\\Phi^{\\pm}\\rangle = \\frac{|00\\rangle \\pm |11\\rangle}{\\sqrt{2}}, \\qquad |\\Psi^{\\pm}\\rangle = \\frac{|01\\rangle \\pm |10\\rangle}{\\sqrt{2}}",
      hint: "بُعد فضاء كيوبتين يساوي أربعة.",
      points: 10,
      tags: ["أساس بيل", "bell basis", "تشابك"],
      choices: [
        { id: "a", text: "أربع حالات، وجميعها متشابكة تشابكاً تاماً ومتعامدة فيما بينها" },
        {
          id: "b",
          text: "حالتان فقط، وكلاهما قابل للفصل",
          rebuttal: "حالات بيل أربع، ولا واحدة منها قابلة للفصل.",
        },
        {
          id: "c",
          text: "ثلاث حالات متماثلة وحالة واحدة مضادة التماثل",
          rebuttal:
            "صحيح أن $|\\Psi^{-}\\rangle$ مضادة للتماثل والثلاث الأخرى متماثلة، لكن السؤال عن عدد عناصر الأساس وخاصيتها المشتركة.",
        },
        {
          id: "d",
          text: "ثماني حالات بعدد نتائج القياس",
          rebuttal: "بُعد فضاء كيوبتين هو $2^2 = 4$ لا ثمانية.",
        },
      ],
      correctId: "a",
      explanation:
        "حالات بيل الأربع متعامدة ومُطبَّعة وتشكّل أساساً كاملاً لفضاء كيوبتين، وكل واحدة منها متشابكة تشابكاً تاماً. والقياس في هذا الأساس هو حجر الزاوية في النقل الآني والترميز الكثيف.",
      steps: [
        { text: "بُعد الفضاء يحدّد عدد عناصر الأساس:", math: "\\dim(\\mathcal{H}_2) = 2^{2} = 4" },
        {
          text: "نتحقق من التعامد بين حالتين منها:",
          math: "\\langle \\Phi^{+} | \\Phi^{-} \\rangle = \\tfrac{1}{2}(1 - 1) = 0",
        },
        {
          text: "وكل حالة منها تُولَّد من الأساس الحسابي بالدائرة نفسها:",
          math: "|\\beta_{xy}\\rangle = (\\text{CNOT})(H \\otimes I)|xy\\rangle",
        },
      ],
    },
    {
      id: "ci-8-reversed-cnot",
      type: "multiple-choice",
      prompt:
        "إذا أحطنا بوابة $\\text{CNOT}$ ببوابات هادامارد على الكيوبتين معاً قبلها وبعدها، فماذا نحصل؟",
      math: "(H \\otimes H)\\,\\text{CNOT}_{1 \\to 2}\\,(H \\otimes H) = \\;?",
      hint: "بوابة هادامارد تُبدّل بين المحورين $X$ و $Z$، فما أثر ذلك على اتجاه التحكم؟",
      points: 20,
      tags: ["تكافؤ الدوائر", "circuit identity", "cnot"],
      choices: [
        { id: "a", text: "بوابة $\\text{CNOT}$ نفسها لكن باتجاه تحكّم معكوس" },
        { id: "b", text: "بوابة $\\text{SWAP}$", rebuttal: "بوابة التبديل تحتاج ثلاث بوابات تحكّم لا واحدة." },
        {
          id: "c",
          text: "بوابة الهوية على الكيوبتين",
          rebuttal: "بوابات هادامارد تُلغي بعضها فقط إن لم تكن بينها بوابة تشابك.",
        },
        {
          id: "d",
          text: "بوابة $\\text{CZ}$",
          rebuttal: "بوابة $\\text{CZ}$ تنتج من تطبيق هادامارد على كيوبت الهدف وحده لا على الكيوبتين.",
        },
      ],
      correctId: "a",
      explanation:
        "الإحاطة ببوابات هادامارد تبدّل دور التحكم والهدف، فتصبح البوابة $\\text{CNOT}_{2 \\to 1}$. هذه المتطابقة عملية جداً حين لا تسمح بنية العتاد إلا باتجاه واحد للتحكم بين كيوبتين.",
      steps: [
        {
          text: "نكتب البوابة بدلالة المسقطات:",
          math: "\\text{CNOT}_{1\\to 2} = |0\\rangle\\langle 0| \\otimes I + |1\\rangle\\langle 1| \\otimes X",
        },
        {
          text: "نستعمل تحويل هادامارد للمؤثرات:",
          math: "HXH = Z, \\qquad H|0\\rangle\\langle 0|H = |+\\rangle\\langle +|",
        },
        {
          text: "فينتج التعبير المكافئ للاتجاه المعكوس:",
          math: "(H\\otimes H)\\,\\text{CNOT}_{1\\to 2}\\,(H\\otimes H) = \\text{CNOT}_{2 \\to 1}",
        },
      ],
    },
    {
      id: "ci-9-partial-measure",
      type: "fill-blank",
      prompt:
        "في الحالة $|\\Phi^{+}\\rangle = \\tfrac{1}{\\sqrt{2}}(|00\\rangle + |11\\rangle)$ قِس الكيوبت الأول فقط وكانت النتيجة $0$. ما احتمال هذه النتيجة؟ وما الحالة التي يؤول إليها الكيوبت الثاني؟",
      math: "|\\Phi^{+}\\rangle = \\frac{1}{\\sqrt{2}}\\big(|00\\rangle + |11\\rangle\\big)",
      hint: "اجمع احتمالات كل الحدود التي يبدأ فيها الكيوبت الأول بالقيمة $0$، ثم أعد تطبيع ما تبقّى.",
      points: 20,
      tags: ["قياس جزئي", "انهيار", "collapse"],
      blanks: [
        {
          id: "prob",
          label: "احتمال النتيجة",
          labelMath: "P(0) =",
          answers: ["1/2", "0.5", ".5", "50%", "0.50"],
          display: "\\tfrac{1}{2}",
          placeholder: "1/2",
        },
        {
          id: "state",
          label: "حالة الكيوبت الثاني بعد القياس",
          labelMath: "|\\psi_{2}\\rangle =",
          answers: ["|0>", "|0⟩", "0", "ket0", "|0\\rangle"],
          display: "|0\\rangle",
          placeholder: "|0>",
        },
      ],
      explanation:
        "الحد الوحيد المتوافق مع النتيجة $0$ هو $|00\\rangle$ واحتماله $\\tfrac{1}{2}$، وبعد إعادة التطبيع تنهار الحالة الكلية إلى $|00\\rangle$ فيكون الكيوبت الثاني في $|0\\rangle$ بشكل مؤكّد رغم عدم قياسه.",
      steps: [
        {
          text: "نطبّق مؤثر الإسقاط على الكيوبت الأول:",
          math: "P(0) = \\big\\| (|0\\rangle\\langle 0| \\otimes I)|\\Phi^{+}\\rangle \\big\\|^{2} = \\tfrac{1}{2}",
        },
        {
          text: "الحالة بعد القياس تُعاد تطبيعها:",
          math: "\\frac{(|0\\rangle\\langle 0| \\otimes I)|\\Phi^{+}\\rangle}{\\sqrt{P(0)}} = |00\\rangle",
        },
        {
          text: "إذن الكيوبت الثاني محدَّد تماماً:",
          math: "|\\psi_{2}\\rangle = |0\\rangle",
        },
      ],
    },
    {
      id: "ci-10-no-signaling",
      type: "multiple-choice",
      prompt:
        "تحمل سارة كيوبتاً وأحمد الكيوبت الآخر من زوج متشابك، ويفصل بينهما مسافة شاسعة. هل يمكن لسارة أن ترسل رسالة فورية إلى أحمد بمجرد قياس كيوبتها؟",
      hint: "فكّر في الشيء الذي يرصده أحمد فعلياً في إحصائياته المحلية قبل أن يتلقّى أي خبر من سارة.",
      points: 15,
      tags: ["لا إشارة", "no-signaling", "تشابك"],
      choices: [
        { id: "a", text: "لا؛ إحصائيات أحمد المحلية تبقى عشوائية تماماً ولا تتغيّر مهما فعلت سارة" },
        {
          id: "b",
          text: "نعم؛ فالانهيار فوري وينقل المعلومة أسرع من الضوء",
          rebuttal:
            "الانهيار لا يحمل معلومة قابلة للرصد محلياً؛ مصفوفة أحمد المختزلة تبقى $I/2$ في كل الأحوال.",
        },
        {
          id: "c",
          text: "نعم، لكن بشرط أن يقيس أحمد في الأساس نفسه",
          rebuttal:
            "الارتباط يظهر فقط بعد مقارنة النتائج عبر قناة كلاسيكية، وهي قناة محكومة بسرعة الضوء.",
        },
        {
          id: "d",
          text: "نعم إذا استُعملت حالة GHZ بدل حالة بيل",
          rebuttal: "مبرهنة انعدام الإشارة تنطبق على أي حالة متشابكة مهما بلغ عدد أطرافها.",
        },
      ],
      correctId: "a",
      explanation:
        "هذه هي مبرهنة انعدام الإشارة: الحالة المختزلة عند أحمد هي $\\rho_B = I/2$ سواء قاست سارة أم لا. الارتباط القوي بين النتائج لا يظهر إلا عند مقارنة السجلّين عبر قناة كلاسيكية، لذا لا يتعارض التشابك مع النسبية.",
      steps: [
        {
          text: "نحسب الحالة المختزلة لأحمد بالأثر الجزئي:",
          math: "\\rho_B = \\mathrm{Tr}_A\\big(|\\Phi^{+}\\rangle\\langle \\Phi^{+}|\\big) = \\tfrac{1}{2} I",
        },
        {
          text: "وإذا قاست سارة دون أن تُخبره فالخليط الناتج هو نفسه:",
          math: "\\tfrac{1}{2}|0\\rangle\\langle 0| + \\tfrac{1}{2}|1\\rangle\\langle 1| = \\tfrac{1}{2} I",
        },
        {
          text: "تطابق المصفوفتين يعني استحالة التمييز:",
          math: "\\rho_B^{\\text{before}} = \\rho_B^{\\text{after}} = \\tfrac{1}{2} I",
        },
      ],
    },
  ],
};
