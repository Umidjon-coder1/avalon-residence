import type { ComponentProps } from "react";
import { cn } from "@/lib/cn";

/**
 * Bo'lim o'rami. `id` Tilda anchor'lari bilan bir xil (#loyihahaqida, #joylashuv ...),
 * shunda eski reklama va menyu havolalari ishlashda davom etadi.
 */
export function Section({ className, ...props }: ComponentProps<"section">) {
  return <section className={cn("relative", className)} {...props} />;
}
