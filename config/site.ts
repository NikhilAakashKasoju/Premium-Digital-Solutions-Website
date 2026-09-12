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

export type ServiceOffering = {
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
    { label: "Home", href: "/" },
    { label: "Services", href: "/services" },
    { label: "Work", href: "/work" },
    { label: "About", href: "/about" },
    { label: "Contact", href: "/contact" },
  ] satisfies NavLink[],

  socials: [
    { label: "LinkedIn", href: "https://linkedin.com/company/your-brand", icon: "Linkedin" },
    { label: "X (Twitter)", href: "https://x.com/yourbrand", icon: "X" },
    { label: "GitHub", href: "https://github.com/yourbrand", icon: "Github" },
  ] satisfies SocialLink[],

  services: [
    { title: "Business Websites", description: "Static and dynamic websites built for speed and credibility." },
    { title: "E-commerce", description: "Conversion-focused online stores, from catalog to checkout." },
    { title: "Custom Web Applications", description: "Bespoke, database-driven applications for real business workflows." },
    { title: "Business Software", description: "CRM, LMS and internal dashboards tailored to how your team works." },
    { title: "AI Chatbots", description: "Conversational assistants that handle support and sales around the clock." },
    { title: "AI Automation", description: "Workflow and process automation powered by applied AI." },
  ] satisfies ServiceOffering[],
} as const;

export type SiteConfig = typeof siteConfig;
