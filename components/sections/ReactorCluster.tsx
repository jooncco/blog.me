'use client';

import { clsx } from 'clsx';
import { Chip, HudFrame, Reticle } from '@/components/hud';
import { ChevronIcon } from '@/components/Icons';
import type { SkillCategory } from '@/types';

export type ReactorClusterProps = {
  category: SkillCategory;
  /** Localized category label. */
  label: string;
  expanded: boolean;
  onToggle: (id: string) => void;
  /** Localized "N tools" count label. */
  toolsCountLabel: string;
};

/** One category "reactor core"; clicking expands its tool chips. */
export function ReactorCluster({
  category,
  label,
  expanded,
  onToggle,
  toolsCountLabel,
}: ReactorClusterProps) {
  const panelId = `reactor-panel-${category.id}`;

  return (
    <HudFrame
      variant="panel"
      glow={expanded ? 'cyan' : false}
      className="overflow-hidden transition-all duration-300">
      <div data-testid={`reactor-${category.id}`}>
      <button
        type="button"
        onClick={() => onToggle(category.id)}
        aria-expanded={expanded}
        aria-controls={panelId}
        data-testid={`reactor-toggle-${category.id}`}
        className="flex w-full items-center gap-3 p-4 text-left transition-colors hover:bg-hud-cyan/5">
        <span className="relative flex h-10 w-10 shrink-0 items-center justify-center">
          <Reticle size={40} spin={expanded} className="text-hud-cyan/70" />
          <span
            className={clsx(
              'absolute h-2.5 w-2.5 rounded-full bg-hud-cyan transition-shadow',
              expanded ? 'shadow-glow-cyan' : 'opacity-70',
            )}
          />
        </span>
        <span className="min-w-0 flex-1">
          <span className="block font-display text-base font-semibold uppercase tracking-wide text-text">
            {label}
          </span>
          <span className="block font-mono text-xs text-text/50">{toolsCountLabel}</span>
        </span>
        <ChevronIcon
          aria-hidden="true"
          className={clsx(
            'h-4 w-4 shrink-0 text-hud-cyan transition-transform duration-300',
            expanded ? 'rotate-90' : 'rotate-0',
          )}
        />
      </button>

      <div
        id={panelId}
        hidden={!expanded}
        className={clsx('px-4 pb-4', expanded ? 'block' : 'hidden')}>
        <div className="flex flex-wrap gap-2 border-t border-hud-cyan/15 pt-4">
          {category.tools.map((tool) => (
            <Chip key={tool.name} label={tool.name} tone="cyan" />
          ))}
        </div>
      </div>
      </div>
    </HudFrame>
  );
}
