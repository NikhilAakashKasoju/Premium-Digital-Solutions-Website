"use client";

import { motion } from "framer-motion";
import { Bot, Cpu, Handshake, Layers, Target, Zap, type LucideIcon } from "lucide-react";

import { siteConfig, type Differentiator } from "@/config/site";
import { cardSurfaceClass, cn } from "@/lib/utils";
import { fadeUpItem, staggerContainer } from "@/lib/motion";
import { Container } from "@/components/layout/container";
import { Section } from "@/components/layout/section";
import { SectionHeading } from "@/components/layout/section-heading";
import { IconBadge } from "@/components/ui/icon-badge";

// Keyed by the exact icon-name union (not `string`) so this object only
// type-checks if every icon `Differentiator` can name has an entry — no
// runtime fallback needed for a "missing icon" case that can't happen.
const differentiatorIcons: Record<Differentiator["icon"], LucideIcon> = {
  Target,
  Cpu,
  Layers,
  Bot,
  Zap,
  Handshake,
};

const container = staggerContainer(0.1);

export function WhyChooseUs() {
  return (
    <Section id="about">
      <Container>
        <SectionHeading title="Why Choose Us" description="The practical reasons teams choose to build with us." />

        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-80px" }}
          variants={container}
          className="mt-12 grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3 lg:gap-8"
        >
          {siteConfig.whyUs.map((item) => {
            const Icon = differentiatorIcons[item.icon];
            return (
              <motion.div
                key={item.title}
                variants={fadeUpItem}
                className={cn(cardSurfaceClass, "p-6 transition-colors hover:border-brand-muted")}
              >
                <IconBadge icon={Icon} />

                <h3 className="mt-5 text-h4 font-semibold text-brand-foreground">{item.title}</h3>
                <p className="mt-2 text-sm text-brand-muted">{item.description}</p>
              </motion.div>
            );
          })}
        </motion.div>
      </Container>
    </Section>
  );
}
