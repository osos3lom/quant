/**
 * data/cheatsheet.ts
 * ملخص القوانين — مرجع سريع لأهم صيغ الحوسبة الكمية.
 */

export interface CheatsheetItem {
  /** العنوان بالعربية */
  title: string;
  /** صيغة KaTeX تُعرض ككتلة LTR */
  math: string;
  /** شرح مختصر بالعربية */
  note?: string;
}

export interface CheatsheetSection {
  id: string;
  title: string;
  icon: string;
  items: CheatsheetItem[];
}

export const CHEATSHEET: CheatsheetSection[] = [
  {
    id: "states",
    title: "الحالات وترميز ديراك",
    icon: "Atom",
    items: [
      {
        title: "الحالة العامة لكيوبت",
        math: "|\\psi\\rangle = \\alpha|0\\rangle + \\beta|1\\rangle, \\qquad |\\alpha|^{2} + |\\beta|^{2} = 1",
        note: "شرط التطبيع يضمن أن مجموع الاحتمالات يساوي واحداً.",
      },
      {
        title: "أساس هادامارد",
        math: "|\\pm\\rangle = \\frac{|0\\rangle \\pm |1\\rangle}{\\sqrt{2}}",
        note: "متعامدان ويشكّلان أساس القياس في المحور X.",
      },
      {
        title: "تمثيل كرة بلوخ",
        math: "|\\psi\\rangle = \\cos\\frac{\\theta}{2}|0\\rangle + e^{i\\varphi}\\sin\\frac{\\theta}{2}|1\\rangle",
        note: "كل حالة نقية نقطة على سطح الكرة، والطور العام غير مرئي.",
      },
      {
        title: "الضرب التنسوري",
        math: "|a\\rangle \\otimes |b\\rangle = |ab\\rangle, \\qquad \\dim \\mathcal{H}_{n} = 2^{n}",
        note: "بُعد الفضاء ينمو أسّياً مع عدد الكيوبتات.",
      },
    ],
  },
  {
    id: "gates",
    title: "البوابات الكمية",
    icon: "ToggleRight",
    items: [
      {
        title: "بوابات باولي",
        math: "X = \\begin{pmatrix} 0 & 1 \\\\ 1 & 0 \\end{pmatrix}, \\; Y = \\begin{pmatrix} 0 & -i \\\\ i & 0 \\end{pmatrix}, \\; Z = \\begin{pmatrix} 1 & 0 \\\\ 0 & -1 \\end{pmatrix}",
        note: "كل منها هيرميتي ووحدوي، ومربّعه يساوي الهوية.",
      },
      {
        title: "بوابة هادامارد",
        math: "H = \\frac{1}{\\sqrt{2}}\\begin{pmatrix} 1 & 1 \\\\ 1 & -1 \\end{pmatrix}, \\qquad HZH = X",
        note: "تولّد التراكب وتبدّل بين المحورين X و Z.",
      },
      {
        title: "بوابات الطور",
        math: "S = \\begin{pmatrix} 1 & 0 \\\\ 0 & i \\end{pmatrix}, \\qquad T = \\begin{pmatrix} 1 & 0 \\\\ 0 & e^{i\\pi/4} \\end{pmatrix}",
        note: "العلاقات: T² = S و S² = Z.",
      },
      {
        title: "بوابة التحكم CNOT",
        math: "\\text{CNOT} = \\begin{pmatrix} 1 & 0 & 0 & 0 \\\\ 0 & 1 & 0 & 0 \\\\ 0 & 0 & 0 & 1 \\\\ 0 & 0 & 1 & 0 \\end{pmatrix}",
        note: "تقلب الهدف عندما يكون المتحكّم في الحالة |1⟩.",
      },
      {
        title: "شرط الوحدوية",
        math: "U^{\\dagger}U = UU^{\\dagger} = I \\;\\Longrightarrow\\; U^{-1} = U^{\\dagger}",
        note: "كل بوابة كمية قابلة للعكس بالضرورة.",
      },
    ],
  },
  {
    id: "entanglement",
    title: "التشابك وحالات بيل",
    icon: "Workflow",
    items: [
      {
        title: "حالات بيل الأربع",
        math: "|\\Phi^{\\pm}\\rangle = \\frac{|00\\rangle \\pm |11\\rangle}{\\sqrt{2}}, \\qquad |\\Psi^{\\pm}\\rangle = \\frac{|01\\rangle \\pm |10\\rangle}{\\sqrt{2}}",
        note: "أساس كامل ومتعامد لفضاء كيوبتين، وكلها متشابكة تماماً.",
      },
      {
        title: "دائرة توليد حالة بيل",
        math: "|00\\rangle \\xrightarrow{H \\otimes I} \\xrightarrow{\\text{CNOT}} |\\Phi^{+}\\rangle",
        note: "بوابتان فقط تكفيان لتوليد التشابك.",
      },
      {
        title: "معيار الفصل لكيوبتين",
        math: "a_{00}a_{11} = a_{01}a_{10}",
        note: "إذا فشل الشرط فالحالة متشابكة.",
      },
      {
        title: "حالة GHZ",
        math: "|\\text{GHZ}\\rangle = \\frac{|000\\rangle + |111\\rangle}{\\sqrt{2}}",
        note: "تشابك متعدد الأطراف بثلاثة كيوبتات.",
      },
    ],
  },
  {
    id: "measurement",
    title: "القياس ومصفوفة الكثافة",
    icon: "Gauge",
    items: [
      {
        title: "قاعدة بورن",
        math: "P(m) = \\langle \\psi | P_m | \\psi \\rangle = \\|P_m|\\psi\\rangle\\|^{2}",
        note: "احتمال النتيجة هو مربّع مقدار الاتساع.",
      },
      {
        title: "الحالة بعد القياس",
        math: "|\\psi'\\rangle = \\frac{P_m |\\psi\\rangle}{\\sqrt{P(m)}}",
        note: "الإسقاط ثم إعادة التطبيع.",
      },
      {
        title: "مصفوفة الكثافة",
        math: "\\rho = \\sum_i p_i |\\psi_i\\rangle\\langle \\psi_i|, \\qquad \\mathrm{Tr}(\\rho) = 1",
        note: "تصف الحالات النقية والمختلطة معاً.",
      },
      {
        title: "النقاء",
        math: "\\mathrm{Tr}(\\rho^{2}) = \\frac{1 + |\\vec{r}|^{2}}{2} \\in \\left[\\tfrac{1}{2}, 1\\right]",
        note: "القيمة 1 تعني حالة نقية، و½ تعني اختلاطاً أقصى.",
      },
      {
        title: "القيمة المتوقعة",
        math: "\\langle A \\rangle = \\langle \\psi | A | \\psi \\rangle = \\mathrm{Tr}(\\rho A)",
        note: "الصيغة الثانية تصلح للحالات المختلطة أيضاً.",
      },
    ],
  },
  {
    id: "algorithms",
    title: "الخوارزميات والبروتوكولات",
    icon: "Binary",
    items: [
      {
        title: "تكرارات غروفر",
        math: "k_{\\text{opt}} \\approx \\frac{\\pi}{4}\\sqrt{N}, \\qquad O(\\sqrt{N})",
        note: "تسريع تربيعي، وهو الأمثل المُبرهَن للبحث غير المهيكل.",
      },
      {
        title: "دويتش-جوزا",
        math: "n_{\\text{quantum}} = 1 \\quad \\text{vs} \\quad n_{\\text{classical}} = 2^{n-1} + 1",
        note: "أول فصل أسّي صريح في نموذج الأوراكل.",
      },
      {
        title: "ارتداد الطور",
        math: "\\text{CU}|+\\rangle|u\\rangle = \\left(\\frac{|0\\rangle + e^{i\\varphi}|1\\rangle}{\\sqrt{2}}\\right)|u\\rangle",
        note: "المحرّك الخفي وراء تقدير الطور وخوارزمية شور.",
      },
      {
        title: "النقل الآني",
        math: "|\\psi\\rangle + |\\Phi^{+}\\rangle + 2\\,\\text{cbits} \\to |\\psi\\rangle",
        note: "الكيوبت الأصلي يُدمَّر، فلا تناقض مع استحالة الاستنساخ.",
      },
      {
        title: "استحالة الاستنساخ",
        math: "\\nexists\\, U: \\; U|\\psi\\rangle|0\\rangle = |\\psi\\rangle|\\psi\\rangle \\quad \\forall |\\psi\\rangle",
        note: "نتيجة مباشرة لخطية ميكانيكا الكم.",
      },
    ],
  },
  {
    id: "qec",
    title: "تصحيح الأخطاء والعتاد",
    icon: "ShieldCheck",
    items: [
      {
        title: "كود قلب البت",
        math: "|0\\rangle_L = |000\\rangle, \\qquad |1\\rangle_L = |111\\rangle",
        note: "المُثبِّتان Z₁Z₂ و Z₂Z₃ يحدّدان موضع الخطأ.",
      },
      {
        title: "كود قلب الطور",
        math: "|0\\rangle_L = |{+}{+}{+}\\rangle, \\qquad |1\\rangle_L = |{-}{-}{-}\\rangle",
        note: "المُثبِّتات هنا X₁X₂ و X₂X₃.",
      },
      {
        title: "مبرهنة العتبة",
        math: "p < p_{\\text{th}} \\;\\Longrightarrow\\; p_L \\propto \\left(\\frac{p}{p_{\\text{th}}}\\right)^{\\lfloor (d+1)/2 \\rfloor}",
        note: "عتبة كود السطح تقارب 1%.",
      },
      {
        title: "أزمنة التفكك",
        math: "P(1)(t) = e^{-t/T_1}, \\qquad \\rho_{01}(t) = \\rho_{01}(0)e^{-t/T_2}, \\qquad T_2 \\leq 2T_1",
        note: "تحدّان معاً أقصى عمق دائرة قابل للتنفيذ.",
      },
      {
        title: "كلفة كود السطح",
        math: "n_{\\text{phys}} \\approx d^{2}, \\qquad k = 1",
        note: "مئات الكيوبتات الفيزيائية لكل كيوبت منطقي.",
      },
    ],
  },
];
