"use client";

import { useState } from "react";
import Image from "next/image";
import { useTranslations } from "next-intl";
import { site } from "@/content/site";
import { navItems } from "@/content/nav";
import { ConsultButton } from "@/components/lead/ConsultButton";
import { buttonStyles } from "@/components/ui/Button";
import { Modal } from "@/components/ui/Modal";
import { InstagramIcon, MenuIcon, PhoneIcon, TelegramIcon } from "@/components/ui/icons";
import { LocaleSwitch } from "./LocaleSwitch";
import logoMenu from "../../../public/images/brand/logo-menu.webp";

const social = "grid size-[30px] place-items-center rounded-full bg-navy text-white";

/**
 * Mobil menyu: o'ngdan chiquvchi krem panel (Tilda mobil versiyasi asosida).
 * Qo'shimcha: telefon raqami ko'rinib turadi, havola bosilganda panel yopiladi.
 */
export function MobileMenu() {
  const t = useTranslations("nav");
  const tCta = useTranslations("cta");
  const tSocial = useTranslations("social");
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
        closeLabel={t("close")}
        className="flex flex-col overflow-y-auto bg-cream px-6 pt-10 pb-8 text-navy"
      >
        <Image src={logoMenu} alt={site.name} sizes="120px" className="h-auto w-[120px]" />

        <nav aria-label={t("menu")} className="mt-8">
          <ul className="flex flex-col gap-4">
            {navItems.map((item) => (
              <li key={item.key}>
                <a
                  href={item.href}
                  onClick={close}
                  className="font-heading text-[22px] leading-tight font-medium"
                >
                  {t(item.key)}
                </a>
              </li>
            ))}
          </ul>
        </nav>

        <div className="mt-auto flex flex-col gap-6 pt-10">
          <a href={site.phones.main.href} className="flex items-center gap-2 text-lg">
            <PhoneIcon className="size-5 text-gold" />
            {site.phones.main.display}
          </a>
          <div className="flex gap-3">
            <a href={site.telegram} target="_blank" rel="noopener" className={social}>
              <TelegramIcon className="size-4" />
              <span className="sr-only">{tSocial("telegram")}</span>
            </a>
            <a href={site.instagram} target="_blank" rel="noopener" className={social}>
              <InstagramIcon className="size-4" />
              <span className="sr-only">{tSocial("instagram")}</span>
            </a>
          </div>
          <ConsultButton source="menu" onBeforeOpen={close} className={buttonStyles("navy")}>
            {tCta("consult")}
          </ConsultButton>
          <LocaleSwitch className="self-start font-heading text-lg font-medium" />
        </div>
      </Modal>
    </>
  );
}
