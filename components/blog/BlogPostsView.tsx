'use client';

import { useState } from 'react';
import { clsx } from 'clsx';
import { PostTile, type BlogListPost, type BlogTileSize } from './PostTile';
import { PostRow } from './PostRow';

export type BlogPostsViewProps = {
  posts: BlogListPost[];
  labels: { readMore: string; viewCard: string; viewList: string };
};

/** Deterministic bento size so the card grid varies without layout shift. */
function tileSize(i: number): BlogTileSize {
  if (i % 7 === 0) return 'lg';
  if (i % 5 === 0) return 'tall';
  if (i % 3 === 0) return 'wide';
  return 'sm';
}

/** Blog listing with a card (bento) / list view toggle. */
export function BlogPostsView({ posts, labels }: BlogPostsViewProps) {
  const [view, setView] = useState<'card' | 'list'>('card');

  const btn = (active: boolean) =>
    clsx(
      'flex items-center gap-1.5 rounded-sm border px-3 py-1.5 font-mono text-xs uppercase tracking-wider transition-colors',
      active
        ? 'border-hud-cyan/70 bg-hud-cyan/10 text-hud-cyan'
        : 'border-hud-cyan/20 text-text/60 hover:text-hud-cyan',
    );

  return (
    <div>
      <div className="mb-5 flex items-center justify-end gap-2" data-testid="blog-view-toggle">
        <button
          type="button"
          onClick={() => setView('card')}
          aria-pressed={view === 'card'}
          data-testid="view-card"
          className={btn(view === 'card')}>
          <svg viewBox="0 0 16 16" className="h-3.5 w-3.5" fill="currentColor" aria-hidden="true">
            <rect x="1" y="1" width="6" height="6" rx="1" />
            <rect x="9" y="1" width="6" height="6" rx="1" />
            <rect x="1" y="9" width="6" height="6" rx="1" />
            <rect x="9" y="9" width="6" height="6" rx="1" />
          </svg>
          {labels.viewCard}
        </button>
        <button
          type="button"
          onClick={() => setView('list')}
          aria-pressed={view === 'list'}
          data-testid="view-list"
          className={btn(view === 'list')}>
          <svg viewBox="0 0 16 16" className="h-3.5 w-3.5" fill="currentColor" aria-hidden="true">
            <rect x="1" y="2" width="14" height="2.5" rx="1" />
            <rect x="1" y="7" width="14" height="2.5" rx="1" />
            <rect x="1" y="12" width="14" height="2.5" rx="1" />
          </svg>
          {labels.viewList}
        </button>
      </div>

      {view === 'card' ? (
        <div className="grid grid-cols-2 gap-4 [grid-auto-flow:dense] [grid-auto-rows:11rem] lg:grid-cols-4">
          {posts.map((post, i) => (
            <PostTile
              key={`${post.slug}-${post.locale}`}
              post={post}
              size={tileSize(i)}
              readMore={labels.readMore}
            />
          ))}
        </div>
      ) : (
        <div className="flex flex-col gap-3">
          {posts.map((post) => (
            <PostRow key={`${post.slug}-${post.locale}`} post={post} />
          ))}
        </div>
      )}
    </div>
  );
}
