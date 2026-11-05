import Image from "next/image";
import { useTranslations } from "next-intl";
import { Container } from "@/components/ui/Container";
import { Heading } from "@/components/ui/Heading";
import wordmark from "../../../public/images/about/about-01.svg";
import photo from "../../../public/images/about/about-02.webp";

/**
 * "Loyiha haqida" (Figma 2-blok). Chapda oltin logotip, sarlavha va matn, o'ngda 1200x600 rasm.
 * Tepada romb bilan tugaydigan oltin chiziq. Pastida bo'limni ajratuvchi chiziq (Line 41).
 */
export function About() {
  const t = useTranslations("about");

  return (
    <section id="loyihahaqida" className="mt-section">
      <Container>
        <div className="grid gap-8 lg:grid-cols-[minmax(0,528fr)_minmax(0,1200fr)] lg:gap-x-0 lg:gap-y-[clamp(24px,2.0833vw,40px)]">
          <Image
            src={wordmark}
            alt="Avalon Residence"
            data-reveal
            className="h-auto w-[clamp(200px,20.2vw,388px)]"
          />
          {/* Romb va chiziq */}
          <div aria-hidden className="relative hidden items-center lg:flex">
            <span className="size-4 -translate-x-1/2 rotate-45 border border-gold" />
            <span data-draw className="h-px flex-1 -translate-x-2 bg-gold" />
          </div>

          <div className="flex flex-col justify-end lg:pr-10">
            <Heading data-reveal className="max-w-[340px] text-gold" size="display">
              {t("title")}
            </Heading>
            <p data-reveal className="mt-6 text-lead text-navy">
              {t("text")}
            </p>
          </div>
          <Image
            src={photo}
            alt=""
            sizes="(min-width: 1024px) 63vw, 100vw"
            quality={90}
            data-reveal="image"
            className="aspect-[2/1] w-full rounded-card object-cover"
          />
        </div>
        <hr data-draw className="mt-[clamp(48px,4.1667vw,80px)] border-gold" />
      </Container>
    </section>
  );
}
