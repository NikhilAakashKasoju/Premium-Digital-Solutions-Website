/**
 * Shared types for the small illustrative "product mockup" UI used in
 * both the interactive configurator (config/configurator-data.ts) and
 * the portfolio case studies (config/portfolio.ts). Living here — not
 * duplicated in each config file — means the one shape that both
 * genuinely share in both data AND rendering (a day-grouped calendar
 * of time slots) has a single definition and a single renderer
 * (see components/sections/preview-calendar.tsx).
 */
export type CalendarSlot = {
  day: string;
  time: string;
  selected?: boolean;
};
