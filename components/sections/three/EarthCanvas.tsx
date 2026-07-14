'use client';

import { Suspense } from 'react';
import { Canvas } from '@react-three/fiber';
import { OrbitControls, useGLTF, Preload } from '@react-three/drei';
import { Loader } from './Loader';

export type EarthCanvasProps = {
  /** Disable auto-rotation (respect prefers-reduced-motion). */
  autoRotate?: boolean;
};

function Earth() {
  const earth = useGLTF('/assets/3d/earth/scene.gltf');
  return (
    <primitive object={earth.scene} scale={0.8} position={[-1.2, -0.5, -1.1]} rotation={[0, 0, 0]} />
  );
}

/** Lazy-loaded 3D Earth. `frameloop="demand"` keeps it idle unless interacting/rotating. */
export function EarthCanvas({ autoRotate = true }: EarthCanvasProps) {
  return (
    <Canvas
      shadows
      frameloop={autoRotate ? 'always' : 'demand'}
      dpr={[1, 1.5]}
      gl={{ preserveDrawingBuffer: true }}
      camera={{ fov: 45, near: 0.1, far: 100, position: [2, -4, 6] }}>
      <Suspense fallback={<Loader />}>
        <OrbitControls
          autoRotate={autoRotate}
          enableZoom={false}
          maxPolarAngle={Math.PI / 2}
          minPolarAngle={Math.PI / 2}
        />
        <Earth />
        <Preload all />
      </Suspense>
    </Canvas>
  );
}

useGLTF.preload('/assets/3d/earth/scene.gltf');

export default EarthCanvas;
