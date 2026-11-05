"use client";

import { useState, type CSSProperties } from "react";
import Image from "next/image";
import { useTranslations } from "next-intl";
import { site } from "@/content/site";
import { navItems } from "@/content/nav";
import { ConsultButton } from "@/components/lead/ConsultButton";
import { Modal } from "@/components/ui/Modal";
import { TArrowDownRight, TPhone } from "@/components/ui/tilda-icons";
import { InstagramLineIcon, MenuIcon, TelegramLineIcon } from "@/components/ui/icons";
import { LocaleSwitch } from "./LocaleSwitch";
import logoFooter from "../../../public/images/brand/logo-footer.webp";

const social =
  "grid size-11 place-items-center rounded-full border border-white/20 text-white transition-colors hover:border-gold hover:text-gold";

/** Menyu bandining tartib raqami: 01, 02 ... */
const pad = (n: number) => String(n).padStart(2, "0");

/**
 * Mobil menyu: o'ngdan chiquvchi to'q navy panel. Raqamlangan katta bandlar (PP Right Gothic), ingichka chiziqlar,
 * pastda telefon, manzil, ish vaqti, tarmoqlar va konsultatsiya tugmasi. Bandlar ketma-ket ko'tariladi
 * (`globals.css`, `[data-menu-item]`, reduced-motion'da yo'q). Havola bosilganda panel yopiladi.
 */
export function MobileMenu() {
  const t = useTranslations("nav");
  const tCta = useTranslations("cta");
  const tSocial = useTranslations("social");
  const tContacts = useTranslations("contacts");
  const [open, setOpen] = useState(false);
  const close = () => setOpen(false);

  return (
    <>
      <button
        type="button"
        onClick={() => setOpen(true)}
        aria-label={t("menu")}
        aria-expanded={open}
        className="grid size-11 cursor-pointer place-items-center rounded-card text-white"
      >
        <MenuIcon className="size-6" />
      </button>

      <Modal
        open={open}
        onClose={close}
        placement="right"
        tone="dark"
        closeLabel={t("close")}
        className="relative isolate flex flex-col overflow-y-auto bg-navy px-6 pt-6 pb-8 text-white"
      >
        {/* Yengil oltin nur: panelga chuqurlik beradi */}
        <span
          aria-hidden
          className="pointer-events-none absolute -top-40 -right-40 -z-10 size-[420px] rounded-full bg-[radial-gradient(closest-side,rgb(200_164_93/0.22),transparent)]"
        />

        <Image src={logoFooter} alt={site.name} unoptimized className="h-auto w-[132px]" />

        <nav aria-label={t("menu")} className="mt-10">
          <ul className="border-t border-white/10">
            {navItems.map((item, i) => (
              <li
                key={item.key}
                data-menu-item
                style={{ "--i": i } as CSSProperties}
                className="border-b border-white/10"
              >
                <a
                  href={item.href}
                  onClick={close}
                  className="group flex items-baseline gap-4 py-4 transition-colors hover:text-gold"
                >
                  <span className="w-6 font-heading text-sm text-gold tabular-nums">
                    {pad(i + 1)}
                  </span>
                  <span className="font-heading text-[28px] leading-none font-medium uppercase">
                    {t(item.key)}
                  </span>
                  <TArrowDownRight className="ml-auto size-5 -rotate-45 self-center text-white/40 transition-[translate,color] group-hover:translate-x-1 group-hover:text-gold" />
                </a>
              </li>
            ))}
          </ul>
        </nav>

        <div
          data-menu-item
          style={{ "--i": navItems.length } as CSSProperties}
          className="mt-auto pt-10"
        >
          <p className="text-xs tracking-[0.2em] text-white/50 uppercase">{t("contacts")}</p>
          <a
            href={site.phones.main.href}
            className="mt-2 flex items-center gap-3 font-heading text-[26px] leading-none font-medium"
          >
            <TPhone className="size-6 text-gold" />
            {site.phones.main.display}
          </a>
          <p className="mt-3 text-sm leading-relaxed text-white/60">
            {(tContacts.raw("hours") as string[]).join(", ")}
            <br />
            {tContacts("address")}
          </p>

          <div className="mt-6 flex items-center gap-3">
            <a href={site.telegram} target="_blank" rel="noopener" className={social}>
              <TelegramLineIcon className="size-5" />
              <span className="sr-only">{tSocial("telegram")}</span>
            </a>
            <a href={site.instagram} target="_blank" rel="noopener" className={social}>
              <InstagramLineIcon className="size-5" />
              <span className="sr-only">{tSocial("instagram")}</span>
            </a>
            <LocaleSwitch className="ml-auto grid h-11 min-w-11 place-items-center rounded-full border border-white/20 px-4 font-heading text-base font-medium transition-colors hover:border-gold hover:text-gold" />
          </div>

          <ConsultButton
            source="menu"
            onBeforeOpen={close}
            className="mt-6 flex h-14 w-full cursor-pointer items-center justify-between rounded-card bg-gold pr-2 pl-6 font-heading text-btn font-medium text-white uppercase transition-colors hover:bg-gold-light"
          >
            {tCta("consult")}
            <span className="grid size-10 place-items-center rounded-[8px] bg-white/15">
              <TArrowDownRight className="size-5" />
            </span>
          </ConsultButton>
        </div>
      </Modal>
    </>
  );
}
