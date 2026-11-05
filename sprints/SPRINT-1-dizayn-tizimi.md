# S1 — Dizayn tizimi va karkas

**Maqsad:** barcha bo'limlar ishlatadigan umumiy qism.

- [x] T1.1 Figma'dan token'lar: rang, tipografiya, oraliq, radius, grid
- [ ] T1.2 Shriftlar: litsenziyani aniqlash, `next/font`, subset, yuklash strategiyasi (fallback tayyor, asl fayllar kutilmoqda)
- [x] T1.3 UI primitivlar: Button, Container, Section, Heading, Input, Modal
- [x] T1.4 next-intl: `/` uz, `/ru` ru, til almashtirgich
- [x] T1.5 Header va mobil menyu, anchor navigatsiya
- [x] T1.6 Footer
- [x] T1.7 Konsultatsiya popup: Ism, Telefon, `+998` niqobi, validatsiya
- [x] T1.8 `/api/lead` skeleti, spam himoyasi

**Tayyor:** header, footer va popup preview'da dizaynga mos, uz/ru almashadi.

## Hisobot

- 2026-11-05 (bulut, 5): S1 asosiy qismi.
  - **T1.1** Token'lar `src/app/globals.css` `@theme` ichida: ranglar (gold, navy, cream, sand, ink...), fluid tipografiya
    (`text-display`, `text-h2`, `text-h3`, `text-btn`, `text-body`, `text-caption`, 1920 px da Figma qiymati),
    radius (`card` 10, `btn` 20, `pill` 50), soya, `blur-glass`, `container-page` (1728 + 2x96), `--gutter`, `--frame-inset`.
  - **T1.2** Shrift token'lari: `font-heading` = "PP Right Gothic", keyin Oswald; `font-body` = "Retni Sans", keyin Manrope.
    Fallback'lar `next/font/google` orqali, latin + kirill. Asl fayllar ulanganda faqat `@font-face` qo'shiladi.
  - **T1.3** `src/components/ui/`: Container, Section, Heading, Button (`cream`, `gold`, `navy`), Input, Modal (native `<dialog>`), ikonkalar.
  - **T1.4** next-intl 4.14: `src/i18n/` (routing, request, navigation), `src/proxy.ts`. `/` uz, `/ru` ru, `/uz` -> `/` 307.
    Til `next/root-params` orqali olinadi (cacheComponents bilan mos). Ikkala sahifa statik. Brauzer tiliga avtomatik yo'naltirish o'chirilgan.
  - **T1.5** Header: logo "tab", shaffof panel, 5 menyu, til, telefon. 1280 px dan kichikda telefon va burger, o'ngdan krem panel.
  - **T1.6** Footer: Figma 10-blok, matnlar Tilda'dan.
  - **T1.7** Popup: Tilda tuzilmasi (rasm, sarlavha, ism, telefon), Figma 5-blok uslubi. Telefon niqobi `+998 00-000-0000`,
    nusxalangan `+998 90 123 45 67` ham to'g'ri o'qiladi. Barcha CTA `useConsult()` orqali bitta popupni ochadi, `source` va `apartment` uzatiladi.
  - **T1.8** `POST /api/lead`: validatsiya (umumiy `src/lib/lead.ts`), honeypot, 2 s dan tez yuborish rad etiladi, IP bo'yicha 5/10 daqiqa limit.
    Hozircha lid faqat logga yoziladi (telefon yashirilgan). Tekshirildi: to'g'ri, xato, bot, tez, limit holatlari.
  - **Qo'shimcha (S2 dan):** Hero bo'limi (T2.1), mobilda portret rasm. Logolar 700-800 KB lik SVG o'rniga 4-16 KB WebP (`public/images/brand/`).
  - Natija: bosh sahifa HTML 58 KB, 390 px da gorizontal siljish yo'q, konsolda xato yo'q.

## Handoff

S1 deyarli tugadi, faqat T1.2 (asl shriftlar) muallif qaroriga bog'liq. Keyingi qadam: **S2**, T2.2 "Afzalliklar"dan
(`sprints/SPRINT-2-bolimlar.md`). Hero tayyor, bo'limlar `src/app/[locale]/page.tsx` ga Figma tartibida qo'shiladi,
anchor `id` lari `src/content/nav.ts` dagidek bo'lishi kerak.

**Muallifdan kerak:**
1. Shriftlar (D5): taklif, fayllarni Vercel Blob'ga yuklab, build oldidan skript ularni `src/fonts/` ga tortadi (`.gitignore` da),
   `next/font/local` ulaydi. Muqobil: litsenziya ochiq repoga ruxsat bersa, to'g'ridan-to'g'ri repoga.
2. Popup va 5/9-blok formalari hozir lidni faqat Vercel logiga yozadi. Google Sheets S3 da ulanadi, ungacha bu sayt reklamaga qo'yilmaydi.

**Eslatma:** sarlavhalar fallback shriftda (Oswald) tor, shuning uchun hero sarlavhasi Figma'dagidan boshqacha bo'linadi. Asl shrift ulangach tekshiriladi.
