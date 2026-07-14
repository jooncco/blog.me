import { getTranslations } from 'next-intl/server';
import { clsx } from 'clsx';
import { Link } from '@/i18n/navigation';

export type CategoryNavProps = {
  categories: string[];
  active?: string;
};

/** Category filter chips linking to the index / per-category routes (Unit U6). */
export async function CategoryNav({ categories, active }: CategoryNavProps) {
  const t = await getTranslations('blog');

  const item = (label: string, href: string, isActive: boolean, key: string) => (
    <Link
      key={key}
      href={href}
      data-testid="category-nav-item"
      aria-current={isActive ? 'page' : undefined}
      className={clsx(
        'inline-flex items-center rounded-sm border px-3 py-1 font-mono text-xs uppercase tracking-wide transition-colors',
        isActive
          ? 'border-hud-cyan bg-hud-cyan/15 text-hud-cyan shadow-glow-cyan'
          : 'border-text/20 text-text/70 hover:border-hud-cyan/50 hover:text-hud-cyan',
      )}>
      {label}
    </Link>
  );

  return (
    <nav
      aria-label={t('categories')}
      data-testid="category-nav"
      className="flex flex-wrap items-center gap-2">
      {item(t('all'), '/blog', !active, 'all')}
      {categories.map((c) =>
        item(c, `/blog/category/${encodeURIComponent(c)}`, c === active, c),
      )}
    </nav>
  );
}
