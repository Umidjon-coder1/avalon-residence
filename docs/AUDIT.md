# Hozirgi sayt tahlili

Sana: 2026-11-05. Manba: `avalonresidence.uz` va `/ru` HTML kodi. Tilda boshqaruv paneli ko'rilmagan.

## Texnik holat

| Ko'rsatkich | Qiymat |
|-------------|--------|
| Platforma | Tilda, 36 blok, "Made on Tilda" belgisi bor |
| HTML hajmi | 2.28 MB, shundan inline CSS 1.4 MB |
| `<script>` teglari | 46 ta, 22 tasi tashqi fayl |
| Rasm va assetlar | 68 ta noyob Tilda CDN havolasi |
| Sahifalar | `/` (uz), `/ru` (ru) |
| Shriftlar | PPRightGothic, RetniSans |
| Analitika | Google Ads tegi `AW-18385826052`. HTML'da conversion hodisasi, Meta Pixel, Metrika topilmadi |
| Tuzilgan ma'lumot | HTML'dan qidirilmagan, S0 da tekshiriladi |
| PageSpeed | Pastdagi "Baseline" bo'limiga qarang |

## Bo'limlar

1. Header: menyu, telefon, RU
2. Hero: "Shahar ichida — o'z olamingiz"
3. Afzalliklar: 268 xonadon, 12-14 qavat, 3 blok, 2028, shift 3 m, 178 parking, 9 ball seysmik
4. Joylashuv: manzil, Yandex xarita havolasi, SVG xarita, 6 ta masofa
5. Lead bloki va qulayliklar
6. Faoliyat hududlari: 6 slayd
7. Materiallar: fasad bo'yicha 6 element
8. Rejalar: 1, 2, 3 tablar, 50 ta karta (42 ta 2-xonali, 8 ta 3-xonali, 13 xil maydon)
9. Aloqa va footer

## Forma

Ism va telefon. Barcha CTA bitta popupni ochadi. "Ariza qoldirish" tugmasidan qaysi reja tanlangani lidga
qo'shilayotgani HTML'da ko'rinmadi, Tilda qabul qiluvchilari panelda.

## Aniqlangan muammolar

- Maydon nomuvofiqligi: umumiy matnda 49.8-89.5 m², reja kartalarida 48.8-89.3 m²
- Rejalarda filtr, kattalashtirish va ulashish imkoniyati yo'q, faqat tablar va kartalar
- Narx va bo'lib to'lash haqida ma'lumot sahifada yo'q, "bo'lib to'lash" faqat meta keywords ichida
- Ish vaqti faqat Dushanba-Juma ko'rsatilgan, tekshirib olish kerak

## Baseline (S0, T0.5)

Sana: 2026-11-05. Lighthouse 12, bulut konteyneridagi Chromium (headless), `https://avalonresidence.uz/`, bitta o'lchov.
Qiymatlar real foydalanuvchi qurilmasidan farq qiladi. Yangi sayt ham xuddi shu muhitda o'lchanib solishtiriladi.

| Ko'rsatkich | Mobil | Desktop |
|-------------|-------|---------|
| Performance | **21** | baholanmadi (LCP aniqlanmadi) |
| Accessibility | 81 | 84 |
| Best Practices | 96 | 96 |
| SEO | 100 | 100 |
| FCP | 3.0 s | 1.6 s |
| LCP | **13.2 s** | — |
| Total Blocking Time | 1 790 ms | — |
| CLS | **0.316** | 0 |
| Speed Index | 6.8 s | 3.4 s |
| Sahifa og'irligi | 3 489 KiB | 3 489 KiB |

Skrinshotlar: `docs/baseline/tilda-{uz,ru}-{390,768,1920}.jpg`. Ular ekranma-ekran olinib birlashtirilgan, shuning uchun
qotirilgan qo'ng'iroq tugmasi har ekranda takrorlanadi. Ba'zi bo'sh joylar scroll animatsiyasi hali boshlanmagan bloklar.
Sahifa balandligi: 1920 px da 18 563 px, 390 px da 10 665 px.

## Mobil versiya kuzatuvlari (UX)

Muallif mobil versiyani Tilda'dan ko'r-ko'rona olmaslikni, kerak joyda yaxshilashni so'radi. 390 px da ko'rinadiganlar:

- Hero bo'limida asosiy rasm ko'rinmaydi, birinchi ekran deyarli bo'sh, faqat logo va ikki kichik belgi
- Sahifa uzun (10.6k px), bloklar orasida katta bo'sh joylar
- Qotirilgan qo'ng'iroq tugmasi kontent va tugmalar ustiga tushadi
- "Afzalliklar"da maydon raqamlari bir-birining ustiga chiqadi ("49.8dan 89.5²")
- Rejalar faqat gorizontal slayderda, "1" tabi mobilda yashirin, filtr yoki kattalashtirish yo'q
- Hujjat kengligi viewport'dan katta (Zero bloklar tashqariga chiqadi), gorizontal siljish xavfi bor
- Lead forma ikki marta takrorlanadi, telefon maydonida mamlakat tanlagich keraksiz joy oladi

