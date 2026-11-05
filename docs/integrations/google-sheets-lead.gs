/**
 * Avalon Residence: saytdan kelgan lidlarni Google Sheets jadvaliga yozadi.
 * O'rnatish: docs/LEADS.md. SECRET qiymati Vercel'dagi LEAD_WEBHOOK_SECRET bilan bir xil bo'lishi kerak.
 */
const SECRET = "BU_YERGA_MAXFIY_SOZ";
const SHEET_NAME = "Lidlar";
const HEADERS = [
  "Sana",
  "Ism",
  "Telefon",
  "Til",
  "Manba (tugma)",
  "Reja",
  "utm_source",
  "utm_medium",
  "utm_campaign",
  "utm_term",
  "utm_content",
  "gclid",
  "Kirish sahifasi",
  "Referrer",
  "Status",
];

function doPost(e) {
  try {
    const body = JSON.parse(e.postData.contents);
    if (body.secret !== SECRET) return reply({ ok: false, error: "forbidden" });

    const lead = body.lead || {};
    const a = lead.attribution || {};
    const book = SpreadsheetApp.getActiveSpreadsheet();
    const sheet = book.getSheetByName(SHEET_NAME) || book.insertSheet(SHEET_NAME);

    const lock = LockService.getScriptLock();
    lock.waitLock(10000);
    try {
      if (sheet.getLastRow() === 0) {
        sheet.appendRow(HEADERS);
        sheet.setFrozenRows(1);
      }
      sheet.appendRow([
        new Date(lead.createdAt || Date.now()),
        safe(lead.name),
        "'" + (lead.phone || ""),
        lead.locale || "",
        safe(lead.source),
        safe(lead.apartment),
        safe(a.utm_source),
        safe(a.utm_medium),
        safe(a.utm_campaign),
        safe(a.utm_term),
        safe(a.utm_content),
        safe(a.gclid),
        safe(a.landing),
        safe(a.referrer),
        "Yangi",
      ]);
    } finally {
      lock.releaseLock();
    }
    return reply({ ok: true });
  } catch (err) {
    return reply({ ok: false, error: String(err) });
  }
}

/** Jadvalda formula sifatida ishlab ketmasligi uchun (=, +, -, @ bilan boshlangan matn) */
function safe(value) {
  const s = value == null ? "" : String(value);
  return /^[=+\-@]/.test(s) ? "'" + s : s;
}

function reply(obj) {
  return ContentService.createTextOutput(JSON.stringify(obj)).setMimeType(
    ContentService.MimeType.JSON,
  );
}
