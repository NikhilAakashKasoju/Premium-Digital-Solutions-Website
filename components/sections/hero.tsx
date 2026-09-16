"use client";

import Link from "next/link";
import { motion, type Variants } from "framer-motion";
import { ArrowRight, ArrowUpRight, CheckCircle2 } from "lucide-react";

import { siteConfig } from "@/config/site";
import { cn } from "@/lib/utils";
import { Container } from "@/components/layout/container";
import { Section } from "@/components/layout/section";
import { HeroVisual } from "@/components/sections/hero-visual";
import { buttonVariants } from "@/components/ui/button";

const container: Variants = {
  hidden: {},
  visible: {
    transition: { staggerChildren: 0.12, delayChildren: 0.05 },
  },
};

const item: Variants = {
  hidden: { opacity: 0, y: 16 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.5, ease: "easeOut" } },
};

export function Hero() {
  const { eyebrow, headline, supporting, primaryCta, secondaryCta, proofStat } = siteConfig.hero;

  return (
    <Section compact className="relative overflow-hidden lg:py-section">
      {/* Soft radial glow anchored behind the copy — a single quiet accent,
          not a decorative pattern repeated across the page. */}
      <div
        aria-hidden
        className="pointer-events-none absolute -top-40 left-1/2 h-[36rem] w-[36rem] -translate-x-1/2 rounded-full bg-brand-accent/10 blur-3xl"
      />

      <Container className="relative grid items-center gap-16 lg:grid-cols-2 lg:gap-12">
        <motion.div
          initial="hidden"
          animate="visible"
          variants={container}
          className="max-w-2xl"
        >
          <motion.p
            variants={item}
            className="text-sm font-medium tracking-wide text-brand-accent-2 uppercase"
          >
            {eyebrow}
          </motion.p>

          <motion.h1
            variants={item}
            className="mt-6 text-h1 font-semibold text-balance text-brand-foreground lg:text-display"
          >
            {headline}
          </motion.h1>

          <motion.p variants={item} className="mt-6 max-w-xl text-lead text-brand-muted">
            {supporting}
          </motion.p>

          <motion.div variants={item} className="mt-10 flex flex-wrap items-center gap-4">
            <Link
              href={primaryCta.href}
              prefetch={false}
              className={cn(buttonVariants({ variant: "primary" }), "group")}
            >
              {primaryCta.label}
              <ArrowRight className="size-4 transition-transform group-hover:translate-x-0.5" aria-hidden />
            </Link>

            <Link
              href={secondaryCta.href}
              prefetch={false}
              className={cn(buttonVariants({ variant: "outline" }), "group")}
            >
              {secondaryCta.label}
              <ArrowUpRight className="size-4 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" aria-hidden />
            </Link>
          </motion.div>

          {proofStat && (
            <motion.p
              variants={item}
              className="mt-6 flex items-center gap-2 text-sm text-brand-muted"
            >
              <CheckCircle2 className="size-4 shrink-0 text-brand-accent-2" aria-hidden />
              {proofStat}
            </motion.p>
          )}
        </motion.div>

        <div className="flex items-center justify-center lg:justify-end">
          <HeroVisual />
        </div>
      </Container>
    </Section>
  );
}
