import { describe, it, expect } from 'vitest';
import { render, screen } from '@testing-library/react';
import { NextIntlClientProvider } from 'next-intl';
import messages from '@/messages/sections.en.json';
import { Now } from './Now';
import { NOW } from '@/data/now';

function renderIntl(ui: React.ReactNode) {
  return render(
    <NextIntlClientProvider locale="en" messages={messages as never}>
      {ui}
    </NextIntlClientProvider>,
  );
}

describe('Now', () => {
  it('renders every focus item with a localized label', () => {
    renderIntl(<Now data={NOW} />);
    expect(screen.getByTestId('now-items')).toBeInTheDocument();
    expect(screen.getByText('Algorithmic trading')).toBeInTheDocument();
    expect(screen.getByText('Reading')).toBeInTheDocument();
    expect(screen.getByText('Baseball')).toBeInTheDocument();
    // Repo link + Instagram CTA render from structural data.
    expect(screen.getByTestId('now-link-algo-trading')).toBeInTheDocument();
    expect(screen.getByTestId('now-instagram-baseball')).toBeInTheDocument();
  });
});
