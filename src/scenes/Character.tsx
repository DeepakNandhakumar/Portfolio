import React, { useRef, useState, useEffect } from 'react';
import { useFrame } from '@react-three/fiber';
import * as THREE from 'three';

interface CharacterProps {
  scrollProgress?: number;
  onLand?: () => void;
  isReducedMotion?: boolean;
}

export const Character: React.FC<CharacterProps> = ({
  scrollProgress = 0,
  onLand,
  isReducedMotion = false,
}) => {
  const groupRef = useRef<THREE.Group>(null);
  const leftLegRef = useRef<THREE.Group>(null);
  const rightLegRef = useRef<THREE.Group>(null);
  const leftArmRef = useRef<THREE.Group>(null);
  const rightArmRef = useRef<THREE.Group>(null);
  const bodyRef = useRef<THREE.Group>(null);
  const headRef = useRef<THREE.Group>(null);

  // Animation phase: 'falling' | 'landing' | 'walking'
  const [phase, setPhase] = useState<'falling' | 'landing' | 'walking'>(
    isReducedMotion ? 'walking' : 'falling'
  );
  const landingTimeRef = useRef<number>(0);
  const hasTriggeredLandRef = useRef<boolean>(false);

  useEffect(() => {
    if (isReducedMotion) {
      setPhase('walking');
    }
  }, [isReducedMotion]);

  useFrame((state, delta) => {
    if (!groupRef.current) return;
    const time = state.clock.getElapsedTime();

    if (phase === 'falling') {
      // Character drops down from y=4.5 to y=0
      groupRef.current.position.y = THREE.MathUtils.lerp(groupRef.current.position.y, 0, delta * 4.5);

      if (groupRef.current.position.y < 0.08) {
        groupRef.current.position.y = 0;
        setPhase('landing');
        landingTimeRef.current = time;

        if (!hasTriggeredLandRef.current) {
          hasTriggeredLandRef.current = true;
          onLand?.();
        }
      }
    } else if (phase === 'landing') {
      const elapsedSinceLanding = time - landingTimeRef.current;
      // Squat & rebound
      if (bodyRef.current) {
        if (elapsedSinceLanding < 0.3) {
          bodyRef.current.scale.y = THREE.MathUtils.lerp(bodyRef.current.scale.y, 0.82, delta * 12);
        } else {
          bodyRef.current.scale.y = THREE.MathUtils.lerp(bodyRef.current.scale.y, 1.0, delta * 8);
          if (elapsedSinceLanding > 0.6) {
            setPhase('walking');
          }
        }
      }
    } else {
      // Walking phase
      const walkSpeed = 5.5;
      const walkCycle = time * walkSpeed;

      // Leg swing
      if (leftLegRef.current && rightLegRef.current) {
        leftLegRef.current.rotation.x = Math.sin(walkCycle) * 0.45;
        rightLegRef.current.rotation.x = -Math.sin(walkCycle) * 0.45;
      }

      // Arm swing
      if (leftArmRef.current && rightArmRef.current) {
        leftArmRef.current.rotation.x = -Math.sin(walkCycle) * 0.4;
        rightArmRef.current.rotation.x = Math.sin(walkCycle) * 0.4;
      }

      // Subtle torso bobbing
      if (bodyRef.current) {
        bodyRef.current.position.y = 0.95 + Math.abs(Math.sin(walkCycle * 2)) * 0.04;
      }

      // Subtle head look
      if (headRef.current) {
        headRef.current.rotation.y = Math.sin(time * 0.8) * 0.05;
      }

      // Move along Z based on scroll
      const targetZ = -scrollProgress * 6;
      groupRef.current.position.z = THREE.MathUtils.lerp(groupRef.current.position.z, targetZ, delta * 3);
    }
  });

  return (
    <group
      ref={groupRef}
      position={[0, phase === 'falling' ? 4.5 : 0, 0]}
      rotation={[0, Math.PI, 0]} // facing down the road forward
    >
      {/* Torso & Upper Body Group */}
      <group ref={bodyRef} position={[0, 0.95, 0]}>
        {/* Modern Minimalist White/Light Tech Jacket */}
        <mesh position={[0, 0.2, 0]} castShadow>
          <boxGeometry args={[0.48, 0.58, 0.28]} />
          <meshStandardMaterial color="#FFFFFF" roughness={0.35} metalness={0.1} />
        </mesh>

        {/* Jacket Zipper / Accent Stripe */}
        <mesh position={[0, 0.2, 0.145]}>
          <boxGeometry args={[0.02, 0.56, 0.01]} />
          <meshBasicMaterial color="#4F46E5" />
        </mesh>

        {/* Backpack / Tech Sling Bag on Back */}
        <mesh position={[0, 0.22, -0.18]} castShadow>
          <boxGeometry args={[0.34, 0.42, 0.14]} />
          <meshStandardMaterial color="#0F172A" roughness={0.6} />
        </mesh>
        {/* Backpack Accent Badge */}
        <mesh position={[0, 0.22, -0.255]}>
          <boxGeometry args={[0.08, 0.08, 0.01]} />
          <meshBasicMaterial color="#06B6D4" />
        </mesh>

        {/* Neck */}
        <mesh position={[0, 0.54, 0]}>
          <cylinderGeometry args={[0.07, 0.08, 0.1, 16]} />
          <meshStandardMaterial color="#FDBA74" roughness={0.6} />
        </mesh>

        {/* Head */}
        <group ref={headRef} position={[0, 0.72, 0]}>
          {/* Face */}
          <mesh castShadow>
            <sphereGeometry args={[0.15, 24, 24]} />
            <meshStandardMaterial color="#FDBA74" roughness={0.5} />
          </mesh>
          {/* Hair (Clean modern software engineer styling) */}
          <mesh position={[0, 0.06, -0.02]} castShadow>
            <boxGeometry args={[0.28, 0.16, 0.26]} />
            <meshStandardMaterial color="#1E293B" roughness={0.8} />
          </mesh>
          {/* Minimal Tech Glasses */}
          <mesh position={[0, 0.01, 0.14]}>
            <boxGeometry args={[0.22, 0.04, 0.03]} />
            <meshStandardMaterial color="#4F46E5" metalness={0.8} roughness={0.2} />
          </mesh>
        </group>

        {/* Left Arm */}
        <group ref={leftArmRef} position={[-0.3, 0.4, 0]}>
          <mesh position={[0, -0.22, 0]} castShadow>
            <boxGeometry args={[0.12, 0.48, 0.12]} />
            <meshStandardMaterial color="#F8FAFC" roughness={0.4} />
          </mesh>
          {/* Hand */}
          <mesh position={[0, -0.48, 0]}>
            <sphereGeometry args={[0.055, 16, 16]} />
            <meshStandardMaterial color="#FDBA74" roughness={0.5} />
          </mesh>
        </group>

        {/* Right Arm */}
        <group ref={rightArmRef} position={[0.3, 0.4, 0]}>
          <mesh position={[0, -0.22, 0]} castShadow>
            <boxGeometry args={[0.12, 0.48, 0.12]} />
            <meshStandardMaterial color="#F8FAFC" roughness={0.4} />
          </mesh>
          {/* Hand */}
          <mesh position={[0, -0.48, 0]}>
            <sphereGeometry args={[0.055, 16, 16]} />
            <meshStandardMaterial color="#FDBA74" roughness={0.5} />
          </mesh>
        </group>
      </group>

      {/* Hip / Waist */}
      <mesh position={[0, 0.9, 0]}>
        <boxGeometry args={[0.42, 0.12, 0.24]} />
        <meshStandardMaterial color="#334155" roughness={0.6} />
      </mesh>

      {/* Left Leg */}
      <group ref={leftLegRef} position={[-0.14, 0.85, 0]}>
        <mesh position={[0, -0.38, 0]} castShadow>
          <boxGeometry args={[0.14, 0.72, 0.16]} />
          <meshStandardMaterial color="#1E293B" roughness={0.6} />
        </mesh>
        {/* Left Sneaker (Clean Minimal White with Indigo Accent) */}
        <mesh position={[0, -0.78, 0.05]} castShadow>
          <boxGeometry args={[0.15, 0.1, 0.28]} />
          <meshStandardMaterial color="#FFFFFF" roughness={0.3} />
        </mesh>
        <mesh position={[0, -0.74, 0.05]}>
          <boxGeometry args={[0.152, 0.02, 0.14]} />
          <meshBasicMaterial color="#4F46E5" />
        </mesh>
      </group>

      {/* Right Leg */}
      <group ref={rightLegRef} position={[0.14, 0.85, 0]}>
        <mesh position={[0, -0.38, 0]} castShadow>
          <boxGeometry args={[0.14, 0.72, 0.16]} />
          <meshStandardMaterial color="#1E293B" roughness={0.6} />
        </mesh>
        {/* Right Sneaker */}
        <mesh position={[0, -0.78, 0.05]} castShadow>
          <boxGeometry args={[0.15, 0.1, 0.28]} />
          <meshStandardMaterial color="#FFFFFF" roughness={0.3} />
        </mesh>
        <mesh position={[0, -0.74, 0.05]}>
          <boxGeometry args={[0.152, 0.02, 0.14]} />
          <meshBasicMaterial color="#4F46E5" />
        </mesh>
      </group>
    </group>
  );
};
