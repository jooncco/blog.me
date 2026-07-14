import { describe, it, expect, vi } from 'vitest';
import { render, screen } from '@testing-library/react';
import { NextIntlClientProvider } from 'next-intl';
import messages from '@/messages/sections.en.json';
import { BlogHighlights } from './BlogHighlights';
import type { PostMeta } from '@/types';

// Cross-unit contract: the blog loader is built in U6. We mock it here and never import the
// real module — BlogHighlights itself is presentational (posts passed in by the server page).
vi.mock('@/lib/blog', () => ({
  getLatestPosts: vi.fn().mockResolvedValue([]),
}));

function renderIntl(ui: React.ReactNode) {
  return render(
    <NextIntlClientProvider locale="en" messages={messages as never}>
      {ui}
    </NextIntlClientProvider>,
  );
}

const POSTS: PostMeta[] = [
  {
    slug: 'hello-hud',
    locale: 'en',
    title: 'Hello HUD',
    date: '2026-05-01',
    category: 'web',
    tags: ['next'],
    teaser: 'A first transmission.',
    availableLocales: ['en'],
  },
  {
    slug: 'algo-notes',
    locale: 'en',
    title: 'Algo Notes',
    date: '2026-04-01',
    category: 'competitive-programming',
    tags: ['cp'],
    availableLocales: ['en', 'ko'],
  },
];

describe('BlogHighlights', () => {
  it('renders the provided posts', () => {
    renderIntl(<BlogHighlights posts={POSTS} />);
    expect(screen.getByTestId('blog-post-hello-hud')).toBeInTheDocument();
    expect(screen.getByTestId('blog-post-algo-notes')).toBeInTheDocument();
    expect(screen.getByText('A first transmission.')).toBeInTheDocument();
  });

  it('shows an empty state when there are no posts', () => {
    renderIntl(<BlogHighlights posts={[]} />);
    expect(screen.getByTestId('blog-empty')).toBeInTheDocument();
  });
});
