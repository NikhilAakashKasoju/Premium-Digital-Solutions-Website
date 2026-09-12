"use client";

import { motion } from "framer-motion";
import {
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
import { cardSurfaceClass, cn } from "@/lib/utils";
import { fadeUpItem, staggerContainer } from "@/lib/motion";
import { Container } from "@/components/layout/container";
import { Section } from "@/components/layout/section";
import { SectionHeading } from "@/components/layout/section-heading";
import { ArrowLink } from "@/components/ui/arrow-link";
import { IconBadge } from "@/components/ui/icon-badge";

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

const container = staggerContainer(0.08);

/**
 * "Built for Different Businesses" industry grid. Each card links to
 * `/industries/{slug}` — that page doesn't exist yet, but the slug and
 * link are real from day one so this doubles as the foundation for
 * dedicated, SEO-indexable industry landing pages later.
 */
export function Industries() {
  return (
    <Section id="industries">
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
                variants={fadeUpItem}
                className={cn(cardSurfaceClass, "flex flex-col p-6 transition-colors hover:border-brand-muted")}
              >
                <IconBadge icon={Icon} />

                <h3 className="mt-5 text-h4 font-semibold text-brand-foreground">{industry.title}</h3>
                <p className="mt-2 text-sm text-brand-muted">{industry.description}</p>

                <ArrowLink href={`/industries/${industry.slug}`} className="mt-5">
                  Explore {industry.title} solutions
                </ArrowLink>
              </motion.div>
            );
          })}
        </motion.div>
      </Container>
    </Section>
  );
}
