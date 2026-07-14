import { useTranslations } from 'next-intl';
import { HudPanel } from '@/components/hud';
import { GithubIcon, InstagramIcon } from '@/components/Icons';
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
            <div className="flex flex-col gap-3">
              <p className="font-sans text-sm text-text/75">
                {t(`now.items.${item.id}.detail`)}
              </p>

              {item.link && (
                <a
                  href={item.link.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  data-testid={`now-link-${item.id}`}
                  className="inline-flex w-fit items-center gap-1.5 font-mono text-xs text-hud-cyan transition-colors hover:text-hud-gold">
                  <GithubIcon className="h-4 w-4" />
                  {item.link.label} ↗
                </a>
              )}

              {item.instagram && (
                <a
                  href={`https://instagram.com/${item.instagram}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  data-testid={`now-instagram-${item.id}`}
                  className="inline-flex w-fit items-center gap-2 rounded-sm border border-hud-cyan/30 px-3 py-1.5 font-mono text-xs text-hud-cyan transition-all hover:border-hud-cyan hover:shadow-glow-cyan">
                  <InstagramIcon className="h-4 w-4" />
                  {t('now.followInstagram')} @{item.instagram}
                </a>
              )}
            </div>
          </HudPanel>
        ))}
      </div>
    </Section>
  );
}
