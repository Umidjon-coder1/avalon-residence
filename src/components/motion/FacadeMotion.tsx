"use client";

import { gsap, useGSAP } from "@/lib/gsap";
import { mq, onIdle } from "@/lib/motion";

/**
 * Materiallar (T4.7): scroll'da har bir material navbatma-navbat "yonadi": doira rasm kulrangdan
 * rangga o'tadi va biroz kattalashadi, matn to'liq ko'rinadi. Orqaga scroll qilinsa yana xiralashadi.
 * reduced-motion'da hammasi boshidan to'liq ko'rinadi.
 */
export function FacadeMotion() {
  useGSAP(() => {
    const mm = gsap.matchMedia();
    // Brauzer bo'sh qolganda tayyorlanadi: sahifa ochilishini qotirmaydi
    const cancel = onIdle(() => {
      mm.add(mq.motion, () => {
        const list = document.querySelector<HTMLElement>("[data-materials]");
        if (!list) return;
        const items = gsap.utils.toArray<HTMLElement>(":scope > li", list);

        items.forEach((item, i) => {
          const photo = item.querySelector("[data-material-photo]");
          const text = item.querySelector("[data-material-text]");
          if (!photo || !text) return;
          gsap
            .timeline({
              scrollTrigger: {
                trigger: item,
                start: "top 72%",
                toggleActions: "play none none reverse",
              },
              // Bir qatordagi materiallar ham chapdan o'ngga ketma-ket yonadi (desktop 3 ustun)
              delay: (i % 3) * 0.12,
            })
            .fromTo(
              photo,
              { filter: "grayscale(1) brightness(0.8)", scale: 0.9 },
              { filter: "grayscale(0) brightness(1)", scale: 1, duration: 0.9, ease: "power2.out" },
            )
            .fromTo(text, { opacity: 0.5, x: -12 }, { opacity: 1, x: 0, duration: 0.7 }, "<0.1");
        });
      });
    }, 2000);
    return () => {
      cancel();
      mm.revert();
    };
  });

  return null;
}
