import Image, { type StaticImageData } from "next/image";
import { useTranslations } from "next-intl";
import { ConsultCta } from "@/components/lead/ConsultCta";
import { Container } from "@/components/ui/Container";
import { SectionIntro } from "@/components/ui/SectionIntro";
import hero from "../../../public/images/facade/facade-05.webp";
import ceramic from "../../../public/images/facade/facade-04.png";
import brick from "../../../public/images/facade/facade-01.webp";
import granite from "../../../public/images/facade/facade-03.webp";
import windows from "../../../public/images/about/about-02.webp";
import lighting from "../../../public/images/facade/facade-02.png";
import balconies from "../../../public/images/lead/lead-01.webp";

type Item = { label: string; value: string };

/** `facade.items` tartibi bilan bir xil (Tilda'dagi rasmlar) */
const photos: StaticImageData[] = [ceramic, brick, granite, windows, lighting, balconies];

/**
 * "Zamonaviy klassika" (Figma 7-blok). Oltin fon ustida: chapda intro va CTA, o'ngda 800x400 rasm,
 * pastda 3x2 doira rasmlar va material nomlari.
 */
export function Facade() {
  const t = useTranslations("facade");
  const tCta = useTranslations("cta");
  const items = t.raw("items") as Item[];

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
            <Image
              src={hero}
              alt=""
              sizes="(min-width: 1024px) 42vw, 100vw"
              className="aspect-[2/1] w-full rounded-card object-cover"
            />
          </div>

          <ul className="mt-[clamp(48px,4.7vw,90px)] grid gap-x-6 gap-y-[clamp(24px,3.2vw,62px)] sm:grid-cols-2 lg:grid-cols-3 lg:pl-10">
            {items.map((item, i) => (
              <li key={item.value} className="flex items-center gap-6 text-white">
                <Image
                  src={photos[i] ?? hero}
                  alt=""
                  sizes="200px"
                  className="size-[clamp(120px,10.4167vw,200px)] shrink-0 rounded-full object-cover"
                />
                <p className="text-lead leading-[1.5] font-medium">
                  <span className="block">{item.label}</span>
                  <span className="block">{item.value}</span>
                </p>
              </li>
            ))}
          </ul>
        </div>
      </Container>
    </section>
  );
}
