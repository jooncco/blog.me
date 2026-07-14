import { describe, it, expect, afterEach, vi } from 'vitest';
import { render, screen, cleanup } from '@testing-library/react';
import { MotionGate } from './MotionGate';

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

describe('MotionGate', () => {
  it('renders animated children when motion is allowed', () => {
    mockReducedMotion(false);
    render(
      <MotionGate fallback={<span>static</span>}>
        <span>animated</span>
      </MotionGate>,
    );
    expect(screen.getByText('animated')).toBeInTheDocument();
    expect(screen.queryByText('static')).not.toBeInTheDocument();
  });

  it('renders the fallback when the user prefers reduced motion', () => {
    mockReducedMotion(true);
    render(
      <MotionGate fallback={<span>static</span>}>
        <span>animated</span>
      </MotionGate>,
    );
    expect(screen.getByText('static')).toBeInTheDocument();
    expect(screen.queryByText('animated')).not.toBeInTheDocument();
  });

  it('falls back to children when no fallback is provided (even if reduced)', () => {
    mockReducedMotion(true);
    render(
      <MotionGate>
        <span>animated</span>
      </MotionGate>,
    );
    expect(screen.getByText('animated')).toBeInTheDocument();
  });
});
