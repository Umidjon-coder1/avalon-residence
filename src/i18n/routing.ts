import { defineRouting } from "next-intl/routing";

/**
 * D3: `/` o'zbekcha, `/ru` ruscha. Tilda'dagi manzillar saqlanadi.
 * Brauzer tili bo'yicha avtomatik yo'naltirish yo'q: reklama havolasi qaysi tilga olib borsa, o'sha ochiladi.
 */
export const routing = defineRouting({
  locales: ["uz", "ru"],
  defaultLocale: "uz",
  localePrefix: "as-needed",
  localeDetection: false,
});

export type Locale = (typeof routing.locales)[number];
