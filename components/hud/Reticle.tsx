import { clsx } from 'clsx';
import { ReticleIcon } from '@/components/Icons';

export type ReticleProps = {
  /** Pixel size of the reticle (width & height). Defaults to 24. */
  size?: number;
  /** Slowly rotate the reticle (respects prefers-reduced-motion via globals.css). */
  spin?: boolean;
  className?: string;
};

/** Animated targeting-reticle accent glyph. */
export function Reticle({ size = 24, spin = false, className }: ReticleProps) {
  return (
    <ReticleIcon
      aria-hidden="true"
      style={{ width: size, height: size }}
      className={clsx('text-hud-cyan', spin && 'animate-hud-spin', className)}
    />
  );
}
