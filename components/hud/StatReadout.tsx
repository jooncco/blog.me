'use client';

import { useEffect, useState } from 'react';
import { MotionGate } from './MotionGate';

export type StatReadoutProps = {
  label: string;
  value: number | string;
  unit?: string;
  animated?: boolean;
};

function decimalsOf(n: number): number {
  const s = String(n);
  const i = s.indexOf('.');
  return i === -1 ? 0 : s.length - i - 1;
}

function format(n: number, decimals: number): string {
  return n.toLocaleString(undefined, {
    minimumFractionDigits: decimals,
    maximumFractionDigits: decimals,
  });
}

/** Animated count-up from 0 to `value` (eased). Gated by MotionGate upstream. */
function CountUp({ value, duration = 1200 }: { value: number; duration?: number }) {
  const decimals = decimalsOf(value);
  const [display, setDisplay] = useState(value);

  useEffect(() => {
    if (typeof requestAnimationFrame !== 'function' || typeof performance === 'undefined') {
      setDisplay(value);
      return;
    }
    let raf = 0;
    const start = performance.now();
    const tick = (now: number) => {
      const t = Math.min(1, (now - start) / duration);
      const eased = 1 - Math.pow(1 - t, 3);
      setDisplay(value * eased);
      if (t < 1) {
        raf = requestAnimationFrame(tick);
      } else {
        setDisplay(value);
      }
    };
    setDisplay(0);
    raf = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(raf);
  }, [value, duration]);

  return <>{format(display, decimals)}</>;
}

/** Animated numeric readout for HUD stat cards. */
export function StatReadout({ label, value, unit, animated = true }: StatReadoutProps) {
  const isNumeric = typeof value === 'number';
  const staticValue = isNumeric ? format(value, decimalsOf(value)) : value;

  const staticNode = (
    <>
      {staticValue}
      {unit && <span className="ml-1 text-base text-hud-cyan/70">{unit}</span>}
    </>
  );

  return (
    <div className="flex flex-col" data-testid="hud-stat">
      <div className="font-mono text-3xl font-semibold tabular-nums text-hud-cyan">
        {isNumeric && animated ? (
          <MotionGate fallback={staticNode}>
            <CountUp value={value} />
            {unit && <span className="ml-1 text-base text-hud-cyan/70">{unit}</span>}
          </MotionGate>
        ) : (
          staticNode
        )}
      </div>
      <div className="mt-1 font-mono text-xs uppercase tracking-widest text-text/60">{label}</div>
    </div>
  );
}
