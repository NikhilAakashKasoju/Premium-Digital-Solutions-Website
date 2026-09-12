import { Hero } from "@/components/sections/hero";
import { CapabilityStrip } from "@/components/sections/capability-strip";
import { WhatWeBuild } from "@/components/sections/what-we-build";
import { Configurator } from "@/components/sections/configurator";

export default function Home() {
  return (
    <>
      <Hero />
      <CapabilityStrip />
      <WhatWeBuild />
      <Configurator />
    </>
  );
}
