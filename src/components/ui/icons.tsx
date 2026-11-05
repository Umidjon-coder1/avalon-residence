import type { SVGProps } from "react";

/**
 * Inline SVG ikonkalar. Rang `currentColor` dan olinadi, o'lcham className orqali.
 * Figma'dagi svgrepo ikonkalariga o'xshash qilib chizilgan.
 */
type IconProps = SVGProps<SVGSVGElement>;

const base = {
  xmlns: "http://www.w3.org/2000/svg",
  "aria-hidden": true,
  focusable: false,
} as const;

export function PhoneIcon(props: IconProps) {
  return (
    <svg {...base} viewBox="0 0 24 24" fill="none" {...props}>
      <path
        fill="currentColor"
        d="M15.6 21.2c-1.5-.1-3.4-.7-5.6-2.4a22 22 0 0 1-4.8-4.8C3.5 11.8 2.9 9.9 2.8 8.4c-.1-1.2.3-2.3 1-3l1.1-1.2a2 2 0 0 1 3 .2l1.6 2.2c.6.8.5 1.9-.2 2.6l-.4.5c-.2.2-.3.6-.1.9.4.7 1 1.6 2 2.6s1.9 1.6 2.6 2c.3.2.7.1.9-.1l.5-.4c.7-.7 1.8-.8 2.6-.2l2.2 1.6a2 2 0 0 1 .2 3l-1.2 1.1c-.7.7-1.8 1.1-3 1Z"
      />
      <path
        stroke="currentColor"
        strokeWidth="1.6"
        strokeLinecap="round"
        d="M14 3.5a7 7 0 0 1 6.5 6.5M13.6 7a3.5 3.5 0 0 1 3.4 3.4"
      />
    </svg>
  );
}

export function InstagramIcon(props: IconProps) {
  return (
    <svg {...base} viewBox="0 0 24 24" fill="none" {...props}>
      <rect x="4" y="4" width="16" height="16" rx="4.5" stroke="currentColor" strokeWidth="1.8" />
      <circle cx="12" cy="12" r="3.6" stroke="currentColor" strokeWidth="1.8" />
      <circle cx="16.6" cy="7.4" r="1.1" fill="currentColor" />
    </svg>
  );
}

export function TelegramIcon(props: IconProps) {
  return (
    <svg {...base} viewBox="0 0 24 24" fill="none" {...props}>
      <path
        fill="currentColor"
        d="M20.7 4.3 2.9 11.2c-1.2.5-1.2 1.2-.2 1.5l4.6 1.4 1.7 5.4c.2.6.4.8.8.8.4 0 .6-.2.9-.5l2.2-2.2 4.7 3.5c.9.5 1.5.2 1.7-.8L22.4 6c.3-1.3-.5-1.9-1.7-1.7ZM9 14l9.2-5.8c.4-.3.8-.1.5.2l-7.5 6.8-.3 3.3L9 14Z"
      />
    </svg>
  );
}

