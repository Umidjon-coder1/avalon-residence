"use client";

import { useId, useRef, useState, type FormEvent } from "react";
import { useLocale, useTranslations } from "next-intl";
import { Button } from "@/components/ui/Button";
import { Input } from "@/components/ui/Input";
import { cn } from "@/lib/cn";
import {
  formatPhone,
  normalizePhone,
  validateLead,
  type LeadErrors,
  type LeadSource,
} from "@/lib/lead";

type Status = "idle" | "sending" | "success" | "error";

type LeadFormProps = {
  source: LeadSource;
  /** Rejalar blokidan tanlangan reja id si */
  apartment?: string;
  /** Tugma matni, standart: "Jo'natish" */
  submitLabel?: string;
  className?: string;
  onSuccess?: () => void;
};

/**
 * Ism va telefon formasi. Popup, 5-blok va 9-blok shu komponentdan foydalanadi.
 * Telefon niqobi Tilda'dagidek: +998 00-000-0000.
 */
export function LeadForm({ source, apartment, submitLabel, className, onSuccess }: LeadFormProps) {
  const t = useTranslations("form");
  const tCta = useTranslations("cta");
  const locale = useLocale();
  const id = useId();
  const startedAt = useRef<number | null>(null);

  const [name, setName] = useState("");
  const [phone, setPhone] = useState("");
  const [errors, setErrors] = useState<LeadErrors>({});
  const [status, setStatus] = useState<Status>("idle");

  // Forma bilan birinchi muloqot vaqti (bot himoyasi uchun)
  const markStart = () => {
    startedAt.current ??= Date.now();
  };

  async function onSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const found = validateLead({ name, phone });
    setErrors(found);
    if (Object.keys(found).length > 0) return;

    const company = new FormData(e.currentTarget).get("company");
    setStatus("sending");
    try {
      const res = await fetch("/api/lead", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          name,
          phone,
          locale,
          source,
          apartment,
          company,
          elapsed: Date.now() - (startedAt.current ?? Date.now()),
        }),
      });
      if (!res.ok) throw new Error(String(res.status));
      setStatus("success");
      setName("");
      setPhone("");
      onSuccess?.();
    } catch {
      setStatus("error");
    }
  }

  if (status === "success") {
    return (
      <div role="status" className={cn("text-center", className)}>
        <p className="font-heading text-h3 font-medium uppercase">{t("successTitle")}</p>
        <p className="mt-3">{t("successText")}</p>
      </div>
    );
  }

  return (
    <form
      noValidate
      onSubmit={onSubmit}
      onFocus={markStart}
      className={cn("flex flex-col gap-2", className)}
    >
      <Input
        id={`${id}-name`}
        name="name"
        label={t("name")}
        placeholder={t("name")}
        autoComplete="name"
        maxLength={60}
        value={name}
        onChange={(e) => setName(e.target.value)}
        error={errors.name ? t("nameError") : undefined}
      />
      <Input
        id={`${id}-phone`}
        name="phone"
        type="tel"
        inputMode="tel"
        label={t("phone")}
        addon="+998"
        placeholder="00-000-0000"
        autoComplete="tel-national"
        value={formatPhone(phone)}
        onChange={(e) => setPhone(normalizePhone(e.target.value))}
        error={errors.phone ? t("phoneError") : undefined}
      />
      {/* Honeypot: odamga ko'rinmaydi, bot to'ldiradi */}
      <div aria-hidden="true" className="absolute -left-[9999px] h-px w-px overflow-hidden">
        <label htmlFor={`${id}-company`}>Company</label>
        <input id={`${id}-company`} name="company" tabIndex={-1} autoComplete="off" />
      </div>
      <Button type="submit" variant="gold" disabled={status === "sending"} className="mt-2 w-full">
        {status === "sending" ? t("sending") : (submitLabel ?? tCta("send"))}
      </Button>
      {status === "error" ? (
        <p role="alert" className="text-center text-caption text-red-700">
          {t("error")}
        </p>
      ) : null}
    </form>
  );
}
