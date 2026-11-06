# Prompt: Instagram uchun keys karusel (yangi lokal sessiya, Claude in Chrome)

Quyidagi matnni lokal kompyuterda ochilgan yangi Claude Code sessiyasiga to'liq nusxalab yuboring.

---

Salom. Men Umidjon, veb-dizayner va dasturchiman. Men bilan **lotin yozuvidagi o'zbek tilida**, qisqa va oddiy gaplash.

## Vazifa

Avalon Residence loyihasini **Instagram'ga keys sifatida qo'yish uchun premium karusel** tayyorlaymiz.
Avvalroq tez qilingan qoralama karusel bo'lgan. Uning dizayni ishlatilmaydi: hammasini raqobatchilar tahlilidan boshlaymiz.
Ish shu kompyuterda bajariladi. Brauzer bilan ishlash uchun **Claude in Chrome** ishlatiladi: mening Chrome'im, Instagram va Behance'ga u yerda kirganman.

## Loyiha haqida (faktlar, o'zgartirmang)

- **Mijoz:** Avalon Residence, Toshkent, Yashnobod tumanidagi turar-joy majmuasi.
- **Muammo:** sayt Tilda'da edi (avalonresidence.uz). U sekin edi: telefonda 30 ball, katta animatsiyasiz bloklar, mobil versiyasi zaif edi.
- **Qilingan ish:** sayt noldan kodda qayta ishlab chiqildi (Next.js, GSAP, Lenis). Yangi sayt: https://avalon-residence.vercel.app
- **Asosiy yechimlar:**
  - logo bilan intro;
  - har bir hudud ekranni to'liq egallaydigan slayd, slaydlar ustma-ust o'tadi;
  - scroll bilan yo'l bo'ylab yuradigan mashina;
  - fasadni kunduzi va kechqurun ko'rish rejimi (4 ko'rinish);
  - kulrang Yandex xarita va "Qanday borish" tugmasi;
  - premium mobil menyu, aloqa vidjeti;
  - arizalar to'g'ridan-to'g'ri Google jadvalga tushadi;
  - footerda katta oltin "AVALON RESIDENCE" yozuvi.
- **Natija** (Lighthouse, bir xil sharoit, 3 o'lchov o'rtachasi):
  - telefon: 30 → 80 ball;
  - kompyuter: 64 → 96 ball;
  - sahifa hajmi: 3,4 MB → 1,1 MB.
  - Batafsil: `docs/pagespeed-oldin-keyin.png`.
