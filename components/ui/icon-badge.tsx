import type { LucideIcon } from "lucide-react";

/**
 * The size-11 rounded accent icon badge that opens every feature card
 * across the site (What We Build, Why Choose Us, Built for Different
 * Businesses) — same markup and classes each time, so it exists once
 * instead of being retyped per section.
 */
export function IconBadge({ icon: Icon }: { icon: LucideIcon }) {
  return (
    <span className="flex size-11 items-center justify-center rounded-lg bg-brand-accent/15 text-brand-accent-2">
      <Icon className="size-5" aria-hidden />
    </span>
  );
}
