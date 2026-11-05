import type { ComponentProps, ReactNode } from "react";
import { cn } from "@/lib/cn";
import { TArrowDownRight } from "./tilda-icons";

/**
 * Figma'dagi asosiy CTA: matnli to'rtburchak + yonida strelkali kvadrat (radius 20).
 * Hero, afzalliklar, joylashuv, hududlar, fasad va reja kartalarida bir xil.
 */
const variants = {
  /** Hero: krem fon, navy matn; hover: oppoq */
  cream: "bg-cream text-navy group-hover:bg-white",
  /** Oltin fon ustida: oq fon, oltin matn; hover: rang o'zgarmaydi, faqat strelka siljiydi */
  white: "bg-white text-gold",
  /** Oq fon ustida: oltin fon, oq matn; hover: bilinar-bilinmas yorug'roq oltin */
  gold: "bg-gold text-white group-hover:bg-gold-light",
} as const;

const sizes = {
  lg: {
    box: "h-[clamp(56px,4.1667vw,80px)]",
    label: "text-h3",
    icon: "size-[clamp(28px,2.0833vw,40px)]",
  },
  md: {
    box: "h-[clamp(52px,3.3333vw,64px)]",
    label: "text-btn xl:text-h3",
    icon: "size-[clamp(24px,1.6667vw,32px)]",
  },
} as const;

export type CtaVariant = keyof typeof variants;
export type CtaSize = keyof typeof sizes;

type CtaPartsProps = {
  label: ReactNode;
  variant?: CtaVariant;
  size?: CtaSize;
  /** Strelka o'rniga boshqa ikonka (masalan, xarita belgisi) */
  icon?: ReactNode;
  /** true: matnli qism bo'sh joyni to'ldiradi; false: 640 px dan katta ekranda 320 px (Figma) */
  stretch?: boolean;
};

/** Tugma yoki havola ichiga qo'yiladigan ikki qism. Ota element `group` va `flex` bo'lishi kerak. */
export function CtaParts({ label, variant = "gold", size = "lg", icon, stretch }: CtaPartsProps) {
  const s = sizes[size];
  return (
    <>
      <span
        className={cn(
          "flex min-w-0 flex-1 items-center justify-center rounded-btn px-4 font-heading font-medium whitespace-nowrap uppercase transition-colors duration-300 sm:px-6",
          s.box,
          s.label,
          variants[variant],
          !stretch && "sm:w-[320px] sm:flex-none",
        )}
      >
        {label}
      </span>
      <span
        className={cn(
          "grid aspect-square shrink-0 place-items-center rounded-btn transition-colors duration-300",
          s.box,
          variants[variant],
        )}
      >
        {icon ?? (
          <TArrowDownRight
            className={cn(
              s.icon,
              "transition-transform group-hover:translate-x-0.5 group-hover:translate-y-0.5",
            )}
          />
        )}
      </span>
    </>
  );
}

/** CTA o'rami: mobilda to'liq kenglik, kattaroq ekranda tarkib kengligi yoki to'liq (`fullWidth`) */
export function ctaRoot(fullWidth = false) {
  return cn("group flex cursor-pointer", fullWidth ? "w-full" : "w-full max-w-[480px] sm:w-auto");
}

/** Havola ko'rinishidagi CTA (masalan, "Xaritada ko'rish"). */
export function CtaLink({
  label,
  variant,
  size,
  icon,
  fullWidth,
  className,
  ...props
}: Omit<CtaPartsProps, "stretch"> & { fullWidth?: boolean } & Omit<
    ComponentProps<"a">,
    "children"
  >) {
  return (
    <a className={cn(ctaRoot(fullWidth), className)} {...props}>
      <CtaParts label={label} variant={variant} size={size} icon={icon} stretch={fullWidth} />
    </a>
  );
}
