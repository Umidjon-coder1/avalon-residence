#!/usr/bin/env node
/**
 * Saytni silliq scroll qilib videokadrlarga yozadi (qotishsiz).
 *
 * Usul: sahifa soati soxtalashtiriladi (performance.now, Date.now, requestAnimationFrame, taymerlar,
 * requestIdleCallback, CSS/Web animatsiyalar). Har kadrda vaqt aniq 1/FPS ga suriladi va kadr alohida
 * suratga olinadi. Shuning uchun kompyuter sekin bo'lsa ham video bir tekis chiqadi (GSAP, Lenis,
 * ScrollTrigger, CSS transition hammasi shu soat bilan yuradi).
 *
 * Ishlatish:
 *   node record.cjs --url http://localhost:3000/ --mode desktop --out ./frames-desktop [--plan plan.json]
 *   node record.cjs --url https://example.com/ --mode mobile --out ./frames-mobile
 *
 * Variantlar:
 *   --mode desktop|mobile   desktop 1920x1080; mobile 360x640 @3x = 1080x1920 (Reels/Stories)
 *   --plan file.json        scroll rejasi (pastga qarang). Berilmasa: har <section> da qisqa to'xtaydi
 *   --fps 30                kadr tezligi
 *   --speed 520             scroll tezligi, px/s (mobil uchun standart 300)
 *   --hide "css selektor"   videoda yashiriladigan elementlar (masalan, maxsus kursor)
 *   --block "regex"         so'rovlarni bloklash (masalan, ochilmaydigan xarita API)
 *   --limit 240             sinov uchun kadrlar chegarasi
 *
 * Reja formati (JSON massiv):
 *   { "wait": 4800 }                                  ms kutish (intro, pauza)
 *   { "scrollTo": "#about", "y": 0.25 }               element tepasi ekran balandligining 25% iga yetguncha scroll
 *   { "scrollTo": "#zones", "y": 0, "maxFrames": 200 } maxFrames: shu qadamga ko'pi bilan nechta kadr
 *   { "click": "button:has-text('Kechqurun')" }       bosish (kadr olinmaydi)
 * Sahifa oxiriga yetilsa, scroll qadami darhol tugaydi.
 */
// playwright yoki @playwright/test (loyihada qaysi biri bo'lsa)
let chromium;
try {
  ({ chromium } = require("playwright"));
} catch {
  ({ chromium } = require("@playwright/test"));
}
const fs = require("fs");
const path = require("path");

const arg = (name, def) => {
  const i = process.argv.indexOf("--" + name);
  return i > -1 ? process.argv[i + 1] : def;
};
const URL_ = arg("url", "http://localhost:3000/");
const MODE = arg("mode", "desktop");
const OUT = path.resolve(arg("out", `./frames-${MODE}`));
const FPS = Number(arg("fps", 30));
const DT = 1000 / FPS;
const SPEED = Number(arg("speed", MODE === "desktop" ? 520 : 300));
const HIDE = arg("hide", "");
const BLOCK = arg("block", "");
const LIMIT = Number(arg("limit", 1e9));
const PLAN = arg("plan", "");

fs.rmSync(OUT, { recursive: true, force: true });
fs.mkdirSync(OUT, { recursive: true });

const cfg =
  MODE === "desktop"
    ? { viewport: { width: 1920, height: 1080 }, deviceScaleFactor: 1 }
    : {
        viewport: { width: 360, height: 640 },
        deviceScaleFactor: 3,
        isMobile: true,
        hasTouch: true,
      };

