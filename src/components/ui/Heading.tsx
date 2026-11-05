import type { ComponentProps } from "react";
import { cn } from "@/lib/cn";

const sizes = {
  /** Hero sarlavhasi: PP Right Gothic 40/60 */
  display: "text-display",
  /** Bo'lim sarlavhasi: 40/48 */
  h2: "text-h2",
  /** Kichik sarlavha, tugma: 25/29 */
  h3: "text-h3",
} as const;

type HeadingProps = ComponentProps<"h2"> & {
  as?: "h1" | "h2" | "h3" | "p";
  size?: keyof typeof sizes;
};

/** Figma'dagi barcha sarlavhalar: PP Right Gothic 500, katta harflar. */
export function Heading({ as: Tag = "h2", size = "h2", className, ...props }: HeadingProps) {
  return (
    <Tag className={cn("font-heading font-medium uppercase", sizes[size], className)} {...props} />
  );
}
