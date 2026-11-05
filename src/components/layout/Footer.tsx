import Image from "next/image";
import { useTranslations } from "next-intl";
import { site } from "@/content/site";
import { navItems } from "@/content/nav";
import { Container } from "@/components/ui/Container";
import { ArrowUpIcon, InstagramIcon, TelegramIcon } from "@/components/ui/icons";
import logoFooter from "../../../public/images/brand/logo-footer.webp";

const socialCircle =
  "grid size-[clamp(56px,4.1667vw,80px)] place-items-center rounded-full bg-gold text-ink transition-colors hover:bg-gold-alt";

/**
 * Footer (T1.6). Figma 10-blok: logo, menyu, "Yuqoriga"; chiziq; manzil, ijtimoiy tarmoqlar, ish soatlari; ©.
 * Matnlar Tilda'dan (D2): ish soati faqat Du-Ju, YouTube havolasi yo'q.
 */
export function Footer() {
  const t = useTranslations("nav");
  const tc = useTranslations("contacts");
  const ts = useTranslations("social");
  const hours = tc.raw("hours") as string[];

  return (
    <footer className="bg-ink text-white">
      <Container>
        <div className="px-[clamp(0px,2.0833vw,40px)] pt-[clamp(40px,4.1667vw,80px)] pb-[clamp(32px,2.9167vw,56px)]">
          {/* 1-qator */}
          <div className="flex flex-wrap items-center justify-between gap-x-10 gap-y-8 border-b border-ink-line pb-[clamp(24px,1.5625vw,30px)]">
            <Image
              src={logoFooter}
              alt={site.name}
              sizes="240px"
              className="h-auto w-[clamp(180px,12.5vw,240px)]"
            />
            <nav aria-label={t("menu")} className="order-last w-full lg:order-none lg:w-auto">
              <ul className="flex flex-wrap gap-x-[clamp(24px,2.0833vw,40px)] gap-y-3">
                {navItems.map((item) => (
                  <li key={item.key}>
                    <a
                      href={item.href}
                      className="text-body font-medium transition-colors hover:text-gold"
                    >
                      {t(item.key)}
                    </a>
                  </li>
                ))}
              </ul>
            </nav>
            <a href="#top" className="group flex items-center gap-6 text-body text-cream">
              {t("toTop")}
              <span className="grid size-[clamp(56px,4.1667vw,80px)] place-items-center rounded-full bg-gold text-white transition-colors group-hover:bg-gold-alt">
                <ArrowUpIcon className="size-[clamp(28px,2.0833vw,40px)]" />
              </span>
            </a>
          </div>

          {/* 2-qator */}
          <div className="grid gap-10 pt-[clamp(40px,3.9583vw,76px)] md:grid-cols-3 md:items-center">
            <address className="flex flex-col gap-5 text-body not-italic">
              <p className="font-light">{tc("officeText")}</p>
              <p className="max-w-[420px] leading-normal font-medium uppercase">{tc("address")}</p>
              <p className="font-light">{tc("builder")}</p>
            </address>

            <div className="flex gap-10 md:justify-center">
              <a href={site.instagram} target="_blank" rel="noopener" className={socialCircle}>
                <InstagramIcon className="size-1/2" />
                <span className="sr-only">{ts("instagram")}</span>
              </a>
              <a href={site.telegram} target="_blank" rel="noopener" className={socialCircle}>
                <TelegramIcon className="size-1/2" />
                <span className="sr-only">{ts("telegram")}</span>
              </a>
            </div>

            <div className="text-body uppercase md:text-right">
              <p className="font-light">{tc("hoursLabel")}</p>
              <p className="mt-4 leading-normal font-medium">
                {hours.map((line) => (
                  <span key={line} className="block">
                    {line}
                  </span>
                ))}
              </p>
            </div>
          </div>

          <p className="mt-[clamp(40px,3.9583vw,76px)] text-caption font-light">
            {tc("copyright")}
          </p>
        </div>
      </Container>
    </footer>
  );
}
