/**
 * lib/usePyodide.ts
 * إدارة نواة بايثون العاملة في المتصفح (Pyodide داخل Web Worker) وخُطّاف React لاستعمالها.
 * In-browser Python kernel (Pyodide in a Web Worker) + the React hook that drives it.
 */
"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import type { ExecutionResult, KernelStatus } from "@/types/lessons";

const WORKER_URL = "/qpy-worker.js";

type PendingResolver = {
  resolve: (value: Omit<ExecutionResult, "executionCount">) => void;
  reject: (reason: Error) => void;
};

interface WorkerMessage {
  type: "status" | "ready" | "result" | "reset-done" | "fatal";
  id?: number;
  status?: KernelStatus;
  detail?: string;
  message?: string;
  payload?: Omit<ExecutionResult, "executionCount">;
}

/* ------------------------------------------------------------------ */
/* مدير النواة — مثيل واحد مشترك بين كل الدفاتر في الجلسة              */
/* ------------------------------------------------------------------ */

class KernelManager {
  private worker: Worker | null = null;
  private pending = new Map<number, PendingResolver>();
  private nextId = 1;
  private listeners = new Set<(status: KernelStatus, detail: string) => void>();

  status: KernelStatus = "idle";
  detail = "لم تبدأ النواة بعد";

  subscribe(listener: (status: KernelStatus, detail: string) => void): () => void {
    this.listeners.add(listener);
    return () => this.listeners.delete(listener);
  }

  private emit(status: KernelStatus, detail: string) {
    this.status = status;
    this.detail = detail;
    this.listeners.forEach((listener) => listener(status, detail));
  }

  private ensureWorker(): Worker {
    if (this.worker) return this.worker;

    const worker = new Worker(WORKER_URL);
    worker.onmessage = (event: MessageEvent<WorkerMessage>) => {
      const data = event.data;

      if (data.type === "status" && data.status) {
        this.emit(data.status, data.detail ?? "");
        return;
      }

      if (data.type === "result" && data.id != null) {
        const entry = this.pending.get(data.id);
        this.pending.delete(data.id);
        this.emit("ready", "النواة جاهزة");
        if (entry && data.payload) entry.resolve(data.payload);
        return;
      }

      if ((data.type === "ready" || data.type === "reset-done") && data.id != null) {
        const entry = this.pending.get(data.id);
        this.pending.delete(data.id);
        this.emit("ready", "النواة جاهزة");
        entry?.resolve({
          stdout: "",
          stderr: "",
          result: null,
          images: [],
          error: null,
          durationMs: 0,
        });
        return;
      }

      if (data.type === "fatal") {
        const message = data.message ?? "خطأ غير متوقع في النواة";
        this.emit("error", message);
        this.pending.forEach((entry) => entry.reject(new Error(message)));
        this.pending.clear();
      }
    };

    worker.onerror = (event) => {
      const message = event.message || "تعذّر تحميل نواة بايثون";
      this.emit("error", message);
      this.pending.forEach((entry) => entry.reject(new Error(message)));
      this.pending.clear();
    };

    this.worker = worker;
    return worker;
  }

  /** يبدأ تحميل النواة مسبقاً دون انتظار أول تشغيل. */
  preload(): Promise<unknown> {
    const worker = this.ensureWorker();
    if (this.status === "idle") this.emit("loading", "تحميل نواة بايثون…");
    const id = this.nextId++;
    return new Promise((resolve, reject) => {
      this.pending.set(id, { resolve, reject });
      worker.postMessage({ type: "init", id });
    });
  }

  /** ينفّذ شيفرة داخل نطاق دفتر محدّد ويعيد المخرجات. */
  run(key: string, code: string): Promise<Omit<ExecutionResult, "executionCount">> {
    const worker = this.ensureWorker();
    if (this.status !== "ready") this.emit("loading", "تحميل نواة بايثون…");
    else this.emit("running", "قيد التنفيذ…");

    const id = this.nextId++;
    return new Promise((resolve, reject) => {
      this.pending.set(id, { resolve, reject });
      worker.postMessage({ type: "run", id, key, code });
    });
  }

  /** يمسح متغيّرات دفتر واحد مع إبقاء النواة محمّلة. */
  reset(key: string): Promise<unknown> {
    const worker = this.ensureWorker();
    const id = this.nextId++;
    return new Promise((resolve, reject) => {
      this.pending.set(id, { resolve, reject });
      worker.postMessage({ type: "reset", id, key });
    });
  }

  /** يوقف تنفيذاً معلّقاً بإنهاء العامل — يفقد كل المتغيّرات. */
  interrupt() {
    this.worker?.terminate();
    this.worker = null;
    this.pending.forEach((entry) =>
      entry.reject(new Error("أُوقف التنفيذ وأُعيد تشغيل النواة")),
    );
    this.pending.clear();
    this.emit("idle", "أُعيد تشغيل النواة");
  }
}

let manager: KernelManager | null = null;

