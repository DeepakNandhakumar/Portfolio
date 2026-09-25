"use client";

import React, { useState } from "react";
import dynamic from "next/dynamic";
import { FEATURED_WELLSPRING_PROJECT, OTHER_PROJECTS, ProjectItem } from "@/lib/constants";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { GlassCard } from "@/components/ui/GlassCard";
import { TiltCard } from "@/components/ui/TiltCard";
import { MagneticButton } from "@/components/ui/MagneticButton";
import { WellspringArchitectureFlow } from "./WellspringArchitectureFlow";
import { GithubIcon } from "@/components/ui/BrandIcons";
import {
  ExternalLink,
  Sparkles,
  Layers,
  HeartPulse,
  Activity,
  ArrowUpRight,
  Gamepad2,
  Calculator,
  Compass,
} from "lucide-react";

// Dynamic 3D graph to prevent SSR mismatch
const WellspringKnowledgeGraph = dynamic(
  () => import("./WellspringKnowledgeGraph").then((mod) => mod.WellspringKnowledgeGraph),
  {
    ssr: false,
    loading: () => (
      <div className="w-full h-[380px] rounded-2xl bg-[#060913] flex items-center justify-center border border-white/10">
        <div className="flex flex-col items-center gap-2 text-xs font-mono text-slate-400">
          <div className="w-8 h-8 rounded-full border-2 border-indigo-500/20 border-t-cyan-400 animate-spin" />
          <span>RENDERING 3D HEALTH ARCHITECTURE...</span>
        </div>
      </div>
    ),
  }
);

