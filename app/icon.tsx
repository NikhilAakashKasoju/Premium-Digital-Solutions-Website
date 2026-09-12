import { ImageResponse } from "next/og";

export const size = { width: 32, height: 32 };
export const contentType = "image/png";

/**
 * Modern favicon (used by browsers that support the `icon` file
 * convention). app/favicon.ico covers the legacy `/favicon.ico`
 * request older browsers and crawlers make directly; app/apple-icon.tsx
 * covers the iOS home-screen icon. All three share the same gradient
 * mark — see lib/og-image.tsx for the larger OG/Twitter version of it.
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
        <div
          style={{
            display: "flex",
            width: "38%",
            height: "38%",
            borderRadius: "22%",
            backgroundColor: "#0b1020",
            transform: "rotate(45deg)",
          }}
        />
      </div>
    ),
    { ...size },
  );
}
