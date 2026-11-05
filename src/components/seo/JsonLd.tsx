import { getTranslations } from "next-intl/server";
import { site } from "@/content/site";

/**
 * Tuzilgan ma'lumot (schema.org): turar-joy majmuasi.
 * Google qidiruvida manzil, telefon va xarita ma'lumotini to'g'ri ko'rsatish uchun.
 */
export async function JsonLd({ locale }: { locale: string }) {
  const t = await getTranslations({ locale, namespace: "meta" });
  const tl = await getTranslations({ locale, namespace: "location" });
  const url = locale === "ru" ? `${site.url}/ru` : `${site.url}/`;

  const data = {
    "@context": "https://schema.org",
    "@type": "ApartmentComplex",
    "@id": `${site.url}/#complex`,
    name: site.name,
    description: t("description"),
    url,
    inLanguage: locale,
    image: `${site.url}/images/meta/meta-04.jpg`,
    telephone: site.phones.main.href.replace("tel:", ""),
    numberOfAccommodationUnits: 268,
    address: {
      "@type": "PostalAddress",
      streetAddress: tl("address"),
      addressLocality: locale === "ru" ? "Ташкент" : "Toshkent",
      addressCountry: "UZ",
    },
    geo: { "@type": "GeoCoordinates", latitude: site.map.lat, longitude: site.map.lng },
    hasMap: site.map.yandex,
    sameAs: [site.instagram, site.telegram],
  };

  return (
    <script
      type="application/ld+json"
      // JSON ichida "<" bo'lsa script yopilib qolmasligi uchun
      dangerouslySetInnerHTML={{ __html: JSON.stringify(data).replace(/</g, "\\u003c") }}
    />
  );
}
