"use client";

import React from "react";
import { cn } from "@/lib/utils";

interface GlassCardProps extends React.HTMLAttributes<HTMLDivElement> {
  children: React.ReactNode;
  className?: string;
  glowColor?: "indigo" | "purple" | "cyan" | "pink" | "amber" | "emerald" | "none";
  interactive?: boolean;
  padding?: "sm" | "md" | "lg" | "none";
}

export function GlassCard({
  children,
  className,
  glowColor = "none",
  interactive = false,
  padding = "md",
  ...props
}: GlassCardProps) {
  const paddingStyles = {
    none: "",
    sm: "p-4",
    md: "p-6",
    lg: "p-8",
  };

  const glowStyles = {
    none: "",
    indigo: "hover:border-indigo-500/40 hover:shadow-[0_0_30px_rgba(79,70,229,0.18)]",
    purple: "hover:border-purple-500/40 hover:shadow-[0_0_30px_rgba(124,58,237,0.18)]",
    cyan: "hover:border-cyan-500/40 hover:shadow-[0_0_30px_rgba(6,182,212,0.18)]",
    pink: "hover:border-pink-500/40 hover:shadow-[0_0_30px_rgba(236,72,153,0.18)]",
    amber: "hover:border-amber-500/40 hover:shadow-[0_0_30px_rgba(245,158,11,0.18)]",
    emerald: "hover:border-emerald-500/40 hover:shadow-[0_0_30px_rgba(16,185,129,0.18)]",
  };

  return (
    <div
      className={cn(
        "relative rounded-2xl bg-[#0B1120]/75 backdrop-blur-xl border border-white/[0.08] transition-all duration-300",
        interactive && "hover:-translate-y-1 cursor-pointer",
        paddingStyles[padding],
        glowStyles[glowColor],
        className
      )}
      {...props}
    >
      {/* Subtle top specular gradient highlight */}
      <div className="absolute inset-x-0 top-0 h-[1px] bg-gradient-to-r from-transparent via-white/15 to-transparent pointer-events-none rounded-t-2xl" />
      {children}
    </div>
  );
}
