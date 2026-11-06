---
name: sayt-video
description: Veb-saytning silliq scroll videosini yaratadi (qotishsiz, 30 fps) va fon musiqasi qo'shadi. Kompyuter versiyasi 1920x1080 (16:9) va telefon versiyasi 1080x1920 (9:16, Reels/Stories) uchun. Foydalanuvchi "saytni videoga ol", "sayt videosi", "portfolio uchun video", "Reels uchun sayt videosi", "scroll video" desa ishlating.
---

# Sayt videosi (silliq scroll + fon musiqasi)

Avalon Residence loyihasida ishlab chiqilgan va muallif ma'qullagan usul. Istalgan sayt uchun ishlaydi.

## Nega oddiy ekran yozuvi emas

Real vaqtda yozilganda (ekran yozuvi, Playwright `recordVideo`, CDP screencast) brauzer kadrni ulgurib chizolmasa kadr tushadi va video qotadi.
Bu skill sahifa soatini soxtalashtiradi: `performance.now`, `Date.now`, `requestAnimationFrame`, taymerlar, `requestIdleCallback` va
barcha CSS/Web animatsiyalar bitta boshqariladigan soatga bog'lanadi. Har kadrda vaqt aniq 1/30 soniyaga suriladi va kadr alohida suratga olinadi.
Natija: kompyuter qanchalik sekin bo'lmasin, video bir tekis. GSAP, ScrollTrigger, Lenis va CSS transition'lar to'g'ri ishlaydi.

## Talablar

- Node.js va Playwright (`playwright` yoki `@playwright/test`), Chromium: `npx playwright install chromium`
- `ffmpeg`, Python 3 va `numpy` (musiqa uchun)

## Qadamlar

1. **Saytni ishga tushiring.** Lokal loyiha bo'lsa production build: `npm run build && npm start`. Dev server animatsiyalarni sekinlashtiradi.
   Tayyor saytni ham URL bilan yozish mumkin.
2. **Sinov uchun 5–8 soniya yozing**, kadrlarni ko'rib chiqing (intro, birinchi scroll):
   ```bash
   node .claude/skills/sayt-video/scripts/record.cjs --url http://localhost:3000/ --mode desktop --out ./video/desktop --limit 240
   ```
3. **To'liq yozing.** Ikkala format:
   ```bash
   node .claude/skills/sayt-video/scripts/record.cjs --url http://localhost:3000/ --mode desktop --out ./video/desktop --plan plan.json
   node .claude/skills/sayt-video/scripts/record.cjs --url http://localhost:3000/ --mode mobile --out ./video/mobile --plan plan.json
   ```
4. **Musiqa bilan yig'ing:**
   ```bash
   bash .claude/skills/sayt-video/scripts/make.sh ./video/desktop ./video/sayt-16x9.mp4 desktop
   bash .claude/skills/sayt-video/scripts/make.sh ./video/mobile ./video/sayt-9x16.mp4 mobile
   ```
   Musiqa fayli 4-argument bo'lib berilsa, o'sha ishlatiladi. Berilmasa, `music.py` video uzunligida yangi kuy yaratadi.
5. **Tekshiring.** Bir nechta kadrni kontakt-varaq qilib ko'ring (boshi, o'rtasi, oxiri), oxirgi kadr chiroyli tugashini (footer) tasdiqlang.

## Scroll rejasi (`--plan`)

Reja bo'lmasa, skript har `<section>` da 0,7 soniya to'xtab pastgacha tushadi. Chiroyli video uchun saytga mos reja yozing.
Namuna: `plans/avalon.json`. Qadamlar:

- `{ "wait": 4800 }`: kutish, ms (intro, muhim joyda pauza)
- `{ "scrollTo": "#about", "y": 0.25 }`: element tepasi ekran balandligining 25% iga yetguncha silliq scroll
- `{ "scrollTo": "...", "y": 0.02, "maxFrames": 200 }`: qadam uchun kadrlar chegarasi (sticky elementlarda kerak)
- `{ "click": "button:has-text('Kechqurun')" }`: interaktiv elementni bosish

Maslahatlar:
- Intro bo'lsa, birinchi `wait` 4–5 s.
- Sticky slaydlar uchun har slaydga alohida `scrollTo` va 600 ms pauza.
- Avtomatik o'tadigan effektlar (masalan, kunduzi/kechqurun) uchun 3 s pauza.
- Oxiri footer yoki katta logo bilan tugasin, 2 s pauza.

## Foydali variantlar

- `--hide "[data-hot]"`: videoda kerak bo'lmagan elementni yashirish (masalan, sichqoncha ortidan yuruvchi halqa)
- `--block "api-maps\\.yandex"`: ochilmaydigan yoki yozuvni buzadigan so'rovlarni bloklash
- `--speed 520`: scroll tezligi px/s (desktop 520, mobil 300 standart)
- Mobil rejimda 360x640 @3x ishlatiladi: chiqish aniq 1080x1920.

## Musiqa (`scripts/music.py`)

Sokin, iliq kuy: pad, yumshoq pianino arpedjio, bass va reverb. Akkordlar Dmaj9 - Bm9 - Gmaj7 - A6sus, 72 BPM.
Bu skript yaratgan kompozitsiya, shuning uchun mualliflik huquqi muammosi yo'q. Videoga -23 LUFS da qo'shiladi (fon uchun past),
oxirida 3 soniyalik so'nish bor. Uslubni o'zgartirish uchun `chords`, `BPM` va asboblar balandligini tahrirlang.

## Tez-tez uchraydigan muammolar

- **Bir qadam uzoq qotib qoldi:** element shartga yetmayapti (sticky yoki sahifa oxiri). `maxFrames` bering yoki `y` ni o'zgartiring.
- **Rasm yo'q yoki bo'sh blok:** tashqi resurs yuklanmagan. Lokal tarmoqni tekshiring yoki `--block` bilan o'chiring.
- **Xotira:** kadrlar diskka darhol yoziladi. 60 soniyalik video ~1800 kadr, 300–600 MB joy oladi.
