/**
 * components/lessons/CodeEditor.tsx
 * محرّر شيفرة بايثون بأسلوب Colab: أرقام أسطر، تلوين نحوي، وإزاحة تلقائية.
 * الاتجاه داخل المحرّر LTR دائماً حتى داخل صفحة RTL.
 */
"use client";

import { useCallback, useEffect, useLayoutEffect, useRef } from "react";
import { cn } from "@/lib/utils";

/* ------------------------------------------------------------------ */
/* التلوين النحوي                                                       */
/* ------------------------------------------------------------------ */

const KEYWORDS =
  "False|None|True|and|as|assert|async|await|break|class|continue|def|del|elif|else|except|finally|for|from|global|if|import|in|is|lambda|nonlocal|not|or|pass|raise|return|try|while|with|yield";

const BUILTINS =
  "abs|all|any|bool|complex|dict|divmod|enumerate|filter|float|format|frozenset|getattr|hasattr|input|int|isinstance|len|list|map|max|min|object|open|pow|print|range|repr|reversed|round|set|setattr|slice|sorted|str|sum|tuple|type|zip";

const TOKEN_PATTERN = new RegExp(
  [
    "(#[^\\n]*)",
    "('''[\\s\\S]*?'''|\"\"\"[\\s\\S]*?\"\"\"|'(?:\\\\.|[^'\\\\\\n])*'|\"(?:\\\\.|[^\"\\\\\\n])*\")",
    `\\b(?:def|class)\\s+([A-Za-z_]\\w*)`,
    `\\b(${KEYWORDS})\\b`,
    `\\b(${BUILTINS})\\b(?=\\s*\\()`,
    "\\b(\\d+\\.?\\d*(?:[eE][+-]?\\d+)?|\\.\\d+)\\b",
    "([+\\-*/%=<>!&|^~@]+)",
  ].join("|"),
  "g",
);

function escapeHtml(value: string): string {
  return value
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;");
}

export function highlightPython(source: string): string {
  let html = "";
  let cursor = 0;

  for (const match of source.matchAll(TOKEN_PATTERN)) {
    const index = match.index ?? 0;
    html += escapeHtml(source.slice(cursor, index));

    const [full, comment, string, defName, keyword, builtin, num, operator] = match;

    if (comment) html += `<span class="tok-comment">${escapeHtml(comment)}</span>`;
    else if (string) html += `<span class="tok-string">${escapeHtml(string)}</span>`;
    else if (defName) {
      const keywordPart = full.slice(0, full.length - defName.length);
      html += `<span class="tok-keyword">${escapeHtml(keywordPart)}</span>`;
      html += `<span class="tok-def">${escapeHtml(defName)}</span>`;
    } else if (keyword) html += `<span class="tok-keyword">${escapeHtml(keyword)}</span>`;
    else if (builtin) html += `<span class="tok-builtin">${escapeHtml(builtin)}</span>`;
    else if (num) html += `<span class="tok-number">${escapeHtml(num)}</span>`;
    else if (operator) html += `<span class="tok-operator">${escapeHtml(operator)}</span>`;

    cursor = index + full.length;
  }

  html += escapeHtml(source.slice(cursor));
  return `${html}\n`;
}

/* ------------------------------------------------------------------ */
/* شريط الرموز للهواتف                                                 */
/* ------------------------------------------------------------------ */

const KEY_SHORTCUTS: { label: string; insert: string; caretOffset?: number }[] = [
  { label: "⇥", insert: "    " },
  { label: ":", insert: ":" },
  { label: "()", insert: "()", caretOffset: -1 },
  { label: "[]", insert: "[]", caretOffset: -1 },
  { label: "{}", insert: "{}", caretOffset: -1 },
  { label: '""', insert: '""', caretOffset: -1 },
  { label: "=", insert: " = " },
  { label: "==", insert: " == " },
  { label: "#", insert: "# " },
  { label: "_", insert: "_" },
  { label: "**", insert: "**" },
  { label: ".", insert: "." },
];

