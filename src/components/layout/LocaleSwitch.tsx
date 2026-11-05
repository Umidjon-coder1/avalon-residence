import { useLocale, useTranslations } from "next-intl";
import { routing } from "@/i18n/routing";
import { cn } from "@/lib/cn";

/**
 * Boshqa tilga o'tish havolasi: uz sahifada "RU", ru sahifada "Узб".
 * Oddiy `<a>`: til almashganda root layout boshqa bo'ladi, baribir to'liq yuklanadi.
 * uz uchun prefikssiz `/`, shunda ortiqcha 307 yo'naltirish bo'lmaydi.
 */
export function LocaleSwitch({ className }: { className?: string }) {
  const t = useTranslations("nav");
  const locale = useLocale();
  const target = locale === "ru" ? "uz" : "ru";
  return (
    <a
      href={target === routing.defaultLocale ? "/" : `/${target}`}
      hrefLang={target}
      className={cn(className)}
    >
      {t("switchLocale")}
    </a>
  );
}
