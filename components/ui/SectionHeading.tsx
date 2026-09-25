"use client";

import React from "react";
import { cn } from "@/lib/utils";

interface SectionHeadingProps {
  landmark?: string;
  badge?: string;
  title: string;
  subtitle?: string;
  align?: "left" | "center";
  className?: string;
  accentGradient?: "indigo-purple" | "cyan-blue" | "purple-pink" | "amber-orange";
}

export function SectionHeading({
  landmark,
  badge,
  title,
  subtitle,
  align = "center",
  className,
  accentGradient = "indigo-purple",
}: SectionHeadingProps) {
  const gradientStyles = {
    "indigo-purple": "from-indigo-400 via-purple-300 to-cyan-400",
    "cyan-blue": "from-cyan-400 via-blue-300 to-indigo-400",
    "purple-pink": "from-purple-400 via-pink-400 to-indigo-400",
    "amber-orange": "from-amber-400 via-orange-400 to-yellow-300",
  };

  const isCenter = align === "center";

  return (
    <div
      className={cn(
        "relative mb-14 md:mb-20 space-y-3",
        isCenter ? "text-center mx-auto max-w-3xl items-center flex flex-col" : "text-left max-w-2xl",
        className
      )}
    >
      {/* Landmark or Badge */}
      {(landmark || badge) && (
        <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-white/[0.04] border border-white/[0.1] text-xs font-mono tracking-widest text-indigo-300 backdrop-blur-md">
          <span className="w-1.5 h-1.5 rounded-full bg-indigo-400 animate-ping" />
          <span>{landmark || badge}</span>
        </div>
      )}

      {/* Main Title */}
      <h2 className="text-3xl sm:text-4xl md:text-5xl font-extrabold tracking-tight text-white leading-tight">
        <span
          className={cn(
            "bg-gradient-to-r bg-clip-text text-transparent",
            gradientStyles[accentGradient]
          )}
        >
          {title}
        </span>
      </h2>

      {/* Animated Accent Line */}
      <div
        className={cn(
          "h-0.5 w-24 bg-gradient-to-r from-transparent via-indigo-500 to-transparent my-2 rounded-full",
          isCenter ? "mx-auto" : ""
        )}
      />

      {/* Subtitle */}
      {subtitle && (
        <p className="text-sm sm:text-base md:text-lg text-slate-300 leading-relaxed font-normal">
          {subtitle}
        </p>
      )}
    </div>
  );
}
