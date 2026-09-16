/**
 * "Selected Work" portfolio data.
 *
 * Two real, shipped, solo-built projects lead this list (`isConcept:
 * false`, each with a real `screenshot` and a `cta` linking out to the
 * live site) — `ProjectCard` renders a "Real Project" label for these.
 * Everything after them is a CONCEPT PROJECT: an illustrative case
 * study, not a real client, rendered with a "Concept Project" label
 * instead. This file is the single place that would change to swap
 * more concept entries for real ones later.
 *
 * A concept project's visual is built from a small set of reusable
 * `PreviewBlock` kinds (stats / cards / list / calendar / profile /
 * chart / map) rather than a photo, so `ProjectPreview` can render one
 * from data alone — no per-project markup. A real project skips that
 * entirely and shows an actual screenshot instead — inventing a fake
 * "dashboard" for a real client would defeat the point of proving real
 * work was done.
 */

import type { CalendarSlot } from "@/lib/preview-types";

export type StatTile = {
  label: string;
  value: string;
};

export type CardTile = {
  title: string;
  meta: string;
  tag?: string;
  progress?: number;
};

export type ListRow = {
  label: string;
  meta: string;
  emphasis?: boolean;
};

export type ProfileInfo = {
  name: string;
  role: string;
  meta: string;
};

export type MapPin = {
  x: number;
  y: number;
};

/**
 * Discriminated union: one shape per visual "block". A project's
 * `blocks` array composes two of these into the two-part mockup
 * called for in the brief (e.g. course cards + student dashboard).
 */
export type PreviewBlock =
  | { kind: "stats"; items: readonly StatTile[] }
  | { kind: "cards"; items: readonly CardTile[] }
  | { kind: "list"; title?: string; items: readonly ListRow[] }
  | { kind: "calendar"; slots: readonly CalendarSlot[] }
  | { kind: "profile"; info: ProfileInfo }
  | { kind: "chart"; values: readonly number[] }
  | { kind: "map"; pins: readonly MapPin[] };

export type PortfolioProject = {
  slug: string;
  name: string;
  industry: string;
  description: string;
  tags: readonly string[];
  /** false for the real, shipped projects below — everything else here is illustrative. */
  isConcept: boolean;
  previewTitle: string;
  /**
   * Illustrative mockup blocks, composed from the small set of reusable
   * `PreviewBlock` kinds — used for every concept project. Omit this
   * (and set `screenshot` instead) for a real project: a made-up
   * "dashboard" mockup would undercut the whole point of showing real
   * proof, so real entries show an actual screenshot of the live site.
   */
  blocks?: readonly PreviewBlock[];
  /** A real screenshot of the live product. Real projects only. */
  screenshot?: { src: string; alt: string };
  cta: {
    label: string;
    href: string;
    /** True for a real project's link out to its live site (opens in a new tab). Internal "/work/…" case-study links are never external. */
    external?: boolean;
  };
};

