"use client";

import { motion, type Variants } from "framer-motion";
import { Code2, PenTool, Rocket, Search, type LucideIcon } from "lucide-react";

import { siteConfig, type ProcessStage } from "@/config/site";
import { cn } from "@/lib/utils";
import { Container } from "@/components/layout/container";
import { Section } from "@/components/layout/section";
import { SectionHeading } from "@/components/layout/section-heading";

// Keyed by the exact icon-name union (not `string`) so this object only
// type-checks if every icon `ProcessStage` can name has an entry — no
// runtime fallback needed for a "missing icon" case that can't happen.
const stageIcons: Record<ProcessStage["icon"], LucideIcon> = {
  Search,
  PenTool,
  Code2,
  Rocket,
};

const container: Variants = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.15 } },
};

const stageItem: Variants = {
  hidden: { opacity: 0, y: 20 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.5, ease: "easeOut" } },
};

const lineDesktop: Variants = {
  hidden: { scaleX: 0 },
  visible: { scaleX: 1, transition: { duration: 0.9, ease: "easeInOut" } },
};

const lineMobile: Variants = {
  hidden: { scaleY: 0 },
  visible: { scaleY: 1, transition: { duration: 0.9, ease: "easeInOut" } },
};

/**
 * "From Idea to Impact" process timeline: a connected row of stage
 * nodes on wide screens, a connected vertical list below `lg` — two
 * deliberate compositions (matching HeroVisual's approach) rather than
 * one layout shrunk to fit both, since an absolutely-positioned
 * horizontal connector doesn't read well stacked narrow.
 */
export function HowWeWork() {
  return (
    <Section>
      <Container>
        <SectionHeading title="From Idea to Impact" description="Our process, from the first conversation to a live product." />

        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-80px" }}
          variants={container}
          className="relative mt-16"
        >
          {/* Desktop: horizontal row, connecting line behind the nodes. */}
          <div className="relative hidden lg:block">
            <motion.div
              variants={lineDesktop}
              style={{ transformOrigin: "left" }}
              aria-hidden
              className="absolute top-6 right-6 left-6 h-px bg-brand-border"
            />
            <div className="relative grid grid-cols-4 gap-8">
              {siteConfig.process.map((stage) => (
                <StageNode key={stage.number} stage={stage} />
              ))}
            </div>
          </div>

          {/* Below lg: vertical list, connecting line behind the nodes. */}
          <div className="relative lg:hidden">
            <motion.div
              variants={lineMobile}
              style={{ transformOrigin: "top" }}
              aria-hidden
              className="absolute top-6 bottom-6 left-6 w-px bg-brand-border"
            />
            <div className="relative flex flex-col gap-10">
              {siteConfig.process.map((stage) => (
                <StageNode key={stage.number} stage={stage} horizontal />
              ))}
            </div>
          </div>
        </motion.div>
      </Container>
    </Section>
  );
}

function StageNode({ stage, horizontal = false }: { stage: ProcessStage; horizontal?: boolean }) {
  const Icon = stageIcons[stage.icon];

  return (
    <motion.div
      variants={stageItem}
      className={cn("relative flex", horizontal ? "items-start gap-4" : "flex-col items-start")}
    >
      <span className="relative z-10 flex size-12 shrink-0 items-center justify-center rounded-full border border-brand-border bg-brand-secondary text-brand-accent-2">
        <Icon className="size-5" aria-hidden />
      </span>

      <div className={horizontal ? "pb-2" : "mt-4"}>
        <span className="text-sm font-semibold tracking-wide text-brand-accent-2">{stage.number}</span>
        <h3 className="mt-1 text-h4 font-semibold text-brand-foreground">{stage.title}</h3>
        <p className="mt-2 text-sm text-brand-muted">{stage.description}</p>
      </div>
    </motion.div>
  );
}
