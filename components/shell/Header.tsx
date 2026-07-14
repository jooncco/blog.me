import Image from 'next/image';
import { useTranslations } from 'next-intl';
import { Link } from '@/i18n/navigation';
import { GlowText } from '@/components/hud';
import { NAV_ITEMS } from './config';
import { DesktopMenu } from './DesktopMenu';
import { MobileMenu } from './MobileMenu';
import { ThemeButton } from './ThemeButton';
import { LocaleSwitcher } from './LocaleSwitcher';

/** Fixed HUD top bar: logo, primary nav, locale switch, theme toggle (server). */
export function Header() {
  const t = useTranslations('common');

  return (
    <header
      data-testid="site-header"
      className="fixed inset-x-0 top-0 z-50 border-b border-hud-cyan/20 bg-base/80 backdrop-blur-md">
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
          <DesktopMenu items={NAV_ITEMS} className="hidden md:block" />
          <LocaleSwitcher />
          <ThemeButton />
          <MobileMenu items={NAV_ITEMS} className="md:hidden" />
        </div>
      </div>
    </header>
  );
}
