/**
 * Google Ads (T3.5). Teg faqat asosiy domenda yuklanadi (`Analytics` komponenti),
 * preview va lokal muhitda `window.gtag` bo'lmaydi va bu funksiyalar hech narsa qilmaydi.
 */
import { site } from "@/content/site";

declare global {
  interface Window {
    gtag?: (...args: unknown[]) => void;
    dataLayer?: unknown[];
  }
}

/**
 * Lid yuborilganda conversion. Label Google Ads'dagi "Lid" konversiya amalidan olinadi:
 * `NEXT_PUBLIC_GADS_LEAD_LABEL` (masalan `AbCdEf123`). Berilmasa faqat `generate_lead` hodisasi yuboriladi.
 */
export function trackLead(source: string) {
  const gtag = window.gtag;
  if (!gtag) return;
  gtag("event", "generate_lead", { lead_source: source });
  const label = process.env.NEXT_PUBLIC_GADS_LEAD_LABEL;
  if (label) gtag("event", "conversion", { send_to: `${site.googleAdsId}/${label}` });
}
