"use client";

import { useEffect, useState } from "react";

export interface MousePosition {
  x: number; // -1 to 1 normalized
  y: number; // -1 to 1 normalized
  rawX: number;
  rawY: number;
}

export function useMouseParallax(damping = 0.08): MousePosition {
  const [position, setPosition] = useState<MousePosition>({
    x: 0,
    y: 0,
    rawX: 0,
    rawY: 0,
  });

  useEffect(() => {
    let targetX = 0;
    let targetY = 0;
    let currentX = 0;
    let currentY = 0;
    let animationFrameId: number;

    const handleMouseMove = (e: MouseEvent) => {
      // Normalize from -1 to 1 based on window center
      const { innerWidth, innerHeight } = window;
      targetX = (e.clientX / innerWidth) * 2 - 1;
      targetY = (e.clientY / innerHeight) * 2 - 1;
    };

    const updateSmooth = () => {
      currentX += (targetX - currentX) * damping;
      currentY += (targetY - currentY) * damping;

      setPosition({
        x: currentX,
        y: currentY,
        rawX: (currentX + 1) * 0.5 * (typeof window !== "undefined" ? window.innerWidth : 1000),
        rawY: (currentY + 1) * 0.5 * (typeof window !== "undefined" ? window.innerHeight : 800),
      });

      animationFrameId = requestAnimationFrame(updateSmooth);
    };

    window.addEventListener("mousemove", handleMouseMove, { passive: true });
    animationFrameId = requestAnimationFrame(updateSmooth);

    return () => {
      window.removeEventListener("mousemove", handleMouseMove);
      cancelAnimationFrame(animationFrameId);
    };
  }, [damping]);

  return position;
}
