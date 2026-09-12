import Link from "next/link";

import { buttonVariants } from "@/components/ui/button";
import { Container } from "@/components/layout/container";
import { Section } from "@/components/layout/section";
import { SectionHeading } from "@/components/layout/section-heading";
import { AiDemoPreview } from "@/components/sections/ai-demo-preview";

/**
 * "Make Your Website Work Smarter" AI section: copy + CTA on one side,
 * a scripted demo (chat exchange -> captured lead) on the other. The
 * demo (AiDemoPreview) is a separate Client Component so this static
 * copy — the actual bulk of the section — can render as a Server
 * Component and ship no client JS of its own.
 */
export function AiSection() {
  return (
    <Section>
      <Container>
        <div className="grid grid-cols-1 gap-12 lg:grid-cols-2 lg:items-center lg:gap-16">
          <div>
            <SectionHeading
              title="Make Your Website Work Smarter."
              description="Turn your website into an intelligent business assistant."
            />

            <p className="mt-6 text-sm text-brand-muted">
              Instead of visitors leaving unanswered, an AI assistant on your site answers their
              questions instantly and hands you a qualified lead — name, interest and preferred
              contact method — ready for your team to follow up on.
            </p>

            <Link href="#contact" prefetch={false} className={buttonVariants({ size: "lg", className: "mt-8" })}>
              Build an AI-Powered Solution
            </Link>
          </div>

          <AiDemoPreview />
        </div>
      </Container>
    </Section>
  );
}
