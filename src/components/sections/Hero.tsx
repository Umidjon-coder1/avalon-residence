import { getImageProps } from "next/image";
import { preload } from "react-dom";
import { useTranslations } from "next-intl";
import { site } from "@/content/site";
import { ConsultCta } from "@/components/lead/ConsultCta";
import { Heading } from "@/components/ui/Heading";
import { THome, TInstagramCircle, TParking, TTelegramCircle } from "@/components/ui/tilda-icons";
import { HeroMotion } from "@/components/motion/HeroMotion";
import heroDesktop from "../../../public/images/hero/hero-02.webp";
import heroMobile from "../../../public/images/hero/hero-05.png";

const badgeIcons = [THome, TParking];

const socialIcon =
  "block size-10 rounded-full text-cream shadow-icon transition-transform hover:scale-105";

/**
 * Bosh ekran (Figma 1-blok, T2.1). Sahifa chetidan 10 px ichkarida yumaloq karta, barcha ekranlarda to'liq balandlik.
 * Mobilda portret rasm (Tilda mobil versiyasidagi), desktopda keng rasm.
 */
export function Hero() {
  const t = useTranslations("hero");
  const tCta = useTranslations("cta");
  const ts = useTranslations("social");
  const badges = t.raw("badges") as string[];

  // LCP rasmi: <picture> brauzerga faqat bitta manbani yuklatadi, shuning uchun "eager" xavfsiz
  const common = {
    alt: "",
    sizes: "100vw",
    quality: 90,
    fetchPriority: "high" as const,
    loading: "eager" as const,
  };
  const {
    props: { srcSet: desktopSrcSet },
  } = getImageProps({ ...common, src: heroDesktop });
  const {
    props: { srcSet: mobileSrcSet, ...img },
  } = getImageProps({ ...common, src: heroMobile });

  // Ikkala variant ham <head> da oldindan yuklanadi, lekin `media` tufayli brauzer faqat bittasini oladi
  const desktopMedia = "(min-width: 768px)";
  preload(img.src, {
    as: "image",
    fetchPriority: "high",
    imageSrcSet: desktopSrcSet,
    imageSizes: "100vw",
    media: desktopMedia,
  });
  preload(img.src, {
    as: "image",
    fetchPriority: "high",
    imageSrcSet: mobileSrcSet,
    imageSizes: "100vw",
    media: "(max-width: 767.98px)",
  });

  return (
    <section className="p-[var(--frame-inset)]">
      <div className="relative isolate h-[max(560px,calc(100svh-2*var(--frame-inset)))] overflow-hidden rounded-card bg-navy">
        <picture>
          <source media={desktopMedia} srcSet={desktopSrcSet} />
          <source srcSet={mobileSrcSet} />
          {/* eslint-disable-next-line jsx-a11y/alt-text -- alt getImageProps dan keladi */}
          <img
            {...img}
            data-hero-image
            className="absolute inset-0 -z-10 size-full object-cover will-change-transform"
          />
        </picture>
        {/* Yuqori o'ngdan pastki chapga yengil qora gradient: rasm yorug' qoladi, matn o'qiladi */}
        <div
          aria-hidden
          className="absolute inset-0 -z-10 bg-[linear-gradient(217deg,transparent_35%,rgb(0_0_0/0.45))]"
        />

        <div className="flex h-full flex-col justify-end px-[calc(var(--gutter)-var(--frame-inset))] pb-[clamp(32px,6.25vw,120px)]">
          <ul className="flex flex-wrap gap-4">
            {badges.map((badge, i) => {
              const Icon = badgeIcons[i] ?? THome;
              return (
                <li
                  key={badge}
                  data-hero="badge"
                  className="flex h-10 items-center gap-2.5 rounded-pill bg-black/20 pr-5 pl-4 text-body text-white backdrop-blur-glass"
                >
                  <Icon className="size-6 text-gold-alt" />
                  {badge}
                </li>
              );
            })}
          </ul>

          <Heading
            as="h1"
            size="display"
            data-hero="title"
            className="mt-4 max-w-[760px] text-balance text-white"
          >
            {t("title")}
          </Heading>

          <div data-hero="cta" className="mt-[clamp(24px,2.0833vw,40px)]">
            <ConsultCta source="hero" variant="cream" label={tCta("consult")} />
          </div>
        </div>

        {/* Ijtimoiy tarmoqlar: o'ng chetda vertikal */}
        <ul className="absolute right-[calc(var(--gutter)-var(--frame-inset))] bottom-[clamp(32px,6.25vw,120px)] hidden flex-col gap-4 md:flex">
          <li data-hero="social">
            <a href={site.instagram} target="_blank" rel="noopener" className={socialIcon}>
              <TInstagramCircle className="size-full" />
              <span className="sr-only">{ts("instagram")}</span>
            </a>
          </li>
          <li data-hero="social">
            <a href={site.telegram} target="_blank" rel="noopener" className={socialIcon}>
              <TTelegramCircle className="size-full" />
              <span className="sr-only">{ts("telegram")}</span>
            </a>
          </li>
        </ul>
      </div>
      <HeroMotion />
    </section>
  );
}
