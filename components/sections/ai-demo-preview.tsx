"use client";

import { CheckCircle2 } from "lucide-react";
import { motion } from "framer-motion";

import { AI_DEMO_CONVERSATION, AI_DEMO_LEAD } from "@/config/ai-demo";
import { fadeUpItem, staggerContainer } from "@/lib/motion";
import { WindowFrame } from "@/components/ui/window-frame";
import { PreviewChat } from "@/components/sections/preview-chat";

const container = staggerContainer(0.15);

/**
 * The animated half of the "Make Your Website Work Smarter" section —
 * split out from AiSection so that component's static copy (heading,
 * paragraph, CTA) can stay a Server Component; only this scripted demo
 * preview needs the client runtime for its scroll-reveal animation.
 */
export function AiDemoPreview() {
  return (
    <motion.div initial="hidden" whileInView="visible" viewport={{ once: true, margin: "-80px" }} variants={container}>
      <motion.div variants={fadeUpItem}>
        <span className="mb-3 flex w-fit items-center rounded-full border border-brand-accent-2/40 bg-brand-accent-2/10 px-2.5 py-1 text-[11px] font-semibold tracking-wide text-brand-accent-2 uppercase">
          Demo preview
        </span>

        <WindowFrame title="AI Assistant">
          <div className="pt-5">
            <PreviewChat messages={AI_DEMO_CONVERSATION} />
          </div>
        </WindowFrame>
      </motion.div>

      <motion.div variants={fadeUpItem} className="mt-5 rounded-xl border border-brand-border bg-brand-secondary/60 p-5">
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
  );
}
