"use client";

import { useEffect, useRef, useState } from "react";
import Image, { type StaticImageData } from "next/image";
import { cn } from "@/lib/cn";
import { mq } from "@/lib/motion";

type Props = {
  images: StaticImageData[];
  /** Har bir rasm necha ms turadi */
  interval?: number;
  sizes: string;
  label: string;
  className?: string;
};

/**
 * O'zi almashadigan rasmlar (Tilda'dagi joylashuv galereyasi kabi): rasmlar silliq almashadi,
 * faol rasm sekin kattalashadi. Ekrandan tashqarida va reduced-motion'da to'xtaydi; nuqtalar bilan tanlanadi.
 * Birinchi rasmdan keyingilari slayd ekranga kelgach, navbat bilan yuklanadi.
 */
export function AutoSlideshow({ images, interval = 4500, sizes, label, className }: Props) {
  // loaded: nechta rasm DOM'da (faol + keyingisi oldindan yuklanadi)
  const [{ active, loaded }, setState] = useState({ active: 0, loaded: 1 });
  const go = (next: (i: number) => number) =>
    setState((st) => {
      const i = next(st.active);
      return { active: i, loaded: Math.min(images.length, Math.max(st.loaded, i + 2)) };
    });
  const ref = useRef<HTMLDivElement>(null);
  const visible = useRef(false);

  useEffect(() => {
    const el = ref.current;
    if (!el || !matchMedia(mq.motion).matches) return;
    const io = new IntersectionObserver(([e]) => {
      visible.current = Boolean(e?.isIntersecting);
      // Slayd ko'ringanda keyingi rasm oldindan yuklanadi (sahifa ochilishida emas)
      if (visible.current) setState((st) => ({ ...st, loaded: Math.max(st.loaded, 2) }));
    });
    io.observe(el);
    const id = window.setInterval(() => {
      if (!visible.current || document.hidden) return;
      go((i) => (i + 1) % images.length);
    }, interval);
    return () => {
      io.disconnect();
      window.clearInterval(id);
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps -- go faqat setState ishlatadi
  }, [images.length, interval]);

  return (
    <div
      ref={ref}
      role="group"
      aria-roledescription="carousel"
      aria-label={label}
      className={cn("relative isolate overflow-hidden rounded-card bg-sand", className)}
    >
      {images.slice(0, loaded).map((src, i) => (
        <Image
          key={src.src}
          src={src}
          alt=""
          sizes={sizes}
          quality={90}
          aria-hidden={i !== active}
          className={cn(
            "absolute inset-0 size-full object-cover transition-[opacity,scale] ease-out",
            i === active
              ? "scale-105 opacity-100 duration-[1200ms,6000ms]"
              : "scale-100 opacity-0 duration-[1200ms,0ms]",
          )}
        />
      ))}
      <div className="absolute inset-x-0 bottom-3 flex justify-center gap-2">
        {images.map((src, i) => (
          <button
            key={src.src}
            type="button"
            aria-label={`${i + 1} / ${images.length}`}
            aria-current={i === active}
            onClick={() => go(() => i)}
            className={cn(
              "h-1.5 cursor-pointer rounded-full transition-[width,background-color] duration-500",
              i === active ? "w-6 bg-white" : "w-1.5 bg-white/60 hover:bg-white/90",
            )}
          />
        ))}
      </div>
    </div>
  );
}
