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
    expect(screen.getByText('Building AI agents')).toBeInTheDocument();
    expect(screen.getByText('Algorithmic trading')).toBeInTheDocument();
  });
});
