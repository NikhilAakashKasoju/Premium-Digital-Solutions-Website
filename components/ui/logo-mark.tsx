import { LOGO_ARROW_PATH, LOGO_CENTER_DOT, LOGO_RING_PATH, LOGO_STROKE_WIDTH, LOGO_VIEWBOX } from "@/lib/logo-mark";

/**
 * The Corebound icon mark, full color (indigo-to-cyan gradient stroke),
 * for real DOM contexts — the navbar and footer brand lockups. Not used
 * by the favicon/app-icon/OG image routes: see lib/logo-mark.ts for why.
 *
 * `id` seeds the gradient's element id — pass a unique value whenever more
 * than one `LogoMark` can render on the same page (e.g. navbar + footer
 * both mounted at once) so their `<linearGradient>` ids don't collide.
 */
export function LogoMark({
  size = 28,
  id = "corebound-mark",
  className,
}: {
  size?: number;
  id?: string;
  className?: string;
}) {
  const gradientId = `${id}-gradient`;

  return (
    <svg
      viewBox={LOGO_VIEWBOX}
      width={size}
      height={size}
      className={className}
      aria-hidden="true"
      focusable="false"
    >
      <defs>
        <linearGradient id={gradientId} x1="4" y1="6" x2="60" y2="58" gradientUnits="userSpaceOnUse">
          <stop offset="0%" stopColor="#7c6bff" />
          <stop offset="100%" stopColor="#22d3ee" />
        </linearGradient>
      </defs>
      <path d={LOGO_RING_PATH} fill="none" stroke={`url(#${gradientId})`} strokeWidth={LOGO_STROKE_WIDTH} strokeLinecap="round" />
      <path d={LOGO_ARROW_PATH} fill={`url(#${gradientId})`} />
      <circle cx={LOGO_CENTER_DOT.cx} cy={LOGO_CENTER_DOT.cy} r={LOGO_CENTER_DOT.r} fill={`url(#${gradientId})`} />
    </svg>
  );
}
