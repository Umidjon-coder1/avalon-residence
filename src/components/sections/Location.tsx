import Image from "next/image";
import { useTranslations } from "next-intl";
import { site } from "@/content/site";
import { Container } from "@/components/ui/Container";
import { CtaLink } from "@/components/ui/CtaPair";
import { Heading } from "@/components/ui/Heading";
import { SectionIntro } from "@/components/ui/SectionIntro";
import { LocationPinIcon } from "@/components/ui/icons";
import car from "../../../public/images/location/location-07.png";
import photo from "../../../public/images/location/location-06.png";
import mapDesktop from "../../../public/images/location/map-desktop.svg";
import mapMobile from "../../../public/images/location/map-mobile.svg";

type Place = { distance: string; name: string };

/**
 * "Hamma narsa yaqin" (Figma 4-blok).
 * Intro o'ng yarimda, keyin ekran bo'ylab masofalar chizig'i (chapda mashina), pastda manzil, rasm va xarita.
 * Masofalar va manzil Tilda'dan (D2), xarita Tilda'dagi SVG.
 */
export function Location() {
  const t = useTranslations("location");
  const places = t.raw("places") as Place[];

  return (
    <section id="joylashuv" className="mt-section">
      <Container>
        <SectionIntro title={t("title")} text={t("text")} className="max-w-[655px] lg:ml-[50%]" />
      </Container>

      {/* Masofalar chizig'i: 1920 px da ekran chetidan chetigacha */}
      <div className="relative mx-auto mt-[clamp(32px,2.9vw,56px)] max-w-[1920px] overflow-hidden">
        <span
          aria-hidden
          className="absolute top-[47px] right-0 left-0 hidden h-0.5 bg-gold lg:block"
        />
        <Image
          src={car}
          alt=""
          sizes="200px"
          className="absolute top-0 left-0 hidden h-auto w-[clamp(140px,10.4vw,200px)] drop-shadow-[0_7px_7px_rgb(0_0_0/0.09)] lg:block"
        />
        <Container className="lg:px-0">
          <ul className="grid grid-cols-2 gap-x-6 gap-y-8 sm:grid-cols-3 lg:grid-cols-6 lg:gap-0 lg:pt-[31px] lg:pr-[4%] lg:pl-[12.5%]">
            {places.map((place) => (
              <li key={place.name} className="relative">
                <span
                  aria-hidden
                  className="block size-8 rounded-full border-2 border-gold bg-white lg:ml-[21px]"
                />
                <p className="mt-3 font-heading text-h3 font-medium text-gold uppercase lg:mt-10">
                  {place.distance}
                </p>
                <p className="mt-1 max-w-[150px] text-body leading-tight text-navy">{place.name}</p>
              </li>
            ))}
          </ul>
        </Container>
      </div>

      <Container className="mt-[clamp(48px,4.7vw,92px)]">
        <div className="grid gap-10 lg:grid-cols-[minmax(0,480fr)_minmax(0,1200fr)] lg:gap-12">
          <div className="flex flex-col">
            <Heading as="h3" caps={false} className="text-gold">
              {t("addressLabel")}
            </Heading>
            <p className="mt-2 text-lead text-navy">{t("address")}</p>
            <Image
              src={photo}
              alt=""
              sizes="(min-width: 1024px) 25vw, 100vw"
              className="mt-5 aspect-square w-full rounded-card object-cover lg:mt-auto"
            />
            <CtaLink
              href={site.map.yandex}
              target="_blank"
              rel="noopener"
              variant="gold"
              label={t("mapLink")}
              icon={<LocationPinIcon className="size-[clamp(28px,2.0833vw,40px)]" />}
              fullWidth
              className="mt-6"
            />
          </div>

          <picture className="block overflow-hidden rounded-card border border-gold">
            <source media="(min-width: 768px)" srcSet={mapDesktop.src} />
            <img
              src={mapMobile.src}
              width={mapDesktop.width}
              height={mapDesktop.height}
              alt={t("title")}
              loading="lazy"
              decoding="async"
              className="h-auto w-full"
            />
          </picture>
        </div>
      </Container>
    </section>
  );
}
