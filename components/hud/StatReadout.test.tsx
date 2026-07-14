import { describe, it, expect, afterEach, vi } from 'vitest';
import { render, screen, cleanup } from '@testing-library/react';
import { StatReadout } from './StatReadout';

function mockReducedMotion(reduced: boolean) {
  vi.stubGlobal(
    'matchMedia',
    (query: string) =>
      ({
        matches: reduced && query.includes('reduce'),
        media: query,
        onchange: null,
        addEventListener: () => {},
        removeEventListener: () => {},
        addListener: () => {},
        removeListener: () => {},
        dispatchEvent: () => false,
      }) as unknown as MediaQueryList,
  );
}

afterEach(() => {
  cleanup();
  vi.unstubAllGlobals();
});

describe('StatReadout', () => {
  it('renders label and unit', () => {
    mockReducedMotion(true);
    render(<StatReadout label="Rating" value={1873} unit="pts" />);
    expect(screen.getByText('Rating')).toBeInTheDocument();
    expect(screen.getByText('pts')).toBeInTheDocument();
  });

  it('shows the final formatted value as the reduced-motion fallback', () => {
    mockReducedMotion(true);
    render(<StatReadout label="Solved" value={1234} />);
    // count-up is skipped; final value shown directly.
    expect(screen.getByText('1,234')).toBeInTheDocument();
  });

  it('passes through string values without animation', () => {
    mockReducedMotion(false);
    render(<StatReadout label="Level" value="Knight" />);
    expect(screen.getByText('Knight')).toBeInTheDocument();
  });
});
