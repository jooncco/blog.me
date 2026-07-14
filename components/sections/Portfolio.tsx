'use client';

import { useMemo, useState } from 'react';
import { clsx } from 'clsx';
import { useTranslations } from 'next-intl';
import { Section } from './Section';
import { PortfolioTile } from './PortfolioTile';
import type { PortfolioItem } from '@/types';

export type PortfolioProps = {
  items: PortfolioItem[];
  categories: string[];
};

const ALL = '__all__';

/** Bento-grid "hangar bay" with category filtering. */
export function Portfolio({ items, categories }: PortfolioProps) {
  const t = useTranslations('sections');
  const [active, setActive] = useState<string>(ALL);

  const filters = useMemo(() => [ALL, ...categories], [categories]);
  const visible = active === ALL ? items : items.filter((i) => i.category === active);

  const filterLabel = (id: string) =>
    id === ALL ? t('portfolio.all') : t(`portfolio.categories.${id}`);

  return (
    <Section id="portfolio" kicker={t('portfolio.kicker')} title={t('portfolio.title')}>
      <div className="mb-6 flex flex-wrap gap-2" role="tablist" aria-label={t('portfolio.filterLabel')}>
        {filters.map((id) => (
          <button
            key={id}
            type="button"
            role="tab"
            aria-selected={active === id}
            onClick={() => setActive(id)}
            data-testid={`portfolio-filter-${id === ALL ? 'all' : id}`}
            className={clsx(
              'rounded-sm border px-3 py-1 font-mono text-xs uppercase tracking-wider transition-all',
              active === id
                ? 'border-hud-cyan bg-hud-cyan/10 text-hud-cyan shadow-glow-cyan'
                : 'border-text/20 text-text/60 hover:border-hud-cyan/50 hover:text-hud-cyan',
            )}>
            {filterLabel(id)}
          </button>
        ))}
      </div>

      <div
        className="grid auto-rows-[10rem] grid-cols-1 gap-4 sm:grid-cols-3"
        data-testid="portfolio-grid">
        {visible.map((item) => (
          <PortfolioTile
            key={item.id}
            item={item}
            githubLabel={t('portfolio.github')}
            demoLabel={t('portfolio.demo')}
          />
        ))}
      </div>
    </Section>
  );
}
