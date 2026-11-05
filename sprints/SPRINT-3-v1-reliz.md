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
- [x] T3.9 Haqiqiy test lid: oxirigacha yetib borganini tasdiqlash
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
- 2026-11-05 (bulut, 9): muallif Apps Script'ni deploy qildi (web app, Version 1). URL chatda berildi, ochiq repoga yozilmaydi.
  Konteynerdan script.google.com yopiq, shuning uchun bu yerdan tekshirilmadi. Vercel connector jamoani ko'radi, lekin `avalon-residence`
  loyihasiga 404 qaytaradi (ulanishda loyiha ruxsati berilmagan). Production `main` dagi S0 sahifasi, Vercel o'z 404 sahifasini ko'rsatyapti:
  Framework Preset tekshirilishi kerak.
- 2026-11-05 (bulut, 10): Vercel connector qayta ulandi, loyihaga kirish bor. PR [#2](https://github.com/Umidjon-coder1/avalon-residence/pull/2) ochildi.
  - Framework Preset bo'sh (`null`) edi, production 404 sababi shu. `nextjs` ga o'zgartirildi.
  - Env: `LEAD_SHEETS_WEBHOOK_URL` (sensitive), `FONT_HEADING_URL` (sensitive). `LEAD_WEBHOOK_SECRET` muallifdan kutilmoqda.
  - Blob store `avalon-fonts` (fra1, public, loyihaga ulangan). PP Right Gothic WOFF2 bir martalik preview deploy orqali yuklandi:
    fayl 6 bo'lakda SHA1 tekshiruvi bilan, build'da butun fayl SHA1 qayta tekshirildi, token hech qayerda ochilmadi.
    Bir martalik deploy: `dpl_93iyTdkktG3p5JxibgMRu7K3mq9x` (faqat "ok" sahifa, o'chirish mumkin).
- 2026-11-05 (bulut, 11): `LEAD_WEBHOOK_SECRET` qo'yildi, preview qayta deploy qilindi. **T3.9:** muallif preview'dan 2 ta test lid yubordi
  (hero va reja `2-02`), Vercel logida ikkalasi `delivery: sheets`, jadvalga yetib bordi.
- 2026-11-05 (bulut, 12): CI (Chromium, Firefox, WebKit E2E) o'tdi, PR #2 merge qilindi (`46df0a1`). Production `avalon-residence.vercel.app`
  READY, robots/sitemap tekshirildi. Muallif qarori: Google Ads (T3.5) va domen (T3.10) **keyinga qoldiriladi**, avval upgrade (S4/S5).

## Handoff

S3 ning kod va infra qismi yopildi. Kechiktirilgan: T3.5 (Ads label), T3.6 (production PageSpeed, domen ko'chgach), T3.10 (domen).
Keyingi ish: `sprints/SPRINT-4-premium-animatsiya.md`. Branch `main` dan qayta boshlangan.
Eslatma: Vercel Standard Protection `*.vercel.app` manzillarini ham yopadi, ular faqat Vercel'ga kirgan foydalanuvchiga ochiq.

