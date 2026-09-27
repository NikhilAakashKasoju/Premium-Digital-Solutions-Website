"use client";

import { motion } from "framer-motion";
import { Check, Code2, PenTool, Rocket, Search, type LucideIcon } from "lucide-react";

import { siteConfig, type ProcessStage } from "@/config/site";
import { cardHoverGlowClass, cardSurfaceClass, cn } from "@/lib/utils";
import { fadeUpItem, staggerContainer } from "@/lib/motion";
import { Container } from "@/components/layout/container";
import { Section } from "@/components/layout/section";
import { SectionHeading } from "@/components/layout/section-heading";
import { IconBadge } from "@/components/ui/icon-badge";
import { AnimatedBarChart } from "@/components/ui/animated-bar-chart";

// Keyed by the exact icon-name union (not `string`) so this object only
// type-checks if every icon `ProcessStage` can name has an entry — no
// runtime fallback needed for a "missing icon" case that can't happen.
const stageIcons: Record<ProcessStage["icon"], LucideIcon> = {
  Search,
  PenTool,
  Code2,
  Rocket,
};

/**
 * "From Idea to Impact" process showcase: a zigzagging, case-study-style
 * row per stage (a hand-animated mini "scene" paired with the copy),
 * alternating sides down the page, rather than four icons compressed
 * into one flat row. Each stage's scene is a small Framer Motion sketch
 * of what actually happens in it — points of research appearing on a
 * radar (Discover), a wireframe assembling itself (Design), lines of
 * code typing in (Build), a chart climbing (Launch & Grow) — so the
 * section reads as something happening, not a static diagram.
 */
export function HowWeWork() {
  return (
    <Section>
      <Container>
        <SectionHeading title="From Idea to Impact" description="Our process, from the first conversation to a live product." />

        <div className="mt-16 flex flex-col gap-20 lg:gap-28">
          {siteConfig.process.map((stage, i) => (
            <StageRow key={stage.number} stage={stage} reversed={i % 2 === 1} isFirst={i === 0} />
          ))}
        </div>
      </Container>
    </Section>
  );
}

function StageRow({ stage, reversed, isFirst }: { stage: ProcessStage; reversed: boolean; isFirst: boolean }) {
  const visual = <StageVisual stage={stage} />;
  const text = <StageText stage={stage} />;

  return (
    <motion.div
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, margin: "-100px" }}
      variants={staggerContainer(0.15)}
      className={cn(
        "grid grid-cols-1 items-center gap-10 lg:grid-cols-2 lg:gap-16",
        !isFirst && "border-t border-brand-border pt-16 lg:pt-20",
      )}
    >
      {reversed ? (
        <>
          <div className="lg:order-2">{visual}</div>
          <div className="lg:order-1">{text}</div>
        </>
      ) : (
        <>
          {visual}
          {text}
        </>
      )}
    </motion.div>
  );
}

function StageText({ stage }: { stage: ProcessStage }) {
  const Icon = stageIcons[stage.icon];

  return (
    <motion.div variants={fadeUpItem} className="relative">
      <span
        aria-hidden
        className="pointer-events-none absolute -top-10 left-0 -z-10 select-none text-[6rem] leading-none font-bold text-brand-border/50 sm:text-[7.5rem]"
      >
        {stage.number}
      </span>

      <div className="relative">
        <IconBadge icon={Icon} />
        <h3 className="mt-5 text-h3 font-semibold text-brand-foreground">{stage.title}</h3>
        <p className="mt-3 max-w-md text-lead text-brand-muted">{stage.description}</p>

        <ul className="mt-6 space-y-3">
          {stage.highlights.map((highlight) => (
            <li key={highlight} className="flex items-center gap-2.5 text-sm text-brand-foreground">
              <Check className="size-4 shrink-0 text-brand-accent-2" aria-hidden />
              {highlight}
            </li>
          ))}
        </ul>
      </div>
    </motion.div>
  );
}

function StageVisual({ stage }: { stage: ProcessStage }) {
  return (
    <motion.div
      variants={fadeUpItem}
      className={cn(cardSurfaceClass, cardHoverGlowClass, "overflow-hidden p-6 sm:p-8")}
    >
      <StageScene icon={stage.icon} />
    </motion.div>
  );
}

