'use client';

import { clsx } from 'clsx';
import type { ReactNode } from 'react';

export type HudButtonProps = {
  variant?: 'solid' | 'ghost' | 'outline';
  size?: 'sm' | 'md' | 'lg';
  href?: string;
  disabled?: boolean;
  loading?: boolean;
  onClick?: () => void;
  type?: 'button' | 'submit' | 'reset';
  className?: string;
  children: ReactNode;
};

const sizeClass: Record<NonNullable<HudButtonProps['size']>, string> = {
  sm: 'px-3 py-1 text-xs',
  md: 'px-4 py-2 text-sm',
  lg: 'px-6 py-3 text-base',
};

const variantClass: Record<NonNullable<HudButtonProps['variant']>, string> = {
  solid: 'bg-hud-cyan/90 text-[#05070A] hover:bg-hud-cyan hover:shadow-glow-cyan',
  outline: 'border border-hud-cyan/60 text-hud-cyan hover:border-hud-cyan hover:shadow-glow-cyan',
  ghost: 'text-hud-cyan hover:bg-hud-cyan/10',
};

/**
 * HUD button with a bracket frame and hover glow. Renders an <a> when `href`
 * is provided, otherwise a <button>. Interactive/animated → client component.
 */
export function HudButton({
  variant = 'solid',
  size = 'md',
  href,
  disabled = false,
  loading = false,
  onClick,
  type = 'button',
  className,
  children,
}: HudButtonProps) {
  const isDisabled = disabled || loading;
  const classes = clsx(
    'relative inline-flex items-center justify-center gap-2 rounded-sm font-display uppercase tracking-wider',
    'transition-all duration-200 focus-visible:outline-none focus-visible:shadow-glow-cyan',
    sizeClass[size],
    variantClass[variant],
    isDisabled && 'pointer-events-none opacity-50',
    className,
  );

  const content = (
    <>
      {loading && (
        <span
          aria-hidden="true"
          className="h-3 w-3 animate-hud-spin rounded-full border border-current border-t-transparent"
        />
      )}
      {children}
    </>
  );

  if (href && !isDisabled) {
    return (
      <a data-testid="hud-button" href={href} onClick={onClick} className={classes}>
        {content}
      </a>
    );
  }

  return (
    <button
      data-testid="hud-button"
      type={type}
      onClick={onClick}
      disabled={isDisabled}
      aria-busy={loading || undefined}
      className={classes}>
      {content}
    </button>
  );
}
