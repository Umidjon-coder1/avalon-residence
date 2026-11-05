import { Fragment } from "react";
import { useTranslations } from "next-intl";
import { Container } from "@/components/ui/Container";
import { Heading } from "@/components/ui/Heading";
import { PlanSlider } from "./PlanSlider";

/** "Oila uchun yaratilgan rejalar" (Figma 8-blok). Oltin fon ustida, sarlavha markazda. */
export function Plans() {
  const t = useTranslations("plans");
  const badges = t.raw("badges") as string[];

  return (
    <section id="rejalar" className="mt-[clamp(48px,4.1667vw,80px)] text-white">
      <Container className="text-center">
        <Heading size="display" className="mx-auto max-w-[560px]">
          {t("title")}
        </Heading>
        <p className="mt-6 flex flex-wrap items-center justify-center gap-x-4 gap-y-2 text-lead leading-tight font-medium uppercase">
          {badges.map((badge, i) => (
            <Fragment key={badge}>
              {i > 0 ? <span aria-hidden className="size-4 rotate-45 bg-white" /> : null}
              <span>{badge}</span>
            </Fragment>
          ))}
        </p>
      </Container>
      <div className="mx-auto mt-10 max-w-[1920px]">
        <PlanSlider />
      </div>
    </section>
  );
}
