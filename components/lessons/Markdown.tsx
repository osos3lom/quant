/**
 * components/lessons/Markdown.tsx
 * عارض Markdown مبسّط للشرح العربي داخل الدفاتر:
 * عناوين، قوائم، غامق، شيفرة سطرية، كتل شيفرة، ورياضيات KaTeX بالاتجاه LTR.
 */
"use client";

import type { ReactNode } from "react";
import { KaTeXMath } from "@/components/KaTeXMath";
import { highlightPython } from "./CodeEditor";
import { cn } from "@/lib/utils";

/* ------------------------------------------------------------------ */
/* العناصر السطرية                                                     */
/* ------------------------------------------------------------------ */

/** يعالج الغامق والشيفرة السطرية داخل مقطع نصي خالٍ من الرياضيات. */
function renderEmphasis(text: string, keyPrefix: string): ReactNode[] {
  return text
    .split(/(\*\*[^*]+\*\*|`[^`]+`)/g)
    .filter(Boolean)
    .map((part, index) => {
      const key = `${keyPrefix}-${index}`;

      if (part.startsWith("**") && part.endsWith("**") && part.length > 4) {
        return (
          <strong key={key} className="font-bold text-slate-900 dark:text-white">
            {part.slice(2, -2)}
          </strong>
        );
      }

      if (part.startsWith("`") && part.endsWith("`") && part.length > 2) {
        return (
          <code
            key={key}
            dir="ltr"
            className="mx-0.5 inline-block rounded bg-brand-50 px-1.5 py-0.5 font-mono text-[0.85em] text-brand-800 dark:bg-brand-500/15 dark:text-brand-200"
          >
            {part.slice(1, -1)}
          </code>
        );
      }

      return <span key={key}>{part}</span>;
    });
}

/** يعالج الرياضيات السطرية $...$ ثم يمرّر الباقي إلى معالج التوكيد. */
function renderInline(text: string, keyPrefix: string): ReactNode[] {
  const parts = text.split(/(\$[^$\n]+\$)/g).filter(Boolean);
  const nodes: ReactNode[] = [];

  parts.forEach((part, index) => {
    const key = `${keyPrefix}-i${index}`;
    if (part.startsWith("$") && part.endsWith("$") && part.length > 2) {
      nodes.push(<KaTeXMath key={key} math={part.slice(1, -1)} className="mx-0.5" />);
      return;
    }
    nodes.push(...renderEmphasis(part, key));
  });

  return nodes;
}

/* ------------------------------------------------------------------ */
/* العناصر الكتلية                                                     */
/* ------------------------------------------------------------------ */

export function Markdown({ content, className }: { content: string; className?: string }) {
  /**
   * نصوص الدروس تُكتب داخل String.raw كي تبقى رموز LaTeX سليمة، وداخلها لا يمكن
   * كتابة العلامة ` إلا مسبوقة بشرطة مائلة عكسية، فتصل إلينا بالصورة \`.
   * نُطبّعها هنا قبل التحليل كي تُعرض الشيفرة السطرية كما هو متوقّع.
   */
  const lines = content.replace(/\\`/g, "`").split("\n");
  const blocks: ReactNode[] = [];
  let paragraph: string[] = [];
  let index = 0;

  const flushParagraph = () => {
    if (!paragraph.length) return;
    const text = paragraph.join(" ");
    blocks.push(
      <p key={`p-${blocks.length}`} className="leading-loose">
        {renderInline(text, `p${blocks.length}`)}
      </p>,
    );
    paragraph = [];
  };

  while (index < lines.length) {
    const line = lines[index];
    const trimmed = line.trim();

    // كتلة شيفرة ```python
    if (trimmed.startsWith("```")) {
      flushParagraph();
      const body: string[] = [];
      index += 1;
      while (index < lines.length && !lines[index].trim().startsWith("```")) {
        body.push(lines[index]);
        index += 1;
      }
      index += 1;
      blocks.push(
        <pre
          key={`code-${blocks.length}`}
          dir="ltr"
          className="code-surface m-0 overflow-x-auto rounded-xl border border-slate-200 bg-slate-50 px-4 py-3 text-slate-900 dark:border-slate-800 dark:bg-slate-950 dark:text-slate-100"
          dangerouslySetInnerHTML={{ __html: highlightPython(body.join("\n")) }}
        />,
      );
      continue;
    }

    // معادلة ككتلة مستقلة $$...$$
    if (trimmed.startsWith("$$")) {
      flushParagraph();
      const single = trimmed.length > 4 && trimmed.endsWith("$$");
      if (single) {
        blocks.push(
          <KaTeXMath key={`m-${blocks.length}`} math={trimmed.slice(2, -2)} display />,
        );
        index += 1;
        continue;
      }
      const body: string[] = [];
      index += 1;
      while (index < lines.length && !lines[index].trim().endsWith("$$")) {
        body.push(lines[index]);
        index += 1;
      }
      index += 1;
      blocks.push(
        <KaTeXMath key={`m-${blocks.length}`} math={body.join(" ")} display />,
      );
      continue;
    }

    // العناوين
    const heading = trimmed.match(/^(#{1,4})\s+(.*)$/);
    if (heading) {
      flushParagraph();
      const level = heading[1].length;
      const text = heading[2];
      blocks.push(
        <p
          key={`h-${blocks.length}`}
          className={cn(
            "font-bold text-slate-900 dark:text-white",
            level <= 2 ? "mt-2 text-lg sm:text-xl" : "mt-1 text-base",
          )}
        >
          {renderInline(text, `h${blocks.length}`)}
        </p>,
      );
      index += 1;
      continue;
    }

    // قائمة نقطية
    if (/^[-*]\s+/.test(trimmed)) {
      flushParagraph();
      const items: string[] = [];
      while (index < lines.length && /^[-*]\s+/.test(lines[index].trim())) {
        items.push(lines[index].trim().replace(/^[-*]\s+/, ""));
        index += 1;
      }
      blocks.push(
        <ul key={`ul-${blocks.length}`} className="space-y-1.5">
          {items.map((item, itemIndex) => (
            <li key={itemIndex} className="flex gap-2 leading-loose">
              <span className="mt-2.5 h-1.5 w-1.5 shrink-0 rounded-full bg-brand-500" />
              <span>{renderInline(item, `ul${blocks.length}-${itemIndex}`)}</span>
            </li>
          ))}
        </ul>,
      );
      continue;
    }

    // قائمة مرقّمة
    if (/^\d+\.\s+/.test(trimmed)) {
      flushParagraph();
      const items: string[] = [];
      while (index < lines.length && /^\d+\.\s+/.test(lines[index].trim())) {
        items.push(lines[index].trim().replace(/^\d+\.\s+/, ""));
        index += 1;
      }
      blocks.push(
        <ol key={`ol-${blocks.length}`} className="space-y-1.5">
          {items.map((item, itemIndex) => (
            <li key={itemIndex} className="flex gap-2.5 leading-loose">
              <span className="mt-1 flex h-5 w-5 shrink-0 items-center justify-center rounded-md bg-brand-100 text-[11px] font-bold text-brand-700 dark:bg-brand-500/15 dark:text-brand-300">
                {itemIndex + 1}
              </span>
              <span>{renderInline(item, `ol${blocks.length}-${itemIndex}`)}</span>
            </li>
          ))}
        </ol>,
      );
      continue;
    }

    if (!trimmed) {
      flushParagraph();
      index += 1;
      continue;
    }

    paragraph.push(trimmed);
    index += 1;
  }

  flushParagraph();

  return (
    <div
      className={cn(
        "space-y-3 text-[15px] text-slate-700 dark:text-slate-300",
        className,
      )}
    >
      {blocks}
    </div>
  );
}
