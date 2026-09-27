"use client";

import { useEffect, useRef, type ReactNode } from "react";
import { motion, useReducedMotion } from "framer-motion";
import { AppWindow, Bot, Building2, Globe, type LucideIcon } from "lucide-react";

import { siteConfig, type WhatWeBuildCard } from "@/config/site";
import { cn } from "@/lib/utils";

const serviceIcons: Record<WhatWeBuildCard["icon"], LucideIcon> = {
  Globe,
  AppWindow,
  Building2,
  Bot,
};

// `away` is where each card drifts to as the hero scrolls out of view —
// outward from its own corner and slightly rotated, so the cloud reads as
// scattering apart rather than sliding uniformly in one direction.
const CARD_LAYOUT = [
  {
    cardClass: "left-[0%] top-[2%]",
    line: { x: 14, y: 14 },
    loop: { t: 0.4, wobble: 10, sweep: 1 as const },
    away: { x: -70, y: -55, rotate: -10 },
  },
  {
    cardClass: "right-[0%] top-[8%]",
    line: { x: 86, y: 20 },
    loop: { t: 0.52, wobble: -9, sweep: 0 as const },
    away: { x: 70, y: -55, rotate: 10 },
  },
  {
    cardClass: "left-[2%] bottom-[4%]",
    line: { x: 16, y: 86 },
    loop: { t: 0.46, wobble: -11, sweep: 0 as const },
    away: { x: -70, y: 65, rotate: 10 },
  },
  {
    cardClass: "right-[2%] bottom-[0%]",
    line: { x: 84, y: 92 },
    loop: { t: 0.58, wobble: 9, sweep: 1 as const },
    away: { x: 70, y: 65, rotate: -10 },
  },
] as const;

function beePath(x2: number, y2: number, { t, wobble, sweep }: { t: number; wobble: number; sweep: 0 | 1 }) {
  const x1 = 50;
  const y1 = 50;
  const dx = x2 - x1;
  const dy = y2 - y1;
  const dist = Math.hypot(dx, dy) || 1;
  const ux = dx / dist;
  const uy = dy / dist;
  const px = -uy;
  const py = ux;

  const loopRadius = 4.5;
  const loopX = x1 + dx * t + px * wobble;
  const loopY = y1 + dy * t + py * wobble;
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

/**
 * The floating card cloud doubles as the hero's scroll-exit animation: as
 * the visitor scrolls the hero out of view, the cards drift apart toward
 * their own corners (and the whole cloud + dashed "flight path" lines fade
 * out) instead of just scrolling off statically.
 *
 * This is driven by a plain `scroll`/`resize` listener + direct style
 * writes on refs (rAF-throttled), rather than Framer Motion's
 * `useScroll`/`useTransform` bound through the `style` prop — in this
 * project's exact Next/React/Framer Motion combination, a MotionValue fed
 * into `style` from an *externally* driven source (scroll) computes
 * correctly but never actually gets re-applied to the DOM after the first
 * paint (confirmed by instrumenting the motion value directly: it updates
 * every frame, the element's inline style does not). Framer's own
 * mount-triggered `animate`/`whileInView` animations elsewhere on this
 * card (entrance fade, idle bob) are a different, self-contained code path
 * and are unaffected, so they stay as-is. Manual refs sidestep the issue
 * entirely and are simple enough to be worth keeping even if a future
 * Framer Motion upgrade fixes the underlying bug.
 */
function DesktopServiceCloud({ className }: { className?: string }) {
  const reduceMotion = useReducedMotion();
  const services = siteConfig.whatWeBuild;

  const cloudRef = useRef<HTMLDivElement>(null);
  const card0Ref = useRef<HTMLDivElement>(null);
  const card1Ref = useRef<HTMLDivElement>(null);
  const card2Ref = useRef<HTMLDivElement>(null);
  const card3Ref = useRef<HTMLDivElement>(null);
  const cardRefs = [card0Ref, card1Ref, card2Ref, card3Ref];

  useEffect(() => {
    if (reduceMotion) return;

    let frame = 0;

    const applyProgress = () => {
      const container = cloudRef.current;
      if (!container) return;

      const rect = container.getBoundingClientRect();
      const total = rect.height || 1;
      // 0 when the cloud's top reaches the viewport top, 1 once its bottom
      // has scrolled past the viewport top — i.e. "scrolled through the hero".
      const raw = -rect.top / total;
      const progress = Math.min(Math.max(raw, 0), 1);

      const opacity = Math.max(0, Math.min(1, progress <= 0.7 ? 1 : 1 - (progress - 0.7) / 0.3));
      container.style.opacity = String(opacity);

      CARD_LAYOUT.forEach((card, i) => {
        const el = cardRefs[i].current;
        if (!el) return;
        const { x, y, rotate } = card.away;
        el.style.transform = `translate(${x * progress}px, ${y * progress}px) rotate(${rotate * progress}deg)`;
      });
    };

    const onScrollOrResize = () => {
      cancelAnimationFrame(frame);
      frame = requestAnimationFrame(applyProgress);
    };

    applyProgress();
    window.addEventListener("scroll", onScrollOrResize, { passive: true });
    window.addEventListener("resize", onScrollOrResize);

    return () => {
      cancelAnimationFrame(frame);
      window.removeEventListener("scroll", onScrollOrResize);
      window.removeEventListener("resize", onScrollOrResize);
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [reduceMotion]);

  return (
    <div ref={cloudRef} className={cn("pointer-events-none absolute inset-0", className)} aria-hidden>
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
          <div key={service.slug} ref={cardRefs[i]} className={cn("absolute", layout.cardClass, "w-48")}>
            <FloatCard index={i} reduceMotion={!!reduceMotion}>
              <CardChrome label={service.title} icon={Icon} />
              <p className="mt-2 text-[11px] leading-snug text-brand-muted">{service.description}</p>
            </FloatCard>
          </div>
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

/**
 * Owns only the mount-in entrance fade and the idle bob — positioning and
 * the scroll-linked scatter transform live on the wrapping ref'd element in
 * `DesktopServiceCloud`, so this never fights that wrapper over which
 * element owns `transform`/`y`.
 */
function FloatCard({
  index,
  reduceMotion,
  children,
}: {
  index: number;
  reduceMotion: boolean;
  children: ReactNode;
}) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 24 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6, delay: 0.15 * index, ease: "easeOut" }}
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
