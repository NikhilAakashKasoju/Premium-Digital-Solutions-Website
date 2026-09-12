"use client";

import { motion, type Variants } from "framer-motion";
import { Bot, Cpu, Handshake, Layers, Target, Zap, type LucideIcon } from "lucide-react";

import { siteConfig, type Differentiator } from "@/config/site";
import { Container } from "@/components/layout/container";
import { Section } from "@/components/layout/section";
import { SectionHeading } from "@/components/layout/section-heading";

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

const container: Variants = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.1 } },
};

const card: Variants = {
  hidden: { opacity: 0, y: 20 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.5, ease: "easeOut" } },
};

export function WhyChooseUs() {
  return (
    <Section>
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
                variants={card}
                className="rounded-xl border border-brand-border bg-brand-secondary/60 p-6 transition-colors hover:border-brand-muted"
              >
                <span className="flex size-11 items-center justify-center rounded-lg bg-brand-accent/15 text-brand-accent-2">
                  <Icon className="size-5" aria-hidden />
                </span>

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
