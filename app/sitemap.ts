import type { MetadataRoute } from "next";

import { siteConfig } from "@/config/site";

/**
 * Sitemap-ready architecture: today "/" is the only real route, so it's
 * the only URL listed below — the nav/footer hrefs that point at future
 * pages (see the "real vs placeholder" comment on `nav` in
 * config/site.ts) intentionally aren't included here, since a page that
 * 404s has no business in a sitemap. As each dedicated page (Services,
 * Work, About, Pricing, Industries/[slug], etc.) actually gets built,
 * add its URL to this array; nothing else about this file needs to change.
 */
export default function sitemap(): MetadataRoute.Sitemap {
  return [
    {
      url: siteConfig.url,
      lastModified: new Date(),
      changeFrequency: "monthly",
      priority: 1,
    },
  ];
}
