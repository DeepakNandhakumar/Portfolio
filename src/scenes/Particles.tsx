import React, { useRef, useMemo } from 'react';
import { useFrame } from '@react-three/fiber';
import * as THREE from 'three';

interface ParticlesProps {
  count?: number;
}

export const Particles: React.FC<ParticlesProps> = ({ count = 60 }) => {
  const pointsRef = useRef<THREE.Points>(null);

  const { positions, originalY, speeds } = useMemo(() => {
    const pos = new Float32Array(count * 3);
    const origY = new Float32Array(count);
    const spds = new Float32Array(count);

    for (let i = 0; i < count; i++) {
      const x = (Math.random() - 0.5) * 14;
      const y = Math.random() * 6 + 0.5;
      const z = (Math.random() - 0.5) * 40 - 5;

      pos[i * 3] = x;
      pos[i * 3 + 1] = y;
      pos[i * 3 + 2] = z;

      origY[i] = y;
      spds[i] = 0.5 + Math.random() * 0.8;
    }

    return { positions: pos, originalY: origY, speeds: spds };
  }, [count]);

  useFrame((state) => {
    if (!pointsRef.current) return;
    const time = state.clock.getElapsedTime();
    const posAttribute = pointsRef.current.geometry.attributes.position;
    const array = posAttribute.array as Float32Array;

    for (let i = 0; i < count; i++) {
      // Subtle float up and down
      array[i * 3 + 1] = originalY[i] + Math.sin(time * speeds[i] + i) * 0.35;
      // Slight x drift
      array[i * 3] += Math.sin(time * 0.5 + i) * 0.001;
    }

    posAttribute.needsUpdate = true;
  });

  return (
    <points ref={pointsRef}>
      <bufferGeometry>
        <bufferAttribute
          attach="attributes-position"
          args={[positions, 3]}
        />
      </bufferGeometry>
      <pointsMaterial
        size={0.06}
        color="#6366F1"
        transparent
        opacity={0.55}
        sizeAttenuation
      />
    </points>
  );
};
