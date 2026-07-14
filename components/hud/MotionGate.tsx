'use client';

import type { ReactNode } from 'react';
import { usePrefersReducedMotion } from './useReducedMotion';

export type MotionGateProps = {
  children: ReactNode;
  /** Static content shown when the user prefers reduced motion. */
  fallback?: ReactNode;
};

/**
 * Renders animated `children` normally, but swaps in a static `fallback` when the
 * user prefers reduced motion. If no fallback is supplied, `children` are rendered
 * either way (global CSS in globals.css already neutralizes CSS animations).
 */
export function MotionGate({ children, fallback }: MotionGateProps) {
  const reduced = usePrefersReducedMotion();
  if (reduced && fallback !== undefined) {
    return <>{fallback}</>;
  }
  return <>{children}</>;
}
