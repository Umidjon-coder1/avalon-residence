# S4 — Premium animatsiya

**Maqsad:** saytni hikoyaga aylantirish. Sekin, aniq, arxitekturaga mos harakat. Bezak uchun effekt qo'shilmaydi.

- [x] T4.1 Motion tizimi: umumiy easing va davomiylik, GSAP va Lenis ulash, reduced-motion
- [x] T4.2 Intro: logo va hero ochilishi, LCP'ni kechiktirmaydi, faqat birinchi tashrifda
- [x] T4.3 Hero: sarlavha qatorlari, rasm masshtabi va parallax
- [x] T4.4 Afzalliklar: raqamlar sanalishi, chiziqlar chizilishi
- [x] T4.5 Joylashuv: mashina masofalar yo'li bo'ylab yuradi (desktop gorizontal, mobil vertikal), premium kulrang xarita
- [x] T4.6 Faoliyat hududlari: ekran balandligidagi slaydlar ustma-ust o'tadi (sticky stack), 01/06 hisoblagich
- [x] T4.7 Materiallar: scroll'da materiallar navbat bilan yonadi, kechki yoritish rejimi (Kunduzi / Kechqurun)
- [x] T4.8 Rejalar: tab o'tishi, karta hover, faol tab foni siljib o'tadi (FLIP)
- [x] T4.9 Mikro-interaksiyalar: tugma, menyu, popup, aloqa vidjeti, desktopda maxsus kursor
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

- 2026-11-05 (bulut, 3-bosqich; namuna saytlar ochildi):
  - rams-saiahat.kz tekshirildi: mashina `react-scroll-parallax` bilan scroll'ga bog'liq siljiydi, desktopda gorizontal chiziq,
    telefonda o'ng tomonda vertikal yo'l. Bizda ham shunday: telefonda yo'l o'ngga o'tkazildi, matn chapda, mashina kattalashdi (112 px).
    Tuzatildi: telefonda mashina burilmay qolardi (GSAP CSS `rotate` ni o'z `rotation` iga oladi, og'ish 90° asosga qo'shiladi).
  - kenesary-qs.kz tekshirildi: Yandex Maps JS API 2.1 (kalitsiz), faqat fon qatlami kulrang, belgi rasmli.
    `YandexMap`: shu usulda, belgi = oltin olmos ichida logo, g'ildirak xaritani kattalashtirmaydi, telefonda bir barmoq bilan surilmaydi.
    Ekranga yaqinlashganda yuklanadi; API ochilmasa 10 s dan keyin oddiy Yandex vidjeti chiqadi. Kalit kerak bo'lsa: `NEXT_PUBLIC_YANDEX_MAPS_KEY`.
    Joylashuv va Aloqa bo'limlari ikkalasi shu xaritada. Telefonda manzil kartasi xarita ostida (belgini yopmaydi).
  - **T4.7** `FacadeMotion`: materiallar scroll'da kulrangdan rangga o'tadi, qatorda chapdan o'ngga ketma-ket.
  - **T4.8** Rejalar: faol tab foni (oq pill) bir tabdan ikkinchisiga siljiydi. **T4.9** `CursorMotion`: oltin halqa, havola/tugma ustida kattalashadi.
  - Konteynerdan Yandex yopiq: xarita soxta `ymaps` bilan tekshirildi (belgi joyi va karta). Haqiqiy xaritani preview'da ko'rish kerak.
  - E2E 17 test o'tdi.

- 2026-11-05 (bulut, 4-bosqich): muallif hududlar uchun katta renderlar yubordi (5 ta, 1500-2000 px).
  Bolalar maydoni, yashil zona (A podyezd va favvora, Tilda'da ham shu rasm), kinoteatr, mehmon zonasi (BBQ), parking
  endi to'liq ekran rasmli slayd (`media[].full`). Yopiq hovli hozircha eski kichik rasm bilan (xira fon + o'ngda karta).
  Eski 625x600 rasmlar o'chirildi (yopiq hovlinikidan tashqari). Telefonda fon rasmi balandlik bo'yicha qoplagani uchun
  `sizes` tuzatildi (aks holda 640 px nusxa cho'zilib xira chiqardi). E2E 17 test o'tdi.

- 2026-11-05 (bulut, 5-bosqich): muallif yopiq hovli renderi va 3 ta kechki render yubordi.
  - Hududlar: barcha 6 slayd to'liq rasmli, kichik rasm varianti (xira fon + karta) kodi olib tashlandi.
  - **T4.7** `DayNightView` (fasad bo'limi): "Kunduzi / Kechqurun" almashtirgich va 3 ko'rinish (fasad, hovli, parking).
    Kechki render kunduzgisi ustida silliq paydo bo'ladi. Bo'lim ekranga kelganda 1.2 s dan keyin o'zi kechki rejimga o'tadi
    (bir marta, foydalanuvchi bosmagan bo'lsa; reduced-motion'da yo'q). Rasmlar faqat tanlangan ko'rinish uchun yuklanadi.
    Hovli va parking kunduzgi/kechki renderlari bir xil burchakdan, fasad kunduzgisi boshqa burchakdan (Tilda rasmi).
  - E2E 17 test o'tdi.

## Handoff

Keyingi: T4.10 telefonda test va Lighthouse (rasmlar ko'paydi, LCP/CLS tekshiriladi), keyin muallif tasdig'i bilan S4 `main` ga, S5.
