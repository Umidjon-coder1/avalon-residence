"use client";

import { useRef, useState, useSyncExternalStore } from "react";
import Image from "next/image";
import { useTranslations } from "next-intl";
import { apartments, type Apartment } from "@/content/apartments";
import { ConsultCta } from "@/components/lead/ConsultCta";
import { ArrowLeftIcon, ArrowRightIcon } from "@/components/ui/icons";
import { cn } from "@/lib/cn";

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
  const hydrated = useSyncExternalStore(
    noop,
    () => true,
    () => false,
  );
  const filtered = tab === "all" ? apartments : apartments.filter((a) => a.rooms === tab);
  const list = hydrated ? filtered : filtered.slice(0, SSR_CARDS);

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
      <div role="tablist" className="flex justify-center gap-[clamp(16px,2.0833vw,40px)]">
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
              tab === value ? "bg-white text-gold" : "text-white hover:bg-white/15",
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
            className="relative flex w-[clamp(280px,25vw,480px)] shrink-0 snap-start flex-col rounded-card bg-white px-5 pt-10 pb-10 text-navy"
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
