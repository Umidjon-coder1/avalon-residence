"use client";

import { useEffect } from "react";
import "lenis/dist/lenis.css";
import { gsap, ScrollTrigger } from "@/lib/gsap";
import { mq } from "@/lib/motion";

/**
 * Silliq scroll (T4.1): Lenis, GSAP ticker bilan sinxron, anchor havolalar ham silliq.
 * Faqat sichqonchali qurilmalarda (T4.10), kutubxona alohida yuklanadi.
 * Modal ochiq bo'lsa sahifa scroll'i to'xtaydi. `prefers-reduced-motion` da ishlamaydi.
 * Scroll animatsiyalari alohida: `PageMotion` (sahifa ichida, hydration'dan keyin).
 */
export function MotionRoot() {
  // Silliq scroll
  useEffect(() => {
    // Faqat sichqoncha/trackpad: telefonda barmoq bilan scroll tabiiy, Lenis faqat ortiqcha JS
    if (!matchMedia(`${mq.motion} and (pointer: fine)`).matches) return;

    let cleanup: (() => void) | undefined;
    let cancelled = false;

    // Lenis alohida bo'lak sifatida, sahifa birinchi chizilgandan keyin yuklanadi
    import("lenis").then(({ default: Lenis }) => {
      if (cancelled) return;
      const lenis = new Lenis({
        autoRaf: false,
        lerp: 0.1,
        anchors: { force: true },
        // Modal va menyu ichida oddiy scroll
        prevent: (node) => node.closest("dialog") !== null,
      });
      lenis.on("scroll", ScrollTrigger.update);
      const tick = (time: number) => lenis.raf(time * 1000);
      gsap.ticker.add(tick);
      gsap.ticker.lagSmoothing(0);

      // Modal ochiq bo'lsa sahifa scroll'i to'xtaydi
      const sync = () => (document.querySelector("dialog[open]") ? lenis.stop() : lenis.start());
      const observer = new MutationObserver(sync);
      observer.observe(document.body, {
        subtree: true,
        attributes: true,
        attributeFilter: ["open"],
      });

      cleanup = () => {
        observer.disconnect();
        gsap.ticker.remove(tick);
        lenis.destroy();
      };
    });

    return () => {
      cancelled = true;
      cleanup?.();
    };
  }, []);

  return null;
}
