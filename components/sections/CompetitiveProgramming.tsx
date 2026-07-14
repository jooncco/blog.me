import { useTranslations } from 'next-intl';
import { Section } from './Section';
import { CPCard } from './CPCard';
import type { CPStat } from '@/types';

export type CompetitiveProgrammingProps = { stats: CPStat[] };

/** HUD stat cards fed by the CP snapshot (stats passed in from the server page). */
export function CompetitiveProgramming({ stats }: CompetitiveProgrammingProps) {
  const t = useTranslations('sections');

  const labels = {
    rating: t('cp.rating'),
    rank: t('cp.rank'),
    level: t('cp.level'),
    contests: t('cp.contests'),
    topPercent: t('cp.topPercent'),
    viewProfile: t('cp.viewProfile'),
    live: t('cp.live'),
    fallback: t('cp.fallback'),
  };

  return (
    <Section id="competitive-programming" kicker={t('cp.kicker')} title={t('cp.title')}>
      <div
        className="flex flex-col gap-4 xl:flex-row"
        data-testid="cp-cards">
        {stats.map((data) => (
          <CPCard key={data.platform} data={data} labels={labels} />
        ))}
      </div>
    </Section>
  );
}
