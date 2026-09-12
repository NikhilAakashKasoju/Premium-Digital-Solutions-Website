import type { Metadata, Viewport } from "next";
import { GeistSans } from "geist/font/sans";
import { GeistMono } from "geist/font/mono";
import { MotionConfig } from "framer-motion";

import { siteConfig } from "@/config/site";
import { Navbar } from "@/components/layout/navbar";
import { Footer } from "@/components/layout/footer";
import "./globals.css";

// Centralized in siteConfig.seo (config/site.ts) per the brief — this
// file only wires those strings into the Next.js Metadata API. A future
// page adds its own `metadata`/`generateMetadata` export that overrides
// `title` (the template below appends "| {name}" automatically) rather
// than restating description/OG/twitter from scratch.
export const metadata: Metadata = {
  title: {
    default: siteConfig.seo.title,
    template: `%s | ${siteConfig.name}`,
  },
  description: siteConfig.seo.description,
  keywords: [...siteConfig.seo.keywords],
  metadataBase: new URL(siteConfig.url),
  alternates: {
    canonical: siteConfig.url,
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
    },
  },
  openGraph: {
    title: siteConfig.seo.title,
    description: siteConfig.seo.description,
    url: siteConfig.url,
    siteName: siteConfig.name,
    locale: "en_US",
    type: "website",
    // og:image itself is supplied by app/opengraph-image.tsx — Next merges
    // that file-based image in automatically, no need to repeat it here.
  },
  twitter: {
    card: "summary_large_image",
    title: siteConfig.seo.title,
    description: siteConfig.seo.description,
    // twitter:image comes from app/twitter-image.tsx, same reasoning as above.
  },
};

export const viewport: Viewport = {
  themeColor: siteConfig.themeColor,
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html
      lang="en"
      className={`${GeistSans.variable} ${GeistMono.variable} h-full antialiased`}
    >
      <body className="flex min-h-full flex-col bg-brand text-brand-foreground">
        {/* Visually hidden until focused — the first Tab stop on any page,
            letting keyboard/screen-reader users jump past the nav straight
            to the content instead of tabbing through every header link. */}
        <a
          href="#main-content"
          className="sr-only focus:not-sr-only focus:fixed focus:top-4 focus:left-4 focus:z-[100] focus:rounded-md focus:bg-brand-accent-button focus:px-4 focus:py-2 focus:text-sm focus:font-medium focus:text-brand-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand-accent-2 focus-visible:ring-offset-2 focus-visible:ring-offset-brand"
        >
          Skip to main content
        </a>

        {/* reducedMotion="user" makes every Framer Motion animation in the
            app honor the OS-level prefers-reduced-motion setting. */}
        <MotionConfig reducedMotion="user">
          <Navbar />
          {/* tabIndex={-1} makes this focusable *only* programmatically —
              it's what lets the skip link above actually move keyboard
              focus here on activation, instead of just scrolling the
              viewport while focus stays behind on the link. */}
          <main id="main-content" tabIndex={-1} className="flex-1 focus:outline-none">
            {children}
          </main>
          <Footer />
        </MotionConfig>
      </body>
    </html>
  );
}
