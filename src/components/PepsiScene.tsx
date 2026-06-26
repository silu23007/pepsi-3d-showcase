import { Canvas } from '@react-three/fiber';
import { Environment } from '@react-three/drei';
import { PepsiCan } from './PepsiCan';
import { PepsiFlavor } from '../types';
import { useMemo } from 'react';
import * as THREE from 'three';

interface PepsiSceneProps {
  activeFlavor: PepsiFlavor;
  scrollProgress: number;
  mouseCoords: { x: number; y: number };
}

export function PepsiScene({ activeFlavor, scrollProgress, mouseCoords }: PepsiSceneProps) {
  // Compute flavor spotlight color
  const spotlightColor = useMemo(() => {
    if (activeFlavor.id === 'classic') return '#0070CE';
    if (activeFlavor.id === 'zero') return '#E30022';
    return '#829AB1';
  }, [activeFlavor]);

  return (
    <div className="w-full h-full">
      <Canvas
        shadows
        gl={{ antialias: true, alpha: true, preserveDrawingBuffer: true }}
        camera={{ position: [0, 0, 5], fov: 45, near: 0.1, far: 50 }}
      >
        {/* Soft atmospheric ambient light */}
        <ambientLight intensity={0.7} />

        {/* Dynamic back edge rim light - shines from behind to highlight metallic edges */}
        <directionalLight
          position={[0, 4, -4]}
          intensity={2.5}
          color="#ffffff"
        />

        {/* Key Light: High contrast, casts shadows, gives the model structure */}
        <directionalLight
          castShadow
          position={[5, 5, 4]}
          intensity={2.8}
          color="#ffffff"
          shadow-mapSize={[1024, 1024]}
          shadow-bias={-0.0001}
        />

        {/* Soft fill light from opposite angle */}
        <directionalLight
          position={[-5, 2, 3]}
          intensity={1.2}
          color="#E6F2FF"
        />

        {/* Dynamic Flavor-infused Colored Spotlight */}
        <spotLight
          position={[0, -2, 4]}
          angle={0.6}
          penumbra={1}
          intensity={4.0}
          color={spotlightColor}
        />

        {/* Floating, rotating Pepsi can with particles */}
        <PepsiCan
          activeFlavor={activeFlavor}
          scrollProgress={scrollProgress}
          mouseCoords={mouseCoords}
        />

        {/* Studio environment for high fidelity metallic reflections */}
        <Environment preset="studio" />
      </Canvas>
    </div>
  );
}
