/**
 * components/KaTeXMath.tsx
 * تصيير معادلات KaTeX بالاتجاه LTR داخل صفحة RTL.
 * KaTeX rendering forced to LTR inside an RTL page.
 */
import katex from "katex";
import { cn } from "@/lib/utils";

interface KaTeXMathProps {
  /** صيغة LaTeX */
  math: string;
  /** كتلة مستقلة بدل صيغة سطرية */
  display?: boolean;
  className?: string;
}

function render(math: string, display: boolean): string {
  try {
    return katex.renderToString(math, {
      displayMode: display,
      throwOnError: false,
      strict: false,
      trust: false,
      output: "htmlAndMathml",
    });
  } catch {
    // في حال فشل التصيير نعرض الصيغة الخام بدل تعطيل الصفحة
    return math.replace(/[<>&]/g, (c) =>
      c === "<" ? "&lt;" : c === ">" ? "&gt;" : "&amp;",
    );
  }
}

/** معادلة رياضية مفردة. */
export function KaTeXMath({ math, display = false, className }: KaTeXMathProps) {
  const html = render(math, display);

  if (display) {
    return (
      <div
        dir="ltr"
        // الصيغ العريضة تُمرَّر أفقياً داخل حاويتها بدل كسر تخطيط الصفحة
        className={cn(
          "my-4 overflow-x-auto overflow-y-hidden px-1 py-2 text-center",
          "[&_.katex]:text-[1.05rem] sm:[&_.katex]:text-[1.15rem]",
          className,
        )}
        dangerouslySetInnerHTML={{ __html: html }}
      />
    );
  }

  return (
    <span
      dir="ltr"
      className={cn("inline-block align-middle", className)}
      dangerouslySetInnerHTML={{ __html: html }}
    />
  );
}

interface MathTextProps {
  /** نص عربي يحوي رياضيات سطرية بين علامتَي $...$ */
  text: string;
  className?: string;
  /** وسم الحاوية الخارجية */
  as?: "span" | "p" | "div";
}

/** علامات ترقيم يجب ألا تنفصل عن المعادلة التي تسبقها عند الالتفاف. */
const TRAILING_PUNCTUATION = /^([؟،؛.:!,)\]}]+)/;

/**
 * نص مختلط: يعرض العربية بالاتجاه RTL والمقاطع الرياضية بالاتجاه LTR.
 * مثال: "احتمال القياس هو $P = |\\alpha|^2$ حسب قاعدة بورن".
 */
export function MathText({ text, className, as = "span" }: MathTextProps) {
  const Tag = as;
  const segments = text.split(/(\$[^$]+\$)/g).filter(Boolean);

  return (
    <Tag className={cn("leading-loose", className)}>
      {segments.map((segment, index) => {
        const isMath =
          segment.startsWith("$") && segment.endsWith("$") && segment.length > 2;

        if (isMath) {
          // نلصق علامة الترقيم التالية بالمعادلة كي لا تسقط وحدها في سطر جديد
          const following = segments[index + 1] ?? "";
          const glued = following.match(TRAILING_PUNCTUATION)?.[1] ?? "";
          return (
            <span key={index} className="whitespace-nowrap">
              <KaTeXMath math={segment.slice(1, -1)} className="mx-0.5" />
              {glued}
            </span>
          );
        }

        // إن كانت علامة الترقيم قد أُلحقت بالمعادلة السابقة فلا نكرّرها
        const previousWasMath =
          index > 0 && segments[index - 1].startsWith("$") && segments[index - 1].endsWith("$");
        const body = previousWasMath ? segment.replace(TRAILING_PUNCTUATION, "") : segment;

        return <span key={index}>{body}</span>;
      })}
    </Tag>
  );
}
