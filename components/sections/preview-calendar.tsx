import { cn } from "@/lib/utils";
import type { CalendarSlot } from "@/lib/preview-types";

/**
 * Day-grouped time-slot grid used by both the booking-system
 * configurator preview and the MedCare portfolio mockup — the same
 * data shape and the same layout, so it exists once. The column count
 * follows however many distinct days the slots actually contain,
 * rather than a hard-coded number, so it stays correct if the mock
 * data changes.
 */
export function PreviewCalendar({ slots }: { slots: readonly CalendarSlot[] }) {
  const days = Array.from(new Set(slots.map((s) => s.day)));

  return (
    <div className="grid gap-2" style={{ gridTemplateColumns: `repeat(${days.length}, minmax(0, 1fr))` }}>
      {days.map((day) => (
        <div key={day} className="space-y-2">
          <p className="text-center text-xs text-brand-muted">{day}</p>
          {slots
            .filter((s) => s.day === day)
            .map((slot) => (
              <div
                key={`${slot.day}-${slot.time}`}
                className={cn(
                  "rounded-md border px-1.5 py-1 text-center text-[11px] transition-colors",
                  slot.selected
                    ? "border-brand-accent bg-brand-accent/15 text-brand-foreground"
                    : "border-brand-border text-brand-muted hover:border-brand-accent-2/50 hover:text-brand-foreground",
                )}
              >
                {slot.time}
              </div>
            ))}
        </div>
      ))}
    </div>
  );
}
