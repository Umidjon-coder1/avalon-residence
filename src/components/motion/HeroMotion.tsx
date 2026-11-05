"use client";

import { gsap, SplitText, useGSAP } from "@/lib/gsap";
import { duration, ease, INTRO_KEY, mq } from "@/lib/motion";

/**
 * Intro va bosh ekran (T4.2, T4.3).
 * - Birinchi tashrifda krem parda logotip bilan ochiladi (taxminan 1.5 s), keyingi tashriflarda yo'q
 * - Rasm sekin kichrayadi (LCP rasmi yashirilmaydi, faqat masshtab), keyin scroll'da parallax
 * - Header, belgilar, sarlavha qatorlari (mask), CTA va ijtimoiy tarmoqlar ketma-ket chiqadi
 *
 * Elementlar `[data-hero]` bilan belgilangan. Ular sahifa chizilganda CSS orqali yashirin (`html.motion`),
 * JS ishlamasa 2.5 s dan keyin CSS o'zi ko'rsatadi (globals.css).
 */
export function HeroMotion() {
  useGSAP(() => {
    const root = document.documentElement;
    const mm = gsap.matchMedia();

    mm.add(mq.motion, () => {
      const image = document.querySelector<HTMLElement>("[data-hero-image]");
      const title = document.querySelector<HTMLElement>("[data-hero='title']");
      const curtain = document.querySelector<HTMLElement>(".intro-curtain");
      const withIntro = root.classList.contains("intro") && curtain !== null;

      // Boshlang'ich holatlar inline beriladi, keyin CSS yashirishni bekor qiladi
      gsap.set("[data-hero='header']", { autoAlpha: 0, y: -24 });
      gsap.set("[data-hero='badge'], [data-hero='cta']", { autoAlpha: 0, y: 24 });
      gsap.set("[data-hero='social']", { autoAlpha: 0, x: 16 });
      const split = title
        ? SplitText.create(title, { type: "lines", mask: "lines", linesClass: "hero-line" })
        : null;
      if (title) gsap.set(title, { autoAlpha: 1 });
      if (split) gsap.set(split.lines, { yPercent: 110 });
      root.classList.add("hero-ready");

      const tl = gsap.timeline({
        onComplete: () => root.classList.remove("intro"),
      });

      if (withIntro) {
        const logo = curtain.querySelector("img");
        tl.fromTo(logo, { autoAlpha: 0, scale: 0.92 }, { autoAlpha: 1, scale: 1, duration: 0.7 })
          .to(curtain, { yPercent: -100, duration: 1, ease: ease.inOut }, "+=0.2")
          .set(curtain, { display: "none" });
        try {
          localStorage.setItem(INTRO_KEY, "1");
        } catch {
          // maxfiy rejim: intro keyingi safar ham ko'rinadi, bu muammo emas
        }
      }

      tl.fromTo(
        image,
        { scale: 1.2 },
        { scale: 1.08, duration: duration.hero, ease: "power2.out" },
        withIntro ? "-=0.7" : 0,
      )
        .to("[data-hero='header']", { autoAlpha: 1, y: 0, duration: 0.8 }, "<0.1")
        .to("[data-hero='badge']", { autoAlpha: 1, y: 0, stagger: 0.08 }, "<0.15");
      if (split) {
        tl.to(split.lines, { yPercent: 0, duration: 1.1, stagger: 0.12, ease: ease.text }, "<0.1");
      }
      tl.to("[data-hero='cta']", { autoAlpha: 1, y: 0 }, "<0.35").to(
        "[data-hero='social']",
        { autoAlpha: 1, x: 0, stagger: 0.08 },
        "<0.1",
      );

      // Parallax: rasm 1.08 masshtabda, 4% pastga suriladi, chetlar ochilib qolmaydi
      if (image) {
        gsap.to(image, {
          yPercent: 4,
          ease: "none",
          scrollTrigger: {
            trigger: image.closest("section"),
            start: "top top",
            end: "bottom top",
            scrub: true,
          },
        });
      }

      return () => {
        split?.revert();
        root.classList.remove("intro");
      };
    });

    return () => mm.revert();
  });

  return null;
}
