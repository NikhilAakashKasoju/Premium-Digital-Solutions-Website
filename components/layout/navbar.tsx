"use client";

import { useEffect, useId, useState } from "react";
import Link from "next/link";
import { Menu, X } from "lucide-react";

import { siteConfig } from "@/config/site";
import { cn } from "@/lib/utils";
import { Container } from "@/components/layout/container";
import { NavLinks } from "@/components/layout/nav-links";
import { MobileNav } from "@/components/layout/mobile-nav";
import { buttonVariants } from "@/components/ui/button";

const SCROLL_THRESHOLD = 8;

export function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const menuId = useId();

  // Transparent-over-hero until the page scrolls, then a solid,
  // blurred bar. Read scrollY on mount too, so a refresh mid-page
  // doesn't briefly show the transparent state.
  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > SCROLL_THRESHOLD);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  // Close the mobile menu on Escape and if the viewport grows past
  // the mobile breakpoint (e.g. rotating a tablet to landscape).
  useEffect(() => {
    if (!menuOpen) return;

    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") setMenuOpen(false);
    };
    const onResize = () => {
      if (window.innerWidth >= 1024) setMenuOpen(false);
    };

    window.addEventListener("keydown", onKeyDown);
    window.addEventListener("resize", onResize);
    return () => {
      window.removeEventListener("keydown", onKeyDown);
      window.removeEventListener("resize", onResize);
    };
  }, [menuOpen]);

  // Prevent background scroll while the mobile menu is open.
  useEffect(() => {
    if (!menuOpen) return;
    const { overflow } = document.body.style;
    document.body.style.overflow = "hidden";
    return () => {
      document.body.style.overflow = overflow;
    };
  }, [menuOpen]);

  return (
    <header
      className={cn(
        "sticky top-0 z-50 transition-[background-color,border-color,backdrop-filter] duration-300 ease-out",
        scrolled
          ? "border-b border-brand-border/80 bg-brand/85 backdrop-blur-md supports-[backdrop-filter]:bg-brand/70"
          : "border-b border-transparent bg-transparent",
      )}
    >
      <Container className="flex h-16 items-center justify-between lg:h-20">
        <Link
          href="/"
          className="rounded-sm text-base font-semibold tracking-tight text-brand-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand-accent lg:text-lg"
        >
          {siteConfig.name}
        </Link>

        <NavLinks className="hidden items-center gap-8 lg:flex" aria-label="Primary" />

        <div className="flex items-center gap-2">
          <Link
            href={siteConfig.hero.primaryCta.href}
            prefetch={false}
            className={cn(buttonVariants({ size: "sm" }), "hidden lg:inline-flex")}
          >
            {siteConfig.hero.primaryCta.label}
          </Link>

          <button
            type="button"
            aria-expanded={menuOpen}
            aria-controls={menuId}
            aria-label={menuOpen ? "Close menu" : "Open menu"}
            onClick={() => setMenuOpen((value) => !value)}
            className="inline-flex items-center justify-center rounded-md p-2 text-brand-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand-accent-2 lg:hidden"
          >
            {menuOpen ? <X className="size-6" aria-hidden /> : <Menu className="size-6" aria-hidden />}
          </button>
        </div>
      </Container>

      <MobileNav id={menuId} open={menuOpen} nav={siteConfig.nav} onNavigate={() => setMenuOpen(false)} />
    </header>
  );
}
