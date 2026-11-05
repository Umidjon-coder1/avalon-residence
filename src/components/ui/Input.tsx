import type { ComponentProps, ReactNode } from "react";
import { cn } from "@/lib/cn";

type InputProps = ComponentProps<"input"> & {
  /** Ko'rinmaydigan, lekin ekran o'quvchi uchun yorliq */
  label: string;
  error?: string;
  /** Matn oldidan qo'shimcha, masalan "+998" */
  addon?: ReactNode;
};

/** Forma maydoni: oq fon, radius 10, balandlik 50 (Figma 5-blok). */
export function Input({ label, error, addon, id, className, ...props }: InputProps) {
  const errorId = error ? `${id}-error` : undefined;
  return (
    <div className={cn("w-full", className)}>
      <label htmlFor={id} className="sr-only">
        {label}
      </label>
      <div
        className={cn(
          "flex h-[clamp(48px,2.6042vw,50px)] items-center gap-2 rounded-card border bg-white px-5 transition-colors",
          "focus-within:border-gold",
          error ? "border-red-600" : "border-transparent",
        )}
      >
        {addon ? <span className="shrink-0 text-[15px] text-black">{addon}</span> : null}
        <input
          id={id}
          aria-invalid={error ? true : undefined}
          aria-describedby={errorId}
          className="h-full w-full min-w-0 bg-transparent text-[15px] text-black outline-none placeholder:text-black/50"
          {...props}
        />
      </div>
      {error ? (
        <p id={errorId} className="mt-1.5 text-left text-caption text-red-700">
          {error}
        </p>
      ) : null}
    </div>
  );
}
