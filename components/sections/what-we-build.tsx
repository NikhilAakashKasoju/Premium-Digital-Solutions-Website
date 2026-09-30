"use client";

import { motion, type Variants } from "framer-motion";
import { AppWindow, Bot, Building2, Check, Globe, type LucideIcon } from "lucide-react";

import { siteConfig, type PainPoint, type WhatWeBuildCard } from "@/config/site";
import { cardSurfaceClass, cn } from "@/lib/utils";
import { fadeUpItem, staggerContainer } from "@/lib/motion";
import { Container } from "@/components/layout/container";
import { Section } from "@/components/layout/section";
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

// Escalating severity, left border + dot only — the pain points share the
// section's dark card surface rather than introducing loud new colors, so
// "urgency" reads through a small, deliberate accent instead of a wash of
// unrelated hues.
const toneBorder: Record<PainPoint["tone"], string> = {
  neutral: "border-l-brand-border",
  warning: "border-l-amber-400/70",
  urgent: "border-l-red-400/70",
};

const toneDot: Record<PainPoint["tone"], string> = {
  neutral: "bg-brand-muted",
  warning: "bg-amber-400",
  urgent: "bg-red-400",
};

const container = staggerContainer(0.1);

// A quick, punchy spring (high stiffness, low damping) rather than a
// duration-based ease — that's what makes the settle read as a physical
// impact overshooting slightly before it rests, not a scripted animation.
const STAMP_SPRING = { type: "spring", stiffness: 450, damping: 14, mass: 0.6 } as const;

/**
 * "Stamp onto the screen": each bubble starts oversized and crooked, like
 * it's still being pressed down, then snaps to its true size and tilt in
 * one quick spring — landing with a little overshoot instead of drifting
 * up into place. `entryRotate` is the extra tilt it lands FROM, on top of
 * whatever static lean the bubble rests at (see PainPointBubbles below).
 */
function stampVariants(entryRotate: number): Variants {
  return {
    hidden: { opacity: 0, scale: 2.3, rotate: entryRotate },
    visible: { opacity: 1, scale: 1, rotate: 0, transition: STAMP_SPRING },
  };
}

/**
 * "What We Build" now opens with the problem before the pitch: the daily
 * friction a growing business actually runs into (escalating down the
 * pain-point list), a short "so we build you one system instead" pivot,
 * then the practice-area cards answering with specifics. Leading with the
 * pain is what makes the section land — a features list on its own has to
 * work harder for attention than "yes, that's my Tuesday" does.
 */
export function WhatWeBuild() {
  const problem = siteConfig.whatWeBuildProblem;
  const solution = siteConfig.whatWeBuildSolution;

  return (
    <Section id="services">
      <Container>
        <div className="grid grid-cols-1 gap-10 lg:grid-cols-2 lg:items-center lg:gap-16">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-80px" }}
            transition={{ duration: 0.5, ease: "easeOut" }}
          >
            <p className="text-sm font-medium tracking-wide text-brand-accent-2 uppercase">{problem.eyebrow}</p>
            <h2 className="mt-4 text-h2 font-bold text-balance text-brand-foreground">{problem.title}</h2>
            <p className="mt-4 max-w-xl text-lead text-brand-muted">{problem.description}</p>
          </motion.div>

          <PainPointBubbles points={problem.painPoints} />
        </div>

        {/* The pivot from problem to pitch — same soft accent glow used behind
            the hero copy and the closing CTA, so it reads as one of the
            site's few deliberate "moment" treatments, not a one-off. */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-80px" }}
          transition={{ duration: 0.5, ease: "easeOut", delay: 0.1 }}
          className="relative mx-auto mt-20 max-w-2xl text-center lg:mt-28"
        >
          <div
            aria-hidden
            className="pointer-events-none absolute -top-24 left-1/2 h-72 w-72 -translate-x-1/2 rounded-full bg-brand-accent/10 blur-3xl"
          />
          <p className="relative text-sm font-medium tracking-wide text-brand-accent-2 uppercase">{solution.eyebrow}</p>
          <h3 className="relative mt-4 text-h2 font-bold text-balance text-brand-foreground">{solution.title}</h3>
          <p className="relative mx-auto mt-4 max-w-xl text-lead text-brand-muted">{solution.description}</p>
        </motion.div>

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

/**
 * The escalating cascade of daily friction, staggered into a loose,
 * hand-placed-looking column (alternating side + a slight rotation on
 * `sm` and up) rather than a tidy list — closer to how these things
 * actually pile up than a bullet list would read. Each bubble "stamps"
 * onto the screen (see `stampVariants` above) rather than fading up.
 *
 * The static resting tilt (`sm:rotate-1`/`sm:-rotate-1`) lives on the
 * plain outer `<li>`, and the stamp animation (scale + its own rotate)
 * lives on the `motion.div` inside it — not both on one element. Framer
 * Motion writes the `transform` CSS property directly once it's
 * animating scale/rotate on a node, which would silently overwrite a
 * Tailwind rotate class sitting on that same element; nesting them keeps
 * the two transforms independent so the final tilt actually holds.
 */
function PainPointBubbles({ points }: { points: readonly PainPoint[] }) {
  return (
    <motion.ul
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, margin: "-60px" }}
      variants={staggerContainer(0.12)}
      className="flex flex-col gap-3"
    >
      {points.map((point, i) => {
        const reversed = i % 2 === 1;
        return (
          <li key={point.label} className={cn("max-w-sm", reversed ? "sm:self-end sm:rotate-1" : "sm:self-start sm:-rotate-1")}>
            <motion.div
              variants={stampVariants(reversed ? 9 : -9)}
              className={cn(
                "rounded-xl border-l-4 bg-brand-secondary/60 px-4 py-3 text-sm text-brand-foreground shadow-[0_10px_24px_-16px_rgba(0,0,0,0.7)]",
                toneBorder[point.tone],
                point.tone === "urgent" && "font-medium",
              )}
            >
              <span className={cn("mr-2 inline-block size-1.5 rounded-full align-middle", toneDot[point.tone])} aria-hidden />
              {point.label}
            </motion.div>
          </li>
        );
      })}
    </motion.ul>
  );
}
