"use client";

import { useEffect, useRef, useState } from "react";
import { AnimatePresence, motion, useInView, useReducedMotion } from "framer-motion";

import { cn } from "@/lib/utils";
import type { ChatMessage } from "@/lib/preview-types";

const TYPING_DURATION_MS = 550;
const MESSAGE_GAP_MS = 450;

/**
 * Renders a scripted two-party conversation as chat bubbles, revealing
 * one message at a time (with a brief "typing" indicator before each
 * assistant reply) the first time it scrolls into view — rather than
 * all bubbles appearing pre-filled — so the chat demo reads as a
 * conversation happening, not a screenshot. Shared by the interactive
 * configurator's "AI Chatbot" preview (configurator-preview.tsx) and
 * the homepage AI section's demo (ai-demo-preview.tsx).
 *
 * Server-rendered (and first client-render, pre-hydration) markup
 * always shows zero messages — see hero-visual.tsx's FloatCard for why
 * branching initial render on `useReducedMotion()` is unsafe (it
 * resolves to `null` until after mount, so doing so would make server
 * and client markup disagree). Reduced-motion users just get every
 * message at once from the very next effect tick instead of a staged
 * reveal — still a post-hydration, client-only change.
 */
export function PreviewChat({ messages }: { messages: readonly ChatMessage[] }) {
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true, margin: "-60px" });
  const reducedMotion = useReducedMotion();
  const [visibleCount, setVisibleCount] = useState(0);
  const [typing, setTyping] = useState(false);

  useEffect(() => {
    if (!inView || visibleCount >= messages.length) return;

    if (reducedMotion) {
      const timer = setTimeout(() => setVisibleCount(messages.length), 0);
      return () => clearTimeout(timer);
    }

    const nextIsAssistant = messages[visibleCount].from === "assistant";

    // Two ticks rather than one (start typing, *then* — once `typing` is
    // true — schedule the reveal) so every setState call below happens
    // inside a setTimeout callback rather than synchronously in the
    // effect body itself, which React's exhaustive-deps linting flags
    // as a cascading-render risk otherwise.
    if (nextIsAssistant && !typing) {
      const startTyping = setTimeout(() => setTyping(true), 0);
      return () => clearTimeout(startTyping);
    }

    if (nextIsAssistant && typing) {
      const timer = setTimeout(() => {
        setTyping(false);
        setVisibleCount((c) => c + 1);
      }, TYPING_DURATION_MS);
      return () => clearTimeout(timer);
    }

    if (!nextIsAssistant) {
      const timer = setTimeout(() => setVisibleCount((c) => c + 1), MESSAGE_GAP_MS);
      return () => clearTimeout(timer);
    }
  }, [inView, visibleCount, typing, messages, reducedMotion]);

  return (
    <div ref={ref} className="space-y-2.5">
      <AnimatePresence initial={false}>
        {messages.slice(0, visibleCount).map((message, i) => (
          <motion.div
            key={i}
            initial={{ opacity: 0, y: 8 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.25, ease: "easeOut" }}
            className={cn("flex", message.from === "user" ? "justify-end" : "justify-start")}
          >
            <p
              className={cn(
                "max-w-[80%] rounded-lg px-3 py-2 text-xs leading-relaxed",
                message.from === "user"
                  ? "bg-brand-accent-button text-brand-foreground"
                  : "border border-brand-border text-brand-muted",
              )}
            >
              {message.text}
            </p>
          </motion.div>
        ))}

        {typing && (
          <motion.div
            key="typing-indicator"
            initial={{ opacity: 0, y: 8 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.2, ease: "easeOut" }}
            className="flex justify-start"
          >
            <span className="flex items-center gap-1 rounded-lg border border-brand-border px-3 py-2.5" aria-hidden>
              <TypingDot delay={0} />
              <TypingDot delay={0.15} />
              <TypingDot delay={0.3} />
            </span>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

function TypingDot({ delay }: { delay: number }) {
  return (
    <motion.span
      className="size-1.5 rounded-full bg-brand-muted"
      animate={{ opacity: [0.3, 1, 0.3] }}
      transition={{ duration: 1, repeat: Infinity, delay, ease: "easeInOut" }}
    />
  );
}
