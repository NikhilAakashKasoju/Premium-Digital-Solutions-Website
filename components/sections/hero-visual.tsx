"use client";

import type { ReactNode } from "react";
import { motion, useReducedMotion } from "framer-motion";
import {
  ChevronDown,
  ChevronRight,
  Database,
  MonitorSmartphone,
  Sparkles,
  TrendingUp,
  Workflow,
  type LucideIcon,
} from "lucide-react";

import { cn } from "@/lib/utils";

type FlowStage = {
  label: string;
  icon: LucideIcon;
};

const FLOW: readonly FlowStage[] = [
  { label: "Website", icon: MonitorSmartphone },
  { label: "Data", icon: Database },
  { label: "Automation", icon: Workflow },
  { label: "AI", icon: Sparkles },
  { label: "Growth", icon: TrendingUp },
];

/**
 * Abstract "product system" visualization for the hero: an implied
 * pipeline from Website through Data, Automation and AI to Growth.
 *
 * Deliberately two different compositions rather than one shrunk to
 * fit both: a floating, layered card cluster with a flowing connector
 * on large screens, and a compact horizontal/vertical stage list
 * below `lg`, where absolute-positioned floating cards would just
 * become cramped and illegible.
 */
export function HeroVisual() {
  return (
    <div className="w-full">
      <DesktopFlow className="hidden lg:block" />
      <CompactFlow className="lg:hidden" />
    </div>
  );
}

function DesktopFlow({ className }: { className?: string }) {
  const reduceMotion = useReducedMotion();

  return (
    <div className={cn("relative aspect-square w-full max-w-xl", className)}>
      {/* Decorative flow line: a single loose curve threading through the
          card cluster, with small pulse nodes along it. Purely
          illustrative — it does not attempt to wire into exact card
          edges, it just suggests movement through the composition. */}
      <svg
        viewBox="0 0 100 100"
        className="absolute inset-0 h-full w-full text-brand-accent"
        aria-hidden
      >
        <defs>
          <linearGradient id="hero-flow-gradient" x1="0" y1="0" x2="100" y2="100">
            <stop offset="0%" stopColor="var(--brand-accent)" />
            <stop offset="100%" stopColor="var(--brand-accent-2)" />
          </linearGradient>
        </defs>
        <motion.path
          d="M 10 18 C 40 10, 55 30, 46 42 C 38 52, 60 52, 68 45 C 82 34, 90 55, 78 68 C 68 77, 78 86, 90 82"
          fill="none"
          stroke="url(#hero-flow-gradient)"
          strokeWidth={0.6}
          strokeLinecap="round"
          strokeOpacity={0.55}
          initial={{ pathLength: 0, opacity: 0 }}
          animate={{ pathLength: 1, opacity: 0.55 }}
          transition={{ duration: 1.4, ease: "easeInOut", delay: 0.3 }}
        />
        {[
          [10, 18],
          [46, 42],
          [68, 45],
          [78, 68],
          [90, 82],
        ].map(([cx, cy], i) => (
          <motion.circle
            key={`${cx}-${cy}`}
            cx={cx}
            cy={cy}
            r={1.1}
            fill="var(--brand-accent-2)"
            initial={{ opacity: 0 }}
            animate={{ opacity: [0, 1, 0.6] }}
            transition={{ duration: 0.6, delay: 0.6 + i * 0.2 }}
          />
        ))}
      </svg>

      <FloatCard
        index={0}
        reduceMotion={!!reduceMotion}
        className="left-[4%] top-[6%] w-44"
      >
        <CardChrome label="Website" icon={MonitorSmartphone} />
        <div className="mt-3 space-y-1.5">
          <div className="h-1.5 w-full rounded-full bg-brand-border" />
          <div className="h-1.5 w-3/4 rounded-full bg-brand-border" />
          <div className="h-1.5 w-5/6 rounded-full bg-brand-border" />
        </div>
      </FloatCard>

      <FloatCard
        index={1}
        reduceMotion={!!reduceMotion}
        className="right-[2%] top-[2%] w-40"
      >
        <CardChrome label="Data" icon={Database} />
        <div className="mt-3 flex h-12 items-end gap-1.5">
          {[40, 70, 55, 90, 65].map((h, i) => (
            <div
              key={i}
              className="flex-1 rounded-sm bg-brand-accent-2/70"
              style={{ height: `${h}%` }}
            />
          ))}
        </div>
      </FloatCard>

      <FloatCard
        index={2}
        reduceMotion={!!reduceMotion}
        className="left-[6%] top-[46%] w-40"
      >
        <CardChrome label="Automation" icon={Workflow} />
        <div className="mt-4 flex items-center justify-between px-1">
          {[0, 1, 2].map((i) => (
            <span key={i} className="flex items-center">
              <span className="size-2 rounded-full bg-brand-accent" />
              {i < 2 && <span className="mx-1 h-px w-6 bg-brand-border" />}
            </span>
          ))}
        </div>
      </FloatCard>

      <FloatCard
        index={3}
        reduceMotion={!!reduceMotion}
        className="right-[4%] top-[50%] w-40"
      >
        <CardChrome label="AI" icon={Sparkles} />
        <div className="mt-3 space-y-1.5">
          <div className="h-1.5 w-5/6 rounded-full bg-brand-border" />
          <div className="h-1.5 w-2/3 rounded-full bg-brand-border" />
        </div>
      </FloatCard>

      <FloatCard
        index={4}
        reduceMotion={!!reduceMotion}
        className="left-[24%] top-[78%] w-48"
      >
        <CardChrome label="Growth" icon={TrendingUp} />
        <svg viewBox="0 0 100 32" className="mt-3 h-8 w-full text-brand-accent-2" aria-hidden>
          <polyline
            points="0,28 20,22 38,24 55,12 72,16 100,4"
            fill="none"
            stroke="currentColor"
            strokeWidth={2.5}
            strokeLinecap="round"
            strokeLinejoin="round"
          />
          <circle cx={100} cy={4} r={2.5} fill="currentColor" />
        </svg>
      </FloatCard>
    </div>
  );
}

