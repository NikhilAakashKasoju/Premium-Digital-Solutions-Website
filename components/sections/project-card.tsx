import Link from "next/link";
import { ArrowRight } from "lucide-react";

import type { PortfolioProject } from "@/config/portfolio";
import { ProjectPreview } from "@/components/sections/project-preview";

/**
 * A single "Selected Work" case-study card: preview mockup, project
 * facts, tags and a CTA. Hover motion is plain CSS (border/shadow/lift
 * on `:hover`) so this stays a Server Component — no framer-motion or
 * state needed for a static card.
 */
export function ProjectCard({ project }: { project: PortfolioProject }) {
  return (
    <article className="group flex flex-col overflow-hidden rounded-xl border border-brand-border bg-brand-secondary/60 transition-all duration-300 hover:-translate-y-1 hover:border-brand-muted hover:shadow-[0_16px_40px_-24px_rgba(0,0,0,0.6)]">
      <div className="p-4 pb-0 sm:p-5 sm:pb-0">
        <ProjectPreview project={project} />
      </div>

      <div className="flex flex-1 flex-col p-5 sm:p-6">
        <div className="flex flex-wrap items-center gap-2">
          {project.isConcept && (
            <span className="rounded-full border border-brand-accent-2/40 bg-brand-accent-2/10 px-2.5 py-1 text-[11px] font-semibold tracking-wide text-brand-accent-2 uppercase">
              Concept Project
            </span>
          )}
          <span className="text-xs font-medium text-brand-muted">{project.industry}</span>
        </div>

        <h3 className="mt-3 text-h4 font-semibold text-brand-foreground">{project.name}</h3>
        <p className="mt-2 text-sm text-brand-muted">{project.description}</p>

        <ul className="mt-4 flex flex-wrap gap-2">
          {project.tags.map((tag) => (
            <li
              key={tag}
              className="rounded-md border border-brand-border px-2.5 py-1 text-xs text-brand-muted"
            >
              {tag}
            </li>
          ))}
        </ul>

        <Link
          href={project.cta.href}
          prefetch={false}
          className="group/cta mt-6 inline-flex items-center gap-1.5 rounded-sm text-sm font-medium text-brand-accent-2 transition-opacity hover:opacity-80 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand-accent-2 focus-visible:ring-offset-2 focus-visible:ring-offset-brand"
        >
          {project.cta.label}
          <ArrowRight className="size-4 transition-transform group-hover/cta:translate-x-0.5" aria-hidden />
        </Link>
      </div>
    </article>
  );
}
