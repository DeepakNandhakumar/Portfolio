"use client";

import React, { useRef, useState, useMemo } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import { OrbitControls } from "@react-three/drei";
import * as THREE from "three";

interface HealthNode {
  id: string;
  label: string;
  type: "frontend" | "backend" | "database" | "algorithm" | "feature";
  pos: [number, number, number];
  color: string;
  details: string;
}

const HEALTH_NODES: HealthNode[] = [
  { id: "1", label: "React Health UI", type: "frontend", pos: [-2.2, 1.2, 0.5], color: "#06B6D4", details: "Interactive frontend interface with telemetry graphs & symptom inputs" },
  { id: "2", label: "Spring Boot Microservice", type: "backend", pos: [0, 0, 0], color: "#7C3AED", details: "Core Java REST backend engine orchestrating health evaluations" },
  { id: "3", label: "MySQL Health DB", type: "database", pos: [1.8, -1.2, -0.8], color: "#3B82F6", details: "Relational persistence storing patient telemetry and nutrition datasets" },
  { id: "4", label: "BMI Calculation Engine", type: "algorithm", pos: [-1.4, -1.4, 1.2], color: "#10B981", details: "Biometric engine classifying metabolic indexes and body composition" },
  { id: "5", label: "Automated Symptom Checker", type: "feature", pos: [0.6, 1.8, -0.8], color: "#EC4899", details: "Triage algorithm analyzing symptom flags for early preventive insights" },
  { id: "6", label: "Personalized Diet Planner", type: "algorithm", pos: [2.2, 1.2, 0.6], color: "#F59E0B", details: "Dynamic calorie and macronutrient recommender tailored to health goals" },
];

const HEALTH_EDGES: [number, number][] = [
  [0, 1], // React UI -> Spring Boot Backend
  [1, 2], // Spring Boot -> MySQL DB
  [1, 3], // Spring Boot -> BMI Engine
  [1, 4], // Spring Boot -> Symptom Checker
  [1, 5], // Spring Boot -> Diet Planner
  [3, 5], // BMI Engine -> Diet Planner
  [4, 5], // Symptom Checker -> Diet Planner
  [0, 3], // React UI -> BMI Engine
];

function NodeMesh({
  node,
  isHovered,
  onHover,
}: {
  node: HealthNode;
  isHovered: boolean;
  onHover: (node: HealthNode | null) => void;
}) {
  const meshRef = useRef<THREE.Mesh>(null);

  useFrame((state) => {
    if (!meshRef.current) return;
    const time = state.clock.getElapsedTime();
    const scale = isHovered ? 1.4 : 1.0 + Math.sin(time * 2 + Number(node.id)) * 0.08;
    meshRef.current.scale.set(scale, scale, scale);
  });

  return (
    <group position={node.pos}>
      <mesh
        ref={meshRef}
        onPointerOver={(e) => {
          e.stopPropagation();
          onHover(node);
        }}
        onPointerOut={() => onHover(null)}
      >
        <sphereGeometry args={[node.id === "2" ? 0.35 : 0.22, 24, 24]} />
        <meshStandardMaterial
          color={node.color}
          emissive={node.color}
          emissiveIntensity={isHovered ? 2.5 : 1.2}
          roughness={0.2}
          metalness={0.8}
        />
      </mesh>
      {isHovered && (
        <pointLight color={node.color} intensity={2} distance={3} />
      )}
    </group>
  );
}

