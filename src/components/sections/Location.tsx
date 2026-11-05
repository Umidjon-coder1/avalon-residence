import Image from "next/image";
import { useTranslations } from "next-intl";
import { site } from "@/content/site";
import { Container } from "@/components/ui/Container";
import { CtaLink } from "@/components/ui/CtaPair";
import { TMapPin } from "@/components/ui/tilda-icons";
import { Heading } from "@/components/ui/Heading";
import { SectionIntro } from "@/components/ui/SectionIntro";
import { AutoSlideshow } from "./AutoSlideshow";
import car from "../../../public/images/location/location-07.png";
import g1 from "../../../public/images/location/location-06.png";
import g2 from "../../../public/images/location/location-02.jpg";
import g3 from "../../../public/images/location/location-04.jpg";
import g4 from "../../../public/images/location/location-05.webp";
import g5 from "../../../public/images/location/location-08.jpg";
import g6 from "../../../public/images/location/location-03.avif";
import mapDesktop from "../../../public/images/location/map-desktop.svg";
import mapMobile from "../../../public/images/location/map-mobile.svg";
import { LocationMotion } from "@/components/motion/LocationMotion";

type Place = { distance: string; name: string };

/** Tilda galereyasi tartibida: metro, atrof, maktab va boshqalar */
const gallery = [g1, g2, g3, g4, g5, g6];

/** Yo'l chizig'i: mobilda o'ng tomonda vertikal (rams-saiahat.kz kabi), desktopda mashina balandligida gorizontal */
const track =
  "absolute top-0 right-[calc(var(--gutter)+15px)] bottom-0 w-0.5 lg:top-[47px] lg:right-0 lg:bottom-auto lg:left-0 lg:h-0.5 lg:w-auto";

/**
 * "Hamma narsa yaqin" (Figma 4-blok).
 * Intro o'ng yarimda, keyin masofalar yo'li (mashina scroll bilan yuradi), pastda manzil, o'zi almashadigan
 * rasmlar (Tilda galereyasi) va Tilda'dagi chizilgan xarita.
 * Masofalar va manzil Tilda'dan (D2).
 */
export function Location() {
  const t = useTranslations("location");
  const places = t.raw("places") as Place[];

  return (
    <section id="joylashuv" className="mt-section">
      <Container>
        <SectionIntro title={t("title")} text={t("text")} className="max-w-[655px] lg:ml-[50%]" />
      </Container>

      {/* Masofalar yo'li: mobilda vertikal (mashina pastga yuradi), desktopda ekran bo'ylab gorizontal */}
      <div
        data-route
        className="relative mx-auto mt-[clamp(32px,2.9vw,56px)] max-w-[1920px] overflow-hidden"
      >
        <span aria-hidden className={`${track} bg-gold/25`} />
        {/* Mashina bilan birga chiziladigan chiziq (LocationMotion) */}
        <span
          aria-hidden
          data-route-line
          className={`${track} origin-top bg-gold lg:origin-left`}
        />
        <Image
          data-route-car
          src={car}
          alt=""
          sizes="200px"
          className="absolute top-8 right-[calc(var(--gutter)+16px)] z-10 h-auto w-[112px] translate-x-1/2 rotate-90 drop-shadow-[0_7px_7px_rgb(0_0_0/0.12)] lg:top-0 lg:right-auto lg:left-0 lg:w-[clamp(140px,10.4vw,200px)] lg:translate-x-0 lg:rotate-0"
        />
        <Container className="lg:px-0">
          <ul className="flex flex-col items-end gap-12 pt-32 pr-14 pb-4 text-right lg:grid lg:grid-cols-6 lg:items-start lg:gap-0 lg:pt-[31px] lg:pr-[4%] lg:pb-0 lg:pl-[12.5%] lg:text-left">
            {places.map((place) => (
              <li key={place.name} data-reveal className="relative">
                <span
                  aria-hidden
                  data-route-stop
                  className="absolute top-0 -right-14 block size-8 rounded-full border-2 border-gold bg-white transition-colors duration-500 data-[reached=true]:bg-gold lg:static lg:ml-[21px]"
                />
                <p className="font-heading text-h3 font-medium text-gold uppercase lg:mt-10">
                  {place.distance}
                </p>
                <p className="mt-1 ml-auto max-w-[220px] text-body leading-tight text-navy lg:ml-0 lg:max-w-[150px]">
                  {place.name}
                </p>
              </li>
            ))}
          </ul>
        </Container>
      </div>

      <Container className="mt-[clamp(48px,4.7vw,92px)]">
        <div className="grid gap-10 lg:grid-cols-[minmax(0,480fr)_minmax(0,1200fr)] lg:gap-12">
          {/* Chap ustun xarita balandligiga teng: rasm qolgan joyni to'ldiradi (Tilda kabi) */}
          <div className="flex flex-col">
            <Heading as="h3" caps={false} data-reveal className="text-gold">
              {t("addressLabel")}
            </Heading>
            <p data-reveal className="mt-2 text-lead text-navy">
              {t("address")}
            </p>
            <AutoSlideshow
              images={gallery}
              sizes="(min-width: 1024px) 25vw, 100vw"
              label={t("addressLabel")}
              className="mt-6 aspect-square w-full lg:aspect-auto lg:min-h-[240px] lg:flex-1"
            />
            <CtaLink
              href={site.map.yandex}
              target="_blank"
              rel="noopener"
              variant="gold"
              label={t("mapLink")}
              icon={<TMapPin className="size-[clamp(28px,2.0833vw,40px)]" />}
              fullWidth
              className="mt-6"
            />
          </div>

          {/* Tilda'dagi chizilgan grafik xarita (Yandex xarita "Aloqa" bo'limida) */}
          <picture
            data-reveal="image"
            className="block self-start overflow-hidden rounded-card border border-gold"
          >
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
      <LocationMotion />
    </section>
  );
}
