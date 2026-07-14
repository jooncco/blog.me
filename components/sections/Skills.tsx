'use client';

import { useState } from 'react';
import { useTranslations } from 'next-intl';
import { Section } from './Section';
import { ReactorCluster } from './ReactorCluster';
import type { SkillCategory } from '@/types';

export type SkillsProps = { categories: SkillCategory[] };

/** Animated "reactor clusters" — one core per category, click to expand tools. */
export function Skills({ categories }: SkillsProps) {
  const t = useTranslations('sections');
  const [expandedId, setExpandedId] = useState<string | null>(categories[0]?.id ?? null);

  const toggle = (id: string) => setExpandedId((cur) => (cur === id ? null : id));

  return (
    <Section id="skills" kicker={t('skills.kicker')} title={t('skills.title')}>
      <div
        className="grid grid-cols-1 gap-4 md:grid-cols-2"
        data-testid="reactor-clusters">
        {categories.map((category) => (
          <ReactorCluster
            key={category.id}
            category={category}
            label={t(`skills.categories.${category.id}`)}
            expanded={expandedId === category.id}
            onToggle={toggle}
            toolsCountLabel={t('skills.toolsCount', { count: category.tools.length })}
          />
        ))}
      </div>
    </Section>
  );
}
