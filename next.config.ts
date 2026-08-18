import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  /** تصدير ثابت بالكامل: يولّد HTML/CSS/JS داخل مجلد out بدون الحاجة لخادم Node. */
  output: "export",
  /** مطلوب مع التصدير الثابت لأن مُحسِّن الصور يحتاج خادماً. */
  images: { unoptimized: true },
  /** ينتج مسارات على شكل /exercises/slug/index.html وهو الأنسب لاستضافة Firebase. */
  trailingSlash: true,
  reactStrictMode: true,
};

export default nextConfig;
