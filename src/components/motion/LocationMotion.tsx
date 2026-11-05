"use client";

import { gsap, useGSAP } from "@/lib/gsap";
import { mq } from "@/lib/motion";

/**
 * Joylashuv (T4.5): scroll bilan mashina masofalar chizig'i bo'ylab yuradi, orqasidan oltin chiziq chiziladi,
 * mashina yetib kelgan nuqtalar to'ladi. Faqat desktop'da (mobilda mashina va chiziq yo'q).
 * Xarita `<img>` sifatida ulangan, uning ichidagi yo'llarni chizish keyingi bosqichda (inline SVG og'ir).
 */
export function LocationMotion() {
  useGSAP(() => {
    const mm = gsap.matchMedia();
    mm.add(`${mq.motion} and ${mq.desktop}`, () => {
      const route = document.querySelector<HTMLElement>("[data-route]");
      const car = route?.querySelector<HTMLElement>("[data-route-car]");
      const line = route?.querySelector<HTMLElement>("[data-route-line]");
      if (!route || !car || !line) return;
      const stops = gsap.utils.toArray<HTMLElement>("[data-route-stop]", route);

      const progress = { x: 0 };
      const update = () => {
        const routeBox = route.getBoundingClientRect();
        const carFront = progress.x + car.offsetWidth * 0.85;
        gsap.set(car, { x: progress.x });
        gsap.set(line, { scaleX: Math.min(1, carFront / routeBox.width) });
        for (const stop of stops) {
          const box = stop.getBoundingClientRect();
          const center = box.left - routeBox.left + box.width / 2;
          stop.dataset.reached = String(carFront >= center);
        }
      };

      gsap.set(line, { scaleX: 0 });
      gsap.to(progress, {
        x: () => route.offsetWidth - car.offsetWidth,
        ease: "none",
        onUpdate: update,
        scrollTrigger: {
          trigger: route,
          start: "top 80%",
          end: "bottom 25%",
          scrub: 0.6,
          invalidateOnRefresh: true,
        },
      });

      return () => {
        gsap.set([car, line], { clearProps: "transform" });
        stops.forEach((s) => delete s.dataset.reached);
      };
    });
    return () => mm.revert();
  });

  return null;
}
