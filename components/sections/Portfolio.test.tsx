import { describe, it, expect } from 'vitest';
import { render, screen, fireEvent } from '@testing-library/react';
import { NextIntlClientProvider } from 'next-intl';
import messages from '@/messages/sections.en.json';
import { Portfolio } from './Portfolio';
import { PORTFOLIO, PORTFOLIO_CATEGORIES } from '@/data/portfolio';

function renderIntl(ui: React.ReactNode) {
  return render(
    <NextIntlClientProvider locale="en" messages={messages as never}>
      {ui}
    </NextIntlClientProvider>,
  );
}

describe('Portfolio (bento hangar)', () => {
  it('renders all tiles by default', () => {
    renderIntl(<Portfolio items={PORTFOLIO} categories={[...PORTFOLIO_CATEGORIES]} />);
    for (const item of PORTFOLIO) {
      expect(screen.getByTestId(`portfolio-tile-${item.id}`)).toBeInTheDocument();
    }
  });

  it('filters tiles by category', () => {
    renderIntl(<Portfolio items={PORTFOLIO} categories={[...PORTFOLIO_CATEGORIES]} />);
    fireEvent.click(screen.getByTestId('portfolio-filter-tools'));

    const tools = PORTFOLIO.filter((i) => i.category === 'tools');
    const web = PORTFOLIO.filter((i) => i.category === 'web');
    expect(screen.getByTestId(`portfolio-tile-${tools[0].id}`)).toBeInTheDocument();
    expect(screen.queryByTestId(`portfolio-tile-${web[0].id}`)).not.toBeInTheDocument();
  });
});
