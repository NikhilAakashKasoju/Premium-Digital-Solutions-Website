import { type ClassValue, clsx } from "clsx";
import { twMerge } from "tailwind-merge";

/**
 * Merge Tailwind class names safely, resolving conflicting utility
 * classes in favor of the ones that appear last.
 *
 * Used by shadcn/ui components and any component that accepts a
 * `className` override prop.
 */
export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

/**
 * Standard keyboard-focus ring for interactive text links and icon
 * buttons (nav links, arrow links, the footer, accordion triggers,
 * `buttonVariants`). Centralized so every occurrence stays in sync
 * instead of drifting — this exact string was previously retyped
 * verbatim across half a dozen components.
 *
 * `FOCUS_RING_ON_SECONDARY` is the same ring with its offset color
 * swapped for elements that sit on the footer's `bg-brand-secondary`
 * surface, where the default offset would show the wrong background
 * color in the gap between ring and element.
 */
export const FOCUS_RING =
  "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand-accent-2 focus-visible:ring-offset-2 focus-visible:ring-offset-brand";

export const FOCUS_RING_ON_SECONDARY =
  "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand-accent-2 focus-visible:ring-offset-2 focus-visible:ring-offset-brand-secondary";

/**
 * Base card surface (border + radius + tinted background) shared by
 * every feature/industry/tech card across the site. Callers append
 * their own padding and hover treatment — the color/border/radius
 * triple is the part that previously had to be edited in five places
 * at once, now centralized here.
 */
export const cardSurfaceClass = "rounded-xl border border-brand-border bg-brand-secondary/60";

/**
 * Shared hover "depth" treatment for card surfaces sitewide — a slight
 * lift plus a soft cyan-tinted glow, matching the feel already used on
 * the portfolio mockup cards. Append after `cardSurfaceClass` (and any
 * per-card padding) so cards read as touchable, not just decorated
 * rectangles, when the pointer is over them.
 */
export const cardHoverGlowClass =
  "transition-all duration-300 hover:-translate-y-1 hover:border-brand-accent-2/40 hover:shadow-[0_20px_45px_-28px_rgba(34,211,238,0.35)]";
