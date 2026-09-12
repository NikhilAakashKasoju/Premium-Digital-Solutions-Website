import Link from "next/link";

import { siteConfig } from "@/config/site";
import { Container } from "@/components/layout/container";
import { NavLinks } from "@/components/layout/nav-links";

/**
 * Temporary placeholder navbar for Phase 0.
 *
 * Server component: no interactivity yet (mobile menu, scroll state,
 * etc. will be added when the real navigation is built).
 */
export function Navbar() {
  return (
    <header className="sticky top-0 z-50 border-b border-brand-border/80 bg-brand/85 backdrop-blur supports-[backdrop-filter]:bg-brand/70">
      <Container className="flex h-16 items-center justify-between lg:h-20">
        <Link
          href="/"
          className="text-base font-semibold tracking-tight text-brand-foreground lg:text-lg"
        >
          {siteConfig.name}
        </Link>

        <NavLinks className="hidden items-center gap-8 md:flex" aria-label="Primary" />

        <Link
          href="/contact"
          className="inline-flex rounded-md bg-brand-accent px-4 py-2 text-sm font-medium text-brand-foreground transition-opacity hover:opacity-90"
        >
          Start a project
        </Link>
      </Container>
    </header>
  );
}
