@AGENTS.md

# Avalon Residence: agent uchun yo'riqnoma

Tilda saytini (avalonresidence.uz) Next.js ga 1:1 ko'chirish, keyin premium animatsiya va funksiyalar qo'shish.
Muallif: Umidjon. Repo ochiq, portfolio loyihasi.

## Muloqot

- Muallif bilan **lotin yozuvidagi o'zbek tilida** gaplashing: qisqa, oddiy, texnik jargonsiz.
- Commit xabarlari, hujjatlar va kod izohlari ham o'zbekcha. Kod identifikatorlari inglizcha.

## Sessiya boshida

1. `ROADMAP.md`, `DECISIONS.md` va joriy sprint faylini (`sprints/`) o'qing. Oxirgi sprintning **Handoff** bo'limi qayerdan davom etishni aytadi.
2. `git log --oneline -10`. Agar `main-321ctw` PR'i merge bo'lgan bo'lsa, yangi ishni `main` dan boshlang.
3. Figma kerak bo'lsa, `design/figma/frame-485.json` repoda bor. Yangilash: `npm run figma`.

## Holat (2026-11-05)

- **S0-S3 tugadi, v1 `main` da** (PR #2). Production: `avalon-residence.vercel.app`, lidlar Google Sheets'ga boradi (T3.9 tasdiqlangan).
  Muallif qarori: Google Ads label va domen ko'chirish keyinga, **hozir upgrade: S4 (animatsiya), keyin S5**.
- **S4 tugadi va `main` da** (PR #3). Keyingi: S5. Og'ir animatsiya sozlamalari `onIdle()` bilan (TBT).
- S4 motion: `src/lib/motion.ts`, `src/components/motion/` (MotionRoot = Lenis, PageMotion = `data-reveal`/`data-draw`/`data-count`,
  HeroMotion, LocationMotion, ZonesMotion, FacadeMotion, CursorMotion). Xarita: `src/components/ui/YandexMap.tsx` (JS API 2.1). Ikonkalar: Tilda'dagi asl SVG `src/components/ui/tilda-icons.tsx`. DOM matnini o'zgartiruvchi animatsiya sahifa ichida bo'lsin (layout'da hydration xatosi beradi).
- Lid kanallari va barcha env o'zgaruvchilari: `docs/LEADS.md`. E2E testlar: `npm run build && npm run test:e2e`.
- Tayyor qismlar: token'lar `src/app/globals.css`, UI primitivlar `src/components/ui/`, header/footer/menyu `src/components/layout/`,
  popup va forma `src/components/lead/` (har qanday CTA: `ConsultCta`, `ConsultButton` yoki `useConsult()`), i18n `src/i18n/`, lid API `src/app/api/lead/route.ts`,
  bo'limlar `src/components/sections/` (Figma tartibida `src/app/[locale]/page.tsx` da).
- Tailwind eslatmasi: bir xil xususiyatli ikki klassni (`sm:w-auto` va `sm:w-[320px]`, `uppercase` va `normal-case`) bitta elementga bermang, qaysi biri yutishi noaniq. Variant yoki prop orqali bittasini tanlang.
- Kontent tayyor: `messages/uz.json`, `messages/ru.json` (kalitlari bir xil), `src/content/site.ts`, `src/content/apartments.ts` (25 reja).
- Rasmlar: `public/images/<bo'lim>/`, ro'yxat `docs/ASSETS.md` da. Figma bo'limlar xaritasi va token'lar `docs/FIGMA.md` da.
- Tilda baseline: `docs/AUDIT.md` va `docs/baseline/`.

## Manbalar qoidasi (D2)

- **Tartib, o'lcham, rang, shrift:** Figma (`design/figma/frame-485.json`, preview: `design/figma/preview/<N>-blok.jpg`).
- **Matn va ma'lumot:** Tilda (`messages/*.json`). Figma'dagi matn yoki raqam Tilda'dan farq qilsa, Tilda'niki olinadi, farq `docs/FIGMA.md` ga yoziladi.
- **Mobil:** Figma'da mobil maket yo'q. Tilda mobil versiyasi asos (`docs/baseline/tilda-uz-390.jpg`), lekin muallif UX ni yaxshilashga ruxsat bergan. Muammolar ro'yxati `docs/AUDIT.md` da.

## Muhit va cheklovlar

- **Figma MCP ishlatmang:** Starter tarif limiti tugagan. O'rniga REST API: `npm run figma` (`FIGMA_TOKEN` muhitda bor).
  Dizayndagi rasm fayllari `s3-alpha-sig.figma.com` dan keladi. Bu domen yopiq bo'lsa, `fills/` bo'sh qoladi va Tilda rasmlari ishlatiladi.
- **Node fetch va proksi:** Node skriptlari tashqi tarmoqqa `NODE_USE_ENV_PROXY=1` bilan chiqadi.
- **Vercel:** loyiha `avalon-residence` (`prj_y4VvFw0oXYH8ecaRNosZrlhkUNbT`), jamoa `team_XEFbj5VbU9X0rRbbolJpnIXb`, Pro. Connector ishlaydi (2026-11-05 qayta ulangan).
  Framework `nextjs`. Blob store `avalon-fonts`. Env ro'yxati `docs/LEADS.md` da.
  Loyihani muallif o'zi import qilgan, `main` ga push production deploy qiladi, PR'lar preview oladi. Konteynerdan vercel.com va Blob API'ga to'g'ridan-to'g'ri ulanish yopiq.
- **Brauzer:** Playwright va Chromium o'rnatilgan, `require('playwright')` ishlaydi, qayta o'rnatmang.
- **Ochiq domenlar:** avalonresidence.uz, *.tildacdn.*, figma.com, api.figma.com, rams-saiahat.kz, kenesary-qs.kz (namuna saytlar). Yandex yopiq.

## Qat'iy qoidalar

- **Shriftlar (D5):** Retni Sans (OFL) repoda, `src/fonts/retni/`. PP Right Gothic tijoriy, repoga **kirmaydi** (`.gitignore` bloklaydi).
  U `predev`/`prebuild` dagi `scripts/fetch-fonts.mjs` orqali `FONT_HEADING_URL` dan yuklanadi. Lokal ishlash uchun faylni `public/fonts/PPRightGothic-Medium.woff2` ga qo'ying.
  `next build` ni to'g'ridan-to'g'ri emas, `npm run build` bilan ishga tushiring, aks holda `src/app/fonts-private.css` yaratilmaydi.
- **Domen va DNS** faqat muallifning alohida tasdig'i bilan (S3).
- **PR** faqat muallif so'rasa ochiladi. Push: `git push -u origin <branch>`.
- **Har commitda** joriy sprint faylining `## Hisobot` (sana va nima qilingani) va `## Handoff` (keyingi qadam, to'siqlar) bo'limlarini yangilang.
- Push oldidan: `npm run lint && npm run format:check && npm run typecheck && npm run build`.

## Arxitektura (ROADMAP'dagi poydevor)

- Har bo'lim alohida komponent (`src/components/sections/`), oqimdagi layout, `absolute` faqat bezak uchun. Bu S4 dagi pin, parallax va scroll animatsiyalariga tayyorlaydi.
- Token'lar Tailwind 4 `@theme` ichida (`src/app/globals.css`), qiymatlar `docs/FIGMA.md` dan.
- Dizayn 1920 px. Kontent konteyneri 1728 px (yon tomonda 96 px). O'lchamlar `clamp()` bilan masshtablanadi.
- i18n: next-intl, `/` uz va `/ru` ru (D3).
- Lid: `/api/lead`, keyin Google Sheets (muallif tanlovi, S3).
- Animatsiya: GSAP + ScrollTrigger, Lenis. Boshqa animatsiya kutubxonasi qo'shilmaydi.
