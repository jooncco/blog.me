import { describe, it, expect, vi } from 'vitest';
import { render, screen, fireEvent } from '@testing-library/react';
import { HudButton } from './HudButton';

describe('HudButton', () => {
  it('renders a <button> by default with the test id', () => {
    render(<HudButton>Engage</HudButton>);
    const btn = screen.getByTestId('hud-button');
    expect(btn.tagName).toBe('BUTTON');
    expect(btn).toHaveTextContent('Engage');
  });

  it('renders an <a> when href is provided', () => {
    render(<HudButton href="/systems">Systems</HudButton>);
    const link = screen.getByTestId('hud-button');
    expect(link.tagName).toBe('A');
    expect(link).toHaveAttribute('href', '/systems');
  });

  it('applies variant + size classes', () => {
    render(
      <HudButton variant="outline" size="lg">
        Outline
      </HudButton>,
    );
    const btn = screen.getByTestId('hud-button');
    expect(btn.className).toContain('border-hud-cyan/60');
    expect(btn.className).toContain('px-6');
  });

  it('fires onClick and is disabled when loading', () => {
    const onClick = vi.fn();
    const { rerender } = render(<HudButton onClick={onClick}>Go</HudButton>);
    fireEvent.click(screen.getByTestId('hud-button'));
    expect(onClick).toHaveBeenCalledTimes(1);

    rerender(
      <HudButton onClick={onClick} loading>
        Go
      </HudButton>,
    );
    const btn = screen.getByTestId('hud-button') as HTMLButtonElement;
    expect(btn.disabled).toBe(true);
    expect(btn).toHaveAttribute('aria-busy', 'true');
  });
});
