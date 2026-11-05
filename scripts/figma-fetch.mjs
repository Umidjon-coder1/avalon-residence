#!/usr/bin/env node
/**
 * Figma REST API orqali Frame 485 ni yuklab oladi (MCP limiti tugagani uchun).
 * Talab: FIGMA_TOKEN muhit o'zgaruvchisi (File content: Read), tarmoqda api.figma.com va
 * figma rasm hostlari ochiq bo'lishi kerak.
 *
 *   node scripts/figma-fetch.mjs            # hammasi
 *   node scripts/figma-fetch.mjs --no-images
 *
 * Natija: design/figma/
 *   frame-485.json        to'liq node daraxti (o'lcham, rang, shrift, effektlar)
 *   renders/<blok>.png    har bo'limning 1x render'i (vizual solishtirish uchun)
 *   fills/<imageRef>.*    dizayndagi rasm to'ldirishlari (asl fayllar)
 *   manifest.json         blok -> node id, imageRef -> fayl
 */
import fs from "node:fs/promises";
import path from "node:path";

const FILE_KEY = "CoILrhxoEugMILTX5I11sx";
const FRAME_ID = "126:1150";
const OUT = path.resolve("design/figma");
const token = process.env.FIGMA_TOKEN;
const withImages = !process.argv.includes("--no-images");

if (!token) {
  console.error(
    "FIGMA_TOKEN topilmadi. Uni bulut muhiti sozlamalariga qo'shing va yangi sessiya oching.",
  );
  process.exit(1);
}

const sleep = (ms) => new Promise((r) => setTimeout(r, ms));

async function api(url, attempt = 0) {
  const res = await fetch(`https://api.figma.com${url}`, { headers: { "X-Figma-Token": token } });
  if (res.status === 429 && attempt < 4) {
    const wait = Number(res.headers.get("retry-after") ?? 30) * 1000;
    console.warn(`429, ${wait / 1000}s kutilmoqda...`);
    await sleep(wait);
    return api(url, attempt + 1);
  }
  if (!res.ok) throw new Error(`${res.status} ${url}: ${await res.text()}`);
  return res.json();
}

async function download(url, file) {
  for (let i = 0; i < 4; i++) {
    try {
      const res = await fetch(url);
      if (!res.ok) throw new Error(String(res.status));
      const type = res.headers.get("content-type") ?? "";
      const ext =
        path.extname(file) ||
        (type.includes("jpeg") ? ".jpg" : type.includes("gif") ? ".gif" : ".png");
      const target = path.extname(file) ? file : file + ext;
      await fs.writeFile(target, Buffer.from(await res.arrayBuffer()));
      return path.relative(OUT, target);
    } catch (e) {
      if (i === 3) throw e;
      await sleep(2000 * 2 ** i);
    }
  }
}

await fs.mkdir(path.join(OUT, "renders"), { recursive: true });
await fs.mkdir(path.join(OUT, "fills"), { recursive: true });

console.log("1/3 Node daraxti...");
const nodes = await api(`/v1/files/${FILE_KEY}/nodes?ids=${encodeURIComponent(FRAME_ID)}`);
const frame = nodes.nodes[FRAME_ID].document;
await fs.writeFile(path.join(OUT, "frame-485.json"), JSON.stringify(nodes, null, 1));

const blocks = frame.children
  .filter((n) => ["FRAME", "GROUP", "SECTION"].includes(n.type) && /blok/i.test(n.name))
  .map((n) => ({ name: n.name, id: n.id, box: n.absoluteBoundingBox }));
const imageRefs = new Set();
(function walk(n) {
  for (const f of n.fills ?? []) if (f.type === "IMAGE" && f.imageRef) imageRefs.add(f.imageRef);
  for (const c of n.children ?? []) walk(c);
})(frame);
const failed = [];
const manifest = {
  fileKey: FILE_KEY,
  frameId: FRAME_ID,
  fetchedAt: new Date().toISOString(),
  blocks,
  fills: {},
};
console.log(`   ${blocks.length} blok, ${imageRefs.size} rasm to'ldirishi`);

if (withImages) {
  console.log("2/3 Blok render'lari...");
  const ids = [FRAME_ID, ...blocks.map((b) => b.id)].join(",");
  const renders = await api(
    `/v1/images/${FILE_KEY}?ids=${encodeURIComponent(ids)}&format=png&scale=1`,
  );
  for (const [id, url] of Object.entries(renders.images)) {
    if (!url) continue;
    const name = id === FRAME_ID ? "frame-485" : blocks.find((b) => b.id === id).name;
    try {
      await download(url, path.join(OUT, "renders", `${name}.png`));
      console.log(`   ${name}`);
    } catch (e) {
      failed.push(`render ${name}: ${e.cause?.message ?? e.message}`);
    }
  }

  console.log("3/3 Rasm to'ldirishlari...");
  const fills = await api(`/v1/files/${FILE_KEY}/images`);
  for (const ref of imageRefs) {
    const url = fills.meta.images[ref];
    if (!url) continue;
    try {
      manifest.fills[ref] = await download(url, path.join(OUT, "fills", ref));
    } catch (e) {
      failed.push(`fill ${ref}: ${e.cause?.message ?? e.message}`);
    }
  }
}

manifest.failed = failed;
await fs.writeFile(path.join(OUT, "manifest.json"), JSON.stringify(manifest, null, 2));
if (failed.length) {
  console.warn(
    `${failed.length} ta fayl yuklanmadi (tarmoq ruxsatini tekshiring: s3-alpha-sig.figma.com):`,
  );
  for (const f of failed.slice(0, 5)) console.warn("   " + f);
}
console.log(`Tayyor: ${path.relative(process.cwd(), OUT)}`);
