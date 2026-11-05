import { Heading } from "@/components/ui/Heading";
import type { LeadSource } from "@/lib/lead";
import { cn } from "@/lib/cn";
import { LeadForm } from "./LeadForm";

type LeadCardProps = {
  title: string;
  text: string;
  source: LeadSource;
  className?: string;
};

/** Krem karta: sarlavha, izoh va forma (Figma 5 va 9-bloklar). */
export function LeadCard({ title, text, source, className }: LeadCardProps) {
  return (
    <div
      data-reveal
      className={cn(
        "flex flex-col items-center justify-center rounded-card bg-cream px-5 py-12 text-center text-navy sm:px-10",
        className,
      )}
    >
      <Heading className="max-w-[400px]">{title}</Heading>
      <p className="mt-6 max-w-[420px]">{text}</p>
      <LeadForm source={source} className="mt-9 w-full max-w-[400px]" />
    </div>
  );
}
