import React, { useRef, useState, useMemo } from 'react';
import { useFrame } from '@react-three/fiber';
import { Text } from '@react-three/drei';
import * as THREE from 'three';

interface FloatingBadgeProps {
  label: string;
  initialPos: [number, number, number];
  color: string;
  speed: number;
}

const FloatingBadge: React.FC<FloatingBadgeProps> = ({
  label,
  initialPos,
  color,
  speed,
}) => {
  const groupRef = useRef<THREE.Group>(null);
  const [hovered, setHovered] = useState(false);

  useFrame((state) => {
    if (!groupRef.current) return;
    const time = state.clock.getElapsedTime();

    // Gentle float
    groupRef.current.position.y = initialPos[1] + Math.sin(time * speed + initialPos[0]) * 0.18;
    // Gentle tilt
    groupRef.current.rotation.y = Math.sin(time * 0.8 + initialPos[2]) * 0.15;
    groupRef.current.rotation.x = Math.cos(time * 0.6 + initialPos[0]) * 0.08;

    // Hover scale lerp
    const targetScale = hovered ? 1.15 : 1.0;
    groupRef.current.scale.lerp(new THREE.Vector3(targetScale, targetScale, targetScale), 0.1);
  });

  return (
    <group
      ref={groupRef}
      position={initialPos}
      onPointerOver={(e) => {
        e.stopPropagation();
        setHovered(true);
      }}
      onPointerOut={() => setHovered(false)}
    >
      {/* Translucent Glass Pill Badge */}
      <mesh castShadow receiveShadow>
        <boxGeometry args={[1.1, 0.42, 0.08]} />
        <meshPhysicalMaterial
          color={hovered ? '#FFFFFF' : '#F8FAFC'}
          transmission={0.85}
          opacity={1}
          transparent
          roughness={0.15}
          ior={1.4}
          thickness={0.2}
          clearcoat={1}
          metalness={0.05}
        />
      </mesh>

      {/* Subtle Glowing Accent Border */}
      <mesh position={[0, 0, 0]}>
        <boxGeometry args={[1.12, 0.44, 0.04]} />
        <meshBasicMaterial
          color={hovered ? color : '#E2E8F0'}
          transparent
          opacity={hovered ? 0.9 : 0.4}
        />
      </mesh>

      {/* Badge Text */}
      <Text
        position={[0, 0, 0.055]}
        fontSize={0.14}
        color={hovered ? color : '#1E293B'}
        anchorX="center"
        anchorY="middle"
        font="https://fonts.gstatic.com/s/inter/v13/UcCO3FwrK3iLTeHuS_fvQtMwCp50KnMw2boKoduKmMEVuLyfAZ9hjp-Ek-_EeA.woff"
      >
        {label}
      </Text>
    </group>
  );
};

export const FloatingObjects: React.FC = () => {
  const badges = useMemo(() => {
    return [
      { label: 'React', pos: [-3.0, 2.8, -2], color: '#06B6D4', speed: 1.2 },
      { label: 'TypeScript', pos: [3.2, 3.2, -3], color: '#3B82F6', speed: 1.4 },
      { label: 'Python', pos: [-3.4, 1.4, -5], color: '#4F46E5', speed: 1.0 },
      { label: 'Java', pos: [3.3, 1.6, -6], color: '#EC4899', speed: 1.3 },
      { label: 'Spring Boot', pos: [-2.8, 3.8, -8], color: '#10B981', speed: 1.1 },
      { label: 'SQL', pos: [2.9, 3.6, -10], color: '#F59E0B', speed: 1.5 },
      { label: 'AI Agents', pos: [-3.2, 2.2, -12], color: '#7C3AED', speed: 1.3 },
      { label: 'Neo4j', pos: [3.1, 2.4, -14], color: '#06B6D4', speed: 1.2 },
      { label: 'Git', pos: [-2.6, 1.2, -16], color: '#F43F5E', speed: 1.4 },
      { label: 'APIs', pos: [2.8, 1.5, -18], color: '#6366F1', speed: 1.1 },
    ];
  }, []);

  return (
    <group>
      {badges.map((b, idx) => (
        <FloatingBadge
          key={idx}
          label={b.label}
          initialPos={b.pos as [number, number, number]}
          color={b.color}
          speed={b.speed}
        />
      ))}
    </group>
  );
};
