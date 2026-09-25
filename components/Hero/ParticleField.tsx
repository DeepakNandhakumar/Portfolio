"use client";

import React, { useMemo, useRef } from "react";
import { useFrame } from "@react-three/fiber";
import * as THREE from "three";

interface ParticleFieldProps {
  count?: number;
  mousePos?: { x: number; y: number };
}

export function ParticleField({ count = 450, mousePos = { x: 0, y: 0 } }: ParticleFieldProps) {
  const pointsRef = useRef<THREE.Points>(null);

  const [positions, colors] = useMemo(() => {
    const pos = new Float32Array(count * 3);
    const col = new Float32Array(count * 3);
    const palette = [
      new THREE.Color("#4F46E5"), // Indigo
      new THREE.Color("#7C3AED"), // Purple
      new THREE.Color("#06B6D4"), // Cyan
      new THREE.Color("#FFFFFF"), // White
    ];

    for (let i = 0; i < count; i++) {
      const i3 = i * 3;
      // Spread across wide cylindrical volume along the road
      pos[i3] = (Math.random() - 0.5) * 28;
      pos[i3 + 1] = Math.random() * 14 + 0.2;
      pos[i3 + 2] = (Math.random() - 0.5) * 45;

      const c = palette[Math.floor(Math.random() * palette.length)];
      col[i3] = c.r;
      col[i3 + 1] = c.g;
      col[i3 + 2] = c.b;
    }

    return [pos, col];
  }, [count]);

  useFrame((state, delta) => {
    if (!pointsRef.current) return;
    const time = state.clock.getElapsedTime();

    // Subtle drift
    pointsRef.current.rotation.y = time * 0.02 + mousePos.x * 0.05;
    pointsRef.current.rotation.x = mousePos.y * 0.03;

    const geo = pointsRef.current.geometry;
    const posAttr = geo.attributes.position;

    for (let i = 0; i < count; i++) {
      let y = posAttr.getY(i);
      y += Math.sin(time + i) * 0.003;
      posAttr.setY(i, y);
    }
    posAttr.needsUpdate = true;
  });

  return (
    <points ref={pointsRef}>
      <bufferGeometry>
        <bufferAttribute
          attach="attributes-position"
          args={[positions, 3]}
        />
        <bufferAttribute
          attach="attributes-color"
          args={[colors, 3]}
        />
      </bufferGeometry>
      <pointsMaterial
        size={0.06}
        vertexColors
        transparent
        opacity={0.75}
        blending={THREE.AdditiveBlending}
        sizeAttenuation
      />
    </points>
  );
}
