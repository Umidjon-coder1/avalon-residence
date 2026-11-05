import { normalizePhone, validateLead, type LeadInput } from "@/lib/lead";

/**
 * Lid qabul qilish nuqtasi (T1.8, skelet).
 * Hozircha lid faqat server logiga yoziladi. S3 da Google Sheets ga yuborish qo'shiladi.
 *
 * Spam himoyasi:
 * - honeypot `company` maydoni (to'ldirilgan bo'lsa jimgina qabul qilingandek javob beriladi)
 * - forma 2 soniyadan tez yuborilsa rad etiladi
 * - bitta IP dan 10 daqiqada 5 tadan ko'p so'rov bo'lsa 429 (bitta server nusxasi ichida)
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

export async function POST(request: Request) {
  let data: Partial<LeadInput>;
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

  const lead = {
    name: String(data.name ?? "")
      .trim()
      .slice(0, 60),
    phone: normalizePhone(String(data.phone ?? "")),
    locale: data.locale === "ru" ? "ru" : "uz",
    source: String(data.source ?? "unknown").slice(0, 32),
    apartment: data.apartment ? String(data.apartment).slice(0, 16) : undefined,
  };

  const errors = validateLead(lead);
  if (Object.keys(errors).length > 0) {
    return json({ ok: false, error: "invalid", fields: Object.keys(errors) }, 422);
  }

  // TODO(S3): Google Sheets ga yozish. Logda telefonning faqat oxirgi 2 raqami ko'rinadi
  console.info(
    "[lead]",
    JSON.stringify({
      at: new Date().toISOString(),
      source: lead.source,
      locale: lead.locale,
      apartment: lead.apartment,
      phone: `+998*******${lead.phone.slice(-2)}`,
    }),
  );

  return json({ ok: true });
}
