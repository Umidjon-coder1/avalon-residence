import type { MetadataRoute } from "next";
import { site } from "@/content/site";

/**
 * Faqat asosiy domen indekslanadi. Vercel preview va *.vercel.app manzillari
 * qidiruvga tushmasligi uchun production'dan boshqa joyda hammasi yopiq.
 */
export default function robots(): MetadataRoute.Robots {
  const isProduction = process.env.VERCEL_ENV === "production" || !process.env.VERCEL_ENV;
  return isProduction
    ? {
        rules: { userAgent: "*", allow: "/", disallow: "/api/" },
        sitemap: `${site.url}/sitemap.xml`,
      }
    : { rules: { userAgent: "*", disallow: "/" } };
}
