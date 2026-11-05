import Image, { type StaticImageData } from "next/image";
import { useTranslations } from "next-intl";
import { ConsultCta } from "@/components/lead/ConsultCta";
import { Container } from "@/components/ui/Container";
import { SectionIntro } from "@/components/ui/SectionIntro";
import { FacadeMotion } from "@/components/motion/FacadeMotion";
import { DayNightView } from "./DayNightView";
import hero from "../../../public/images/facade/facade-05.webp";
import ceramic from "../../../public/images/facade/facade-04.png";
import brick from "../../../public/images/facade/facade-01.webp";
import granite from "../../../public/images/facade/facade-03.webp";
import windows from "../../../public/images/about/about-02.webp";
import lighting from "../../../public/images/facade/facade-02.png";
import balconies from "../../../public/images/lead/lead-01.webp";
import courtyardDay from "../../../public/images/zones/zone-green-full.webp";
import parkingDay from "../../../public/images/zones/zone-parking-full.webp";
import frontDay from "../../../public/images/facade/facade-day-front.webp";
import frontNight from "../../../public/images/facade/facade-night-front.webp";
import entranceDay from "../../../public/images/facade/facade-day-entrance.webp";
import entranceNight from "../../../public/images/facade/facade-night-entrance.webp";
import courtyardNight from "../../../public/images/facade/facade-night-courtyard.webp";
import parkingNight from "../../../public/images/facade/facade-night-parking.webp";

type Item = { label: string; value: string };

/** `facade.items` tartibi bilan bir xil (Tilda'dagi rasmlar) */
const photos: StaticImageData[] = [ceramic, brick, granite, windows, lighting, balconies];

/**
 * "Zamonaviy klassika" (Figma 7-blok). Oltin fon ustida: chapda intro va CTA, o'ngda 800x400 rasm
 * (kunduzgi/kechki ko'rinish, `DayNightView`),
 * pastda 3x2 doira rasmlar va material nomlari. Scroll'da materiallar navbatma-navbat "yonadi" (FacadeMotion).
 */
export function Facade() {
  const t = useTranslations("facade");
  const tCta = useTranslations("cta");
  const items = t.raw("items") as Item[];
  const viewLabels = t.raw("views") as string[];

  return (
    <section>
      <Container>
        <div className="mx-auto max-w-[1408px]">
          <div className="grid gap-10 lg:grid-cols-[minmax(0,480fr)_minmax(0,800fr)] lg:justify-between lg:gap-[clamp(40px,6.6667vw,128px)]">
            <SectionIntro tone="light" title={t("title")} text={t("text")}>
              <ConsultCta
                source="facade"
                variant="white"
                label={tCta("consult")}
                className="mt-10"
              />
            </SectionIntro>
            <DayNightView
              views={[
                { label: viewLabels[0] ?? "", day: frontDay, night: frontNight },
                { label: viewLabels[1] ?? "", day: courtyardDay, night: courtyardNight },
                { label: viewLabels[2] ?? "", day: entranceDay, night: entranceNight },
                { label: viewLabels[3] ?? "", day: parkingDay, night: parkingNight },
              ]}
              dayLabel={t("day")}
              nightLabel={t("night")}
              groupLabel={t("viewsLabel")}
              className="aspect-[4/3] w-full sm:aspect-[2/1]"
            />
          </div>

          <ul
            data-materials
            className="mt-[clamp(48px,4.7vw,90px)] grid gap-x-6 gap-y-[clamp(24px,3.2vw,62px)] sm:grid-cols-2 lg:grid-cols-3 lg:pl-10"
          >
            {items.map((item, i) => (
              <li key={item.value} data-reveal className="flex items-center gap-6 text-white">
                <Image
                  src={photos[i] ?? hero}
                  alt=""
                  sizes="200px"
                  quality={90}
                  data-material-photo
                  className="size-[clamp(120px,10.4167vw,200px)] shrink-0 rounded-full object-cover"
                />
                <p data-material-text className="text-lead leading-[1.5] font-medium">
                  <span className="block">{item.label}</span>
                  <span className="block">{item.value}</span>
                </p>
              </li>
            ))}
          </ul>
        </div>
      </Container>
      <FacadeMotion />
    </section>
  );
}
