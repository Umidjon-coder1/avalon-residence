import { useTranslations } from "next-intl";
import { site } from "@/content/site";
import { LeadCard } from "@/components/lead/LeadCard";
import { Container } from "@/components/ui/Container";
import { TPhoneSolid, TPin } from "@/components/ui/tilda-icons";
import { PremiumMap } from "@/components/ui/PremiumMap";

const circle = "grid size-10 place-items-center rounded-full border border-white";

/**
 * Aloqa (Figma 9-blok). Chapda forma kartasi va manzil/telefon, o'ngda kulrang Yandex xarita: brend belgisi, "Qanday borish" va "Xaritada ochish" (`PremiumMap`).
 * Xarita faqat ekranga yaqinlashganda yuklanadi.
 */
export function Contacts() {
  const t = useTranslations("lead");
  const tc = useTranslations("contacts");

  return (
    <section id="aloqa" className="mt-section">
      <Container>
        <div className="grid gap-6 lg:grid-cols-[minmax(0,560fr)_minmax(0,1144fr)]">
          <div className="flex flex-col gap-6">
            <LeadCard
              title={t("contactTitle")}
              text={t("contactText")}
              source="contacts"
              className="flex-1"
            />
            <div
              data-reveal
              className="relative grid grid-cols-2 rounded-card bg-gold py-9 text-center text-body leading-tight font-medium text-cream"
            >
              <span aria-hidden className="absolute inset-y-10 left-1/2 w-px bg-cream" />
              <a
                href={site.map.yandex}
                target="_blank"
                rel="noopener"
                className="flex flex-col items-center gap-2 px-4 hover:text-white"
              >
                <span className={circle}>
                  <TPin className="size-5" />
                </span>
                <span className="max-w-[180px]">{tc("address")}</span>
              </a>
              <a
                href={site.phones.main.href}
                className="flex flex-col items-center gap-2 px-4 hover:text-white"
              >
                <span className={circle}>
                  <TPhoneSolid className="size-5" />
                </span>
                <span>{site.phones.main.display}</span>
              </a>
            </div>
          </div>
          <div data-reveal className="sm:aspect-[4/3] lg:aspect-auto lg:h-full lg:min-h-[600px]">
            <PremiumMap className="size-full" />
          </div>
        </div>
      </Container>
    </section>
  );
}
