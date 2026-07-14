import { describe, it, expect } from 'vitest';
import { render, screen } from '@testing-library/react';
import { NextIntlClientProvider } from 'next-intl';
import en from '@/messages/en.json';
import { DesktopMenu } from './DesktopMenu';
import { Footer } from './Footer';
import { NAV_ITEMS, SOCIAL_LINKS } from './config';

function renderWithIntl(ui: React.ReactNode) {
  return render(
    <NextIntlClientProvider locale="en" messages={en}>
      {ui}
    </NextIntlClientProvider>,
  );
}

describe('shell smoke', () => {
  it('renders every nav link with its localized label', () => {
    const navLabels = en.nav as Record<string, string>;
    const items = NAV_ITEMS.map((i) => ({ ...i, label: navLabels[i.id] ?? i.id }));
    renderWithIntl(<DesktopMenu items={items} />);
    for (const item of items) {
      const link = screen.getByTestId(`nav-link-${item.id}`);
      expect(link).toBeInTheDocument();
      expect(link.textContent?.trim()).toBe(item.label);
    }
  });

  it('renders the footer with all social links', () => {
    renderWithIntl(<Footer />);
    expect(screen.getByTestId('site-footer')).toBeInTheDocument();
    for (const link of SOCIAL_LINKS) {
      expect(screen.getByTestId(`social-link-${link.id}`)).toBeInTheDocument();
    }
  });
});
