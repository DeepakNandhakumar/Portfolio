import React, { useRef } from 'react';
import { useFrame } from '@react-three/fiber';
import { Text } from '@react-three/drei';
import * as THREE from 'three';

export const WorkstationScene: React.FC = () => {
  const groupRef = useRef<THREE.Group>(null);
  const orbRef = useRef<THREE.Mesh>(null);
  const coffeeSteamRef = useRef<THREE.Mesh>(null);

  useFrame((state) => {
    const time = state.clock.getElapsedTime();

    if (groupRef.current) {
      // Gentle overall scene breathing
      groupRef.current.rotation.y = Math.sin(time * 0.4) * 0.08 + 0.15;
    }

    if (orbRef.current) {
      // Floating AI orb orbiting slightly
      orbRef.current.position.y = 1.4 + Math.sin(time * 2) * 0.12;
      orbRef.current.position.x = 1.4 + Math.cos(time * 1.5) * 0.1;
    }

    if (coffeeSteamRef.current) {
      coffeeSteamRef.current.position.y = 0.52 + Math.sin(time * 3) * 0.04;
      (coffeeSteamRef.current.material as THREE.MeshBasicMaterial).opacity = 0.4 + Math.sin(time * 2) * 0.2;
    }
  });

  return (
    <group ref={groupRef} position={[0, -0.6, 0]}>
      {/* Lighting */}
      <ambientLight intensity={1.1} />
      <directionalLight position={[4, 8, 4]} intensity={1.4} castShadow />
      <pointLight position={[-2, 3, 2]} intensity={0.6} color="#A5B4FC" />
      <pointLight position={[1.5, 2, 1]} intensity={0.8} color="#67E8F9" />

      {/* Modern Clean Desk Surface */}
      <mesh position={[0, 0, 0]} receiveShadow>
        <boxGeometry args={[4.2, 0.12, 2.4]} />
        <meshStandardMaterial color="#FFFFFF" roughness={0.15} metalness={0.05} />
      </mesh>
      {/* Desk Edge Accent Trim */}
      <mesh position={[0, 0, 1.205]}>
        <boxGeometry args={[4.2, 0.02, 0.01]} />
        <meshBasicMaterial color="#4F46E5" />
      </mesh>

      {/* Large Ultra-wide Curved Monitor */}
      <group position={[0, 0.95, -0.6]}>
        {/* Monitor Stand */}
        <mesh position={[0, -0.55, 0]}>
          <cylinderGeometry args={[0.08, 0.1, 0.7, 16]} />
          <meshStandardMaterial color="#334155" metalness={0.8} roughness={0.2} />
        </mesh>
        <mesh position={[0, -0.88, 0.1]}>
          <boxGeometry args={[0.8, 0.04, 0.5]} />
          <meshStandardMaterial color="#1E293B" metalness={0.8} />
        </mesh>
        {/* Monitor Screen Frame */}
        <mesh castShadow>
          <boxGeometry args={[2.6, 1.2, 0.08]} />
          <meshStandardMaterial color="#0F172A" roughness={0.3} />
        </mesh>
        {/* Screen Display Area (IDE Code Window) */}
        <mesh position={[0, 0, 0.045]}>
          <planeGeometry args={[2.5, 1.1]} />
          <meshBasicMaterial color="#F8FAFC" />
        </mesh>
        {/* Screen Top Titlebar */}
        <mesh position={[0, 0.48, 0.046]}>
          <planeGeometry args={[2.5, 0.14]} />
          <meshBasicMaterial color="#EEF2F6" />
        </mesh>
        {/* Code Dots */}
        <mesh position={[-1.15, 0.48, 0.047]}>
          <circleGeometry args={[0.025, 16]} />
          <meshBasicMaterial color="#EF4444" />
        </mesh>
        <mesh position={[-1.07, 0.48, 0.047]}>
          <circleGeometry args={[0.025, 16]} />
          <meshBasicMaterial color="#F59E0B" />
        </mesh>
        <mesh position={[-0.99, 0.48, 0.047]}>
          <circleGeometry args={[0.025, 16]} />
          <meshBasicMaterial color="#10B981" />
        </mesh>
        {/* Active Tab Label */}
        <Text
          position={[-0.6, 0.48, 0.047]}
          fontSize={0.06}
          color="#334155"
          anchorX="left"
          anchorY="middle"
        >
          {"Deepak_Engineer.tsx — Owlsure"}
        </Text>
        {/* Code Lines on Screen */}
        <Text
          position={[-1.15, 0.28, 0.047]}
          fontSize={0.055}
          color="#4F46E5"
          anchorX="left"
          anchorY="top"
          lineHeight={1.4}
        >
          {`const engineer: Developer = {
  name: "Deepak Nandakumar",
  role: "Software Engineer @ Owlsure",
  stack: ["React", "Spring Boot", "AI"],
  passion: "Scalable Intelligent Systems"
};`}
        </Text>
      </group>

      {/* Developer Laptop (Open on Left) */}
      <group position={[-1.2, 0.1, 0.3]} rotation={[0, 0.35, 0]}>
        {/* Base */}
        <mesh position={[0, 0.02, 0]}>
          <boxGeometry args={[0.7, 0.03, 0.5]} />
          <meshStandardMaterial color="#CBD5E1" metalness={0.7} roughness={0.3} />
        </mesh>
        {/* Trackpad */}
        <mesh position={[0, 0.036, 0.12]}>
          <boxGeometry args={[0.22, 0.002, 0.14]} />
          <meshStandardMaterial color="#94A3B8" />
        </mesh>
        {/* Keyboard area */}
        <mesh position={[0, 0.036, -0.06]}>
          <boxGeometry args={[0.6, 0.002, 0.22]} />
          <meshStandardMaterial color="#1E293B" />
        </mesh>
        {/* Screen Lid (Opened at 110 deg) */}
        <group position={[0, 0.03, -0.24]} rotation={[-0.35, 0, 0]}>
          <mesh position={[0, 0.25, 0]}>
            <boxGeometry args={[0.7, 0.48, 0.02]} />
            <meshStandardMaterial color="#CBD5E1" metalness={0.7} />
          </mesh>
          {/* Laptop Screen Display */}
          <mesh position={[0, 0.25, 0.012]}>
            <planeGeometry args={[0.66, 0.44]} />
            <meshBasicMaterial color="#0F172A" />
          </mesh>
          <Text
            position={[-0.3, 0.42, 0.015]}
            fontSize={0.032}
            color="#38BDF8"
            anchorX="left"
            anchorY="top"
            lineHeight={1.35}
          >
            {`$ whoami\nDeepak Nandakumar\n$ role\nSoftware Engineer\n$ focus\nSoftware | AI | Data\n$ status\nBuilding...`}
          </Text>
        </group>
      </group>

      {/* Sleek Mechanical Keyboard */}
      <mesh position={[0, 0.08, 0.4]}>
        <boxGeometry args={[1.0, 0.04, 0.35]} />
        <meshStandardMaterial color="#F1F5F9" roughness={0.4} />
      </mesh>
      {/* Keyboard Keys */}
      <mesh position={[0, 0.105, 0.4]}>
        <boxGeometry args={[0.94, 0.015, 0.3]} />
        <meshStandardMaterial color="#1E293B" />
      </mesh>

      {/* Ergonomic Mouse */}
      <mesh position={[0.8, 0.08, 0.4]}>
        <boxGeometry args={[0.16, 0.06, 0.26]} />
        <meshStandardMaterial color="#FFFFFF" roughness={0.2} metalness={0.1} />
      </mesh>

      {/* Ceramic Coffee Mug */}
      <group position={[1.3, 0.06, 0.2]}>
        <mesh position={[0, 0.16, 0]} castShadow>
          <cylinderGeometry args={[0.1, 0.08, 0.3, 24]} />
          <meshStandardMaterial color="#FFFFFF" roughness={0.2} />
        </mesh>
        {/* Coffee Liquid */}
        <mesh position={[0, 0.29, 0]}>
          <cylinderGeometry args={[0.09, 0.09, 0.02, 24]} />
          <meshStandardMaterial color="#78350F" roughness={0.1} />
        </mesh>
        {/* Mug Handle */}
        <mesh position={[0.12, 0.16, 0]} rotation={[0, 0, Math.PI / 2]}>
          <torusGeometry args={[0.07, 0.02, 12, 24]} />
          <meshStandardMaterial color="#FFFFFF" />
        </mesh>
        {/* Steam Ring */}
        <mesh ref={coffeeSteamRef} position={[0, 0.5, 0]} rotation={[-Math.PI / 2, 0, 0]}>
          <ringGeometry args={[0.04, 0.07, 16]} />
          <meshBasicMaterial color="#CBD5E1" transparent opacity={0.4} />
        </mesh>
      </group>

      {/* Small Floating AI Intelligence Orb */}
      <mesh ref={orbRef} position={[1.4, 1.4, -0.2]}>
        <sphereGeometry args={[0.16, 32, 32]} />
        <meshStandardMaterial
          color="#06B6D4"
          emissive="#06B6D4"
          emissiveIntensity={0.8}
          roughness={0.1}
          metalness={0.3}
        />
      </mesh>
      {/* Orb Orbiting Ring */}
      <mesh position={[1.4, 1.4, -0.2]} rotation={[Math.PI / 3, Math.PI / 4, 0]}>
        <torusGeometry args={[0.26, 0.012, 16, 48]} />
        <meshBasicMaterial color="#818CF8" transparent opacity={0.8} />
      </mesh>
    </group>
  );
};
