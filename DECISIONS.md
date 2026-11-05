# DECISIONS

## D1. Reja boshidan, ijro bosqichma-bosqich

Avval 1:1 v1, keyin upgrade tartibida ishlanadi, lekin arxitektura upgrade'ni oldindan hisobga oladi.
**Sabab:** faqat 1:1 ko'chirilsa, animatsiya va tanlagich uchun bo'limlar qayta yoziladi. Hammasi birdan qilinsa,
xato manbasini topish qiyinlashadi va ishlab turgan reklama saytini almashtirish xavfi oshadi.

## D2. "1:1" manbalari: dizayn Figma'dan, kontent Tilda'dan

Tilda HTML ko'chirilmaydi. Tartib va uslub Frame 485 dan, matn va ma'lumotlar jonli saytdan olinadi. Farq
chiqsa, ro'yxatga yozilib muallif hal qiladi.
**Sabab:** Tilda kodi 2.28 MB, uning 1.4 MB qismi inline CSS.

## D3. Stack

- **Next.js App Router, statik generatsiya:** tez sahifa, SEO, lead uchun route handler bitta loyihada
- **TypeScript, Tailwind CSS:** token'lar va typed ma'lumot
- **next-intl:** `/` uz va `/ru` manzillari saqlanadi, SEO yo'qolmaydi
- **GSAP + ScrollTrigger, Lenis:** murakkab scroll animatsiyalar uchun. Ikkinchi animatsiya kutubxonasi qo'shilmaydi
- **Ma'lumotlar bazasi yo'q:** xonadonlar v1 da repodagi typed fayl. CMS yoki CRM sinxroni real ehtiyoj chiqqanda qo'shiladi
- **Vercel:** preview havolalar va oson rollback
- **Playwright:** vizual solishtirish va asosiy oqim testlari

## D4. Domen v1 tayyor bo'lgach ko'chiriladi

Domen S3 dan keyin, premium qatlamni kutmasdan ko'chiriladi. Tilda sayti rollback uchun kamida 2 hafta faol
qoladi. Keyingi sprintlar preview orqali tekshirilib kichik relizlarda chiqadi.
**Sabab:** saytda reklama tegi bor, tezlik va lid ishonchliligi birinchi navbatda. Har bir o'zgarish alohida qaytariladi.

## D5. Repo ochiq, shrift fayllari litsenziya aniqlanguncha unga kirmaydi

PPRightGothic va RetniSans litsenziyasi tekshirilmagan. Ochiq repoga qo'yish fayllarni tarqatish hisoblanishi mumkin.
Ruxsat bo'lmasa, shriftlar build vaqtida yopiq manbadan olinadi. Maxfiy kalitlar faqat environment o'zgaruvchilarida saqlanadi.
