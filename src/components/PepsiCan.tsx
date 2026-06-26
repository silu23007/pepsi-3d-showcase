import { useRef, useMemo, useEffect } from 'react';
import { useFrame } from '@react-three/fiber';
import * as THREE from 'three';
import { PepsiFlavor } from '../types';
import { createPepsiLabel } from './PepsiLabelGenerator';

interface PepsiCanProps {
  activeFlavor: PepsiFlavor;
  scrollProgress: number; // 0 to 1
  mouseCoords: { x: number; y: number };
}

export function PepsiCan({ activeFlavor, scrollProgress, mouseCoords }: PepsiCanProps) {
  const groupRef = useRef<THREE.Group>(null);
  const bodyMaterialRef = useRef<THREE.MeshStandardMaterial>(null);

  // 1. Generate and Memoize Textures for all flavors to enable instant and lag-free switching
  const textures = useMemo(() => {
    const loader = new THREE.CanvasTexture(createPepsiLabel(activeFlavor));
    loader.colorSpace = THREE.SRGBColorSpace;
    loader.wrapS = THREE.RepeatWrapping;
    loader.wrapT = THREE.ClampToEdgeWrapping;
    // We adjust repeat to make the label cover the cylinder cleanly
    loader.repeat.set(1, 1);
    return loader;
  }, [activeFlavor]);

  // Update texture on flavor change
  useEffect(() => {
    if (bodyMaterialRef.current) {
      bodyMaterialRef.current.map = textures;
      bodyMaterialRef.current.needsUpdate = true;
    }
  }, [textures]);

  // 2. Animate Can (Floating, Cursor Reacting, Scroll-based Position/Rotation)
  useFrame((state) => {
    if (!groupRef.current) return;

    const t = state.clock.getElapsedTime();
    
    // Determine screen size (responsive offsets)
    const isMobile = state.viewport.width < 6;
    
    // Smooth responsive positioning based on scrollProgress
    // We have 3 main sections:
    // Section 1 (Hero, scrollProgress 0 - 0.33): Can on right (desktop) or center (mobile)
    // Section 2 (Showcase, scrollProgress 0.33 - 0.66): Can on left (desktop) or center-high (mobile)
    // Section 3 (Features, scrollProgress 0.66 - 1.0): Tilted can on right/center-bottom, rotating to show the top lid/tab
    
    let targetX = 0;
    let targetY = 0;
    let targetZ = 0;
    let targetScale = isMobile ? 1.0 : 1.35;
    
    let targetRotX = 0.1; // slight forward tilt
    let targetRotY = t * 0.15; // default slow continuous spin
    let targetRotZ = 0;

    // Linear interpolation weights
    if (scrollProgress < 0.4) {
      // Hero section: Right side of screen for desktop
      const p = scrollProgress / 0.4; // 0 to 1
      targetX = isMobile ? 0 : 1.6 * (1 - p) + -1.6 * p;
      targetY = isMobile ? -0.2 : -0.1;
      targetZ = isMobile ? 0 : 0.2;
      targetScale = isMobile ? 1.0 : 1.35;
      
      // Rotate 180 deg to show the label clearly, then flip to the back on Section 2 transition
      targetRotY = (p * Math.PI) + (t * 0.1); 
      targetRotX = 0.1 + p * 0.2;
    } else if (scrollProgress >= 0.4 && scrollProgress < 0.75) {
      // Showcase Section: Left side of screen for desktop
      const p = (scrollProgress - 0.4) / 0.35; // 0 to 1
      targetX = isMobile ? 0 : -1.6 * (1 - p) + 1.5 * p;
      targetY = isMobile ? 0.2 : -0.1;
      targetZ = 0;
      targetScale = isMobile ? 1.1 : 1.5;
      
      // Tilt can and spin it to show ingredients / barcode
      targetRotY = Math.PI + (p * Math.PI * 1.5) + (t * 0.15);
      targetRotX = 0.3 - p * 0.5; // Change tilt
      targetRotZ = -0.05 + p * 0.25;
    } else {
      // Features Section: Angled layout, extreme close up or tilted top showcase
      const p = (scrollProgress - 0.75) / 0.25; // 0 to 1
      targetX = isMobile ? 0 : 1.5;
      targetY = isMobile ? -0.4 : -0.2;
      targetZ = isMobile ? 0.5 : 0.8;
      targetScale = isMobile ? 1.15 : 1.6;
      
      // Top showcase angle to view pull-tab and rim details
      targetRotX = -0.2 + (1 - p) * 0.4 + (Math.sin(t * 0.5) * 0.05);
      targetRotY = (t * 0.25) + (p * Math.PI * 0.5);
      targetRotZ = 0.2 + (Math.cos(t * 0.5) * 0.05);
    }

    // A. Idle floating animation
    const floatOffset = Math.sin(t * 1.5) * 0.08;
    const swayOffset = Math.cos(t * 1.2) * 0.05;
    
    // B. Mouse interaction (subtle lag reaction)
    const mouseInfluenceX = mouseCoords.x * 0.35;
    const mouseInfluenceY = mouseCoords.y * 0.35;

    // Apply combined positions smoothly (lerp)
    groupRef.current.position.x = THREE.MathUtils.lerp(groupRef.current.position.x, targetX + mouseInfluenceX + swayOffset, 0.08);
    groupRef.current.position.y = THREE.MathUtils.lerp(groupRef.current.position.y, targetY + floatOffset + mouseInfluenceY, 0.08);
    groupRef.current.position.z = THREE.MathUtils.lerp(groupRef.current.position.z, targetZ, 0.08);

    groupRef.current.scale.setScalar(THREE.MathUtils.lerp(groupRef.current.scale.x, targetScale, 0.08));

    // Smooth rotation lerping
    groupRef.current.rotation.x = THREE.MathUtils.lerp(groupRef.current.rotation.x, targetRotX, 0.08);
    groupRef.current.rotation.y = THREE.MathUtils.lerp(groupRef.current.rotation.y, targetRotY, 0.08);
    groupRef.current.rotation.z = THREE.MathUtils.lerp(groupRef.current.rotation.z, targetRotZ, 0.08);
  });

  // 3. Materials configuration
  const aluminumMaterial = useMemo(() => new THREE.MeshStandardMaterial({
    color: '#D4D4D4',
    metalness: 0.95,
    roughness: 0.15,
    envMapIntensity: 1.5,
  }), []);

  const chromeMaterial = useMemo(() => new THREE.MeshStandardMaterial({
    color: '#F0F0F0',
    metalness: 1.0,
    roughness: 0.05,
    envMapIntensity: 2.0,
  }), []);

  return (
    <group ref={groupRef}>
      {/* Dynamic fizzy bubbles surrounding the can */}
      <FizzyBubbles activeFlavor={activeFlavor} />

      {/* SODA CAN 3D ASSEMBLY */}
      <group position={[0, 0, 0]}>
        
        {/* A. CAN BODY (Label part) */}
        <mesh castShadow receiveShadow position={[0, 0, 0]}>
          <cylinderGeometry args={[0.95, 0.95, 2.4, 64, 1, false]} />
          <meshStandardMaterial
            ref={bodyMaterialRef}
            map={textures}
            roughness={0.25}
            metalness={0.8}
            envMapIntensity={1.2}
          />
        </mesh>

        {/* B. TOP NECK (Tapered silver ring) */}
        <mesh castShadow position={[0, 1.25, 0]}>
          <cylinderGeometry args={[0.82, 0.95, 0.1, 64]} />
          <primitive object={aluminumMaterial} />
        </mesh>

        {/* C. TOP RIM (The rolled chime edge) */}
        <mesh castShadow position={[0, 1.34, 0]}>
          <torusGeometry args={[0.82, 0.04, 16, 64]} />
          <primitive object={chromeMaterial} />
        </mesh>

        {/* D. TOP LID (Flat slightly recessed lid) */}
        <mesh position={[0, 1.32, 0]}>
          <cylinderGeometry args={[0.81, 0.81, 0.04, 64]} />
          <primitive object={aluminumMaterial} />
        </mesh>

        {/* E. REALISTIC PULL TAB (Assembled from primitive pieces) */}
        <group position={[0, 1.345, -0.2]} rotation={[0.05, 0, 0]}>
          {/* Main plate of the tab */}
          <mesh castShadow>
            <boxGeometry args={[0.22, 0.02, 0.42]} />
            <primitive object={aluminumMaterial} />
          </mesh>
          {/* Ring hole on the tab */}
          <mesh position={[0, 0.01, 0.1]} rotation={[Math.PI / 2, 0, 0]}>
            <torusGeometry args={[0.07, 0.02, 8, 24]} />
            <primitive object={chromeMaterial} />
          </mesh>
          {/* Little rivet pinning it down */}
          <mesh position={[0, 0.01, -0.1]}>
            <cylinderGeometry args={[0.03, 0.03, 0.03, 16]} />
            <primitive object={chromeMaterial} />
          </mesh>
        </group>

        {/* F. BOTTOM NECK (Tapered bottom silver edge) */}
        <mesh castShadow position={[0, -1.25, 0]}>
          <cylinderGeometry args={[0.95, 0.76, 0.1, 64]} />
          <primitive object={aluminumMaterial} />
        </mesh>

        {/* G. BOTTOM DOME RIMS */}
        <mesh castShadow position={[0, -1.32, 0]}>
          <cylinderGeometry args={[0.76, 0.72, 0.05, 64]} />
          <primitive object={aluminumMaterial} />
        </mesh>
        <mesh position={[0, -1.35, 0]}>
          <cylinderGeometry args={[0.72, 0.65, 0.03, 64]} />
          <primitive object={aluminumMaterial} />
        </mesh>
      </group>
    </group>
  );
}

