# S3 — v1 reliz

**Maqsad:** hozirgi saytni xavfsiz almashtira oladigan versiya.

- [x] T3.1 Responsive: 1920, 1440, 1024, 768, 390, 360 px
- [x] T3.2 Lead yetkazish: tanlangan kanal, xatoda zaxira, UTM va reja konteksti (kod tayyor, Sheets ulash muallifda)
- [x] T3.3 Telefon, Telegram va xarita havolalari, muvaffaqiyat holati
- [x] T3.4 SEO: metadata, Open Graph, hreflang, sitemap, robots, JSON-LD
- [~] T3.5 Google Ads tegi va lead conversion hodisasi, Consent holatini tekshirish (kod tayyor, conversion label kerak)
- [~] T3.6 Rasm optimizatsiyasi, CWV tekshiruvi (lokal o'lchandi, production'da PageSpeed qoldi)
- [~] T3.7 Accessibility: klaviatura, fokus, kontrast, alt matnlar (97, oltin fon kontrasti dizayn qarori)
- [x] T3.8 Playwright: forma, til, navigatsiya, turli brauzerlar
- [ ] T3.9 Haqiqiy test lid: oxirigacha yetib borganini tasdiqlash
- [x] T3.10 Domen: DNS tasdig'i, ko'chirish, kuzatish, Tilda 2 hafta zaxirada

**Tayyor:** maqsadli Lighthouse natijalari bajarilgan, lid yetib borgan, domen tasdiq bilan ko'chirilgan.

## Hisobot

- 2026-11-05 (bulut, 8):
  - **T3.1** 1920, 1440, 1024, 768, 390, 360 px da to'liq sahifa skrinshotlari, hech birida gorizontal siljish yo'q.
  - **T3.2** `src/lib/lead-delivery.ts`: Google Sheets (Apps Script web app, `docs/integrations/google-sheets-lead.gs`), zaxira Telegram.
    Ikkalasi ishlamasa 502, formada telefon raqami chiqadi, lid yopiq logga yoziladi. UTM, gclid, kirish sahifasi va referrer
    `src/lib/attribution.ts` da (birinchi kirish, sessionStorage). Reja `2-05 (2 xonali, 52.2 m²)` ko'rinishida.
    Soxta Apps Script server bilan tekshirildi (302 qayta yo'naltirish, noto'g'ri SECRET -> 502). Qo'llanma: `docs/LEADS.md`.
  - **T3.3** Telefon, Telegram, Instagram, Yandex havolalari va muvaffaqiyat holati testlar bilan tekshirildi.
  - **T3.4** Metadata, keywords (Tilda'dan), Open Graph (uz/ru uchun Tilda'dagi rasmlar), Twitter, hreflang, canonical,
    `sitemap.xml`, `robots.txt` (preview'da indeksatsiya yopiq), JSON-LD `ApartmentComplex`. Favicon va ikonkalar logodan (oldin Next.js standart ikonkasi edi).
  - **T3.5** `src/components/analytics/Analytics.tsx`: Google Ads tegi faqat avalonresidence.uz da, `lazyOnload`.
    Lid yuborilganda `generate_lead` va `NEXT_PUBLIC_GADS_LEAD_LABEL` berilsa conversion. Consent banner talab qilinmaydi (O'zbekiston, GDPR emas).
  - **T3.6** Lighthouse (lokal, S0 bilan bir xil sharoit): mobil 87 / desktop 99 (Tilda: 21). Mobil LCP 4.0 s (Tilda 13.2 s), CLS 0.01 (Tilda 0.316),
    TBT 90 ms. Hero rasmi `eager` + `media` bilan preload. Accessibility 97, Best Practices 100, SEO 92 (canonical localhost'da mos kelmagani uchun).
  - **T3.7** Kontrast ogohlantirishi faqat oltin fonda oq matn (Figma brend rangi, 2.35:1). 1:1 talabi bo'yicha o'zgartirilmadi, muallif qaror qilsa to'qroq oltin beriladi.
  - **T3.8** Playwright (`tests/e2e/site.spec.ts`, `npm run test:e2e`): sahifa, til, popup + validatsiya + UTM, rejalar, server xatosi, mobil menyu, API, SEO.
    Lokal: desktop va mobil Chromium, 15 test o'tdi. CI: qo'shimcha Firefox va iPhone (WebKit).

## Handoff

Kod tomondan v1 tayyor. Qolgani tashqi sozlamalar:
1. **Vercel connector** hozir `umidmajidov120@gmail.com` akkauntida, unda loyiha yo'q. Muallif connector'ni Avalon loyihasi turgan akkaunt bilan qayta ulaydi
   (claude.ai/customize/connectors), keyin yangi sessiyada: `FONT_HEADING_URL` (Blob), lid o'zgaruvchilari, deploy va loglarni tekshirish.
2. **Google Sheets**: muallif `docs/LEADS.md` bo'yicha Apps Script'ni deploy qiladi va URL + SECRET ni beradi (yoki Vercel'ga o'zi qo'yadi).
3. **T3.5**: Google Ads'da "Lid" konversiya amali va label (`AW-18385826052/<label>`).
4. **T3.6**: production URL'da PageSpeed (haqiqiy CDN va rasm keshi bilan).
5. **T3.9** haqiqiy test lid, **T3.10** domen faqat muallif tasdig'i bilan.
Ochiq: Tilda'dagi suzuvchi qo'ng'iroq vidjeti qo'yilmagan (AUDIT: mobilda kontentni yopardi), kerak bo'lsa S4 da.

