"use client";

import type { ReactNode } from "react";
import { motion, useReducedMotion } from "framer-motion";
import { AppWindow, Bot, Building2, Globe, type LucideIcon } from "lucide-react";

import { siteConfig, type WhatWeBuildCard } from "@/config/site";
import { cn } from "@/lib/utils";

// Keyed by the exact icon-name union (not `string`) so this object only
// type-checks if every icon `WhatWeBuildCard` can name has an entry — no
// runtime fallback needed for a "missing icon" case that can't happen.
const serviceIcons: Record<WhatWeBuildCard["icon"], LucideIcon> = {
  Globe,
  AppWindow,
  Building2,
  Bot,
};

// One entry per `siteConfig.whatWeBuild` item, in the same order: where its
// floating card sits around the centered hero text, and where the dashed
// connector line reaching it should end (in the same 0–100 viewBox space
// the card positions are expressed in, so the two stay visually in sync).
// `loop` tunes that connector's meander — see `beePath` below — varied per
// card so the four don't all read as one shape rotated four ways.
const CARD_LAYOUT = [
  { cardClass: "left-[0%] top-[2%]", line: { x: 14, y: 14 }, loop: { t: 0.4, wobble: 10, sweep: 1 as const } },
  { cardClass: "right-[0%] top-[8%]", line: { x: 86, y: 20 }, loop: { t: 0.52, wobble: -9, sweep: 0 as const } },
  { cardClass: "left-[2%] bottom-[4%]", line: { x: 16, y: 86 }, loop: { t: 0.46, wobble: -11, sweep: 0 as const } },
  { cardClass: "right-[2%] bottom-[0%]", line: { x: 84, y: 92 }, loop: { t: 0.58, wobble: 9, sweep: 1 as const } },
] as const;

/**
 * Builds a wandering, looped connector from the centered headline (50, 50)
 * out to a floating card at (x2, y2) — a lazy curved approach, a small
 * loop-de-loop partway along, then a curved swoop into the card, rather
 * than a ruler-straight line. `wobble` (signed) is how far off the direct
 * route the loop sits and which side it curves toward; `t` is how far
 * along the route the loop sits (0–1); `sweep` picks which way the loop
 * winds.
 */
function beePath(x2: number, y2: number, { t, wobble, sweep }: { t: number; wobble: number; sweep: 0 | 1 }) {
  const x1 = 50;
  const y1 = 50;
  const dx = x2 - x1;
  const dy = y2 - y1;
  const dist = Math.hypot(dx, dy) || 1;
  const ux = dx / dist;
  const uy = dy / dist;
  // Perpendicular unit vector — offsetting along this is what pushes the
  // loop and the curve's bulges off the direct line.
  const px = -uy;
  const py = ux;

  const loopRadius = 4.5;
  const loopX = x1 + dx * t + px * wobble;
  const loopY = y1 + dy * t + py * wobble;
  // The loop only touches the route at one point — where the path both
  // enters and exits it — which is what reads as a loop rather than a
  // detour around an obstacle.
  const loopEnterX = loopX - ux * loopRadius;
  const loopEnterY = loopY - uy * loopRadius;
  const loopFarX = loopX + ux * loopRadius;
  const loopFarY = loopY + uy * loopRadius;

  const c1x = x1 + dx * 0.22 - px * wobble * 0.45;
  const c1y = y1 + dy * 0.22 - py * wobble * 0.45;
  const c2x = x2 - dx * 0.22 + px * wobble * 0.2;
  const c2y = y2 - dy * 0.22 + py * wobble * 0.2;

  const f = (n: number) => n.toFixed(2);

  return [
    `M ${x1} ${y1}`,
    `Q ${f(c1x)} ${f(c1y)} ${f(loopEnterX)} ${f(loopEnterY)}`,
    `A ${loopRadius} ${loopRadius} 0 1 ${sweep} ${f(loopFarX)} ${f(loopFarY)}`,
    `A ${loopRadius} ${loopRadius} 0 1 ${sweep} ${f(loopEnterX)} ${f(loopEnterY)}`,
    `Q ${f(c2x)} ${f(c2y)} ${x2} ${y2}`,
  ].join(" ");
}

/**
 * Hero "service cloud": the four `whatWeBuild` practice areas floating as
 * cards around the centered headline, each linked back to it by a dashed
 * connector — a hub-and-spoke composition rather than the hero copy
 * competing with a separate side visual.
 *
 * Deliberately two different compositions rather than one shrunk to fit
 * both: absolutely-positioned floating cards with dashed connectors on
 * large screens, and a plain static grid below `lg`, where the floating
 * layout would just overlap the (also centered, full-width) hero copy.
 */
export function HeroServiceCards() {
  return <DesktopServiceCloud className="hidden lg:block" />;
}

