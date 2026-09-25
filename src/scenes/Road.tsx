import React, { useRef, useMemo } from 'react';
import { useFrame } from '@react-three/fiber';
import * as THREE from 'three';

interface RoadProps {
  rippleTrigger?: number; // timestamp when landing happened
  scrollProgress?: number;
}

export const Road: React.FC<RoadProps> = ({ rippleTrigger = 0, scrollProgress = 0 }) => {
  const roadMeshRef = useRef<THREE.Mesh>(null);
  const ripple1Ref = useRef<THREE.Mesh>(null);
  const ripple2Ref = useRef<THREE.Mesh>(null);
  const ripple3Ref = useRef<THREE.Mesh>(null);

  // Generate dashed center line segments
  const dashes = useMemo(() => {
    const list = [];
    for (let z = 10; z >= -60; z -= 3.5) {
      list.push(z);
    }
    return list;
  }, []);

  // Road light edge markers
  const edgePillars = useMemo(() => {
    const list = [];
    for (let z = 10; z >= -60; z -= 6) {
      list.push({ z, leftX: -2.2, rightX: 2.2 });
    }
    return list;
  }, []);

  useFrame((state) => {
    const time = state.clock.getElapsedTime();

    // Landing ripple animation
    if (rippleTrigger > 0) {
      const elapsed = time - rippleTrigger;
      if (elapsed > 0 && elapsed < 2.5) {
        if (ripple1Ref.current) {
          const s1 = THREE.MathUtils.lerp(0.1, 4.5, Math.min(elapsed / 1.5, 1));
          ripple1Ref.current.scale.set(s1, s1, 1);
          (ripple1Ref.current.material as THREE.MeshBasicMaterial).opacity = Math.max(0, 1 - elapsed / 1.5);
        }
        if (ripple2Ref.current) {
          const s2 = THREE.MathUtils.lerp(0.1, 3.2, Math.min(Math.max(0, (elapsed - 0.2) / 1.4), 1));
          ripple2Ref.current.scale.set(s2, s2, 1);
          (ripple2Ref.current.material as THREE.MeshBasicMaterial).opacity = Math.max(0, 1 - (elapsed - 0.2) / 1.4);
        }
        if (ripple3Ref.current) {
          const s3 = THREE.MathUtils.lerp(0.1, 2.0, Math.min(Math.max(0, (elapsed - 0.4) / 1.2), 1));
          ripple3Ref.current.scale.set(s3, s3, 1);
          (ripple3Ref.current.material as THREE.MeshBasicMaterial).opacity = Math.max(0, 1 - (elapsed - 0.4) / 1.2);
        }
      }
    }
  });

  return (
    <group position={[0, 0, 0]}>
      {/* Primary Road Surface (Clean Light Futuristic Surface) */}
      <mesh
        ref={roadMeshRef}
        rotation={[-Math.PI / 2, 0, 0]}
        position={[0, -0.01, -25]}
        receiveShadow
      >
        <planeGeometry args={[4.2, 80]} />
        <meshStandardMaterial
          color="#F8FAFC"
          roughness={0.2}
          metalness={0.05}
        />
      </mesh>

      {/* Sub-road foundation glow */}
      <mesh
        rotation={[-Math.PI / 2, 0, 0]}
        position={[0, -0.02, -25]}
      >
        <planeGeometry args={[5.2, 80]} />
        <meshStandardMaterial
          color="#EEF2F6"
          roughness={0.4}
        />
      </mesh>

      {/* Left Road Accent Light Strip */}
      <mesh rotation={[-Math.PI / 2, 0, 0]} position={[-2.05, 0.005, -25]}>
        <planeGeometry args={[0.06, 80]} />
        <meshBasicMaterial color="#4F46E5" transparent opacity={0.7} />
      </mesh>

      {/* Right Road Accent Light Strip */}
      <mesh rotation={[-Math.PI / 2, 0, 0]} position={[2.05, 0.005, -25]}>
        <planeGeometry args={[0.06, 80]} />
        <meshBasicMaterial color="#06B6D4" transparent opacity={0.7} />
      </mesh>

      {/* Center Dashed Guides */}
      {dashes.map((z, idx) => (
        <mesh key={idx} rotation={[-Math.PI / 2, 0, 0]} position={[0, 0.006, z]}>
          <planeGeometry args={[0.08, 1.6]} />
          <meshBasicMaterial color="#CBD5E1" transparent opacity={0.8} />
        </mesh>
      ))}

      {/* Futuristic Edge Light Nodes */}
      {edgePillars.map((pillar, idx) => (
        <group key={idx}>
          {/* Left Node */}
          <mesh position={[pillar.leftX, 0.04, pillar.z]}>
            <boxGeometry args={[0.08, 0.08, 0.2]} />
            <meshBasicMaterial color="#818CF8" />
          </mesh>
          {/* Right Node */}
          <mesh position={[pillar.rightX, 0.04, pillar.z]}>
            <boxGeometry args={[0.08, 0.08, 0.2]} />
            <meshBasicMaterial color="#22D3EE" />
          </mesh>
        </group>
      ))}

      {/* Touchdown / Landing Shockwave Ripple Rings */}
      <mesh ref={ripple1Ref} rotation={[-Math.PI / 2, 0, 0]} position={[0, 0.015, 0]}>
        <ringGeometry args={[0.9, 1.05, 48]} />
        <meshBasicMaterial color="#4F46E5" transparent opacity={0} side={THREE.DoubleSide} />
      </mesh>

      <mesh ref={ripple2Ref} rotation={[-Math.PI / 2, 0, 0]} position={[0, 0.016, 0]}>
        <ringGeometry args={[0.5, 0.65, 48]} />
        <meshBasicMaterial color="#06B6D4" transparent opacity={0} side={THREE.DoubleSide} />
      </mesh>

      <mesh ref={ripple3Ref} rotation={[-Math.PI / 2, 0, 0]} position={[0, 0.017, 0]}>
        <ringGeometry args={[0.2, 0.32, 48]} />
        <meshBasicMaterial color="#7C3AED" transparent opacity={0} side={THREE.DoubleSide} />
      </mesh>
    </group>
  );
};
