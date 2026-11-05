import Image, { type StaticImageData } from "next/image";
import { useTranslations } from "next-intl";
import { ConsultCta } from "@/components/lead/ConsultCta";
import { Container } from "@/components/ui/Container";
import { SectionIntro } from "@/components/ui/SectionIntro";
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

function ZoneCard({ zone, index }: { zone: Zone; index: number }) {
  const { photo, icon } = media[index] ?? media[0];
  return (
    <li className="relative isolate aspect-[500/480] w-[82vw] shrink-0 snap-start overflow-hidden rounded-[25px] text-white sm:w-[420px] lg:w-full">
      <Image
        src={photo}
        alt=""
        sizes="(min-width: 1024px) 26vw, 82vw"
        className="absolute inset-0 -z-10 size-full object-cover"
      />
      <div
        aria-hidden
        className="absolute inset-0 -z-10 bg-[linear-gradient(to_bottom,transparent_35%,rgb(0_0_0/0.65))]"
      />
      <div className="flex h-full flex-col justify-between p-[clamp(20px,2.0833vw,40px)]">
        <Image src={icon} alt="" className="size-10" />
        <div>
          <h3 className="text-h3 leading-tight font-medium">{zone.title}</h3>
          <p className="mt-2 max-w-[400px] text-body text-white/85">{zone.text}</p>
        </div>
      </div>
    </li>
  );
}

/**
 * "Faoliyat hududlari" (Figma 6-blok). Chapda intro, o'ngda ikki ustunli kartalar,
 * birinchi ustun 120 px pastdan boshlanadi. Mobilda kartalar gorizontal suriladi.
 * Figma'da kartada faqat nom bor, Tilda'dagi izoh matni ham qo'shildi (D2).
 */
export function Zones() {
  const t = useTranslations("zones");
  const tCta = useTranslations("cta");
  const zones = t.raw("items") as Zone[];
  const columns = [zones.filter((_, i) => i % 2 === 0), zones.filter((_, i) => i % 2 === 1)];

  return (
    <section id="faoliyathududlari" className="mt-section">
      <Container className="lg:px-[calc(var(--gutter)+clamp(0px,2.0833vw,40px))]">
        <div className="grid gap-10 lg:grid-cols-[minmax(0,520fr)_minmax(0,1124fr)] lg:gap-0">
          <SectionIntro title={t("title")} text={t("text")} className="max-w-[520px]">
            <ConsultCta source="zones" variant="gold" label={tCta("consult")} className="mt-10" />
          </SectionIntro>

          {/* Desktop: ikki ustun */}
          <div className="hidden grid-cols-2 gap-6 lg:grid lg:pl-[clamp(40px,5.4vw,104px)]">
            {columns.map((col, c) => (
              <ul
                key={c}
                className={cn("flex flex-col gap-6", c === 0 && "mt-[clamp(60px,6.25vw,120px)]")}
              >
                {col.map((zone) => (
                  <ZoneCard key={zone.title} zone={zone} index={zones.indexOf(zone)} />
                ))}
              </ul>
            ))}
          </div>

          {/* Mobil: gorizontal slayder */}
          <ul className="-mx-[var(--gutter)] flex snap-x snap-mandatory scroll-px-[var(--gutter)] gap-4 overflow-x-auto px-[var(--gutter)] pb-2 lg:hidden">
            {zones.map((zone, i) => (
              <ZoneCard key={zone.title} zone={zone} index={i} />
            ))}
          </ul>
        </div>
      </Container>
    </section>
  );
}