export function HeroServiceListCompact({ className }: { className?: string }) {
  return (
    <div className={cn("grid grid-cols-2 gap-3 sm:grid-cols-4", className)}>
      {siteConfig.whatWeBuild.map((service, i) => {
        const Icon = serviceIcons[service.icon];
        return (
          <motion.div
            key={service.slug}
            initial={{ opacity: 0, y: 12 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-40px" }}
            transition={{ duration: 0.4, delay: i * 0.08, ease: "easeOut" }}
            className="flex flex-col items-center gap-2 rounded-xl border border-brand-border bg-brand-secondary px-3 py-4 text-center"
          >
            <span className="flex size-9 items-center justify-center rounded-md bg-brand-accent/15 text-brand-accent-2">
              <Icon className="size-4" aria-hidden />
            </span>
            <span className="text-xs font-medium text-brand-foreground">{service.title}</span>
          </motion.div>
        );
      })}
    </div>
  );
}

function DesktopServiceCloud({ className }: { className?: string }) {
  const reduceMotion = useReducedMotion();
  const services = siteConfig.whatWeBuild;

  return (
    <div className={cn("pointer-events-none absolute inset-0", className)} aria-hidden>
      {/* Dashed connectors from the centered headline out to each floating
          card — purely illustrative, so the endpoints only approximate the
          cards' actual positions rather than wiring into their exact edges. */}
      {/* Note: these stay plain `<path>` elements, not `motion.path` — Framer
          Motion animates SVG `pathLength` by writing its own stroke-dasharray/
          stroke-dashoffset, which would silently overwrite (and cancel) the
          dashed pattern below. The fade-in is animated on the wrapping
          `motion.svg` instead, which doesn't touch dasharray. */}
      <motion.svg
        viewBox="0 0 100 100"
        preserveAspectRatio="none"
        className="absolute inset-0 h-full w-full"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 1, ease: "easeInOut", delay: 0.4 }}
      >
        <defs>
          <linearGradient id="hero-dash-gradient" x1="0" y1="0" x2="100" y2="100">
            <stop offset="0%" stopColor="var(--brand-accent)" />
            <stop offset="100%" stopColor="var(--brand-accent-2)" />
          </linearGradient>
        </defs>
        {CARD_LAYOUT.map((card, i) => (
          <path
            key={i}
            d={beePath(card.line.x, card.line.y, card.loop)}
            fill="none"
            stroke="url(#hero-dash-gradient)"
            strokeWidth={0.35}
            strokeDasharray="2.4 2.6"
            strokeLinecap="round"
            strokeOpacity={0.55}
          />
        ))}
      </motion.svg>

      {services.map((service, i) => {
        const Icon = serviceIcons[service.icon];
        const layout = CARD_LAYOUT[i];
        return (
          <FloatCard key={service.slug} index={i} reduceMotion={!!reduceMotion} className={cn(layout.cardClass, "w-48")}>
            <CardChrome label={service.title} icon={Icon} />
            <p className="mt-2 text-[11px] leading-snug text-brand-muted">{service.description}</p>
          </FloatCard>
        );
      })}
    </div>
  );
}

function CardChrome({ label, icon: Icon }: { label: string; icon: LucideIcon }) {
  return (
    <div className="flex items-center gap-2">
      <span className="flex size-7 shrink-0 items-center justify-center rounded-md bg-brand-accent/15 text-brand-accent-2">
        <Icon className="size-4" aria-hidden />
      </span>
      <span className="text-xs font-semibold text-brand-foreground">{label}</span>
    </div>
  );
}

function FloatCard({
  index,
  reduceMotion,
  className,
  children,
}: {
  index: number;
  reduceMotion: boolean;
  className?: string;
  children: ReactNode;
}) {
  // Important: the two motion.div layers below always render, for every
  // value of `reduceMotion` — only the *animation props* branch on it.
  // `useReducedMotion()` resolves differently on the server (always
  // "no preference") than on a client whose OS has the reduced-motion
  // flag set, so branching the DOM *shape* itself on its value causes
  // a server/client markup mismatch (React error #418) the moment a
  // visitor has that OS setting on. Varying only style/animation props
  // is safe because Framer Motion applies those after hydration.
  return (
    <motion.div
      initial={{ opacity: 0, y: 24 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6, delay: 0.15 * index, ease: "easeOut" }}
      className={cn("absolute", className)}
    >
      <motion.div
        animate={reduceMotion ? { y: 0 } : { y: [0, -8, 0] }}
        transition={
          reduceMotion
            ? { duration: 0 }
            : {
                duration: 4 + index * 0.4,
                repeat: Infinity,
                ease: "easeInOut",
                delay: 0.6 + 0.15 * index,
              }
        }
      >
        <div className="pointer-events-auto rounded-xl border border-brand-border bg-brand-secondary/90 p-4 shadow-[0_8px_30px_-12px_rgba(0,0,0,0.5)] backdrop-blur-sm">
          {children}
        </div>
      </motion.div>
    </motion.div>
  );
}
