import Link from "next/link";

import { siteConfig } from "@/config/site";

type NavLinksProps = {
  className?: string;
  /** Accessible name for this landmark — required since the page renders more than one <nav>. */
  "aria-label": string;
};

/**
 * Renders the site's primary nav links from `siteConfig.nav`.
 *
 * Shared by the header and footer so the link list and its markup
 * only exist once; each caller controls its own layout via `className`.
 */
export function NavLinks({ className, "aria-label": ariaLabel }: NavLinksProps) {
  return (
    <nav className={className} aria-label={ariaLabel}>
      {siteConfig.nav.map((item) => (
        <Link
          key={item.href}
          href={item.href}
          // These routes don't exist yet (later phases build them out), so
          // don't let Next.js prefetch them — that just spams 404s in the
          // console every time a link scrolls into view.
          prefetch={false}
          className="text-sm text-brand-muted transition-colors hover:text-brand-foreground"
        >
          {item.label}
        </Link>
      ))}
    </nav>
  );
}
