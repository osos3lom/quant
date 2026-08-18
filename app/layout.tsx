/**
 * app/layout.tsx
 * التخطيط الجذري: اتجاه RTL، لغة عربية، خط Tajawal، وأنماط KaTeX.
 */
import type { Metadata, Viewport } from "next";
import { Tajawal } from "next/font/google";
import "katex/dist/katex.min.css";
import "./globals.css";
import { Navbar } from "@/components/Navbar";

const tajawal = Tajawal({
  subsets: ["arabic", "latin"],
  weight: ["300", "400", "500", "700", "800"],
  variable: "--font-tajawal",
  display: "swap",
});

export const metadata: Metadata = {
  title: {
    default: "تمارين الحوسبة الكمية",
    template: "%s · تمارين الحوسبة الكمية",
  },
  description:
    "منصة تفاعلية باللغة العربية لإتقان الحوسبة الكمية: الكيوبتات والتراكب، البوابات الكمية، التشابك، القياس ومصفوفة الكثافة، الخوارزميات، وتصحيح الأخطاء — مع شرح رياضي خطوة بخطوة.",
  keywords: [
    "الحوسبة الكمية",
    "كيوبت",
    "تشابك كمي",
    "بوابات كمية",
    "خوارزمية غروفر",
    "تمارين",
    "quantum computing",
    "arabic",
  ],
  authors: [{ name: "تمارين الحوسبة الكمية" }],
  openGraph: {
    title: "تمارين الحوسبة الكمية",
    description:
      "تمارين تفاعلية بالعربية في الحوسبة الكمية مع تغذية راجعة فورية وحلول رياضية مفصّلة.",
    locale: "ar_AR",
    type: "website",
  },
};

export const viewport: Viewport = {
  themeColor: [
    { media: "(prefers-color-scheme: light)", color: "#f8fafc" },
    { media: "(prefers-color-scheme: dark)", color: "#020617" },
  ],
};

/**
 * يطبّق الوضع المحفوظ قبل أول رسم لتفادي وميض الشاشة (FOUC).
 * يُحقن كنص مباشر لأنه يجب أن ينفَّذ قبل تحميل React.
 */
const themeScript = `
(function () {
  try {
    var stored = localStorage.getItem('quantum-exercises:theme');
    var prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
    var dark = stored ? stored === 'dark' : prefersDark;
    document.documentElement.classList.toggle('dark', dark);
    document.documentElement.style.colorScheme = dark ? 'dark' : 'light';
  } catch (e) {}
})();
`;

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="ar" dir="rtl" className={tajawal.variable} suppressHydrationWarning>
      <head>
        <script dangerouslySetInnerHTML={{ __html: themeScript }} />
      </head>
      <body className="min-h-screen antialiased">
        <Navbar />
        <main className="pt-16 sm:pt-24 pb-20 md:pb-0">{children}</main>
        <footer className="mt-12 sm:mt-16 border-t border-slate-200 py-8 mb-20 md:mb-0 dark:border-slate-800">
          <div className="mx-auto max-w-6xl px-4 text-center text-sm text-slate-500 sm:px-6 dark:text-slate-400">
            <p>
              تمارين الحوسبة الكمية — منصة تعليمية عربية مفتوحة تعمل بالكامل في متصفحك،
              ويُحفظ تقدّمك محلياً على جهازك.
            </p>
          </div>
        </footer>
      </body>
    </html>
  );
}
