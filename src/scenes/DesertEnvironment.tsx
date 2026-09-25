import React, { useRef, useMemo } from 'react';
import { useFrame } from '@react-three/fiber';
import * as THREE from 'three';

interface DesertEnvironmentProps {
  scrollProgress: number;
}

export const DesertEnvironment: React.FC<DesertEnvironmentProps> = ({ scrollProgress }) => {
  const dustRef = useRef<THREE.Points>(null);
  const roadRef = useRef<THREE.Group>(null);
  const sunRef = useRef<THREE.Mesh>(null);

  // Generate desert dune terrain vertices
  const { duneGeo, dustGeo } = useMemo(() => {
    // Dunes Plane
    const geo = new THREE.PlaneGeometry(80, 240, 64, 128);
    const pos = geo.attributes.position;
    for (let i = 0; i < pos.count; i++) {
      const x = pos.getX(i);
      const y = pos.getY(i);
      // Create rolling wave-like dunes away from the center path
      const distFromCenter = Math.abs(x);
      if (distFromCenter > 3.0) {
        const height =
          Math.sin(x * 0.15 + y * 0.05) * 1.8 +
          Math.cos(x * 0.08 - y * 0.04) * 2.2 +
          Math.sin(y * 0.1) * 0.8;
        pos.setZ(i, height * Math.min(2.5, (distFromCenter - 2.5) * 0.6));
      } else {
        // Flat valley for runner path
        pos.setZ(i, (Math.random() - 0.5) * 0.08);
      }
    }
    geo.computeVertexNormals();

    // Sand Dust Particles
    const particleCount = 450;
    const dustPositions = new Float32Array(particleCount * 3);
    const dustScales = new Float32Array(particleCount);
    for (let i = 0; i < particleCount; i++) {
      dustPositions[i * 3] = (Math.random() - 0.5) * 24;
      dustPositions[i * 3 + 1] = Math.random() * 4.5 + 0.1;
      dustPositions[i * 3 + 2] = (Math.random() - 0.5) * 100;
      dustScales[i] = Math.random() * 0.08 + 0.02;
    }
    const dGeo = new THREE.BufferGeometry();
    dGeo.setAttribute('position', new THREE.BufferAttribute(dustPositions, 3));
    dGeo.setAttribute('scale', new THREE.BufferAttribute(dustScales, 1));

    return { duneGeo: geo, dustGeo: dGeo };
  }, []);

  useFrame((state, delta) => {
    const time = state.clock.getElapsedTime();

    // Swirling warm desert dust
    if (dustRef.current) {
      const positions = dustRef.current.geometry.attributes.position.array as Float32Array;
      for (let i = 0; i < 450; i++) {
        positions[i * 3] += Math.sin(time * 0.5 + i) * 0.015 + 0.01; // drifting right
        positions[i * 3 + 2] += 0.08; // drifting forward
        if (positions[i * 3 + 2] > 20) {
          positions[i * 3 + 2] = -80;
        }
      }
      dustRef.current.geometry.attributes.position.needsUpdate = true;
    }

    // Gentle sun pulse
    if (sunRef.current) {
      sunRef.current.position.y = 18 + Math.sin(time * 0.4) * 0.5;
    }
  });

  return (
    <group>
      {/* Warm Desert Lighting */}
      <ambientLight intensity={1.1} color="#FFF5EB" />
      <directionalLight
        position={[25, 30, 20]}
        intensity={2.2}
        color="#FED7AA"
        castShadow
        shadow-mapSize={[2048, 2048]}
        shadow-bias={-0.0001}
      />
      <directionalLight position={[-15, 12, -20]} intensity={0.6} color="#E0E7FF" />
      <pointLight position={[0, 3, -10]} intensity={1.5} color="#FDBA74" distance={30} />

      {/* Horizon Desert Sun & Glow */}
      <mesh ref={sunRef} position={[0, 18, -110]}>
        <sphereGeometry args={[14, 32, 32]} />
        <meshBasicMaterial color="#FFEDD5" />
      </mesh>
      {/* Sun Corona Halo */}
      <mesh position={[0, 18, -109]}>
        <ringGeometry args={[14.2, 26, 32]} />
        <meshBasicMaterial color="#FDBA74" transparent opacity={0.35} side={THREE.DoubleSide} />
      </mesh>

      {/* Dunes Terrain */}
      <mesh geometry={duneGeo} rotation={[-Math.PI / 2, 0, 0]} position={[0, -0.05, -50]} receiveShadow>
        <meshStandardMaterial
          color="#FDE68A"
          roughness={0.92}
          metalness={0.05}
          flatShading={false}
        />
      </mesh>

      {/* Runner Cyber Pathway Ribbon */}
      <group ref={roadRef} position={[0, 0.01, -50]}>
        {/* Pathway Surface */}
        <mesh rotation={[-Math.PI / 2, 0, 0]} receiveShadow>
          <planeGeometry args={[4.2, 240]} />
          <meshStandardMaterial color="#FFFFFF" roughness={0.3} metalness={0.1} />
        </mesh>

        {/* Left Glowing Border */}
        <mesh position={[-2.15, 0.02, 0]} rotation={[-Math.PI / 2, 0, 0]}>
          <planeGeometry args={[0.08, 240]} />
          <meshBasicMaterial color="#4F46E5" />
        </mesh>

        {/* Right Glowing Border */}
        <mesh position={[2.15, 0.02, 0]} rotation={[-Math.PI / 2, 0, 0]}>
          <planeGeometry args={[0.08, 240]} />
          <meshBasicMaterial color="#06B6D4" />
        </mesh>

        {/* Center Dashed Progress Track */}
        {Array.from({ length: 40 }).map((_, idx) => (
          <mesh
            key={idx}
            position={[0, 0.02, -110 + idx * 6]}
            rotation={[-Math.PI / 2, 0, 0]}
          >
            <planeGeometry args={[0.15, 2.5]} />
            <meshBasicMaterial color="#CBD5E1" />
          </mesh>
        ))}
      </group>

      {/* Drifting Sand Dust Particles */}
      <points ref={dustRef} geometry={dustGeo}>
        <pointsMaterial
          size={0.12}
          color="#F59E0B"
          transparent
          opacity={0.55}
          blending={THREE.AdditiveBlending}
        />
      </points>

      {/* Distant Desert Horizon Fog */}
      <fog attach="fog" args={['#FEF3C7', 35, 120]} />
    </group>
  );
};
