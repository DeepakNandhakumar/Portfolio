"use client";

import React, { useRef, useMemo } from "react";
import { useFrame } from "@react-three/fiber";
import * as THREE from "three";

interface RoadProps {
  phase: "darkness" | "falling" | "landing" | "standing" | "walking";
  roadLit: boolean;
  nitroActive?: boolean;
}

export function Road({ phase, roadLit, nitroActive = false }: RoadProps) {
  const roadMaterialRef = useRef<THREE.MeshStandardMaterial>(null);
  const rippleMeshRef = useRef<THREE.Mesh>(null);
  const chevronsGroupRef = useRef<THREE.Group>(null);
  const gantriesGroupRef = useRef<THREE.Group>(null);
  const kerbsGroupRef = useRef<THREE.Group>(null);

  // Shockwave ripple state
  const rippleState = useRef({ scale: 0.1, opacity: 0, active: false });

  // Generate Racing Kerbs (Red/White & Cyan/Amber racing curb strips)
  const kerbStrips = useMemo(() => {
    const strips = [];
    for (let z = -40; z <= 20; z += 1.5) {
      const isAlt = Math.floor(z / 1.5) % 2 === 0;
      strips.push({ id: `kerb-l-${z}`, x: -3.0, z, color: isAlt ? "#FF0055" : "#FFFFFF" });
      strips.push({ id: `kerb-r-${z}`, x: 3.0, z, color: isAlt ? "#00F0FF" : "#FFFFFF" });
    }
    return strips;
  }, []);

  // Generate Overhead Cyber Racing Gantries
  const gantries = useMemo(() => {
    return [
      { id: "gantry-start", z: -2 },
      { id: "gantry-1", z: -16 },
      { id: "gantry-2", z: -30 },
      { id: "gantry-3", z: -44 },
    ];
  }, []);

  // Generate Glowing Speed Chevron Arrows on Track Surface
  const chevrons = useMemo(() => {
    const items = [];
    for (let z = -35; z <= 15; z += 5) {
      items.push({ id: `chev-${z}`, z });
    }
    return items;
  }, []);

  useFrame((state, delta) => {
    const time = state.clock.getElapsedTime();
    const speedMult = nitroActive ? 2.2 : 1.0;

    // Road glowing intensity
    if (roadMaterialRef.current) {
      const targetEmissive = roadLit ? (nitroActive ? 0.6 : 0.35) : 0.02;
      roadMaterialRef.current.emissiveIntensity = THREE.MathUtils.lerp(
        roadMaterialRef.current.emissiveIntensity,
        targetEmissive,
        delta * 4
      );
    }

    // Trigger ripple on hero landing
    if (phase === "landing" && !rippleState.current.active) {
      rippleState.current.active = true;
      rippleState.current.scale = 0.2;
      rippleState.current.opacity = 1;
    }

    // Animate landing impact ripple
    if (rippleState.current.active && rippleMeshRef.current) {
      rippleState.current.scale += delta * 8;
      rippleState.current.opacity -= delta * 1.8;

      rippleMeshRef.current.scale.set(
        rippleState.current.scale,
        rippleState.current.scale,
        1
      );

      const mat = rippleMeshRef.current.material as THREE.MeshBasicMaterial;
      if (mat) {
        mat.opacity = Math.max(rippleState.current.opacity, 0);
      }

      if (rippleState.current.opacity <= 0) {
        rippleState.current.active = false;
        rippleState.current.scale = 0.1;
      }
    }

    // Zoom speed chevrons forward at racing speed
    if (chevronsGroupRef.current && (phase === "walking" || phase === "standing")) {
      chevronsGroupRef.current.children.forEach((child) => {
        child.position.z += delta * 12 * speedMult;
        if (child.position.z > 15) {
          child.position.z = -35;
        }
      });
    }

    // Move gantries for infinite road parallax
    if (gantriesGroupRef.current && (phase === "walking" || phase === "standing")) {
      gantriesGroupRef.current.children.forEach((gantry) => {
        gantry.position.z += delta * 8 * speedMult;
        if (gantry.position.z > 10) {
          gantry.position.z = -46;
        }
      });
    }
  });

  return (
    <group position={[0, -0.05, 0]}>
      {/* Main High-Speed Asphalt Racing Track */}
      <mesh receiveShadow rotation={[-Math.PI / 2, 0, 0]} position={[0, 0, -10]}>
        <planeGeometry args={[6.2, 80]} />
        <meshStandardMaterial
          ref={roadMaterialRef}
          color="#040714"
          roughness={0.2}
          metalness={0.85}
          emissive="#080D1E"
          emissiveIntensity={0.1}
        />
      </mesh>

      {/* Center Dual Racing Speed Lines */}
      <mesh rotation={[-Math.PI / 2, 0, 0]} position={[-0.1, 0.01, -10]}>
        <planeGeometry args={[0.06, 80]} />
        <meshBasicMaterial color={roadLit ? "#00F0FF" : "#1e293b"} />
      </mesh>
      <mesh rotation={[-Math.PI / 2, 0, 0]} position={[0.1, 0.01, -10]}>
        <planeGeometry args={[0.06, 80]} />
        <meshBasicMaterial color={roadLit ? "#FF0055" : "#1e293b"} />
      </mesh>

      {/* Left Neon Boundary Guard Line */}
      <mesh rotation={[-Math.PI / 2, 0, 0]} position={[-2.8, 0.01, -10]}>
        <planeGeometry args={[0.08, 80]} />
        <meshBasicMaterial color={roadLit ? "#00F0FF" : "#1e293b"} />
      </mesh>

      {/* Right Neon Boundary Guard Line */}
      <mesh rotation={[-Math.PI / 2, 0, 0]} position={[2.8, 0.01, -10]}>
        <planeGeometry args={[0.08, 80]} />
        <meshBasicMaterial color={roadLit ? "#8B5CF6" : "#1e293b"} />
      </mesh>

      {/* Racing Track Kerbs (Sides) */}
      <group ref={kerbsGroupRef}>
        {kerbStrips.map((k) => (
          <mesh key={k.id} rotation={[-Math.PI / 2, 0, 0]} position={[k.x, 0.02, k.z]}>
            <planeGeometry args={[0.35, 1.2]} />
            <meshBasicMaterial color={roadLit ? k.color : "#1e293b"} />
          </mesh>
        ))}
      </group>

      {/* Speed Chevron Arrows (>>>) along Track */}
      <group ref={chevronsGroupRef}>
        {chevrons.map((c) => (
          <group key={c.id} position={[0, 0.015, c.z]}>
            {/* Left Chevron Wing */}
            <mesh rotation={[-Math.PI / 2, 0, Math.PI / 4]} position={[-0.45, 0, 0]}>
              <planeGeometry args={[0.1, 0.7]} />
              <meshBasicMaterial color="#00F0FF" transparent opacity={roadLit ? 0.8 : 0.1} />
            </mesh>
            {/* Right Chevron Wing */}
            <mesh rotation={[-Math.PI / 2, 0, -Math.PI / 4]} position={[0.45, 0, 0]}>
              <planeGeometry args={[0.1, 0.7]} />
              <meshBasicMaterial color="#00F0FF" transparent opacity={roadLit ? 0.8 : 0.1} />
            </mesh>
          </group>
        ))}
      </group>

      {/* Overhead Cyber Racing Gantries */}
      <group ref={gantriesGroupRef}>
        {gantries.map((g) => (
          <group key={g.id} position={[0, 0, g.z]}>
            {/* Left Support Pillar */}
            <mesh position={[-3.6, 2.2, 0]}>
              <boxGeometry args={[0.2, 4.4, 0.2]} />
              <meshStandardMaterial color="#0B1120" roughness={0.3} metalness={0.9} />
            </mesh>
            {/* Right Support Pillar */}
            <mesh position={[3.6, 2.2, 0]}>
              <boxGeometry args={[0.2, 4.4, 0.2]} />
              <meshStandardMaterial color="#0B1120" roughness={0.3} metalness={0.9} />
            </mesh>
            {/* Overhead Crossbar Arch */}
            <mesh position={[0, 4.3, 0]}>
              <boxGeometry args={[7.4, 0.25, 0.3]} />
              <meshStandardMaterial color="#080D1E" roughness={0.2} metalness={0.8} />
            </mesh>
            {/* Neon Speed Banner Light on Arch */}
            <mesh position={[0, 4.3, 0.16]}>
              <boxGeometry args={[4.5, 0.12, 0.02]} />
              <meshBasicMaterial color={roadLit ? "#00F0FF" : "#334155"} />
            </mesh>
            {roadLit && (
              <pointLight position={[0, 4.2, 0.3]} color="#00F0FF" intensity={1.8} distance={6} />
            )}
          </group>
        ))}
      </group>

      {/* Landing Impact Shockwave Ring */}
      <mesh
        ref={rippleMeshRef}
        rotation={[-Math.PI / 2, 0, 0]}
        position={[0, 0.03, -1.5]}
        scale={[0.1, 0.1, 0.1]}
      >
        <ringGeometry args={[0.8, 1.2, 32]} />
        <meshBasicMaterial
          color="#00F0FF"
          transparent
          opacity={0}
          side={THREE.DoubleSide}
        />
      </mesh>

      {/* Outer Cyber Grid Floor */}
      <gridHelper
        args={[90, 45, "#00F0FF", "#080e22"]}
        position={[0, -0.09, -10]}
      />
    </group>
  );
}
