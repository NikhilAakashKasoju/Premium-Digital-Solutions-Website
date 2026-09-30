import { ImageResponse } from "next/og";

import { LOGO_ARROW_PATH, LOGO_CENTER_DOT, LOGO_RING_PATH, LOGO_STROKE_WIDTH, LOGO_VIEWBOX } from "@/lib/logo-mark";

export const size = { width: 180, height: 180 };
export const contentType = "image/png";

/**
 * iOS home-screen icon. No border-radius here (unlike app/icon.tsx) —
 * iOS applies its own rounded-square mask on top, so the source image
 * should fill the full square. Same gradient tile + solid Corebound
 * glyph treatment as app/icon.tsx — see lib/logo-mark.ts.
 */
export default function AppleIcon() {
  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          backgroundImage: "linear-gradient(135deg, #635bff 0%, #22d3ee 100%)",
        }}
      >
        <svg viewBox={LOGO_VIEWBOX} width="66%" height="66%">
          <path d={LOGO_RING_PATH} fill="none" stroke="#0b1020" strokeWidth={LOGO_STROKE_WIDTH} strokeLinecap="round" />
          <path d={LOGO_ARROW_PATH} fill="#0b1020" />
          <circle cx={LOGO_CENTER_DOT.cx} cy={LOGO_CENTER_DOT.cy} r={LOGO_CENTER_DOT.r} fill="#0b1020" />
        </svg>
      </div>
    ),
    { ...size },
  );
}
