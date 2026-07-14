import { useTranslations } from 'next-intl';
import { Chip, GlowText, HudFrame } from '@/components/hud';
import type { Project } from '@/types';

export type MissionCardProps = {
  project: Project;
  /** Localized link label fallback (e.g. "View project"). */
  viewLabel: string;
};

type ProjectCopy = { title: string; outcome: string; contributions: string[] };

/** A single project as a HUD "mission briefing" — outcome-first, tech chips, period under the title. */
export function MissionCard({ project, viewLabel }: MissionCardProps) {
  const t = useTranslations('sections');
  const copy = t.raw(`projects.items.${project.id}`) as ProjectCopy;

  return (
    <HudFrame
      as="article"
      variant="panel"
      glow={project.featured ? 'cyan' : false}
      className="hud-scanline h-full">
      <div
        className="flex h-full flex-col gap-4 p-5"
        data-testid={`mission-${project.id}`}>
      <div className="flex items-start justify-between gap-3">
        <div className="min-w-0">
          <h3 className="font-display text-lg font-semibold uppercase tracking-wide text-text">
            {copy.title}
          </h3>
          {project.period && (
            <p className="mt-1 font-mono text-xs text-text/50" data-testid="mission-period">
              {project.period}
            </p>
          )}
        </div>
        {project.featured && (
          <span className="shrink-0 rounded-sm border border-hud-gold/40 px-1.5 py-0.5 font-mono text-[0.6rem] uppercase tracking-widest text-hud-gold">
            ★
          </span>
        )}
      </div>

      <p className="font-sans text-sm leading-relaxed text-text/80" data-testid="mission-outcome">
        <GlowText color="cyan">▸</GlowText> {copy.outcome}
      </p>

      {copy.contributions.length > 0 && (
        <ul className="flex flex-col gap-1.5 font-mono text-xs text-text/60">
          {copy.contributions.map((c, i) => (
            <li key={i} className="flex gap-2">
              <span aria-hidden="true" className="text-hud-cyan/60">
                {'//'}
              </span>
              <span>{c}</span>
            </li>
          ))}
        </ul>
      )}

      <div className="mt-auto flex flex-wrap gap-1.5" data-testid="mission-tech">
        {project.tech.map((tech) => (
          <Chip key={tech} label={tech} tone="cyan" />
        ))}
      </div>

      {project.link && (
        <div className="flex items-center justify-end border-t border-hud-cyan/15 pt-3">
          <a
            href={project.link.href}
            target="_blank"
            rel="noopener noreferrer"
            data-testid="mission-link"
            className="font-mono text-xs uppercase tracking-wider text-hud-cyan transition-colors hover:text-hud-gold">
            {project.link.label || viewLabel} ↗
          </a>
        </div>
      )}
      </div>
    </HudFrame>
  );
}
