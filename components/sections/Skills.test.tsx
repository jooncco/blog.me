import { describe, it, expect } from 'vitest';
import { render, screen, fireEvent } from '@testing-library/react';
import { NextIntlClientProvider } from 'next-intl';
import messages from '@/messages/sections.en.json';
import { Skills } from './Skills';
import { SKILLS } from '@/data/skills';

function renderIntl(ui: React.ReactNode) {
  return render(
    <NextIntlClientProvider locale="en" messages={messages as never}>
      {ui}
    </NextIntlClientProvider>,
  );
}

describe('Skills (reactor clusters)', () => {
  it('renders one cluster per category', () => {
    renderIntl(<Skills categories={SKILLS} />);
    for (const c of SKILLS) {
      expect(screen.getByTestId(`reactor-${c.id}`)).toBeInTheDocument();
    }
  });

  it('expands the first cluster by default and toggles on click', () => {
    renderIntl(<Skills categories={SKILLS} />);
    const first = SKILLS[0];
    const toggle = screen.getByTestId(`reactor-toggle-${first.id}`);
    expect(toggle).toHaveAttribute('aria-expanded', 'true');

    fireEvent.click(toggle);
    expect(toggle).toHaveAttribute('aria-expanded', 'false');

    fireEvent.click(toggle);
    expect(toggle).toHaveAttribute('aria-expanded', 'true');
  });
});
