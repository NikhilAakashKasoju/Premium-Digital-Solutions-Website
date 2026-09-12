import type { ComponentType, SVGProps } from "react";

import { siteConfig, type SocialLink } from "@/config/site";
import { Container } from "@/components/layout/container";
import { NavLinks } from "@/components/layout/nav-links";
import { GithubIcon, LinkedinIcon, XIcon } from "@/components/icons/brand-icons";

// Keying by the exact icon-name union (rather than `string`) means this
// object literal only type-checks if every possible icon has an entry,
// so `socialIcons[social.icon]` below is guaranteed to resolve — no
// runtime fallback needed for a "missing icon" case that can't happen.
const socialIcons: Record<SocialLink["icon"], ComponentType<SVGProps<SVGSVGElement>>> = {
  Linkedin: LinkedinIcon,
  X: XIcon,
  Github: GithubIcon,
};

/**
 * Temporary placeholder footer for Phase 0.
 */
export function Footer() {
  const year = new Date().getFullYear();

  return (
    <footer className="border-t border-brand-border bg-brand-secondary">
      <Container className="py-12 lg:py-16">
        <div className="flex flex-col gap-10 md:flex-row md:items-start md:justify-between">
          <div className="max-w-sm">
            <span className="text-base font-semibold tracking-tight text-brand-foreground">
              {siteConfig.name}
            </span>
            <p className="mt-3 text-sm leading-relaxed text-brand-muted">
              {siteConfig.description}
            </p>
          </div>

          <NavLinks className="flex flex-wrap gap-x-8 gap-y-3" aria-label="Footer" />

          <div className="flex items-start gap-4">
            {siteConfig.socials.map((social) => {
              const Icon = socialIcons[social.icon];
              return (
                <a
                  key={social.href}
                  href={social.href}
                  aria-label={`${social.label} (opens in a new tab)`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-brand-muted transition-colors hover:text-brand-foreground"
                >
                  <Icon className="size-5" />
                </a>
              );
            })}
          </div>
        </div>

        <div className="mt-10 flex flex-col gap-4 border-t border-brand-border pt-6 text-sm text-brand-muted md:flex-row md:items-center md:justify-between">
          <p>
            © {year} {siteConfig.legalName}. All rights reserved.
          </p>
          <div className="flex gap-6">
            <a href={`mailto:${siteConfig.contact.email}`} className="hover:text-brand-foreground">
              {siteConfig.contact.email}
            </a>
            <a href={`tel:${siteConfig.contact.phone}`} className="hover:text-brand-foreground">
              {siteConfig.contact.phone}
            </a>
          </div>
        </div>
      </Container>
    </footer>
  );
}
