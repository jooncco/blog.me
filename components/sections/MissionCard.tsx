import { Chip, GlowText, HudFrame } from '@/components/hud';
import type { Project } from '@/types';

export type MissionCardProps = {
  project: Project;
  /** Localized "Company" side-note label. */
  companyLabel: string;
  /** Localized link label fallback (e.g. "View project"). */
  viewLabel: string;
};

/** A single project as a HUD "mission briefing" — outcome-first, tech chips, company aside. */
export function MissionCard({ project, companyLabel, viewLabel }: MissionCardProps) {
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
        <h3 className="font-display text-lg font-semibold uppercase tracking-wide text-text">
          {project.title}
        </h3>
        {project.featured && (
          <span className="shrink-0 rounded-sm border border-hud-gold/40 px-1.5 py-0.5 font-mono text-[0.6rem] uppercase tracking-widest text-hud-gold">
            ★
          </span>
        )}
      </div>

      <p className="font-sans text-sm leading-relaxed text-text/80" data-testid="mission-outcome">
        <GlowText color="cyan">▸</GlowText> {project.outcome}
      </p>

      {project.contributions.length > 0 && (
        <ul className="flex flex-col gap-1.5 font-mono text-xs text-text/60">
          {project.contributions.map((c, i) => (
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

      <div className="flex items-center justify-between border-t border-hud-cyan/15 pt-3">
        <span className="font-mono text-xs text-text/50">
          {(project.company || companyLabel) && (
            <>
              <span className="text-hud-cyan/60">{companyLabel}:</span> {project.company}
              {project.period && <span className="text-text/40"> · {project.period}</span>}
            </>
          )}
        </span>
        {project.link && (
          <a
            href={project.link.href}
            target="_blank"
            rel="noopener noreferrer"
            data-testid="mission-link"
            className="font-mono text-xs uppercase tracking-wider text-hud-cyan transition-colors hover:text-hud-gold">
            {project.link.label || viewLabel} ↗
          </a>
        )}
      </div>
      </div>
    </HudFrame>
  );
}
