import type { ComponentType, SVGProps } from "react";
import Link from "next/link";

import { siteConfig, type SocialLink } from "@/config/site";
import { Container } from "@/components/layout/container";
import { NavLinks } from "@/components/layout/nav-links";
import { InstagramIcon, LinkedinIcon, YoutubeIcon } from "@/components/icons/brand-icons";

// Keying by the exact icon-name union (rather than `string`) means this
// object literal only type-checks if every possible icon has an entry,
// so `socialIcons[social.icon]` below is guaranteed to resolve — no
// runtime fallback needed for a "missing icon" case that can't happen.
const socialIcons: Record<SocialLink["icon"], ComponentType<SVGProps<SVGSVGElement>>> = {
  Linkedin: LinkedinIcon,
  Instagram: InstagramIcon,
  Youtube: YoutubeIcon,
};

const focusRingClass =
  "rounded-sm focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand-accent-2 focus-visible:ring-offset-2 focus-visible:ring-offset-brand-secondary";

export function Footer() {
  const year = new Date().getFullYear();

  return (
    <footer className="border-t border-brand-border bg-brand-secondary">
      <Container className="py-12 lg:py-16">
        <div className="grid grid-cols-1 gap-10 md:grid-cols-[1.4fr_1fr_1fr]">
          <div className="max-w-sm">
            <span className="text-base font-semibold tracking-tight text-brand-foreground">
              {siteConfig.name}
            </span>
            <p className="mt-3 text-sm leading-relaxed text-brand-muted">{siteConfig.description}</p>

            <nav aria-label="Social media" className="mt-6 flex items-center gap-4">
              {siteConfig.socials.map((social) => {
                const Icon = socialIcons[social.icon];
                return (
                  <a
                    key={social.href}
                    href={social.href}
                    aria-label={`${social.label} (opens in a new tab)`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className={`text-brand-muted transition-colors hover:text-brand-foreground ${focusRingClass}`}
                  >
                    <Icon className="size-5" />
                  </a>
                );
              })}
            </nav>
          </div>

          <div>
            <h3 className="text-sm font-semibold text-brand-foreground">Navigation</h3>
            <NavLinks
              items={siteConfig.footerNav}
              aria-label="Footer navigation"
              className="mt-4 flex flex-col items-start gap-3"
            />
          </div>

          <div>
            <h3 className="text-sm font-semibold text-brand-foreground">Legal</h3>
            <nav aria-label="Legal" className="mt-4 flex flex-col items-start gap-3">
              {siteConfig.legalLinks.map((item) => (
                <Link
                  key={item.href}
                  href={item.href}
                  prefetch={false}
                  className={`text-sm text-brand-muted transition-colors hover:text-brand-foreground ${focusRingClass}`}
                >
                  {item.label}
                </Link>
              ))}
            </nav>
          </div>
        </div>

        <div className="mt-10 flex flex-col gap-4 border-t border-brand-border pt-6 text-sm text-brand-muted md:flex-row md:items-center md:justify-between">
          <p>
            © {year} {siteConfig.legalName}. All rights reserved.
          </p>
          <div className="flex gap-6">
            <a href={`mailto:${siteConfig.contact.email}`} className={`hover:text-brand-foreground ${focusRingClass}`}>
              {siteConfig.contact.email}
            </a>
            <a href={`tel:${siteConfig.contact.phone}`} className={`hover:text-brand-foreground ${focusRingClass}`}>
              {siteConfig.contact.phone}
            </a>
          </div>
        </div>
      </Container>
    </footer>
  );
}
