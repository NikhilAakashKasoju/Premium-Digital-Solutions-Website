import { ImageResponse } from "next/og";

import { LOGO_ARROW_PATH, LOGO_CENTER_DOT, LOGO_RING_PATH, LOGO_STROKE_WIDTH, LOGO_VIEWBOX } from "@/lib/logo-mark";

export const size = { width: 32, height: 32 };
export const contentType = "image/png";

/**
 * Modern favicon (used by browsers that support the `icon` file
 * convention). app/favicon.ico covers the legacy `/favicon.ico`
 * request older browsers and crawlers make directly; app/apple-icon.tsx
 * covers the iOS home-screen icon. All three share the same gradient
 * tile with the Corebound mark rendered as a solid glyph on top — see
 * lib/logo-mark.ts for why the glyph is solid here rather than gradient,
 * and lib/og-image.tsx for the larger OG/Twitter version of it.
 */
export default function Icon() {
  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          borderRadius: 7,
          backgroundImage: "linear-gradient(135deg, #635bff 0%, #22d3ee 100%)",
        }}
      >
        <svg viewBox={LOGO_VIEWBOX} width="70%" height="70%">
          <path d={LOGO_RING_PATH} fill="none" stroke="#0b1020" strokeWidth={LOGO_STROKE_WIDTH} strokeLinecap="round" />
          <path d={LOGO_ARROW_PATH} fill="#0b1020" />
          <circle cx={LOGO_CENTER_DOT.cx} cy={LOGO_CENTER_DOT.cy} r={LOGO_CENTER_DOT.r} fill="#0b1020" />
        </svg>
      </div>
    ),
    { ...size },
  );
}
