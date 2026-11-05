# S4 — Premium animatsiya

**Maqsad:** saytni hikoyaga aylantirish. Sekin, aniq, arxitekturaga mos harakat. Bezak uchun effekt qo'shilmaydi.

- [x] T4.1 Motion tizimi: umumiy easing va davomiylik, GSAP va Lenis ulash, reduced-motion
- [x] T4.2 Intro: logo va hero ochilishi, LCP'ni kechiktirmaydi, faqat birinchi tashrifda
- [x] T4.3 Hero: sarlavha qatorlari, rasm masshtabi va parallax
- [x] T4.4 Afzalliklar: raqamlar sanalishi, chiziqlar chizilishi
- [~] T4.5 Joylashuv: SVG xaritada yo'llar chiziladi, nuqtalar masofa bilan bog'lanadi (masofalar chizig'i tayyor, xarita ichi keyin)
- [ ] T4.6 Faoliyat hududlari: pin qilingan scroll, mask orqali slayd o'tishi, 01/06 hisoblagich
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

## Handoff

Keyingi: T4.6 (faoliyat hududlari pin + mask + 01/06), T4.7 (fasad, kechki yoritish rejimi), T4.8 FLIP, T4.9 kursor, T4.5 xarita ichi.
Muallif 1-bosqichni preview'da ko'rib fikr beradi.

