"use client";

import { useEffect, useId, useRef, useState, type FormEvent } from "react";
import { motion } from "framer-motion";
import { AlertCircle, CheckCircle2, ChevronDown, Clock, Loader2 } from "lucide-react";

import { BUDGET_OPTIONS, EMPTY_LEAD, PROJECT_NEED_OPTIONS, type LeadPayload } from "@/config/contact";
import { submitLead } from "@/lib/submit-lead";
import { cn, FOCUS_RING } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { Container } from "@/components/layout/container";
import { Section } from "@/components/layout/section";
import { SectionHeading } from "@/components/layout/section-heading";

type FormErrors = Partial<Record<keyof LeadPayload, string>>;
type Status = "idle" | "submitting" | "success" | "error";

const EMAIL_PATTERN = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

const inputClass =
  "w-full rounded-md border border-brand-border bg-brand/40 px-3.5 py-2.5 text-sm text-brand-foreground placeholder:text-brand-muted transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand-accent-2";

function validate(values: LeadPayload): FormErrors {
  const errors: FormErrors = {};

  if (!values.name.trim()) errors.name = "Please enter your name.";

  if (!values.email.trim()) errors.email = "Please enter your email address.";
  else if (!EMAIL_PATTERN.test(values.email.trim())) errors.email = "Please enter a valid email address.";

  if (!values.need) errors.need = "Please select what you need.";
  if (!values.budget) errors.budget = "Please select an estimated budget.";

  if (!values.message.trim()) errors.message = "Tell us a little about your project.";
  else if (values.message.trim().length < 10) errors.message = "Please add a few more details (at least 10 characters).";

  return errors;
}

/**
 * "Have an Idea? Let's Build It." contact form.
 *
 * All validation and state (loading / success / error) is real and
 * client-side; submission itself is mocked (see lib/submit-lead.ts) —
 * per the brief, no backend exists yet. The payload shape already
 * matches what a future `POST /api/leads` route should accept, so
 * connecting one later only means changing `submitLead`'s body, not
 * this component.
 */