export function ArrowDownRightIcon(props: IconProps) {
  return (
    <svg {...base} viewBox="0 0 24 24" fill="none" {...props}>
      <path
        d="M6 6l12 12M9 18h9V9"
        stroke="currentColor"
        strokeWidth="1.8"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}

export function ArrowUpIcon(props: IconProps) {
  return (
    <svg {...base} viewBox="0 0 24 24" fill="none" {...props}>
      <path
        d="M12 20V4M5 11l7-7 7 7"
        stroke="currentColor"
        strokeWidth="1.4"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}

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

export function HomeIcon(props: IconProps) {
  return (
    <svg {...base} viewBox="0 0 24 24" fill="none" {...props}>
      <path
        fill="currentColor"
        d="M12 3.2 2.5 10.6l1.1 1.4 1.4-1.1V20h5v-5.5h4V20h5v-9.1l1.4 1.1 1.1-1.4L12 3.2Zm4.3 2.1V4h2.2v3.1l-2.2-1.8Z"
      />
    </svg>
  );
}

export function ParkingIcon(props: IconProps) {
  return (
    <svg {...base} viewBox="0 0 24 24" fill="none" {...props}>
      <rect x="2" y="2" width="20" height="20" rx="3" fill="currentColor" />
      <path
        fill="#fff"
        d="M8.5 6.5H13a3.6 3.6 0 0 1 0 7.2h-2.3v3.8H8.5v-11Zm2.2 2v3.2H13a1.6 1.6 0 0 0 0-3.2h-2.3Z"
      />
    </svg>
  );
}

const stroke = {
  stroke: "currentColor",
  strokeWidth: 1.6,
  strokeLinecap: "round",
  strokeLinejoin: "round",
} as const;

export function LocationPinIcon(props: IconProps) {
  return (
    <svg {...base} viewBox="0 0 24 24" fill="none" {...props}>
      <path {...stroke} d="M12 21s-6.5-5.6-6.5-11a6.5 6.5 0 0 1 13 0c0 5.4-6.5 11-6.5 11Z" />
      <circle {...stroke} cx="12" cy="10" r="2.4" />
    </svg>
  );
}

export function FaceIdIcon(props: IconProps) {
  return (
    <svg {...base} viewBox="0 0 24 24" fill="none" {...props}>
      <path
        {...stroke}
        d="M3 8V5.5A2.5 2.5 0 0 1 5.5 3H8M16 3h2.5A2.5 2.5 0 0 1 21 5.5V8M21 16v2.5a2.5 2.5 0 0 1-2.5 2.5H16M8 21H5.5A2.5 2.5 0 0 1 3 18.5V16M8.5 9v1.5M15.5 9v1.5M12 9v4h-1M8.8 15.6a4.6 4.6 0 0 0 6.4 0"
      />
    </svg>
  );
}

export function CarParkIcon(props: IconProps) {
  return (
    <svg {...base} viewBox="0 0 24 24" fill="none" {...props}>
      <path
        {...stroke}
        d="M2 17v-3.5l1.6-4A2 2 0 0 1 5.5 8.2h6a2 2 0 0 1 1.9 1.3l1.6 4V17zM2 17v2h2.5v-2M12.5 17v2H15v-2M2 13.5h13M5 15h.01M12 15h.01M18.5 21V10"
      />
      <rect {...stroke} x="16" y="3" width="6" height="7" rx="1" />
      <path {...stroke} d="M18.2 8.2V4.8h1a1.2 1.2 0 0 1 0 2.4h-1" />
    </svg>
  );
}

export function CinemaIcon(props: IconProps) {
  return (
    <svg {...base} viewBox="0 0 24 24" fill="none" {...props}>
      <circle {...stroke} cx="6.5" cy="6" r="2.8" />
      <circle {...stroke} cx="13" cy="6" r="2.8" />
      <rect {...stroke} x="3" y="10" width="13" height="9" rx="1.5" />
      <path {...stroke} d="M16 13.5 21 11v7l-5-2.5" />
    </svg>
  );
}

export function QuakeHouseIcon(props: IconProps) {
  return (
    <svg {...base} viewBox="0 0 24 24" fill="none" {...props}>
      <path {...stroke} d="M3 11.5 12 3l9 8.5M5.5 9.5V21h13V9.5" />
      <path {...stroke} d="m12.5 7-2 4 3 2-2 3.5 1 2.5" />
    </svg>
  );
}

export function SchoolIcon(props: IconProps) {
  return (
    <svg {...base} viewBox="0 0 24 24" fill="none" {...props}>
      <path fill="currentColor" d="M12 4 1 9.5 12 15l9-4.5V16h2V9.5L12 4Z" />
      <path
        fill="currentColor"
        d="M5.5 13.3V17c0 1.7 2.9 3 6.5 3s6.5-1.3 6.5-3v-3.7L12 16.5l-6.5-3.2Z"
      />
    </svg>
  );
}

export function PeopleIcon(props: IconProps) {
  return (
    <svg {...base} viewBox="0 0 24 24" fill="none" {...props}>
      <g fill="currentColor">
        <circle cx="12" cy="5" r="2.5" />
        <circle cx="5" cy="9" r="2.2" />
        <circle cx="19" cy="9" r="2.2" />
        <circle cx="8" cy="16.5" r="2.2" />
        <circle cx="16" cy="16.5" r="2.2" />
        <circle cx="12" cy="12" r="1.8" />
      </g>
    </svg>
  );
}

export function SeesawIcon(props: IconProps) {
  return (
    <svg {...base} viewBox="0 0 24 24" fill="none" {...props}>
      <g fill="currentColor">
        <circle cx="5" cy="5.5" r="2" />
        <circle cx="19" cy="8.5" r="2" />
        <path d="M2 13.2 22 9.8l.3 1.8-20 3.4-.3-1.8ZM11 13.5h2l1.5 6h-5l1.5-6ZM3.5 8.5h3V12h-3zM17.5 11.2h3v1.6h-3z" />
      </g>
    </svg>
  );
}

export function ShieldCheckIcon(props: IconProps) {
  return (
    <svg {...base} viewBox="0 0 24 24" fill="none" {...props}>
      <path
        fill="currentColor"
        fillRule="evenodd"
        d="M12 2 4 5v6c0 5 3.4 9.4 8 11 4.6-1.6 8-6 8-11V5l-8-3Zm-1.2 13.4 5.6-5.6-1.4-1.4-4.2 4.2-2-2-1.4 1.4 3.4 3.4Z"
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
