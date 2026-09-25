"use client";

import React, { useRef } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import * as THREE from "three";
import { Character } from "./Character";
import { Road } from "./Road";
import { ParticleField } from "./ParticleField";
import { useReducedMotion } from "@/hooks/useReducedMotion";

interface CinematicSceneProps {
  phase: "darkness" | "falling" | "landing" | "standing" | "walking";
  progress: number;
  roadLit: boolean;
  mousePos: { x: number; y: number };
  nitroActive?: boolean;
}

function CameraRig({
  phase,
  progress,
  mousePos,
  nitroActive,
}: {
  phase: string;
  progress: number;
  mousePos: { x: number; y: number };
  nitroActive?: boolean;
}) {
  const prefersReducedMotion = useReducedMotion();

  useFrame((state, delta) => {
    const camera = state.camera;
    const time = state.clock.getElapsedTime();

    let targetX = 0;
    let targetY = 1.6;
    let targetZ = 3.6;
    let lookTarget = new THREE.Vector3(0, 1.0, -1);

    if (phase === "darkness") {
      targetX = 0;
      targetY = 4.5;
      targetZ = 8.5;
      lookTarget.set(0, 0, -4);
    } else if (phase === "falling") {
      // High-speed tracking dive down behind falling racer
      targetX = 0;
      targetY = THREE.MathUtils.lerp(7, 2.1, Math.min(progress * 2, 1));
      targetZ = THREE.MathUtils.lerp(8, 3.8, Math.min(progress * 2, 1));
      lookTarget.set(0, 1.1, -1.8);
    } else if (phase === "landing") {
      // Landing camera position with racing impact vibration
      const shake = prefersReducedMotion ? 0 : Math.sin(time * 40) * 0.06;
      targetX = shake;
      targetY = 1.15 + shake;
      targetZ = 3.1;
      lookTarget.set(0, 0.55, -1.8);
    } else if (phase === "standing" || phase === "walking") {
      // Dynamic following view with slight parallax orbit and nitro FOV push
      const mouseXOffset = prefersReducedMotion ? 0 : mousePos.x * 0.6;
      const mouseYOffset = prefersReducedMotion ? 0 : mousePos.y * 0.3;
      const nitroFovOffset = nitroActive ? -0.4 : 0;

      targetX = mouseXOffset;
      targetY = 1.65 - mouseYOffset;
      targetZ = 3.7 + nitroFovOffset;
      lookTarget.set(0, 1.1, -1.5);
    }

    camera.position.x = THREE.MathUtils.lerp(camera.position.x, targetX, delta * 3.8);
    camera.position.y = THREE.MathUtils.lerp(camera.position.y, targetY, delta * 3.8);
    camera.position.z = THREE.MathUtils.lerp(camera.position.z, targetZ, delta * 3.8);
    camera.lookAt(lookTarget);
  });

  return null;
}

function DistantCity() {
  return (
    <group position={[0, 0, -32]}>
      {/* Cyber City Silhouettes */}
      {[-12, -9, -6, -3, 0, 3, 6, 9, 12].map((x, idx) => {
        const height = 4 + ((idx * 7) % 8) * 0.9;
        const width = 1.2 + ((idx * 3) % 4) * 0.4;
        return (
          <group key={idx} position={[x * 1.5, height / 2 - 0.5, 0]}>
            <mesh>
              <boxGeometry args={[width, height, 1.5]} />
              <meshBasicMaterial color="#050816" />
            </mesh>
            {/* Beacon light */}
            <mesh position={[0, height / 2 + 0.1, 0]}>
              <sphereGeometry args={[0.08, 8, 8]} />
              <meshBasicMaterial color={idx % 2 === 0 ? "#00F0FF" : "#FF0055"} />
            </mesh>
          </group>
        );
      })}

      {/* Cyber Gradient Moon / Finish Line Disc */}
      <mesh position={[0, 14, -6]}>
        <circleGeometry args={[5.5, 32]} />
        <meshBasicMaterial color="#00F0FF" transparent opacity={0.25} />
      </mesh>
      <mesh position={[0, 14, -5.8]}>
        <circleGeometry args={[4.2, 32]} />
        <meshBasicMaterial color="#8B5CF6" transparent opacity={0.35} />
      </mesh>
      <mesh position={[0, 14, -5.6]}>
        <circleGeometry args={[2.5, 32]} />
        <meshBasicMaterial color="#FF0055" transparent opacity={0.55} />
      </mesh>
    </group>
  );
}

export function CinematicScene({
  phase,
  progress,
  roadLit,
  mousePos,
  nitroActive = false,
}: CinematicSceneProps) {
  return (
    <div className="absolute inset-0 w-full h-full pointer-events-none">
      <Canvas
        shadows
        camera={{ position: [0, 4, 8], fov: 50, near: 0.1, far: 100 }}
        gl={{ antialias: true, alpha: true, powerPreference: "high-performance" }}
        dpr={[1, 2]}
      >
        {/* Atmospheric Racing Fog */}
        <fog attach="fog" args={["#030611", 5, 36]} />

        {/* Ambient & Track Key Lights */}
        <ambientLight intensity={phase === "darkness" ? 0.05 : 0.4} />
        <directionalLight
          position={[5, 12, 6]}
          intensity={phase === "darkness" ? 0.1 : 1.3}
          color="#00F0FF"
          castShadow
          shadow-mapSize-width={1024}
          shadow-mapSize-height={1024}
        />
        <pointLight
          position={[0, 3, -1]}
          color="#00F0FF"
          intensity={roadLit ? (nitroActive ? 3.0 : 2.0) : 0.2}
          distance={8}
        />
        <pointLight
          position={[0, 1.5, 2]}
          color="#FF0055"
          intensity={roadLit ? (nitroActive ? 2.5 : 1.5) : 0.1}
          distance={6}
        />

        {/* Scene Components */}
        <CameraRig
          phase={phase}
          progress={progress}
          mousePos={mousePos}
          nitroActive={nitroActive}
        />
        <Character phase={phase} progress={progress} nitroActive={nitroActive} />
        <Road phase={phase} roadLit={roadLit} nitroActive={nitroActive} />
        <ParticleField count={nitroActive ? 500 : 320} mousePos={mousePos} />
        <DistantCity />
      </Canvas>
    </div>
  );
}
