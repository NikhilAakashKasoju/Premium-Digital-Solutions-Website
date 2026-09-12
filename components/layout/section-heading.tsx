import { cn } from "@/lib/utils";

/**
 * The "H2 + supporting lead paragraph" header repeated at the top of
 * every major homepage section (What We Build, the configurator,
 * Selected Work) — same markup and classes each time, so it exists
 * once rather than being retyped per section.
 */
export function SectionHeading({
  title,
  description,
  className,
}: {
  title: string;
  description: string;
  className?: string;
}) {
  return (
    <div className={cn("max-w-2xl", className)}>
      <h2 className="text-h2 font-semibold text-brand-foreground">{title}</h2>
      <p className="mt-4 text-lead text-brand-muted">{description}</p>
    </div>
  );
}
