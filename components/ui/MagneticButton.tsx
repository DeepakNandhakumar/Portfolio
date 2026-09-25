"use client";

import React, { useRef, useState } from "react";
import { cn } from "@/lib/utils";
import { useReducedMotion } from "@/hooks/useReducedMotion";

interface MagneticButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  children: React.ReactNode;
  variant?: "primary" | "secondary" | "outline" | "ghost" | "cyan";
  size?: "sm" | "md" | "lg";
  href?: string;
  download?: boolean | string;
  icon?: React.ReactNode;
  className?: string;
}

export function MagneticButton({
  children,
  variant = "primary",
  size = "md",
  href,
  download,
  icon,
  className,
  onClick,
  ...props
}: MagneticButtonProps) {
  const buttonRef = useRef<HTMLAnchorElement & HTMLButtonElement>(null);
  const [position, setPosition] = useState({ x: 0, y: 0 });
  const prefersReducedMotion = useReducedMotion();

  const handleMouseMove = (e: React.MouseEvent) => {
    if (prefersReducedMotion || !buttonRef.current) return;
    const { clientX, clientY } = e;
    const { left, top, width, height } = buttonRef.current.getBoundingClientRect();
    const x = (clientX - (left + width / 2)) * 0.25;
    const y = (clientY - (top + height / 2)) * 0.25;
    setPosition({ x, y });
  };

  const handleMouseLeave = () => {
    setPosition({ x: 0, y: 0 });
  };

  const sizeStyles = {
    sm: "px-4 py-2 text-xs font-medium gap-1.5",
    md: "px-6 py-3 text-sm font-semibold gap-2",
    lg: "px-8 py-4 text-base font-semibold gap-2.5",
  };

  const variantStyles = {
    primary:
      "bg-gradient-to-r from-indigo-600 via-indigo-500 to-purple-600 text-white shadow-[0_0_25px_rgba(79,70,229,0.35)] hover:shadow-[0_0_35px_rgba(79,70,229,0.6)] border border-indigo-400/30",
    secondary:
      "bg-white/[0.07] hover:bg-white/[0.12] text-white border border-white/[0.15] backdrop-blur-md hover:border-white/30",
    cyan:
      "bg-gradient-to-r from-cyan-600 to-blue-600 text-white shadow-[0_0_25px_rgba(6,182,212,0.35)] hover:shadow-[0_0_35px_rgba(6,182,212,0.6)] border border-cyan-400/30",
    outline:
      "bg-transparent text-white border border-indigo-500/40 hover:bg-indigo-500/10 hover:border-indigo-400",
    ghost:
      "bg-transparent text-slate-300 hover:text-white hover:bg-white/[0.05]",
  };

  const sharedClasses = cn(
    "relative inline-flex items-center justify-center rounded-xl cursor-pointer transition-all duration-200 select-none btn-sweep group focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2 focus:ring-offset-[#050816]",
    sizeStyles[size],
    variantStyles[variant],
    className
  );

  const motionStyle = prefersReducedMotion
    ? {}
    : {
        transform: `translate3d(${position.x}px, ${position.y}px, 0)`,
        transition: position.x === 0 ? "transform 0.4s cubic-bezier(0.2, 0.9, 0.3, 1)" : "none",
      };

  if (href) {
    return (
      <a
        ref={buttonRef as React.RefObject<HTMLAnchorElement>}
        href={href}
        download={download}
        className={sharedClasses}
        style={motionStyle}
        onMouseMove={handleMouseMove}
        onMouseLeave={handleMouseLeave}
      >
        {icon && <span className="transition-transform group-hover:scale-110">{icon}</span>}
        <span>{children}</span>
      </a>
    );
  }

  return (
    <button
      ref={buttonRef as React.RefObject<HTMLButtonElement>}
      className={sharedClasses}
      style={motionStyle}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      onClick={onClick}
      {...props}
    >
      {icon && <span className="transition-transform group-hover:scale-110">{icon}</span>}
      <span>{children}</span>
    </button>
  );
}
