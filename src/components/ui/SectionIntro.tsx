import type { ReactNode } from "react";
import { cn } from "@/lib/cn";
import { Heading } from "./Heading";

type SectionIntroProps = {
  title: ReactNode;
  text?: ReactNode;
  /** "gold": oq fonda oltin sarlavha va chiziq; "light": oltin fonda oq sarlavha, krem chiziq */
  tone?: "gold" | "light";
  as?: "h2" | "h3";
  className?: string;
  children?: ReactNode;
};

/** Bo'lim boshi: sarlavha, ingichka chiziq, matn (Figma 4, 6, 7-bloklar). */
export function SectionIntro({
  title,
  text,
  tone = "gold",
  as = "h2",
  className,
  children,
}: SectionIntroProps) {
  return (
    <div className={className}>
      <Heading as={as} data-reveal className={tone === "gold" ? "text-gold" : "text-white"}>
        {title}
      </Heading>
      <span
        aria-hidden
        data-draw
        className={cn("mt-4 block h-px", tone === "gold" ? "bg-gold" : "bg-cream")}
      />
      {text ? (
        <p
          data-reveal
          className={cn("mt-6 text-lead", tone === "gold" ? "text-navy" : "text-white")}
        >
          {text}
        </p>
      ) : null}
      {children ? <div data-reveal>{children}</div> : null}
    </div>
  );
}