function CompactFlow({ className }: { className?: string }) {
  return (
    <div
      className={cn(
        "flex flex-col items-stretch gap-2 sm:flex-row sm:flex-wrap sm:items-center sm:justify-center sm:gap-3",
        className,
      )}
    >
      {FLOW.map((stage, i) => (
        <div key={stage.label} className="flex items-center gap-2 sm:gap-3">
          <motion.div
            initial={{ opacity: 0, y: 12 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-40px" }}
            transition={{ duration: 0.4, delay: i * 0.08, ease: "easeOut" }}
            className="flex items-center gap-2 rounded-full border border-brand-border bg-brand-secondary px-4 py-2.5"
          >
            <stage.icon className="size-4 text-brand-accent-2" aria-hidden />
            <span className="text-sm font-medium text-brand-foreground">{stage.label}</span>
          </motion.div>

          {i < FLOW.length - 1 && (
            <>
              <ChevronRight className="hidden size-4 shrink-0 text-brand-muted sm:block" aria-hidden />
              <ChevronDown className="size-4 shrink-0 text-brand-muted sm:hidden" aria-hidden />
            </>
          )}
        </div>
      ))}
    </div>
  );
}

function CardChrome({ label, icon: Icon }: { label: string; icon: LucideIcon }) {
  return (
    <div className="flex items-center gap-2">
      <span className="flex size-7 items-center justify-center rounded-md bg-brand-accent/15 text-brand-accent-2">
        <Icon className="size-4" aria-hidden />
      </span>
      <span className="text-xs font-medium text-brand-muted">{label}</span>
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
        <div className="rounded-xl border border-brand-border bg-brand-secondary/90 p-4 shadow-[0_8px_30px_-12px_rgba(0,0,0,0.5)] backdrop-blur-sm">
          {children}
        </div>
      </motion.div>
    </motion.div>
  );
}
