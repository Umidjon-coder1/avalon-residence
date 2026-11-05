/**
 * Menyu bandlari. Anchor'lar Tilda'dagidek, eski havolalar buzilmasligi uchun.
 * Figma'dagi "Qurilish" bandi Tilda'da yo'q, shuning uchun qo'shilmagan (docs/FIGMA.md).
 */
export const navItems = [
  { key: "about", href: "#loyihahaqida" },
  { key: "location", href: "#joylashuv" },
  { key: "zones", href: "#faoliyathududlari" },
  { key: "plans", href: "#rejalar" },
  { key: "contacts", href: "#aloqa" },
] as const;

export type NavKey = (typeof navItems)[number]["key"];
