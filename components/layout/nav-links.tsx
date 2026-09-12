import Link from "next/link";

import { siteConfig, type NavLink } from "@/config/site";

type NavLinksProps = {
  className?: string;
  /** Accessible name for this landmark — required since the page renders more than one <nav>. */
  "aria-label": string;
  /** Link list to render. Defaults to `siteConfig.nav` (the header); pass `siteConfig.footerNav` for the footer's distinct list. */
  items?: readonly NavLink[];
};

/**
 * Renders a list of nav links (defaulting to `siteConfig.nav`).
 *
 * Shared by the header and footer so the link markup and its focus/hover
 * styling only exist once; each caller controls layout via `className`
 * and can pass a different `items` list.
 */
export function NavLinks({ className, "aria-label": ariaLabel, items = siteConfig.nav }: NavLinksProps) {
  return (
    <nav className={className} aria-label={ariaLabel}>
      {items.map((item) => (
        <Link
          key={item.href}
          href={item.href}
          // Placeholder routes (future pages that don't exist yet) shouldn't
          // be prefetched — that just spams 404s in the console every time
          // a link scrolls into view. Harmless for the real "#anchor" links too.
          prefetch={false}
          className="rounded-sm text-sm text-brand-muted transition-colors hover:text-brand-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand-accent-2 focus-visible:ring-offset-2 focus-visible:ring-offset-brand"
        >
          {item.label}
        </Link>
      ))}
    </nav>
  );
}