/* ------------------------------------------------------------------ */
/* المحرّر                                                              */
/* ------------------------------------------------------------------ */

interface CodeEditorProps {
  value: string;
  onChange: (value: string) => void;
  readOnly?: boolean;
  onRun?: () => void;
  minLines?: number;
  className?: string;
  showLineNumbers?: boolean;
}

export function CodeEditor({
  value,
  onChange,
  readOnly = false,
  onRun,
  minLines = 3,
  className,
  showLineNumbers = true,
}: CodeEditorProps) {
  const textareaRef = useRef<HTMLTextAreaElement>(null);
  const highlightRef = useRef<HTMLPreElement>(null);
  const gutterRef = useRef<HTMLDivElement>(null);

  const lineCount = Math.max(value.split("\n").length, minLines);

  const syncHeight = useCallback(() => {
    const textarea = textareaRef.current;
    const highlight = highlightRef.current;
    if (!textarea || !highlight) return;
    const height = `${lineCount * 1.65 * 0.8125 + 1.5}rem`;
    textarea.style.height = height;
    highlight.style.height = height;
  }, [lineCount]);

  useLayoutEffect(syncHeight, [syncHeight]);

  useEffect(() => {
    const textarea = textareaRef.current;
    const highlight = highlightRef.current;
    if (!textarea || !highlight) return;
    highlight.scrollTop = textarea.scrollTop;
    highlight.scrollLeft = textarea.scrollLeft;
  }, [value]);

  const insertAtCursor = useCallback(
    (text: string, caretOffset = 0) => {
      const textarea = textareaRef.current;
      if (!textarea || readOnly) return;
      const { selectionStart, selectionEnd } = textarea;
      const next = value.slice(0, selectionStart) + text + value.slice(selectionEnd);
      onChange(next);
      const caret = selectionStart + text.length + caretOffset;
      requestAnimationFrame(() => {
        textarea.focus();
        textarea.setSelectionRange(caret, caret);
      });
    },
    [onChange, readOnly, value],
  );

  const handleKeyDown = useCallback(
    (event: React.KeyboardEvent<HTMLTextAreaElement>) => {
      const textarea = event.currentTarget;

      if ((event.ctrlKey || event.metaKey) && event.key === "Enter") {
        event.preventDefault();
        onRun?.();
        return;
      }

      if (readOnly) return;

      if (event.key === "Tab") {
        event.preventDefault();
        const { selectionStart, selectionEnd } = textarea;

        if (event.shiftKey) {
          const lineStart = value.lastIndexOf("\n", selectionStart - 1) + 1;
          const leading = value.slice(lineStart, selectionStart).match(/^ +/)?.[0] ?? "";
          const remove = Math.min(4, leading.length);
          if (!remove) return;
          const next = value.slice(0, lineStart) + value.slice(lineStart + remove);
          onChange(next);
          requestAnimationFrame(() => {
            const caret = Math.max(lineStart, selectionStart - remove);
            textarea.setSelectionRange(caret, caret);
          });
          return;
        }

        const next = `${value.slice(0, selectionStart)}    ${value.slice(selectionEnd)}`;
        onChange(next);
        requestAnimationFrame(() => {
          const caret = selectionStart + 4;
          textarea.setSelectionRange(caret, caret);
        });
        return;
      }

      if (event.key === "Enter") {
        event.preventDefault();
        const { selectionStart, selectionEnd } = textarea;
        const lineStart = value.lastIndexOf("\n", selectionStart - 1) + 1;
        const currentLine = value.slice(lineStart, selectionStart);
        const indent = currentLine.match(/^ */)?.[0] ?? "";
        const extra = /:\s*$/.test(currentLine) ? "    " : "";
        const insertion = `\n${indent}${extra}`;
        const next = value.slice(0, selectionStart) + insertion + value.slice(selectionEnd);
        onChange(next);
        requestAnimationFrame(() => {
          const caret = selectionStart + insertion.length;
          textarea.setSelectionRange(caret, caret);
        });
      }
    },
    [onChange, onRun, readOnly, value],
  );

  const gutterWidth = showLineNumbers ? "2.5rem" : "0px";

  return (
    <div className={cn("w-full", className)}>
      <div
        dir="ltr"
        className={cn(
          "relative overflow-hidden rounded-lg border transition",
          readOnly
            ? "border-slate-200 bg-slate-50 dark:border-slate-800 dark:bg-slate-950/60"
            : "border-slate-200 bg-white focus-within:border-brand-500 focus-within:ring-2 focus-within:ring-brand-500/10 dark:border-slate-800 dark:bg-slate-950",
        )}
      >
        {/* أرقام الأسطر */}
        {showLineNumbers && (
          <div
            ref={gutterRef}
            aria-hidden="true"
            className="pointer-events-none absolute top-0 left-0 bottom-0 z-10 select-none border-r border-slate-100 bg-slate-50/80 dark:border-slate-800 dark:bg-slate-950/80"
            style={{ width: gutterWidth }}
          >
            <div className="py-3">
              {Array.from({ length: lineCount }, (_, i) => (
                <div
                  key={i}
                  className="px-1.5 text-right font-mono text-[0.8125rem] leading-[1.65] text-slate-400 dark:text-slate-600"
                >
                  {i + 1}
                </div>
              ))}
            </div>
          </div>
        )}

        {/* طبقة التلوين */}
        <pre
          ref={highlightRef}
          aria-hidden="true"
          className="code-surface pointer-events-none m-0 overflow-auto py-3 pr-4 text-slate-900 dark:text-slate-100"
          style={{ paddingLeft: showLineNumbers ? `calc(${gutterWidth} + 0.75rem)` : "1rem" }}
          dangerouslySetInnerHTML={{ __html: highlightPython(value) }}
        />

        {/* منطقة الإدخال الشفافة */}
        <textarea
          ref={textareaRef}
          value={value}
          readOnly={readOnly}
          spellCheck={false}
          autoCapitalize="off"
          autoCorrect="off"
          autoComplete="off"
          dir="ltr"
          aria-label="محرّر شيفرة بايثون"
          onChange={(event) => onChange(event.target.value)}
          onKeyDown={handleKeyDown}
          onScroll={(event) => {
            const highlight = highlightRef.current;
            if (!highlight) return;
            highlight.scrollTop = event.currentTarget.scrollTop;
            highlight.scrollLeft = event.currentTarget.scrollLeft;
          }}
          className={cn(
            "code-surface absolute inset-0 h-full w-full resize-none overflow-auto",
            "bg-transparent py-3 pr-4 text-transparent outline-none",
            "caret-brand-600 selection:bg-brand-500/25 dark:caret-brand-400",
          )}
          style={{ paddingLeft: showLineNumbers ? `calc(${gutterWidth} + 0.75rem)` : "1rem" }}
        />
      </div>

      {/* شريط الرموز — الشاشات الصغيرة */}
      {!readOnly && (
        <div
          dir="ltr"
          className="mt-1.5 flex gap-1 overflow-x-auto pb-1 sm:hidden"
          role="toolbar"
          aria-label="رموز سريعة"
        >
          {KEY_SHORTCUTS.map((shortcut) => (
            <button
              key={shortcut.label}
              type="button"
              onClick={() => insertAtCursor(shortcut.insert, shortcut.caretOffset ?? 0)}
              className="shrink-0 rounded border border-slate-200 bg-white px-2.5 py-1 font-mono text-xs font-semibold text-slate-700 active:bg-brand-50 dark:border-slate-700 dark:bg-slate-900 dark:text-slate-200"
            >
              {shortcut.label}
            </button>
          ))}
        </div>
      )}
    </div>
  );
}
