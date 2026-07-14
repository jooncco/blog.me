import { describe, it, expect } from 'vitest';
import { render, screen } from '@testing-library/react';
import { NextIntlClientProvider } from 'next-intl';
import messages from '@/messages/sections.en.json';
import { About } from './About';
import { ABOUT } from '@/data/about';

function renderIntl(ui: React.ReactNode) {
  return render(
    <NextIntlClientProvider locale="en" messages={messages as never}>
      {ui}
    </NextIntlClientProvider>,
  );
}

describe('About', () => {
  it('renders the four capabilities in the locked order', () => {
    renderIntl(<About data={ABOUT} />);
    const grid = screen.getByTestId('capabilities-grid');
    const titles = Array.from(grid.querySelectorAll('[data-testid^="capability-"]')).map(
      (el) => el.textContent,
    );
    expect(titles).toEqual([
      'Solutions Architect',
      'Full Stack Engineer',
      'AI Agent Specialist',
      'Algorithmic Trading Enthusiast',
    ]);
  });

  it('renders the greeting name and the typewriter slot', () => {
    renderIntl(<About data={ABOUT} />);
    expect(screen.getByText('Daniel')).toBeInTheDocument();
    expect(screen.getByTestId('about-typewriter')).toBeInTheDocument();
  });
});
