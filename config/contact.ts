/**
 * Configuration for the "Have an Idea? Let's Build It." contact form.
 *
 * The option lists live here (not hard-coded in the component) so they
 * can be edited without touching markup, and `LeadPayload` is the one
 * shape the form, its validation and the eventual `/api/leads`
 * endpoint all agree on — see lib/submit-lead.ts for how that
 * endpoint slots in later.
 */

export const PROJECT_NEED_OPTIONS = [
  "Website",
  "E-commerce",
  "Web Application",
  "Business Software",
  "AI Automation",
  "Website Redesign",
  "Other",
] as const;

export type ProjectNeed = (typeof PROJECT_NEED_OPTIONS)[number];

export const BUDGET_OPTIONS = [
  "Under ₹25K",
  "₹25K–₹50K",
  "₹50K–₹1L",
  "₹1L–₹3L",
  "₹3L+",
  "Not sure",
] as const;

export type Budget = (typeof BUDGET_OPTIONS)[number];

/**
 * The full shape of a submitted lead — what the form hands to
 * `submitLead` today, and what a real `POST /api/leads` endpoint
 * should accept as its JSON body later.
 */
export type LeadPayload = {
  name: string;
  company: string;
  email: string;
  phone: string;
  industry: string;
  need: ProjectNeed | "";
  budget: Budget | "";
  message: string;
};

export const EMPTY_LEAD: LeadPayload = {
  name: "",
  company: "",
  email: "",
  phone: "",
  industry: "",
  need: "",
  budget: "",
  message: "",
};
