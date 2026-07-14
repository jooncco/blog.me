import { clsx } from 'clsx';
import type { ReactNode } from 'react';
import { HudFrame } from './HudFrame';

export type HudPanelProps = {
  header?: ReactNode;
  footer?: ReactNode;
  glow?: boolean;
  className?: string;
  children: ReactNode;
};

/**
 * Surface panel — translucent HUD frame with a subtle scanline overlay and
 * optional header / footer rails.
 */
export function HudPanel({ header, footer, glow = false, className, children }: HudPanelProps) {
  return (
    <HudFrame
      variant="panel"
      glow={glow ? 'cyan' : false}
      className={clsx('hud-scanline overflow-hidden', className)}>
      {header !== undefined && (
        <div className="border-b border-hud-cyan/20 px-4 py-2 font-display text-sm uppercase tracking-widest text-hud-cyan">
          {header}
        </div>
      )}
      <div className="p-4">{children}</div>
      {footer !== undefined && (
        <div className="border-t border-hud-cyan/20 px-4 py-2 font-mono text-xs text-hud-cyan/80">
          {footer}
        </div>
      )}
    </HudFrame>
  );
}
