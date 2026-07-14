import Image from 'next/image';
import { useLocale, useTranslations } from 'next-intl';
import { Link } from '@/i18n/navigation';
import { GlowText } from '@/components/hud';
import type { Locale } from '@/types';
import { NAV_ITEMS } from './config';
import { DesktopMenu } from './DesktopMenu';
import { MobileMenu } from './MobileMenu';
import { ThemeButton } from './ThemeButton';
import { LocaleSwitcher } from './LocaleSwitcher';

/**
 * Fixed HUD top bar: logo, primary nav, locale switch, theme toggle (server).
 * All localized strings are resolved here and passed to the client children as
 * props, so no client component calls `useTranslations` (which would trip
 * next-intl's ENVIRONMENT_FALLBACK during static boundary evaluation).
 */
export function Header() {
  const t = useTranslations('common');
  const tNav = useTranslations('nav');
  const tTheme = useTranslations('theme');
  const tLocale = useTranslations('locale');
  const locale = useLocale() as Locale;

  const navItems = NAV_ITEMS.map((item) => ({ ...item, label: tNav(item.id) }));
  const localeLabels: Record<Locale, string> = { en: tLocale('en'), ko: tLocale('ko') };

  return (
    <header
      data-testid="site-header"
      className="fixed inset-x-0 top-0 z-50 border-b border-hud-cyan/20 bg-page/80 backdrop-blur-md">
      <div className="mx-auto flex h-[4.5rem] max-w-7xl items-center justify-between gap-4 px-3 sm:px-6">
        <Link
          href="/"
          data-testid="logo-link"
          aria-label={t('siteName')}
          className="flex shrink-0 items-center gap-2">
          <Image
            src="/assets/images/logo.png"
            alt=""
            width={40}
            height={40}
            priority
            className="h-9 w-9"
          />
          <GlowText color="cyan">
            <span className="hidden font-display-alt text-lg font-bold tracking-widest sm:inline">
              {t('siteName')}
            </span>
          </GlowText>
        </Link>

        <div className="flex items-center gap-2">
          <DesktopMenu items={navItems} className="hidden md:block" />
          <LocaleSwitcher current={locale} switchLabel={tLocale('switch')} labels={localeLabels} />
          <ThemeButton
            labels={{ toggle: tTheme('toggle'), light: tTheme('light'), dark: tTheme('dark') }}
          />
          <MobileMenu
            items={navItems}
            openLabel={tNav('openMenu')}
            closeLabel={tNav('closeMenu')}
            className="md:hidden"
          />
        </div>
      </div>
    </header>
  );
}
