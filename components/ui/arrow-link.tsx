import type { ReactNode } from "react";
import Link from "next/link";
import { ArrowRight } from "lucide-react";

import { cn, FOCUS_RING } from "@/lib/utils";

/**
 * The small "label + arrow" text link repeated at the end of every card
 * across the site (What We Build, Industries) — same markup, hover and
 * focus treatment each time, so it exists once instead of being
 * retyped per section. Not used by project-card.tsx, which needs a
 * *named* `group/cta` (it nests inside the card's own `group`) rather
 * than this component's plain `group`.
 */
export function ArrowLink({
  href,
  children,
  className,
}: {
  href: string;
  children: ReactNode;
  className?: string;
}) {
  return (
    <Link
      href={href}
      prefetch={false}
      className={cn(
        "group inline-flex items-center gap-1.5 rounded-sm text-sm font-medium text-brand-accent-2 transition-opacity hover:opacity-80",
        FOCUS_RING,
        className,
      )}
    >
      {children}
      <ArrowRight className="size-4 transition-transform group-hover:translate-x-0.5" aria-hidden />
    </Link>
  );
}
