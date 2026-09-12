import type { ElementType, HTMLAttributes } from "react";

import { cn } from "@/lib/utils";

type ContainerProps = HTMLAttributes<HTMLDivElement> & {
  /** Render as a different element, e.g. "section" or "header". */
  as?: ElementType;
};

/**
 * Horizontally centered content wrapper with the site's max content
 * width and responsive side padding. Use this instead of repeating
 * `max-w-*` / `px-*` classes across sections.
 */
export function Container({ as: Tag = "div", className, children, ...props }: ContainerProps) {
  return (
    <Tag className={cn("mx-auto w-full max-w-7xl px-6 lg:px-8", className)} {...props}>
      {children}
    </Tag>
  );
}
