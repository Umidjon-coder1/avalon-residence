import Image from "next/image";
import { useLocale, useTranslations } from "next-intl";
import { site } from "@/content/site";
import { cn } from "@/lib/cn";
import { TMapPin } from "./tilda-icons";
import logoMark from "../../../public/images/brand/logo-mark.webp";

const { lat, lng } = site.map;
/** Yandex: mashinada yo'nalish, boshlanish nuqtasi foydalanuvchining joylashuvi */
const routeHref = `https://yandex.uz/maps/?rtext=~${lat}%2C${lng}&rtt=auto`;

/**
 * Premium xarita (T4.5): kulrang Yandex xarita, markazda brend belgisi (olmos shaklida logo),
 * pastda manzil kartasi va "Qanday borish" tugmasi. API kaliti kerak emas (map-widget iframe).
 * Xarita sahifa scroll'ini ushlamasligi uchun bosilmaydi; to'liq xarita tugma orqali ochiladi.
 */
export function PremiumMap({ className }: { className?: string }) {
  const t = useTranslations("location");
  const locale = useLocale();
  const lang = locale === "ru" ? "ru_RU" : "uz_UZ";

  return (
    <div
      className={cn(
        "relative isolate min-h-[440px] overflow-hidden rounded-card border border-gold bg-sand",
        className,
      )}
    >
      <iframe
        src={`https://yandex.uz/map-widget/v1/?ll=${lng}%2C${lat}&z=16&lang=${lang}&controls=`}
        title={t("mapTitle")}
        loading="lazy"
        tabIndex={-1}
        aria-hidden
        className="pointer-events-none absolute inset-0 -z-10 size-full border-0 grayscale-[0.9] sepia-[0.12]"
      />
      {/* Chetlari biroz qoraytiriladi: e'tibor markazga */}
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0 -z-10 bg-[radial-gradient(ellipse_at_center,transparent_45%,rgb(11_34_57/0.28))]"
      />

      {/* Brend belgisi: olmos, ichida logo, atrofida to'lqin */}
      <div aria-hidden className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-full">
        <div className="relative grid size-[clamp(64px,4.6vw,88px)] place-items-center">
          <span className="absolute inset-[18%] rotate-45 rounded-[10px] bg-gold/40 motion-safe:animate-[widget-ping_2.6s_ease-out_infinite]" />
          <span className="absolute inset-[12%] rotate-45 rounded-[12px] bg-gold shadow-icon" />
          <Image src={logoMark} alt="" sizes="56px" className="relative size-[56%] rounded-[8px]" />
        </div>
        {/* Uchi aniq nuqtaga tushadi */}
        <span className="mx-auto -mt-[clamp(8px,0.6vw,12px)] block size-3 rotate-45 bg-gold" />
      </div>

      {/* Manzil kartasi */}
      <div className="absolute inset-x-3 bottom-3 flex flex-col gap-4 rounded-card bg-white/90 p-5 shadow-soft backdrop-blur-glass sm:inset-x-auto sm:bottom-5 sm:left-5 sm:max-w-[420px] sm:p-6">
        <div>
          <p className="font-heading text-h3 font-medium text-navy uppercase">{site.name}</p>
          <p className="mt-1 text-body leading-snug text-navy/80">{t("address")}</p>
        </div>
        <div className="flex flex-wrap gap-3">
          <a
            href={routeHref}
            target="_blank"
            rel="noopener"
            className="inline-flex h-[clamp(52px,3.3333vw,64px)] flex-1 items-center justify-center gap-2 rounded-card bg-gold px-5 font-heading text-btn font-medium whitespace-nowrap text-white uppercase transition-colors hover:bg-gold-dark"
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
