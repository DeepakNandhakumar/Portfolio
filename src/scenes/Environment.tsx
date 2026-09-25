import React, { useMemo } from 'react';
import * as THREE from 'three';

export const Environment: React.FC = () => {
  // Minimalist architectural monoliths framing the horizon
  const monoliths = useMemo(() => {
    return [
      { pos: [-6, 3, -15], size: [1.2, 7, 1.2], color: '#FFFFFF' },
      { pos: [6, 4, -18], size: [1.4, 9, 1.4], color: '#FFFFFF' },
      { pos: [-8, 5, -28], size: [2.0, 12, 2.0], color: '#F1F5F9' },
      { pos: [8, 6, -32], size: [2.2, 14, 2.2], color: '#F1F5F9' },
      { pos: [-11, 7, -45], size: [3.0, 18, 3.0], color: '#E2E8F0' },
      { pos: [11, 8, -48], size: [3.2, 20, 3.2], color: '#E2E8F0' },
    ];
  }, []);

  // Soft geometric clouds in the upper sky
  const cloudClusters = useMemo(() => {
    return [
      { pos: [-4, 6, -12], scale: [2.5, 0.8, 1.8] },
      { pos: [5, 7, -16], scale: [3.2, 1.0, 2.0] },
      { pos: [-7, 8, -25], scale: [4.0, 1.2, 2.5] },
      { pos: [6, 9, -30], scale: [3.8, 1.1, 2.2] },
    ];
  }, []);

  return (
    <group>
      {/* Lighting System: Clean, high-key studio daylight */}
      <ambientLight intensity={1.2} color="#FFFFFF" />

      {/* Primary Key Light */}
      <directionalLight
        position={[6, 12, 8]}
        intensity={1.5}
        color="#FFFFFF"
        castShadow
        shadow-mapSize={[1024, 1024]}
        shadow-camera-near={0.5}
        shadow-camera-far={40}
        shadow-camera-left={-10}
        shadow-camera-right={10}
        shadow-camera-top={10}
        shadow-camera-bottom={-10}
      />

      {/* Soft Indigo / Purple Fill Light from Opposite Side */}
      <directionalLight position={[-8, 6, -4]} intensity={0.6} color="#C7D2FE" />

      {/* Cyan Rim Light from Behind Horizon */}
      <directionalLight position={[0, 4, -30]} intensity={0.8} color="#A5F3FC" />

      {/* Hemisphere Light for Natural Sky/Ground Contrast */}
      <hemisphereLight
        color="#FFFFFF"
        groundColor="#F1F5F9"
        intensity={0.8}
      />

      {/* Distant Ground Plane */}
      <mesh rotation={[-Math.PI / 2, 0, 0]} position={[0, -0.05, -25]}>
        <planeGeometry args={[120, 120]} />
        <meshStandardMaterial color="#F8FAFC" roughness={0.6} />
      </mesh>

      {/* Architectural White Monoliths */}
      {monoliths.map((mono, idx) => (
        <group key={idx} position={mono.pos as [number, number, number]}>
          <mesh castShadow receiveShadow>
            <boxGeometry args={mono.size as [number, number, number]} />
            <meshStandardMaterial
              color={mono.color}
              roughness={0.2}
              metalness={0.05}
            />
          </mesh>
          {/* Subtle Accent Glow Ring on Pillars */}
          <mesh position={[0, (mono.size[1] as number) * 0.4, 0]}>
            <boxGeometry args={[(mono.size[0] as number) + 0.04, 0.08, (mono.size[2] as number) + 0.04]} />
            <meshBasicMaterial color={idx % 2 === 0 ? '#818CF8' : '#38BDF8'} />
          </mesh>
        </group>
      ))}

      {/* Soft Cloud Volumes */}
      {cloudClusters.map((cloud, idx) => (
        <mesh
          key={idx}
          position={cloud.pos as [number, number, number]}
          scale={cloud.scale as [number, number, number]}
        >
          <sphereGeometry args={[1, 16, 16]} />
          <meshStandardMaterial
            color="#FFFFFF"
            roughness={0.9}
            transparent
            opacity={0.65}
          />
        </mesh>
      ))}
    </group>
  );
};
