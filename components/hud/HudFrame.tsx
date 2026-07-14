import { clsx } from 'clsx';
import type { ElementType, ReactNode } from 'react';

export type HudAccent = 'cyan' | 'red' | 'gold';

export type HudFrameProps = {
  as?: ElementType;
  variant?: 'panel' | 'bare';
  glow?: HudAccent | false;
  className?: string;
  children: ReactNode;
};

const glowShadow: Record<HudAccent, string> = {
  cyan: 'shadow-glow-cyan',
  red: 'shadow-glow-red',
  gold: 'shadow-glow-gold',
};

const bracketBorder: Record<HudAccent, string> = {
  cyan: 'border-hud-cyan/70',
  red: 'border-hud-red/70',
  gold: 'border-hud-gold/70',
};

/**
 * Wrapper drawing HUD corner brackets with an optional glow border.
 * `variant="panel"` adds the translucent HUD surface; `variant="bare"` is
 * brackets-only (transparent).
 */
export function HudFrame({
  as: Tag = 'div',
  variant = 'panel',
  glow = false,
  className,
  children,
}: HudFrameProps) {
  const accent: HudAccent = glow || 'cyan';
  const corner = clsx('pointer-events-none absolute h-4 w-4', bracketBorder[accent]);

  return (
    <Tag
      className={clsx(
        'relative',
        variant === 'panel' && 'hud-panel-surface rounded-sm',
        glow && glowShadow[glow],
        className,
      )}>
      <span aria-hidden="true" className={clsx(corner, 'left-0 top-0 border-l-2 border-t-2')} />
      <span aria-hidden="true" className={clsx(corner, 'right-0 top-0 border-r-2 border-t-2')} />
      <span aria-hidden="true" className={clsx(corner, 'bottom-0 left-0 border-b-2 border-l-2')} />
      <span aria-hidden="true" className={clsx(corner, 'bottom-0 right-0 border-b-2 border-r-2')} />
      {children}
    </Tag>
  );
}
