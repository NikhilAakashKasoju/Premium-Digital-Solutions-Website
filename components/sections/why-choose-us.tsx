"use client";

import { useRef, type MouseEvent } from "react";
import { motion } from "framer-motion";
import { Bot, Cpu, Handshake, Layers, Target, Zap, type LucideIcon } from "lucide-react";

import { siteConfig, type Differentiator } from "@/config/site";
import { cardSurfaceClass, cn } from "@/lib/utils";
import { fadeUpItem, staggerContainer } from "@/lib/motion";
import { Container } from "@/components/layout/container";
import { Section } from "@/components/layout/section";
import { SectionHeading } from "@/components/layout/section-heading";
import { IconBadge } from "@/components/ui/icon-badge";

// Keyed by the exact icon-name union (not `string`) so this object only
// type-checks if every icon `Differentiator` can name has an entry — no
// runtime fallback needed for a "missing icon" case that can't happen.
const differentiatorIcons: Record<Differentiator["icon"], LucideIcon> = {
  Target,
  Cpu,
  Layers,
  Bot,
  Zap,
  Handshake,
};

// Bento spans on the 6-column desktop track: two wide cards leading, three
// even ones below them, then one full-width closer — an asymmetric rhythm
// instead of a uniform 3-up grid, so this reads differently from "From Idea
// to Impact"'s alternating rows rather than repeating the same treatment.
const CARD_SPANS = [
  "sm:col-span-2 lg:col-span-3",
  "lg:col-span-3",
  "lg:col-span-2",
  "lg:col-span-2",
  "lg:col-span-2",
  "sm:col-span-2 lg:col-span-6",
] as const;

const container = staggerContainer(0.1);

/**
 * "Why Choose Us" differentiator grid: a cursor-reactive bento layout
 * rather than the scroll-driven "scene" narrative used for the process
 * section — each card follows the pointer with a soft spotlight and
 * carries a small always-on pulsing ring around its icon, so the section
 * feels alive on hover rather than needing a scroll trigger to animate.
 * The spotlight writes directly to a ref'd element's style on
 * `onMouseMove` rather than through a Framer Motion value bound to a
 * `style` prop — that binding path silently failed to reach the DOM
 * elsewhere in this project on this exact Next/React/Framer combination
 * (see hero-visual.tsx), so the proven direct-write approach is reused
 * here instead of re-risking the same bug.
 */
export function WhyChooseUs() {
  return (
    <Section id="about">
      <Container>
        <SectionHeading title="Why Choose Us" description="The practical reasons teams choose to build with us." />

        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-80px" }}
          variants={container}
          className="mt-12 grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-6 lg:gap-5"
        >
          {siteConfig.whyUs.map((item, i) => (
            <DifferentiatorCard
              key={item.title}
              item={item}
              index={i}
              className={CARD_SPANS[i]}
              banner={i === CARD_SPANS.length - 1}
            />
          ))}
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-80px" }}
          transition={{ duration: 0.5, ease: "easeOut" }}
          className={cn(cardSurfaceClass, "mt-6 flex flex-col items-start gap-5 p-6 sm:flex-row sm:items-center lg:mt-8")}
        >
          <span
            aria-hidden
            className="flex size-16 shrink-0 items-center justify-center rounded-full bg-brand-accent/15 text-lg font-semibold text-brand-accent-2"
          >
            {siteConfig.founder.name
              .split(" ")
              .map((part) => part[0])
              .slice(0, 2)
              .join("")}
          </span>

          <div>
            <p className="text-sm font-semibold text-brand-foreground">
              {siteConfig.founder.name}
              <span className="ml-2 font-normal text-brand-muted">— {siteConfig.founder.role}</span>
            </p>
            <p className="mt-1.5 text-sm text-brand-muted">{siteConfig.founder.bio}</p>
          </div>
        </motion.div>
      </Container>
    </Section>
  );
}

function DifferentiatorCard({
  item,
  index,
  className,
  banner,
}: {
  item: Differentiator;
  index: number;
  className: string;
  banner: boolean;
}) {
  const Icon = differentiatorIcons[item.icon];
  const glowRef = useRef<HTMLDivElement>(null);

  // Direct style write on the ref, not a Framer Motion value piped
  // through a `style` prop — see the component doc comment above for why.
  const handleMouseMove = (event: MouseEvent<HTMLDivElement>) => {
    const node = glowRef.current;
    if (!node) return;
    const rect = event.currentTarget.getBoundingClientRect();
    const x = event.clientX - rect.left;
    const y = event.clientY - rect.top;
    node.style.background = `radial-gradient(280px circle at ${x}px ${y}px, rgba(34,211,238,0.14), transparent 72%)`;
  };

  return (
    <motion.div
      variants={fadeUpItem}
      onMouseMove={handleMouseMove}
      className={cn(
        cardSurfaceClass,
        "group relative overflow-hidden p-6 transition-colors duration-300 hover:border-brand-accent-2/40",
        banner && "sm:flex sm:items-center sm:gap-6 sm:p-7",
        className,
      )}
    >
      {/* Cursor-follow spotlight — invisible until hovered, then tracks the pointer. */}
      <div
        ref={glowRef}
        aria-hidden
        className="pointer-events-none absolute inset-0 opacity-0 transition-opacity duration-300 group-hover:opacity-100"
      />

      <span className="pointer-events-none absolute top-5 right-5 font-mono text-xs tabular-nums text-brand-muted/40">
        0{index + 1}
      </span>

      <div className={cn("relative", banner && "sm:shrink-0")}>
        <PulsingIconBadge icon={Icon} />
      </div>

      <div className={cn("relative mt-5", banner && "sm:mt-0")}>
        <h3 className="text-h4 font-semibold text-brand-foreground">{item.title}</h3>
        <p className={cn("mt-2 text-sm text-brand-muted", banner && "sm:max-w-2xl")}>{item.description}</p>
      </div>
    </motion.div>
  );
}

/**
 * `IconBadge` wrapped in a slow, continuously pulsing ring — a small
 * "alive" detail so the grid doesn't sit completely static until a visitor
 * hovers it, without needing a scroll trigger to kick it off.
 */
function PulsingIconBadge({ icon }: { icon: LucideIcon }) {
  return (
    <span className="relative inline-flex">
      <motion.span
        aria-hidden
        className="absolute inset-0 rounded-lg border border-brand-accent-2/40"
        animate={{ scale: [1, 1.4, 1], opacity: [0.6, 0, 0.6] }}
        transition={{ duration: 2.8, repeat: Infinity, ease: "easeInOut" }}
      />
      <IconBadge icon={icon} />
    </span>
  );
}
