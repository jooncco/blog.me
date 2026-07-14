import Image from 'next/image';
import { useTranslations } from 'next-intl';
import { Divider } from '@/components/hud';
import { SOCIAL_LINKS } from './config';

/** HUD footer with logo, social links and copyright (server). */
export function Footer() {
  const t = useTranslations('footer');
  const year = new Date().getFullYear();

  return (
    <footer
      data-testid="site-footer"
      className="w-full border-t border-hud-cyan/20 bg-neutral px-6 py-8">
      <div className="mx-auto flex max-w-7xl flex-col items-center gap-4 text-center">
        <Image
          src="/assets/images/logo.png"
          alt=""
          width={40}
          height={40}
          className="h-10 w-10 opacity-80"
        />

        <nav aria-label={t('social')}>
          <ul className="flex items-center gap-4">
            {SOCIAL_LINKS.map(({ id, label, href, Icon }) => (
              <li key={id}>
                <a
                  href={href}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label={label}
                  title={label}
                  data-testid={`social-link-${id}`}
                  className="block text-text/60 transition-colors hover:text-hud-cyan">
                  <Icon />
                </a>
              </li>
            ))}
          </ul>
        </nav>

        <Divider label={t('rights')} />

        <p className="font-mono text-xs uppercase tracking-wider text-text/50">
          {t('copyright', { year })}
        </p>
      </div>
    </footer>
  );
}
