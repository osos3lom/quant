/**
 * app/not-found.tsx
 * صفحة 404 بالعربية — تُصدَّر إلى out/404.html وتستعملها استضافة Firebase تلقائياً.
 */
import Link from "next/link";
import { Compass } from "lucide-react";

export default function NotFound() {
  return (
    <div className="mx-auto flex max-w-xl flex-col items-center px-4 py-24 text-center">
      <span className="mb-5 flex h-14 w-14 items-center justify-center rounded-2xl bg-slate-900 text-white dark:bg-gold-400 dark:text-brand-950">
        <Compass className="h-7 w-7" />
      </span>
      <h1 className="text-2xl font-extrabold text-slate-900 dark:text-white">
        الصفحة غير موجودة
      </h1>
      <p className="mt-2 text-sm text-slate-600 dark:text-slate-400">
        ربما انهارت هذه الصفحة إلى حالة أخرى عند القياس. لنعُد إلى نقطة معلومة.
      </p>
      <Link
        href="/exercises"
        className="mt-6 rounded-xl bg-slate-900 px-6 py-3 text-sm font-semibold text-white transition hover:bg-slate-700 dark:bg-gold-400 dark:text-brand-950 dark:hover:bg-gold-300"
      >
        تصفّح التمارين
      </Link>
    </div>
  );
}
