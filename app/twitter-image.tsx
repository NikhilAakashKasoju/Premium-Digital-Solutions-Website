import { ImageResponse } from "next/og";

import { siteConfig } from "@/config/site";
import { BrandOgImage } from "@/lib/og-image";

export const alt = siteConfig.seo.title;
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

export default function Image() {
  return new ImageResponse(<BrandOgImage />, { ...size });
}
