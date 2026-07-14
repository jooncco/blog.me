import { getTranslations } from 'next-intl/server';
import type { Locale } from '@/types';

export type LangDisclaimerBannerProps = {
  /** Locales the post actually exists in (the served/fallback locale). */
  available: Locale[];
};

/**
 * Notice shown on a post when the requested locale has no translation and the
 * reader is being served the other language (Unit U6). Rendered by the post
 * page only when a fallback occurred.
 */
export async function LangDisclaimerBanner({ available }: LangDisclaimerBannerProps) {
  const t = await getTranslations('blog');
  const served = available[0];
  if (!served) return null;

  return (
    <div
      data-testid="lang-disclaimer-banner"
      role="note"
      className="mb-8 flex items-center gap-3 rounded-sm border border-hud-gold/40 bg-hud-gold/5 px-4 py-3 text-sm text-text/85">
      <span aria-hidden="true" className="font-mono text-hud-gold">
        [ i ]
      </span>
      <span>{t('onlyAvailableIn', { lang: t(`lang.${served}`) })}</span>
    </div>
  );
}
