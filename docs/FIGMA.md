# Figma xaritasi

Fayl: [AVALON-Residence](https://www.figma.com/design/CoILrhxoEugMILTX5I11sx/AVALON-Residence?node-id=126-1150), sahifa "Page 1".
Asosiy ramka: **Frame 485** (`126:1150`), 1920 x 10624 px. "Page 2" (`573:2268`) hali ko'rilmagan.
Mobil va planshet maketlari yo'q (muallif tasdiqladi): mobil versiya Tilda asosida, UX yaxshilanishlari bilan quriladi.

## Bo'limlar

Y ramka ichidagi joy. Barcha bo'limlar alohida frame, bu komponentlarga bo'lishni osonlashtiradi.

| # | Frame | Node | Y | O'lcham | Mazmuni |
|---|-------|------|---|---------|---------|
| 1 | 1-blok | `209:3594` | 10 | 1900x960 | Header (logo, 6 ta menyu, telefon, RUS) va hero: 268 xonadon, yer osti parking, "Konsultatsiya olish" |
| 2 | 2-blok | `491:2240` | 1090 | 1728x749 | "Shahar ichida — o'z olamingiz", loyiha tavsifi |
| 3 | 3-blok | `491:2241` | 1959 | 1728x800 | "Afzalliklari detallarda!": 268, 12-14 qavat, 3 blok, 2028, 3 m shift, 48-89 m², 4 ta afzallik |
| 4 | 4-blok | `491:2244` | 2879 | 1923x1257 | "Hamma narsa yaqin": manzil, xarita (ko'chalar, metro), 6 ta masofa |
| 5 | 5-blok | `491:2246` | 4256 | 1728x800 | Lead forma (ism, telefon) va 4 ta qulaylik |
| 6 | 6-blok | `491:2248` | 5176 | 1648x1608 | "Faoliyat hududlari": 7 ta zona |
| 7 | 7-blok | `323:2241` | 6944 | 1408x952 | "Zamonaviy klassika": fasad materiallari, 6 ta element |
| 8 | 8-blok | `325:2460` | 7976 | 2040x924 | "Oila uchun yaratilgan rejalar": 1/2/3 tablar, kartalar, "ariza qoldirish" |
| 9 | 9-blok | `491:2250` | 9104 | 1728x800 | Ikkinchi lead forma, manzil, telefon |
| 10 | 10-blok | `325:2461` | 10024 | 1920x600 | Footer: menyu, "Yuqoriga", ish soatlari, quruvchi, © 2026 |

Konteyner kengligi asosan 1728 px (har tomonda 96 px). 8-blok 2040 px: kartalar slayderi ekrandan chiqib turadi.

## Kuzatuvlar

- 8-blokdagi kartalarda namunaviy ma'lumot bor ("1-xonali, maydon 30 m²"). D2 bo'yicha xonadonlar ma'lumoti Tilda saytidan olinadi.
- Figma'da ish soatlari ikki qator: Du-Ju 10:00-20:00, Sha-Ya 10:00-19:00. Tilda'da faqat Du-Ju.
- Footerda quruvchi: ARX PROEKT / MAMUR PROEKT.
- Maydon: Figma'da 48-89 m². Muallif qarori: saytdagi raqamlar o'zgartirilmaydi, farq shu ro'yxatda qayd etiladi.

## Figma va Tilda farqlari (S1 da hal qilingan, D2 bo'yicha Tilda olingan)

| Joy | Figma | Kodda (Tilda) |
|-----|-------|---------------|
| Header va footer menyusi | 6 band, "Qurilish" bor | 5 band, "Qurilish" yo'q (Tilda'da bunday bo'lim va anchor yo'q) |
| Til tugmasi | "RUS" | "RU" / "Узб" |
| Hero va footer ijtimoiy tarmoqlar | Instagram, YouTube, Telegram | Instagram, Telegram. Tilda'da YouTube havolasi yo'q |
| Footer ish soatlari | Du-Ju 10:00-20:00, Sha-Ya 10:00-19:00 | Du-Ju 9:00-19:00 (T2.10 da muallif bilan aniqlanadi) |
| Footer manzili | "Toshkent, Yashnobod tumani, Tuzel massivi, 2-kvartal, 33" | "Toshkent, Yashnobod t, Tuzel m, 2-kvartal, 33" |
| Popup | Figma'da yo'q | Tilda tuzilmasi, Figma 5-blok formasining uslubi |
| Rejalar tablari | Jami, 1, 2, 3 | Jami, 2, 3. 1 xonali reja yo'q, bo'sh tab ko'rsatilmaydi |
| Reja kartalari | Namunaviy "1-xonali, 30 m²" | Tilda'dagi 25 reja va maydonlar |
| Rejalar slayderi | Strelka yo'q | Kartalar ostida ← → (sichqoncha bilan surish uchun) |
| Faoliyat hududlari kartasi | Faqat nom | Nom va Tilda'dagi qisqa izoh |
| Joylashuv masofalari | 300 m metro, 700 m Korzinka, 1 km, 1.2 km, 1.4 km, 1.5 km masjid | Tilda: 210 m Korzinka, 350 m metro, 900 m masjid, 1.2 km, 1 km, 1.4 km |
| Fasad materiallari | "Pastki qavatlar: Tabiiy granit", "1-2 qavat: Dekorativ kirpich" | Tilda: "Yuqori qavatlar: Dekorativ kirpich", "1-2 qavat: Tabiiy granit" |
| Afzalliklar ro'yxati tartibi | Parking, seysmik, kirish nazorati, kinoteatr | Tilda tartibi: kirish nazorati, parking, kinoteatr, seysmik |
| Mobil header | Maket yo'q | Logo tab, telefon va burger tugmasi, o'ngdan krem panel (Tilda asosida, telefon raqami qo'shildi) |

## REST API orqali olingan ma'lumot

MCP Starter limiti tugagani uchun dizayn `npm run figma` (`scripts/figma-fetch.mjs`) bilan olinadi. `FIGMA_TOKEN` kerak.

- `design/figma/frame-485.json`: Frame 485 ning to'liq node daraxti. Har elementning o'lchami, joyi, rangi, shrifti va effektlari shu yerda. Koordinatalar absolyut, frame boshi: x=-21543, y=-17738.
- `design/figma/preview/*.jpg`: har blok va butun frame render'i (1x). Asl PNG lar `renders/` da, ular gitignore qilingan.
- `design/figma/fills/`: dizayndagi rasmlar. Hozircha yuklanmagan, chunki `s3-alpha-sig.figma.com` tarmoqda yopiq. Aksariyat rasmlar Tilda'dan olingan `public/images/` ichida bor.
- REST API da 2-10 bloklar `GROUP`, 1-blok `FRAME`.

## Token'lar (JSON dan, S1 uchun boshlang'ich)

**Ranglar** (necha marta ishlatilgani bo'yicha):

| Token | Qiymat | Izoh |
|-------|--------|------|
| gold | `#C8A45D` | Asosiy aksent, tugmalar, chiziqlar, sarlavhalar |
| gold-alt | `#CEA150` | Ba'zi tugma va ikonlar, ehtimol gold bilan birlashtiriladi |
| gold-dark | `#8A6F3C` | Bitta joyda |
| navy | `#0B2239` | Asosiy matn rangi (`#0B2339` ham uchraydi, bitta qilinadi) |
| navy-18 | `#0B2239` 18% | Chegara va ajratgichlar |
| cream | `#F4EFE6` | Bo'lim foni, forma bloklari |
| sand | `#ECE4D2`, `#E9DEC4`, `#F1EBDD`, `#F2EBDF` | Yordamchi fonlar |
| line | `#DCD2BC` | Stroke |
| white / black | `#FFFFFF`, `#000000` | |

**Shriftlar:**
- **PP Right Gothic** 500: sarlavhalar. 40/40, 40/48, 40/60 (UPPER), 25/29-38 (UPPER), 20/23 (UPPER)
- **Retni Sans** 300/400/500: matn. 25/25-38, 15.625/16-23, 12/18
- **Inter** 400 12/15: xarita yozuvlari (36 marta), **Manrope** 700 23/31: 3 joy. Ikkalasi Google Fonts da bor

**Radius:** 10 (40 joy), 20 (28), 25, 50, 360 (pill). **Effektlar:** background blur 50 (5 joy), yumshoq drop shadow'lar.
