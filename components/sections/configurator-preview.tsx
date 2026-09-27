import { ImageIcon, Rocket, Send, ShieldCheck, ShoppingCart, Zap, type LucideIcon } from "lucide-react";

import { cn } from "@/lib/utils";
import type { ConfiguratorOption, PreviewRow, WebsiteHighlight } from "@/config/configurator-data";
import { AnimatedBarChart } from "@/components/ui/animated-bar-chart";
import { AnimatedStatValue } from "@/components/ui/animated-stat-value";
import { WindowFrame } from "@/components/ui/window-frame";
import { PreviewCalendar } from "@/components/sections/preview-calendar";
import { PreviewChat } from "@/components/sections/preview-chat";

const highlightIcons: Record<WebsiteHighlight["icon"], LucideIcon> = {
  Zap,
  ShieldCheck,
  Rocket,
};

/**
 * The framed "device" shell every preview renders inside — a window
 * chrome (traffic-light dots + title) matching the card language
 * already established in the hero visual, so this reads as part of
 * the same product rather than a one-off widget.
 */
export function ConfiguratorPreview({ option }: { option: ConfiguratorOption }) {
  return (
    <WindowFrame
      title={option.previewTitle}
      className="min-h-[22rem] shadow-[0_30px_60px_-30px_rgba(0,0,0,0.7)] md:min-h-[26rem] md:p-6"
    >
      <div className="flex-1 pt-5">
        <PreviewBody option={option} />
      </div>
    </WindowFrame>
  );
}

