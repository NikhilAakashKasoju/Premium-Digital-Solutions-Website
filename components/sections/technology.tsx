import { siteConfig } from "@/config/site";
import { cardSurfaceClass, cn } from "@/lib/utils";
import { Container } from "@/components/layout/container";
import { Section } from "@/components/layout/section";
import { SectionHeading } from "@/components/layout/section-heading";

/**
 * "Our Technology" ecosystem: categorized chips, not a logo wall — no
 * brand marks, just the names, grouped so the stack reads as a
 * considered system rather than a badge grid. Static markup only, so
 * this stays a Server Component.
 */
export function Technology() {
  return (
    <Section>
      <Container>
        <SectionHeading
          title="Our Technology"
          description="A modern, production-grade stack chosen for speed, reliability and room to grow."
        />

        <div className="mt-12 grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-5 lg:gap-6">
          {siteConfig.technology.map((category) => (
            <div key={category.label} className={cn(cardSurfaceClass, "p-5")}>
              <h3 className="text-xs font-semibold tracking-wide text-brand-accent-2 uppercase">
                {category.label}
              </h3>

              <ul className="mt-4 flex flex-wrap gap-2">
                {category.items.map((item) => (
                  <li
                    key={item}
                    className="rounded-full border border-brand-border/80 bg-brand/40 px-3 py-1.5 text-xs font-medium text-brand-foreground"
                  >
                    {item}
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      </Container>
    </Section>
  );
}
