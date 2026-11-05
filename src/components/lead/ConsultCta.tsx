import { CtaParts, ctaRoot, type CtaSize, type CtaVariant } from "@/components/ui/CtaPair";
import type { LeadSource } from "@/lib/lead";
import { cn } from "@/lib/cn";
import { ConsultButton } from "./ConsultButton";

type ConsultCtaProps = {
  source: LeadSource;
  apartment?: string;
  label: string;
  variant?: CtaVariant;
  size?: CtaSize;
  className?: string;
  fullWidth?: boolean;
};

/** Ikki qismli CTA, bosilganda konsultatsiya popup'i ochiladi. */
export function ConsultCta({
  source,
  apartment,
  label,
  variant,
  size,
  className,
  fullWidth,
}: ConsultCtaProps) {
  return (
    <ConsultButton
      source={source}
      apartment={apartment}
      className={cn(ctaRoot(fullWidth), className)}
    >
      <CtaParts label={label} variant={variant} size={size} stretch={fullWidth} />
    </ConsultButton>
  );
}
