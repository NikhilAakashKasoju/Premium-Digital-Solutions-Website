import type { Variants } from "framer-motion";

/**
 * Shared "fade up" reveal: the exact { opacity 0→1, y 20→0, duration
 * 0.5, ease "easeOut" } values were previously retyped verbatim as a
 * local `card`/`item`/`stageItem` const in every stagger-grid section
 * (What We Build, Selected Work, Why Choose Us, Built for Different
 * Businesses, Pricing, From Idea to Impact, Make Your Website Work
 * Smarter). Centralized here so all of them stay in sync.
 */
export const fadeUpItem: Variants = {
  hidden: { opacity: 0, y: 20 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.5, ease: "easeOut" } },
};

/**
 * Stagger-reveal container to pair with `fadeUpItem` (or any variant)
 * on its children — `amount` is the one thing that actually varies
 * between sections (0.08–0.15s of stagger per child).
 */
export function staggerContainer(amount: number): Variants {
  return {
    hidden: {},
    visible: { transition: { staggerChildren: amount } },
  };
}
