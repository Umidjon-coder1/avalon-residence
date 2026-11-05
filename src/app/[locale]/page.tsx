import { About } from "@/components/sections/About";
import { Advantages } from "@/components/sections/Advantages";
import { Contacts } from "@/components/sections/Contacts";
import { Facade } from "@/components/sections/Facade";
import { Hero } from "@/components/sections/Hero";
import { LeadBlock } from "@/components/sections/LeadBlock";
import { Location } from "@/components/sections/Location";
import { Plans } from "@/components/sections/Plans";
import { Zones } from "@/components/sections/Zones";
import { PageMotion } from "@/components/motion/PageMotion";

/** Bosh sahifa: Figma Frame 485 tartibida (docs/FIGMA.md). */
export default function Home() {
  return (
    <main className="pb-section">
      <Hero />
      <About />
      <Advantages />
      <Location />
      <LeadBlock />
      <Zones />
      {/* 7 va 8-bloklar umumiy oltin fon ustida (Figma Rectangle 40188) */}
      <div className="mt-section bg-gold py-[clamp(48px,4.1667vw,80px)]">
        <Facade />
        <Plans />
      </div>
      <Contacts />
      <PageMotion />
    </main>
  );
}
