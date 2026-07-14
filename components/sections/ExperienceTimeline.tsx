import { useTranslations } from 'next-intl';
import { HudFrame } from '@/components/hud';
import { Section } from './Section';
import type { ExperienceEntry } from '@/types';

export type ExperienceTimelineProps = { entries: ExperienceEntry[] };

/** HUD timeline of formal roles/dates (distinct from the Projects mission log). */
export function ExperienceTimeline({ entries }: ExperienceTimelineProps) {
  const t = useTranslations('sections');

  return (
    <Section id="experience" kicker={t('experience.kicker')} title={t('experience.title')}>
      <ol className="relative flex flex-col gap-8 pl-6" data-testid="experience-timeline">
        <span
          aria-hidden="true"
          className="absolute bottom-2 left-1.5 top-2 w-px bg-gradient-to-b from-hud-cyan/60 via-hud-cyan/20 to-transparent"
        />
        {entries.map((entry) => (
          <li key={entry.id} className="relative" data-testid={`experience-${entry.id}`}>
            <span
              aria-hidden="true"
              className="absolute -left-[1.375rem] top-1.5 h-3 w-3 rounded-full border border-hud-cyan bg-base shadow-glow-cyan"
            />
            <HudFrame variant="panel" className="flex flex-col gap-2 p-4">
              <div className="flex flex-wrap items-baseline justify-between gap-2">
                <h3 className="font-display text-base font-semibold uppercase tracking-wide text-text">
                  {entry.role} <span className="text-hud-cyan/70">· {entry.org}</span>
                </h3>
                <span className="font-mono text-xs text-text/50">
                  {entry.start} – {entry.end ?? t('experience.present')}
                </span>
              </div>
              <p className="font-sans text-sm text-text/70">{entry.summary}</p>
              {entry.highlights.length > 0 && (
                <ul className="flex flex-col gap-1 font-mono text-xs text-text/55">
                  {entry.highlights.map((h, i) => (
                    <li key={i} className="flex gap-2">
                      <span aria-hidden="true" className="text-hud-cyan/60">
                        ▸
                      </span>
                      <span>{h}</span>
                    </li>
                  ))}
                </ul>
              )}
            </HudFrame>
          </li>
        ))}
      </ol>
    </Section>
  );
}
