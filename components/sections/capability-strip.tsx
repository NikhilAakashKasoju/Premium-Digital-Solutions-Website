import { siteConfig } from "@/config/site";
import { Container } from "@/components/layout/container";

/**
 * Scrolling capability tags directly under the hero.
 *
 * Pure CSS marquee — no client JS needed. The real content is listed
 * once (visually hidden) for assistive tech; the animated, duplicated
 * track is `aria-hidden` so screen readers don't hear it twice.
 */
export function CapabilityStrip() {
  const items = siteConfig.capabilities;

  return (
    <div className="border-y border-brand-border bg-brand-secondary/40 py-6">
      <Container>
        <ul className="sr-only">
          {items.map((item) => (
            <li key={item}>{item}</li>
          ))}
        </ul>

        <div className="relative overflow-hidden [mask-image:linear-gradient(to_right,transparent,black_8%,black_92%,transparent)]">
          <div
            aria-hidden
            className="flex w-max items-center gap-10 animate-marquee hover:[animation-play-state:paused] motion-reduce:animate-none"
          >
            {[...items, ...items].map((item, index) => (
              <span key={`${item}-${index}`} className="flex shrink-0 items-center gap-10">
                <span className="text-sm font-medium tracking-widest text-brand-muted uppercase">
                  {item}
                </span>
                <span className="size-1 shrink-0 rounded-full bg-brand-border" aria-hidden />
              </span>
            ))}
          </div>
        </div>
      </Container>
    </div>
  );
}
