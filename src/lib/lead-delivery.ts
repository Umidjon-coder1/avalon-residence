/**
 * Lidni yetkazish (T3.2). Asosiy kanal: Google Sheets (Apps Script web app).
 * Zaxira: Telegram bot. Kanallar environment o'zgaruvchilari bilan yoqiladi:
 *
 *   LEAD_SHEETS_WEBHOOK_URL   Apps Script web app manzili (docs/LEADS.md)
 *   LEAD_WEBHOOK_SECRET       Apps Script'dagi SECRET bilan bir xil satr
 *   TELEGRAM_BOT_TOKEN        zaxira: bot tokeni
 *   TELEGRAM_CHAT_ID          zaxira: lid boradigan chat yoki guruh id si
 */

export type DeliveredLead = {
  createdAt: string;
  name: string;
  /** +998 XX XXX XX XX */
  phone: string;
  locale: string;
  source: string;
  apartment?: string;
  page?: string;
  attribution: Record<string, string>;
};

export type DeliveryResult =
  { ok: true; channel: "sheets" | "telegram" | "none" } | { ok: false; errors: string[] };

const TIMEOUT_MS = 8000;

async function toSheets(lead: DeliveredLead) {
  const url = process.env.LEAD_SHEETS_WEBHOOK_URL;
  if (!url) return null;
  const res = await fetch(url, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ secret: process.env.LEAD_WEBHOOK_SECRET ?? "", lead }),
    signal: AbortSignal.timeout(TIMEOUT_MS),
    redirect: "follow",
  });
  const body = (await res.json().catch(() => null)) as { ok?: boolean; error?: string } | null;
  if (!res.ok || !body?.ok) throw new Error(`sheets: ${res.status} ${body?.error ?? ""}`.trim());
  return true;
}

const escape = (s: string) =>
  s.replace(/[<>&]/g, (c) => ({ "<": "&lt;", ">": "&gt;", "&": "&amp;" })[c]!);

async function toTelegram(lead: DeliveredLead) {
  const token = process.env.TELEGRAM_BOT_TOKEN;
  const chatId = process.env.TELEGRAM_CHAT_ID;
  if (!token || !chatId) return null;
  const a = lead.attribution;
  const lines = [
    "<b>Yangi lid — Avalon Residence</b>",
    `Ism: ${escape(lead.name)}`,
    `Telefon: ${lead.phone}`,
    `Til: ${lead.locale}, manba: ${escape(lead.source)}`,
    lead.apartment ? `Reja: ${escape(lead.apartment)}` : null,
    a.utm_source
      ? `UTM: ${escape([a.utm_source, a.utm_medium, a.utm_campaign].filter(Boolean).join(" / "))}`
      : null,
    a.gclid ? "Google Ads (gclid bor)" : null,
  ].filter(Boolean);
  const res = await fetch(`https://api.telegram.org/bot${token}/sendMessage`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ chat_id: chatId, text: lines.join("\n"), parse_mode: "HTML" }),
    signal: AbortSignal.timeout(TIMEOUT_MS),
  });
  if (!res.ok) throw new Error(`telegram: ${res.status}`);
  return true;
}

/**
 * Avval Sheets, xato bo'lsa Telegram. Hech bir kanal sozlanmagan bo'lsa (preview, lokal) `none`:
 * lid faqat logga tushadi.
 */
export async function deliverLead(lead: DeliveredLead): Promise<DeliveryResult> {
  const errors: string[] = [];
  let configured = false;

  for (const [channel, send] of [
    ["sheets", toSheets],
    ["telegram", toTelegram],
  ] as const) {
    try {
      const sent = await send(lead);
      if (sent === null) continue;
      configured = true;
      return { ok: true, channel };
    } catch (e) {
      configured = true;
      errors.push(e instanceof Error ? e.message : String(e));
    }
  }

  return configured ? { ok: false, errors } : { ok: true, channel: "none" };
}
