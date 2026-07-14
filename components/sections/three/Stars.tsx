'use client';

import { Suspense, useMemo, useRef } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import { Points, PointMaterial } from '@react-three/drei';
import type { Points as ThreePoints } from 'three';

/** Generate `count` points uniformly inside a sphere of `radius` (no external deps). */
function randomInSphere(count: number, radius: number): Float32Array {
  const arr = new Float32Array(count * 3);
  for (let i = 0; i < count; i += 1) {
    // Rejection sampling for a uniform interior distribution.
    let x = 0;
    let y = 0;
    let z = 0;
    let d = 2;
    while (d > 1 || d === 0) {
      x = Math.random() * 2 - 1;
      y = Math.random() * 2 - 1;
      z = Math.random() * 2 - 1;
      d = x * x + y * y + z * z;
    }
    arr[i * 3] = x * radius;
    arr[i * 3 + 1] = y * radius;
    arr[i * 3 + 2] = z * radius;
  }
  return arr;
}

function StarField() {
  const ref = useRef<ThreePoints>(null);
  // Lighter than the legacy 5000-point field.
  const sphere = useMemo(() => randomInSphere(1500, 1.2), []);

  useFrame((_state, delta) => {
    if (!ref.current) return;
    ref.current.rotation.x -= delta / 12;
    ref.current.rotation.y -= delta / 18;
  });

  return (
    <group rotation={[0, 0, Math.PI / 4]}>
      <Points ref={ref} positions={sphere} stride={3} frustumCulled>
        <PointMaterial
          transparent
          color="#22d3ee"
          size={0.0025}
          sizeAttenuation
          depthWrite={false}
        />
      </Points>
    </group>
  );
}

/** Lightweight starfield backdrop (client-only, lazy-loaded). */
export function StarsCanvas() {
  return (
    <div className="absolute inset-0 z-[-1] h-full w-full">
      <Canvas camera={{ position: [0, 0, 1] }}>
        <Suspense fallback={null}>
          <StarField />
        </Suspense>
      </Canvas>
    </div>
  );
}

export default StarsCanvas;
