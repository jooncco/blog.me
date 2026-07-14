import { useTranslations } from 'next-intl';
import { HudPanel } from '@/components/hud';
import { Section } from './Section';
import type { NowData } from '@/data/now';

export type NowProps = { data: NowData };

/** "What I'm focused on now" panel (rendered on the /now page). */
export function Now({ data }: NowProps) {
  const t = useTranslations('sections');

  return (
    <Section id="now" kicker={t('now.kicker')} title={t('now.title')}>
      <p className="mb-6 max-w-2xl font-sans text-sm leading-relaxed text-text/70">
        {t('now.intro')}
      </p>
      <p className="mb-6 font-mono text-xs uppercase tracking-widest text-hud-cyan/70">
        {t('now.updated', { date: data.updated })}
      </p>

      <div className="grid grid-cols-1 gap-4 md:grid-cols-2" data-testid="now-items">
        {data.items.map((item) => (
          <HudPanel key={item.id} header={t(`now.items.${item.id}.label`)}>
            <p className="font-sans text-sm text-text/75">
              {t(`now.items.${item.id}.detail`)}
            </p>
          </HudPanel>
        ))}
      </div>
    </Section>
  );
}
