# S0 — Poydevor

**Maqsad:** ishlaydigan bo'sh loyiha va o'lchov uchun boshlang'ich nuqta.

- [x] T0.1 Next.js, TypeScript, Tailwind, ESLint, Prettier o'rnatish
- [x] T0.2 GitHub Actions: lint, typecheck, build
- [ ] T0.3 Vercel'ga ulash, har PR uchun preview havola (to'siq: connector 403)
- [x] T0.4 Figma: Frame 485 tuzilmasi, bo'limlar xaritasi, mobil maketlar borligini aniqlash
- [ ] T0.5 Tilda baseline: Lighthouse (mobil, desktop), 1920/768/390 px skrinshotlar (to'siq: tildacdn domenlari)
- [x] T0.6 uz va ru kontentni strukturali fayllarga ko'chirish
- [x] T0.7 Assetlarni yuklash, nomlash, optimizatsiya rejasi (AVIF, WebP, SVG)
- [x] T0.8 Xonadonlar ma'lumoti: 25 noyob reja (Tilda'dagi 50 karta = Jami + tablar), maydon, xona soni, reja rasmi

**Tayyor:** preview havola ochiladi, CI yashil, baseline `docs/AUDIT.md` ga yozilgan.

## Hisobot

- 2026-11-05: Tilda sayti tahlil qilindi, reja, qarorlar va sprintlar yozildi, ochiq repo ochildi (ROADMAP.md, DECISIONS.md, docs/AUDIT.md). S0 tasklari hali boshlanmagan.
- 2026-11-05 (bulut): reja tasdiqlandi. T0.1: Next.js 16.4.5, React 19, TS, Tailwind 4, ESLint, Prettier. T0.2: GitHub Actions
  (lint, format, typecheck, build). T0.4: `docs/FIGMA.md` da 10 bo'lim xaritasi. Figma MCP Starter tarif limitiga yetdi.
  Vercel connector loyiha yaratishga 403 qaytardi. Bulut tarmog'i figma.com, api.figma.com, avalonresidence.uz ni bloklaydi.
- 2026-11-05 (bulut, 2): tarmoqqa avalonresidence.uz va static.tildacdn.com ochildi. T0.6: `messages/uz.json`, `messages/ru.json`
  (kalitlar bir xil), `src/content/site.ts`. T0.7: 66 asset `public/images/<bo'lim>/`, ro'yxat va optimizatsiya rejasi
  `docs/ASSETS.md`. T0.8: `src/content/apartments.ts`, 25 reja (21 ta 2 xonali, 4 ta 3 xonali). Tablar xona sonini bildiradi,
  "1" tabi bo'sh (ROADMAP #6 yopildi). T0.5 urinildi: tildacdn.net/.ink/neo domenlari yopiq bo'lgani uchun Tilda bulutda
  buzilib chiqadi, natija tashlab yuborildi.

## Handoff

To'siqlar: (1) Vercel loyihasi muallif tomonidan import qilinishi kerak, production branch `main` da hali kod yo'q.
(2) Figma: MCP limiti tugagan. Reja: muallif Figma Personal Access Token ni `FIGMA_TOKEN` muhit o'zgaruvchisiga qo'yadi,
REST API orqali Frame 485 JSON va rasmlar olinadi. (3) T0.5 uchun `static.tildacdn.net`, `static.tildacdn.ink`,
`thb.tildacdn.net`, `neo.tildacdn.com` domenlari kerak.
Keyingi qadam: T0.5 baseline, T0.3 preview, keyin S1.
