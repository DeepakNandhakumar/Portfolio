"use client";

import React, { useEffect, useState } from "react";
import { useReducedMotion } from "@/hooks/useReducedMotion";
import { useMediaQuery } from "@/hooks/useMediaQuery";

export function CustomCursor() {
  const [position, setPosition] = useState({ x: -100, y: -100 });
  const [trailingPos, setTrailingPos] = useState({ x: -100, y: -100 });
  const [isHovering, setIsHovering] = useState(false);
  const [isVisible, setIsVisible] = useState(false);
  const prefersReducedMotion = useReducedMotion();
  const isTouchDevice = useMediaQuery("(pointer: coarse)");

  useEffect(() => {
    if (prefersReducedMotion || isTouchDevice) return;

    let targetX = -100;
    let targetY = -100;
    let currentX = -100;
    let currentY = -100;
    let animationFrameId: number;

    const onMouseMove = (e: MouseEvent) => {
      targetX = e.clientX;
      targetY = e.clientY;
      setPosition({ x: e.clientX, y: e.clientY });
      if (!isVisible) setIsVisible(true);
    };

    const onMouseEnter = () => setIsVisible(true);
    const onMouseLeave = () => setIsVisible(false);

    // Track interactive elements
    const handleMouseOver = (e: MouseEvent) => {
      const target = e.target as HTMLElement;
      if (
        target.closest("button") ||
        target.closest("a") ||
        target.closest("[role='button']") ||
        target.closest(".interactive")
      ) {
        setIsHovering(true);
      } else {
        setIsHovering(false);
      }
    };

    const updateSmooth = () => {
      currentX += (targetX - currentX) * 0.18;
      currentY += (targetY - currentY) * 0.18;
      setTrailingPos({ x: currentX, y: currentY });
      animationFrameId = requestAnimationFrame(updateSmooth);
    };

    window.addEventListener("mousemove", onMouseMove, { passive: true });
    window.addEventListener("mouseover", handleMouseOver, { passive: true });
    document.addEventListener("mouseenter", onMouseEnter);
    document.addEventListener("mouseleave", onMouseLeave);
    animationFrameId = requestAnimationFrame(updateSmooth);

    return () => {
      window.removeEventListener("mousemove", onMouseMove);
      window.removeEventListener("mouseover", handleMouseOver);
      document.removeEventListener("mouseenter", onMouseEnter);
      document.removeEventListener("mouseleave", onMouseLeave);
      cancelAnimationFrame(animationFrameId);
    };
  }, [isVisible, prefersReducedMotion, isTouchDevice]);

  if (prefersReducedMotion || isTouchDevice || !isVisible) {
    return null;
  }

  return (
    <>
      {/* Primary pinpoint dot */}
      <div
        className="fixed top-0 left-0 w-2 h-2 rounded-full bg-cyan-400 pointer-events-none z-[9999] -translate-x-1/2 -translate-y-1/2 mix-blend-screen transition-transform duration-75"
        style={{
          transform: `translate3d(${position.x}px, ${position.y}px, 0) scale(${isHovering ? 0.5 : 1})`,
        }}
      />
      {/* Trailing ambient glowing cyber ring */}
      <div
        className="fixed top-0 left-0 rounded-full border border-indigo-400/60 pointer-events-none z-[9998] -translate-x-1/2 -translate-y-1/2 transition-[width,height,border-color,background-color] duration-200"
        style={{
          transform: `translate3d(${trailingPos.x}px, ${trailingPos.y}px, 0)`,
          width: isHovering ? "48px" : "28px",
          height: isHovering ? "48px" : "28px",
          backgroundColor: isHovering ? "rgba(79, 70, 229, 0.15)" : "transparent",
          borderColor: isHovering ? "rgba(6, 182, 212, 0.8)" : "rgba(124, 58, 237, 0.4)",
          boxShadow: isHovering ? "0 0 15px rgba(6, 182, 212, 0.4)" : "none",
        }}
      />
    </>
  );
}
