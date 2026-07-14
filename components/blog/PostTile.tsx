import { clsx } from 'clsx';
import { Chip, HudFrame, Scanline } from '@/components/hud';
import { Link } from '@/i18n/navigation';
import type { PostMeta } from '@/types';

export type BlogTileSize = 'lg' | 'wide' | 'tall' | 'sm';

export type BlogListPost = PostMeta & { dateLabel: string };

export type PostTileProps = {
  post: BlogListPost;
  size: BlogTileSize;
  readMore: string;
};

const sizeClass: Record<BlogTileSize, string> = {
  lg: 'col-span-2 row-span-2',
  wide: 'col-span-2 row-span-1',
  tall: 'col-span-1 row-span-2',
  sm: 'col-span-1 row-span-1',
};

/** Bento card for the blog "card view" — full-bleed teaser thumbnail + meta. */
export function PostTile({ post, size, readMore }: PostTileProps) {
  return (
    <HudFrame
      as="article"
      variant="panel"
      className={clsx(
        'hud-scanline group relative min-h-[11rem] overflow-hidden transition-shadow hover:shadow-glow-cyan',
        sizeClass[size],
      )}
      data-testid="post-tile">
      {post.ogImage ? (
        // eslint-disable-next-line @next/next/no-img-element
        <img
          src={post.ogImage}
          alt=""
          aria-hidden="true"
          loading="lazy"
          className="absolute inset-0 h-full w-full object-cover opacity-30 transition-transform duration-300 group-hover:scale-105"
        />
      ) : null}
      <Scanline intensity="soft" className="opacity-0 transition-opacity duration-300 group-hover:opacity-100" />

      <div className="relative z-10 flex h-full flex-col justify-end gap-2 bg-gradient-to-t from-black/90 via-black/55 to-black/20 p-4">
        <div className="flex flex-wrap items-center gap-2 font-mono text-xs text-white/60">
          <Chip label={post.category} tone="cyan" />
          <span>{post.dateLabel}</span>
        </div>
        <h3 className="font-display text-base font-semibold uppercase leading-snug tracking-wide text-white">
          <Link
            href={`/blog/${post.slug}`}
            className="transition-colors after:absolute after:inset-0 group-hover:text-hud-cyan">
            {post.title}
          </Link>
        </h3>
        {(size === 'lg' || size === 'wide') && post.teaser ? (
          <p className="line-clamp-2 font-sans text-xs text-white/70">{post.teaser}</p>
        ) : null}
        <span className="font-mono text-xs uppercase tracking-wider text-hud-cyan/90">
          {readMore} →
        </span>
      </div>
    </HudFrame>
  );
}
