import { getImageProps } from "next/image";
import { useTranslations } from "next-intl";
import { site } from "@/content/site";
import { ConsultButton } from "@/components/lead/ConsultButton";
import { buttonStyles } from "@/components/ui/Button";
import { Heading } from "@/components/ui/Heading";
import {
  ArrowDownRightIcon,
  HomeIcon,
  InstagramIcon,
  ParkingIcon,
  TelegramIcon,
} from "@/components/ui/icons";
import heroDesktop from "../../../public/images/hero/hero-02.webp";
import heroMobile from "../../../public/images/hero/hero-05.png";

const badgeIcons = [HomeIcon, ParkingIcon];

const socialIcon =
  "grid size-10 place-items-center rounded-full bg-cream text-navy shadow-icon transition-transform hover:scale-105";

/**
 * Bosh ekran (Figma 1-blok, T2.1). Sahifa chetidan 10 px ichkarida yumaloq karta.
 * Mobilda portret rasm (Tilda mobil versiyasidagi), desktopda keng rasm.
 */
export function Hero() {
  const t = useTranslations("hero");
  const tCta = useTranslations("cta");
  const ts = useTranslations("social");
  const badges = t.raw("badges") as string[];

  const common = { alt: "", sizes: "100vw", fetchPriority: "high" as const };
  const {
    props: { srcSet: desktopSrcSet },
  } = getImageProps({ ...common, src: heroDesktop });
  const {
    props: { srcSet: mobileSrcSet, ...img },
  } = getImageProps({ ...common, src: heroMobile });

  return (
    <section className="p-[var(--frame-inset)]">
      <div className="relative isolate h-[max(560px,calc(100svh-2*var(--frame-inset)))] overflow-hidden rounded-card bg-navy lg:h-[clamp(600px,50vw,960px)]">
        <picture>
          <source media="(min-width: 768px)" srcSet={desktopSrcSet} />
          <source srcSet={mobileSrcSet} />
          {/* eslint-disable-next-line jsx-a11y/alt-text -- alt getImageProps dan keladi */}
          <img {...img} className="absolute inset-0 -z-10 size-full object-cover" />
        </picture>
        {/* Figma: yuqori o'ngdan pastki chapga 0 -> 60% qora gradient */}
        <div
          aria-hidden
          className="absolute inset-0 -z-10 bg-[linear-gradient(217deg,transparent,rgb(0_0_0/0.6))]"
        />

        <div className="flex h-full flex-col justify-end px-[calc(var(--gutter)-var(--frame-inset))] pb-[clamp(32px,6.25vw,120px)]">
          <ul className="flex flex-wrap gap-4">
            {badges.map((badge, i) => {
              const Icon = badgeIcons[i] ?? HomeIcon;
              return (
                <li
                  key={badge}
                  className="flex h-10 items-center gap-2.5 rounded-pill bg-black/20 pr-5 pl-4 text-body text-white backdrop-blur-glass"
                >
                  <Icon className="size-6 text-gold-alt" />
                  {badge}
                </li>
              );
            })}
          </ul>

          <Heading as="h1" size="display" className="mt-4 max-w-[681px] text-white">
            {t("title")}
          </Heading>

          <ConsultButton
            source="hero"
            className="group mt-[clamp(24px,2.0833vw,40px)] flex w-full max-w-[400px] cursor-pointer sm:w-auto"
          >
            <span className={buttonStyles("cream", "flex-1 group-hover:bg-white sm:flex-none")}>
              {tCta("consult")}
            </span>
            <span className="grid aspect-square h-[clamp(56px,4.1667vw,80px)] place-items-center rounded-btn bg-cream text-navy transition-colors group-hover:bg-white">
              <ArrowDownRightIcon className="size-[clamp(28px,2.0833vw,40px)] transition-transform group-hover:translate-x-0.5 group-hover:translate-y-0.5" />
            </span>
          </ConsultButton>
        </div>

        {/* Ijtimoiy tarmoqlar: o'ng chetda vertikal */}
        <ul className="absolute right-[calc(var(--gutter)-var(--frame-inset))] bottom-[clamp(32px,6.25vw,120px)] hidden flex-col gap-4 md:flex">
          <li>
            <a href={site.instagram} target="_blank" rel="noopener" className={socialIcon}>
              <InstagramIcon className="size-6" />
              <span className="sr-only">{ts("instagram")}</span>
            </a>
          </li>
          <li>
            <a href={site.telegram} target="_blank" rel="noopener" className={socialIcon}>
              <TelegramIcon className="size-6" />
              <span className="sr-only">{ts("telegram")}</span>
            </a>
          </li>
        </ul>
      </div>
    </section>
  );
}
