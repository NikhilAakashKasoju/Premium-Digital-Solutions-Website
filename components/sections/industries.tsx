"use client";

import Link from "next/link";
import { motion, type Variants } from "framer-motion";
import {
  ArrowRight,
  Briefcase,
  Building2,
  GraduationCap,
  HeartPulse,
  MapPin,
  Rocket,
  ShoppingBag,
  Utensils,
  type LucideIcon,
} from "lucide-react";

import { siteConfig, type Industry } from "@/config/site";
import { Container } from "@/components/layout/container";
import { Section } from "@/components/layout/section";
import { SectionHeading } from "@/components/layout/section-heading";

// Keyed by the exact icon-name union (not `string`) so this object only
// type-checks if every icon `Industry` can name has an entry — no
// runtime fallback needed for a "missing icon" case that can't happen.
const industryIcons: Record<Industry["icon"], LucideIcon> = {
  GraduationCap,
  HeartPulse,
  Building2,
  Briefcase,
  ShoppingBag,
  Utensils,
  Rocket,
  MapPin,
};

const container: Variants = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.08 } },
};

const card: Variants = {
  hidden: { opacity: 0, y: 20 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.5, ease: "easeOut" } },
};

/**
 * "Built for Different Businesses" industry grid. Each card links to
 * `/industries/{slug}` — that page doesn't exist yet, but the slug and
 * link are real from day one so this doubles as the foundation for
 * dedicated, SEO-indexable industry landing pages later.
 */
export function Industries() {
  return (
    <Section>
      <Container>
        <SectionHeading
          title="Built for Different Businesses"
          description="Digital solutions shaped around how each industry actually works."
        />

        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-80px" }}
          variants={container}
          className="mt-12 grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4"
        >
          {siteConfig.industries.map((industry) => {
            const Icon = industryIcons[industry.icon];
            return (
              <motion.div
                key={industry.slug}
                variants={card}
                className="flex flex-col rounded-xl border border-brand-border bg-brand-secondary/60 p-6 transition-colors hover:border-brand-muted"
              >
                <span className="flex size-11 items-center justify-center rounded-lg bg-brand-accent/15 text-brand-accent-2">
                  <Icon className="size-5" aria-hidden />
                </span>

                <h3 className="mt-5 text-h4 font-semibold text-brand-foreground">{industry.title}</h3>
                <p className="mt-2 text-sm text-brand-muted">{industry.description}</p>

                <Link
                  href={`/industries/${industry.slug}`}
                  prefetch={false}
                  className="group mt-5 inline-flex items-center gap-1.5 text-sm font-medium text-brand-accent-2 transition-opacity hover:opacity-80"
                >
                  Explore {industry.title} solutions
                  <ArrowRight className="size-4 transition-transform group-hover:translate-x-0.5" aria-hidden />
                </Link>
              </motion.div>
            );
          })}
        </motion.div>
      </Container>
    </Section>
  );
}
