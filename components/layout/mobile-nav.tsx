"use client";

import Link from "next/link";
import { AnimatePresence, motion } from "framer-motion";

import { siteConfig, type NavLink } from "@/config/site";
import { cn } from "@/lib/utils";
import { buttonVariants } from "@/components/ui/button";

const panelVariants = {
  closed: { opacity: 0, y: -8, transition: { duration: 0.15, ease: "easeIn" as const } },
  open: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.2, ease: "easeOut" as const, staggerChildren: 0.04, delayChildren: 0.05 },
  },
};

const itemVariants = {
  closed: { opacity: 0, y: -6 },
  open: { opacity: 1, y: 0 },
};

type MobileNavProps = {
  id: string;
  open: boolean;
  nav: readonly NavLink[];
  onNavigate: () => void;
};

/**
 * Slide/fade mobile menu panel. Split out from Navbar so the
 * animation variants and the (fairly large) markup don't live inline
 * in the header component.
 */
export function MobileNav({ id, open, nav, onNavigate }: MobileNavProps) {
  return (
    <AnimatePresence>
      {open && (
        <motion.div
          id={id}
          initial="closed"
          animate="open"
          exit="closed"
          variants={panelVariants}
          className="border-b border-brand-border bg-brand lg:hidden"
        >
          <nav aria-label="Mobile" className="mx-auto flex w-full max-w-7xl flex-col gap-1 px-6 py-4">
            {nav.map((item) => (
              <motion.div key={item.href} variants={itemVariants}>
                <Link
                  href={item.href}
                  onClick={onNavigate}
                  prefetch={false}
                  className="block rounded-md px-3 py-3 text-base text-brand-muted transition-colors hover:bg-brand-secondary hover:text-brand-foreground"
                >
                  {item.label}
                </Link>
              </motion.div>
            ))}

            <motion.div variants={itemVariants} className="mt-2">
              <Link
                href={siteConfig.hero.primaryCta.href}
                onClick={onNavigate}
                prefetch={false}
                className={cn(buttonVariants({ size: "lg" }), "w-full")}
              >
                {siteConfig.hero.primaryCta.label}
              </Link>
            </motion.div>
          </nav>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