/* ==========================================
   SPARKLING FIZZY BUBBLE EFFECT COMPONENT
   ========================================== */
interface BubbleData {
  id: number;
  position: [number, number, number];
  speed: number;
  scale: number;
  swaySpeed: number;
  swayWidth: number;
  phase: number;
}

function FizzyBubbles({ activeFlavor }: { activeFlavor: PepsiFlavor }) {
  const meshRef = useRef<THREE.InstancedMesh>(null);
  const count = 110;

  // Generate bubble initial metrics
  const bubbles = useMemo(() => {
    const arr: BubbleData[] = [];
    for (let i = 0; i < count; i++) {
      const radius = 0.95 + Math.random() * 1.5; // spawn around the can body
      const angle = Math.random() * Math.PI * 2;
      const x = Math.cos(angle) * radius;
      const y = (Math.random() * 4) - 2; // y between -2.0 and 2.0
      const z = Math.sin(angle) * radius;

      arr.push({
        id: i,
        position: [x, y, z],
        speed: 0.8 + Math.random() * 1.4,
        scale: 0.015 + Math.random() * 0.045,
        swaySpeed: 1.5 + Math.random() * 2,
        swayWidth: 0.05 + Math.random() * 0.15,
        phase: Math.random() * Math.PI * 2,
      });
    }
    return arr;
  }, []);

  const dummy = useMemo(() => new THREE.Object3D(), []);

  // Update bubble positions over time (fizzy rising motion)
  useFrame((state) => {
    if (!meshRef.current) return;

    const t = state.clock.getElapsedTime();

    bubbles.forEach((bubble, i) => {
      // Rise upward
      bubble.position[1] += bubble.speed * 0.01;

      // Wrap-around height boundary
      if (bubble.position[1] > 2.2) {
        bubble.position[1] = -2.2;
        // reset radial offset slightly
        const radius = 0.95 + Math.random() * 1.2;
        const angle = Math.random() * Math.PI * 2;
        bubble.position[0] = Math.cos(angle) * radius;
        bubble.position[2] = Math.sin(angle) * radius;
      }

      // Add nice carbonation wiggle (sway) using sine
      const currentX = bubble.position[0] + Math.sin(t * bubble.swaySpeed + bubble.phase) * bubble.swayWidth;
      const currentZ = bubble.position[2] + Math.cos(t * bubble.swaySpeed + bubble.phase) * bubble.swayWidth;
      const currentY = bubble.position[1];

      // Grow bubbles as they rise (realistic pressure release)
      const relativeHeight = (currentY + 2.2) / 4.4; // 0 to 1
      const size = bubble.scale * (1.0 + relativeHeight * 0.8);

      dummy.position.set(currentX, currentY, currentZ);
      dummy.scale.setScalar(size);
      dummy.updateMatrix();
      meshRef.current!.setMatrixAt(i, dummy.matrix);
    });

    meshRef.current.instanceMatrix.needsUpdate = true;
  });

  // Dynamic bubble color depending on flavor
  // Classic: soft blue/white sparkles
  // Zero Sugar: fiery electric red/blue fizz
  // Diet: bright white/silver sparkling
  const bubbleColor = useMemo(() => {
    if (activeFlavor.id === 'classic') return new THREE.Color('#99D6FF');
    if (activeFlavor.id === 'zero') return new THREE.Color('#FF4D4D');
    return new THREE.Color('#FFFFFF');
  }, [activeFlavor]);

  return (
    <instancedMesh ref={meshRef} args={[null, null, count]} castShadow={false}>
      <sphereGeometry args={[1, 12, 12]} />
      <meshPhysicalMaterial
        color={bubbleColor}
        transmission={0.8}
        opacity={0.7}
        transparent
        roughness={0.05}
        thickness={0.2}
        ior={1.2}
        clearcoat={1.0}
      />
    </instancedMesh>
  );
}
