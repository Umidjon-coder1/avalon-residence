"use client";

import { useEffect, useSyncExternalStore } from "react";
import Script from "next/script";
import { site } from "@/content/site";
import { captureAttribution } from "@/lib/attribution";

const PRODUCTION_HOSTS = ["avalonresidence.uz", "www.avalonresidence.uz"];
const noop = () => () => {};

/**
 * UTM ni eslab qoladi va Google Ads tegini yuklaydi.
 * Teg faqat asosiy domenda: preview va vercel.app tashriflari reklama statistikasini buzmaydi.
 * `lazyOnload`: teg sahifa to'liq yuklangandan keyin, LCP ga ta'sir qilmaydi.
 */
export function Analytics() {
  const enabled = useSyncExternalStore(
    noop,
    () =>
      PRODUCTION_HOSTS.includes(location.hostname) ||
      process.env.NEXT_PUBLIC_ANALYTICS_FORCE === "1",
    () => false,
  );

  useEffect(() => {
    captureAttribution();
  }, []);

  if (!enabled) return null;

  return (
    <>
      <Script
        src={`https://www.googletagmanager.com/gtag/js?id=${site.googleAdsId}`}
        strategy="lazyOnload"
      />
      <Script id="gtag-init" strategy="lazyOnload">
        {`window.dataLayer=window.dataLayer||[];function gtag(){dataLayer.push(arguments);}window.gtag=gtag;gtag('js',new Date());gtag('config','${site.googleAdsId}');`}
      </Script>
    </>
  );
}
