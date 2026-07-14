import { useTranslations } from 'next-intl';
import { Link } from '@/i18n/navigation';
import { GlowText, HudFrame } from '@/components/hud';

/** Localized 404 (HUD styled). */
export default function NotFound() {
  const t = useTranslations('common');

  return (
    <div className="flex min-h-[50vh] items-center justify-center px-4 py-16">
      <HudFrame variant="panel" glow="red" className="max-w-lg p-8 text-center">
        <p className="font-mono text-sm uppercase tracking-[0.3em] text-hud-red">404</p>
        <h1 className="mt-3 font-display-alt text-2xl font-bold uppercase tracking-wider text-text">
          <GlowText color="red">{t('notFoundTitle')}</GlowText>
        </h1>
        <p className="mt-3 font-sans text-text/80">{t('notFoundBody')}</p>
        <Link
          href="/"
          className="mt-6 inline-block rounded-sm border border-hud-cyan/60 px-4 py-2 font-display text-sm uppercase tracking-wider text-hud-cyan transition-colors hover:bg-hud-cyan/10">
          {t('backHome')}
        </Link>
      </HudFrame>
    </div>
  );
}
