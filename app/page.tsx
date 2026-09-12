import { siteConfig } from "@/config/site";
import { Container } from "@/components/layout/container";
import { Section } from "@/components/layout/section";

const STACK_BADGES = [
  "Next.js + App Router",
  "TypeScript",
  "Tailwind CSS",
  "shadcn/ui",
  "Framer Motion",
] as const;

/**
 * Temporary Phase 0 placeholder.
 *
 * This exists only to prove the layout, design tokens and typography
 * scale render correctly end to end. The real homepage sections
 * (hero, services, proof, CTA, etc.) are built in a later phase.
 */
export default function Home() {
  return (
    <Section className="flex min-h-[calc(100vh-4rem)] items-center lg:min-h-[calc(100vh-5rem)]">
      <Container>
        <p className="text-sm font-medium tracking-wide text-brand-accent-2 uppercase">
          Foundation — Phase 0
        </p>

        <h1 className="mt-6 max-w-3xl text-h1 font-semibold text-balance text-brand-foreground lg:text-display">
          {siteConfig.tagline}
        </h1>

        <p className="mt-6 max-w-2xl text-lead text-brand-muted">
          {siteConfig.description}
        </p>

        <div className="mt-10 flex flex-wrap gap-4 text-sm text-brand-muted">
          {STACK_BADGES.map((label) => (
            <span key={label} className="rounded-full border border-brand-border px-4 py-2">
              {label}
            </span>
          ))}
        </div>
      </Container>
    </Section>
  );
}
