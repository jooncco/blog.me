'use client';

import { useEffect, useRef, useState } from 'react';
import { useTranslations } from 'next-intl';
import { clsx } from 'clsx';
import { Link } from '@/i18n/navigation';
import { EllipsisHorizontalIcon, XMarkIcon } from '@/components/Icons';
import type { NavItem } from './config';

export type MobileMenuProps = {
  items: readonly NavItem[];
  className?: string;
};

/** Mobile dropdown navigation with click-away dismissal (client). */
export function MobileMenu({ items, className }: MobileMenuProps) {
  const t = useTranslations('nav');
  const containerRef = useRef<HTMLDivElement>(null);
  const [open, setOpen] = useState(false);

  useEffect(() => {
    if (!open) return;
    const handleClickAway = (event: MouseEvent) => {
      if (containerRef.current && !containerRef.current.contains(event.target as Node)) {
        setOpen(false);
      }
    };
    window.addEventListener('mousedown', handleClickAway);
    return () => window.removeEventListener('mousedown', handleClickAway);
  }, [open]);

  return (
    <div ref={containerRef} className={clsx('relative', className)}>
      <button
        type="button"
        data-testid="mobile-menu-toggle"
        aria-expanded={open}
        aria-label={open ? t('closeMenu') : t('openMenu')}
        onClick={() => setOpen((v) => !v)}
        className="rounded-sm p-2 text-text transition-colors hover:text-hud-cyan hover:bg-hud-cyan/10">
        {open ? <XMarkIcon /> : <EllipsisHorizontalIcon />}
      </button>

      {open && (
        <nav
          aria-label="Primary"
          data-testid="mobile-menu"
          className={clsx(
            'absolute right-0 top-12 z-50 min-w-[10rem]',
            'hud-panel-surface rounded-sm border border-hud-cyan/30 shadow-glow-cyan',
          )}>
          <ul className="flex flex-col py-2">
            {items.map((item) => (
              <li key={item.id}>
                <Link
                  href={item.href}
                  data-testid={`mobile-nav-link-${item.id}`}
                  onClick={() => setOpen(false)}
                  className="block px-4 py-2 font-display text-sm uppercase tracking-wider text-text/80 transition-colors hover:text-hud-cyan hover:bg-hud-cyan/10">
                  {t(item.id)}
                </Link>
              </li>
            ))}
          </ul>
        </nav>
      )}
    </div>
  );
}