export function Contact() {
  const [values, setValues] = useState<LeadPayload>(EMPTY_LEAD);
  const [errors, setErrors] = useState<FormErrors>({});
  const [status, setStatus] = useState<Status>("idle");
  const [submitError, setSubmitError] = useState<string | null>(null);
  const formId = useId();
  const successHeadingRef = useRef<HTMLHeadingElement>(null);

  // The success view replaces the whole form (including the submit
  // button the user had focus on) rather than updating in place, so
  // without this the browser would drop focus back to <body> and a
  // keyboard/screen-reader user would get no indication anything
  // happened. Moves focus to the confirmation heading instead — same
  // tabIndex={-1}-target pattern as the skip link in app/layout.tsx.
  useEffect(() => {
    if (status === "success") {
      successHeadingRef.current?.focus();
    }
  }, [status]);

  function updateField<K extends keyof LeadPayload>(field: K, value: LeadPayload[K]) {
    setValues((prev) => ({ ...prev, [field]: value }));
    setErrors((prev) => (prev[field] ? { ...prev, [field]: undefined } : prev));
  }

  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();

    const nextErrors = validate(values);
    setErrors(nextErrors);

    const firstInvalidField = Object.keys(nextErrors)[0];
    if (firstInvalidField) {
      document.getElementById(`${formId}-${firstInvalidField}`)?.focus();
      return;
    }

    setStatus("submitting");
    setSubmitError(null);

    const result = await submitLead(values);

    if (result.ok) {
      setStatus("success");
    } else {
      setStatus("error");
      setSubmitError(result.message);
    }
  }

  function resetForm() {
    setValues(EMPTY_LEAD);
    setErrors({});
    setStatus("idle");
    setSubmitError(null);
  }

  if (status === "success") {
    return (
      <Section id="contact">
        <Container>
          <div className="mx-auto max-w-2xl rounded-xl border border-brand-accent-2/40 bg-brand-secondary/60 p-8 text-center sm:p-12">
            <span className="mx-auto flex size-12 items-center justify-center rounded-full bg-brand-accent-2/15 text-brand-accent-2">
              <CheckCircle2 className="size-6" aria-hidden />
            </span>
            <h2
              ref={successHeadingRef}
              tabIndex={-1}
              className="mt-6 text-h3 font-semibold text-brand-foreground focus:outline-none"
            >
              Message Received
            </h2>
            <p className="mt-3 text-sm text-brand-muted">
              Thanks for reaching out — we typically reply within one business day.
            </p>
            <button
              type="button"
              onClick={resetForm}
              className={cn(
                "mt-6 rounded-sm text-sm font-medium text-brand-accent-2 transition-opacity hover:opacity-80",
                FOCUS_RING,
              )}
            >
              Send another message
            </button>
          </div>
        </Container>
      </Section>
    );
  }

  return (
    <Section id="contact">
      <Container>
        <SectionHeading
          title="Have an Idea? Let's Build It."
          description="Tell us a little about your business and what you're trying to build — we'll get back to you within one business day."
        />

        <motion.form
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-80px" }}
          transition={{ duration: 0.5, ease: "easeOut" }}
          noValidate
          onSubmit={handleSubmit}
          className="mt-12 max-w-3xl rounded-xl border border-brand-border bg-brand-secondary/60 p-6 sm:p-8"
        >
          <div className="grid grid-cols-1 gap-5 sm:grid-cols-2">
            <div>
              <label htmlFor={`${formId}-name`} className="text-sm font-medium text-brand-foreground">
                Name <span aria-hidden className="text-brand-accent-2">*</span>
              </label>
              <input
                id={`${formId}-name`}
                type="text"
                autoComplete="name"
                value={values.name}
                onChange={(e) => updateField("name", e.target.value)}
                aria-required="true"
                aria-invalid={!!errors.name}
                aria-describedby={errors.name ? `${formId}-name-error` : undefined}
                className={cn("mt-2", inputClass, errors.name && "border-destructive")}
              />
              {errors.name && (
                <p id={`${formId}-name-error`} role="alert" className="mt-1.5 text-xs text-destructive">
                  {errors.name}
                </p>
              )}
            </div>

            <div>
              <label htmlFor={`${formId}-company`} className="text-sm font-medium text-brand-foreground">
                Company
              </label>
              <input
                id={`${formId}-company`}
                type="text"
                autoComplete="organization"
                value={values.company}
                onChange={(e) => updateField("company", e.target.value)}
                className={cn("mt-2", inputClass)}
              />
            </div>

            <div>
              <label htmlFor={`${formId}-email`} className="text-sm font-medium text-brand-foreground">
                Email <span aria-hidden className="text-brand-accent-2">*</span>
              </label>
              <input
                id={`${formId}-email`}
                type="email"
                autoComplete="email"
                value={values.email}
                onChange={(e) => updateField("email", e.target.value)}
                aria-required="true"
                aria-invalid={!!errors.email}
                aria-describedby={errors.email ? `${formId}-email-error` : undefined}
                className={cn("mt-2", inputClass, errors.email && "border-destructive")}
              />
              {errors.email && (
                <p id={`${formId}-email-error`} role="alert" className="mt-1.5 text-xs text-destructive">
                  {errors.email}
                </p>
              )}
            </div>

            <div>
              <label htmlFor={`${formId}-phone`} className="text-sm font-medium text-brand-foreground">
                Phone
              </label>
              <input
                id={`${formId}-phone`}
                type="tel"
                autoComplete="tel"
                value={values.phone}
                onChange={(e) => updateField("phone", e.target.value)}
                className={cn("mt-2", inputClass)}
              />
            </div>

            <div className="sm:col-span-2">
              <label htmlFor={`${formId}-industry`} className="text-sm font-medium text-brand-foreground">
                Business / Industry
              </label>
              <input
                id={`${formId}-industry`}
                type="text"
                value={values.industry}
                onChange={(e) => updateField("industry", e.target.value)}
                placeholder="e.g. Healthcare, Real Estate, Retail…"
                className={cn("mt-2", inputClass)}
              />
            </div>

            <div>
              <label htmlFor={`${formId}-need`} className="text-sm font-medium text-brand-foreground">
                What do you need? <span aria-hidden className="text-brand-accent-2">*</span>
              </label>
              <div className="relative mt-2">
                <select
                  id={`${formId}-need`}
                  value={values.need}
                  onChange={(e) => updateField("need", e.target.value as LeadPayload["need"])}
                  aria-required="true"
                  aria-invalid={!!errors.need}
                  aria-describedby={errors.need ? `${formId}-need-error` : undefined}
                  className={cn(inputClass, "appearance-none pr-9", errors.need && "border-destructive")}
                >
                  <option value="" disabled>
                    Select an option
                  </option>
                  {PROJECT_NEED_OPTIONS.map((option) => (
                    <option key={option} value={option}>
                      {option}
                    </option>
                  ))}
                </select>
                <ChevronDown
                  className="pointer-events-none absolute top-1/2 right-3 size-4 -translate-y-1/2 text-brand-muted"
                  aria-hidden
                />
              </div>
              {errors.need && (
                <p id={`${formId}-need-error`} role="alert" className="mt-1.5 text-xs text-destructive">
                  {errors.need}
                </p>
              )}
            </div>

            <div>
              <label htmlFor={`${formId}-budget`} className="text-sm font-medium text-brand-foreground">
                Estimated Budget <span aria-hidden className="text-brand-accent-2">*</span>
              </label>
              <div className="relative mt-2">
                <select
                  id={`${formId}-budget`}
                  value={values.budget}
                  onChange={(e) => updateField("budget", e.target.value as LeadPayload["budget"])}
                  aria-required="true"
                  aria-invalid={!!errors.budget}
                  aria-describedby={errors.budget ? `${formId}-budget-error` : undefined}
                  className={cn(inputClass, "appearance-none pr-9", errors.budget && "border-destructive")}
                >
                  <option value="" disabled>
                    Select a range
                  </option>
                  {BUDGET_OPTIONS.map((option) => (
                    <option key={option} value={option}>
                      {option}
                    </option>
                  ))}
                </select>
                <ChevronDown
                  className="pointer-events-none absolute top-1/2 right-3 size-4 -translate-y-1/2 text-brand-muted"
                  aria-hidden
                />
              </div>
              {errors.budget && (
                <p id={`${formId}-budget-error`} role="alert" className="mt-1.5 text-xs text-destructive">
                  {errors.budget}
                </p>
              )}
            </div>

            <div className="sm:col-span-2">
              <label htmlFor={`${formId}-message`} className="text-sm font-medium text-brand-foreground">
                Message <span aria-hidden className="text-brand-accent-2">*</span>
              </label>
              <textarea
                id={`${formId}-message`}
                rows={5}
                value={values.message}
                onChange={(e) => updateField("message", e.target.value)}
                aria-required="true"
                aria-invalid={!!errors.message}
                aria-describedby={errors.message ? `${formId}-message-error` : undefined}
                placeholder="What are you trying to build?"
                className={cn("mt-2 resize-none", inputClass, errors.message && "border-destructive")}
              />
              {errors.message && (
                <p id={`${formId}-message-error`} role="alert" className="mt-1.5 text-xs text-destructive">
                  {errors.message}
                </p>
              )}
            </div>
          </div>

          {status === "error" && submitError && (
            <div
              role="alert"
              className="mt-6 flex items-start gap-2.5 rounded-md border border-destructive/40 bg-destructive/10 px-4 py-3 text-sm text-destructive"
            >
              <AlertCircle className="mt-0.5 size-4 shrink-0" aria-hidden />
              <span>{submitError}</span>
            </div>
          )}

          <div className="mt-8 flex flex-col-reverse items-start gap-4 sm:flex-row sm:items-center sm:justify-between">
            <Button type="submit" disabled={status === "submitting"} className="w-full sm:w-auto">
              {status === "submitting" ? (
                <>
                  <Loader2 className="size-4 animate-spin" aria-hidden />
                  Sending…
                </>
              ) : (
                "Send Message"
              )}
            </Button>

            <span className="flex items-center gap-1.5 rounded-full border border-brand-accent-2/40 bg-brand-accent-2/10 px-3 py-1.5 text-xs font-medium text-brand-accent-2">
              <Clock className="size-3.5 shrink-0" aria-hidden />
              We reply within 1 business day
            </span>
          </div>
        </motion.form>
      </Container>
    </Section>
  );
}
