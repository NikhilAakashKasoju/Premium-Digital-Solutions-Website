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

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-80px" }}
          transition={{ duration: 0.5, ease: "easeOut" }}
          className={cn(cardSurfaceClass, "mt-6 flex flex-col items-start gap-5 p-6 sm:flex-row sm:items-center lg:mt-8")}
        >
          <span
            aria-hidden
            className="flex size-16 shrink-0 items-center justify-center rounded-full bg-brand-accent/15 text-lg font-semibold text-brand-accent-2"
          >
            {siteConfig.founder.name
              .split(" ")
              .map((part) => part[0])
              .slice(0, 2)
              .join("")}
          </span>

          <div>
            <p className="text-sm font-semibold text-brand-foreground">
              {siteConfig.founder.name}
              <span className="ml-2 font-normal text-brand-muted">— {siteConfig.founder.role}</span>
            </p>
            <p className="mt-1.5 text-sm text-brand-muted">{siteConfig.founder.bio}</p>
          </div>
        </motion.div>
      </Container>
    </Section>
  );
}
