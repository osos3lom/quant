/**
 * lib/use-progress.ts
 * خُطّاف React لقراءة التقدّم المحفوظ محلياً بأمان مع التصيير على الخادم.
 */
"use client";

import { useEffect, useState, useSyncExternalStore } from "react";
import type { ProgressState } from "@/types/quantum";
import { getServerSnapshot, getSnapshot, subscribe } from "./progress";

/** يعيد حالة التقدّم الحالية ويعيد التصيير عند أي تغيير. */
export function useProgress(): ProgressState {
  return useSyncExternalStore(subscribe, getSnapshot, getServerSnapshot);
}

/**
 * يمنع اختلاف التصيير بين الخادم والعميل (hydration mismatch)
 * عند عرض بيانات مصدرها localStorage.
 */
export function useMounted(): boolean {
  const [mounted, setMounted] = useState(false);
  useEffect(() => setMounted(true), []);
  return mounted;
}
