"use client";

import Link from "next/link";
import { motion, type Variants } from "framer-motion";
import { CheckCircle2 } from "lucide-react";

import { AI_DEMO_CONVERSATION, AI_DEMO_LEAD } from "@/config/ai-demo";
import { buttonVariants } from "@/components/ui/button";
import { WindowFrame } from "@/components/ui/window-frame";
import { Container } from "@/components/layout/container";
import { Section } from "@/components/layout/section";
import { SectionHeading } from "@/components/layout/section-heading";
import { PreviewChat } from "@/components/sections/preview-chat";

const container: Variants = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.15 } },
};

const item: Variants = {
  hidden: { opacity: 0, y: 20 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.5, ease: "easeOut" } },
};

/**
 * "Make Your Website Work Smarter" AI section: copy + CTA on one side,
 * a scripted demo (chat exchange -> captured lead) on the other. The
 * conversation and lead are DEMO DATA (see config/ai-demo.ts) — an
 * honest "Demo preview" label says so rather than implying a live
 * assistant is embedded on this page.
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

          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-80px" }}
            variants={container}
          >
            <motion.div variants={item}>
              <span className="mb-3 flex w-fit items-center rounded-full border border-brand-accent-2/40 bg-brand-accent-2/10 px-2.5 py-1 text-[11px] font-semibold tracking-wide text-brand-accent-2 uppercase">
                Demo preview
              </span>

              <WindowFrame title="AI Assistant">
                <div className="pt-5">
                  <PreviewChat messages={AI_DEMO_CONVERSATION} />
                </div>
              </WindowFrame>
            </motion.div>

            <motion.div
              variants={item}
              className="mt-5 rounded-xl border border-brand-border bg-brand-secondary/60 p-5"
            >
              <div className="flex items-center gap-2 text-sm font-semibold text-brand-accent-2">
                <CheckCircle2 className="size-4" aria-hidden />
                Lead Captured
              </div>

              <dl className="mt-4 space-y-2 text-sm">
                <div className="flex items-center justify-between gap-4">
                  <dt className="text-brand-muted">Name</dt>
                  <dd className="font-medium text-brand-foreground">{AI_DEMO_LEAD.name}</dd>
                </div>
                <div className="flex items-center justify-between gap-4">
                  <dt className="text-brand-muted">Interest</dt>
                  <dd className="font-medium text-brand-foreground">{AI_DEMO_LEAD.interest}</dd>
                </div>
                <div className="flex items-center justify-between gap-4">
                  <dt className="text-brand-muted">Preferred Contact</dt>
                  <dd className="font-medium text-brand-foreground">{AI_DEMO_LEAD.preferredContact}</dd>
                </div>
              </dl>
            </motion.div>
          </motion.div>
        </div>
      </Container>
    </Section>
  );
}
