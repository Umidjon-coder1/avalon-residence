"use client";

import { useEffect, useRef, useState } from "react";
import { site } from "@/content/site";
import logoMark from "../../../public/images/brand/logo-mark.webp";

/* Yandex Maps JS API 2.1 dan ishlatiladigan qism (to'liq tiplar kerak emas) */
type YMap = {
  behaviors: { disable: (b: string | string[]) => void };
  geoObjects: { add: (o: unknown) => void };
  destroy: () => void;
};
type YMaps = {
  ready: (cb: () => void) => void;
  Map: new (el: HTMLElement, state: object, options?: object) => YMap;
  Placemark: new (coords: number[], props: object, options: object) => unknown;
  templateLayoutFactory: { createClass: (html: string) => unknown };
};
declare global {
  interface Window {
    ymaps?: YMaps;
  }
}

let loader: Promise<YMaps> | null = null;

/** API skripti bir marta yuklanadi (bir sahifada ikkita xarita bo'lsa ham) */
function loadYmaps(lang: string): Promise<YMaps> {
  if (loader) return loader;
  loader = new Promise<YMaps>((resolve, reject) => {
    const key = process.env.NEXT_PUBLIC_YANDEX_MAPS_KEY;
    const script = document.createElement("script");
    script.src = `https://api-maps.yandex.ru/2.1/?lang=${lang}${key ? `&apikey=${key}` : ""}`;
    script.async = true;
    script.onload = () => window.ymaps?.ready(() => resolve(window.ymaps as YMaps));
    script.onerror = () => reject(new Error("ymaps"));
    document.head.append(script);
  });
  loader.catch(() => (loader = null));
  return loader;
}

/** Brend belgisi: olmos ichida logo, atrofida to'lqin. Uchi koordinataga tushadi. */
const markerHtml = `<div class="ymap-marker" aria-hidden="true">
  <span class="ymap-marker__ping"></span>
  <span class="ymap-marker__body"></span>
  <img src="${logoMark.src}" alt="" class="ymap-marker__logo" />
  <span class="ymap-marker__tip"></span>
</div>`;

type Props = {
  lang: "uz_UZ" | "ru_RU";
  title: string;
  className?: string;
};

/**
 * Premium xarita (kenesary-qs.kz dagi kabi): Yandex JS API 2.1, faqat xarita foni kulrang
 * (`globals.css`, `.ymap`), belgi brend rangida. Ekranga yaqinlashganda yuklanadi.
 * Sichqoncha g'ildiragi sahifani aylantiradi (xarita kattalashmaydi), telefonda xarita bir barmoq bilan surilmaydi.
 * API yuklanmasa (bloklangan tarmoq) oddiy Yandex vidjeti (iframe) ko'rsatiladi.
 */
export function YandexMap({ lang, title, className }: Props) {
  const ref = useRef<HTMLDivElement>(null);
  const [fallback, setFallback] = useState(false);
  const { lat, lng } = site.map;

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    let map: YMap | undefined;
    let cancelled = false;

    const init = () => {
      // 10 s ichida yuklanmasa: zaxira iframe
      const timer = window.setTimeout(() => !cancelled && !map && setFallback(true), 10_000);
      loadYmaps(lang)
        .then((ymaps) => {
          if (cancelled) return;
          window.clearTimeout(timer);
          map = new ymaps.Map(
            el,
            { center: [lat, lng], zoom: 16, controls: ["zoomControl"] },
            { suppressMapOpenBlock: true, yandexMapDisablePoiInteractivity: true },
          );
          map.behaviors.disable("scrollZoom");
          if (matchMedia("(pointer: coarse)").matches) map.behaviors.disable("drag");
          const layout = ymaps.templateLayoutFactory.createClass(markerHtml);
          map.geoObjects.add(
            new ymaps.Placemark(
              [lat, lng],
              { hintContent: site.name },
              {
                iconLayout: layout,
                iconShape: {
                  type: "Rectangle",
                  coordinates: [
                    [-36, -84],
                    [36, 0],
                  ],
                },
              },
            ),
          );
        })
        .catch(() => {
          window.clearTimeout(timer);
          if (!cancelled) setFallback(true);
        });
    };

    const io = new IntersectionObserver(
      (entries) => {
        if (entries.some((e) => e.isIntersecting)) {
          io.disconnect();
          init();
        }
      },
      { rootMargin: "600px 0px" },
    );
    io.observe(el);

    return () => {
      cancelled = true;
      io.disconnect();
      map?.destroy();
    };
  }, [lang, lat, lng]);

  if (fallback) {
    return (
      <iframe
        src={`https://yandex.uz/map-widget/v1/?ll=${lng}%2C${lat}&z=16&lang=${lang}&pt=${lng}%2C${lat},pm2rdm`}
        title={title}
        loading="lazy"
        className={`${className ?? ""} border-0 grayscale-[0.85]`}
      />
    );
  }

  return <div ref={ref} role="region" aria-label={title} className={`ymap ${className ?? ""}`} />;
}
