import Image from "next/image";
import { MapPin, Star } from "lucide-react";

import { cn } from "@/lib/utils";
import type { CardTile, ListRow, PortfolioProject, PreviewBlock, StatTile } from "@/config/portfolio";
import { AnimatedBarChart } from "@/components/ui/animated-bar-chart";
import { AnimatedStatValue } from "@/components/ui/animated-stat-value";
import { WindowFrame } from "@/components/ui/window-frame";
import { PreviewCalendar } from "@/components/sections/preview-calendar";

/**
 * Renders a project's composite mockup inside the same "window chrome"
 * frame used elsewhere in the site (see ConfiguratorPreview), so every
 * illustrative UI in the product reads as part of one design system
 * rather than a one-off graphic. Purely presentational — no state, no
 * client-only APIs — so it stays a Server Component.
 *
 * A real project (`project.screenshot` set) shows an actual screenshot
 * of the live site instead of the illustrative `blocks` a concept
 * project renders — see config/portfolio.ts for why.
 */
export function ProjectPreview({ project }: { project: PortfolioProject }) {
  return (
    <WindowFrame title={project.previewTitle} className="min-h-[20rem] gap-5">
      {project.screenshot ? (
        <div className="relative -mx-5 -mb-5 mt-1 flex-1 overflow-hidden rounded-b-xl">
          <Image
            src={project.screenshot.src}
            alt={project.screenshot.alt}
            fill
            sizes="(min-width: 640px) 50vw, 100vw"
            className="object-cover object-top transition-transform duration-500 group-hover:scale-[1.03]"
          />
        </div>
      ) : (
        project.blocks?.map((block, i) => <PreviewBlockView key={i} block={block} />)
      )}
    </WindowFrame>
  );
}

function PreviewBlockView({ block }: { block: PreviewBlock }) {
  switch (block.kind) {
    case "stats":
      return (
        <div className="grid grid-cols-3 gap-3">
          {block.items.map((stat) => (
            <StatTileView key={stat.label} stat={stat} />
          ))}
        </div>
      );

    case "cards":
      return (
        <div className="grid grid-cols-1 gap-3 sm:grid-cols-3">
          {block.items.map((card) => (
            <CardTileView key={card.title} card={card} />
          ))}
        </div>
      );

    case "list":
      return (
        <div>
          {block.title && <p className="mb-2 text-xs font-medium text-brand-muted">{block.title}</p>}
          <ul className="space-y-2">
            {block.items.map((row) => (
              <ListRowView key={row.label} row={row} />
            ))}
          </ul>
        </div>
      );

    case "calendar":
      return <PreviewCalendar slots={block.slots} />;

    case "profile":
      return (
        <div className="rounded-lg border border-brand-border p-3 transition-colors hover:border-brand-accent-2/50">
          <div className="flex items-center gap-3">
            <span className="flex size-10 shrink-0 items-center justify-center rounded-full bg-brand-accent/15 text-sm font-semibold text-brand-accent-2">
              {block.info.name
                .split(" ")
                .filter((part) => !part.endsWith("."))
                .map((part) => part[0])
                .slice(0, 2)
                .join("")}
            </span>
            <div className="min-w-0 flex-1">
              <p className="truncate text-sm font-medium text-brand-foreground">{block.info.name}</p>
              <p className="truncate text-xs text-brand-muted">{block.info.role}</p>
            </div>
          </div>
          <div className="mt-3 flex items-center gap-1.5 text-xs text-brand-muted">
            <Star className="size-3.5 shrink-0 text-brand-accent-2" aria-hidden />
            <span className="truncate">{block.info.meta}</span>
          </div>
        </div>
      );

    case "chart":
      return <AnimatedBarChart values={block.values} />;

    case "map":
      return (
        <div className="relative h-28 overflow-hidden rounded-lg border border-brand-border bg-[linear-gradient(to_right,var(--brand-border)_1px,transparent_1px),linear-gradient(to_bottom,var(--brand-border)_1px,transparent_1px)] bg-[size:16px_16px] bg-brand/40">
          {block.pins.map((pin, i) => (
            <span
              key={i}
              className="absolute flex size-5 -translate-x-1/2 -translate-y-full items-center justify-center text-brand-accent-2 transition-transform hover:-translate-y-[110%] hover:scale-110"
              style={{ left: `${pin.x}%`, top: `${pin.y}%` }}
            >
              <MapPin className="size-5 fill-brand-accent/20" aria-hidden />
            </span>
          ))}
        </div>
      );

    default:
      return null;
  }
}

function StatTileView({ stat }: { stat: StatTile }) {
  return (
    <div className="rounded-lg border border-brand-border p-3 transition-colors hover:border-brand-accent-2/50">
      <AnimatedStatValue value={stat.value} className="text-base font-semibold text-brand-foreground" />
      <p className="mt-0.5 text-xs text-brand-muted">{stat.label}</p>
    </div>
  );
}

function CardTileView({ card }: { card: CardTile }) {
  return (
    <div className="rounded-lg border border-brand-border p-3 transition-colors hover:border-brand-accent-2/50">
      <div className="aspect-video rounded-md bg-brand-border/60" />
      <div className="mt-2 flex items-start justify-between gap-2">
        <p className="text-xs font-medium text-brand-foreground">{card.title}</p>
        {card.tag && (
          <span className="shrink-0 rounded-full bg-brand-accent/15 px-2 py-0.5 text-[10px] font-medium text-brand-accent-2">
            {card.tag}
          </span>
        )}
      </div>
      <p className="mt-1 text-[11px] text-brand-muted">{card.meta}</p>
      {typeof card.progress === "number" && (
        <span className="mt-2 block h-1.5 overflow-hidden rounded-full bg-brand-border">
          <span className="block h-full rounded-full bg-brand-accent-2" style={{ width: `${card.progress}%` }} />
        </span>
      )}
    </div>
  );
}

function ListRowView({ row }: { row: ListRow }) {
  return (
    <li className="flex items-center justify-between gap-3 rounded-md border border-brand-border px-3 py-2 text-xs transition-colors hover:border-brand-accent-2/50">
      <span className="truncate text-brand-foreground">{row.label}</span>
      <span className={cn("shrink-0", row.emphasis ? "font-semibold text-brand-foreground" : "text-brand-muted")}>
        {row.meta}
      </span>
    </li>
  );
}
