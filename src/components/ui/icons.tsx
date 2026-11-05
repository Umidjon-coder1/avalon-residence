import type { SVGProps } from "react";

/**
 * Inline SVG ikonkalar. Rang `currentColor` dan olinadi, o'lcham className orqali.
 * Tilda'da yo'q ikonkalar shu yerda; qolganlari Tilda'dan: `tilda-icons.tsx`.
 */
type IconProps = SVGProps<SVGSVGElement>;

const base = {
  xmlns: "http://www.w3.org/2000/svg",
  "aria-hidden": true,
  focusable: false,
} as const;

const stroke = {
  stroke: "currentColor",
  strokeWidth: 1.6,
  strokeLinecap: "round",
  strokeLinejoin: "round",
} as const;

export function CloseIcon(props: IconProps) {
  return (
    <svg {...base} viewBox="0 0 24 24" fill="none" {...props}>
      <path
        d="M5 5l14 14M19 5L5 19"
        stroke="currentColor"
        strokeWidth="1.8"
        strokeLinecap="round"
      />
    </svg>
  );
}

export function MenuIcon(props: IconProps) {
  return (
    <svg {...base} viewBox="0 0 24 24" fill="none" {...props}>
      <path
        d="M4 7h16M4 12h16M4 17h16"
        stroke="currentColor"
        strokeWidth="1.8"
        strokeLinecap="round"
      />
    </svg>
  );
}

export function ArrowLeftIcon(props: IconProps) {
  return (
    <svg {...base} viewBox="0 0 24 24" fill="none" {...props}>
      <path {...stroke} d="M19 12H5M11 6l-6 6 6 6" />
    </svg>
  );
}

export function ArrowRightIcon(props: IconProps) {
  return (
    <svg {...base} viewBox="0 0 24 24" fill="none" {...props}>
      <path {...stroke} d="M5 12h14M13 6l6 6-6 6" />
    </svg>
  );
}

/** Aloqa vidjeti tugmasi: suhbat pufagi */
export function ChatIcon(props: IconProps) {
  return (
    <svg {...base} viewBox="0 0 24 24" fill="none" {...props}>
      <path
        {...stroke}
        d="M4 5.5A1.5 1.5 0 0 1 5.5 4h13A1.5 1.5 0 0 1 20 5.5v9a1.5 1.5 0 0 1-1.5 1.5H10l-4.2 3.6c-.3.3-.8 0-.8-.4V16h0A1 1 0 0 1 4 15V5.5Z"
      />
      <path {...stroke} d="M8 9h8M8 12.5h5" />
    </svg>
  );
}
