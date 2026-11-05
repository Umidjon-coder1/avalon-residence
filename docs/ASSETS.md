# Assetlar

Manba: Tilda CDN, 2026-11-05 da yuklandi (66 fayl, 9.3 MB). Fayllar `public/images/<bo'lim>/` ichida.
Bo'lim nomi rasm birinchi ishlatilgan Tilda blokidan olingan. `meta` sahifa `<head>` qismidagi favicon va OG rasmlari,
`misc` esa CSS yoki slayder JSON ichidagi rasmlar, ularning aniq joyi S2 da belgilanadi.

## Optimizatsiya rejasi

- Fotolar (webp, jpg, png > 100 KB) `next/image` orqali AVIF/WebP va `sizes` bilan beriladi, original 1920 px dan oshmaydi
- 500-800 KB lik SVG fayllar (`hero-06`, `meta-01`, `menu-01`, `footer-01`, `misc-02`, `location-01`) ichida raster bo'lishi mumkin: S1 da SVGO yoki toza vektor/WebP bilan almashtiriladi
- Reja rasmlari (`plans/`, 512x600 PNG, ~20 KB) WebP ga o'tkaziladi, S5 da kattalashtirish uchun yuqori sifatli manba so'raladi
- Ikonalar inline SVG komponentga aylantiriladi (`src/components/ui/icons.tsx`)
- **S1 da qilindi:** logolar ichida 4096 px PNG bor ekan. Chromium'da kerakli o'lchamda render qilinib WebP ga o'tkazildi:
  `brand/logo-mark.webp` (header, 240x240, 4 KB, manba `hero-06.svg`), `brand/logo-footer.webp` (480x144, 13 KB, manba `footer-01.svg`),
  `brand/logo-menu.webp` (480x144, 16 KB, manba `menu-01.svg`). Eski SVG'lar hozircha joyida, S3 da favicon bilan birga tozalanadi
