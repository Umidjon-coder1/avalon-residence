/** className larni birlashtiradi, bo'sh qiymatlarni tashlab yuboradi. */
export function cn(...parts: Array<string | false | null | undefined>) {
  return parts.filter(Boolean).join(" ");
}
