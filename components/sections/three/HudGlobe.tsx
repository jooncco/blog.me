'use client';

import { usePrefersReducedMotion } from '@/components/hud';

export type HudGlobeProps = { label?: string };

// Latitude wireframe rings (perspective-flattened horizontal ellipses).
const LATITUDES = [-56, -32, 0, 32, 56].map((y) => {
  const rx = Math.sqrt(78 * 78 - y * y);
  return { cy: 100 + y, rx, ry: Math.max(3, rx * 0.16) };
});
// Longitude rings (vertical ellipses of varying width) rotated as a group.
const LONGITUDES = [12, 30, 50, 68, 78];

/**
 * A lightweight SVG "HUD globe" — a rotating wireframe sphere with an arc-reactor
 * core and an orbiting marker. Replaces the WebGL earth (no three.js). Rotation is
 * disabled under prefers-reduced-motion.
 */
export default function HudGlobe({ label }: HudGlobeProps) {
  const reduced = usePrefersReducedMotion();
  const spin = reduced ? '' : 'animate-spin';

  return (
    <div
      className="relative flex h-full min-h-[20rem] flex-col items-center justify-center gap-4"
      data-testid="contact-3d">
      <div className="relative h-52 w-52 sm:h-60 sm:w-60">
        <div className="absolute inset-0 rounded-full bg-hud-cyan/10 blur-2xl" aria-hidden="true" />
        <svg
          viewBox="0 0 200 200"
          role="img"
          aria-label={label ?? 'HUD globe'}
          className="relative h-full w-full text-hud-cyan drop-shadow-[0_0_10px_rgba(34,211,238,0.45)]">
          <circle cx="100" cy="100" r="78" fill="none" stroke="currentColor" strokeOpacity="0.55" />
          {LATITUDES.map((l, i) => (
            <ellipse
              key={`lat-${i}`}
              cx="100"
              cy={l.cy}
              rx={l.rx}
              ry={l.ry}
              fill="none"
              stroke="currentColor"
              strokeOpacity="0.28"
            />
          ))}
          <g
            className={spin}
            style={{ transformOrigin: '100px 100px', animationDuration: '16s' }}>
            {LONGITUDES.map((rx, i) => (
              <ellipse
                key={`lon-${i}`}
                cx="100"
                cy="100"
                rx={rx}
                ry="78"
                fill="none"
                stroke="currentColor"
                strokeOpacity="0.28"
              />
            ))}
          </g>
          <circle cx="100" cy="100" r="6" className="fill-hud-cyan" />
          <circle cx="100" cy="100" r="10" fill="none" stroke="currentColor" strokeOpacity="0.9" />
        </svg>

        {/* Orbiting marker */}
        <div
          className={`absolute inset-0 ${spin}`}
          style={{ animationDuration: '9s', animationDirection: 'reverse' }}
          aria-hidden="true">
          <span className="absolute left-1/2 top-1 h-2 w-2 -translate-x-1/2 rounded-full bg-hud-red shadow-glow-red" />
        </div>
      </div>

      {label && (
        <span className="font-mono text-xs uppercase tracking-widest text-hud-cyan/70">
          {label}
        </span>
      )}
    </div>
  );
}
