# Avalon Residence

Toshkentdagi [Avalon Residence](https://avalonresidence.uz/) turar-joy majmuasi saytini Tilda (no-code) dan
kodga o'tkazish va premium darajaga ko'tarish loyihasi. Dizayn muallifi: Umidjon Majidov.

> Holat: **S0 poydevor tayyor** (Next.js 16, CI, kontent, assetlar, Tilda baseline). Keyingi: S1 dizayn tizimi.
> Sayt hali Tilda'da ishlayapti.

## Hujjatlar

| Fayl | Mazmuni |
|------|---------|
| [ROADMAP.md](ROADMAP.md) | Umumiy reja, sprintlar, ochiq savollar |
| [DECISIONS.md](DECISIONS.md) | Qabul qilingan qarorlar va sabablari |
| [docs/AUDIT.md](docs/AUDIT.md) | Hozirgi Tilda saytining tahlili va baseline o'lchovlari |
| [docs/FIGMA.md](docs/FIGMA.md) | Figma bo'limlar xaritasi va token'lar |
| [docs/ASSETS.md](docs/ASSETS.md) | Rasmlar ro'yxati va optimizatsiya rejasi |
| [sprints/](sprints/) | Har sprintning tasklari va tayyorlik mezonlari |

## Stack

Next.js 16 (App Router, statik generatsiya), TypeScript, Tailwind CSS, next-intl (uz/ru), GSAP + ScrollTrigger,
Lenis, Playwright, Vercel. Sabablari: [DECISIONS.md](DECISIONS.md).

## Ishga tushirish

```bash
npm ci
npm run dev        # http://localhost:3000
npm run figma      # Figma dizaynini yangilash (FIGMA_TOKEN kerak)
```

## Huquqlar

Kod portfolio sifatida ochiq ko'rsatilgan. Litsenziya berilmagan, barcha huquqlar saqlanadi. Dizayn, renderlar
va kontent ularning egalariga tegishli.
