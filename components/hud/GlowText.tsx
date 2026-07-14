import { clsx } from 'clsx';
import type { ReactNode } from 'react';
import type { HudAccent } from './HudFrame';

export type GlowTextProps = {
  color?: HudAccent;
  className?: string;
  children: ReactNode;
};

const glowClass: Record<HudAccent, string> = {
  cyan: 'hud-text-glow-cyan',
  red: 'hud-text-glow-red',
  gold: 'hud-text-glow-gold',
};

/** Inline neon-glow text in a HUD accent color. */
export function GlowText({ color = 'cyan', className, children }: GlowTextProps) {
  return <span className={clsx(glowClass[color], className)}>{children}</span>;
}
