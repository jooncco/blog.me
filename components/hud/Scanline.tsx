import { clsx } from 'clsx';

export type ScanlineProps = {
  intensity?: 'soft' | 'strong';
  /** Also render a blueprint grid behind the scanlines. */
  grid?: boolean;
  className?: string;
};

/**
 * Decorative scanline (+ optional grid) overlay. Absolutely positioned and
 * non-interactive — drop inside a `relative` container.
 */
export function Scanline({ intensity = 'soft', grid = false, className }: ScanlineProps) {
  return (
    <span
      aria-hidden="true"
      className={clsx(
        'pointer-events-none absolute inset-0 hud-scanline-fill',
        intensity === 'strong' && 'hud-scanline-fill--strong',
        grid && 'hud-grid-bg',
        className,
      )}
    />
  );
}
