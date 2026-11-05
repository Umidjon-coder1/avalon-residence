"use client";

import { createContext, useCallback, useContext, useState, type ReactNode } from "react";
import Image from "next/image";
import { useTranslations } from "next-intl";
import { Modal } from "@/components/ui/Modal";
import type { LeadSource } from "@/lib/lead";
import { LeadForm } from "./LeadForm";
import popupImage from "../../../public/images/popup/popup-01.webp";

type ConsultRequest = { source: LeadSource; apartment?: string };

const ConsultContext = createContext<((req: ConsultRequest) => void) | null>(null);

/** Istalgan CTA dan konsultatsiya popup'ini ochish. */
export function useConsult() {
  const open = useContext(ConsultContext);
  if (!open) throw new Error("useConsult ConsultProvider ichida ishlatilishi kerak");
  return open;
}

/**
 * Konsultatsiya popup'i (T1.7). Figma'da popup yo'q, tuzilma Tilda'dan: rasm, sarlavha, ism, telefon, tugma.
 * Uslub Figma 5-blok formasidan: krem fon, oq inputlar, oltin tugma.
 */
export function ConsultProvider({ children }: { children: ReactNode }) {
  const t = useTranslations("form");
  const [request, setRequest] = useState<ConsultRequest | null>(null);
  // Har ochilishda forma qaytadan boshlanadi
  const [session, setSession] = useState(0);

  const open = useCallback((req: ConsultRequest) => {
    setRequest(req);
    setSession((n) => n + 1);
  }, []);
  const close = useCallback(() => setRequest(null), []);

  return (
    <ConsultContext.Provider value={open}>
      {children}
      <Modal
        open={request !== null}
        onClose={close}
        labelledBy="consult-title"
        closeLabel={t("close")}
        className="bg-cream sm:w-[560px] sm:rounded-card"
      >
        <Image
          src={popupImage}
          alt=""
          sizes="(min-width: 640px) 560px, 100vw"
          placeholder="blur"
          className="aspect-[560/312] w-full object-cover sm:rounded-t-card"
        />
        <div className="px-5 pt-8 pb-10 sm:px-11">
          <p
            id="consult-title"
            className="text-center font-heading text-[clamp(26px,1.875vw,36px)] leading-tight font-medium"
          >
            {t("popupTitle")}
          </p>
          <LeadForm
            key={session}
            source={request?.source ?? "popup"}
            apartment={request?.apartment}
            submitLabel={t("popupSubmit")}
            className="mt-7"
          />
        </div>
      </Modal>
    </ConsultContext.Provider>
  );
}
