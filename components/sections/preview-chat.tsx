import { cn } from "@/lib/utils";
import type { ChatMessage } from "@/lib/preview-types";

/**
 * Renders a scripted two-party conversation as chat bubbles. Shared by
 * the interactive configurator's "AI Chatbot" preview
 * (configurator-preview.tsx) and the homepage AI section's demo
 * (ai-section.tsx), so the one bubble treatment both use lives in a
 * single place instead of being copy-pasted per section.
 */
export function PreviewChat({ messages }: { messages: readonly ChatMessage[] }) {
  return (
    <div className="space-y-2.5">
      {messages.map((message, i) => (
        <div key={i} className={cn("flex", message.from === "user" ? "justify-end" : "justify-start")}>
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
        </div>
      ))}
    </div>
  );
}
