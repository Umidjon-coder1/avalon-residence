"use client";

import { useEffect } from "react";
import { gsap, ScrollTrigger } from "@/lib/gsap";
import { distance, duration, ease, mq } from "@/lib/motion";

/**
 * Sahifa ichidagi scroll animatsiyalari (T4.1, T4.4):
 * - `[data-reveal]` elementlar ekranga kirganda pastdan chiqadi, `="image"` esa pardadek ochiladi
 * - `[data-draw]` chiziqlar chapdan o'ngga chiziladi
 * - `[data-count]` ichidagi raqamlar 0 dan sanaladi (yillar sanalmaydi)
 *
 * Bu komponent `<main>` ning oxirgi bolasi: React sahifani to'liq hydrate qilgandan keyin ishga tushadi,
 * shuning uchun DOM matni o'zgarishi hydration xatosiga olib kelmaydi.
 * `prefers-reduced-motion` yoqilgan bo'lsa, hech narsa ishlamaydi va kontent darhol ko'rinadi.
 */
export function PageMotion() {
  useEffect(() => {
    const mm = gsap.matchMedia();
    // Sahifa bo'shaganda: birinchi chizish va hero animatsiyasi bilan raqobatlashmaydi (TBT)
    const start = () => {
      mm.add(mq.motion, () => {
        // Oddiy kirish: pastdan, xira holatdan
        const items = gsap.utils.toArray<HTMLElement>("[data-reveal]:not([data-reveal='image'])");
        gsap.set(items, { autoAlpha: 0, y: distance.reveal });
        ScrollTrigger.batch(items, {
          start: "top 88%",
          once: true,
          onEnter: (batch) =>
            gsap.to(batch, { autoAlpha: 1, y: 0, duration: duration.base, stagger: 0.08 }),
        });

        // Rasm: pastdan yuqoriga ochiladi, ichidagi rasm biroz kichrayadi
        gsap.utils.toArray<HTMLElement>("[data-reveal='image']").forEach((el) => {
          const radius = getComputedStyle(el).borderRadius || "0px";
          gsap.fromTo(
            el,
            { clipPath: `inset(100% 0% 0% 0% round ${radius})`, scale: 1.08 },
            {
              clipPath: `inset(0% 0% 0% 0% round ${radius})`,
              scale: 1,
              duration: duration.slow,
              ease: ease.inOut,
              scrollTrigger: { trigger: el, start: "top 85%", once: true },
            },
          );
        });

        // Chiziqlar
        gsap.utils.toArray<HTMLElement>("[data-draw]").forEach((el) => {
          gsap.fromTo(
            el,
            { scaleX: 0, transformOrigin: "left center" },
            {
              scaleX: 1,
              duration: duration.slow,
              ease: ease.inOut,
              scrollTrigger: { trigger: el, start: "top 90%", once: true },
            },
          );
        });

        // Raqamlar
        gsap.utils.toArray<HTMLElement>("[data-count]").forEach(countUp);

        // Boshlang'ich holatlar endi inline: CSS dagi yashirishni o'chiramiz
        document.documentElement.classList.add("reveal-ready");
      });
    };
    const idle = window.requestIdleCallback?.(start, { timeout: 1500 });
    const timer = idle === undefined ? window.setTimeout(start, 300) : undefined;
    return () => {
      if (idle !== undefined) window.cancelIdleCallback(idle);
      if (timer !== undefined) window.clearTimeout(timer);
      mm.revert();
      document.documentElement.classList.remove("reveal-ready");
    };
  }, []);

  return null;
}

/** Matndagi raqamlarni 0 dan asl qiymatgacha sanaydi, kenglik oldindan band qilinadi (CLS yo'q) */
function countUp(el: HTMLElement) {
  const original = el.textContent ?? "";
  const tokens = [...original.matchAll(/\d+(?:\.\d+)?/g)].filter((m) => Number(m[0]) < 1900);
  if (tokens.length === 0) return;

  el.style.display = "inline-block";
  el.style.minWidth = `${el.getBoundingClientRect().width}px`;
  el.style.fontVariantNumeric = "tabular-nums";

  const render = (p: number) => {
    let out = "";
    let last = 0;
    for (const m of tokens) {
      const decimals = (m[0].split(".")[1] ?? "").length;
      out += original.slice(last, m.index) + (Number(m[0]) * p).toFixed(decimals);
      last = (m.index ?? 0) + m[0].length;
    }
    el.textContent = out + original.slice(last);
  };

  const state = { p: 0 };
  render(0);
  gsap.to(state, {
    p: 1,
    duration: 1.6,
    ease: "power2.out",
    onUpdate: () => render(state.p),
    onComplete: () => {
      el.textContent = original;
    },
    scrollTrigger: { trigger: el, start: "top 90%", once: true },
  });
}
