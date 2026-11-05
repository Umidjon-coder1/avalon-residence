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

- **S0, S1 tugadi** (T1.2 asl shriftlardan tashqari: muallif zip yuboradi, Vercel Blob'ga yuklanadi). **S2 bo'limlari tayyor** (T2.1-T2.9).
  Qolgan: T2.10 (maydon oralig'i, ish soati) muallif qarori va preview'da dizayn tasdig'i. Keyin S3.
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
- **Vercel connector** loyiha yaratishga 403 qaytaradi. Loyihani muallif o'zi import qilgan, `main` ga push production deploy qiladi, PR'lar preview oladi.
- **Brauzer:** Playwright va Chromium o'rnatilgan, `require('playwright')` ishlaydi, qayta o'rnatmang.
- **Ochiq domenlar:** avalonresidence.uz, *.tildacdn.*, figma.com, api.figma.com.

## Qat'iy qoidalar

- **Shriftlar (D5):** PPRightGothic va RetniSans fayllari repoga **kirmaydi** (`.gitignore` bloklaydi). Litsenziya hali aniqlanmagan.
  Fayllar muallifda bor. S1 da ularni yopiq manbadan qanday ulash muallif bilan kelishiladi, masalan Vercel Blob yoki muhit orqali.
  Ungacha fallback shrift ishlatiladi va `font-family` token orqali ulanadi, shunda keyin bitta joyda almashtiriladi.
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
