# S4 — Premium animatsiya

**Maqsad:** saytni hikoyaga aylantirish. Sekin, aniq, arxitekturaga mos harakat. Bezak uchun effekt qo'shilmaydi.

- [x] T4.1 Motion tizimi: umumiy easing va davomiylik, GSAP va Lenis ulash, reduced-motion
- [x] T4.2 Intro: logo va hero ochilishi, LCP'ni kechiktirmaydi, faqat birinchi tashrifda
- [x] T4.3 Hero: sarlavha qatorlari, rasm masshtabi va parallax
- [x] T4.4 Afzalliklar: raqamlar sanalishi, chiziqlar chizilishi
- [x] T4.5 Joylashuv: mashina masofalar yo'li bo'ylab yuradi (desktop gorizontal, mobil vertikal), premium kulrang xarita
- [x] T4.6 Faoliyat hududlari: ekran balandligidagi slaydlar ustma-ust o'tadi (sticky stack), 01/06 hisoblagich
- [ ] T4.7 Materiallar: fasad bo'ylab scroll, element yoritiladi, kechki yoritish rejimi
- [~] T4.8 Rejalar: tab o'tishi, karta hover, FLIP layout (tab o'tishi va hover tayyor)
- [~] T4.9 Mikro-interaksiyalar: tugma, menyu, popup, desktopda maxsus kursor (popup va menyu tayyor)
- [~] T4.10 Mobil versiya: yengillashtirilgan animatsiyalar, past quvvatli qurilmada test (Lenis faqat desktop, idle start)

**Tayyor:** maqsadli LCP/CLS saqlangan, reduced-motion'da kontent to'liq, muallif tasdiqlagan.

## Hisobot

- 2026-11-05 (bulut, 1-bosqich):
  - **T4.1** GSAP 3.15 (SplitText, ScrollTrigger; Standard no-charge litsenziya), @gsap/react, Lenis 1.3. Tokenlar `src/lib/motion.ts`,
    plaginlar `src/lib/gsap.ts`. `<head>` dagi skript `html.motion` va `html.intro` qo'yadi, reduced-motion'da hech narsa yashirilmaydi.
    Lenis (`MotionRoot`) faqat sichqonchali qurilmada, alohida yuklanadi, modal ochiqligida to'xtaydi, anchor'lar silliq.
  - **T4.2** Intro: krem parda va logo, faqat birinchi tashrifda (localStorage), ~1.5 s. JS ishlamasa CSS 3 s da ochadi.
  - **T4.3** Hero: rasm 1.2 -> 1.08 masshtab (LCP rasmi yashirilmaydi), header, belgilar, sarlavha qatorlari (SplitText mask), CTA, ijtimoiy. Parallax.
  - **T4.4** Afzalliklar: raqamlar sanaladi (yillar sanalmaydi, kenglik oldindan band, CLS yo'q), chiziq chiziladi, karta va rasm ochiladi.
  - Umumiy: `PageMotion` `[data-reveal]`, `[data-reveal="image"]` (clip-path parda), `[data-draw]`. Sahifa ichida, idle'da ishga tushadi
    (React 418 hydration xatosi shu bilan tuzatildi, TBT 440 -> 80 ms). JS kechiksa CSS 3 s da ko'rsatadi.
  - **T4.5** Masofalar chizig'i: scroll bilan mashina yuradi, oltin chiziq chiziladi, nuqtalar to'ladi (desktop).
  - **T4.8, T4.9** Reja tablari almashganda kartalar kirib keladi, hover. Popup va mobil menyu ochilish animatsiyasi (CSS).
  - O'lchov (lokal Lighthouse, intro bilan): mobil 86, desktop 98, CLS 0.005, LCP 3.9 s. E2E 15 test o'tdi (hero CTA animatsiyani kutadi).

- 2026-11-05 (bulut, 2-bosqich, muallif fikri asosida):
  - Hero: barcha ekranlarda to'liq balandlik (`100svh` karta), gradient yengillashdi (rasm yorug'roq), sarlavha ikki teng qatorda (`text-balance`).
    Header telefon tugmasida ikonka va raqam orasidagi bo'sh joy olib tashlandi.
  - Ikonkalar Tilda'dagi asl SVG'lar bilan almashtirildi: `src/components/ui/tilda-icons.tsx` (header, hero, afzalliklar, qulayliklar,
    aloqa, footer, menyu, CTA strelkasi). Tilda'da yo'q ikonkalar (yopish, menyu, slayder strelkalari, chat) `icons.tsx` da qoldi.
  - Aloqa vidjeti (`ContactWidget`): o'ng pastda, Tilda'dagi Telegram (t.me/avalonresidence_uz) va telefon (+998 91 071 01 05).
    Bosh ekranda yashirin (mobilda CTA ni yopmasin), scroll'dan keyin chiqadi. Esc va tashqariga bosish yopadi.
  - **T4.5** Mashina yo'li mobilda ham: yo'l vertikal, mashina (yuqoridan ko'rinish) pastga yuradi; tezlikka qarab biroz og'adi.
    Tilda SVG xarita o'rniga `PremiumMap`: kulrang Yandex xarita (iframe, API kalit kerak emas), markazda olmos shaklidagi logo belgisi,
    manzil kartasi, "Qanday borish" (Yandex yo'nalish) va "Xaritada ochish". Xarita scroll'ni ushlamaydi.
  - **T4.6** Faoliyat hududlari: har bir hudud ekran balandligidagi slayd, `sticky` bilan keyingisi ustiga chiqadi, orqadagisi kichrayib
    qorayadi (`ZonesMotion`, scrub). Desktopda o'ngda aniq rasm, fonda xira rasm (Tilda rasmlari 625x600, to'liq ekranga yetmaydi).
  - E2E 17 test o'tdi (vidjet testi qo'shildi; rejalar testi endi bo'limga scroll qiladi).
  - Namuna saytlar (rams-saiahat.kz, kenesary-qs.kz) konteynerdan ochilmadi, ular muallifning tavsifi va skrinshoti asosida qilindi.

## Handoff

Keyingi: T4.7 (fasad, kechki yoritish rejimi), T4.8 FLIP, T4.9 kursor, T4.10 real telefonda test.
Muallifdan: mashina harakati va xarita namunaga mos kelganini preview'da tasdiqlash; Telegram vidjeti admin lichkasi
`avalonresidence_uz` ekanini tasdiqlash (Tilda'dagi havola shu); hududlar uchun kattaroq rasmlar bo'lsa, slaydlar to'liq ekran rasm bo'ladi.

