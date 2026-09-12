import type { ButtonHTMLAttributes } from "react";
import { cva, type VariantProps } from "class-variance-authority";

import { cn, FOCUS_RING } from "@/lib/utils";

/**
 * Shared button/CTA styling, as a shadcn-style `cva` variant map.
 *
 * This is consumed two ways: as `<Button>` for a real `<button>`
 * element, and as `buttonVariants({...})` to give a `next/link`
 * (or any other element) the exact same look — every CTA across the
 * navbar, mobile menu and hero shares this one definition instead of
 * each re-typing the same Tailwind classes with small drifts.
 */
export const buttonVariants = cva(
  cn(
    "inline-flex items-center justify-center gap-2 rounded-md font-medium transition-colors disabled:pointer-events-none disabled:opacity-50",
    FOCUS_RING,
  ),
  {
    variants: {
      variant: {
        primary: "bg-brand-accent-button text-brand-foreground hover:opacity-90",
        outline: "border border-brand-border text-brand-foreground hover:border-brand-muted",
      },
      size: {
        sm: "px-4 py-2 text-sm",
        md: "px-6 py-3 text-sm",
        lg: "px-4 py-3 text-base",
      },
    },
    defaultVariants: {
      variant: "primary",
      size: "md",
    },
  },
);

type ButtonProps = ButtonHTMLAttributes<HTMLButtonElement> & VariantProps<typeof buttonVariants>;

export function Button({ className, variant, size, ...props }: ButtonProps) {
  return <button className={cn(buttonVariants({ variant, size }), className)} {...props} />;
}
