/**
 * Central site configuration.
 *
 * Every place that would otherwise hard-code the company name,
 * tagline, contact details or a social link should import from
 * here instead. This is the single file to edit when rebranding
 * the site or handing it off to a client.
 */

export type NavLink = {
  label: string;
  href: string;
};

export type SocialLink = {
  label: string;
  href: string;
  /** Icon name, resolved against components/icons/brand-icons.tsx. */
  icon: "Linkedin" | "X" | "Github";
};

export type WhatWeBuildCard = {
  slug: string;
  /** Icon name, resolved against a lookup map at the component that renders it. */
  icon: "Globe" | "AppWindow" | "Building2" | "Bot";
  title: string;
  description: string;
  capabilities: readonly string[];
  cta: { label: string; href: string };
};

export type ProcessStage = {
  number: string;
  /** Icon name, resolved against a lookup map at the component that renders it. */
  icon: "Search" | "PenTool" | "Code2" | "Rocket";
  title: string;
  description: string;
};

export type Differentiator = {
  /** Icon name, resolved against a lookup map at the component that renders it. */
  icon: "Target" | "Cpu" | "Layers" | "Bot" | "Zap" | "Handshake";
  title: string;
  description: string;
};

export type TechCategory = {
  label: string;
  items: readonly string[];
};

export type PricingPlan = {
  slug: "starter" | "business" | "custom";
  name: string;
  tagline: string;
  /** A fixed starting figure (e.g. "₹49,999"). Omit for a plan priced
   *  only after scoping — the card then shows "Custom pricing"
   *  instead of "Starting from …", per `priceNote`. */
  startingPrice?: string;
  priceNote: string;
  featured?: boolean;
  features: readonly string[];
  cta: { label: string; href: string };
};

export type FaqItem = {
  question: string;
  answer: string;
};

export type Industry = {
  /** Used to derive both the CTA href (`/industries/{slug}`) and a future landing-page route. */
  slug: string;
  /** Icon name, resolved against a lookup map at the component that renders it. */
  icon:
    | "GraduationCap"
    | "HeartPulse"
    | "Building2"
    | "Briefcase"
    | "ShoppingBag"
    | "Utensils"
    | "Rocket"
    | "MapPin";
  title: string;
  description: string;
};

