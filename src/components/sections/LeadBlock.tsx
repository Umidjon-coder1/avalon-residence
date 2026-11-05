import Image from "next/image";
import { useTranslations } from "next-intl";
import { LeadCard } from "@/components/lead/LeadCard";
import { Container } from "@/components/ui/Container";
import { PeopleIcon, SchoolIcon, SeesawIcon, ShieldCheckIcon } from "@/components/ui/icons";
import photo from "../../../public/images/lead/lead-01.webp";

/** `lead.perks` tartibi bilan bir xil */
const perkIcons = [SchoolIcon, PeopleIcon, SeesawIcon, ShieldCheckIcon];

/**
 * "Xonadon tanlashda yordam beramiz" (Figma 5-blok).
 * Chapda forma kartasi va 4 ta qulaylik (oltin, xoch shaklidagi ajratgich), o'ngda 1100x800 rasm.
 */
export function LeadBlock() {
  const t = useTranslations("lead");
  const perks = t.raw("perks") as string[];

  return (
    <section className="mt-section">
      <Container>
        <div className="grid gap-6 lg:grid-cols-[minmax(0,600fr)_minmax(0,1100fr)] lg:gap-7">
          <div className="flex flex-col gap-6">
            <LeadCard title={t("title")} text={t("text")} source="lead" className="flex-1" />
            <ul className="relative grid grid-cols-2 rounded-card bg-gold px-[clamp(16px,2.0833vw,40px)] py-[clamp(20px,1.8vw,35px)] text-cream">
              {/* Xoch shaklidagi ajratgich */}
              <span aria-hidden className="absolute inset-y-10 left-1/2 w-px bg-white" />
              <span
                aria-hidden
                className="absolute top-1/2 right-[clamp(16px,2.0833vw,40px)] left-[clamp(16px,2.0833vw,40px)] h-px bg-white"
              />
              {perks.map((perk, i) => {
                const Icon = perkIcons[i] ?? SchoolIcon;
                return (
                  <li
                    key={perk}
                    className="flex flex-col items-center gap-2 px-3 py-3 text-center text-body leading-tight font-medium"
                  >
                    <Icon className="size-10" />
                    <span className="max-w-[180px]">{perk}</span>
                  </li>
                );
              })}
            </ul>
          </div>
          <Image
            src={photo}
            alt=""
            sizes="(min-width: 1024px) 57vw, 100vw"
            className="aspect-[1100/800] h-full w-full rounded-card object-cover"
          />
        </div>
      </Container>
    </section>
  );
}
