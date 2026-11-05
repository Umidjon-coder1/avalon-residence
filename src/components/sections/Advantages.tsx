import Image from "next/image";
import { useTranslations } from "next-intl";
import { ConsultCta } from "@/components/lead/ConsultCta";
import { Container } from "@/components/ui/Container";
import { Heading } from "@/components/ui/Heading";
import { CarParkIcon, CinemaIcon, FaceIdIcon, QuakeHouseIcon } from "@/components/ui/icons";
import photo from "../../../public/images/advantages/advantages-01.webp";

/** `features` tartibi bilan bir xil: kirish nazorati, parking, kinoteatr, seysmik */
const featureIcons = [FaceIdIcon, CarParkIcon, CinemaIcon, QuakeHouseIcon];

/**
 * "Afzalliklari detallarda!" (Figma 3-blok). Chapda 1080x800 rasm, ustiga 192 px kirib turgan oltin karta.
 * Raqamlar 2 ustunda: chap ustun chapga, o'ng ustun o'ngga tekislangan.
 */
export function Advantages() {
  const t = useTranslations("advantages");
  const tCta = useTranslations("cta");
  const stats = t.raw("stats") as string[];
  const features = t.raw("features") as string[];

  return (
    <section className="mt-[clamp(32px,2.0833vw,40px)]">
      <Container>
        <div className="grid lg:grid-cols-[minmax(0,888fr)_minmax(0,192fr)_minmax(0,648fr)] lg:items-center">
          <Image
            src={photo}
            alt=""
            sizes="(min-width: 1024px) 57vw, 100vw"
            className="aspect-[1080/800] w-full rounded-card object-cover lg:col-[1/3] lg:row-start-1"
          />
          <div className="relative -mt-10 rounded-card bg-gold px-[clamp(20px,3.3333vw,64px)] pt-[clamp(28px,2.0833vw,40px)] pb-[clamp(28px,2.0833vw,40px)] text-white lg:col-[2/4] lg:row-start-1 lg:mt-0">
            <Heading size="display">{t("title")}</Heading>
            <span aria-hidden className="mt-2 block h-px max-w-[680px] bg-cream" />

            <ul className="mt-[clamp(24px,2.1vw,40px)] grid grid-cols-1 gap-y-[clamp(16px,2.1vw,40px)] sm:grid-cols-[minmax(0,1fr)_auto] sm:gap-x-6">
              {stats.map((_, i) => (
                <li
                  key={i}
                  className={`text-lead leading-none text-cream ${i % 2 === 1 ? "sm:text-right" : ""}`}
                >
                  {t.rich(`stats.${i}`, {
                    b: (chunk) => (
                      <b className="mx-1 font-heading text-[clamp(28px,2.0833vw,40px)] font-medium text-white first:ml-0 last:mr-0">
                        {chunk}
                      </b>
                    ),
                  })}
                </li>
              ))}
            </ul>

            <ul className="mt-[clamp(24px,2.1vw,40px)] grid gap-y-8 sm:grid-cols-2 sm:gap-x-6">
              {features.map((feature, i) => {
                const Icon = featureIcons[i] ?? FaceIdIcon;
                return (
                  <li key={feature} className="flex items-center gap-4 text-cream">
                    <Icon className="size-[clamp(44px,3.3333vw,64px)] shrink-0" />
                    <span className="max-w-[240px] text-lead leading-[1.3]">{feature}</span>
                  </li>
                );
              })}
            </ul>

            <ConsultCta
              source="advantages"
              variant="white"
              label={tCta("consult")}
              className="mt-[clamp(32px,3vw,56px)]"
            />
          </div>
        </div>
      </Container>
    </section>
  );
}
