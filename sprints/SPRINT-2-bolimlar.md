# S2 — 1:1 bo'limlar

**Maqsad:** Frame 485 ning 1920px dagi aniq kodi. Animatsiya hali yo'q, lekin tuzilma unga tayyor.

- [x] T2.1 Hero (S1 da header bilan birga qilindi)
- [x] T2.2 Afzalliklar
- [x] T2.3 Joylashuv: SVG xarita, masofalar, Yandex havola
- [x] T2.4 Lead bloki va qulayliklar
- [x] T2.5 Faoliyat hududlari: 6 slayd
- [x] T2.6 Materiallar: fasad elementlari
- [x] T2.7 Rejalar: tablar (Jami, 2, 3), 25 reja `src/content/apartments.ts` dan, "Ariza qoldirish" popupga reja ma'lumotini uzatadi
- [x] T2.8 Aloqa
- [x] T2.9 Vizual solishtirish: Figma va kod, 1920px, farqlar ro'yxati
- [x] T2.10 Kontent farqlarini hal qilish: maydon oralig'i, ish vaqti

**Tayyor:** barcha bo'limlar uz va ru tilida, farqlar ro'yxati muallif tomonidan tasdiqlangan.

## Hisobot

- 2026-11-05 (bulut, 6): S2 bo'limlari yozildi, `src/components/sections/`.
  - **T2.2** Afzalliklar: rasm ustiga kirib turgan oltin karta (CSS grid, absolute yo'q), raqamlar `t.rich` bilan, chunki uz va ru da so'z tartibi har xil.
  - **T2.3** Joylashuv: intro, ekran bo'ylab masofalar chizig'i, manzil, rasm, "Xaritada ko'rish" (Yandex), SVG xarita. Xarita ichidagi 1080 px PNG 320 px WebP ga tushirildi (578 KB -> 279 KB, gzip 104 KB), pastda lazy yuklanadi.
  - **T2.4** Lid bloki: forma kartasi (`LeadCard`), 4 qulaylik, rasm.
  - **T2.5** Faoliyat hududlari: ikki ustun, birinchisi 120 px pastdan. Mobilda gorizontal slayder. S0 da tushib qolgan 6 ta zona rasmi va 1 ikonka Tilda'dan yuklandi.
  - **T2.6** Fasad: oltin fon (7-8 bloklar uchun umumiy), 6 doira rasm Tilda'dagi rasmlardan.
  - **T2.7** Rejalar: tablar (Jami, 2, 3), slayder, strelkalar. "Ariza qoldirish" popupga reja id sini beradi (tekshirildi: `apartment: "3-02"` API ga yetdi). Serverda 6 karta, qolganlari brauzerda qo'shiladi.
  - **T2.8** Aloqa: forma, manzil va telefon, Yandex xarita vidjeti (Tilda'dagi). Bulut muhitida yandex.uz yopiq, xarita faqat production/preview'da ko'rinadi.
  - Umumiy: `CtaPair` (ikki qismli tugma), `ConsultCta`, `SectionIntro`, `--spacing-section` token'i, 10 ta yangi ikonka.
  - Reja rasmlari PNG -> WebP. `next.config.ts` da rasm o'lchamlari qisqartirildi, blur placeholder'lar olib tashlandi.
  - **T2.9** 1920 px da Figma bilan yonma-yon solishtirildi, sahifa balandligi 10556 px (Figma 10624). Farqlar `docs/FIGMA.md` da.
  - O'lchov: HTML 180 KB, gzip 29 KB (Tilda 2.28 MB). 390 px da gorizontal siljish yo'q, konsolda xato yo'q.
- 2026-11-05 (bulut, 7): asl shriftlar ulandi (T1.2). Retni Sans OFL ekan, repoga WOFF2 subset (3 x 38 KB). PP Right Gothic tijoriy:
  `scripts/fetch-fonts.mjs` build oldidan `FONT_HEADING_URL` dan yuklaydi, bo'lmasa Oswald. Manrope olib tashlandi, Oswald oldindan yuklanmaydi.
  Brauzerda faqat 4 shrift yuklanadi (Retni 300/400/500, PP Right Gothic 500). Hero sarlavhasi endi Figma'dagidek bo'linadi.
  Vercel connector boshqa akkauntga ulangan (unda loyiha yo'q), shuning uchun faylni Blob'ga muallif yuklaydi.

- 2026-11-05 (bulut, 8): T2.10 muallif qarori: Tilda qiymatlari qoladi (maydon 49.8-89.5 m², Du-Ju 9:00-19:00). Kodda shunday edi, o'zgarish yo'q. S3 boshlandi.

## Handoff

S2 yopildi. Davomi: `sprints/SPRINT-3-v1-reliz.md`.
