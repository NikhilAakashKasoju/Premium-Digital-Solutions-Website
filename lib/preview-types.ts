/**
 * Shared types for the small illustrative "product mockup" UI used in
 * both the interactive configurator (config/configurator-data.ts) and
 * the portfolio case studies (config/portfolio.ts). Living here — not
 * duplicated in each config file — means the one shape that both
 * genuinely share in both data AND rendering (a day-grouped calendar
 * of time slots) has a single definition and a single renderer
 * (see components/sections/preview-calendar.tsx).
 */
export type CalendarSlot = {
  day: string;
  time: string;
  selected?: boolean;
};

/**
 * A single turn in a scripted two-party conversation. Shared by the
 * interactive configurator's "AI Chatbot" preview and the homepage AI
 * section's demo (see components/sections/preview-chat.tsx) — one
 * shape and one renderer for both.
 */
export type ChatMessage = {
  from: "user" | "assistant";
  text: string;
};
