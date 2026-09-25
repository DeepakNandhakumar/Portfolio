"use client";

import React, { useRef } from "react";
import { useFrame } from "@react-three/fiber";
import * as THREE from "three";

interface CharacterProps {
  phase: "darkness" | "falling" | "landing" | "standing" | "walking";
  progress: number;
  nitroActive?: boolean;
}

export function Character({ phase, progress, nitroActive = false }: CharacterProps) {
  const groupRef = useRef<THREE.Group>(null);
  const leftLegRef = useRef<THREE.Group>(null);
  const rightLegRef = useRef<THREE.Group>(null);
  const leftArmRef = useRef<THREE.Group>(null);
  const rightArmRef = useRef<THREE.Group>(null);
  const headRef = useRef<THREE.Group>(null);
  const torsoRef = useRef<THREE.Group>(null);
  const leftFlameRef = useRef<THREE.Mesh>(null);
  const rightFlameRef = useRef<THREE.Mesh>(null);

  useFrame((state, delta) => {
    if (!groupRef.current) return;
    const time = state.clock.getElapsedTime();

    if (phase === "darkness") {
      groupRef.current.position.set(0, 18, -4);
      groupRef.current.visible = false;
      return;
    }

    groupRef.current.visible = true;

    if (phase === "falling") {
      // Sky-dive freefall from the sky with rotation flip
      const t = Math.min(progress * 2.6, 1);
      const easeT = Math.pow(t, 2.2); // Gravity acceleration
      const y = THREE.MathUtils.lerp(16, 0.4, easeT);
      groupRef.current.position.set(0, y, -1.8);

      // Sky-dive dynamic roll & pitch
      groupRef.current.rotation.x = THREE.MathUtils.lerp(-1.2, 0.2, easeT);
      groupRef.current.rotation.y = (1 - easeT) * Math.PI * 2; // 360 aerodynamic spin on descent

      // Limbs swept back into streamlined dive
      if (leftArmRef.current) leftArmRef.current.rotation.x = -1.5;
      if (rightArmRef.current) rightArmRef.current.rotation.x = -1.4;
      if (leftLegRef.current) leftLegRef.current.rotation.x = 0.8;
      if (rightLegRef.current) rightLegRef.current.rotation.x = 0.6;
    } else if (phase === "landing") {
      // Hero drift landing impact crouch
      groupRef.current.position.set(0, 0.08, -1.5);
      groupRef.current.rotation.x = 0.4;
      groupRef.current.rotation.y = 0.1;

      if (torsoRef.current) torsoRef.current.position.y = -0.32;
      if (headRef.current) headRef.current.rotation.x = -0.35;
      if (leftLegRef.current) leftLegRef.current.rotation.x = -1.2;
      if (rightLegRef.current) rightLegRef.current.rotation.x = 1.0;
      if (leftArmRef.current) leftArmRef.current.rotation.x = 0.9;
      if (rightArmRef.current) rightArmRef.current.rotation.x = -1.0;
    } else if (phase === "standing") {
      // Powerful racer stand-up transition
      groupRef.current.position.set(0, 0.72, -1.0);
      groupRef.current.rotation.x = THREE.MathUtils.lerp(groupRef.current.rotation.x, 0.08, delta * 4);
      groupRef.current.rotation.y = THREE.MathUtils.lerp(groupRef.current.rotation.y, 0, delta * 4);

      if (torsoRef.current) torsoRef.current.position.y = THREE.MathUtils.lerp(torsoRef.current.position.y, 0, delta * 4);
      if (headRef.current) headRef.current.rotation.x = THREE.MathUtils.lerp(headRef.current.rotation.x, 0, delta * 4);
      if (leftLegRef.current) leftLegRef.current.rotation.x = THREE.MathUtils.lerp(leftLegRef.current.rotation.x, 0, delta * 4);
      if (rightLegRef.current) rightLegRef.current.rotation.x = THREE.MathUtils.lerp(rightLegRef.current.rotation.x, 0, delta * 4);
      if (leftArmRef.current) leftArmRef.current.rotation.x = THREE.MathUtils.lerp(leftArmRef.current.rotation.x, 0, delta * 4);
      if (rightArmRef.current) rightArmRef.current.rotation.x = THREE.MathUtils.lerp(rightArmRef.current.rotation.x, 0, delta * 4);
    } else if (phase === "walking") {
      // Dynamic high-speed cyber sprint along the racing track
      const sprintSpeed = nitroActive ? 9.0 : 6.2;
      const sprintCycle = Math.sin(time * sprintSpeed);
      const bob = Math.abs(Math.cos(time * sprintSpeed)) * 0.1;

      groupRef.current.position.set(0, 0.75 + bob, 0.3);
      groupRef.current.rotation.x = 0.12; // Forward lean
      groupRef.current.rotation.y = Math.sin(time * 1.2) * 0.06;

      // Aggressive racing stride
      if (leftLegRef.current) leftLegRef.current.rotation.x = sprintCycle * 0.7;
      if (rightLegRef.current) rightLegRef.current.rotation.x = -sprintCycle * 0.7;

      // Arms swing
      if (leftArmRef.current) leftArmRef.current.rotation.x = -sprintCycle * 0.6;
      if (rightArmRef.current) rightArmRef.current.rotation.x = sprintCycle * 0.6;

      // Head forward focus
      if (headRef.current) {
        headRef.current.rotation.y = Math.sin(time * 1.5) * 0.05;
        headRef.current.rotation.x = -0.1 + bob * 0.15;
      }

      // Animated Nitro Booster Exhaust Flames
      const flameScale = nitroActive ? 1.8 : 0.8 + Math.sin(time * 20) * 0.25;
      if (leftFlameRef.current) leftFlameRef.current.scale.set(1, flameScale, 1);
      if (rightFlameRef.current) rightFlameRef.current.scale.set(1, flameScale, 1);
    }
  });

  return (
    <group ref={groupRef} scale={[0.88, 0.88, 0.88]}>
      {/* Torso & Racing Jumpsuit */}
      <group ref={torsoRef} position={[0, 0.8, 0]}>
        {/* Main Chest / Racing Armor */}
        <mesh castShadow position={[0, 0.35, 0]}>
          <boxGeometry args={[0.72, 0.82, 0.44]} />
          <meshStandardMaterial
            color="#080D1E"
            roughness={0.3}
            metalness={0.7}
          />
        </mesh>

        {/* Cyber Neon Racing Stripes */}
        <mesh position={[-0.14, 0.35, 0.23]}>
          <boxGeometry args={[0.05, 0.78, 0.02]} />
          <meshBasicMaterial color="#00F0FF" />
        </mesh>
        <mesh position={[0.14, 0.35, 0.23]}>
          <boxGeometry args={[0.05, 0.78, 0.02]} />
          <meshBasicMaterial color="#FF0055" />
        </mesh>

        {/* Owlsure Racer Number #01 Badge on Chest */}
        <mesh position={[0, 0.5, 0.23]}>
          <boxGeometry args={[0.14, 0.14, 0.02]} />
          <meshBasicMaterial color="#F59E0B" />
        </mesh>

        {/* Twin Nitro Booster Jetpack on Back */}
        <mesh position={[0, 0.42, -0.28]}>
          <boxGeometry args={[0.52, 0.55, 0.22]} />
          <meshStandardMaterial color="#111827" roughness={0.2} metalness={0.9} />
        </mesh>

        {/* Left Nitro Exhaust Thruster */}
        <mesh position={[-0.16, 0.2, -0.32]} rotation={[Math.PI, 0, 0]}>
          <cylinderGeometry args={[0.06, 0.09, 0.22, 16]} />
          <meshStandardMaterial color="#1E293B" metalness={0.9} />
        </mesh>
        {/* Left Exhaust Flame */}
        <mesh ref={leftFlameRef} position={[-0.16, 0.02, -0.32]} rotation={[0, 0, 0]}>
          <coneGeometry args={[0.07, 0.35, 12]} />
          <meshBasicMaterial color="#00F0FF" />
        </mesh>

        {/* Right Nitro Exhaust Thruster */}
        <mesh position={[0.16, 0.2, -0.32]} rotation={[Math.PI, 0, 0]}>
          <cylinderGeometry args={[0.06, 0.09, 0.22, 16]} />
          <meshStandardMaterial color="#1E293B" metalness={0.9} />
        </mesh>
        {/* Right Exhaust Flame */}
        <mesh ref={rightFlameRef} position={[0.16, 0.02, -0.32]} rotation={[0, 0, 0]}>
          <coneGeometry args={[0.07, 0.35, 12]} />
          <meshBasicMaterial color="#FF0055" />
        </mesh>

        {/* Thruster Lights */}
        <pointLight position={[-0.16, 0.0, -0.4]} color="#00F0FF" intensity={nitroActive ? 3.0 : 1.5} distance={2.5} />
        <pointLight position={[0.16, 0.0, -0.4]} color="#FF0055" intensity={nitroActive ? 3.0 : 1.5} distance={2.5} />

        {/* Cyber Racing Helmet & Aerodynamic Visor */}
        <group ref={headRef} position={[0, 0.95, 0]}>
          {/* Helmet Base */}
          <mesh castShadow>
            <sphereGeometry args={[0.27, 24, 24]} />
            <meshStandardMaterial color="#080D1E" roughness={0.2} metalness={0.8} />
          </mesh>

          {/* Aerodynamic Visor / HUD */}
          <mesh position={[0, 0.02, 0.19]}>
            <boxGeometry args={[0.36, 0.14, 0.12]} />
            <meshStandardMaterial
              color="#00F0FF"
              emissive="#00F0FF"
              emissiveIntensity={2.5}
              roughness={0.1}
              metalness={0.9}
            />
          </mesh>
          <pointLight position={[0, 0.02, 0.35]} color="#00F0FF" intensity={2.0} distance={1.8} />

          {/* Helmet Top Racing Fin */}
          <mesh position={[0, 0.22, -0.05]}>
            <boxGeometry args={[0.04, 0.1, 0.3]} />
            <meshBasicMaterial color="#FF0055" />
          </mesh>
        </group>

        {/* Left Arm */}
        <group ref={leftArmRef} position={[-0.46, 0.65, 0]}>
          <mesh position={[0, -0.35, 0]}>
            <cylinderGeometry args={[0.1, 0.08, 0.7, 12]} />
            <meshStandardMaterial color="#1E293B" roughness={0.4} />
          </mesh>
          {/* Gauntlet Neon Glow */}
          <mesh position={[0, -0.58, 0]}>
            <cylinderGeometry args={[0.1, 0.1, 0.16, 12]} />
            <meshBasicMaterial color="#00F0FF" />
          </mesh>
        </group>

        {/* Right Arm */}
        <group ref={rightArmRef} position={[0.46, 0.65, 0]}>
          <mesh position={[0, -0.35, 0]}>
            <cylinderGeometry args={[0.1, 0.08, 0.7, 12]} />
            <meshStandardMaterial color="#1E293B" roughness={0.4} />
          </mesh>
          {/* Gauntlet Neon Glow */}
          <mesh position={[0, -0.58, 0]}>
            <cylinderGeometry args={[0.1, 0.1, 0.16, 12]} />
            <meshBasicMaterial color="#FF0055" />
          </mesh>
        </group>
      </group>

      {/* Left Leg */}
      <group ref={leftLegRef} position={[-0.2, 0.8, 0]}>
        <mesh position={[0, -0.45, 0]}>
          <cylinderGeometry args={[0.12, 0.09, 0.9, 12]} />
          <meshStandardMaterial color="#080D1E" roughness={0.4} />
        </mesh>
        {/* Cyber Racing Boot */}
        <mesh position={[0, -0.85, 0.08]}>
          <boxGeometry args={[0.18, 0.16, 0.36]} />
          <meshStandardMaterial color="#1E293B" roughness={0.2} metalness={0.8} />
        </mesh>
        {/* Sole Thruster / Glow */}
        <mesh position={[0, -0.93, 0.08]}>
          <boxGeometry args={[0.16, 0.02, 0.32]} />
          <meshBasicMaterial color="#00F0FF" />
        </mesh>
      </group>

      {/* Right Leg */}
      <group ref={rightLegRef} position={[0.2, 0.8, 0]}>
        <mesh position={[0, -0.45, 0]}>
          <cylinderGeometry args={[0.12, 0.09, 0.9, 12]} />
          <meshStandardMaterial color="#080D1E" roughness={0.4} />
        </mesh>
        {/* Cyber Racing Boot */}
        <mesh position={[0, -0.85, 0.08]}>
          <boxGeometry args={[0.18, 0.16, 0.36]} />
          <meshStandardMaterial color="#1E293B" roughness={0.2} metalness={0.8} />
        </mesh>
        {/* Sole Thruster / Glow */}
        <mesh position={[0, -0.93, 0.08]}>
          <boxGeometry args={[0.16, 0.02, 0.32]} />
          <meshBasicMaterial color="#FF0055" />
        </mesh>
      </group>
    </group>
  );
}
