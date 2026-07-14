import { describe, it, expect } from 'vitest';
import { render, screen } from '@testing-library/react';
import { NextIntlClientProvider } from 'next-intl';
import messages from '@/messages/sections.en.json';
import { ExperienceTimeline } from './ExperienceTimeline';
import { EXPERIENCE } from '@/data/experience';

function renderIntl(ui: React.ReactNode) {
  return render(
    <NextIntlClientProvider locale="en" messages={messages as never}>
      {ui}
    </NextIntlClientProvider>,
  );
}

describe('ExperienceTimeline', () => {
  it('renders an entry per role', () => {
    renderIntl(<ExperienceTimeline entries={EXPERIENCE} />);
    for (const e of EXPERIENCE) {
      expect(screen.getByTestId(`experience-${e.id}`)).toBeInTheDocument();
    }
  });

  it('labels ongoing roles as "Present"', () => {
    renderIntl(<ExperienceTimeline entries={EXPERIENCE} />);
    const ongoing = EXPERIENCE.find((e) => !e.end);
    expect(ongoing).toBeDefined();
    expect(screen.getByTestId(`experience-${ongoing!.id}`).textContent).toContain('Present');
  });
});