export const PORTFOLIO_PROJECTS: readonly PortfolioProject[] = [
  {
    slug: "edufulness",
    name: "EduFulness",
    industry: "Education / EdTech Platform",
    description:
      "A multi-course ed-tech platform — live training, self-paced courses and interview prep across Azure Data Engineering, DSA, Agentic AI and Database & SQL. Live today at 5,000+ students enrolled, a 95% placement rate and a 4.9/5 rating from 9,400+ reviews.",
    tags: ["Multi-course LMS", "Live + self-paced training", "Solo build"],
    isConcept: false,
    previewTitle: "edufulness.com",
    screenshot: { src: "/work/edufulness.jpg", alt: "The EduFulness homepage, showing its course catalog and enrollment stats" },
    cta: { label: "Visit edufulness.com", href: "https://edufulness.com", external: true },
  },
  {
    slug: "music-gurukula",
    name: "Music Gurukula",
    industry: "Education / School Administration",
    description:
      "An admin dashboard for a music school run on the Gurukula mentorship model — one place to track student enrollment, subscription renewals and payments, so instructors spend less time on admin and more time teaching.",
    tags: ["Student management", "Subscriptions & payments", "Solo build"],
    isConcept: false,
    previewTitle: "Gurukula Tracker",
    screenshot: { src: "/work/music-gurukula.jpg", alt: "The Gurukula Tracker sign-in screen for managing students" },
    cta: { label: "Visit the live app", href: "https://music-gurkula-tracker.vercel.app/", external: true },
  },
  {
    slug: "eduflow",
    name: "EduFlow",
    industry: "Education / LMS",
    description:
      "A learning platform where students track courses, progress and certificates in one dashboard.",
    tags: ["Next.js", "PostgreSQL", "Stripe", "Video streaming"],
    isConcept: true,
    previewTitle: "Student dashboard",
    blocks: [
      {
        kind: "cards",
        items: [
          { title: "Data Structures", meta: "12 lessons", progress: 68 },
          { title: "Cloud Fundamentals", meta: "8 lessons", progress: 40 },
          { title: "UI Design Basics", meta: "5 lessons", progress: 100, tag: "Done" },
        ],
      },
      {
        kind: "stats",
        items: [
          { label: "Enrolled", value: "6" },
          { label: "Completed", value: "2" },
          { label: "Certificates", value: "2" },
        ],
      },
    ],
    cta: { label: "View project", href: "/work/eduflow" },
  },
  {
    slug: "medcare",
    name: "MedCare",
    industry: "Healthcare / Appointment Platform",
    description:
      "Patient-facing booking that pairs doctor availability with a clear, low-friction scheduling flow.",
    tags: ["React", "Node.js", "Twilio", "HIPAA-aware design"],
    isConcept: true,
    previewTitle: "Book an appointment",
    blocks: [
      {
        kind: "profile",
        info: { name: "Dr. Alina Cho", role: "General Physician", meta: "4.9 rating · 12 yrs exp" },
      },
      {
        kind: "calendar",
        slots: [
          { day: "Mon", time: "9:00" },
          { day: "Mon", time: "11:30", selected: true },
          { day: "Tue", time: "2:00" },
          { day: "Wed", time: "10:00" },
          { day: "Thu", time: "3:30" },
        ],
      },
    ],
    cta: { label: "View project", href: "/work/medcare" },
  },
  {
    slug: "estatehub",
    name: "EstateHub",
    industry: "Real Estate / Property Platform",
    description: "A listings platform combining browsable property cards with a map-based search view.",
    tags: ["Next.js", "Mapbox", "Elasticsearch", "CMS-driven"],
    isConcept: true,
    previewTitle: "Listings near you",
    blocks: [
      {
        kind: "cards",
        items: [
          { title: "Maple Court Villa", meta: "$420,000 · 3 bd, 2 ba" },
          { title: "Harbor View Loft", meta: "$310,000 · 2 bd, 1 ba" },
        ],
      },
      {
        kind: "map",
        pins: [
          { x: 28, y: 38 },
          { x: 54, y: 62 },
          { x: 72, y: 32 },
        ],
      },
    ],
    cta: { label: "View project", href: "/work/estatehub" },
  },
  {
    slug: "dinenow",
    name: "DineNow",
    industry: "Restaurant / Ordering Platform",
    description: "Menu browsing and cart-building designed for fast, mobile-first ordering.",
    tags: ["React", "Next.js", "Stripe", "Order routing"],
    isConcept: true,
    previewTitle: "Order online",
    blocks: [
      {
        kind: "list",
        title: "Menu",
        items: [
          { label: "Margherita Pizza", meta: "$12.50" },
          { label: "Caesar Salad", meta: "$8.00" },
          { label: "Iced Latte", meta: "$4.50" },
        ],
      },
      {
        kind: "list",
        title: "Your order",
        items: [
          { label: "Margherita Pizza ×1", meta: "$12.50" },
          { label: "Iced Latte ×2", meta: "$9.00" },
          { label: "Total", meta: "$21.50", emphasis: true },
        ],
      },
    ],
    cta: { label: "View project", href: "/work/dinenow" },
  },
  {
    slug: "fitcore",
    name: "FitCore",
    industry: "Fitness / Membership Platform",
    description: "A membership hub that keeps class bookings, streaks and workout plans in view together.",
    tags: ["React Native", "Node.js", "Payments", "Push notifications"],
    isConcept: true,
    previewTitle: "My membership",
    blocks: [
      {
        kind: "stats",
        items: [
          { label: "Day streak", value: "14" },
          { label: "Classes booked", value: "3" },
          { label: "Plan", value: "Pro" },
        ],
      },
      {
        kind: "cards",
        items: [
          { title: "Morning HIIT", meta: "30 min · High intensity", tag: "Booked" },
          { title: "Yoga Flow", meta: "45 min · Low intensity" },
        ],
      },
    ],
    cta: { label: "View project", href: "/work/fitcore" },
  },
  {
    slug: "insightboard",
    name: "InsightBoard",
    industry: "Business Analytics Dashboard",
    description: "A KPI dashboard that turns raw operational data into a trend a team can act on at a glance.",
    tags: ["TypeScript", "Data pipelines", "Recharts", "Role-based access"],
    isConcept: true,
    previewTitle: "Analytics overview",
    blocks: [
      {
        kind: "stats",
        items: [
          { label: "Revenue", value: "$82.4k" },
          { label: "Active users", value: "3,210" },
          { label: "Growth", value: "+9%" },
        ],
      },
      { kind: "chart", values: [42, 58, 49, 66, 71, 60, 78, 74] },
    ],
    cta: { label: "View project", href: "/work/insightboard" },
  },
] as const;
