"use client";

import { useRef } from "react";
import { gsap, useGSAP } from "@/lib/gsap";
import { mq } from "@/lib/motion";

const interactive = "a, button, [role='tab'], label, summary, input, textarea, select";

/**
 * Maxsus kursor (T4.9): oltin halqa sichqonchani yumshoq kuzatadi, havola va tugmalar ustida kattalashadi.
 * Faqat sichqonchali qurilmada va reduced-motion o'chiq bo'lsa. Oddiy kursor o'z joyida qoladi.
 */
export function CursorMotion() {
  const ring = useRef<HTMLDivElement>(null);

  useGSAP(() => {
    const el = ring.current;
    if (!el) return;
    const mm = gsap.matchMedia();
    mm.add(`${mq.motion} and (pointer: fine)`, () => {
      const x = gsap.quickTo(el, "x", { duration: 0.35, ease: "power3.out" });
      const y = gsap.quickTo(el, "y", { duration: 0.35, ease: "power3.out" });
      let visible = false;

      const move = (e: PointerEvent) => {
        if (e.pointerType !== "mouse") return;
        if (!visible) {
          visible = true;
          gsap.set(el, { x: e.clientX, y: e.clientY });
          gsap.to(el, { autoAlpha: 1, duration: 0.3 });
        }
        x(e.clientX);
        y(e.clientY);
        const hot = (e.target as Element | null)?.closest?.(interactive);
        el.dataset.hot = String(Boolean(hot));
      };
      const leave = () => {
        visible = false;
        gsap.to(el, { autoAlpha: 0, duration: 0.3 });
      };
      const down = () => gsap.to(el, { scale: 0.8, duration: 0.15 });
      const up = () => gsap.to(el, { scale: 1, duration: 0.3 });

      window.addEventListener("pointermove", move, { passive: true });
      document.documentElement.addEventListener("pointerleave", leave);
      window.addEventListener("pointerdown", down);
      window.addEventListener("pointerup", up);
      return () => {
        window.removeEventListener("pointermove", move);
        document.documentElement.removeEventListener("pointerleave", leave);
        window.removeEventListener("pointerdown", down);
        window.removeEventListener("pointerup", up);
      };
    });
    return () => mm.revert();
  });

  return (
    <div
      ref={ring}
      aria-hidden
      className="pointer-events-none invisible fixed top-0 left-0 z-[200] -mt-5 -ml-5 size-10 rounded-full border border-gold opacity-0 transition-[width,height,margin,background-color,border-color] duration-300 data-[hot=true]:-mt-8 data-[hot=true]:-ml-8 data-[hot=true]:size-16 data-[hot=true]:border-gold/60 data-[hot=true]:bg-gold/15"
    />
  );
}
