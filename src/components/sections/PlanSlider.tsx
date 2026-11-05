"use client";

import { useRef, useState, useSyncExternalStore } from "react";
import Image from "next/image";
import { useTranslations } from "next-intl";
import { apartments, type Apartment } from "@/content/apartments";
import { ConsultCta } from "@/components/lead/ConsultCta";
import { ArrowLeftIcon, ArrowRightIcon } from "@/components/ui/icons";
import { cn } from "@/lib/cn";
import { gsap, useGSAP } from "@/lib/gsap";
import { mq } from "@/lib/motion";

type Tab = "all" | Apartment["rooms"];

/** Bo'sh tablar ko'rsatilmaydi: Tilda'da 1 xonali reja yo'q (ROADMAP #6) */
const roomTabs = ([1, 2, 3] as const).filter((r) => apartments.some((a) => a.rooms === r));

/** Serverda (HTML ichida) nechta karta chiqariladi. Qolganlari brauzerda qo'shiladi: HTML yengilroq */
const SSR_CARDS = 6;
const noop = () => () => {};

const tabBase =
  "grid h-16 cursor-pointer place-items-center rounded-card border border-white font-heading text-h3 font-medium transition-colors";

/**
 * Reja kartalari (Figma 8-blok): tablar (Jami, 2, 3) va o'ngga chiqib turuvchi slayder.
 * "Ariza qoldirish" popup'ga reja id sini uzatadi. Strelkalar Figma'da yo'q, sichqoncha uchun qo'shildi.
 */
export function PlanSlider() {
  const t = useTranslations("plans");
  const tCta = useTranslations("cta");
  const [tab, setTab] = useState<Tab>("all");
  const listRef = useRef<HTMLUListElement>(null);
  const tabsRef = useRef<HTMLDivElement>(null);
  const pillRef = useRef<HTMLSpanElement>(null);
  const hydrated = useSyncExternalStore(
    noop,
    () => true,
    () => false,
  );
  const filtered = tab === "all" ? apartments : apartments.filter((a) => a.rooms === tab);
  const list = hydrated ? filtered : filtered.slice(0, SSR_CARDS);

  // Tab almashganda kartalar o'ngdan ketma-ket kiradi (birinchi chizishda emas, T4.8)
  const firstRender = useRef(true);
  useGSAP(
    () => {
      if (firstRender.current) {
        firstRender.current = false;
        return;
      }
      if (!matchMedia(mq.motion).matches) return;
      gsap.fromTo(
        listRef.current?.children ?? [],
        { autoAlpha: 0, x: 60 },
        { autoAlpha: 1, x: 0, duration: 0.7, stagger: 0.06, overwrite: true },
      );
    },
    { dependencies: [tab] },
  );

  // Faol tab foni (oq "pill") bir tabdan ikkinchisiga siljib o'tadi (FLIP, T4.8)
  const pillPlaced = useRef(false);
  useGSAP(
    () => {
      const pill = pillRef.current;
      const tabs = tabsRef.current;
      if (!hydrated || !pill || !tabs) return;
      const place = (animate: boolean) => {
        const active = tabs.querySelector<HTMLElement>("[aria-selected='true']");
        if (!active) return;
        const to = { x: active.offsetLeft, width: active.offsetWidth };
        const smooth = animate && matchMedia(mq.motion).matches;
        if (smooth) gsap.to(pill, { ...to, duration: 0.55, ease: "power3.inOut" });
        else gsap.set(pill, { ...to, autoAlpha: 1 });
      };
      place(pillPlaced.current);
      pillPlaced.current = true;
      const onResize = () => place(false);
      window.addEventListener("resize", onResize);
      return () => window.removeEventListener("resize", onResize);
    },
    { dependencies: [tab, hydrated] },
  );

  const select = (next: Tab) => {
    setTab(next);
    listRef.current?.scrollTo({ left: 0 });
  };

  const scroll = (dir: 1 | -1) => {
    const el = listRef.current;
    const card = el?.querySelector("li");
    if (!el || !card) return;
    el.scrollBy({ left: dir * (card.clientWidth + 40), behavior: "smooth" });
  };

  return (
    <div>
      <div
        ref={tabsRef}
        role="tablist"
        className="relative flex justify-center gap-[clamp(16px,2.0833vw,40px)]"
      >
        <span
          ref={pillRef}
          aria-hidden
          className="invisible absolute top-0 left-0 h-16 rounded-card bg-white opacity-0"
        />
        {(["all", ...roomTabs] as Tab[]).map((value) => (
          <button
            key={value}
            type="button"
            role="tab"
            aria-selected={tab === value}
            onClick={() => select(value)}
            className={cn(
              tabBase,
              value === "all" ? "w-[120px]" : "w-20",
              "relative",
              tab !== value && "text-white hover:bg-white/15",
              // Brauzerda fonni siljuvchi pill beradi, serverda (JS gacha) tugmaning o'zi
              tab === value && (hydrated ? "text-gold" : "bg-white text-gold"),
            )}
          >
            {value === "all" ? t("tabAll") : value}
          </button>
        ))}
      </div>

      <ul
        ref={listRef}
        className="mt-[clamp(40px,4.1667vw,80px)] flex snap-x snap-mandatory scroll-pl-[calc(var(--gutter)+clamp(0px,2.0833vw,40px))] [scrollbar-width:none] gap-[clamp(16px,2.0833vw,40px)] overflow-x-auto px-[calc(var(--gutter)+clamp(0px,2.0833vw,40px))] pb-4"
      >
        {list.map((apt) => (
          <li
            key={apt.id}
            className="relative flex w-[clamp(280px,25vw,480px)] shrink-0 snap-start flex-col rounded-card bg-white px-5 pt-10 pb-10 text-navy transition-[transform,box-shadow] duration-500 ease-out hover:-translate-y-1.5 hover:shadow-[0_24px_48px_-24px_rgb(11_34_57/0.45)]"
          >
            <div className="flex items-baseline justify-between px-5 text-lead leading-none">
              <span className="font-medium">{t("rooms", { count: apt.rooms })}</span>
              <span>{t("area", { area: String(apt.area) })}</span>
            </div>
            <Image
              src={apt.plan}
              alt={`${t("rooms", { count: apt.rooms })}, ${t("area", { area: String(apt.area) })}`}
              width={512}
              height={600}
              unoptimized
              className="mx-auto mt-2 aspect-square w-full object-contain"
            />
            <ConsultCta
              source="plans"
              apartment={apt.id}
              variant="gold"
              size="md"
              label={tCta("apply")}
              fullWidth
              className="mt-4 px-6"
            />
          </li>
        ))}
      </ul>

      <div className="mt-6 flex justify-center gap-4">
        <button
          type="button"
          onClick={() => scroll(-1)}
          aria-label={t("prev")}
          className={cn(tabBase, "w-16 text-white hover:bg-white/15")}
        >
          <ArrowLeftIcon className="size-6" />
        </button>
        <button
          type="button"
          onClick={() => scroll(1)}
          aria-label={t("next")}
          className={cn(tabBase, "w-16 text-white hover:bg-white/15")}
        >
          <ArrowRightIcon className="size-6" />
        </button>
      </div>
    </div>
  );
}
