"use client";

import { useEffect, useRef, useState } from "react";
import { AnimatePresence, motion, useInView, useReducedMotion } from "framer-motion";
import {
  Bot,
  CalendarCheck,
  CircleUserRound,
  Code2,
  GraduationCap,
  LayoutDashboard,
  ShoppingBag,
  Users,
  Globe,
  type LucideIcon,
} from "lucide-react";

import {
  CONFIGURATOR_OPTIONS,
  type ConfiguratorOption,
  type ConfiguratorOptionId,
} from "@/config/configurator-data";
import { Container } from "@/components/layout/container";
import { Section } from "@/components/layout/section";
import { cn } from "@/lib/utils";
import { ConfiguratorPreview } from "@/components/sections/configurator-preview";

// Keyed by the exact icon-name union (not `string`) so this object only
// type-checks if every icon `ConfiguratorOption` can name has an entry —
// no runtime fallback needed for a "missing icon" case that can't happen.
const optionIcons: Record<ConfiguratorOption["icon"], LucideIcon> = {
  Globe,
  ShoppingBag,
  CalendarCheck,
  CircleUserRound,
  Users,
  GraduationCap,
  LayoutDashboard,
  Bot,
  Code2,
};

// How long each option stays on screen during the unattended auto-cycle,
// in milliseconds — slow enough to actually read the preview, brisk enough
// that a scrolling visitor notices it moving before they've scrolled past.
const AUTO_CYCLE_MS = 3200;

/**
 * Interactive product demo: pick a project type, see a live-feeling
 * preview update. All data is mock (see config/configurator-data.ts)
 * but structured so a real backend can slot in without touching this
 * component — only the `preview` field the selected option carries
 * would change from static data to a fetch result.
 *
 * While the section is in view and nobody has touched it yet, the options
 * cycle themselves — a static "pick one" list reads as inert until someone
 * clicks it, but a preview that's already changing on its own catches the
 * eye of someone just scrolling past. The moment a visitor clicks any
 * option, the auto-cycle stops for good — their choice, not the demo's.
 */
export function Configurator() {
  const [selectedId, setSelectedId] = useState<ConfiguratorOptionId>(CONFIGURATOR_OPTIONS[0].id);
  const [userInteracted, setUserInteracted] = useState(false);
  const selectedOption = CONFIGURATOR_OPTIONS.find((option) => option.id === selectedId) ?? CONFIGURATOR_OPTIONS[0];

  const viewportRef = useRef<HTMLDivElement>(null);
  const isInView = useInView(viewportRef, { margin: "-120px" });
  const reduceMotion = useReducedMotion();

  useEffect(() => {
    if (userInteracted || reduceMotion || !isInView) return;

    const interval = setInterval(() => {
      setSelectedId((current) => {
        const index = CONFIGURATOR_OPTIONS.findIndex((option) => option.id === current);
        return CONFIGURATOR_OPTIONS[(index + 1) % CONFIGURATOR_OPTIONS.length].id;
      });
    }, AUTO_CYCLE_MS);

    return () => clearInterval(interval);
  }, [userInteracted, reduceMotion, isInView]);

  const handleSelect = (id: ConfiguratorOptionId) => {
    setUserInteracted(true);
    setSelectedId(id);
  };

  return (
    <Section id="solutions">
      <Container>
        <div ref={viewportRef}>
          <p className="text-sm font-medium tracking-wide text-brand-accent-2 uppercase">See it in action</p>
          <h2 className="mt-4 max-w-2xl text-h2 font-bold text-balance text-brand-foreground">
            Not sure what you need? Watch it take shape.
          </h2>
          <p className="mt-4 max-w-xl text-lead text-brand-muted">
            Pick a project type and the preview updates instantly — a feel for what your version could look
            like, not a canned screenshot.
          </p>
        </div>

        {/* A wide, diffuse wash behind the whole console — separates this
            section from the flat page background above/below it, the way
            the hero and "What We Build" pivot already do at smaller scale. */}
        <div className="relative mt-12">
          <div
            aria-hidden
            className="pointer-events-none absolute inset-x-0 -top-16 -bottom-16 -z-10 rounded-[3rem] bg-brand-accent/[0.06] blur-[100px]"
          />

          {/* One bordered "console" shell holding both the option list and
              the preview — previously these were two independent pieces
              floating on the plain page background (the unselected options
              had no border or fill at all), which is what read as flat.
              Framing them as one surface gives the section actual depth:
              page → shell → option cards / preview card, each a step
              lighter than the last. */}
          <div className="relative overflow-hidden rounded-2xl border border-brand-border bg-brand-secondary/20 p-5 sm:p-6 md:p-8">
            <div
              aria-hidden
              className="pointer-events-none absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-brand-accent-2/60 to-transparent"
            />

            <div className="grid grid-cols-1 gap-6 lg:grid-cols-[minmax(0,20rem)_1fr] lg:gap-10">
              {/* Option selector: horizontally scrollable chips on mobile/tablet, a vertical list on desktop. */}
              <div
                role="group"
                aria-label="Project types"
                className="flex gap-2 overflow-x-auto pb-2 lg:flex-col lg:overflow-visible lg:pb-0"
              >
                {CONFIGURATOR_OPTIONS.map((option) => {
                  const Icon = optionIcons[option.icon];
                  const isSelected = option.id === selectedId;

                  return (
                    <button
                      key={option.id}
                      type="button"
                      aria-pressed={isSelected}
                      onClick={() => handleSelect(option.id)}
                      className={cn(
                        "relative flex shrink-0 items-center gap-2.5 rounded-lg border px-4 py-3 text-sm font-medium whitespace-nowrap transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand-accent-2 focus-visible:ring-offset-2 focus-visible:ring-offset-brand lg:w-full lg:whitespace-normal",
                        isSelected
                          ? "border-transparent text-brand-foreground"
                          : "border-brand-border bg-brand-secondary/50 text-brand-muted hover:border-brand-muted hover:text-brand-foreground",
                      )}
                    >
                      {isSelected && (
                        <motion.span
                          layoutId="configurator-active-option"
                          className="absolute inset-0 rounded-lg bg-brand-accent/15 shadow-[0_0_28px_-6px_rgba(124,107,255,0.65)] ring-1 ring-inset ring-brand-accent-vivid/50"
                          transition={{ type: "spring", stiffness: 400, damping: 35 }}
                        />
                      )}
                      <Icon
                        className={cn(
                          "relative size-4 shrink-0",
                          isSelected ? "text-brand-accent-2" : "text-brand-muted",
                        )}
                        aria-hidden
                      />
                      <span className="relative">{option.label}</span>
                    </button>
                  );
                })}
              </div>

              {/* Live preview */}
              <div className="relative">
                <div className="mb-3 flex items-center gap-2">
                  <span className="relative flex size-2">
                    <span className="absolute inline-flex size-full animate-ping rounded-full bg-brand-accent-2 opacity-75" />
                    <span className="relative inline-flex size-2 rounded-full bg-brand-accent-2" />
                  </span>
                  <span className="text-xs font-semibold tracking-wide text-brand-accent-2 uppercase">
                    Live preview
                  </span>
                </div>

                <AnimatePresence mode="wait">
                  <motion.div
                    key={selectedOption.id}
                    initial={{ opacity: 0, y: 8 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -8 }}
                    transition={{ duration: 0.25, ease: "easeOut" }}
                  >
                    <ConfiguratorPreview option={selectedOption} />
                  </motion.div>
                </AnimatePresence>
              </div>
            </div>
          </div>
        </div>
      </Container>
    </Section>
  );
}
