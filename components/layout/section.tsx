import type { HTMLAttributes } from "react";

import { cn } from "@/lib/utils";

type SectionProps = HTMLAttributes<HTMLElement> & {
  /** Reduce the vertical rhythm for tighter sections (e.g. sub-hero band). */
  compact?: boolean;
};

/**
 * Vertical rhythm wrapper for full-width page sections. Pairs with
 * `Container` for the horizontal max-width:
 *
 *   <Section><Container>...</Container></Section>
 */
export function Section({ compact = false, className, children, ...props }: SectionProps) {
  return (
    <section
      className={cn(compact ? "py-section-sm" : "py-section", className)}
      {...props}
    >
      {children}
    </section>
  );
}
