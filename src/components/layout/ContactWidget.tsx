"use client";

import { useEffect, useRef, useState } from "react";
import { useTranslations } from "next-intl";
import { site } from "@/content/site";
import { ChatIcon, CloseIcon } from "@/components/ui/icons";
import { TWidgetPhone, TWidgetTelegram } from "@/components/ui/tilda-icons";

const item =
  "flex items-center justify-end gap-3 transition-[opacity,translate,scale] duration-300 ease-out group-data-[open=false]:pointer-events-none group-data-[open=false]:translate-y-3 group-data-[open=false]:scale-90 group-data-[open=false]:opacity-0";
const label =
  "rounded-pill bg-white px-4 py-2 text-sm whitespace-nowrap text-ink shadow-soft max-sm:sr-only";

/**
 * Aloqa vidjeti (Tilda'dagi kabi): o'ng pastki burchakda doim turadi.
 * Bosilganda Telegram (admin) va telefon qo'ng'irog'i chiqadi. Esc yoki tashqariga bosish yopadi.
 * Bosh ekranda yashirin (u yerda telefon va tarmoqlar bor, mobilda CTA ni yopmasin), scroll'dan keyin chiqadi.
 */
export function ContactWidget() {
  const t = useTranslations("widget");
  const [open, setOpen] = useState(false);
  const [shown, setShown] = useState(false);
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const check = () => {
      const past = window.scrollY > window.innerHeight * 0.6;
      setShown(past);
      if (!past) setOpen(false);
    };
    check();
    window.addEventListener("scroll", check, { passive: true });
    return () => window.removeEventListener("scroll", check);
  }, []);

  useEffect(() => {
    if (!open) return;
    const onKey = (e: KeyboardEvent) => e.key === "Escape" && setOpen(false);
    const onClick = (e: PointerEvent) => {
      if (!ref.current?.contains(e.target as Node)) setOpen(false);
    };
    document.addEventListener("keydown", onKey);
    document.addEventListener("pointerdown", onClick);
    return () => {
      document.removeEventListener("keydown", onKey);
      document.removeEventListener("pointerdown", onClick);
    };
  }, [open]);

  return (
    <div
      ref={ref}
      data-open={open}
      data-shown={shown}
      inert={!shown}
      className="group fixed right-[clamp(12px,1.25vw,24px)] bottom-[clamp(12px,1.6667vw,32px)] z-40 flex flex-col items-end gap-3 transition-[opacity,translate] duration-500 data-[shown=false]:pointer-events-none data-[shown=false]:translate-y-6 data-[shown=false]:opacity-0"
    >
      <ul id="contact-widget" className="flex flex-col gap-3" aria-hidden={!open}>
        <li className={`${item} delay-75 group-data-[open=false]:delay-0`}>
          <a
            href={site.telegram}
            target="_blank"
            rel="noopener"
            tabIndex={open ? 0 : -1}
            className="flex items-center gap-3"
          >
            <span className={label}>{t("telegram")}</span>
            <TWidgetTelegram className="size-[50px] rounded-full shadow-icon" />
          </a>
        </li>
        <li className={item}>
          <a
            href={site.phones.widget.href}
            tabIndex={open ? 0 : -1}
            className="flex items-center gap-3"
          >
            <span className={label}>
              <span className="sr-only">{t("phone")}: </span>
              {site.phones.widget.display}
            </span>
            <TWidgetPhone className="size-[50px] rounded-full shadow-icon" />
          </a>
        </li>
      </ul>

      <button
        type="button"
        onClick={() => setOpen((v) => !v)}
        aria-expanded={open}
        aria-controls="contact-widget"
        aria-label={open ? t("close") : t("open")}
        className="relative grid size-14 cursor-pointer place-items-center rounded-full bg-gold text-white shadow-icon transition-colors hover:bg-gold-alt sm:size-16"
      >
        {/* Yopiq holatda sekin "to'lqin": e'tiborni tortadi, reduced-motion da yo'q */}
        <span
          aria-hidden
          className="absolute inset-0 rounded-full bg-gold group-data-[open=true]:hidden motion-safe:animate-[widget-ping_2.4s_ease-out_infinite]"
        />
        <ChatIcon className="relative size-7 transition-[opacity,scale] duration-300 group-data-[open=true]:scale-50 group-data-[open=true]:opacity-0" />
        <CloseIcon className="absolute size-7 transition-[opacity,scale] duration-300 group-data-[open=false]:scale-50 group-data-[open=false]:opacity-0" />
      </button>
    </div>
  );
}
