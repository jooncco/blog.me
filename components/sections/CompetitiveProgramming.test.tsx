import { describe, it, expect } from 'vitest';
import { render, screen } from '@testing-library/react';
import { NextIntlClientProvider } from 'next-intl';
import messages from '@/messages/sections.en.json';
import { CompetitiveProgramming } from './CompetitiveProgramming';
import type { CPStat } from '@/types';

// Component is presentational (stats passed in) — no need to hit @/lib/cp.
const STATS: CPStat[] = [
  {
    platform: 'leetcode',
    handle: 'jooncco',
    profileUrl: 'https://leetcode.com/jooncco',
    level: 'Knight',
    rating: 1986,
    rank: 14368,
    attended: 18,
    topPercent: 2.98,
    fetchedAt: '2025-01-01T00:00:00.000Z',
    source: 'fallback',
  },
  {
    platform: 'codeforces',
    handle: 'jooncco',
    profileUrl: 'https://codeforces.com/profile/jooncco',
    level: 'Specialist',
    rating: 1516,
    attended: 43,
    topPercent: 2.77,
    fetchedAt: '2025-01-01T00:00:00.000Z',
    source: 'live',
  },
];

function renderIntl(ui: React.ReactNode) {
  return render(
    <NextIntlClientProvider locale="en" messages={messages as never}>
      {ui}
    </NextIntlClientProvider>,
  );
}

describe('CompetitiveProgramming', () => {
  it('renders a HUD card per platform with the level and profile link', () => {
    renderIntl(<CompetitiveProgramming stats={STATS} />);
    expect(screen.getByTestId('cp-card-leetcode')).toBeInTheDocument();
    expect(screen.getByTestId('cp-card-codeforces')).toBeInTheDocument();
    expect(screen.getByText('Knight')).toBeInTheDocument();
    expect(screen.getByTestId('cp-profile-leetcode')).toHaveAttribute(
      'href',
      'https://leetcode.com/jooncco',
    );
  });

  it('flags the data source (live vs cached)', () => {
    renderIntl(<CompetitiveProgramming stats={STATS} />);
    expect(screen.getByTestId('cp-source-leetcode')).toHaveTextContent('Cached');
    expect(screen.getByTestId('cp-source-codeforces')).toHaveTextContent('Live');
  });
});
