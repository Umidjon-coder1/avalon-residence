"use client";

import { gsap, useGSAP } from "@/lib/gsap";
import { mq, onIdle } from "@/lib/motion";

/**
 * Footer pastidagi katta nom (S4): footer ko'rinayotganda pastdan sekin ko'tariladi (scroll bilan bog'liq).
 * Faqat transform, matn o'zgarmaydi, shuning uchun layout'da xavfsiz. reduced-motion'da joyida turadi.
 */
export function FooterMotion() {
  useGSAP(() => {
    const mm = gsap.matchMedia();
    const cancel = onIdle(() => {
      mm.add(mq.motion, () => {
        const word = document.querySelector<HTMLElement>("[data-footer-word]");
        if (!word) return;
        gsap.fromTo(
          word,
          { yPercent: 45 },
          {
            yPercent: 0,
            ease: "none",
            scrollTrigger: {
              trigger: word.parentElement,
              start: "top bottom",
              end: "bottom bottom",
              scrub: 0.8,
            },
          },
        );
      });
    }, 3000);
    return () => {
      cancel();
      mm.revert();
    };
  });

  return null;
}
