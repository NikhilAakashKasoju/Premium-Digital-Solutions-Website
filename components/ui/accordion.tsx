"use client";

import { useId, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { ChevronDown } from "lucide-react";

import { cn, FOCUS_RING } from "@/lib/utils";

export type AccordionItem = {
  question: string;
  answer: string;
};

/**
 * Single-open accessible accordion (built for the FAQ section, generic
 * enough to reuse anywhere else a question/answer list is needed).
 *
 * Follows the standard accordion pattern: each trigger is a real
 * `<button>` — native keyboard and focus support, no key-handling
 * reimplemented — wrapped in an `<h3>`, with `aria-expanded` and
 * `aria-controls` pointing at its panel, and the panel itself carries
 * `role="region"` + `aria-labelledby` back to the trigger. Only one
 * panel is open at a time, which matches how most FAQ lists are read.
 */
export function Accordion({ items, className }: { items: readonly AccordionItem[]; className?: string }) {
  const [openIndex, setOpenIndex] = useState<number | null>(0);
  const baseId = useId();

  return (
    <div
      className={cn(
        "divide-y divide-brand-border rounded-xl border border-brand-border bg-brand-secondary/60",
        className,
      )}
    >
      {items.map((item, index) => {
        const isOpen = openIndex === index;
        const triggerId = `${baseId}-trigger-${index}`;
        const panelId = `${baseId}-panel-${index}`;

        return (
          <div key={item.question}>
            <h3>
              <button
                type="button"
                id={triggerId}
                aria-expanded={isOpen}
                aria-controls={panelId}
                onClick={() => setOpenIndex(isOpen ? null : index)}
                className={cn(
                  "flex w-full items-center justify-between gap-4 px-5 py-5 text-left text-sm font-medium text-brand-foreground transition-colors hover:text-brand-accent-2 sm:px-6 sm:text-base",
                  FOCUS_RING,
                )}
              >
                <span>{item.question}</span>
                <ChevronDown
                  className={cn(
                    "size-4 shrink-0 text-brand-muted transition-transform duration-300",
                    isOpen && "rotate-180 text-brand-accent-2",
                  )}
                  aria-hidden
                />
              </button>
            </h3>

            <AnimatePresence initial={false}>
              {isOpen && (
                <motion.div
                  id={panelId}
                  role="region"
                  aria-labelledby={triggerId}
                  initial={{ height: 0, opacity: 0 }}
                  animate={{ height: "auto", opacity: 1 }}
                  exit={{ height: 0, opacity: 0 }}
                  transition={{ duration: 0.25, ease: "easeInOut" }}
                  className="overflow-hidden"
                >
                  <p className="px-5 pb-5 text-sm leading-relaxed text-brand-muted sm:px-6">{item.answer}</p>
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        );
      })}
    </div>
  );
}
