"use client";

import React, { useState, useEffect } from "react";
import dynamic from "next/dynamic";
import { PERSONAL_INFO } from "@/lib/constants";
import { useMouseParallax } from "@/hooks/useMouseParallax";
import { useReducedMotion } from "@/hooks/useReducedMotion";
import { MagneticButton } from "@/components/ui/MagneticButton";
import {
  ArrowDown,
  Sparkles,
  FileDown,
  Code2,
  ChevronRight,
  RotateCcw,
  Zap,
  Gauge,
  Flame,
  Activity,
  Trophy,
} from "lucide-react";

// Dynamic import of 3D canvas for zero SSR issues and optimal bundle load
const CinematicScene = dynamic(
  () => import("./CinematicScene").then((mod) => mod.CinematicScene),
  {
    ssr: false,
    loading: () => (
      <div className="absolute inset-0 bg-[#030611] flex items-center justify-center">
        <div className="flex flex-col items-center gap-3">
          <div className="w-12 h-12 rounded-full border-2 border-cyan-500/20 border-t-cyan-400 animate-spin" />
          <span className="text-xs font-mono text-cyan-300 tracking-wider">
            STARTING CYBER RACING ENGINE...
          </span>
        </div>
      </div>
    ),
  }
);

export function Hero() {
  const [phase, setPhase] = useState<"darkness" | "falling" | "landing" | "standing" | "walking">("darkness");
  const [progress, setProgress] = useState(0);
  const [roadLit, setRoadLit] = useState(false);
  const [showContent, setShowContent] = useState(false);
  const [activeRoleIndex, setActiveRoleIndex] = useState(0);
  const [displayedRoleText, setDisplayedRoleText] = useState("");
  const [isTyping, setIsTyping] = useState(true);
  const [nitroActive, setNitroActive] = useState(false);
  const [speedVal, setSpeedVal] = useState(320);

  const mousePos = useMouseParallax(0.06);
  const prefersReducedMotion = useReducedMotion();

  // Master Cinematic Opening Sequence: Sky-Dive -> Hero Drift Landing -> Sprint
  useEffect(() => {
    if (prefersReducedMotion) {
      setPhase("walking");
      setRoadLit(true);
      setShowContent(true);
      return;
    }

    // Step 1: Darkness & sky drop initiation (400ms)
    const t0 = setTimeout(() => {
      setPhase("falling");
      setProgress(0.35);
    }, 400);

    // Step 2: Sky-dive aerodynamic descent (900ms)
    const t1 = setTimeout(() => {
      setProgress(0.85);
    }, 900);

    // Step 3: High-impact hero drift landing & shockwave (1350ms)
    const t2 = setTimeout(() => {
      setPhase("landing");
      setRoadLit(true);
      setProgress(1.0);
    }, 1350);

    // Step 4: Stand Up (1850ms)
    const t3 = setTimeout(() => {
      setPhase("standing");
    }, 1850);

    // Step 5: Begin forward racing sprint & reveal HUD (2400ms)
    const t4 = setTimeout(() => {
      setPhase("walking");
      setShowContent(true);
    }, 2400);

    return () => {
      clearTimeout(t0);
      clearTimeout(t1);
      clearTimeout(t2);
      clearTimeout(t3);
      clearTimeout(t4);
    };
  }, [prefersReducedMotion]);

  // Rotating roles typing effect
  useEffect(() => {
    if (!showContent) return;

    const currentRole = PERSONAL_INFO.titles[activeRoleIndex];
    let timeout: NodeJS.Timeout;

    if (isTyping) {
      if (displayedRoleText.length < currentRole.length) {
        timeout = setTimeout(() => {
          setDisplayedRoleText(currentRole.slice(0, displayedRoleText.length + 1));
        }, 50);
      } else {
        timeout = setTimeout(() => {
          setIsTyping(false);
        }, 2200);
      }
    } else {
      if (displayedRoleText.length > 0) {
        timeout = setTimeout(() => {
          setDisplayedRoleText(displayedRoleText.slice(0, -1));
        }, 30);
      } else {
        setIsTyping(true);
        setActiveRoleIndex((prev) => (prev + 1) % PERSONAL_INFO.titles.length);
      }
    }

    return () => clearTimeout(timeout);
  }, [displayedRoleText, isTyping, activeRoleIndex, showContent]);

  // Nitro Boost Toggle Action
  const triggerNitro = () => {
    setNitroActive(true);
    setSpeedVal(480);
    setTimeout(() => {
      setNitroActive(false);
      setSpeedVal(320);
    }, 4500);
  };

  const replaySequence = () => {
    setPhase("darkness");
    setRoadLit(false);
    setShowContent(false);
    setProgress(0);

    setTimeout(() => {
      setPhase("falling");
      setProgress(0.4);
    }, 200);
    setTimeout(() => {
      setPhase("landing");
      setRoadLit(true);
      setProgress(1.0);
    }, 900);
    setTimeout(() => {
      setPhase("standing");
    }, 1400);
    setTimeout(() => {
      setPhase("walking");
      setShowContent(true);
    }, 1900);
  };

  return (
    <section
      id="hero"
      className="relative w-full min-h-screen flex items-center justify-center overflow-hidden bg-[#030611]"
    >
      {/* 3D Cinematic Racing Scene Layer */}
      <CinematicScene
        phase={phase}
        progress={progress}
        roadLit={roadLit}
        mousePos={mousePos}
        nitroActive={nitroActive}
      />

      {/* Speed Streak Overlays */}
      <div className="absolute inset-0 pointer-events-none z-10 bg-radial-gradient from-transparent via-[#030611]/30 to-[#030611]" />
      {nitroActive && (
        <div className="absolute inset-0 pointer-events-none z-15 bg-cyan-500/10 mix-blend-screen animate-pulse" />
      )}

      {/* Cyber Racing Top Telemetry HUD Bar */}
      <div className="absolute top-20 sm:top-24 inset-x-4 sm:inset-x-8 max-w-7xl mx-auto z-20 flex items-center justify-between pointer-events-none text-xs font-mono">
        {/* Left Telemetry */}
        <div className="hidden md:flex items-center gap-3 bg-[#080D1E]/80 backdrop-blur-xl px-3.5 py-1.5 rounded-xl border border-cyan-500/30 text-cyan-300">
          <Gauge className="w-4 h-4 text-cyan-400 animate-spin" />
          <span>VELOCITY: <strong className="text-white">{speedVal} KM/H</strong></span>
          <span className="text-slate-500">|</span>
          <span>GEAR: <strong className="text-amber-400">06</strong></span>
        </div>

        {/* Right Telemetry */}
        <div className="hidden md:flex items-center gap-3 bg-[#080D1E]/80 backdrop-blur-xl px-3.5 py-1.5 rounded-xl border border-rose-500/30 text-rose-300">
          <Flame className="w-4 h-4 text-rose-400 animate-pulse" />
          <span>NITRO: <strong className={nitroActive ? "text-cyan-300 animate-ping" : "text-emerald-400"}>{nitroActive ? "ACTIVE (OVERDRIVE)" : "100% READY"}</strong></span>
        </div>
      </div>

      {/* Hero Content HUD Overlay */}
      <div
        className={`relative z-20 max-w-5xl mx-auto px-6 sm:px-10 text-center flex flex-col items-center transition-all duration-1000 ${
          showContent
            ? "opacity-100 translate-y-0"
            : "opacity-0 translate-y-8 pointer-events-none"
        }`}
      >
        {/* Racing Team & Role Badge */}
        <div className="inline-flex items-center gap-2.5 px-4 py-1.5 rounded-full bg-[#080D1E]/90 border border-cyan-500/40 backdrop-blur-xl mb-6 shadow-[0_0_30px_rgba(0,240,255,0.3)]">
          <span className="flex h-2 w-2 relative">
            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-cyan-400 opacity-75" />
            <span className="relative inline-flex rounded-full h-2 w-2 bg-cyan-400" />
          </span>
          <span className="text-xs font-mono font-bold tracking-widest text-cyan-300 uppercase">
            TEAM OWLSURE // CAR #01 // SOFTWARE ENGINEER
          </span>
        </div>

        {/* Main Hero Heading */}
        <h1 className="text-4xl sm:text-6xl md:text-7xl lg:text-8xl font-black italic tracking-tighter text-white mb-3 leading-[1.05] uppercase">
          Hi, I&apos;m{" "}
          <span className="bg-gradient-to-r from-cyan-300 via-white to-indigo-300 bg-clip-text text-transparent drop-shadow-[0_0_40px_rgba(0,240,255,0.5)]">
            {PERSONAL_INFO.name}
          </span>
        </h1>

        {/* Dynamic Rotating Roles with Typing Animation */}
        <div className="h-10 sm:h-12 flex items-center justify-center mb-5">
          <div className="inline-flex items-center gap-2 text-xl sm:text-2xl md:text-3xl font-bold font-mono text-cyan-400">
            <Code2 className="w-5 h-5 text-indigo-400 animate-pulse" />
            <span>{displayedRoleText}</span>
            <span className="w-2.5 h-6 bg-cyan-400 animate-pulse inline-block" />
          </div>
        </div>

        {/* Hero Statement */}
        <p className="max-w-2xl text-base sm:text-lg md:text-xl text-slate-300 mb-8 leading-relaxed font-normal">
          {PERSONAL_INFO.tagline}
        </p>

        {/* Racing Interactive Action Buttons */}
        <div className="flex flex-wrap items-center justify-center gap-3.5 sm:gap-4 w-full max-w-2xl">
          <button
            onClick={triggerNitro}
            className={`px-6 py-3.5 rounded-xl font-mono font-bold text-xs uppercase tracking-wider flex items-center gap-2 transition-all cursor-pointer shadow-[0_0_30px_rgba(255,0,85,0.4)] btn-racing-sweep ${
              nitroActive
                ? "bg-rose-500 text-white border-2 border-rose-300 scale-105"
                : "bg-gradient-to-r from-rose-600 via-pink-600 to-indigo-600 text-white border border-rose-400/40 hover:scale-105"
            }`}
          >
            <Flame className="w-4 h-4 text-amber-300 animate-bounce" />
            <span>{nitroActive ? "NITRO BOOSTING!" : "FIRE NITRO BOOST"}</span>
          </button>

          <MagneticButton
            variant="cyan"
            size="lg"
            href="#projects"
            icon={<Sparkles className="w-4 h-4 text-white" />}
          >
            Explore Projects
          </MagneticButton>

          <MagneticButton
            variant="secondary"
            size="lg"
            href="#about"
            icon={<ChevronRight className="w-4 h-4 text-cyan-400" />}
          >
            About Me
          </MagneticButton>

          <MagneticButton
            variant="outline"
            size="lg"
            href={PERSONAL_INFO.resumePath}
            download="Deepak_N_Resume.pdf"
            icon={<FileDown className="w-4 h-4 text-cyan-300" />}
          >
            Resume
          </MagneticButton>
        </div>

        {/* Quick Controls */}
        <div className="mt-8 flex items-center gap-4 text-xs font-mono text-slate-400">
          <button
            onClick={replaySequence}
            className="flex items-center gap-1.5 px-3.5 py-1.5 rounded-full bg-white/[0.04] hover:bg-white/[0.08] border border-white/10 hover:text-cyan-300 transition-colors cursor-pointer"
            title="Replay sky-dive arrival jump"
          >
            <RotateCcw className="w-3.5 h-3.5" />
            <span>Replay Sky-Dive Jump</span>
          </button>
        </div>
      </div>

      {/* Scroll Down Indicator */}
      <div
        className={`absolute bottom-8 left-1/2 -translate-x-1/2 z-20 flex flex-col items-center gap-2 transition-opacity duration-700 ${
          showContent ? "opacity-100" : "opacity-0"
        }`}
      >
        <span className="text-[10px] font-mono tracking-widest text-cyan-300 uppercase">
          Accelerate Down Track
        </span>
        <a
          href="#about"
          className="p-2.5 rounded-full bg-[#080D1E]/80 border border-cyan-500/40 text-cyan-300 hover:scale-110 shadow-[0_0_20px_rgba(0,240,255,0.4)] transition-all animate-bounce"
          aria-label="Scroll to About section"
        >
          <ArrowDown className="w-4 h-4" />
        </a>
      </div>
    </section>
  );
}
