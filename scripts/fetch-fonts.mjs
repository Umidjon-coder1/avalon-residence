#!/usr/bin/env node
/**
 * PP Right Gothic (tijoriy shrift, D5) repoda saqlanmaydi. Build va dev oldidan shu skript ishlaydi:
 *
 * 1. `public/fonts/PPRightGothic-Medium.woff2` bor bo'lsa, o'shani ishlatadi (lokal ishlash uchun).
 * 2. Yo'q bo'lsa va `FONT_HEADING_URL` berilgan bo'lsa, faylni shu havoladan yuklaydi (Vercel Blob va h.k.).
 * 3. Ikkalasi ham bo'lmasa, sarlavhalar fallback shriftda qoladi, build to'xtamaydi.
 *
 * Natija: `src/app/fonts-private.css` (gitignore). Unda @font-face yoki faqat izoh bo'ladi.
 */
import fs from "node:fs/promises";
import path from "node:path";

const FILE = "PPRightGothic-Medium.woff2";
const fontPath = path.resolve("public/fonts", FILE);
const cssPath = path.resolve("src/app/fonts-private.css");

const fontFace = `/* scripts/fetch-fonts.mjs yaratgan. Qo'lda o'zgartirmang */
@font-face {
  font-family: "PP Right Gothic";
  src: url("/fonts/${FILE}") format("woff2");
  font-weight: 500;
  font-style: normal;
  font-display: swap;
}
`;

const exists = (p) =>
  fs.stat(p).then(
    (s) => s.size > 0,
    () => false,
  );

async function download(url) {
  const res = await fetch(url);
  if (!res.ok) throw new Error(`HTTP ${res.status}`);
  const buf = Buffer.from(await res.arrayBuffer());
  // WOFF2 fayl "wOF2" bilan boshlanadi
  if (buf.subarray(0, 4).toString("latin1") !== "wOF2") throw new Error("fayl WOFF2 emas");
  await fs.mkdir(path.dirname(fontPath), { recursive: true });
  await fs.writeFile(fontPath, buf);
  return buf.length;
}

let ok = await exists(fontPath);
if (ok) {
  console.log(`[fonts] ${FILE} lokal fayldan olindi`);
} else if (process.env.FONT_HEADING_URL) {
  try {
    const size = await download(process.env.FONT_HEADING_URL);
    console.log(`[fonts] ${FILE} yuklandi (${size} bayt)`);
    ok = true;
  } catch (e) {
    console.warn(`[fonts] ${FILE} yuklanmadi: ${e.message}. Fallback shrift ishlatiladi`);
  }
} else {
  console.warn("[fonts] FONT_HEADING_URL berilmagan. Sarlavhalar fallback shriftda");
}

await fs.writeFile(
  cssPath,
  ok ? fontFace : "/* PP Right Gothic topilmadi: scripts/fetch-fonts.mjs ga qarang */\n",
);
