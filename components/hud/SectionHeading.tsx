import { clsx } from 'clsx';
import { Reticle } from './Reticle';

export type SectionHeadingProps = {
  kicker?: string;
  title: string;
  id: string;
  align?: 'left' | 'center';
};

/** HUD-styled section title with an optional kicker and a reticle motif. */
export function SectionHeading({ kicker, title, id, align = 'left' }: SectionHeadingProps) {
  const centered = align === 'center';
  return (
    <header
      className={clsx('flex flex-col gap-2', centered ? 'items-center text-center' : 'items-start')}>
      <div className="flex items-center gap-2">
        <Reticle size={18} className="text-hud-cyan/80" />
        {kicker && (
          <span className="font-mono text-xs uppercase tracking-[0.35em] text-hud-cyan/80">
            {kicker}
          </span>
        )}
      </div>
      <h2
        id={id}
        className="font-display text-3xl font-semibold uppercase tracking-wide text-text sm:text-4xl">
        {title}
      </h2>
      <span
        aria-hidden="true"
        className={clsx(
          'h-px w-24 bg-gradient-to-r from-hud-cyan/80 to-transparent',
          centered && 'from-transparent via-hud-cyan/80',
        )}
      />
    </header>
  );
}