/** يعيد مدير النواة المشترك (يُنشأ عند أول استعمال في المتصفح). */
export function getKernel(): KernelManager {
  if (!manager) manager = new KernelManager();
  return manager;
}

/* ------------------------------------------------------------------ */
/* الخُطّاف — React hook                                               */
/* ------------------------------------------------------------------ */

export interface UsePyodide {
  status: KernelStatus;
  detail: string;
  /** هل النواة جاهزة لتنفيذ الشيفرة */
  ready: boolean;
  /** ينفّذ شيفرة في نطاق هذا الدفتر */
  run: (code: string) => Promise<Omit<ExecutionResult, "executionCount">>;
  /** يبدأ التحميل يدوياً */
  preload: () => void;
  /** يمسح متغيّرات الدفتر */
  reset: () => Promise<void>;
  /** يوقف تنفيذاً معلّقاً */
  interrupt: () => void;
}

/**
 * يوفّر نواة بايثون لدفتر واحد. مفتاح النطاق يفصل متغيّرات كل دفتر عن غيره،
 * بينما تبقى النواة نفسها مشتركة فلا تُحمَّل أكثر من مرة في الجلسة.
 *
 * @param notebookKey مفتاح فريد للدفتر، عادةً `${track}/${slug}`
 * @param options.autoLoad يبدأ تحميل النواة فور تركيب المكوّن
 */
export function usePyodide(
  notebookKey: string,
  options: { autoLoad?: boolean } = {},
): UsePyodide {
  const { autoLoad = false } = options;
  const kernel = useRef<KernelManager | null>(null);
  const [status, setStatus] = useState<KernelStatus>("idle");
  const [detail, setDetail] = useState("لم تبدأ النواة بعد");

  if (kernel.current === null && typeof window !== "undefined") {
    kernel.current = getKernel();
  }

  useEffect(() => {
    const instance = kernel.current;
    if (!instance) return;

    setStatus(instance.status);
    setDetail(instance.detail);

    const unsubscribe = instance.subscribe((nextStatus, nextDetail) => {
      setStatus(nextStatus);
      setDetail(nextDetail);
    });

    if (autoLoad && instance.status === "idle") {
      instance.preload().catch(() => {
        /* الخطأ يُبلَّغ عبر حالة النواة */
      });
    }

    return unsubscribe;
  }, [autoLoad]);

  const run = useCallback(
    (code: string) => {
      const instance = kernel.current ?? getKernel();
      return instance.run(notebookKey, code);
    },
    [notebookKey],
  );

  const preload = useCallback(() => {
    const instance = kernel.current ?? getKernel();
    instance.preload().catch(() => {
      /* الخطأ يُبلَّغ عبر حالة النواة */
    });
  }, []);

  const reset = useCallback(async () => {
    const instance = kernel.current ?? getKernel();
    await instance.reset(notebookKey);
  }, [notebookKey]);

  const interrupt = useCallback(() => {
    const instance = kernel.current ?? getKernel();
    instance.interrupt();
  }, []);

  return {
    status,
    detail,
    ready: status === "ready" || status === "running",
    run,
    preload,
    reset,
    interrupt,
  };
}

/* ------------------------------------------------------------------ */
/* تلميحات عربية لأخطاء بايثون الشائعة                                 */
/* ------------------------------------------------------------------ */

const ERROR_HINTS: { match: RegExp; hint: string }[] = [
  { match: /^NameError/, hint: "اسم غير معرّف: تأكّد من تشغيل الخلايا السابقة أو من إملاء المتغيّر." },
  { match: /^IndentationError|unexpected indent/, hint: "خطأ إزاحة: استعمل أربع مسافات ثابتة داخل الكتلة الواحدة." },
  { match: /^SyntaxError/, hint: "خطأ نحوي: تحقّق من النقطتين «:» في نهاية السطر ومن إغلاق الأقواس." },
  { match: /^TypeError/, hint: "نوع غير متوافق: راجع أنواع القيم التي تمرّرها للدالة أو العملية." },
  { match: /^IndexError/, hint: "فهرس خارج النطاق: تذكّر أن الترقيم يبدأ من الصفر." },
  { match: /^KeyError/, hint: "مفتاح غير موجود في القاموس: تحقّق من اسم المفتاح." },
  { match: /^ZeroDivisionError/, hint: "قسمة على صفر: تحقّق من المقام قبل القسمة." },
  { match: /^ModuleNotFoundError|^ImportError/, hint: "حزمة غير متوفرة في النواة: المتاح هو numpy و matplotlib والمكتبة القياسية." },
  { match: /^AttributeError/, hint: "خاصية غير موجودة: تأكّد من نوع الكائن ومن اسم الدالة." },
  { match: /^ValueError/, hint: "قيمة غير صالحة: راجع الأبعاد أو صيغة القيمة الممرّرة." },
];

/** يعيد تلميحاً عربياً مناسباً لنوع الخطأ، أو null إن لم يوجد. */
export function arabicErrorHint(errorType: string): string | null {
  const found = ERROR_HINTS.find((entry) => entry.match.test(errorType));
  return found ? found.hint : null;
}
