import { describe, it, expect, afterEach } from 'vitest';
import { render, screen, cleanup } from '@testing-library/react';
import { SectionHeading } from './SectionHeading';
import { GlowText } from './GlowText';
import { Chip } from './Chip';
import { HudFrame } from './HudFrame';
import { HudPanel } from './HudPanel';
import { Divider } from './Divider';

afterEach(cleanup);

describe('SectionHeading', () => {
  it('renders the title with the given id and kicker', () => {
    render(<SectionHeading id="about" kicker="SECTOR 01" title="About" />);
    const heading = screen.getByRole('heading', { name: 'About' });
    expect(heading).toHaveAttribute('id', 'about');
    expect(screen.getByText('SECTOR 01')).toBeInTheDocument();
  });
});

describe('GlowText', () => {
  it('applies the accent glow class per color', () => {
    const { container } = render(<GlowText color="red">alert</GlowText>);
    expect(container.firstElementChild?.className).toContain('hud-text-glow-red');
  });
});

describe('Chip', () => {
  it('renders a mono label with tone class + test id', () => {
    render(<Chip label="TypeScript" tone="gold" />);
    const chip = screen.getByTestId('hud-chip');
    expect(chip).toHaveTextContent('TypeScript');
    expect(chip.className).toContain('text-hud-gold');
  });
});

describe('HudFrame', () => {
  it('renders panel surface + glow shadow and 4 corner brackets', () => {
    const { container } = render(
      <HudFrame glow="cyan">
        <p>content</p>
      </HudFrame>,
    );
    const root = container.firstElementChild as HTMLElement;
    expect(root.className).toContain('hud-panel-surface');
    expect(root.className).toContain('shadow-glow-cyan');
    // 4 corner bracket spans, all aria-hidden.
    expect(root.querySelectorAll('span[aria-hidden="true"]').length).toBe(4);
  });

  it('supports a custom element via `as`', () => {
    const { container } = render(
      <HudFrame as="section" variant="bare">
        <p>x</p>
      </HudFrame>,
    );
    expect(container.firstElementChild?.tagName).toBe('SECTION');
  });
});

describe('HudPanel', () => {
  it('renders header and footer rails', () => {
    render(
      <HudPanel header="STATUS" footer="v2.0">
        <p>body</p>
      </HudPanel>,
    );
    expect(screen.getByText('STATUS')).toBeInTheDocument();
    expect(screen.getByText('body')).toBeInTheDocument();
    expect(screen.getByText('v2.0')).toBeInTheDocument();
  });
});

describe('Divider', () => {
  it('exposes a separator role and optional label', () => {
    render(<Divider label="MISSION LOG" />);
    const sep = screen.getByRole('separator');
    expect(sep).toHaveAttribute('aria-label', 'MISSION LOG');
    expect(screen.getByText('MISSION LOG')).toBeInTheDocument();
  });
});
