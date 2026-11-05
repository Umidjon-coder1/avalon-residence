# S0 — Poydevor

**Maqsad:** ishlaydigan bo'sh loyiha va o'lchov uchun boshlang'ich nuqta.

- [x] T0.1 Next.js, TypeScript, Tailwind, ESLint, Prettier o'rnatish
- [x] T0.2 GitHub Actions: lint, typecheck, build
- [ ] T0.3 Vercel'ga ulash, har PR uchun preview havola (to'siq: connector 403)
- [x] T0.4 Figma: Frame 485 tuzilmasi, bo'limlar xaritasi, mobil maketlar borligini aniqlash
- [ ] T0.5 Tilda baseline: Lighthouse (mobil, desktop), 1920/768/390 px skrinshotlar
- [ ] T0.6 uz va ru kontentni strukturali fayllarga ko'chirish
- [ ] T0.7 Assetlarni yuklash, nomlash, optimizatsiya rejasi (AVIF, WebP, SVG)
- [ ] T0.8 Xonadonlar ma'lumoti: 50 karta, maydon, xona soni, tab, reja rasmi

**Tayyor:** preview havola ochiladi, CI yashil, baseline `docs/AUDIT.md` ga yozilgan.

## Hisobot

- 2026-11-05: Tilda sayti tahlil qilindi, reja, qarorlar va sprintlar yozildi, ochiq repo ochildi (ROADMAP.md, DECISIONS.md, docs/AUDIT.md). S0 tasklari hali boshlanmagan.
- 2026-11-05 (bulut): reja tasdiqlandi. T0.1: Next.js 16.4.5, React 19, TS, Tailwind 4, ESLint, Prettier. T0.2: GitHub Actions
  (lint, format, typecheck, build). T0.4: `docs/FIGMA.md` da 10 bo'lim xaritasi. Figma MCP Starter tarif limitiga yetdi.
  Vercel connector loyiha yaratishga 403 qaytardi. Bulut tarmog'i figma.com, api.figma.com, avalonresidence.uz ni bloklaydi.

## Handoff

To'siqlar: (1) Vercel loyihani muallif vercel.com/new orqali import qilishi yoki connectorga yozish huquqi berishi kerak.
(2) Figma MCP limiti: tarifni oshirish, Figma token va api.figma.com ga ruxsat, yoki bloklarni qo'lda eksport qilish.
(3) Tarmoq: avalonresidence.uz, static.tildacdn.com (va tildacdn domenlari) ruxsat etilsa T0.5-T0.8 davom etadi.
Keyingi qadam: to'siqlar ochilgach T0.5 (baseline), T0.6 (kontent), T0.7 (assetlar), T0.8 (xonadonlar).
