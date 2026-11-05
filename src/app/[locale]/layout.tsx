import type { Metadata } from "next";
import { Manrope, Oswald } from "next/font/google";
import { notFound } from "next/navigation";
import { hasLocale, NextIntlClientProvider } from "next-intl";
import { getMessages, getTranslations } from "next-intl/server";
import { routing } from "@/i18n/routing";
import { site } from "@/content/site";
import { ConsultProvider } from "@/components/lead/ConsultProvider";
import { Header } from "@/components/layout/Header";
import { Footer } from "@/components/layout/Footer";
import "../globals.css";

/*
 * Vaqtinchalik shriftlar (D5). Asl PPRightGothic va RetniSans ulanmaguncha:
 * sarlavha uchun Oswald (tor grotesk), matn uchun Manrope (Figma'da ham bor).
 */
const headingFallback = Oswald({
  subsets: ["latin", "cyrillic"],
  weight: ["500"],
  variable: "--font-heading-fallback",
  display: "swap",
});
const bodyFallback = Manrope({
  subsets: ["latin", "cyrillic"],
  variable: "--font-body-fallback",
  display: "swap",
});

const clientNamespaces = ["nav", "cta", "form", "social"] as const;

export function generateStaticParams() {
  return routing.locales.map((locale) => ({ locale }));
}

export async function generateMetadata({ params }: LayoutProps<"/[locale]">): Promise<Metadata> {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: "meta" });
  return {
    metadataBase: new URL(site.url),
    title: t("title"),
    description: t("description"),
    alternates: {
      canonical: locale === routing.defaultLocale ? "/" : `/${locale}`,
      languages: { uz: "/", ru: "/ru", "x-default": "/" },
    },
  };
}

export default async function LocaleLayout({ children, params }: LayoutProps<"/[locale]">) {
  const { locale } = await params;
  if (!hasLocale(routing.locales, locale)) notFound();

  // Brauzerga faqat klient komponentlar ishlatadigan matnlar yuboriladi
  const messages = await getMessages();
  const clientMessages = Object.fromEntries(clientNamespaces.map((ns) => [ns, messages[ns]]));

  return (
    <html
      lang={locale}
      className={`${headingFallback.variable} ${bodyFallback.variable} antialiased`}
    >
      <body className="min-h-dvh">
        <NextIntlClientProvider messages={clientMessages}>
          <ConsultProvider>
            <Header />
            {children}
            <Footer />
          </ConsultProvider>
        </NextIntlClientProvider>
      </body>
    </html>
  );
}
