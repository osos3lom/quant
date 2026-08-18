# ⚛️ منصة تمارين وتجارب الحوسبة الكمية (Quantum Exercises)

منصة تعليمية وسينمائية تفاعلية باللغة العربية لإتقان الحوسبة الكمية والفيزياء الرياضية، تعتمد على **السرد البصري والتفاعل المباشر** بدل السرد النظري التقليدي.

🔗 **الموقع المباشر**: [https://kammiyah.web.app](https://kammiyah.web.app)

---

## 🌟 أبرز الميزات والخصائص (Core Features)

1. **سرد بصري سينمائي (Visual Storytelling Landing Page)**:
   - **Hero Particle Qubit Core**: محاكاة بصريّة كرويّة ثلاثية الأبعاد بسحابة احتمالات كمية وحقل مغناطيسي تفاعلي.
   - **تحوّل النموذج (Paradigm Shift)**: مقارنة تفاعلية بين النبضة الكلاسيكية الثنائية ($x \in \{0, 1\}$) وتداخل موجات التراكب الكمي ($\alpha|0\rangle + \beta|1\rangle$).
   - **كرة بلوخ التفاعلية (3D Bloch Sphere Manipulator)**: التحكم بزوايا القطب والطور ($\theta, \phi$) في فضاء هيلبرت مع حساب فوري للاحتمالات $|P(0)|, |P(1)|$.
   - **حقل التشابك الكمي (Bell State Entanglement Field)**: تجربة تفاعلية لحالة بيل $|\Phi^+\rangle = \frac{|00\rangle + |11\rangle}{\sqrt{2}}$ تُثبت انهيار الحالة اللحظي عبر المكان.
   - **مستكشف الأركان الستة (Spatial Pillars Navigator)**: استكشاف تفاعلي لأركان الحوسبة الكمية الستة مع محاكاة بصرية حية لكل مسار.

2. **مسارات التمارين الرياضية (`/exercises`)**:
   - 6 مسارات علمية وشاملة (الكيوبتات، البوابات، الدوائر والتشابك، القياس، الخوارزميات، وتصحيح الأخطاء).
   - إثباتات رياضية خطوة بخطوة بترميز ديراك (Dirac Bra-Ket Notation) وتغذية راجعة فورية.

3. **دروس Jupyter التفاعلية (`/lessons`)**:
   - بيئة دفاتر تعليمية تشغّل كود **بايثون حقيقي بالكامل داخل المتصفح** بواسطة WebAssembly و Pyodide وبدون أي خوادم خارجية.

4. **واجهة زجاجية عائمة واستجابة شاملة (Glassmorphism Floating UI)**:
   - شريط تنقّل كبسولي عائم (Top Floating Glass Nav) على الحواسيب، وشريط تنقل سفلي تفاعلي (Floating Bottom Bar) على الجوال.
   - دعم متكامل للوضعين النهائيين (Spatial Deep Dark Mode & Royal Emerald Light Mode) بالتوافق مع اتجاه الخط العربي RTL.

5. **أداء محلي 100% (Client-Side Static Privacy)**:
   - بناء ثابت بالكامل (`output: 'export'`)، بدون خوادم أو قواعد بيانات. تُحفظ نقاط الخبرة وتقدم المحاولات محلياً في `localStorage`.

---

## 💻 التشغيل المحلي (Local Setup)

### 1. تثبيت الحزم (Install Dependencies)
```bash
npm install
```

### 2. تشغيل خادم التطوير (Run Development Server)
```bash
npm run dev
```
افتح المتصفح على العنوان: `http://localhost:3000`

### 3. بناء النسخة الإنتاجية الثابتة (Production Build)
```bash
npm run build
```

### 4. معاينة البناء الثابت (Preview Production Export)
```bash
npm run preview
```

---

## 🚀 النشر (Deployment)

المشروع مهيأ للنشر التلقائي على استضافة **Google Firebase Hosting**:

```bash
npm run deploy
```
يقوم هذا الأمر ببناء النسخة الثابتة داخل مجلد `out` ونشرها مباشرة إلى [kammiyah.web.app](https://kammiyah.web.app).

---

## 🛠️ البنية التقنية (Tech Stack)

- **الأساس**: Next.js 16.3.1 (Turbopack) + React 19.2 + TypeScript
- **التنسيق**: Tailwind CSS v4 (خصائص RTL المنطقية + Glassmorphism)
- **الفيزياء والرياضيات**: KaTeX (ترميز ديراك LTR) + 60fps HTML5 Canvas Engine
- **الخط**: Tajawal عبر `next/font/google`
- **التشغيل العلمي**: Pyodide (Python in WebAssembly)
