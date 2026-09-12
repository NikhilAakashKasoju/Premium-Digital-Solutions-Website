import type { LeadPayload } from "@/config/contact";

export type SubmitLeadResult = { ok: true } | { ok: false; message: string };

/**
 * Submits a captured lead from the contact form.
 *
 * MOCK — no backend exists yet, per the brief ("do not connect a
 * backend yet"). This behaves like a real request (a short delay, then
 * a result) so the form's loading/success/error states are genuinely
 * exercised today, not just styled. `LeadPayload` is already the exact
 * shape a real endpoint should accept, so wiring one up later is a
 * change to this function's body only — nothing in the form component
 * needs to change:
 *
 *   const res = await fetch("/api/leads", {
 *     method: "POST",
 *     headers: { "Content-Type": "application/json" },
 *     body: JSON.stringify(payload),
 *   });
 *   if (!res.ok) return { ok: false, message: "Something went wrong. Please try again." };
 *   return { ok: true };
 */
export async function submitLead(payload: LeadPayload): Promise<SubmitLeadResult> {
  await new Promise((resolve) => setTimeout(resolve, 1100));

  // Defensive re-check so the "error" branch is a real, reachable code
  // path today (not just a UI state that's never actually hit) — the
  // same guard a real endpoint would apply server-side.
  if (!payload.name.trim() || !payload.email.trim() || !payload.message.trim()) {
    return { ok: false, message: "Something went wrong submitting your message. Please try again." };
  }

  return { ok: true };
}
