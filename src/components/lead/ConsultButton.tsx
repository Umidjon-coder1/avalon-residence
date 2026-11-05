"use client";

import type { ComponentProps } from "react";
import type { LeadSource } from "@/lib/lead";
import { useConsult } from "./ConsultProvider";

type ConsultButtonProps = Omit<ComponentProps<"button">, "onClick"> & {
  source: LeadSource;
  apartment?: string;
  /** Popup ochilishidan oldin, masalan mobil menyuni yopish uchun */
  onBeforeOpen?: () => void;
};

/** Konsultatsiya popup'ini ochadigan tugma. Ko'rinishi className orqali beriladi. */
export function ConsultButton({
  source,
  apartment,
  onBeforeOpen,
  type = "button",
  ...props
}: ConsultButtonProps) {
  const open = useConsult();
  return (
    <button
      type={type}
      onClick={() => {
        onBeforeOpen?.();
        open({ source, apartment });
      }}
      {...props}
    />
  );
}