- **Brend:**
  - Ranglar: oltin `#c8a45d`, to'q `#1e1d1d`, krem `#f4efe6`, oq.
  - Shriftlar: sarlavha PP Right Gothic (tijoriy, `public/fonts/PPRightGothic-Medium.woff2`, repoda yo'q, mening kompyuterimda bor), matn Retni Sans (`src/fonts/retni/`).
- **Rasmlar:** renderlar `public/images/zones/*-full.webp` va `public/images/facade/*`, logo `public/images/brand/`.
- **Repo:** `Umidjon-coder1/avalon-residence`, branch `claude/upbeat-brown-kxtslx` (main bilan bir xil, ustiga video skill va shu prompt qo'shilgan).
  Avval `CLAUDE.md`, `sprints/SPRINT-4-premium-animatsiya.md` (Hisobot) va `docs/AUDIT.md` ni o'qi.

## Ish tartibi

### 1. Raqobatchilar tahlili (10–20 ta namuna)

Chrome orqali kuchli namunalarni top:

- **Instagram:** veb-dizayn va UX/UI keys karusellari. Hashteglar: #casestudy, #webdesigncase, #uxuicase, #webdesign, #кейс, #вебдизайн.
  O'zbekiston va MDH veb-studiyalari hamda dizaynerlari, ayniqsa ko'chmas mulk saytlari keyslari.
- **Behance va Dribbble:** real estate website case study.
- **Pinterest:** instagram carousel case study design.

Har bir namuna uchun yoz:
- havola;
- slaydlar soni va tuzilishi (hook, muammo, jarayon, natija, CTA);
- setka va chekkalar;
- tipografika (shrift turi, o'lchamlar ierarxiyasi);
- ranglar;
- "oldin va keyin" hamda raqamlar qanday ko'rsatilgan;
- uni premium qiladigan narsa;
- yaxshi bo'lmagan joylari.

Muhim namunalardan skrinshot ol. Hammasini `docs/instagram-keys/tadqiqot.md` ga yoz, skrinshotlarni `docs/instagram-keys/tadqiqot/` ga saqla.
Oxirida takrorlanuvchi naqshlar va eng kuchli 5 ta yechimni xulosa qil.

### 2. Yo'nalish tanlash

Tahlil asosida **3 ta dizayn yo'nalishi** taklif qil. Har biriga:
- qisqa tavsif;
- muqova slaydining namunasi (bitta tayyor rasm);
- ranglar, shriftlar va setka.

Menga AskUserQuestion bilan tanlatib ber, men tanlamagunimcha keyingi qadamga o'tma.
Muhim savol: karusel loyiha brendida bo'ladimi (Avalon ranglari va shriftlari) yoki mening shaxsiy dizayner brendimda? Buni ham so'ra.

### 3. Mazmun

8–10 ta slayd. Hikoya:
1. Hook-muqova.
2. Mijoz va muammo.
3. Oldin va keyin.
4. Asosiy yechimlar: 2–3 slayd.
5. Mobil versiya.
6. Natija va raqamlar.
7. CTA (menga yozish).

Matnlar o'zbekcha (lotin), qisqa, har slaydda bitta fikr. O'zbekcha harflarni to'g'ri yoz: oʻ va gʻ (yoki o' va g').
Matn rejasini menga avval ko'rsat.

### 4. Materiallar (haqiqiy, o'ylab topilmagan)

- **Skrinshotlar:** Chrome'da yangi sayt (https://avalon-residence.vercel.app) va eski sayt (https://avalonresidence.uz) dan yangi, yuqori sifatli skrinshotlar ol.
  O'lchamlar: desktop 1440 px va mobil 390 px, retina sifatida.
  Eski saytda bosh rasm to'liq yuklanishini kut.
- **PageSpeed:** Chrome'da https://pagespeed.web.dev da ikkala saytni o'lcha. Haqiqiy natija sahifasining skrinshotini ol.
  Raqamlar yuqoridagilardan farq qilsa, PageSpeed natijasini ishlat va menga ayt. Raqam o'ylab topma.
- **Qurilma maketlari** (telefon, noutbuk): HTML/CSS bilan o'zing chiz yoki faqat bepul litsenziyali mockup ishlat.

### 5. Yasash

- Har slayd alohida HTML/CSS. O'lcham 1080×1350 (4:5).
- Eksport Playwright yoki Chrome bilan, PNG formatda, 2x (2160×2700). Instagram uchun 1080×1350 nusxa ham.
- Bitta setka va bir xil chekkalar. Tipografik ierarxiya 3 darajadan oshmasin.
- "AI qilgan" ko'rinishdan qoch:
  - ortiqcha gradient va nur effektlari bo'lmasin;
  - dizayn ichida emoji bo'lmasin;
  - hamma narsa markazda, bir xil kartalar ko'rinishidagi andozalar bo'lmasin;
  - tasodifiy ikonkalar bo'lmasin.
- Har slaydni ko'zdan kechir:
  - matn sig'adimi, xato yo'qmi;
  - telefonda 375 px kenglikda o'qiladimi;
  - hamma slaydlarni bitta kontakt-varaqda ko'rib, ketma-ketlik bir butun ko'rinadimi.
- Natijani `docs/instagram-keys/` ga saqla:
  - `slaydlar/` (PNG);
  - `manba/` (HTML);
  - `matn.md`: post matni, hashteglar va har slayd uchun alt-matn.

### 6. Qo'shimcha (ixtiyoriy)

Reels uchun repoda `.claude/skills/sayt-video` skill bor. U saytning qotishsiz scroll videosini fon musiqasi bilan yasaydi. Kerak bo'lsa ishlat.

## Qoidalar

- `main` ga push qilma va deploy qilma. Commit faqat men so'rasam.
- Har bosqich oxirida menga qisqa natija ko'rsat va keyingi qadamni tasdiqlat.
- Biror narsani bilmasang yoki ochilmasa, ochiq ayt. Taxmin bilan to'ldirma.
