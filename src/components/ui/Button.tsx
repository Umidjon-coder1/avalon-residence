import type { ComponentProps } from "react";
import { cn } from "@/lib/cn";

const variants = {
  /** Hero CTA: krem fon, navy matn, radius 20, balandlik 80 */
  cream:
    "h-[clamp(56px,4.1667vw,80px)] rounded-btn bg-cream px-[clamp(24px,2.2vw,42px)] text-h3 text-navy uppercase hover:bg-white",
  /** Forma tugmasi: oltin fon, oq matn, radius 10, balandlik 64 */
  gold: "h-[clamp(52px,3.3333vw,64px)] rounded-card bg-gold px-8 text-btn text-white uppercase hover:bg-gold-light",
  /** Mobil menyu: navy pill */
  navy: "h-[50px] rounded-pill bg-navy px-8 text-base text-white hover:bg-navy/90",
} as const;

export type ButtonVariant = keyof typeof variants;

/** Tugma klasslari. `<a>` yoki `<Link>` ham tugma ko'rinishida bo'lishi uchun alohida. */
export function buttonStyles(variant: ButtonVariant = "gold", className?: string) {
  return cn(
    "inline-flex cursor-pointer items-center justify-center gap-3 font-heading font-medium",
    "transition-colors duration-200 disabled:cursor-not-allowed disabled:opacity-60",
    variants[variant],
    className,
  );
}

type ButtonProps = ComponentProps<"button"> & { variant?: ButtonVariant };

export function Button({ variant = "gold", className, type = "button", ...props }: ButtonProps) {
  return <button type={type} className={buttonStyles(variant, className)} {...props} />;
}
