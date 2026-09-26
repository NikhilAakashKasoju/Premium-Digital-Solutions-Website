"use client";

import { useEffect, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { MessageCircle } from "lucide-react";

import { cn, FOCUS_RING } from "@/lib/utils";

const SHOW_AFTER_PX = 480;

/**
 * Mobile-only floating "Get in touch" pill. It stays out of the way
 * while someone is still reading the page, and disappears once the
 * Contact section itself scrolls into view — there's no reason to
 * float a "jump to contact" shortcut over the contact form the user
 * has already reached.
 *
 * Visibility is driven by two independent signals: a scroll-position
 * check (don't show it over the hero) and an IntersectionObserver on
 * `#contact` (don't show it once that section is on screen). Desktop
 * already has a persistent CTA in the navbar, so this renders `lg:hidden`.
 */
export function MobileStickyCta() {
  const [pastHero, setPastHero] = useState(false);
  const [contactInView, setContactInView] = useState(false);

  useEffect(() => {
    const onScroll = () => setPastHero(window.scrollY > SHOW_AFTER_PX);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    const contactSection = document.getElementById("contact");
    if (!contactSection) return;

    const observer = new IntersectionObserver(
      ([entry]) => setContactInView(entry.isIntersecting),
      { rootMargin: "0px 0px -10% 0px" },
    );

    observer.observe(contactSection);
    return () => observer.disconnect();
  }, []);

  const visible = pastHero && !contactInView;

  return (
    <div className="pointer-events-none fixed inset-x-0 bottom-4 z-40 flex justify-center px-4 lg:hidden">
      <AnimatePresence>
        {visible && (
          <motion.a
            href="#contact"
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 16 }}
            transition={{ duration: 0.25, ease: "easeOut" }}
            className={cn(
              "pointer-events-auto inline-flex items-center gap-2 rounded-full bg-brand-accent-button px-5 py-3 text-sm font-semibold text-brand-foreground shadow-[0_16px_40px_-16px_rgba(99,91,255,0.6)] transition-transform active:scale-95",
              FOCUS_RING,
            )}
          >
            <MessageCircle className="size-4" aria-hidden />
            Get in touch
          </motion.a>
        )}
      </AnimatePresence>
    </div>
  );
}
