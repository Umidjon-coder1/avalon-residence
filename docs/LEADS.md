# Lidlar qayerga boradi (T3.2)

Forma `POST /api/lead` ga yuboradi. Server lidni tekshiradi va yetkazadi (`src/lib/lead-delivery.ts`):

1. **Google Sheets** (asosiy kanal, muallif tanlovi). Apps Script web app orqali.
2. **Telegram** (zaxira, ixtiyoriy). Sheets ishlamasa yoki sozlanmagan bo'lsa.
3. Ikkalasi ham ishlamasa, foydalanuvchiga xato va telefon raqami ko'rsatiladi, lid Vercel'ning yopiq logiga yoziladi.
4. Hech bir kanal sozlanmagan bo'lsa (preview, lokal), lid faqat logga tushadi (telefon yashirilgan).

Lid bilan birga yuboriladi: til, qaysi tugma bosilgani, reja (masalan `2-05 (2 xonali, 52.2 m²)`),
UTM, `gclid`, kirish sahifasi va referrer (`src/lib/attribution.ts`).

## Environment o'zgaruvchilari (Vercel: Settings → Environment Variables)

| Nomi | Majburiy | Qiymati |
|------|----------|---------|
| `LEAD_SHEETS_WEBHOOK_URL` | ha | Apps Script web app manzili (`https://script.google.com/macros/s/.../exec`) |
| `LEAD_WEBHOOK_SECRET` | ha | Apps Script'dagi `SECRET` bilan bir xil uzun tasodifiy satr |
| `TELEGRAM_BOT_TOKEN` | yo'q | Zaxira kanal: @BotFather bergan token |
| `TELEGRAM_CHAT_ID` | yo'q | Lid boradigan chat yoki guruh id si |
| `NEXT_PUBLIC_YANDEX_MAPS_KEY` | yo'q | Yandex Maps JS API kaliti (ixtiyoriy, kalitsiz ham ishlaydi; limit bo'lsa qo'shiladi) |
| `NEXT_PUBLIC_GADS_LEAD_LABEL` | yo'q | Google Ads "Lid" konversiyasining label qismi (T3.5) |
| `FONT_HEADING_URL` | ha | PP Right Gothic WOFF2 havolasi (D5, `scripts/fetch-fonts.mjs`) |

Production va Preview ikkalasiga qo'yiladi. O'zgartirilgandan keyin qayta deploy kerak.

## Google Sheets ni ulash (taxminan 5 daqiqa)

1. Yangi Google Sheets jadvali oching, nomi masalan "Avalon lidlar".
2. **Extensions → Apps Script**. Ochilgan oynadagi kodni o'chirib, `docs/integrations/google-sheets-lead.gs` matnini qo'ying.
3. `SECRET` qatoriga uzun tasodifiy so'z yozing (masalan 30+ belgi). Saqlang.
4. **Deploy → New deployment → Web app**. *Execute as*: **Me**, *Who has access*: **Anyone**. Deploy, ruxsatlarni bering.
5. Berilgan **Web app URL** ni `LEAD_SHEETS_WEBHOOK_URL` ga, 3-qadamdagi so'zni `LEAD_WEBHOOK_SECRET` ga qo'ying.

Birinchi lid kelganda "Lidlar" varag'i va sarlavhalar o'zi yaratiladi. "Status" ustuni menejerlar uchun.
Kodni o'zgartirsangiz, **Deploy → Manage deployments → Edit → New version** qiling, URL o'zgarmaydi.

## Tekshirish (T3.9)

Preview havolada formani to'ldiring. Jadvalda yangi qator paydo bo'lishi va Vercel logida
`[lead] {... "delivery":"sheets"}` chiqishi kerak.
