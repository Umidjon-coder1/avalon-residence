import type { CSSProperties } from "react";
import Image, { type StaticImageData } from "next/image";
import { useTranslations } from "next-intl";
import { ConsultButton } from "@/components/lead/ConsultButton";
import { ConsultCta } from "@/components/lead/ConsultCta";
import { Container } from "@/components/ui/Container";
import { SectionIntro } from "@/components/ui/SectionIntro";
import { TArrowDownRight } from "@/components/ui/tilda-icons";
import { ZonesMotion } from "@/components/motion/ZonesMotion";
import { cn } from "@/lib/cn";
import courtyard from "../../../public/images/zones/zone-courtyard-full.webp";
import green from "../../../public/images/zones/zone-green-full.webp";
import kids from "../../../public/images/zones/zone-kids-full.webp";
import cinema from "../../../public/images/zones/zone-cinema-full.webp";
import guest from "../../../public/images/zones/zone-guest-full.webp";
import parking from "../../../public/images/zones/zone-parking-full.webp";
import iconCourtyard from "../../../public/images/zones/zones-06.svg";
import iconGreen from "../../../public/images/zones/zones-05.svg";
import iconKids from "../../../public/images/zones/zones-03.svg";
import iconCinema from "../../../public/images/zones/zones-04.svg";
import iconGuest from "../../../public/images/zones/zones-02.svg";
import iconParking from "../../../public/images/zones/zones-01.svg";

type Zone = { title: string; text: string };

/** `zones.items` tartibi bilan bir xil. Rasmlar: muallif renderlari (2026-11-05), har biri butun slaydni egallaydi */
/**
 * `focus`: telefonda (tor, baland kadr) rasmning qaysi gorizontal qismi ko'rinadi. Har bir hudud mavzusiga
 * qaratilgan: hovlida suhbatlashayotganlar, bolalar maydonida karusel, kinoda tomoshabinlar va h.k.
 */
const media: Array<{ photo: StaticImageData; icon: StaticImageData; focus: string }> = [
  { photo: courtyard, icon: iconCourtyard, focus: "27%" },
  { photo: green, icon: iconGreen, focus: "50%" },
  { photo: kids, icon: iconKids, focus: "55%" },
  { photo: cinema, icon: iconCinema, focus: "62%" },
  { photo: guest, icon: iconGuest, focus: "60%" },
  { photo: parking, icon: iconParking, focus: "68%" },
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
  const { photo, icon, focus } = media[index] ?? media[0];
  return (
    <li
      data-zone
      className="sticky top-[var(--frame-inset)] h-[max(560px,calc(100svh-2*var(--frame-inset)))] pb-[var(--frame-inset)]"
    >
      <article
        data-zone-card
        className="relative isolate flex h-full overflow-hidden rounded-card bg-navy text-white shadow-[0_-30px_60px_-20px_rgb(0_0_0/0.55)]"
      >
        {/* Fon: desktopda butun slayd bo'ylab; telefonda yuqori qismda (mavzu matn ostida qolmasin),
            matn uning ostida navy fonda. Scroll'da sekin siljiydi (ZonesMotion) */}
        <Image
          data-zone-bg
          src={photo}
          alt=""
          // Telefonda keng rasm ekran balandligi bo'yicha qoplaydi: kerakli kenglik ~1.8 x balandlik
          sizes="(min-width: 1024px) 100vw, 180vh"
          quality={90}
          style={{ "--focus": `${focus} 50%` } as CSSProperties}
          className="absolute inset-x-0 top-0 -z-20 h-[64%] w-full scale-105 object-cover object-[var(--focus)] lg:inset-0 lg:h-full lg:object-center"
        />
        <div
          aria-hidden
          className="absolute inset-0 -z-10 bg-[linear-gradient(to_bottom,rgb(11_34_57/0.4),transparent_16%,transparent_44%,rgb(11_34_57)_64%)] lg:bg-[linear-gradient(90deg,rgb(11_34_57/0.88),rgb(11_34_57/0.5)_40%,rgb(11_34_57/0.05)_75%),linear-gradient(to_bottom,rgb(11_34_57/0.35),transparent_25%,transparent_70%,rgb(11_34_57/0.55))]"
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

          <div>
            <Image src={icon} alt="" className="size-[clamp(40px,2.9vw,56px)]" />
            <h3
              data-zone-title
              className="mt-5 font-heading text-h2 font-medium text-balance uppercase"
            >
              {zone.title}
            </h3>
            <p className="mt-4 max-w-[560px] text-lead text-white/85">{zone.text}</p>

            {/* Tugma matn ostida (muallif: matn va tugma bir guruh bo'lsin) */}
            <div className="mt-[clamp(24px,2.0833vw,40px)] flex flex-wrap items-center justify-between gap-6">
              <ConsultButton
                source="zones"
                className="inline-flex h-[clamp(48px,3.3333vw,64px)] cursor-pointer items-center gap-4 rounded-card border border-white/40 pr-2 pl-6 font-heading text-btn font-medium uppercase transition-colors hover:border-white hover:bg-white hover:text-navy"
              >
                {cta}
                <span className="grid size-[clamp(36px,2.5vw,48px)] place-items-center rounded-[8px] bg-gold text-white">
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
        </div>
      </article>
    </li>
  );
}

/**
 * "Faoliyat hududlari" (Figma 6-blok). Intro, keyin har bir hudud ekran balandligidagi katta rasmli slayd:
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
