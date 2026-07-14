import { clsx } from 'clsx';
import type { ReactNode } from 'react';
import { SectionHeading } from '@/components/hud';

export type SectionProps = {
  /** Anchor id (also the SectionHeading id). */
  id: string;
  title: string;
  kicker?: string;
  align?: 'left' | 'center';
  className?: string;
  /** Hide the heading (e.g. the hero About section renders its own). */
  hideHeading?: boolean;
  children: ReactNode;
};

/**
 * HUD section wrapper (replaces the legacy hoc/SectionWrapper): a semantic `<section>`
 * with a scroll anchor and a `SectionHeading`. Chrome strings are passed in already
 * localized by the caller.
 */
export function Section({
  id,
  title,
  kicker,
  align,
  className,
  hideHeading = false,
  children,
}: SectionProps) {
  return (
    <section
      id={id}
      data-testid={`section-${id}`}
      aria-labelledby={hideHeading ? undefined : `${id}-heading`}
      className={clsx('scroll-mt-24 px-4 py-12 sm:px-8 sm:py-16', className)}>
      {!hideHeading && (
        <div className="mb-8">
          <SectionHeading id={`${id}-heading`} title={title} kicker={kicker} align={align} />
        </div>
      )}
      {children}
    </section>
  );
}