function GraphScene({
  onHoverNode,
  hoveredNode,
}: {
  onHoverNode: (node: HealthNode | null) => void;
  hoveredNode: HealthNode | null;
}) {
  const linesRef = useRef<THREE.LineSegments>(null);

  const linePositions = useMemo(() => {
    const coords: number[] = [];
    HEALTH_EDGES.forEach(([srcIdx, dstIdx]) => {
      const src = HEALTH_NODES[srcIdx].pos;
      const dst = HEALTH_NODES[dstIdx].pos;
      coords.push(src[0], src[1], src[2]);
      coords.push(dst[0], dst[1], dst[2]);
    });
    return new Float32Array(coords);
  }, []);

  useFrame((state) => {
    if (!linesRef.current) return;
    const time = state.clock.getElapsedTime();
    linesRef.current.rotation.y = time * 0.05;
  });

  return (
    <group>
      <ambientLight intensity={0.6} />
      <pointLight position={[5, 5, 5]} intensity={1.5} color="#06B6D4" />
      <pointLight position={[-5, -5, -5]} intensity={0.8} color="#7C3AED" />

      {/* Connection Edges */}
      <lineSegments ref={linesRef}>
        <bufferGeometry>
          <bufferAttribute
            attach="attributes-position"
            args={[linePositions, 3]}
          />
        </bufferGeometry>
        <lineBasicMaterial
          color="#06B6D4"
          transparent
          opacity={0.6}
          linewidth={1.5}
        />
      </lineSegments>

      {/* Nodes */}
      {HEALTH_NODES.map((node) => (
        <NodeMesh
          key={node.id}
          node={node}
          isHovered={hoveredNode?.id === node.id}
          onHover={onHoverNode}
        />
      ))}

      <OrbitControls
        enableZoom={true}
        enablePan={false}
        autoRotate={!hoveredNode}
        autoRotateSpeed={0.8}
        maxDistance={7}
        minDistance={2.5}
      />
    </group>
  );
}

export function WellspringKnowledgeGraph() {
  const [hoveredNode, setHoveredNode] = useState<HealthNode | null>(null);

  return (
    <div className="relative w-full h-[380px] sm:h-[440px] rounded-2xl bg-[#060913]/90 border border-white/[0.08] overflow-hidden">
      <Canvas
        camera={{ position: [0, 1.5, 4.5], fov: 50 }}
        gl={{ antialias: true, alpha: true }}
      >
        <GraphScene onHoverNode={setHoveredNode} hoveredNode={hoveredNode} />
      </Canvas>

      {/* HUD Header */}
      <div className="absolute top-3 left-3 z-10 flex items-center gap-2 px-3 py-1.5 rounded-xl bg-[#0B1120]/80 backdrop-blur-md border border-white/10 text-[11px] font-mono text-cyan-300">
        <span className="w-2 h-2 rounded-full bg-cyan-400 animate-pulse" />
        <span>WELLSPRING 3D ARCHITECTURE (INTERACTIVE)</span>
      </div>

      <div className="absolute top-3 right-3 z-10 text-[10px] font-mono text-slate-400 hidden sm:block bg-[#0B1120]/70 px-2.5 py-1 rounded-lg border border-white/[0.06]">
        Rotate / Drag / Hover
      </div>

      {/* Node Inspector */}
      <div className="absolute bottom-3 inset-x-3 z-10">
        <div className="p-3.5 rounded-xl bg-[#0B1120]/90 backdrop-blur-xl border border-cyan-500/30 text-xs font-mono shadow-[0_4px_20px_rgba(0,0,0,0.6)]">
          {hoveredNode ? (
            <div className="space-y-1">
              <div className="flex items-center justify-between">
                <span className="font-bold text-white text-sm flex items-center gap-2">
                  <span
                    className="w-2 h-2 rounded-full"
                    style={{ backgroundColor: hoveredNode.color }}
                  />
                  {hoveredNode.label}
                </span>
                <span className="text-[10px] uppercase text-cyan-300 px-2 py-0.5 rounded bg-cyan-500/10 border border-cyan-400/20">
                  {hoveredNode.type}
                </span>
              </div>
              <p className="text-slate-300 font-sans text-xs">{hoveredNode.details}</p>
            </div>
          ) : (
            <div className="text-slate-400 text-center text-[11px]">
              Hover or click any node (React UI, Spring Boot, MySQL, BMI Engine, Diet Planner) to inspect architectural links
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
