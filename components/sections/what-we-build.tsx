"use client";

import { motion } from "framer-motion";
import { AppWindow, Bot, Building2, Check, Globe, type LucideIcon } from "lucide-react";

import { siteConfig, type WhatWeBuildCard } from "@/config/site";
import { cardSurfaceClass, cn } from "@/lib/utils";
import { fadeUpItem, staggerContainer } from "@/lib/motion";
import { Container } from "@/components/layout/container";
import { Section } from "@/components/layout/section";
import { SectionHeading } from "@/components/layout/section-heading";
import { ArrowLink } from "@/components/ui/arrow-link";
import { IconBadge } from "@/components/ui/icon-badge";

// Keyed by the exact icon-name union (not `string`) so this object only
// type-checks if every icon `WhatWeBuildCard` can name has an entry — no
// runtime fallback needed for a "missing icon" case that can't happen.
const cardIcons: Record<WhatWeBuildCard["icon"], LucideIcon> = {
  Globe,
  AppWindow,
  Building2,
  Bot,
};

const container = staggerContainer(0.1);

export function WhatWeBuild() {
  return (
    <Section id="services">
      <Container>
        <SectionHeading
          title="What We Build"
          description="From your first idea to a production-ready digital platform."
        />

        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-80px" }}
          variants={container}
          className="mt-12 grid grid-cols-1 gap-6 md:grid-cols-2 lg:gap-8"
        >
          {siteConfig.whatWeBuild.map((item) => {
            const Icon = cardIcons[item.icon];
            return (
              <motion.article
                key={item.slug}
                variants={fadeUpItem}
                className={cn(cardSurfaceClass, "flex flex-col p-6 transition-colors hover:border-brand-muted lg:p-8")}
              >
                <IconBadge icon={Icon} />

                <h3 className="mt-5 text-h4 font-semibold text-brand-foreground">{item.title}</h3>
                <p className="mt-2 text-sm text-brand-muted">{item.description}</p>

                <ul className="mt-5 space-y-2.5">
                  {item.capabilities.map((capability) => (
                    <li key={capability} className="flex items-start gap-2.5 text-sm text-brand-muted">
                      <Check className="mt-0.5 size-4 shrink-0 text-brand-accent-2" aria-hidden />
                      <span>{capability}</span>
                    </li>
                  ))}
                </ul>

                <ArrowLink href={item.cta.href} className="mt-6">
                  {item.cta.label}
                </ArrowLink>
              </motion.article>
            );
          })}
        </motion.div>
      </Container>
    </Section>
  );
}
