# ROADMAP

## Asosiy yondashuv

**Reja boshidan to'liq, ijro bosqichma-bosqich.** Avval dizaynga aniq mos v1 chiqadi, keyin premium qatlam
qo'shiladi. Lekin v1 arxitekturasi upgrade'ni hisobga olib quriladi, aks holda animatsiya va xonadon tanlagich
uchun v1'ni qayta yozishga to'g'ri keladi.

| Boshidan qo'yiladigan poydevor | Keyin nimaga kerak bo'ladi |
|--------------------------------|----------------------------|
| Har bo'lim alohida komponent, absolute emas, oqimdagi layout | Pin, parallax, scroll animatsiya, responsive |
| Xonadonlar typed ma'lumot sifatida | Filtr, solishtirish, ulashiladigan havola |
| Figma'dan design token'lar | Yagona uslub, tez o'zgartirish |
| Matnlar i18n fayllarda | uz/ru, keyinroq en |
| `/api/lead` yagona nuqta | CRM, Telegram, Sheets, reja kontekstini uzatish |

## Sprintlar

Muddatlar taxminiy ish kunlari. Figma ko'rilgach aniqlashtiriladi.

| Sprint | Maqsad | Natija | Taxmin |
|--------|--------|---------|-------|
| [S0](sprints/SPRINT-0-poydevor.md) | Poydevor | Loyiha, CI, preview havola, boshlang'ich o'lchovlar, kontent va assetlar | 0.5-1 kun |
| [S1](sprints/SPRINT-1-dizayn-tizimi.md) | Dizayn tizimi | Token'lar, shriftlar, header, footer, popup forma, uz/ru | 1 kun |
| [S2](sprints/SPRINT-2-bolimlar.md) | 1:1 bo'limlar | Frame 485 dagi barcha bo'limlar 1920px da dizaynga mos | 2-3 kun |
| [S3](sprints/SPRINT-3-v1-reliz.md) | **v1 reliz** | Responsive, lead, SEO, analitika, domen ko'chirish | 2 kun |
| [S4](sprints/SPRINT-4-premium-animatsiya.md) | Premium animatsiya | Intro, scroll hikoya, mikro-interaksiyalar | 2-3 kun |
| [S5](sprints/SPRINT-5-funksional.md) | ~~Funksional upgrade~~ (muallif qarori: qilinmaydi) | Xonadon tanlagich, reja modali, solishtirish, kalkulyator | 3-4 kun |
| [S6](sprints/SPRINT-6-portfolio.md) | Portfolio | Case study, oldin/keyin raqamlar, yakuniy QA | 1 kun |

**2026-11-05 o'zgarish:** v1 production'da (vercel.app). Muallif qarori bilan domen ko'chirish va Ads konversiyasi S4/S5 dan keyinga surildi.

**Nazorat nuqtalari:** S2 oxirida dizayn tasdig'i, S3 oxirida domen ko'chirish tasdig'i, S4 oxirida animatsiya
tasdig'i. Domen va DNS o'zgarishlari faqat alohida tasdiq bilan qilinadi.

## O'lchanadigan maqsadlar

Bular maqsad, natija emas. Boshlang'ich qiymat S0 da o'lchanadi.

- Mobil Lighthouse: Performance 90+, SEO va Accessibility 95+
- LCP 2.5s dan past, CLS 0.1 dan past, animatsiyalar bilan ham
- Bosh sahifa HTML hajmi: hozirgi 2.28 MB o'rniga 100 KB dan past
- `prefers-reduced-motion` to'liq qo'llab-quvvatlanadi

## Ochiq savollar

| # | Savol | Kimdan | Qaysi sprintni to'sadi |
|---|-------|--------|------------------------|
| 1 | ~~Figma havolasi~~ Berildi, [docs/FIGMA.md](docs/FIGMA.md) | Umidjon | — |
| 2 | ~~Mobil maketlar~~ Yo'q. Tilda mobil versiyasi asos, UX bo'yicha yaxshilash mumkin | Umidjon | — |
| 3 | ~~Lidlar qayerga~~ Google Sheets, Apps Script orqali (`docs/LEADS.md`). Muallif deploy qiladi | Umidjon | S3 |
| 4 | ~~Shriftlar~~ Retni Sans OFL (repoda), PP Right Gothic Blob orqali (D5) | — | — |
| 5 | ~~Maydon farqi~~ Muallif: hozircha saytdagidek qoladi | Umidjon | — |
| 6 | ~~1, 2, 3 tablar~~ Xona soni. Tilda'da 1 xonali reja yo'q, "Jami" = 25 reja | — | — |
| 7 | Narx, bo'lib to'lash shartlari va bo'sh xonadonlar ma'lumoti beriladimi? | Quruvchi | S5 |
| 8 | Domen DNS boshqaruviga kirish kimda? | Umidjon | S3 |
