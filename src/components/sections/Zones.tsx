import Image, { type StaticImageData } from "next/image";
import { useTranslations } from "next-intl";
import { ConsultButton } from "@/components/lead/ConsultButton";
import { ConsultCta } from "@/components/lead/ConsultCta";
import { Container } from "@/components/ui/Container";
import { SectionIntro } from "@/components/ui/SectionIntro";
import { TArrowDownRight } from "@/components/ui/tilda-icons";
import { ZonesMotion } from "@/components/motion/ZonesMotion";
import { cn } from "@/lib/cn";
import courtyard from "../../../public/images/zones/zone-courtyard.webp";
import green from "../../../public/images/zones/zone-green.webp";
import kids from "../../../public/images/zones/zone-kids.webp";
import cinema from "../../../public/images/zones/zone-cinema.webp";
import guest from "../../../public/images/zones/zone-guest.webp";
import parking from "../../../public/images/zones/zone-parking.webp";
import iconCourtyard from "../../../public/images/zones/zones-06.svg";
import iconGreen from "../../../public/images/zones/zones-05.svg";
import iconKids from "../../../public/images/zones/zones-03.svg";
import iconCinema from "../../../public/images/zones/zones-04.svg";
import iconGuest from "../../../public/images/zones/zones-02.svg";
import iconParking from "../../../public/images/zones/zones-01.svg";

type Zone = { title: string; text: string };

/** `zones.items` tartibi bilan bir xil (Tilda) */
const media: Array<{ photo: StaticImageData; icon: StaticImageData }> = [
  { photo: courtyard, icon: iconCourtyard },
  { photo: green, icon: iconGreen },
  { photo: kids, icon: iconKids },
  { photo: cinema, icon: iconCinema },
  { photo: guest, icon: iconGuest },
  { photo: parking, icon: iconParking },
];

const pad = (n: number) => String(n).padStart(2, "0");

function ZoneSlide({
  zone,
  index,
  total,
  eyebrow,
  cta,
}: {
  zone: Zone;
  index: number;
  total: number;
  eyebrow: string;
  cta: string;
}) {
  const { photo, icon } = media[index] ?? media[0];
  return (
    <li
      data-zone
      className="sticky top-[var(--frame-inset)] h-[max(560px,calc(100svh-2*var(--frame-inset)))] pb-[var(--frame-inset)]"
    >
      <article
        data-zone-card
        className="relative isolate flex h-full overflow-hidden rounded-card bg-navy text-white shadow-[0_-30px_60px_-20px_rgb(0_0_0/0.55)]"
      >
        {/* Fon: mobilda rasm o'zi, desktopda xira va yumshoq (o'ngda aniq rasm kartasi bor) */}
        <Image
          data-zone-bg
          src={photo}
          alt=""
          sizes="100vw"
          className="absolute inset-0 -z-20 size-full scale-110 object-cover lg:opacity-90 lg:blur-xl"
        />
        <div
          aria-hidden
          className="absolute inset-0 -z-10 bg-[linear-gradient(to_bottom,rgb(11_34_57/0.35),rgb(11_34_57/0.15)_30%,rgb(11_34_57/0.92)_72%)] lg:bg-[linear-gradient(90deg,rgb(11_34_57/0.92),rgb(11_34_57/0.55)_50%,rgb(11_34_57/0.15))]"
        />

        {/* Keyingi slayd ustiga chiqqanda qorayish (ZonesMotion) */}
        <div
          aria-hidden
          data-zone-shade
          className="pointer-events-none absolute inset-0 z-10 bg-black opacity-0"
        />

        <div className="flex flex-1 flex-col justify-between gap-8 p-[clamp(20px,3vw,56px)]">
          <div className="flex items-center justify-between font-heading text-btn tracking-wide uppercase">
            <span className="text-gold">{eyebrow}</span>
            <span className="text-white/60 tabular-nums">
              <b className="font-medium text-white">{pad(index + 1)}</b> / {pad(total)}
            </span>
          </div>

          <div className="lg:grid lg:grid-cols-[minmax(0,1fr)_auto] lg:items-end lg:gap-[clamp(40px,5vw,96px)]">
            <div>
              <Image src={icon} alt="" className="size-[clamp(40px,3.3vw,64px)]" />
              <h3
                data-zone-title
                className="mt-6 font-heading text-[clamp(44px,6.7vw,128px)] leading-[0.92] font-medium tracking-[-0.02em] text-balance uppercase"
              >
                {zone.title}
              </h3>
              <p className="mt-[clamp(16px,1.6vw,28px)] max-w-[560px] text-lead text-white/85">
                {zone.text}
              </p>
            </div>
            <Image
              data-zone-photo
              src={photo}
              alt=""
              sizes="(min-width: 1024px) 34vw, 1px"
              className="hidden aspect-[625/600] w-[clamp(320px,30vw,560px)] rounded-card object-cover shadow-icon lg:block"
            />
          </div>

          <div className="flex flex-wrap items-center justify-between gap-6">
            <ConsultButton
              source="zones"
              className="inline-flex h-12 cursor-pointer items-center gap-3 rounded-pill border border-white/40 pr-2 pl-6 font-heading text-btn font-medium uppercase transition-colors hover:border-gold hover:bg-gold"
            >
              {cta}
              <span className="grid size-9 place-items-center rounded-full bg-gold text-white">
                <TArrowDownRight className="size-5" />
              </span>
            </ConsultButton>
            <span aria-hidden className="flex items-center gap-2">
              {Array.from({ length: total }, (_, i) => (
                <i
                  key={i}
                  className={cn(
                    "block h-0.5 rounded-full",
                    i === index ? "w-11 bg-gold" : "w-5 bg-white/35",
                  )}
                />
              ))}
            </span>
          </div>
        </div>
      </article>
    </li>
  );
}

/**
 * "Faoliyat hududlari" (Figma 6-blok). Intro, keyin har bir hudud ekran balandligidagi katta slayd:
 * slaydlar `sticky` bo'lib, keyingisi oldingisining ustiga chiqadi (stack). Orqada qolgan slayd
 * biroz kichrayib qorayadi (ZonesMotion). JS siz ham stack ishlaydi, faqat effektlarsiz.
 */
export function Zones() {
  const t = useTranslations("zones");
  const tCta = useTranslations("cta");
  const zones = t.raw("items") as Zone[];

  return (
    <section id="faoliyathududlari" className="mt-section">
      <Container className="lg:flex lg:items-end lg:justify-between lg:gap-10">
        <SectionIntro title={t("title")} text={t("text")} className="max-w-[640px]" />
        <ConsultCta
          source="zones"
          variant="gold"
          label={tCta("consult")}
          className="mt-8 lg:mt-0"
        />
      </Container>

      <ol className="mt-[clamp(32px,3.3vw,64px)] px-[var(--frame-inset)]">
        {zones.map((zone, i) => (
          <ZoneSlide
            key={zone.title}
            zone={zone}
            index={i}
            total={zones.length}
            eyebrow={t("title")}
            cta={tCta("consult")}
          />
        ))}
      </ol>
      <ZonesMotion />
    </section>
  );
}
