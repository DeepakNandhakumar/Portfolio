"use client";

import React, { useRef, useState } from "react";
import { cn } from "@/lib/utils";
import { useReducedMotion } from "@/hooks/useReducedMotion";

interface TiltCardProps extends React.HTMLAttributes<HTMLDivElement> {
  children: React.ReactNode;
  className?: string;
  maxTilt?: number;
  perspective?: number;
  glowColor?: string;
}

export function TiltCard({
  children,
  className,
  maxTilt = 8,
  perspective = 1000,
  glowColor = "rgba(79, 70, 229, 0.2)",
  ...props
}: TiltCardProps) {
  const cardRef = useRef<HTMLDivElement>(null);
  const [rotate, setRotate] = useState({ x: 0, y: 0 });
  const [glarePosition, setGlarePosition] = useState({ x: 50, y: 50 });
  const [isHovered, setIsHovered] = useState(false);
  const prefersReducedMotion = useReducedMotion();

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (prefersReducedMotion || !cardRef.current) return;
    const { left, top, width, height } = cardRef.current.getBoundingClientRect();
    const clientX = e.clientX - left;
    const clientY = e.clientY - top;

    // Calculate rotation (-maxTilt to +maxTilt)
    const rotX = -((clientY / height) * 2 - 1) * maxTilt;
    const rotY = ((clientX / width) * 2 - 1) * maxTilt;

    setRotate({ x: rotX, y: rotY });
    setGlarePosition({
      x: (clientX / width) * 100,
      y: (clientY / height) * 100,
    });
  };

  const handleMouseEnter = () => {
    setIsHovered(true);
  };

  const handleMouseLeave = () => {
    setIsHovered(false);
    setRotate({ x: 0, y: 0 });
  };

  const transformStyle = prefersReducedMotion
    ? {}
    : {
        transform: isHovered
          ? `perspective(${perspective}px) rotateX(${rotate.x}deg) rotateY(${rotate.y}deg) scale3d(1.015, 1.015, 1.015)`
          : `perspective(${perspective}px) rotateX(0deg) rotateY(0deg) scale3d(1, 1, 1)`,
        transition: isHovered ? "transform 0.1s ease-out" : "transform 0.5s cubic-bezier(0.2, 0.9, 0.3, 1)",
      };

  return (
    <div
      ref={cardRef}
      className={cn("relative transition-shadow duration-500 will-change-transform", className)}
      style={transformStyle}
      onMouseMove={handleMouseMove}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
      {...props}
    >
      {/* Dynamic Glare / Specular highlight */}
      {isHovered && !prefersReducedMotion && (
        <div
          className="absolute inset-0 rounded-2xl pointer-events-none z-20 transition-opacity duration-300"
          style={{
            background: `radial-gradient(circle at ${glarePosition.x}% ${glarePosition.y}%, ${glowColor} 0%, transparent 65%)`,
            mixBlendMode: "screen",
          }}
        />
      )}
      {children}
    </div>
  );
}
