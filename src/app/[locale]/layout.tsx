import type { Metadata } from "next";
import { Oswald } from "next/font/google";
import localFont from "next/font/local";
import { notFound } from "next/navigation";
import { hasLocale, NextIntlClientProvider } from "next-intl";
import { getMessages, getTranslations } from "next-intl/server";
import { routing } from "@/i18n/routing";
import { site } from "@/content/site";
import { ConsultProvider } from "@/components/lead/ConsultProvider";
import { Header } from "@/components/layout/Header";
import { JsonLd } from "@/components/seo/JsonLd";
import { Analytics } from "@/components/analytics/Analytics";
import { MotionRoot } from "@/components/motion/MotionRoot";
import { CursorMotion } from "@/components/motion/CursorMotion";
import { motionBootScript } from "@/lib/motion";
import Image from "next/image";
import logoMark from "../../../public/images/brand/logo-mark.webp";
import { Footer } from "@/components/layout/Footer";
import { ContactWidget } from "@/components/layout/ContactWidget";
import "../globals.css";
// PP Right Gothic @font-face: build/dev oldidan scripts/fetch-fonts.mjs yaratadi (gitignore)
import "../fonts-private.css";

/** Matn shrifti: Retni Sans (OFL, repoda) */
const retni = localFont({
  src: [
    { path: "../../fonts/retni/RetniSans-Light.woff2", weight: "300", style: "normal" },
    { path: "../../fonts/retni/RetniSans-Regular.woff2", weight: "400", style: "normal" },
    { path: "../../fonts/retni/RetniSans-Medium.woff2", weight: "500", style: "normal" },
  ],
  variable: "--font-retni",
  display: "swap",
  fallback: ["system-ui", "Arial", "sans-serif"],
});

/**
 * Sarlavha fallback'i: PP Right Gothic topilmaganda (FONT_HEADING_URL yo'q) ishlatiladi.
 * Oldindan yuklanmaydi, brauzer uni faqat kerak bo'lsa oladi.
 */
const headingFallback = Oswald({
  subsets: ["latin", "cyrillic"],
  weight: ["500"],
  variable: "--font-heading-fallback",
  display: "swap",
  preload: false,
});

/** PP Right Gothic build vaqtida ulangan bo'lsa, sahifa boshida oldindan yuklanadi */
const headingFontUrl = process.env.FONT_HEADING_URL ? "/fonts/PPRightGothic-Medium.woff2" : null;

const clientNamespaces = ["nav", "cta", "form", "social", "plans", "widget"] as const;

export function generateStaticParams() {
  return routing.locales.map((locale) => ({ locale }));
}

export async function generateMetadata({ params }: LayoutProps<"/[locale]">): Promise<Metadata> {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: "meta" });
  const path = locale === routing.defaultLocale ? "/" : `/${locale}`;
  // Tilda'dagi OG rasmlar: uz va ru uchun har xil
  const ogImage = locale === "ru" ? "/images/misc/misc-01.png" : "/images/meta/meta-04.jpg";
  return {
    metadataBase: new URL(site.url),
    title: t("title"),
    description: t("description"),
    keywords: t("keywords"),
    applicationName: site.name,
    alternates: {
      canonical: path,
      languages: { uz: "/", ru: "/ru", "x-default": "/" },
    },
    openGraph: {
      type: "website",
      url: path,
      siteName: site.name,
      title: t("title"),
      description: t("description"),
      locale: locale === "ru" ? "ru_RU" : "uz_UZ",
      alternateLocale: locale === "ru" ? ["uz_UZ"] : ["ru_RU"],
      images: [{ url: ogImage, alt: t("ogAlt") }],
    },
    twitter: { card: "summary_large_image", title: t("title"), description: t("description") },
    formatDetection: { telephone: false },
  };
}

export default async function LocaleLayout({ children, params }: LayoutProps<"/[locale]">) {
  const { locale } = await params;
  if (!hasLocale(routing.locales, locale)) notFound();

  // Brauzerga faqat klient komponentlar ishlatadigan matnlar yuboriladi
  const messages = await getMessages();
  const clientMessages = Object.fromEntries(clientNamespaces.map((ns) => [ns, messages[ns]]));

  return (
    <html lang={locale} className={`${headingFallback.variable} ${retni.variable} antialiased`}>
      <head>
        {/* Animatsiya holati sahifa chizilishidan oldin (src/lib/motion.ts) */}
        <script dangerouslySetInnerHTML={{ __html: motionBootScript }} />
        {headingFontUrl ? (
          <link
            rel="preload"
            href={headingFontUrl}
            as="font"
            type="font/woff2"
            crossOrigin="anonymous"
          />
        ) : null}
      </head>
      <body className="min-h-dvh">
        <JsonLd locale={locale} />
        <div className="intro-curtain" aria-hidden>
          <Image
            src={logoMark}
            unoptimized
            alt=""
            priority={false}
            className="size-[clamp(96px,8vw,140px)] rounded-card"
          />
        </div>
        <NextIntlClientProvider messages={clientMessages}>
          <ConsultProvider>
            <Header />
            {children}
            <Footer />
          </ConsultProvider>
          <ContactWidget />
          <Analytics />
          <MotionRoot />
          <CursorMotion />
        </NextIntlClientProvider>
      </body>
    </html>
  );
}
