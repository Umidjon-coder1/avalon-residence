"use client";

import { useEffect, useRef, type ReactNode } from "react";
import { cn } from "@/lib/cn";
import { CloseIcon } from "./icons";

type ModalProps = {
  open: boolean;
  onClose: () => void;
  /** Sarlavha elementining id si (aria-labelledby) */
  labelledBy?: string;
  closeLabel: string;
  className?: string;
  /** "center": markazdagi oyna, "right": o'ngdan chiquvchi panel (mobil menyu) */
  placement?: "center" | "right";
  children: ReactNode;
};

/**
 * Native `<dialog>` asosidagi modal: fokus ichida qoladi, Esc yopadi, fon bosilsa yopiladi.
 * Sahifa scroll'i `globals.css` dagi `html:has(dialog[open])` bilan to'xtatiladi.
 */
export function Modal({
  open,
  onClose,
  labelledBy,
  closeLabel,
  className,
  placement = "center",
  children,
}: ModalProps) {
  const ref = useRef<HTMLDialogElement>(null);

  useEffect(() => {
    const dialog = ref.current;
    if (!dialog) return;
    if (open && !dialog.open) dialog.showModal();
    if (!open && dialog.open) dialog.close();
  }, [open]);

  return (
    <dialog
      ref={ref}
      aria-labelledby={labelledBy}
      onClose={onClose}
      onClick={(e) => {
        // Faqat fon (dialog o'zi) bosilganda yopiladi
        if (e.target === e.currentTarget) onClose();
      }}
      className={cn(
        "m-0 max-h-none max-w-none bg-transparent p-0 backdrop:bg-black/60 open:flex",
        placement === "center" &&
          "inset-0 h-full w-full items-start justify-center overflow-y-auto sm:items-center sm:py-16",
        placement === "right" &&
          "inset-y-0 right-0 left-auto h-dvh w-[min(100%,420px)] overflow-hidden",
      )}
    >
      <div className={cn("relative w-full", placement === "right" && "h-full", className)}>
        <button
          type="button"
          onClick={onClose}
          aria-label={closeLabel}
          className={cn(
            "absolute z-10 grid size-11 cursor-pointer place-items-center transition-opacity hover:opacity-70",
            placement === "center"
              ? "top-2 right-2 rounded-full bg-black/40 text-white sm:-top-12 sm:-right-12 sm:bg-transparent"
              : "top-4 right-4 text-navy",
          )}
        >
          <CloseIcon className="size-7" />
        </button>
        {children}
      </div>
    </dialog>
  );
}
