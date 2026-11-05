/**
 * Lid ma'lumoti va validatsiya. Forma (klient) va `/api/lead` (server) bir xil qoidadan foydalanadi.
 */

/** O'zbekiston raqami: +998 dan keyin 9 raqam (operator kodi 2 + 7). */
export const PHONE_DIGITS = 9;

export type LeadSource =
  | "hero"
  | "header"
  | "menu"
  | "advantages"
  | "zones"
  | "facade"
  | "lead"
  | "plans"
  | "contacts"
  | "popup";

export type LeadInput = {
  name: string;
  /** Faqat 9 raqam, +998 siz */
  phone: string;
  locale: string;
  source: LeadSource | string;
  /** Rejalar blokidan: tanlangan reja id si, masalan "2-05" */
  apartment?: string;
  /** Honeypot: odam ko'rmaydigan maydon, bot to'ldiradi */
  company?: string;
  /** Forma ochilgandan beri o'tgan vaqt, ms */
  elapsed?: number;
};

export type LeadErrors = Partial<Record<"name" | "phone", true>>;

/** Kiritilgan matndan 9 raqamni ajratadi. Nusxalangan "+998 90 123 45 67" ham to'g'ri o'qiladi. */
export function normalizePhone(raw: string): string {
  let digits = raw.replace(/\D/g, "");
  if (digits.length >= PHONE_DIGITS + 3 && digits.startsWith("998")) digits = digits.slice(3);
  return digits.slice(0, PHONE_DIGITS);
}

/** "901234567" -> "90-123-4567" (Tilda niqobi: 00-000-0000) */
export function formatPhone(digits: string): string {
  const d = digits.slice(0, PHONE_DIGITS);
  return [d.slice(0, 2), d.slice(2, 5), d.slice(5)].filter(Boolean).join("-");
}

export function validateLead(input: Pick<LeadInput, "name" | "phone">): LeadErrors {
  const errors: LeadErrors = {};
  const name = input.name.trim();
  if (name.length < 2 || name.length > 60) errors.name = true;
  if (!/^\d{9}$/.test(input.phone)) errors.phone = true;
  return errors;
}
