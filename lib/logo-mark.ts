/**
 * Shared geometry for the Corebound mark — a "C"-shaped ring that breaks
 * open into an arrowhead (core + momentum/"bound"), drawn once here so
 * every place it appears stays in sync instead of drifting apart:
 * - components/ui/logo-mark.tsx renders it full color (gradient stroke)
 *   for real DOM contexts (navbar, footer) where SVG gradients are safe.
 * - app/icon.tsx, app/apple-icon.tsx and lib/og-image.tsx render the same
 *   path data as a solid-color glyph inside a gradient tile instead —
 *   next/og's Satori renderer supports plain SVG shapes reliably, but
 *   gradient `<defs>` inside an `ImageResponse` tree is a much less
 *   proven path, so those routes avoid it and use the "colored tile +
 *   solid glyph" treatment already established by this project's
 *   favicon/app-icon/OG image code instead.
 *
 * All values assume the same 64x64 viewBox.
 */
export const LOGO_VIEWBOX = "0 0 64 64";
export const LOGO_RING_PATH = "M 52.84 29.44 A 21.00 21.00 0 1 1 32.00 11.00";
export const LOGO_ARROW_PATH = "M 54.55 11.00 L 32.00 3.96 L 32.00 18.04 Z";
export const LOGO_STROKE_WIDTH = 11;
export const LOGO_CENTER_DOT = { cx: 32, cy: 32, r: 3.52 };
