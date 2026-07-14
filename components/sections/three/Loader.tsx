'use client';

import { Html, useProgress } from '@react-three/drei';

/** Loading indicator shown inside the 3D canvas while assets stream in. */
export function Loader() {
  const { progress } = useProgress();
  return (
    <Html center>
      <span className="font-mono text-xs text-hud-cyan">{progress.toFixed(0)}%</span>
    </Html>
  );
}

export default Loader;
