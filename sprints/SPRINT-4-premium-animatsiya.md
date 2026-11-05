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
- [x] T4.10 Mobil versiya: yengillashtirilgan animatsiyalar, past quvvatli qurilmada test (Lenis faqat desktop, animatsiyalar idle'da)

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

- 2026-11-05 (bulut, 6-bosqich, T4.10 tezlik):
  - Lighthouse (lokal, har commit 2 marta): 1-bosqich mobil 84-85 / TBT 70-90 ms; 2-5 bosqichlar mobil 78-87 / TBT 170-240 ms.
    Sabab: hududlar, materiallar, mashina va kursor animatsiyalari sahifa ochilganda bitta uzun vazifada tayyorlanardi.
    Birinchi o'lchovdagi 52 ball tasodif: server yangi ishga tushgan, rasmlar hali optimallanmagan edi.
  - Tuzatish: `onIdle()` (`src/lib/motion.ts`). ZonesMotion, FacadeMotion, LocationMotion, CursorMotion brauzer bo'sh qolganda,
    alohida-alohida tayyorlanadi. Tilda ikonkalari koordinatalari 0.01 gacha yaxlitlandi (fayl 31 -> 23 KB, ko'rinish bir xil).
  - Yakuniy: **mobil 83-90, TBT 60-70 ms, CLS 0.005, LCP 3.3-4.4 s** (simulyatsiya, 1-bosqichda 4.0-4.2 s);
    **desktop 97-98, TBT 0, CLS 0, LCP 0.8-1.0 s**.
  - Telefon (Pixel 7 emulyatsiya): reduced-motion'da yashirin element yo'q; CPU 4x sekin holatda oxirigacha scroll, xato yo'q,
    barcha `data-reveal` ochiladi. E2E 17 test o'tdi.
  - **S4 tugadi** (muallif tasdig'i va `main` ga qo'shish qoldi).

- 2026-11-05 (bulut, 7-bosqich, muallif fikri):
  - Rasm sifati: renderlar endi asl fayl holida (qayta siqilmaydi), fotolar `quality={90}` (`images.qualities: [75, 90]`).
    Joylashuv slaydining keyingi rasmlari faqat slayd ko'ringanda yuklanadi. Mobil Lighthouse 82-89, sahifa 730 KB.
  - Hududlar: tugmalar to'rtburchakroq (`rounded-card`), sarlavha boshqa bloklardek `text-h2`.
  - Navbar: hover'da matn rangidagi chiziq chapdan chiziladi.
  - Vidjet: loyihaning rasmiy raqami +998-78 113 73 73 (avalonresidence.uz); internetda boshqa rasmiy raqam topilmadi.
  - Tugmalar: oltin hover endi yorug'roq (`gold-light` #d8bc84), oq tugma hover'da qoraymaydi (yengil soya), krem tugma oppoq bo'ladi.
  - Joylashuv: Tilda'dagi chizilgan xarita qaytdi, manzil ostidagi rasm Tilda galereyasidek o'zi almashadi (`AutoSlideshow`, 6 rasm),
    manzil va rasm orasidagi katta bo'shliq olib tashlandi. Yandex xarita faqat "Aloqa" bo'limida, "Qanday borish" va "Xaritada ochish" bilan.
  - Kechki rejim: 4 ko'rinish. Fasad (kunduzgi old ko'rinish endi kechkisi bilan bir burchakdan), Hovli, Kirish (B-2), Parking.
  - Scroll sekinroq va silliqroq (Lenis `lerp` 0.1 -> 0.065, `wheelMultiplier` 0.85).
  - E2E 17 test o'tdi.

- 2026-11-05 (bulut, 8-bosqich, muallif fikri):
  - Logolar: asl SVG ichidagi 4096 px rasmdan 2-4x o'lchamda qayta chiqarildi (480/960 px, WebP 95), `unoptimized` (qayta siqilmaydi).
  - Rasmlar: faqat WebP (AVIF mayda detallarni yumshatardi), hududlar fonida kattalashtirish 1.1 -> 1.05.
  - CTA: oq tugmada soya olib tashlandi (ikki bo'lak alohida soya berardi), oltin hover bilinar-bilinmas (#cdab66), strelka harakati qoldi.
  - Joylashuv: galereya ostida "Xaritada ko'rish" tugmasi qaytdi; chap ustun (manzil, rasm, tugma) xarita balandligiga teng.
  - Hududlar: matn va tugma bitta guruh, slayd pastida.
  - Footer: menyu tepadagidek chiziqli hover (`link-underline` utility), pastida katta "AVALON RESIDENCE" oltin gradient yozuvi
    (Grand dizayni kabi, `FooterMotion` bilan pastdan ko'tariladi).
  - E2E 17 test o'tdi.

- 2026-11-05 (bulut, 9-bosqich):
  - Hududlar (telefon): rasm slaydning yuqori 64% qismida, matn ostida navy fonda; har rasmga mavzu nuqtasi (`focus`)
    berildi (suhbatlashayotganlar, favvora, karusel, kino, BBQ, parking kirishi). Desktop o'zgarmadi.
  - Mobil menyu: to'q navy panel, oltin nur, raqamlangan katta bandlar (01-05) ingichka chiziqlar bilan, ketma-ket ko'tariladi;
    pastda telefon (katta), ish vaqti va manzil, chiziqli Telegram/Instagram, til tugmasi, oltin konsultatsiya tugmasi.
  - E2E 17 test o'tdi. Muallif PR ochib `main` ga qo'shishni tasdiqladi.

## Handoff

S4 `main` ga qo'shildi (production). Keyingi: S5 (funksional upgrade), `sprints/SPRINT-5-funksional.md`.
Yandex xarita productionda tekshirilishi kerak (konteynerdan yopiq).
