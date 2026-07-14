import { Chip, HudFrame } from '@/components/hud';
import { Link } from '@/i18n/navigation';
import type { BlogListPost } from './PostTile';

export type PostRowProps = { post: BlogListPost };

/** One post per line for the blog "list view" — small thumbnail + title + meta. */
export function PostRow({ post }: PostRowProps) {
  return (
    <HudFrame
      as="article"
      variant="panel"
      className="group relative flex items-center gap-4 p-3 transition-shadow hover:shadow-glow-cyan sm:gap-5 sm:p-4"
      data-testid="post-row">
      {post.ogImage ? (
        // eslint-disable-next-line @next/next/no-img-element
        <img
          src={post.ogImage}
          alt=""
          aria-hidden="true"
          loading="lazy"
          className="h-16 w-24 shrink-0 rounded-sm border border-hud-cyan/20 object-cover sm:h-20 sm:w-32"
        />
      ) : null}

      <div className="min-w-0 flex-1">
        <div className="mb-1 flex flex-wrap items-center gap-2 font-mono text-xs text-text/55">
          <Chip label={post.category} tone="cyan" />
          <span>{post.dateLabel}</span>
        </div>
        <h3 className="font-display text-base font-semibold uppercase leading-snug tracking-wide text-text">
          <Link
            href={`/blog/${post.slug}`}
            className="transition-colors after:absolute after:inset-0 group-hover:text-hud-cyan">
            {post.title}
          </Link>
        </h3>
        {post.teaser ? (
          <p className="mt-1 line-clamp-1 font-sans text-sm text-text/60">{post.teaser}</p>
        ) : null}
      </div>

      <span aria-hidden="true" className="shrink-0 font-mono text-hud-cyan/70 transition-transform group-hover:translate-x-1">
        →
      </span>
    </HudFrame>
  );
}
