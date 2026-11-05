import { useLocale, useTranslations } from "next-intl";
import { site } from "@/content/site";
import { cn } from "@/lib/cn";
import { TMapPin } from "./tilda-icons";
import { YandexMap } from "./YandexMap";

const { lat, lng } = site.map;
/** Yandex: mashinada yo'nalish, boshlanish nuqtasi foydalanuvchining joylashuvi */
const routeHref = `https://yandex.uz/maps/?rtext=~${lat}%2C${lng}&rtt=auto`;

/**
 * Premium xarita (T4.5, kenesary-qs.kz namunasi): kulrang Yandex xarita, brend belgisi (olmos shaklida logo),
 * pastda manzil kartasi, "Qanday borish" va "Xaritada ochish" tugmalari. Xaritaning o'zi: `YandexMap`.
 */
export function PremiumMap({ className }: { className?: string }) {
  const t = useTranslations("location");
  const locale = useLocale();
  const lang = locale === "ru" ? "ru_RU" : "uz_UZ";

  return (
    <div
      className={cn(
        "relative isolate flex flex-col overflow-hidden rounded-card border border-gold bg-white",
        className,
      )}
    >
      <div className="relative min-h-[340px] flex-1">
        <YandexMap lang={lang} title={t("mapTitle")} className="absolute inset-0 size-full" />
        {/* Chetlari biroz qoraytiriladi: e'tibor markazga */}
        <div
          aria-hidden
          className="pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_at_center,transparent_45%,rgb(11_34_57/0.28))]"
        />
      </div>

      {/* Manzil kartasi: mobilda xarita ostida (belgini yopmasin), kattaroq ekranda xarita ustida */}
      <div className="flex flex-col gap-4 p-5 sm:absolute sm:bottom-5 sm:left-5 sm:max-w-[420px] sm:rounded-card sm:bg-white/90 sm:p-6 sm:shadow-soft sm:backdrop-blur-glass">
        <div>
          <p className="font-heading text-h3 font-medium text-navy uppercase">{site.name}</p>
          <p className="mt-1 text-body leading-snug text-navy/80">{t("address")}</p>
        </div>
        <div className="flex flex-wrap gap-3">
          <a
            href={routeHref}
            target="_blank"
            rel="noopener"
            className="inline-flex h-[clamp(52px,3.3333vw,64px)] flex-1 items-center justify-center gap-2 rounded-card bg-gold px-5 font-heading text-btn font-medium whitespace-nowrap text-white uppercase transition-colors hover:bg-gold-light"
          >
            <TMapPin className="size-6" />
            {t("route")}
          </a>
          <a
            href={site.map.yandex}
            target="_blank"
            rel="noopener"
            className="inline-flex h-[clamp(52px,3.3333vw,64px)] flex-1 items-center justify-center rounded-card border border-gold px-5 font-heading text-btn font-medium whitespace-nowrap text-gold uppercase transition-colors hover:bg-gold hover:text-white"
          >
            {t("openMap")}
          </a>
        </div>
      </div>
    </div>
  );
}
