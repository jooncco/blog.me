import { describe, it, expect } from 'vitest';
import { render, screen } from '@testing-library/react';
import { NextIntlClientProvider } from 'next-intl';
import messages from '@/messages/sections.en.json';
import { Projects } from './Projects';
import { groupProjectsByDomain, PROJECTS } from '@/data/projects';

function renderIntl(ui: React.ReactNode) {
  return render(
    <NextIntlClientProvider locale="en" messages={messages as never}>
      {ui}
    </NextIntlClientProvider>,
  );
}

describe('Projects (mission log)', () => {
  it('renders a group per non-empty domain and every project card', () => {
    const groups = groupProjectsByDomain();
    renderIntl(<Projects groups={groups} />);

    for (const g of groups) {
      expect(screen.getByTestId(`project-group-${g.domain}`)).toBeInTheDocument();
    }
    for (const p of PROJECTS) {
      expect(screen.getByTestId(`mission-${p.id}`)).toBeInTheDocument();
    }
  });

  it('leads each card with the outcome and renders tech chips + client note', () => {
    renderIntl(<Projects groups={groupProjectsByDomain()} />);
    const card = screen.getByTestId('mission-aboitiz-ocr-meter');
    expect(card.querySelector('[data-testid="mission-outcome"]')?.textContent).toContain(
      'intelligent electricity-meter reading',
    );
    expect(card.querySelector('[data-testid="mission-tech"]')?.textContent).toContain('Flutter');
    expect(card.textContent).toContain('Aboitiz Power');
  });

  it('covers all four expertise domains', () => {
    const domains = new Set(PROJECTS.map((p) => p.domain));
    expect(domains).toEqual(
      new Set(['solutions-architecture', 'full-stack', 'ai-agents', 'algo-trading']),
    );
  });
});
