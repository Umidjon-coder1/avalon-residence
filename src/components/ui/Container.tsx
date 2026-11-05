import type { ComponentProps } from "react";
import { cn } from "@/lib/cn";

/** Sahifa konteyneri: 1920 px gacha, yon tomonda `--gutter` (1920 px da 96 px). */
export function Container({ className, ...props }: ComponentProps<"div">) {
  return <div className={cn("container-page", className)} {...props} />;
}
