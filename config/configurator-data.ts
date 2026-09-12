/**
 * Data for the "What Can We Build For You?" interactive section.
 *
 * MOCK DATA — every `preview` below is illustrative, not a real
 * customer's numbers. When this connects to a real backend, keep the
 * shapes in this file (StatTile, PreviewRow, ChatMessage, etc.) and
 * swap `CONFIGURATOR_OPTIONS[i].preview` for data fetched per option
 * (e.g. `GET /api/configurator/:id`) — the components that render
 * these types don't need to change, only where the data comes from.
 */

import type { CalendarSlot } from "@/lib/preview-types";

export type ConfiguratorOptionId =
  | "business-website"
  | "ecommerce"
  | "booking-system"
  | "customer-portal"
  | "crm"
  | "lms"
  | "dashboard"
  | "ai-chatbot"
  | "custom-software";

export type StatTile = {
  label: string;
  value: string;
};

export type PreviewRow = {
  label: string;
  meta: string;
  progress?: number;
  status?: "done" | "active" | "pending";
};

export type ChatMessage = {
  from: "user" | "assistant";
  text: string;
};

export type ProductTile = {
  label: string;
  price: string;
};

export type WorkflowNode = {
  label: string;
};

export type WebsiteBlock = {
  label: string;
  size: "sm" | "md" | "lg";
};

/**
 * Discriminated union: one shape per preview "kind" so the panel
 * component can switch on `kind` and render the right mini-renderer.
 * Several options below reuse the same kind with different data.
 */
export type PreviewSpec =
  | { kind: "website"; blocks: readonly WebsiteBlock[] }
  | { kind: "grid"; items: readonly ProductTile[] }
  | { kind: "calendar"; slots: readonly CalendarSlot[] }
  | { kind: "chat"; messages: readonly ChatMessage[] }
  | { kind: "workflow"; nodes: readonly WorkflowNode[] }
  | { kind: "stats"; stats: readonly StatTile[]; rows: readonly PreviewRow[]; chart?: readonly number[] };

export type ConfiguratorOption = {
  id: ConfiguratorOptionId;
  label: string;
  /** Icon name, resolved against a lookup map at the component that renders it. */
  icon:
    | "Globe"
    | "ShoppingBag"
    | "CalendarCheck"
    | "CircleUserRound"
    | "Users"
    | "GraduationCap"
    | "LayoutDashboard"
    | "Bot"
    | "Code2";
  previewTitle: string;
  preview: PreviewSpec;
};

export const CONFIGURATOR_OPTIONS: readonly ConfiguratorOption[] = [
  {
    id: "business-website",
    label: "Business Website",
    icon: "Globe",
    previewTitle: "yourcompany.com",
    preview: {
      kind: "website",
      blocks: [
        { label: "Nav", size: "sm" },
        { label: "Hero headline", size: "lg" },
        { label: "Get in touch", size: "sm" },
        { label: "Services grid", size: "md" },
      ],
    },
  },
  {
    id: "ecommerce",
    label: "E-commerce",
    icon: "ShoppingBag",
    previewTitle: "Storefront",
    preview: {
      kind: "grid",
      items: [
        { label: "Everyday Tee", price: "$24" },
        { label: "Canvas Tote", price: "$18" },
        { label: "Desk Lamp", price: "$46" },
        { label: "Ceramic Mug", price: "$12" },
      ],
    },
  },
  {
    id: "booking-system",
    label: "Booking System",
    icon: "CalendarCheck",
    previewTitle: "Book an appointment",
    preview: {
      kind: "calendar",
      slots: [
        { day: "Mon", time: "9:00" },
        { day: "Mon", time: "2:00", selected: true },
        { day: "Tue", time: "10:30" },
        { day: "Wed", time: "11:00" },
        { day: "Thu", time: "3:30" },
        { day: "Fri", time: "1:00" },
      ],
    },
  },
  {
    id: "customer-portal",
    label: "Customer Portal",
    icon: "CircleUserRound",
    previewTitle: "My account",
    preview: {
      kind: "stats",
      stats: [
        { label: "Open tickets", value: "3" },
        { label: "Account status", value: "Active" },
      ],
      rows: [
        { label: "Shipping delay on order #4021", meta: "Updated 2h ago", status: "active" },
        { label: "Invoice question", meta: "Resolved", status: "done" },
        { label: "Add a team seat", meta: "Awaiting reply", status: "pending" },
      ],
    },
  },
  {
    id: "crm",
    label: "CRM",
    icon: "Users",
    previewTitle: "Pipeline overview",
    preview: {
      kind: "stats",
      stats: [
        { label: "Leads", value: "128" },
        { label: "Customers", value: "54" },
        { label: "Follow-ups", value: "9" },
        { label: "Conversion rate", value: "18%" },
      ],
      rows: [
        { label: "Meridian Foods", meta: "Proposal sent", status: "active" },
        { label: "Ashford & Co.", meta: "Follow-up due today", status: "pending" },
        { label: "Blue Harbor Ltd.", meta: "Closed won", status: "done" },
      ],
    },
  },
  {
    id: "lms",
    label: "LMS",
    icon: "GraduationCap",
    previewTitle: "Learning progress",
    preview: {
      kind: "stats",
      stats: [
        { label: "Enrolled", value: "312" },
        { label: "Completed", value: "187" },
        { label: "Avg. progress", value: "64%" },
      ],
      rows: [
        { label: "Onboarding Fundamentals", meta: "82%", progress: 82 },
        { label: "Advanced Workflows", meta: "45%", progress: 45 },
        { label: "Compliance Training", meta: "100%", progress: 100, status: "done" },
      ],
    },
  },
  {
    id: "dashboard",
    label: "Dashboard",
    icon: "LayoutDashboard",
    previewTitle: "Operations overview",
    preview: {
      kind: "stats",
      stats: [
        { label: "Revenue", value: "$48.2k" },
        { label: "Active users", value: "2,104" },
        { label: "Orders", value: "312" },
        { label: "Growth", value: "+12%" },
      ],
      rows: [],
      chart: [38, 52, 44, 61, 58, 70, 66, 78],
    },
  },
  {
    id: "ai-chatbot",
    label: "AI Chatbot",
    icon: "Bot",
    previewTitle: "Assistant",
    preview: {
      kind: "chat",
      messages: [
        { from: "user", text: "Do you offer same-day delivery?" },
        { from: "assistant", text: "Yes — on orders placed before 2pm in your area." },
        { from: "user", text: "Great, can you check stock for me?" },
      ],
    },
  },
  {
    id: "custom-software",
    label: "Custom Software",
    icon: "Code2",
    previewTitle: "Your workflow",
    preview: {
      kind: "workflow",
      nodes: [{ label: "Intake" }, { label: "Review" }, { label: "Approve" }, { label: "Sync" }],
    },
  },
] as const;
