import { apartments } from "@/content/apartments";
import { ATTRIBUTION_KEYS } from "@/lib/attribution";
import { normalizePhone, validateLead, type LeadInput } from "@/lib/lead";
import { deliverLead } from "@/lib/lead-delivery";

/**
 * Lid qabul qilish nuqtasi (T1.8, T3.2).
 *
 * Spam himoyasi:
 * - honeypot `company` maydoni (to'ldirilgan bo'lsa jimgina qabul qilingandek javob beriladi)
 * - forma 2 soniyadan tez yuborilsa rad etiladi
 * - bitta IP dan 10 daqiqada 5 tadan ko'p so'rov bo'lsa 429 (bitta server nusxasi ichida)
 *
 * Yetkazish: `src/lib/lead-delivery.ts` (Google Sheets, zaxira Telegram). Ikkalasi ham ishlamasa 502,
 * forma foydalanuvchiga qo'ng'iroq qilishni taklif qiladi.
 */

const MIN_ELAPSED_MS = 2000;
const RATE_WINDOW_MS = 10 * 60 * 1000;
const RATE_LIMIT = 5;
const hits = new Map<string, number[]>();

function rateLimited(ip: string, now: number) {
  const recent = (hits.get(ip) ?? []).filter((t) => now - t < RATE_WINDOW_MS);
  recent.push(now);
  hits.set(ip, recent);
  if (hits.size > 5000) hits.clear();
  return recent.length > RATE_LIMIT;
}

const json = (body: unknown, status = 200) => Response.json(body, { status });

type LeadBody = Partial<LeadInput> & { page?: unknown; attribution?: unknown };

/** Faqat ma'lum kalitlar, faqat qisqa satrlar */
function cleanAttribution(raw: unknown): Record<string, string> {
  if (!raw || typeof raw !== "object") return {};
  const out: Record<string, string> = {};
  for (const key of [...ATTRIBUTION_KEYS, "landing", "referrer"]) {
    const value = (raw as Record<string, unknown>)[key];
    if (typeof value === "string" && value.trim()) out[key] = value.trim().slice(0, 300);
  }
  return out;
}

/** "2-05" -> "2-05 (2 xonali, 52.2 m²)" */
function describeApartment(id: unknown) {
  if (typeof id !== "string") return undefined;
  const apt = apartments.find((a) => a.id === id);
  return apt ? `${apt.id} (${apt.rooms} xonali, ${apt.area} m²)` : undefined;
}

/** 901234567 -> +998 90 123 45 67 */
const prettyPhone = (d: string) =>
  `+998 ${d.slice(0, 2)} ${d.slice(2, 5)} ${d.slice(5, 7)} ${d.slice(7)}`;

export async function POST(request: Request) {
  let data: LeadBody;
  try {
    data = await request.json();
  } catch {
    return json({ ok: false, error: "bad_request" }, 400);
  }

  // Bot: honeypot to'ldirilgan. Botga muvaffaqiyat ko'rsatiladi, lid saqlanmaydi
  if (typeof data.company === "string" && data.company.trim() !== "") {
    return json({ ok: true });
  }

  if (typeof data.elapsed !== "number" || data.elapsed < MIN_ELAPSED_MS) {
    return json({ ok: false, error: "too_fast" }, 400);
  }

  const ip = request.headers.get("x-forwarded-for")?.split(",")[0]?.trim() ?? "unknown";
  if (rateLimited(ip, Date.now())) {
    return json({ ok: false, error: "rate_limited" }, 429);
  }

  const name = String(data.name ?? "")
    .trim()
    .slice(0, 60);
  const phone = normalizePhone(String(data.phone ?? ""));
  const errors = validateLead({ name, phone });
  if (Object.keys(errors).length > 0) {
    return json({ ok: false, error: "invalid", fields: Object.keys(errors) }, 422);
  }

  const lead = {
    createdAt: new Date().toISOString(),
    name,
    phone: prettyPhone(phone),
    locale: data.locale === "ru" ? "ru" : "uz",
    source: String(data.source ?? "unknown").slice(0, 32),
    apartment: describeApartment(data.apartment),
    page: typeof data.page === "string" ? data.page.slice(0, 300) : undefined,
    attribution: cleanAttribution(data.attribution),
  };

  const result = await deliverLead(lead);

  // Logda shaxsiy ma'lumot yo'q: telefonning faqat oxirgi 2 raqami
  const log = {
    at: lead.createdAt,
    source: lead.source,
    locale: lead.locale,
    apartment: lead.apartment,
    phone: `+998*******${phone.slice(-2)}`,
    utm: lead.attribution.utm_source,
    delivery: result.ok ? result.channel : "failed",
  };
  if (!result.ok) {
    // Kamdan-kam holat: lid yo'qolmasligi uchun to'liq ma'lumot Vercel'ning yopiq logiga yoziladi
    console.error(
      "[lead] yetkazilmadi",
      JSON.stringify({ ...log, name: lead.name, phone: lead.phone, errors: result.errors }),
    );
    return json({ ok: false, error: "delivery_failed" }, 502);
  }
  if (result.channel === "none") console.warn("[lead] kanal sozlanmagan", JSON.stringify(log));
  else console.info("[lead]", JSON.stringify(log));

  return json({ ok: true });
}
