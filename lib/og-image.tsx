import { siteConfig } from "@/config/site";
import { LOGO_ARROW_PATH, LOGO_CENTER_DOT, LOGO_RING_PATH, LOGO_STROKE_WIDTH, LOGO_VIEWBOX } from "@/lib/logo-mark";

/**
 * Shared visual for app/opengraph-image.tsx and app/twitter-image.tsx —
 * one branded 1200x630 image reused for both social previews instead of
 * two near-identical ImageResponse trees. Built with the same gradient
 * mark used by app/icon.tsx / app/apple-icon.tsx so the favicon and the
 * link-preview image read as the same brand.
 *
 * Kept deliberately simple: ImageResponse (Satori) only supports a
 * subset of CSS — flexbox layouts, no grid, every box needs an explicit
 * `display` — so this avoids anything fancier than flex + gradients.
 */
export function BrandOgImage() {
  return (
    <div
      style={{
        width: "100%",
        height: "100%",
        display: "flex",
        flexDirection: "column",
        justifyContent: "center",
        padding: "80px",
        backgroundColor: "#0b1020",
        backgroundImage: "radial-gradient(circle at 78% 28%, rgba(99,91,255,0.35), rgba(11,16,32,0) 60%)",
        fontFamily: "sans-serif",
      }}
    >
      <div style={{ display: "flex", alignItems: "center", gap: 16 }}>
        <div
          style={{
            width: 48,
            height: 48,
            borderRadius: 12,
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            backgroundImage: "linear-gradient(135deg, #635bff 0%, #22d3ee 100%)",
          }}
        >
          <svg viewBox={LOGO_VIEWBOX} width="70%" height="70%">
            <path d={LOGO_RING_PATH} fill="none" stroke="#0b1020" strokeWidth={LOGO_STROKE_WIDTH} strokeLinecap="round" />
            <path d={LOGO_ARROW_PATH} fill="#0b1020" />
            <circle cx={LOGO_CENTER_DOT.cx} cy={LOGO_CENTER_DOT.cy} r={LOGO_CENTER_DOT.r} fill="#0b1020" />
          </svg>
        </div>
        <span style={{ fontSize: 30, fontWeight: 700, color: "#f8fafc" }}>{siteConfig.name}</span>
      </div>

      <div
        style={{
          display: "flex",
          marginTop: 48,
          maxWidth: 920,
          fontSize: 58,
          fontWeight: 700,
          lineHeight: 1.15,
          color: "#f8fafc",
        }}
      >
        Digital Solutions for Modern Businesses
      </div>

      <div
        style={{
          display: "flex",
          marginTop: 24,
          maxWidth: 820,
          fontSize: 28,
          lineHeight: 1.5,
          color: "#94a3b8",
        }}
      >
        Websites, web applications, business software and AI-powered automation for growing businesses.
      </div>
    </div>
  );
}