/** Picks the small animated "scene" that matches each stage's icon. */
function StageScene({ icon }: { icon: ProcessStage["icon"] }) {
  switch (icon) {
    case "Search":
      return <DiscoverScene />;
    case "PenTool":
      return <DesignScene />;
    case "Code2":
      return <BuildScene />;
    case "Rocket":
      return <LaunchScene />;
    default:
      return null;
  }
}

const DISCOVER_DOTS = [
  { x: 14, y: 22 },
  { x: 70, y: 12 },
  { x: 84, y: 62 },
  { x: 30, y: 78 },
  { x: 60, y: 82 },
  { x: 10, y: 58 },
] as const;

/** Discover: data points appearing around a pulsing "scanning" ring. */
function DiscoverScene() {
  return (
    <div className="relative h-48 w-full sm:h-56">
      {DISCOVER_DOTS.map((dot, i) => (
        <motion.span
          key={i}
          initial={{ opacity: 0, scale: 0.4 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true, margin: "-40px" }}
          transition={{ duration: 0.4, delay: 0.3 + i * 0.12, ease: "easeOut" }}
          className="absolute size-2.5 rounded-full bg-brand-accent-2/70"
          style={{ left: `${dot.x}%`, top: `${dot.y}%` }}
        />
      ))}

      <motion.span
        aria-hidden
        className="absolute top-1/2 left-1/2 size-20 -translate-x-1/2 -translate-y-1/2 rounded-full border-2 border-brand-accent-2/40"
        animate={{ scale: [1, 1.35, 1], opacity: [0.6, 0.15, 0.6] }}
        transition={{ duration: 2.6, repeat: Infinity, ease: "easeInOut" }}
      />
      <span className="absolute top-1/2 left-1/2 flex size-11 -translate-x-1/2 -translate-y-1/2 items-center justify-center rounded-full bg-brand-accent/15 text-brand-accent-2">
        <Search className="size-5" aria-hidden />
      </span>
    </div>
  );
}

const DESIGN_BLOCKS = [
  { width: "45%", height: 12 },
  { width: "75%", height: 12 },
  { width: "58%", height: 28 },
  { width: "88%", height: 12 },
] as const;

/** Design: wireframe blocks sketching themselves in, widest last. */
function DesignScene() {
  return (
    <div className="flex h-48 w-full flex-col justify-center gap-3.5 sm:h-56">
      {DESIGN_BLOCKS.map((block, i) => (
        <motion.div
          key={i}
          initial={{ width: "0%", opacity: 0 }}
          whileInView={{ width: block.width, opacity: 1 }}
          viewport={{ once: true, margin: "-40px" }}
          transition={{ duration: 0.55, delay: i * 0.14, ease: "easeOut" }}
          style={{ height: block.height }}
          className="rounded-md bg-brand-accent/25"
        />
      ))}
    </div>
  );
}

const BUILD_LINES = [32, 68, 48, 84, 40, 60] as const;

/** Build: lines of code typing themselves in, one after another. */
function BuildScene() {
  return (
    <div className="flex h-48 w-full flex-col justify-center gap-3 sm:h-56">
      {BUILD_LINES.map((width, i) => (
        <div key={i} className="flex items-center gap-2.5">
          <span className="size-1.5 shrink-0 rounded-full bg-brand-accent-2/60" aria-hidden />
          <motion.span
            initial={{ width: "0%" }}
            whileInView={{ width: `${width}%` }}
            viewport={{ once: true, margin: "-40px" }}
            transition={{ duration: 0.5, delay: i * 0.1, ease: "easeOut" }}
            className="h-2.5 rounded-full bg-brand-border"
          />
        </div>
      ))}
    </div>
  );
}

const LAUNCH_VALUES = [28, 40, 36, 52, 60, 74, 90] as const;

/** Launch & Grow: a climbing chart with a rocket nudging upward. */
function LaunchScene() {
  return (
    <div className="relative h-48 w-full sm:h-56">
      <motion.span
        aria-hidden
        className="absolute top-1 right-1 flex size-10 items-center justify-center rounded-full bg-brand-accent/15 text-brand-accent-2"
        animate={{ y: [0, -6, 0] }}
        transition={{ duration: 2.2, repeat: Infinity, ease: "easeInOut" }}
      >
        <Rocket className="size-4" aria-hidden />
      </motion.span>

      <div className="flex h-full items-end pt-12">
        <AnimatedBarChart values={LAUNCH_VALUES} className="h-32 w-full sm:h-36" />
      </div>
    </div>
  );
}
