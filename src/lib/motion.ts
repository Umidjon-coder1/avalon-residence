/**
 * Motion tizimi (S4, T4.1): bitta joyda easing va davomiyliklar.
 * Sayt "sekin va aniq" harakatlanadi: qisqa, keskin effektlar yo'q.
 */
export const ease = {
  /** Asosiy chiqish: kirib kelayotgan elementlar */
  out: "power3.out",
  /** Katta bloklar va pardalar */
  inOut: "expo.inOut",
  /** Matn qatorlari */
  text: "expo.out",
} as const;

export const duration = {
  fast: 0.4,
  base: 0.9,
  slow: 1.3,
  hero: 1.8,
} as const;

export const distance = {
  /** Pastdan chiqib kelish masofasi, px */
  reveal: 40,
} as const;

/** Faqat birinchi tashrifda intro ko'rsatish uchun belgi (localStorage) */
export const INTRO_KEY = "avalon:intro-seen";

/** Media so'rovlar: gsap.matchMedia uchun */
export const mq = {
  motion: "(prefers-reduced-motion: no-preference)",
  desktop: "(min-width: 1024px)",
} as const;

/**
 * Sahifa chizilishidan oldin <head> da ishlaydigan skript.
 * `motion`: animatsiya yoqilgan (CSS hero elementlarini yashiradi, JS ko'rsatadi).
 * `intro`: birinchi tashrif, parda ko'rsatiladi.
 */
export const motionBootScript = `(function(){try{var d=document.documentElement;if(matchMedia('${mq.motion}').matches){d.classList.add('motion');if(!localStorage.getItem('${INTRO_KEY}'))d.classList.add('intro')}}catch(e){}})()`;
