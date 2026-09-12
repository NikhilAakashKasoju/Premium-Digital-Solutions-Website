import type { ReactNode } from "react";

import { cn } from "@/lib/utils";

/**
 * The "device window" chrome (traffic-light dots + title bar) that
 * every illustrative product mockup renders inside — the configurator
 * preview and every portfolio project preview share this exact shell,
 * so it exists once instead of being copy-pasted per preview.
 */
export function WindowFrame({
  title,
  className,
  children,
}: {
  title: string;
  className?: string;
  children: ReactNode;
}) {
  return (
    <div
      className={cn(
        "relative flex h-full flex-col rounded-xl border border-brand-border bg-brand-secondary/60 p-5",
        className,
      )}
    >
      <div className="flex items-center gap-2 border-b border-brand-border pb-4">
        <span className="flex gap-1.5" aria-hidden>
          <span className="size-2.5 rounded-full bg-brand-border" />
          <span className="size-2.5 rounded-full bg-brand-border" />
          <span className="size-2.5 rounded-full bg-brand-border" />
        </span>
        <span className="ml-2 text-xs font-medium text-brand-muted">{title}</span>
      </div>

      {children}
    </div>
  );
}
