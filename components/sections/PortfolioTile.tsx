import { clsx } from 'clsx';
import { HudFrame, Scanline } from '@/components/hud';
import { GithubIcon, EyeIcon } from '@/components/Icons';
import type { PortfolioItem } from '@/types';

export type PortfolioTileProps = {
  item: PortfolioItem;
  /** Localized action labels. */
  githubLabel: string;
  demoLabel: string;
};

const sizeClass: Record<NonNullable<PortfolioItem['size']>, string> = {
  lg: 'sm:col-span-2 sm:row-span-2',
  md: 'sm:col-span-1 sm:row-span-2',
  sm: 'sm:col-span-1 sm:row-span-1',
};

/** One bento tile with a hover preview, scanline sweep, and quick Github/demo actions. */
export function PortfolioTile({ item, githubLabel, demoLabel }: PortfolioTileProps) {
  const size = item.size ?? 'sm';

  return (
    <HudFrame
      variant="panel"
      className={clsx(
        'group relative min-h-[10rem] overflow-hidden',
        'transition-all duration-200 hover:shadow-glow-cyan',
        sizeClass[size],
      )}>
      {/* eslint-disable-next-line @next/next/no-img-element */}
      <img
        src={item.thumbnail}
        alt={item.title}
        loading="lazy"
        className="absolute inset-0 h-full w-full object-cover opacity-100 transition-transform duration-300 group-hover:scale-105"
      />
      <Scanline
        intensity="soft"
        className="opacity-0 transition-opacity duration-300 group-hover:opacity-100"
      />

      <div
        data-testid={`portfolio-tile-${item.id}`}
        className="relative z-10 flex h-full flex-col justify-end gap-2 bg-gradient-to-t from-black/95 via-black/70 to-black/25 p-4 [text-shadow:0_1px_3px_rgba(0,0,0,0.9)]">
        <h3 className="font-display text-base font-semibold uppercase tracking-wide text-white">
          {item.title}
        </h3>
        <p className="line-clamp-2 font-sans text-xs text-white/85">
          {item.desc}
        </p>
        <div className="flex items-center gap-2 pt-1">
          {item.githubUrl && (
            <a
              href={item.githubUrl}
              target="_blank"
              rel="noopener noreferrer"
              aria-label={githubLabel}
              data-testid={`portfolio-github-${item.id}`}
              className="text-white/80 transition-colors hover:text-hud-cyan">
              <GithubIcon className="h-5 w-5" />
            </a>
          )}
          {item.demoUrl && (
            <a
              href={item.demoUrl}
              target="_blank"
              rel="noopener noreferrer"
              aria-label={demoLabel}
              data-testid={`portfolio-demo-${item.id}`}
              className="text-white/80 transition-colors hover:text-hud-cyan">
              <EyeIcon className="h-5 w-5" />
            </a>
          )}
        </div>
      </div>
    </HudFrame>
  );
}
