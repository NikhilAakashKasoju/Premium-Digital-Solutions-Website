"use client";

import Link from "next/link";
import { motion, type Variants } from "framer-motion";
import { AppWindow, ArrowRight, Bot, Building2, Check, Globe, type LucideIcon } from "lucide-react";

import { siteConfig, type WhatWeBuildCard } from "@/config/site";
import { Container } from "@/components/layout/container";
import { Section } from "@/components/layout/section";
import { SectionHeading } from "@/components/layout/section-heading";

// Keyed by the exact icon-name union (not `string`) so this object only
// type-checks if every icon `WhatWeBuildCard` can name has an entry — no
// runtime fallback needed for a "missing icon" case that can't happen.
const cardIcons: Record<WhatWeBuildCard["icon"], LucideIcon> = {
  Globe,
  AppWindow,
  Building2,
  Bot,
};

const container: Variants = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.1 } },
};

const card: Variants = {
  hidden: { opacity: 0, y: 20 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.5, ease: "easeOut" } },
};

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
                variants={card}
                className="flex flex-col rounded-xl border border-brand-border bg-brand-secondary/60 p-6 transition-colors hover:border-brand-muted lg:p-8"
              >
                <span className="flex size-11 items-center justify-center rounded-lg bg-brand-accent/15 text-brand-accent-2">
                  <Icon className="size-5" aria-hidden />
                </span>

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

                <Link
                  href={item.cta.href}
                  prefetch={false}
                  className="group mt-6 inline-flex items-center gap-1.5 text-sm font-medium text-brand-accent-2 transition-opacity hover:opacity-80"
                >
                  {item.cta.label}
                  <ArrowRight className="size-4 transition-transform group-hover:translate-x-0.5" aria-hidden />
                </Link>
              </motion.article>
            );
          })}
        </motion.div>
      </Container>
    </Section>
  );
}