export const siteConfig = {
  name: "YOUR BRAND",
  legalName: "YOUR BRAND",
  tagline: "Think. Build. Evolve.",
  description:
    "Premium digital solutions for businesses that need to move fast: websites, e-commerce, custom web applications, and AI-powered automation, built to a production-grade standard.",
  url: "https://example.com",

  contact: {
    email: "hello@example.com",
    phone: "+91 00000 00000",
  },

  nav: [
    { label: "Services", href: "/services" },
    { label: "Solutions", href: "/solutions" },
    { label: "Industries", href: "/industries" },
    { label: "Work", href: "/work" },
    { label: "About", href: "/about" },
    { label: "Pricing", href: "/pricing" },
  ] satisfies NavLink[],

  hero: {
    eyebrow: "Digital product studio",
    headline: "Build Digital Experiences That Grow Your Business.",
    supporting:
      "Websites, business applications and AI-powered automation designed to help businesses attract customers, streamline operations and grow.",
    primaryCta: { label: "Start a Project", href: "/contact" },
    secondaryCta: { label: "Explore Our Work", href: "/work" },
  },

  socials: [
    { label: "LinkedIn", href: "https://linkedin.com/company/your-brand", icon: "Linkedin" },
    { label: "X (Twitter)", href: "https://x.com/yourbrand", icon: "X" },
    { label: "GitHub", href: "https://github.com/yourbrand", icon: "Github" },
  ] satisfies SocialLink[],

  /** Capability strip directly under the hero — kept to short, scannable tags. */
  capabilities: [
    "Websites",
    "Web Applications",
    "E-commerce",
    "Business Software",
    "AI Automation",
    "Cloud Solutions",
  ],

  /** "What We Build" section: one card per practice area. */
  whatWeBuild: [
    {
      slug: "website-development",
      icon: "Globe",
      title: "Website Development",
      description: "Static websites, dynamic websites, CMS and e-commerce.",
      capabilities: [
        "Marketing & brand websites",
        "CMS-powered content sites",
        "E-commerce storefronts",
        "Landing pages & campaigns",
      ],
      cta: { label: "Explore website development", href: "/services#website-development" },
    },
    {
      slug: "web-applications",
      icon: "AppWindow",
      title: "Web Applications",
      description: "Custom applications designed around business workflows.",
      capabilities: [
        "Internal tools & portals",
        "Multi-tenant SaaS products",
        "Workflow & approval systems",
        "Third-party integrations",
      ],
      cta: { label: "Explore web applications", href: "/services#web-applications" },
    },
    {
      slug: "business-software",
      icon: "Building2",
      title: "Business Software",
      description: "CRM, LMS, inventory, workflow management and reporting.",
      capabilities: [
        "CRM & sales pipelines",
        "Learning management (LMS)",
        "Inventory & operations",
        "Reporting & analytics",
      ],
      cta: { label: "Explore business software", href: "/services#business-software" },
    },
    {
      slug: "ai-automation",
      icon: "Bot",
      title: "AI & Automation",
      description: "AI assistants, chatbots, WhatsApp automation and intelligent workflows.",
      capabilities: [
        "AI chat assistants",
        "WhatsApp & messaging automation",
        "Document & data automation",
        "Intelligent workflow orchestration",
      ],
      cta: { label: "Explore AI & automation", href: "/services#ai-automation" },
    },
  ] satisfies WhatWeBuildCard[],

  /** "How We Work" timeline: one stage per step, in order. */
  process: [
    {
      number: "01",
      icon: "Search",
      title: "Discover",
      description: "Understand the business, users and goals.",
    },
    {
      number: "02",
      icon: "PenTool",
      title: "Design",
      description: "Create the experience and technical architecture.",
    },
    {
      number: "03",
      icon: "Code2",
      title: "Build",
      description: "Develop, test and integrate the solution.",
    },
    {
      number: "04",
      icon: "Rocket",
      title: "Launch & Grow",
      description: "Deploy, monitor and continuously improve.",
    },
  ] satisfies ProcessStage[],

  /**
   * "Why Choose Us" differentiators. Each description names the actual
   * business benefit rather than generic agency language — kept
   * credible for a new company (no client counts, no "trusted by").
   */
  whyUs: [
    {
      icon: "Target",
      title: "Business-first thinking",
      description:
        "Every technical decision is weighed against what moves your metrics — signups, bookings, revenue — not what's trendy to build.",
    },
    {
      icon: "Cpu",
      title: "Modern technology",
      description:
        "Built on frameworks and infrastructure that stay fast and secure as you grow, so you're not paying down technical debt a year in.",
    },
    {
      icon: "Layers",
      title: "Built to scale",
      description:
        "Your first hundred users and your hundred-thousandth run on the same foundation — no rebuild required when traffic or data grows.",
    },
    {
      icon: "Bot",
      title: "AI-ready",
      description:
        "Automation and AI features are designed into the architecture from day one, so adding a chatbot or workflow automation later doesn't mean starting over.",
    },
    {
      icon: "Zap",
      title: "Performance-focused",
      description:
        "Fast load times and smooth interactions aren't an afterthought — they directly affect conversion rates and search rankings.",
    },
    {
      icon: "Handshake",
      title: "Long-term partnership",
      description:
        "We stay involved after launch — fixing, improving and extending the product as your business changes, not disappearing after handoff.",
    },
  ] satisfies Differentiator[],

  /**
   * "Built for Different Businesses" industry cards. `slug` drives both
   * the CTA link and a future dedicated `/industries/{slug}` landing
   * page, so this doubles as the source of truth for that routing.
   */
  industries: [
    {
      slug: "education",
      icon: "GraduationCap",
      title: "Education",
      description: "Learning platforms, course portals and student dashboards that make content easy to deliver and track.",
    },
    {
      slug: "healthcare",
      icon: "HeartPulse",
      title: "Healthcare",
      description: "Appointment booking, patient portals and scheduling tools built around real clinical workflows.",
    },
    {
      slug: "real-estate",
      icon: "Building2",
      title: "Real Estate",
      description: "Property listing sites, map-based search and lead capture built for how buyers actually browse.",
    },
    {
      slug: "professional-services",
      icon: "Briefcase",
      title: "Professional Services",
      description: "Client portals, booking flows and case-management tools for firms that run on appointments and documents.",
    },
    {
      slug: "retail-ecommerce",
      icon: "ShoppingBag",
      title: "Retail & E-commerce",
      description: "Online storefronts, inventory-aware catalogs and checkout flows built to convert.",
    },
    {
      slug: "restaurants",
      icon: "Utensils",
      title: "Restaurants",
      description: "Menu and ordering systems, table reservations and delivery integrations for food businesses.",
    },
    {
      slug: "startups",
      icon: "Rocket",
      title: "Startups",
      description: "MVPs and product foundations built to validate an idea fast and scale once it works.",
    },
    {
      slug: "local-businesses",
      icon: "MapPin",
      title: "Local Businesses",
      description: "Simple, fast websites and booking tools that help nearby customers find and choose you.",
    },
  ] satisfies Industry[],

  /**
   * "Our Technology" ecosystem — grouped chips rather than a logo
   * wall. Order matters (a rough "what a request touches first" flow:
   * frontend → backend → database → cloud → AI).
   */
  technology: [
    { label: "Frontend", items: ["Next.js", "React", "TypeScript", "Tailwind CSS"] },
    { label: "Backend", items: ["Node.js", "Python", "APIs"] },
    { label: "Database", items: ["PostgreSQL", "Supabase"] },
    { label: "Cloud", items: ["Vercel", "AWS", "Azure"] },
    { label: "AI", items: ["OpenAI", "AI Agents", "RAG", "Automation"] },
  ] satisfies TechCategory[],

  /**
   * "Pricing" plan cards. Every price is a `startingPrice` here — never
   * a hard-coded final quote in the component — so it can be revised
   * without touching any markup. `custom` has no `startingPrice` at
   * all: a fully bespoke build only ever gets "Custom pricing".
   */
  pricing: [
    {
      slug: "starter",
      name: "Starter",
      tagline: "Professional digital presence.",
      startingPrice: "₹49,999",
      priceNote: "one-time, per project",
      features: [
        "Responsive website",
        "Up to 7 pages",
        "Contact form",
        "Basic SEO",
        "Analytics",
        "Deployment",
      ],
      cta: { label: "Get Started", href: "#contact" },
    },
    {
      slug: "business",
      name: "Business",
      tagline: "Turn your website into a business platform.",
      startingPrice: "₹1,49,999",
      priceNote: "one-time, per project",
      featured: true,
      features: [
        "Everything in Starter",
        "CMS",
        "Database",
        "Lead management",
        "Integrations",
        "Advanced SEO",
        "Admin dashboard",
      ],
      cta: { label: "Get Started", href: "#contact" },
    },
    {
      slug: "custom",
      name: "Custom",
      tagline: "Build software around your workflow.",
      priceNote: "Scoped together on a discovery call",
      features: [
        "Custom web applications",
        "Database",
        "Authentication",
        "Payments",
        "Dashboards",
        "APIs",
        "AI",
        "Automation",
      ],
      cta: { label: "Talk to Us", href: "#contact" },
    },
  ] satisfies PricingPlan[],

  /** "Frequently Asked Questions" — kept to what a prospective client actually asks before starting. */
  faq: [
    {
      question: "How long does a website take?",
      answer:
        "A marketing website typically takes 2–4 weeks from kickoff to launch. A web application or custom platform usually takes 6–12 weeks, depending on scope.",
    },
    {
      question: "Do you build custom websites?",
      answer:
        "Yes — every site is built from scratch around your brand and goals, not assembled from a generic template.",
    },
    {
      question: "Can you integrate databases?",
      answer:
        "Yes. We work with PostgreSQL, Supabase and other databases to power CMS content, customer records, bookings and more.",
    },
    {
      question: "Can you build e-commerce websites?",
      answer:
        "Yes, from a simple storefront to a full catalog-and-checkout experience integrated with payment providers and inventory.",
    },
    {
      question: "Can you build dashboards?",
      answer:
        "Yes — internal admin dashboards, customer-facing reporting views and analytics dashboards are all part of what we build.",
    },
    {
      question: "Can you integrate AI?",
      answer:
        "Yes. We build AI chat assistants, lead-qualification bots and automation that connects to the tools you already use.",
    },
    {
      question: "Do you provide hosting?",
      answer:
        "We deploy to modern cloud platforms like Vercel, AWS and Azure, and can manage hosting for you or hand it off to your team.",
    },
    {
      question: "Do you provide maintenance?",
      answer:
        "Yes — ongoing maintenance, monitoring and feature updates are available after launch as part of an optional support plan.",
    },
    {
      question: "Can you redesign an existing website?",
      answer:
        "Yes. We can rebuild an existing site with modern design and better performance, keeping the same or improved content.",
    },
    {
      question: "Can you work with international clients?",
      answer:
        "Yes — we work with clients across time zones and collaborate remotely through calls, async updates and shared project boards.",
    },
  ] satisfies FaqItem[],
} as const;

export type SiteConfig = typeof siteConfig;