- **S2 da qilindi:**
  - S0 da tushib qolgan 7 fayl Tilda'dan olindi: `zones/zone-{courtyard,green,kids,cinema,guest,parking}.webp`
    (Tilda `Rectangle_40163..40168_1.png`, 625x600, 60-115 KB) va `zones/zones-06.svg` (`Group_2089345973.svg`)
  - Xaritalar: `location/map-desktop.svg` (manba `misc-02.svg`, 1200x735) va `location/map-mobile.svg` (manba `location-01.svg`).
    S4 dan beri ishlatilmaydi (o'rniga `PremiumMap`), zaxira sifatida qoldirilgan.
    Ichidagi 1080 px logo PNG 320 px WebP ga almashtirildi. SVGO bu fayllarda xato beradi, shuning uchun qo'lda
  - Reja rasmlari `plans/*.png` -> `plans/*.webp` (525 KB -> 448 KB, shaffoflik saqlangan). Jadvaldagi `.png` nomlar Tilda manbasini bildiradi
  - Fasad doiralari: Keramogranit `facade-04`, Dekorativ kirpich `facade-01`, Tabiiy granit `facade-03`, Oynalar `about-02`,
    Kechki yoritish `facade-02`, Balkonlar `lead-01`. Katta rasm `facade-05`

| Fayl | Tilda nomi | Bo'lim | O'lcham | KB |
|------|-----------|--------|---------|----|
| `about/about-01.svg` | [Group_2089346009.svg](https://static.tildacdn.com/tild3530-3961-4562-b536-353936343439/Group_2089346009.svg) | about | vektor | 63 |
| `about/about-02.webp` | [blob.webp](https://static.tildacdn.com/tild6161-6266-4039-a237-653230333864/blob.webp) | about,facade | 1920x1072 | 255 |
| `advantages/advantages-01.webp` | [blob.webp](https://static.tildacdn.com/tild3539-3731-4061-a234-633136653138/blob.webp) | advantages | 1920x1206 | 283 |
| `facade/facade-01.webp` | [blob.webp](https://static.tildacdn.com/tild3138-6436-4964-b030-666338616437/blob.webp) | facade | 1920x1072 | 286 |
| `facade/facade-02.png` | [Ellipse_192_1.png](https://static.tildacdn.com/tild3239-3566-4864-b532-633865376432/Ellipse_192_1.png) | facade | 250x250 | 29 |
| `facade/facade-03.webp` | [blob.webp](https://static.tildacdn.com/tild3662-3035-4563-b737-393162303731/blob.webp) | facade | 1920x1072 | 263 |
| `facade/facade-04.png` | [Ellipse_191_1.png](https://static.tildacdn.com/tild3834-3461-4930-a332-303330343638/Ellipse_191_1.png) | facade | 250x250 | 35 |
| `facade/facade-05.webp` | [blob.webp](https://static.tildacdn.com/tild6234-6536-4138-b362-333538306336/blob.webp) | facade | 1920x1072 | 273 |
| `footer/footer-01.svg` | [-2-17_3.svg](https://static.tildacdn.com/tild6436-6332-4536-a166-313532656133/-2-17_3.svg) | footer | vektor | 665 |
| `hero/hero-01.svg` | [Rectangle_40182.svg](https://static.tildacdn.com/tild3064-6431-4136-a136-326335373366/Rectangle_40182.svg) | hero | vektor | 0 |
| `hero/hero-02.webp` | [nmtelegram-cloud-doc.webp](https://static.tildacdn.com/tild3365-6637-4166-b835-333266646661/nmtelegram-cloud-doc.webp) | hero | 1680x848 | 207 |
| `hero/hero-03.webp` | [blob.webp](https://static.tildacdn.com/tild3564-6239-4564-a238-363065373462/blob.webp) | hero | 1920x1920 | 24 |
| `hero/hero-04.svg` | [hamburger-menu-svgre.svg](https://static.tildacdn.com/tild3831-3935-4465-b833-336432643662/hamburger-menu-svgre.svg) | hero | vektor | 1 |
| `hero/hero-05.png` | [n3telegram-cloud-doc.png](https://static.tildacdn.com/tild6334-3430-4433-a664-363966336234/n3telegram-cloud-doc.png) | hero | 620x1200 | 267 |
| `hero/hero-06.svg` | [-2-04_2.svg](https://static.tildacdn.com/tild6530-3763-4131-b835-396534353333/-2-04_2.svg) | hero | vektor | 808 |
| `hero/hero-07.svg` | [arrow-right-down-svg.svg](https://static.tildacdn.com/tild6539-3066-4139-a434-663834626134/arrow-right-down-svg.svg) | hero | vektor | 0 |
| `lead/lead-01.webp` | [blob.webp](https://static.tildacdn.com/tild3761-3739-4037-b032-356161306339/blob.webp) | lead,facade | 1920x1433 | 268 |
| `location/location-01.svg` | [Avalon-Location-Map_.svg](https://static.tildacdn.com/tild3730-6135-4130-a639-376239326164/Avalon-Location-Map_.svg) | location | vektor | 492 |
| `location/location-02.jpg` | [orig.jpg](https://static.tildacdn.com/tild3736-3662-4439-a439-663134663161/orig.jpg) | location | 1680x2240 | 922 |
| `location/location-03.avif` | [tashkent-uzbekistan-.avif](https://static.tildacdn.com/tild3738-3837-4135-b638-396166656639/tashkent-uzbekistan-.avif) | location | 417x626 | 38 |
| `location/location-04.jpg` | [4563.jpg](https://static.tildacdn.com/tild3833-6632-4564-a233-386264336138/4563.jpg) | location | 600x600 | 68 |
| `location/location-05.webp` | [8fbgqmq7svra2Su4DWi1.webp](https://static.tildacdn.com/tild6135-3865-4631-b862-653765356264/8fbgqmq7svra2Su4DWi1.webp) | location | 1200x800 | 130 |
| `location/location-06.png` | [Rectangle_40187_1.png](https://static.tildacdn.com/tild6331-3436-4061-a136-636334383562/Rectangle_40187_1.png) | location | 600x600 | 221 |
| `location/location-07.png` | [ncar_clean_1_1.png](https://static.tildacdn.com/tild6466-6165-4836-a562-343636643135/ncar_clean_1_1.png) | location | 250x118 | 11 |
| `location/location-08.jpg` | [maktab-tK5fTuiI_1.jpg](https://static.tildacdn.com/tild6666-6365-4533-b365-666661633535/maktab-tK5fTuiI_1.jpg) | location | 1280x853 | 108 |
| `menu/menu-01.svg` | [-2-02_3.svg](https://static.tildacdn.com/tild3638-3538-4635-a363-666133313864/-2-02_3.svg) | menu | vektor | 702 |
| `meta/meta-01.svg` | [-2-04_3.svg](https://static.tildacdn.com/tild3062-3538-4633-b865-323166393235/-2-04_3.svg) | meta | vektor | 808 |
| `meta/meta-02.png` | [1-2-04_3_1.png](https://static.tildacdn.com/tild3333-3436-4562-b837-383166306137/1-2-04_3_1.png) | meta | 180x180 | 10 |
| `meta/meta-03.png` | [-2-04_3_1.png](https://static.tildacdn.com/tild3364-3064-4333-a337-396561653764/-2-04_3_1.png) | meta | 192x192 | 4 |
| `meta/meta-04.jpg` | [2026-07-30_190727.jpg](https://static.tildacdn.com/tild3739-3665-4234-a237-333362613265/2026-07-30_190727.jpg) | meta | 1280x703 | 142 |
| `meta/meta-05.png` | [-2-04_3_1.png](https://static.tildacdn.com/tild6431-3266-4539-b137-383635303032/-2-04_3_1.png) | meta | 192x192 | 4 |
| `misc/misc-01.png` | [image_1.png](https://static.tildacdn.com/tild3132-6266-4236-a665-646234333134/image_1.png) | misc | 1680x966 | 468 |
| `misc/misc-02.svg` | [Group_2089345957.svg](https://static.tildacdn.com/tild3533-6336-4363-a463-623266343638/Group_2089345957.svg) | misc | vektor | 564 |
| `plans/2-01.png` | [21_1.png](https://static.tildacdn.com/tild3462-3938-4131-b239-313761323762/21_1.png) | plans | 512x600 | 21 |
| `plans/2-02.png` | [22_1.png](https://static.tildacdn.com/tild3535-6334-4138-b236-373130363366/22_1.png) | plans | 512x600 | 21 |
| `plans/2-03.png` | [23_1.png](https://static.tildacdn.com/tild3933-6466-4462-b131-313263333861/23_1.png) | plans | 512x600 | 21 |
| `plans/2-04.png` | [24_1.png](https://static.tildacdn.com/tild3939-6632-4333-b662-353266326463/24_1.png) | plans | 512x600 | 19 |
| `plans/2-05.png` | [25_1.png](https://static.tildacdn.com/tild3438-6163-4230-b164-346430376536/25_1.png) | plans | 512x600 | 19 |
| `plans/2-06.png` | [26_1.png](https://static.tildacdn.com/tild3635-3533-4363-b037-366365393338/26_1.png) | plans | 512x600 | 17 |
| `plans/2-07.png` | [27_1.png](https://static.tildacdn.com/tild6236-3431-4838-b363-303135613030/27_1.png) | plans | 512x600 | 20 |
| `plans/2-08.png` | [28_1.png](https://static.tildacdn.com/tild3662-6461-4137-b561-373031313262/28_1.png) | plans | 512x600 | 16 |
| `plans/2-09.png` | [29_1.png](https://static.tildacdn.com/tild6536-3963-4134-a435-623733323864/29_1.png) | plans | 512x600 | 21 |
| `plans/2-10.png` | [210_1.png](https://static.tildacdn.com/tild6537-6134-4465-a265-363032373836/210_1.png) | plans | 512x600 | 18 |
| `plans/2-11.png` | [211_1.png](https://static.tildacdn.com/tild6439-3134-4937-b534-653236646332/211_1.png) | plans | 512x600 | 19 |
| `plans/2-12.png` | [212_1.png](https://static.tildacdn.com/tild6665-6362-4362-a339-626265636534/212_1.png) | plans | 512x600 | 18 |
| `plans/2-13.png` | [213_1.png](https://static.tildacdn.com/tild6462-3437-4463-b534-323439386637/213_1.png) | plans | 512x600 | 22 |
| `plans/2-14.png` | [214_1.png](https://static.tildacdn.com/tild3361-3135-4535-b430-653938366562/214_1.png) | plans | 512x600 | 18 |
| `plans/2-15.png` | [215_1.png](https://static.tildacdn.com/tild6566-3035-4365-b062-613364383135/215_1.png) | plans | 512x600 | 22 |
| `plans/2-16.png` | [216_1.png](https://static.tildacdn.com/tild6266-6636-4465-b365-303033393133/216_1.png) | plans | 512x600 | 18 |
| `plans/2-17.png` | [217_1.png](https://static.tildacdn.com/tild6165-3934-4037-b539-633831303763/217_1.png) | plans | 512x600 | 19 |
| `plans/2-18.png` | [218_1.png](https://static.tildacdn.com/tild3166-3837-4162-b761-653832333965/218_1.png) | plans | 512x600 | 19 |
| `plans/2-19.png` | [219_1.png](https://static.tildacdn.com/tild3061-3537-4936-b333-636535653036/219_1.png) | plans | 512x600 | 21 |
| `plans/2-20.png` | [220_1.png](https://static.tildacdn.com/tild6630-3966-4333-b666-633932313965/220_1.png) | plans | 512x600 | 21 |
| `plans/2-21.png` | [221_1.png](https://static.tildacdn.com/tild6237-6531-4561-a361-323131633538/221_1.png) | plans | 512x600 | 21 |
| `plans/3-01.png` | [31_1.png](https://static.tildacdn.com/tild3031-6563-4234-a338-663866666334/31_1.png) | plans | 512x600 | 24 |
| `plans/3-02.png` | [32_1.png](https://static.tildacdn.com/tild3332-3635-4664-a530-346131386637/32_1.png) | plans | 514x600 | 21 |
| `plans/3-03.png` | [33_1.png](https://static.tildacdn.com/tild6664-3537-4333-b833-623335353630/33_1.png) | plans | 512x600 | 21 |
| `plans/3-04.png` | [34_1.png](https://static.tildacdn.com/tild6133-3430-4139-b130-386136666139/34_1.png) | plans | 512x600 | 24 |
| `popup/popup-01.webp` | [2026-07-28_161905.webp](https://static.tildacdn.com/tild3637-6536-4332-a163-613135346134/2026-07-28_161905.webp) | popup | 1680x937 | 308 |
| `widget/widget-01.svg` | [Group_2089346020.svg](https://static.tildacdn.com/tild6433-3432-4334-a133-393132316334/Group_2089346020.svg) | widget | vektor | 2 |
| `zones/zones-01.svg` | [Group_2089345976.svg](https://static.tildacdn.com/tild3030-3730-4466-b232-333061303666/Group_2089345976.svg) | zones | vektor | 0 |
| `zones/zones-02.svg` | [Group_2089345975.svg](https://static.tildacdn.com/tild3232-3734-4266-b264-346336383233/Group_2089345975.svg) | zones | vektor | 0 |
| `zones/zones-03.svg` | [Group_2089345974.svg](https://static.tildacdn.com/tild3863-3932-4163-b364-623039373636/Group_2089345974.svg) | zones | vektor | 3 |
| `zones/zones-04.svg` | [Group_2089345971.svg](https://static.tildacdn.com/tild6563-3834-4336-b738-653634643463/Group_2089345971.svg) | zones | vektor | 2 |
| `zones/zones-05.svg` | [Group_2089345972.svg](https://static.tildacdn.com/tild6637-3931-4530-b336-633961646435/Group_2089345972.svg) | zones | vektor | 2 |
