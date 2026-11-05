"use client";

import { gsap, useGSAP } from "@/lib/gsap";
import { mq } from "@/lib/motion";

/**
 * Joylashuv (T4.5): scroll bilan mashina masofalar yo'li bo'ylab yuradi, orqasidan oltin chiziq chiziladi,
 * mashina yetib kelgan nuqtalar to'ladi. Desktopda yo'l gorizontal, mobil va planshetda vertikal
 * (mashina tepadan pastga yuradi). Mashina yurganda biroz "chayqaladi", to'xtaganda tekislanadi.
 */
export function LocationMotion() {
  useGSAP(() => {
    const mm = gsap.matchMedia();
    mm.add({ motion: mq.motion, desktop: mq.desktop }, (ctx) => {
      const { motion, desktop } = ctx.conditions as { motion: boolean; desktop: boolean };
      if (!motion) return;
      const route = document.querySelector<HTMLElement>("[data-route]");
      const car = route?.querySelector<HTMLElement>("[data-route-car]");
      const line = route?.querySelector<HTMLElement>("[data-route-line]");
      if (!route || !car || !line) return;
      const stops = gsap.utils.toArray<HTMLElement>("[data-route-stop]", route);
      const axis = desktop ? "x" : "y";

      // Mashina oldi (yo'l boshidan, px): desktopda o'ng cheti, mobilda pastki cheti (rasm 90° burilgan)
      const front = () => {
        const r = route.getBoundingClientRect();
        const c = car.getBoundingClientRect();
        return desktop ? c.right - r.left - c.width * 0.15 : c.bottom - r.top - c.height * 0.15;
      };
      const length = () => (desktop ? route.offsetWidth : route.offsetHeight);

      const update = () => {
        const r = route.getBoundingClientRect();
        const head = front();
        gsap.set(line, desktop ? { scaleX: head / length() } : { scaleY: head / length() });
        for (const stop of stops) {
          const b = stop.getBoundingClientRect();
          const center = desktop ? b.left - r.left + b.width / 2 : b.top - r.top + b.height / 2;
          stop.dataset.reached = String(head >= center);
        }
      };

      // Yo'l oxirigacha: mashinaning ko'rinadigan uzunligi va boshlang'ich joyi hisobga olinadi
      const distance = () => {
        const r = route.getBoundingClientRect();
        const c = car.getBoundingClientRect();
        const prev = Number(gsap.getProperty(car, axis)) || 0;
        return desktop ? r.right - c.right + prev : r.bottom - c.bottom + prev - 8;
      };

      gsap.set(line, desktop ? { scaleX: 0 } : { scaleY: 0 });
      const drive = gsap.fromTo(
        car,
        { [axis]: 0 },
        {
          [axis]: distance,
          ease: "none",
          onUpdate: update,
          scrollTrigger: {
            trigger: route,
            start: desktop ? "top 80%" : "top 70%",
            end: desktop ? "bottom 25%" : "bottom 55%",
            scrub: 0.8,
            invalidateOnRefresh: true,
            // Tezlikka qarab yengil chayqalish (kuzov burilishi)
            onUpdate: (self) => {
              const tilt = gsap.utils.clamp(-4, 4, self.getVelocity() / 400);
              gsap.to(car, { rotation: tilt, duration: 0.4, overwrite: "auto" });
            },
            onScrubComplete: () => gsap.to(car, { rotation: 0, duration: 0.5 }),
          },
        },
      );
      update();

      return () => {
        drive.scrollTrigger?.kill();
        gsap.set([car, line], { clearProps: "transform" });
        stops.forEach((s) => delete s.dataset.reached);
      };
    });
    return () => mm.revert();
  });

  return null;
}
