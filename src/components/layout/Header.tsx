import Image from "next/image";
import { useTranslations } from "next-intl";
import { site } from "@/content/site";
import { navItems } from "@/content/nav";
import { Link } from "@/i18n/navigation";
import { PhoneIcon } from "@/components/ui/icons";
import { LocaleSwitch } from "./LocaleSwitch";
import { MobileMenu } from "./MobileMenu";
import logoMark from "../../../public/images/brand/logo-mark.webp";

const glass = "bg-black/20 backdrop-blur-glass";
const pill =
  "flex h-10 items-center rounded-pill bg-white/20 text-body text-white uppercase shadow-soft backdrop-blur-glass transition-colors hover:bg-white/30";

/**
 * Header (T1.5). Figma 1-blok: chapda oq "tab" ichida logo, o'ngda shaffof panel: menyu, til, telefon.
 * Bosh ekran kartasi ustida turadi, kartadan `--frame-inset` ichkarida.
 * 1280 px dan kichik ekranda menyu o'rniga burger va telefon tugmasi.
 */
export function Header() {
  const t = useTranslations("nav");

  return (
    <header
      id="top"
      data-hero="header"
      className="absolute inset-x-[var(--frame-inset)] top-[var(--frame-inset)] z-30 flex items-start pr-3 pl-[calc(var(--gutter)-var(--frame-inset))]"
    >
      {/* Logo tab: yuqori burchaklari ichkariga egilgan oq quloq */}
      <Link
        href="/"
        aria-label={`${site.name}: ${t("home")}`}
        className="relative shrink-0 rounded-b-[16px] bg-white px-2 pb-2 before:absolute before:top-0 before:-left-3 before:size-3 before:bg-[radial-gradient(circle_at_0_100%,transparent_11.5px,white_12px)] after:absolute after:top-0 after:-right-3 after:size-3 after:bg-[radial-gradient(circle_at_100%_100%,transparent_11.5px,white_12px)]"
      >
        <Image
          src={logoMark}
          alt=""
          preload
          sizes="120px"
          className="size-[clamp(72px,6.25vw,120px)] rounded-card"
        />
      </Link>

      {/* Desktop panel */}
      <div
        className={`mt-3 ml-[clamp(12px,1.15vw,22px)] hidden h-16 flex-1 items-center rounded-card pr-3 pl-6 xl:flex ${glass}`}
      >
        <nav aria-label={t("menu")}>
          <ul className="flex items-center gap-[clamp(24px,2.0833vw,40px)]">
            {navItems.map((item) => (
              <li key={item.key}>
                <a
                  href={item.href}
                  className="text-body whitespace-nowrap text-white transition-colors hover:text-gold"
                >
                  {t(item.key)}
                </a>
              </li>
            ))}
          </ul>
        </nav>
        <div className="ml-auto flex items-center gap-2">
          <LocaleSwitch className={`${pill} w-20 justify-center border border-[#999]`} />
          <a href={site.phones.main.href} className={`${pill} w-[200px] gap-2.5 px-4`}>
            <PhoneIcon className="size-6 text-gold-alt" />
            <span className="ml-auto whitespace-nowrap">{site.phones.main.display}</span>
          </a>
        </div>
      </div>

      {/* Mobil: telefon va burger */}
      <div className={`mt-3 ml-auto flex items-center gap-1 rounded-card p-1 xl:hidden ${glass}`}>
        <a
          href={site.phones.main.href}
          aria-label={site.phones.main.display}
          className="grid size-11 place-items-center rounded-card text-gold-alt"
        >
          <PhoneIcon className="size-6" />
        </a>
        <MobileMenu />
      </div>
    </header>
  );
}
