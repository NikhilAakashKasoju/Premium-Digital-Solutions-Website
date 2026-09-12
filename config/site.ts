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
} as const;

export type SiteConfig = typeof siteConfig;