function PreviewBody({ option }: { option: ConfiguratorOption }) {
  const { preview } = option;

  switch (preview.kind) {
    case "website": {
      const { nav, hero, highlights } = preview;
      return (
        <div className="flex flex-col gap-4">
          {/* Nav — a believable little site header, not a placeholder bar. */}
          <div className="flex items-center justify-between border-b border-brand-border pb-3">
            <span className="flex items-center gap-1.5">
              <span className="size-2 rounded-full bg-brand-accent-2" aria-hidden />
              <span className="text-xs font-semibold text-brand-foreground">yourbrand</span>
            </span>
            <div className="hidden items-center gap-3.5 sm:flex">
              {nav.map((item) => (
                <span key={item} className="text-xs text-brand-muted">
                  {item}
                </span>
              ))}
            </div>
            <span className="rounded-md bg-brand-accent-button px-2.5 py-1.5 text-[11px] font-medium text-brand-foreground">
              Contact
            </span>
          </div>

          {/* Hero — real headline copy and a colored CTA in place of gray
              skeleton rectangles, so the very first option a visitor sees
              already looks like a finished site, not a wireframe. */}
          <div className="relative overflow-hidden rounded-lg border border-brand-border bg-gradient-to-br from-brand-accent/10 via-transparent to-brand-accent-2/10 p-5 text-center">
            <p className="text-[10px] font-semibold tracking-wide text-brand-accent-2 uppercase">{hero.eyebrow}</p>
            <p className="mt-2 text-base font-bold text-balance text-brand-foreground sm:text-lg">{hero.headline}</p>
            <p className="mx-auto mt-2 max-w-[15rem] text-xs text-brand-muted">{hero.subtext}</p>
            <div className="mt-4 flex items-center justify-center gap-2">
              <span className="rounded-md bg-brand-accent-button px-3 py-1.5 text-xs font-semibold text-brand-foreground shadow-[0_10px_24px_-10px_rgba(99,91,255,0.65)]">
                {hero.primaryCta}
              </span>
              <span className="rounded-md border border-brand-border px-3 py-1.5 text-xs font-medium text-brand-muted">
                {hero.secondaryCta}
              </span>
            </div>
          </div>

          {/* Trust highlights — icon + label in place of an empty "services
              grid" block. */}
          <div className="grid grid-cols-3 gap-2">
            {highlights.map((highlight) => {
              const Icon = highlightIcons[highlight.icon];
              return (
                <div
                  key={highlight.label}
                  className="flex flex-col items-center gap-1.5 rounded-md border border-brand-border py-3 text-center transition-colors hover:border-brand-accent-2/50"
                >
                  <Icon className="size-4 text-brand-accent-2" aria-hidden />
                  <span className="text-[10px] leading-tight text-brand-muted">{highlight.label}</span>
                </div>
              );
            })}
          </div>
        </div>
      );
    }

    case "grid":
      return (
        // `relative` here (not just on the outer WindowFrame) scopes the
        // floating cart badge to this grid's own top-right corner —
        // without it the badge positions against WindowFrame's chrome
        // instead and overlaps the title bar.
        <div className="relative grid grid-cols-2 gap-3">
          {preview.items.map((item) => (
            <div
              key={item.label}
              className="rounded-lg border border-brand-border p-2.5 transition-colors hover:border-brand-accent-2/50"
            >
              <div className="flex aspect-square items-center justify-center rounded-md bg-brand-border/60">
                <ImageIcon className="size-5 text-brand-muted/50" aria-hidden />
              </div>
              <p className="mt-2 truncate text-xs text-brand-foreground">{item.label}</p>
              <p className="text-xs font-medium text-brand-accent-2">{item.price}</p>
            </div>
          ))}
          <span className="pointer-events-none absolute right-0 top-0 flex size-8 items-center justify-center rounded-full bg-brand-accent/15 text-brand-accent-2">
            <ShoppingCart className="size-4" aria-hidden />
          </span>
        </div>
      );

    case "calendar":
      return (
        <div>
          <PreviewCalendar slots={preview.slots} />
          <div className="mt-5 rounded-md bg-brand-accent-button px-4 py-2 text-center text-sm font-medium text-brand-foreground">
            Confirm booking
          </div>
        </div>
      );

    case "chat":
      return (
        <div className="flex h-full flex-col justify-between gap-4">
          <PreviewChat messages={preview.messages} />
          <div className="flex items-center gap-2 rounded-md border border-brand-border px-3 py-2">
            <span className="flex-1 text-xs text-brand-muted">Type a message…</span>
            <Send className="size-4 text-brand-accent-2" aria-hidden />
          </div>
        </div>
      );

    case "workflow":
      return (
        <div className="flex items-center justify-between">
          {preview.nodes.map((node, i) => (
            <div key={node.label} className="flex flex-1 items-center">
              <div className="flex flex-col items-center gap-2">
                <span className="flex size-9 items-center justify-center rounded-full border-2 border-brand-accent bg-brand-accent/15 text-xs font-semibold text-brand-foreground">
                  {i + 1}
                </span>
                <span className="text-center text-xs text-brand-muted">{node.label}</span>
              </div>
              {i < preview.nodes.length - 1 && <span className="mx-1 h-px flex-1 bg-brand-border" />}
            </div>
          ))}
        </div>
      );

    case "stats":
      return (
        <div>
          <div className="grid grid-cols-2 gap-3 md:grid-cols-4">
            {preview.stats.map((stat) => (
              <div
                key={stat.label}
                className="rounded-lg border border-brand-border p-3 transition-colors hover:border-brand-accent-2/50"
              >
                <AnimatedStatValue value={stat.value} className="text-lg font-semibold text-brand-foreground" />
                <p className="mt-0.5 text-xs text-brand-muted">{stat.label}</p>
              </div>
            ))}
          </div>

          {preview.chart && <AnimatedBarChart values={preview.chart} className="mt-4 h-16" />}

          {preview.rows.length > 0 && (
            <ul className="mt-4 space-y-2">
              {preview.rows.map((row) => (
                <PreviewRowItem key={row.label} row={row} />
              ))}
            </ul>
          )}
        </div>
      );

    default:
      return null;
  }
}

function PreviewRowItem({ row }: { row: PreviewRow }) {
  return (
    <li className="flex items-center justify-between gap-3 rounded-md border border-brand-border px-3 py-2 text-xs transition-colors hover:border-brand-accent-2/50">
      <span className="truncate text-brand-foreground">{row.label}</span>

      {typeof row.progress === "number" ? (
        <span className="flex w-20 items-center gap-2">
          <span className="h-1.5 flex-1 overflow-hidden rounded-full bg-brand-border">
            <span
              className="block h-full rounded-full bg-brand-accent-2"
              style={{ width: `${row.progress}%` }}
            />
          </span>
        </span>
      ) : (
        <span
          className={cn(
            "shrink-0",
            row.status === "done" && "text-brand-accent-2",
            row.status === "active" && "text-brand-foreground",
            row.status === "pending" && "text-brand-muted",
            !row.status && "text-brand-muted",
          )}
        >
          {row.meta}
        </span>
      )}
    </li>
  );
}
