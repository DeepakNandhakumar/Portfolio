import React, { useRef } from 'react';
import { useFrame } from '@react-three/fiber';
import * as THREE from 'three';

interface DesertRunnerProps {
  scrollProgress: number; // 0 (start of desert) to 1 (end of desert)
}

export const DesertRunner: React.FC<DesertRunnerProps> = ({ scrollProgress }) => {
  const runnerGroupRef = useRef<THREE.Group>(null);
  const leftLegRef = useRef<THREE.Group>(null);
  const rightLegRef = useRef<THREE.Group>(null);
  const leftArmRef = useRef<THREE.Group>(null);
  const rightArmRef = useRef<THREE.Group>(null);
  const bodyRef = useRef<THREE.Group>(null);
  const headRef = useRef<THREE.Group>(null);

  useFrame((state, delta) => {
    if (!runnerGroupRef.current) return;
    const time = state.clock.getElapsedTime();

    // Running animation cycle speed
    const runSpeed = 10.5;
    const runCycle = time * runSpeed;

    // Running leg stride (higher swing & knee bend)
    if (leftLegRef.current && rightLegRef.current) {
      leftLegRef.current.rotation.x = Math.sin(runCycle) * 0.85;
      rightLegRef.current.rotation.x = -Math.sin(runCycle) * 0.85;
    }

    // Running arm swing in opposition to legs
    if (leftArmRef.current && rightArmRef.current) {
      leftArmRef.current.rotation.x = -Math.sin(runCycle) * 0.8;
      rightArmRef.current.rotation.x = Math.sin(runCycle) * 0.8;
    }

    // Running vertical bobbing & forward athletic lean
    if (bodyRef.current) {
      bodyRef.current.position.y = 0.9 + Math.abs(Math.sin(runCycle)) * 0.08;
      bodyRef.current.rotation.x = 0.18; // lean forward into sprint
    }

    // Dynamic head glance
    if (headRef.current) {
      headRef.current.rotation.y = Math.sin(time * 1.2) * 0.08;
    }

    // Smooth traversal along desert road (from Z=3 to Z=-65)
    const targetZ = THREE.MathUtils.lerp(3, -65, scrollProgress);
    runnerGroupRef.current.position.z = THREE.MathUtils.lerp(
      runnerGroupRef.current.position.z,
      targetZ,
      delta * 4.5
    );

    // Subtle side-to-side drift as runner maneuvers the path
    runnerGroupRef.current.position.x = Math.sin(time * 0.8) * 0.25;
  });

  return (
    <group
      ref={runnerGroupRef}
      position={[0, 0, 3]}
      rotation={[0, 0, 0]} // facing down the road (-Z direction)
    >
      {/* Torso & Core Body */}
      <group ref={bodyRef} position={[0, 0.9, 0]}>
        {/* Athletic Tech Runner Jacket */}
        <mesh position={[0, 0.22, 0]} castShadow>
          <boxGeometry args={[0.46, 0.56, 0.26]} />
          <meshStandardMaterial color="#FFFFFF" roughness={0.3} metalness={0.15} />
        </mesh>

        {/* Indigo Runner Accent Stripe */}
        <mesh position={[0, 0.22, 0.135]}>
          <boxGeometry args={[0.04, 0.54, 0.01]} />
          <meshBasicMaterial color="#4F46E5" />
        </mesh>

        {/* Lightweight Tech Pack on Back */}
        <mesh position={[0, 0.24, -0.16]} castShadow>
          <boxGeometry args={[0.3, 0.38, 0.12]} />
          <meshStandardMaterial color="#0F172A" roughness={0.6} />
        </mesh>
        <mesh position={[0, 0.24, -0.225]}>
          <boxGeometry args={[0.06, 0.06, 0.01]} />
          <meshBasicMaterial color="#06B6D4" />
        </mesh>

        {/* Neck */}
        <mesh position={[0, 0.53, 0]}>
          <cylinderGeometry args={[0.06, 0.07, 0.09, 16]} />
          <meshStandardMaterial color="#FDBA74" roughness={0.6} />
        </mesh>

        {/* Head */}
        <group ref={headRef} position={[0, 0.68, 0]}>
          <mesh castShadow>
            <sphereGeometry args={[0.14, 24, 24]} />
            <meshStandardMaterial color="#FDBA74" roughness={0.5} />
          </mesh>
          {/* Hair */}
          <mesh position={[0, 0.06, -0.02]} castShadow>
            <boxGeometry args={[0.26, 0.15, 0.24]} />
            <meshStandardMaterial color="#1E293B" roughness={0.8} />
          </mesh>
          {/* Cyber Visor / Glasses */}
          <mesh position={[0, 0.01, 0.13]}>
            <boxGeometry args={[0.2, 0.04, 0.03]} />
            <meshStandardMaterial color="#4F46E5" metalness={0.8} roughness={0.2} />
          </mesh>
        </group>

        {/* Left Arm */}
        <group ref={leftArmRef} position={[-0.28, 0.42, 0]}>
          <mesh position={[0, -0.2, 0]} castShadow>
            <boxGeometry args={[0.1, 0.44, 0.1]} />
            <meshStandardMaterial color="#FFFFFF" roughness={0.4} />
          </mesh>
          <mesh position={[0, -0.44, 0]}>
            <sphereGeometry args={[0.05, 12, 12]} />
            <meshStandardMaterial color="#FDBA74" />
          </mesh>
        </group>

        {/* Right Arm */}
        <group ref={rightArmRef} position={[0.28, 0.42, 0]}>
          <mesh position={[0, -0.2, 0]} castShadow>
            <boxGeometry args={[0.1, 0.44, 0.1]} />
            <meshStandardMaterial color="#FFFFFF" roughness={0.4} />
          </mesh>
          <mesh position={[0, -0.44, 0]}>
            <sphereGeometry args={[0.05, 12, 12]} />
            <meshStandardMaterial color="#FDBA74" />
          </mesh>
        </group>
      </group>

      {/* Left Running Leg */}
      <group ref={leftLegRef} position={[-0.14, 0.65, 0]}>
        <mesh position={[0, -0.28, 0]} castShadow>
          <boxGeometry args={[0.12, 0.54, 0.12]} />
          <meshStandardMaterial color="#0F172A" roughness={0.6} />
        </mesh>
        {/* Left Shoe */}
        <mesh position={[0, -0.56, 0.06]} castShadow>
          <boxGeometry args={[0.13, 0.1, 0.22]} />
          <meshStandardMaterial color="#4F46E5" roughness={0.4} />
        </mesh>
      </group>

      {/* Right Running Leg */}
      <group ref={rightLegRef} position={[0.14, 0.65, 0]}>
        <mesh position={[0, -0.28, 0]} castShadow>
          <boxGeometry args={[0.12, 0.54, 0.12]} />
          <meshStandardMaterial color="#0F172A" roughness={0.6} />
        </mesh>
        {/* Right Shoe */}
        <mesh position={[0, -0.56, 0.06]} castShadow>
          <boxGeometry args={[0.13, 0.1, 0.22]} />
          <meshStandardMaterial color="#06B6D4" roughness={0.4} />
        </mesh>
      </group>
    </group>
  );
};
