import { ImageResponse } from "next/og";

export const size = { width: 180, height: 180 };
export const contentType = "image/png";

/**
 * iOS home-screen icon. No border-radius here (unlike app/icon.tsx) —
 * iOS applies its own rounded-square mask on top, so the source image
 * should fill the full square.
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
