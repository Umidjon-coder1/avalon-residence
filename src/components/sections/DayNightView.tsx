"use client";

import { useEffect, useRef, useState } from "react";
import Image, { type StaticImageData } from "next/image";
import { cn } from "@/lib/cn";
import { mq } from "@/lib/motion";

type View = { label: string; day: StaticImageData; night: StaticImageData };

type Props = {
  views: View[];
  dayLabel: string;
  nightLabel: string;
  groupLabel: string;
  className?: string;
};

const chip =
  "relative z-10 flex h-10 cursor-pointer items-center gap-2 rounded-pill px-4 text-sm font-medium transition-colors duration-500";

function SunIcon(props: { className?: string }) {
  return (
    <svg viewBox="0 0 24 24" fill="none" aria-hidden className={props.className}>
      <circle cx="12" cy="12" r="4" stroke="currentColor" strokeWidth="1.6" />
      <path
        d="M12 2.5v2M12 19.5v2M4.6 4.6l1.4 1.4M18 18l1.4 1.4M2.5 12h2M19.5 12h2M4.6 19.4 6 18M18 6l1.4-1.4"
        stroke="currentColor"
        strokeWidth="1.6"
        strokeLinecap="round"
      />
    </svg>
  );
}

function MoonIcon(props: { className?: string }) {
  return (
    <svg viewBox="0 0 24 24" fill="none" aria-hidden className={props.className}>
      <path
        d="M20 14.5A8 8 0 0 1 9.5 4a8 8 0 1 0 10.5 10.5Z"
        stroke="currentColor"
        strokeWidth="1.6"
        strokeLinejoin="round"
      />
    </svg>
  );
}

/**
 * Kechki yoritish rejimi (T4.7): bitta joyning kunduzgi va kechki renderi ustma-ust,
 * "Kunduzi / Kechqurun" bosilganda silliq almashadi. Pastda ko'rinishlar (fasad, hovli, parking).
 * Bo'lim ekranga kelganda bir marta o'zi kechki rejimga o'tadi (reduced-motion'da yo'q).
 * Rasmlar faqat tanlangan ko'rinish uchun yuklanadi.
 */
export function DayNightView({ views, dayLabel, nightLabel, groupLabel, className }: Props) {
  const [night, setNight] = useState(false);
  const [active, setActive] = useState(0);
  const [loaded, setLoaded] = useState<number[]>([0]);
  const touched = useRef(false);
  const ref = useRef<HTMLDivElement>(null);

  // Ekranga kelganda: 1.2 s dan keyin chiroqlar "yonadi"
  useEffect(() => {
    const el = ref.current;
    if (!el || !matchMedia(mq.motion).matches) return;
    let timer = 0;
    const io = new IntersectionObserver(
      ([entry]) => {
        if (!entry?.isIntersecting) return;
        io.disconnect();
        timer = window.setTimeout(() => !touched.current && setNight(true), 1200);
      },
      { threshold: 0.6 },
    );
    io.observe(el);
    return () => {
      io.disconnect();
      window.clearTimeout(timer);
    };
  }, []);

  const pick = (i: number) => {
    touched.current = true;
    setActive(i);
    setLoaded((l) => (l.includes(i) ? l : [...l, i]));
  };
  const toggle = (value: boolean) => {
    touched.current = true;
    setNight(value);
  };

  return (
    <div
      ref={ref}
      data-reveal="image"
      className={cn("relative isolate overflow-hidden rounded-card bg-navy", className)}
    >
      {views.map((view, i) =>
        loaded.includes(i) ? (
          <div
            key={view.label}
            aria-hidden={i !== active}
            className={cn(
              "absolute inset-0 -z-10 transition-opacity duration-700",
              i === active ? "opacity-100" : "opacity-0",
            )}
          >
            <Image
              src={view.day}
              alt={`${view.label}: ${dayLabel}`}
              sizes="(min-width: 1024px) 42vw, 100vw"
              quality={90}
              className="absolute inset-0 size-full object-cover"
            />
            <Image
              src={view.night}
              alt={`${view.label}: ${nightLabel}`}
              sizes="(min-width: 1024px) 42vw, 100vw"
              quality={90}
              className={cn(
                "absolute inset-0 size-full object-cover transition-[opacity,scale] duration-[1400ms] ease-out",
                night ? "scale-100 opacity-100" : "scale-[1.03] opacity-0",
              )}
            />
          </div>
        ) : null,
      )}
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0 -z-10 bg-[linear-gradient(to_top,rgb(0_0_0/0.45),transparent_40%)]"
      />

      {/* Kunduzi / Kechqurun: oq "pill" tanlangan tomonga siljiydi */}
      <div
        role="group"
        aria-label={`${dayLabel} / ${nightLabel}`}
        className="absolute top-3 right-3 grid grid-cols-2 rounded-pill bg-black/30 p-1 backdrop-blur-glass sm:top-4 sm:right-4"
      >
        <span
          aria-hidden
          className={cn(
            "absolute inset-y-1 left-1 w-[calc(50%-4px)] rounded-pill bg-white transition-transform duration-500 ease-out",
            night && "translate-x-full",
          )}
        />
        <button
          type="button"
          aria-pressed={!night}
          onClick={() => toggle(false)}
          className={cn(chip, night ? "text-white" : "text-navy")}
        >
          <SunIcon className="size-4" />
          {dayLabel}
        </button>
        <button
          type="button"
          aria-pressed={night}
          onClick={() => toggle(true)}
          className={cn(chip, night ? "text-navy" : "text-white")}
        >
          <MoonIcon className="size-4" />
          {nightLabel}
        </button>
      </div>

      {/* Ko'rinishlar */}
      <div
        role="group"
        aria-label={groupLabel}
        className="absolute bottom-3 left-3 flex flex-wrap gap-2 sm:bottom-4 sm:left-4"
      >
        {views.map((view, i) => (
          <button
            key={view.label}
            type="button"
            aria-pressed={i === active}
            onClick={() => pick(i)}
            className={cn(
              "h-9 cursor-pointer rounded-pill px-4 text-sm backdrop-blur-glass transition-colors",
              i === active ? "bg-gold text-white" : "bg-black/30 text-white hover:bg-black/45",
            )}
          >
            {view.label}
          </button>
        ))}
      </div>
    </div>
  );
}