export function Projects() {
  const [activeTab, setActiveTab] = useState<string>("all");

  const filteredProjects = OTHER_PROJECTS.filter((p) => {
    if (activeTab === "all") return true;
    if (activeTab === "fitness") return p.category === "Health & Fitness" || p.category === "Wellness Analytics";
    if (activeTab === "games") return p.category === "Game Development";
    if (activeTab === "utility") return p.category === "Utility & Automation";
    return true;
  });

  return (
    <section id="projects" className="relative py-24 sm:py-32 px-6 sm:px-10 max-w-7xl mx-auto">
      {/* Section Header */}
      <SectionHeading
        landmark="04 // LANDMARK"
        badge="PROJECT SHOWCASE"
        title="Featured Systems &amp; Engineering Projects"
        subtitle="Full-stack healthcare platforms, 3D simulations in Unreal Engine, responsive wellness tools, and utility calculators."
        accentGradient="cyan-blue"
      />

      {/* ========================================================================= */}
      {/* 1. MAJOR FEATURED SHOWCASE: WELLSPRING (2026) */}
      {/* ========================================================================= */}
      <div className="mb-24">
        <div className="relative rounded-3xl p-6 sm:p-10 bg-gradient-to-b from-[#0B1120] via-[#080D1A] to-[#050816] border border-cyan-500/30 shadow-[0_0_50px_rgba(6,182,212,0.2)] overflow-hidden">
          {/* Subtle Ambient Background Accent Glow */}
          <div className="absolute top-0 right-0 w-96 h-96 bg-cyan-600/15 rounded-full blur-3xl pointer-events-none -z-10" />
          <div className="absolute bottom-0 left-0 w-96 h-96 bg-indigo-600/15 rounded-full blur-3xl pointer-events-none -z-10" />

          {/* Featured Title Bar */}
          <div className="flex flex-wrap items-center justify-between gap-4 mb-8 pb-6 border-b border-white/[0.08]">
            <div className="space-y-1">
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-cyan-500/10 border border-cyan-500/30 text-xs font-mono text-cyan-300">
                <HeartPulse className="w-3.5 h-3.5 text-cyan-400" />
                <span>FLAGSHIP FULL-STACK PLATFORM • 2026</span>
              </div>
              <h3 className="text-3xl sm:text-4xl md:text-5xl font-black tracking-tight text-white flex items-center gap-3">
                <span>{FEATURED_WELLSPRING_PROJECT.title}</span>
                <span className="text-xs sm:text-sm font-mono font-normal px-3 py-1 rounded-lg bg-cyan-500/20 text-cyan-300 border border-cyan-500/40">
                  Full-Stack
                </span>
              </h3>
              <p className="text-base sm:text-lg text-cyan-300 font-medium">
                {FEATURED_WELLSPRING_PROJECT.subtitle}
              </p>
            </div>

            <div className="flex items-center gap-3">
              <MagneticButton
                variant="outline"
                size="sm"
                href={FEATURED_WELLSPRING_PROJECT.githubUrl}
                icon={<GithubIcon className="w-4 h-4" />}
              >
                GitHub Source
              </MagneticButton>
              <MagneticButton
                variant="cyan"
                size="sm"
                href="#contact"
                icon={<ArrowUpRight className="w-4 h-4" />}
              >
                Inquire Project
              </MagneticButton>
            </div>
          </div>

          {/* Main Wellspring Grid: Left Description & Metrics, Right 3D Graph */}
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center mb-10">
            {/* Left Narrative */}
            <div className="lg:col-span-5 space-y-6">
              <p className="text-sm sm:text-base text-slate-300 leading-relaxed font-normal">
                {FEATURED_WELLSPRING_PROJECT.description}
              </p>

              {FEATURED_WELLSPRING_PROJECT.longDescription && (
                <div className="space-y-3 text-xs sm:text-sm text-slate-400 leading-relaxed">
                  {FEATURED_WELLSPRING_PROJECT.longDescription.map((p, idx) => (
                    <p key={idx}>{p}</p>
                  ))}
                </div>
              )}

              {/* Metrics Grid */}
              <div className="grid grid-cols-2 gap-3 pt-2">
                {FEATURED_WELLSPRING_PROJECT.metrics?.map((metric, idx) => (
                  <div
                    key={idx}
                    className="p-3 rounded-xl bg-white/[0.03] border border-white/[0.06]"
                  >
                    <div className="text-[10px] font-mono text-slate-400 mb-0.5">
                      {metric.label}
                    </div>
                    <div className="text-xs font-bold text-cyan-300 font-mono">
                      {metric.value}
                    </div>
                  </div>
                ))}
              </div>

              {/* Tags */}
              <div className="flex flex-wrap gap-1.5 pt-2">
                {FEATURED_WELLSPRING_PROJECT.tags.map((tag, idx) => (
                  <span
                    key={idx}
                    className="px-2.5 py-1 rounded-md bg-cyan-950/60 border border-cyan-500/30 text-[11px] font-mono text-cyan-300"
                  >
                    {tag}
                  </span>
                ))}
              </div>
            </div>

            {/* Right 3D Knowledge Graph WebGL Visualizer */}
            <div className="lg:col-span-7">
              <WellspringKnowledgeGraph />
            </div>
          </div>

          {/* Bottom: Interactive Multi-Stage Architecture Flow */}
          <div className="pt-8 border-t border-white/[0.08]">
            <div className="text-xs font-mono text-cyan-300 uppercase tracking-wider mb-4 flex items-center gap-2">
              <Activity className="w-4 h-4 text-cyan-400" />
              <span>Wellspring Architecture &amp; Telemetry Data Flow</span>
            </div>
            <WellspringArchitectureFlow />
          </div>
        </div>
      </div>

      {/* ========================================================================= */}
      {/* 2. MORE PROJECTS FROM RESUME */}
      {/* ========================================================================= */}
      <div>
        <div className="flex flex-wrap items-center justify-between gap-4 mb-10">
          <div>
            <h3 className="text-2xl sm:text-3xl font-extrabold text-white">
              More Projects &amp; Software Work
            </h3>
            <p className="text-sm text-slate-400">
              Interactive platforms, game development, and mathematical calculators.
            </p>
          </div>

          {/* Filter Tabs */}
          <div className="flex flex-wrap gap-2">
            {[
              { id: "all", label: "All Projects" },
              { id: "fitness", label: "Health & Fitness" },
              { id: "games", label: "Game Dev (Unreal)" },
              { id: "utility", label: "Calculators" },
            ].map((tab) => (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                className={`px-3 py-1 rounded-full text-xs font-mono transition-all border ${
                  activeTab === tab.id
                    ? "bg-cyan-600/30 border-cyan-400 text-white shadow-[0_0_10px_rgba(6,182,212,0.3)] font-bold"
                    : "bg-white/[0.03] border-white/[0.08] text-slate-400 hover:text-white"
                }`}
              >
                {tab.label}
              </button>
            ))}
          </div>
        </div>

        {/* Projects 3D Tilt Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {filteredProjects.map((project) => (
            <TiltCard key={project.id} className="h-full">
              <GlassCard
                glowColor={
                  project.category === "Game Development"
                    ? "purple"
                    : project.category === "Utility & Automation"
                    ? "amber"
                    : "cyan"
                }
                padding="lg"
                className="h-full flex flex-col justify-between"
              >
                <div>
                  {/* Category Header */}
                  <div className="flex items-center justify-between pb-3 mb-4 border-b border-white/[0.08]">
                    <div className="flex items-center gap-2">
                      <span className="text-[11px] font-mono text-cyan-300 uppercase px-2.5 py-0.5 rounded-full bg-cyan-500/10 border border-cyan-400/20">
                        {project.category}
                      </span>
                      <span className="text-xs font-mono text-slate-400">{project.year}</span>
                    </div>

                    <div className="flex items-center gap-2 text-slate-400">
                      {project.githubUrl && (
                        <a
                          href={project.githubUrl}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="hover:text-white transition-colors"
                          aria-label={`View ${project.title} on GitHub`}
                        >
                          <GithubIcon className="w-4 h-4" />
                        </a>
                      )}
                      {project.liveUrl && (
                        <a
                          href={project.liveUrl}
                          className="hover:text-cyan-300 transition-colors"
                          aria-label={`Open ${project.title} live demo`}
                        >
                          <ArrowUpRight className="w-4 h-4" />
                        </a>
                      )}
                    </div>
                  </div>

                  {/* Title & Subtitle */}
                  <h4 className="text-xl font-bold text-white mb-1 group-hover:text-cyan-300 transition-colors">
                    {project.title}
                  </h4>
                  <div className="text-xs font-mono text-indigo-400 mb-4 font-semibold">
                    {project.subtitle}
                  </div>

                  {/* Description */}
                  <p className="text-xs sm:text-sm text-slate-300 leading-relaxed mb-6 font-normal">
                    {project.description}
                  </p>
                </div>

                {/* Tech Stack Pills */}
                <div>
                  <div className="flex flex-wrap gap-1.5 pt-4 border-t border-white/[0.08]">
                    {project.tags.map((tag, tIdx) => (
                      <span
                        key={tIdx}
                        className="px-2 py-0.5 rounded bg-white/[0.04] border border-white/[0.08] text-[11px] font-mono text-slate-300"
                      >
                        {tag}
                      </span>
                    ))}
                  </div>
                </div>
              </GlassCard>
            </TiltCard>
          ))}
        </div>
      </div>
    </section>
  );
}
