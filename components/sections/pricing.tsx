"use client";

import Link from "next/link";
import { motion, type Variants } from "framer-motion";
import { Check } from "lucide-react";

import { siteConfig, type PricingPlan } from "@/config/site";
import { cardHoverGlowClass, cn } from "@/lib/utils";
import { fadeUpItem, staggerContainer } from "@/lib/motion";
import { buttonVariants } from "@/components/ui/button";
import { Container } from "@/components/layout/container";
import { Section } from "@/components/layout/section";
import { SectionHeading } from "@/components/layout/section-heading";

const container = staggerContainer(0.1);

const featureList: Variants = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.06, delayChildren: 0.15 } },
};

const featureItem: Variants = {
  hidden: { opacity: 0, x: -8 },
  visible: { opacity: 1, x: 0, transition: { duration: 0.3, ease: "easeOut" } },
};

/**
 * "Pricing" plan grid. Every figure comes from `siteConfig.pricing`
 * (config/site.ts) as a `startingPrice` — never a final quote hard-coded
 * here — and the Custom plan has none at all, so it only ever renders
 * "Custom pricing" instead of "Starting from …".
 */
export function Pricing() {
  return (
    <Section id="pricing">
      <Container>
        <SectionHeading
          title="Simple, Transparent Pricing"
          description="Choose the plan that fits where your business is today — every project starts with a scoping conversation, not a fixed quote."
        />

        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-80px" }}
          variants={container}
          className="mt-12 grid grid-cols-1 gap-6 lg:grid-cols-3 lg:gap-8"
        >
          {siteConfig.pricing.map((plan) => (
            <PricingCard key={plan.slug} plan={plan} />
          ))}
        </motion.div>
      </Container>
    </Section>
  );
}

function PricingCard({ plan }: { plan: PricingPlan }) {
  return (
    <motion.div
      variants={fadeUpItem}
      className={cn(
        "relative flex flex-col rounded-xl border p-6 lg:p-8",
        cardHoverGlowClass,
        plan.featured
          ? "border-brand-accent-2/50 bg-brand-secondary/80 shadow-[0_24px_60px_-32px_rgba(34,211,238,0.35)] hover:shadow-[0_28px_65px_-30px_rgba(34,211,238,0.45)]"
          : "border-brand-border bg-brand-secondary/60",
      )}
    >
      {plan.featured && (
        <span className="absolute -top-3 left-1/2 -translate-x-1/2 rounded-full bg-brand-accent-button px-3 py-1 text-[11px] font-semibold tracking-wide text-brand-foreground uppercase">
          Most Popular
        </span>
      )}

      <h3 className="text-h4 font-semibold text-brand-foreground">{plan.name}</h3>
      <p className="mt-2 text-sm text-brand-muted">{plan.tagline}</p>

      <div className="mt-6">
        <p className="text-h3 font-semibold text-brand-foreground">
          {plan.startingPrice ? `Starting from ${plan.startingPrice}` : "Custom pricing"}
        </p>
        <p className="mt-1 text-xs text-brand-muted">{plan.priceNote}</p>
      </div>

      <motion.ul
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, margin: "-40px" }}
        variants={featureList}
        className="mt-6 flex-1 space-y-2.5"
      >
        {plan.features.map((feature) => (
          <motion.li
            key={feature}
            variants={featureItem}
            className="flex items-start gap-2.5 text-sm text-brand-muted"
          >
            <Check className="mt-0.5 size-4 shrink-0 text-brand-accent-2" aria-hidden />
            <span>{feature}</span>
          </motion.li>
        ))}
      </motion.ul>

      <Link
        href={plan.cta.href}
        prefetch={false}
        className={cn(buttonVariants({ variant: plan.featured ? "primary" : "outline" }), "mt-8 w-full")}
      >
        {plan.cta.label}
      </Link>
    </motion.div>
  );
}
