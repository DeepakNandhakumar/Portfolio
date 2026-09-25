import React, { useRef, useState, useMemo } from 'react';
import { useFrame } from '@react-three/fiber';
import { Text } from '@react-three/drei';
import * as THREE from 'three';
import {
  KAIRIX_KNOWLEDGE_GRAPH_NODES,
  KAIRIX_KNOWLEDGE_GRAPH_EDGES,
  type KnowledgeGraphNode,
} from '@/data/projects';

interface KnowledgeGraphProps {
  onSelectNode?: (node: KnowledgeGraphNode | null) => void;
  selectedNodeId?: string | null;
}

const GraphNodeMesh: React.FC<{
  node: KnowledgeGraphNode;
  isSelected: boolean;
  isHovered: boolean;
  onHover: (id: string | null) => void;
  onSelect: (node: KnowledgeGraphNode) => void;
}> = ({ node, isSelected, isHovered, onHover, onSelect }) => {
  const meshRef = useRef<THREE.Mesh>(null);

  useFrame((state) => {
    if (!meshRef.current) return;
    const time = state.clock.getElapsedTime();

    // Subtle breathing/floating
    meshRef.current.position.y = node.position[1] + Math.sin(time * 1.5 + node.position[0]) * 0.05;

    // Hover / selected scale
    const targetScale = isSelected ? 1.35 : isHovered ? 1.2 : 1.0;
    meshRef.current.scale.lerp(new THREE.Vector3(targetScale, targetScale, targetScale), 0.15);
  });

  return (
    <group position={[node.position[0], node.position[1], node.position[2]]}>
      {/* 3D Sphere Node */}
      <mesh
        ref={meshRef}
        onClick={(e) => {
          e.stopPropagation();
          onSelect(node);
        }}
        onPointerOver={(e) => {
          e.stopPropagation();
          onHover(node.id);
        }}
        onPointerOut={() => onHover(null)}
        castShadow
      >
        <sphereGeometry args={[node.size || 0.35, 32, 32]} />
        <meshStandardMaterial
          color={node.color}
          roughness={0.2}
          metalness={0.15}
          emissive={node.color}
          emissiveIntensity={isSelected ? 0.6 : isHovered ? 0.4 : 0.1}
        />
      </mesh>

      {/* Orbiting Halo Ring for Selected/Hovered Node */}
      {(isSelected || isHovered) && (
        <mesh rotation={[Math.PI / 2, 0, 0]}>
          <ringGeometry args={[(node.size || 0.35) * 1.3, (node.size || 0.35) * 1.45, 32]} />
          <meshBasicMaterial color={node.color} transparent opacity={0.8} side={THREE.DoubleSide} />
        </mesh>
      )}

      {/* Node Name Label */}
      <Text
        position={[0, (node.size || 0.35) + 0.28, 0]}
        fontSize={0.16}
        color="#0F172A"
        anchorX="center"
        anchorY="bottom"
        outlineWidth={0.02}
        outlineColor="#FFFFFF"
        font="https://fonts.gstatic.com/s/inter/v13/UcCO3FwrK3iLTeHuS_fvQtMwCp50KnMw2boKoduKmMEVuLyfAZ9hjp-Ek-_EeA.woff"
      >
        {node.name}
      </Text>

      {/* Node Type Subtitle */}
      <Text
        position={[0, (node.size || 0.35) + 0.1, 0]}
        fontSize={0.11}
        color="#64748B"
        anchorX="center"
        anchorY="bottom"
        outlineWidth={0.015}
        outlineColor="#FFFFFF"
        font="https://fonts.gstatic.com/s/inter/v13/UcCO3FwrK3iLTeHuS_fvQtMwCp50KnMw2boKoduKmMEVuLyfAZ9hjp-Ek-_EeA.woff"
      >
        {`[ ${node.type} ]`}
      </Text>
    </group>
  );
};

const GraphEdgeLine: React.FC<{
  start: [number, number, number];
  end: [number, number, number];
  isHighlighted: boolean;
  color?: string;
}> = ({ start, end, isHighlighted, color = '#CBD5E1' }) => {
  const points = useMemo(() => {
    return [new THREE.Vector3(...start), new THREE.Vector3(...end)];
  }, [start, end]);

  const lineGeometry = useMemo(() => {
    return new THREE.BufferGeometry().setFromPoints(points);
  }, [points]);

  return (
    <primitive object={new THREE.Line(
      lineGeometry,
      new THREE.LineBasicMaterial({
        color: isHighlighted ? '#4F46E5' : color,
        linewidth: isHighlighted ? 3 : 1,
        transparent: true,
        opacity: isHighlighted ? 0.9 : 0.45,
      })
    )} />
  );
};

export const KnowledgeGraphScene: React.FC<KnowledgeGraphProps> = ({
  onSelectNode,
  selectedNodeId,
}) => {
  const [hoveredNodeId, setHoveredNodeId] = useState<string | null>(null);

  const nodeMap = useMemo(() => {
    const map = new Map<string, KnowledgeGraphNode>();
    KAIRIX_KNOWLEDGE_GRAPH_NODES.forEach((n) => map.set(n.id, n));
    return map;
  }, []);

  return (
    <group position={[0, 0, 0]}>
      {/* Lighting for Knowledge Graph */}
      <ambientLight intensity={1.0} />
      <directionalLight position={[5, 10, 5]} intensity={1.2} />
      <pointLight position={[0, 0, 4]} intensity={0.8} color="#C7D2FE" />

      {/* Render Edges */}
      {KAIRIX_KNOWLEDGE_GRAPH_EDGES.map((edge, idx) => {
        const sourceNode = nodeMap.get(edge.source);
        const targetNode = nodeMap.get(edge.target);
        if (!sourceNode || !targetNode) return null;

        const isHighlighted =
          hoveredNodeId === edge.source ||
          hoveredNodeId === edge.target ||
          selectedNodeId === edge.source ||
          selectedNodeId === edge.target;

        return (
          <GraphEdgeLine
            key={idx}
            start={sourceNode.position}
            end={targetNode.position}
            isHighlighted={isHighlighted}
          />
        );
      })}

      {/* Render Nodes */}
      {KAIRIX_KNOWLEDGE_GRAPH_NODES.map((node) => (
        <GraphNodeMesh
          key={node.id}
          node={node}
          isSelected={selectedNodeId === node.id}
          isHovered={hoveredNodeId === node.id}
          onHover={setHoveredNodeId}
          onSelect={(n) => onSelectNode?.(n)}
        />
      ))}
    </group>
  );
};
