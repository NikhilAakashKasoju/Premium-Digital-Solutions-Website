import { Hero } from "@/components/sections/hero";
import { CapabilityStrip } from "@/components/sections/capability-strip";
import { WhatWeBuild } from "@/components/sections/what-we-build";
import { Configurator } from "@/components/sections/configurator";
import { Portfolio } from "@/components/sections/portfolio";
import { HowWeWork } from "@/components/sections/how-we-work";
import { WhyChooseUs } from "@/components/sections/why-choose-us";
import { Industries } from "@/components/sections/industries";
import { AiSection } from "@/components/sections/ai-section";
import { Technology } from "@/components/sections/technology";

export default function Home() {
  return (
    <>
      <Hero />
      <CapabilityStrip />
      <WhatWeBuild />
      <Configurator />
      <Portfolio />
      <HowWeWork />
      <WhyChooseUs />
      <Industries />
      <AiSection />
      <Technology />
    </>
  );
}
