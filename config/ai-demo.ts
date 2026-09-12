/**
 * Data for the homepage "Make Your Website Work Smarter" AI section.
 *
 * MOCK DATA / DEMO ONLY — `AI_DEMO_CONVERSATION` is a scripted exchange
 * and `AI_DEMO_LEAD` is a scripted captured lead, not a live AI
 * integration or a real inquiry. Both are shaped so a real
 * implementation can slot in later without touching `AiSection`:
 * `AI_DEMO_CONVERSATION` would become the running message history from
 * an actual assistant (e.g. an OpenAI/RAG-backed endpoint), and
 * `AI_DEMO_LEAD` would become the most recent lead returned by a real
 * lead-capture API/CRM — `ChatMessage` and `CapturedLead` are the
 * contract either side already agrees on.
 */

import type { ChatMessage } from "@/lib/preview-types";

export const AI_DEMO_CONVERSATION: readonly ChatMessage[] = [
  { from: "user", text: "What courses do you offer?" },
  {
    from: "assistant",
    text: "We offer Python, Data Engineering and AI programs. Would you like to explore the courses or speak with a counsellor?",
  },
];

export type CapturedLead = {
  name: string;
  interest: string;
  preferredContact: string;
};

export const AI_DEMO_LEAD: CapturedLead = {
  name: "Rahul",
  interest: "AI Course",
  preferredContact: "WhatsApp",
};
