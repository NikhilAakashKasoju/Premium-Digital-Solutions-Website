"use client";

import { motion } from "framer-motion";

import { staggerContainer } from "@/lib/motion";
import { cn } from "@/lib/utils";

const container = staggerContainer(0.06);

/**
 * The small bar-chart mockup used by both the InsightBoard-style
 * portfolio preview (`kind: "chart"` in config/portfolio.ts) and the
 * configurator's analytics preview — bars grow from 0 to their real
 * height the first time the chart scrolls into view, rather than
 * appearing pre-drawn, so a dashboard mockup reads as live data
 * updating instead of a static screenshot. `MotionConfig
 * reducedMotion="user"` (set in app/layout.tsx) already collapses this
 * grow-in for reduced-motion users, same as every other Framer Motion
 * animation on the site — no extra handling needed here.
 */
export function AnimatedBarChart({ values, className }: { values: readonly number[]; className?: string }) {
  return (
    <motion.div
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, margin: "-40px" }}
      variants={container}
      // No `flex-1` here: this chart is a direct flex-col child of
      // WindowFrame in the portfolio preview, and `flex-1` sets
      // flex-basis to 0% — which overrides the explicit `h-24` height
      // as the flex item's starting main-axis size. With no extra free
      // space in WindowFrame to grow into, every bar's real height
      // resolves to 0px even though its `height: X%` inline style is
      // correct (confirmed via a rendered bounding-box check). A plain
      // fixed height has no such interaction and reliably renders.
      className={cn("flex h-24 items-end gap-1.5", className)}
    >
      {values.map((value, i) => (
        <motion.div
          key={i}
          variants={{ hidden: { height: "0%" }, visible: { height: `${value}%` } }}
          transition={{ duration: 0.6, ease: "easeOut" }}
          className="flex-1 rounded-sm bg-brand-accent-2/70 transition-colors hover:bg-brand-accent-2"
        />
      ))}
    </motion.div>
  );
}
