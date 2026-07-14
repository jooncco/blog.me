import { useTranslations } from 'next-intl';
import { clsx } from 'clsx';
import { Link } from '@/i18n/navigation';
import type { NavItem } from './config';

export type DesktopMenuProps = {
  items: readonly NavItem[];
  className?: string;
};

/** Desktop horizontal navigation (server; locale-aware links). */
export function DesktopMenu({ items, className }: DesktopMenuProps) {
  const t = useTranslations('nav');

  return (
    <nav aria-label="Primary" className={className}>
      <ul className="flex items-center gap-1" data-testid="desktop-menu">
        {items.map((item) => (
          <li key={item.id}>
            <Link
              href={item.href}
              data-testid={`nav-link-${item.id}`}
              className={clsx(
                'block rounded-sm px-3 py-1.5 font-display text-sm uppercase tracking-wider',
                'text-text/80 transition-colors hover:text-hud-cyan hover:bg-hud-cyan/10',
              )}>
              {t(item.id)}
            </Link>
          </li>
        ))}
      </ul>
    </nav>
  );
}
