"use client";

import { useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
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
import { SectionHeading } from "@/components/layout/section-heading";
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

/**
 * Interactive product demo: pick a project type, see a live-feeling
 * preview update. All data is mock (see config/configurator-data.ts)
 * but structured so a real backend can slot in without touching this
 * component — only the `preview` field the selected option carries
 * would change from static data to a fetch result.
 */
export function Configurator() {
  const [selectedId, setSelectedId] = useState<ConfiguratorOptionId>(CONFIGURATOR_OPTIONS[0].id);
  const selectedOption = CONFIGURATOR_OPTIONS.find((option) => option.id === selectedId) ?? CONFIGURATOR_OPTIONS[0];

  return (
    <Section>
      <Container>
        <SectionHeading
          title="What Can We Build For You?"
          description="Pick a project type and see how it could come together."
        />

        <div className="mt-12 grid grid-cols-1 gap-6 lg:grid-cols-[minmax(0,20rem)_1fr] lg:gap-10">
          {/* Option selector: horizontally scrollable chips on mobile/tablet, a vertical list on desktop. */}
          <div
            role="group"
            aria-label="Project types"
            className="-mx-6 flex gap-2 overflow-x-auto px-6 pb-2 lg:mx-0 lg:flex-col lg:overflow-visible lg:px-0 lg:pb-0"
          >
            {CONFIGURATOR_OPTIONS.map((option) => {
              const Icon = optionIcons[option.icon];
              const isSelected = option.id === selectedId;

              return (
                <button
                  key={option.id}
                  type="button"
                  aria-pressed={isSelected}
                  onClick={() => setSelectedId(option.id)}
                  className={cn(
                    "relative flex shrink-0 items-center gap-2.5 rounded-lg px-4 py-3 text-sm font-medium whitespace-nowrap transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand-accent-2 focus-visible:ring-offset-2 focus-visible:ring-offset-brand lg:w-full lg:whitespace-normal",
                    isSelected ? "text-brand-foreground" : "text-brand-muted hover:text-brand-foreground",
                  )}
                >
                  {isSelected && (
                    <motion.span
                      layoutId="configurator-active-option"
                      className="absolute inset-0 rounded-lg bg-brand-accent/15 ring-1 ring-inset ring-brand-accent/40"
                      transition={{ type: "spring", stiffness: 400, damping: 35 }}
                    />
                  )}
                  <Icon
                    className={cn("relative size-4 shrink-0", isSelected ? "text-brand-accent-2" : "text-brand-muted")}
                    aria-hidden
                  />
                  <span className="relative">{option.label}</span>
                </button>
              );
            })}
          </div>

          {/* Live preview */}
          <div>
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
      </Container>
    </Section>
  );
}