// Sahifaga yuklanadigan soxta soat
const clock = () => {
  let now = 0;
  const d0 = Date.now();
  performance.now = () => now;
  Date.now = () => d0 + now;
  let raf = [];
  let rid = 1;
  window.requestAnimationFrame = (cb) => {
    const id = rid++;
    raf.push({ id, cb });
    return id;
  };
  window.cancelAnimationFrame = (id) => {
    raf = raf.filter((r) => r.id !== id);
  };
  let timers = [];
  let tid = 1;
  window.setTimeout = (cb, ms = 0, ...a) => {
    const id = tid++;
    timers.push({
      id,
      t: now + Math.max(0, +ms || 0),
      cb: () => (typeof cb === "function" ? cb(...a) : 0),
    });
    return id;
  };
  window.clearTimeout = (id) => {
    timers = timers.filter((t) => t.id !== id);
  };
  window.setInterval = (cb, ms = 0, ...a) => {
    const id = tid++;
    const step = Math.max(1, +ms || 0);
    const rep = () => {
      timers.push({ id, t: now + step, cb: rep });
      cb(...a);
    };
    timers.push({ id, t: now + step, cb: rep });
    return id;
  };
  window.clearInterval = window.clearTimeout;
  window.requestIdleCallback = (cb) =>
    window.setTimeout(() => cb({ didTimeout: false, timeRemaining: () => 50 }), 1);
  window.cancelIdleCallback = window.clearTimeout;
  const owned = new WeakSet();
  window.__advance = (ms) => {
    const target = now + ms;
    for (;;) {
      timers.sort((a, b) => a.t - b.t);
      const t = timers[0];
      if (!t || t.t > target) break;
      timers.shift();
      now = Math.max(now, t.t);
      try {
        t.cb();
      } catch (e) {
        console.error(e);
      }
    }
    now = target;
    const q = raf;
    raf = [];
    for (const r of q) {
      try {
        r.cb(now);
      } catch (e) {
        console.error(e);
      }
    }
    for (const a of document.getAnimations()) {
      if (!owned.has(a)) {
        owned.add(a);
        a.pause();
        continue;
      }
      if (a.playState !== "paused") a.pause();
      const end = a.effect && a.effect.getComputedTiming().endTime;
      const next = (a.currentTime || 0) + ms;
      if (Number.isFinite(end) && next >= end) {
        try {
          a.finish();
        } catch (e) {
          a.currentTime = end;
        }
      } else a.currentTime = next;
    }
  };
};

(async () => {
  const b = await chromium.launch({ args: ["--hide-scrollbars"] });
  const ctx = await b.newContext(cfg);
  await ctx.addInitScript(clock);
  if (BLOCK) await ctx.route(new RegExp(BLOCK), (r) => r.abort());
  const p = await ctx.newPage();
  p.on("pageerror", (e) => console.log("pageerror:", e.message));
  await p.goto(URL_, { waitUntil: "load", timeout: 120000 });
  if (HIDE) await p.addStyleTag({ content: `${HIDE}{display:none!important}` });

  let frame = 0;
  const snap = async () => {
    await p.evaluate((ms) => window.__advance(ms), DT);
    await p.screenshot({
      path: path.join(OUT, `f${String(frame).padStart(5, "0")}.jpg`),
      type: "jpeg",
      quality: 92,
    });
    frame++;
    if (frame >= LIMIT) throw new Error("LIMIT");
  };
  const wait = async (ms) => {
    for (let i = 0; i < Math.round(ms / DT); i++) await snap();
  };
  const H = cfg.viewport.height;
  const top = (sel) =>
    p.evaluate((s) => {
      if (innerHeight + scrollY >= document.documentElement.scrollHeight - 2) return -1e9;
      const e = document.querySelector(s);
      return e ? e.getBoundingClientRect().top : 1e9;
    }, sel);
  // Silliq tezlashish va maqsadga yaqinlashganda sekinlashish
  let v = 0;
  const scrollUntil = async (sel, y, maxFrames = 900) => {
    for (let i = 0; i < maxFrames; i++) {
      const t = await top(sel);
      if (t <= y) break;
      const target = Math.min(SPEED, Math.max(120, (t - y) * 2.2));
      v += (target - v) * 0.12;
      const d = (v * DT) / 1000;
      // Desktop: g'ildirak hodisasi (Lenis kabi silliq scroll kutubxonalari ham ishlaydi); mobil: to'g'ridan-to'g'ri
      if (MODE === "desktop") await p.mouse.wheel(0, d);
      else await p.evaluate((d) => window.scrollBy(0, d), d);
      await snap();
    }
    v = 0;
  };

  let plan;
  if (PLAN) plan = JSON.parse(fs.readFileSync(PLAN, "utf8"));
  else {
    // Standart reja: intro, har <section> da qisqa pauza, oxiri
    const n = await p.evaluate(() => document.querySelectorAll("section").length);
    plan = [{ wait: 4000 }];
    for (let i = 2; i <= n; i++)
      plan.push({ scrollTo: `section:nth-of-type(${i})`, y: 0.2 }, { wait: 700 });
    plan.push({ scrollTo: "body > *:last-child", y: -1e6 }, { wait: 2000 });
  }

  try {
    if (MODE === "desktop") await p.mouse.move(cfg.viewport.width / 2, cfg.viewport.height / 2);
    for (const step of plan) {
      if (step.wait) await wait(step.wait);
      else if (step.scrollTo)
        await scrollUntil(step.scrollTo, (step.y ?? 0.2) * H, step.maxFrames ?? 900);
      else if (step.click)
        await p
          .locator(step.click)
          .first()
          .click({ timeout: 5000 })
          .catch((e) => console.log("click:", e.message));
    }
  } catch (e) {
    if (e.message !== "LIMIT") throw e;
  }
  await b.close();
  console.log(`${MODE}: ${frame} kadr, ${(frame / FPS).toFixed(1)} s -> ${OUT}`);
})();
