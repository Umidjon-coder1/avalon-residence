/**
 * Reklama manbasini eslab qolish (T3.2). Foydalanuvchi saytga birinchi kirgandagi UTM, gclid va referrer
 * sessionStorage'da saqlanadi va lid bilan yuboriladi. Faqat brauzerda ishlaydi.
 */

export const ATTRIBUTION_KEYS = [
  "utm_source",
  "utm_medium",
  "utm_campaign",
  "utm_term",
  "utm_content",
  "gclid",
  "fbclid",
  "yclid",
] as const;

export type Attribution = Partial<
  Record<(typeof ATTRIBUTION_KEYS)[number] | "landing" | "referrer", string>
>;

const STORAGE_KEY = "avalon:attribution";

/** Birinchi kirishdagi ma'lumotni saqlaydi. Keyingi sahifalarda qayta yozilmaydi. */
export function captureAttribution() {
  try {
    if (sessionStorage.getItem(STORAGE_KEY)) return;
    const params = new URLSearchParams(location.search);
    const data: Attribution = { landing: location.pathname + location.search };
    for (const key of ATTRIBUTION_KEYS) {
      const value = params.get(key);
      if (value) data[key] = value.slice(0, 200);
    }
    if (document.referrer && !document.referrer.startsWith(location.origin)) {
      data.referrer = document.referrer.slice(0, 300);
    }
    sessionStorage.setItem(STORAGE_KEY, JSON.stringify(data));
  } catch {
    // sessionStorage yopiq bo'lishi mumkin (maxfiy rejim) — lid baribir yuboriladi
  }
}

export function readAttribution(): Attribution {
  try {
    return JSON.parse(sessionStorage.getItem(STORAGE_KEY) ?? "{}") as Attribution;
  } catch {
    return {};
  }
}
