"use client";

import { gsap, useGSAP } from "@/lib/gsap";
import { mq, onIdle } from "@/lib/motion";

/**
 * Hududlar stack'i (T4.6): slayd kelayotganda sarlavha pastdan suzib chiqadi,
 * fon rasmi sekin siljiydi (parallax). Keyingi slayd ustiga chiqqanda oldingisi kichrayib qorayadi.
 * Hammasi scroll bilan bog'langan (scrub), mobilda ham ishlaydi.
 */
export function ZonesMotion() {
  useGSAP(() => {
    const mm = gsap.matchMedia();
    // Brauzer bo'sh qolganda tayyorlanadi: sahifa ochilishini qotirmaydi
    const cancel = onIdle(() => {
      mm.add(mq.motion, () => {
        const slides = gsap.utils.toArray<HTMLElement>("[data-zone]");

        slides.forEach((slide, i) => {
          const card = slide.querySelector<HTMLElement>("[data-zone-card]");
          const bg = slide.querySelector<HTMLElement>("[data-zone-bg]");
          const title = slide.querySelector<HTMLElement>("[data-zone-title]");
          const shade = slide.querySelector<HTMLElement>("[data-zone-shade]");
          if (!card) return;

          // Kirish: slayd pastdan ko'tarilayotganda
          const enter = { trigger: slide, start: "top bottom", end: "top top", scrub: 0.6 };
          if (title)
            gsap.from(title, { yPercent: 40, autoAlpha: 0.2, ease: "none", scrollTrigger: enter });
          if (bg) {
            gsap.fromTo(
              bg,
              { yPercent: -2.5 },
              {
                yPercent: 2.5,
                ease: "none",
                scrollTrigger: {
                  trigger: slide,
                  start: "top bottom",
                  end: "bottom top",
                  scrub: true,
                },
              },
            );
          }

          // Chiqish: keyingi slayd ustiga chiqqanda
          const next = slides[i + 1];
          if (!next) return;
          const leave = { trigger: next, start: "top bottom", end: "top top", scrub: true };
          gsap.to(card, { scale: 0.92, ease: "none", scrollTrigger: leave });
          if (shade) gsap.to(shade, { opacity: 0.35, ease: "none", scrollTrigger: leave });
        });
      });
    }, 1500);
    return () => {
      cancel();
      mm.revert();
    };
  });

  return null;
}
