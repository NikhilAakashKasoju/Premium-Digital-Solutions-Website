"use client";

import { useEffect, useRef, useState } from "react";
import { useInView, useReducedMotion } from "framer-motion";

import { cn } from "@/lib/utils";

// Matches an optional leading symbol ($, +, -), the numeral itself
// (digits with optional thousands commas and one decimal point), and
// an optional trailing unit (k, %, "yrs", …) — e.g. "$82.4k",
// "+9%", "3,210". Values with no numeral at all ("Pro", "Done") just
// don't match, and render as plain static text below.
const NUMBER_PATTERN = /^([^\d]*)([\d,]*\d(?:\.\d+)?)([^\d]*)$/;

/**
 * A stat tile's value, counting up from 0 to its real figure the first
 * time it scrolls into view — used across every portfolio mockup's
 * `stats` block (see config/portfolio.ts) so numbers read as "live
 * data" rather than a static screenshot.
 *
 * The server-rendered (and first client-render, pre-hydration) markup
 * always shows the FINAL value — see hero-visual.tsx's FloatCard for
 * why: `useReducedMotion()` resolves to `null` until after mount, so
 * branching the initial render on it would make server and client
 * markup disagree. The count-up only starts from an effect, once this
 * element is in view — a purely client-side, post-hydration swap.
 */
export function AnimatedStatValue({ value, className }: { value: string; className?: string }) {
  const ref = useRef<HTMLParagraphElement>(null);
  const inView = useInView(ref, { once: true, margin: "-40px" });
  const reducedMotion = useReducedMotion();
  const [display, setDisplay] = useState(value);

  useEffect(() => {
    // Recomputed from `value` (a stable string prop) rather than reading
    // a `match` array from the render closure — `String.match()` returns
    // a new array every call, so depending on it directly would make
    // this effect see a "changed" dependency on every render (including
    // the ones `setDisplay` itself causes) and restart the animation
    // from zero on every single frame instead of ever finishing.
    const match = value.match(NUMBER_PATTERN);
    if (!match || !inView || reducedMotion) return;

    const [, prefix, numeral, suffix] = match;
    const target = parseFloat(numeral.replace(/,/g, ""));
    const decimals = numeral.includes(".") ? numeral.split(".")[1].length : 0;
    const useThousands = numeral.includes(",");
    const duration = 900;
    let start: number | null = null;
    let frame: number;

    function tick(timestamp: number) {
      if (start === null) start = timestamp;
      const progress = Math.min((timestamp - start) / duration, 1);
      const eased = 1 - Math.pow(1 - progress, 3);
      const current = target * eased;
      const formatted = useThousands
        ? current.toLocaleString("en-US", { minimumFractionDigits: decimals, maximumFractionDigits: decimals })
        : current.toFixed(decimals);
      setDisplay(`${prefix}${formatted}${suffix}`);
      if (progress < 1) frame = requestAnimationFrame(tick);
    }

    frame = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(frame);
  }, [inView, value, reducedMotion]);

  return (
    <p ref={ref} className={cn("tabular-nums", className)}>
      {display}
    </p>
  );
}
