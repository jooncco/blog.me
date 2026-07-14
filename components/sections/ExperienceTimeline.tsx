'use client';

import { useEffect, useRef, useState } from 'react';
import { useTranslations } from 'next-intl';
import { HudFrame } from '@/components/hud';
import { Section } from './Section';
import type { ExperienceEntry } from '@/types';

export type ExperienceTimelineProps = { entries: ExperienceEntry[] };

const INITIAL = 3;
const STEP = 3;

/**
 * HUD timeline of formal roles/dates (distinct from the Projects mission log).
 * Entries load on demand via infinite scroll (IntersectionObserver), with a
 * no-observer fallback that reveals everything.
 */
export function ExperienceTimeline({ entries }: ExperienceTimelineProps) {
  const t = useTranslations('sections');
  const [count, setCount] = useState(Math.min(INITIAL, entries.length));
  const sentinelRef = useRef<HTMLDivElement | null>(null);

  const hasMore = count < entries.length;

  useEffect(() => {
    if (!hasMore) return;
    const el = sentinelRef.current;
    if (!el || typeof IntersectionObserver === 'undefined') {
      setCount(entries.length); // fallback: reveal all when observation is unavailable
      return;
    }
    const io = new IntersectionObserver(
      (obsEntries) => {
        if (obsEntries.some((e) => e.isIntersecting)) {
          setCount((c) => Math.min(c + STEP, entries.length));
        }
      },
      { rootMargin: '200px' },
    );
    io.observe(el);
    return () => io.disconnect();
  }, [hasMore, entries.length]);

  const visible = entries.slice(0, count);

  return (
    <Section id="experience" kicker={t('experience.kicker')} title={t('experience.title')}>
      <ol className="relative flex flex-col gap-8 pl-6" data-testid="experience-timeline">
        <span
          aria-hidden="true"
          className="absolute bottom-2 left-1.5 top-2 w-px bg-gradient-to-b from-hud-cyan/60 via-hud-cyan/20 to-transparent"
        />
        {visible.map((entry) => (
          <li key={entry.id} className="relative" data-testid={`experience-${entry.id}`}>
            <span
              aria-hidden="true"
              className="absolute -left-[1.375rem] top-1.5 h-3 w-3 rounded-full border border-hud-cyan bg-base shadow-glow-cyan"
            />
            <HudFrame variant="panel" className="flex flex-col gap-2 p-4">
              <div className="flex flex-wrap items-baseline justify-between gap-2">
                <h3 className="font-display text-base font-semibold uppercase tracking-wide text-text">
                  {entry.role}
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

      {hasMore && (
        <div
          ref={sentinelRef}
          data-testid="experience-sentinel"
          className="mt-6 flex items-center justify-center gap-2 font-mono text-xs uppercase tracking-widest text-hud-cyan/60">
          <span className="h-1.5 w-1.5 animate-hud-pulse rounded-full bg-hud-cyan" />
          {t('experience.loadingMore')}
        </div>
      )}
    </Section>
  );
}
