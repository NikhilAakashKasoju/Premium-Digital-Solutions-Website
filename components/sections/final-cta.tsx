"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import { ArrowRight, CalendarClock } from "lucide-react";

import { cn } from "@/lib/utils";
import { buttonVariants } from "@/components/ui/button";
import { Container } from "@/components/layout/container";
import { Section } from "@/components/layout/section";

const heading = "Let's Build Something That Matters.";
const supporting =
  "Bring us your idea — we'll help you turn it into a website, application or system that actually moves your business forward.";

/**
 * Closing "Let's Build Something That Matters" band — the site's last
 * strong visual moment before the footer. Reuses the same soft accent
 * glow as the hero rather than introducing a new decorative treatment,
 * so it reads as a bookend, not a new visual idea this late in the page.
 */
export function FinalCta() {
  return (
    <Section>
      <Container>
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-80px" }}
          transition={{ duration: 0.6, ease: "easeOut" }}
          className="relative overflow-hidden rounded-2xl border border-brand-border bg-brand-secondary/60 px-6 py-16 text-center sm:px-12 sm:py-20"
        >
          <div
            aria-hidden
            className="pointer-events-none absolute -top-32 left-1/2 h-[28rem] w-[28rem] -translate-x-1/2 rounded-full bg-brand-accent/15 blur-3xl"
          />

          <div className="relative">
            <h2 className="mx-auto max-w-2xl text-h2 font-semibold text-balance text-brand-foreground lg:text-h1">
              {heading}
            </h2>

            <p className="mx-auto mt-5 max-w-xl text-lead text-brand-muted">{supporting}</p>

            <div className="mt-10 flex flex-wrap items-center justify-center gap-4">
              <Link href="#contact" className={cn(buttonVariants({ variant: "primary", size: "lg" }), "group")}>
                Start a Project
                <ArrowRight className="size-4 transition-transform group-hover:translate-x-0.5" aria-hidden />
              </Link>

              <Link
                href="/book-a-consultation"
                prefetch={false}
                className={cn(buttonVariants({ variant: "outline", size: "lg" }), "group")}
              >
                Book a Free Consultation
                <CalendarClock className="size-4" aria-hidden />
              </Link>
            </div>
          </div>
        </motion.div>
      </Container>
    </Section>
  );
}
