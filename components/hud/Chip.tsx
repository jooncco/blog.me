import { clsx } from 'clsx';
import type { HudAccent } from './HudFrame';

export type ChipProps = {
  label: string;
  tone?: HudAccent | 'neutral';
  className?: string;
};

const toneClass: Record<NonNullable<ChipProps['tone']>, string> = {
  cyan: 'border-hud-cyan/40 text-hud-cyan',
  red: 'border-hud-red/40 text-hud-red',
  gold: 'border-hud-gold/40 text-hud-gold',
  neutral: 'border-text/20 text-text/80',
};

/** Tech / tag chip with a mono label. */
export function Chip({ label, tone = 'cyan', className }: ChipProps) {
  return (
    <span
      data-testid="hud-chip"
      className={clsx(
        'inline-flex items-center rounded-sm border bg-neutral2/40 px-2 py-0.5 font-mono text-xs tracking-wide',
        toneClass[tone],
        className,
      )}>
      {label}
    </span>
  );
}
