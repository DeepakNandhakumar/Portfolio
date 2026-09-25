"use client";

import React, { useState } from "react";
import { SKILL_CATEGORIES, SkillItem } from "@/lib/constants";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { GlassCard } from "@/components/ui/GlassCard";
import {
  Terminal,
  Code2,
  FileCode2,
  Database,
  Layout,
  Atom,
  Globe,
  Palette,
  Sparkles,
  Box,
  Network,
  Server,
  Zap,
  Cpu,
  BrainCircuit,
  Bot,
  MessageSquareCode,
  Workflow,
  Layers,
  Binary,
  BarChart3,
  Share2,
  Compass,
  HardDrive,
  GitBranch,
  ShieldCheck,
  Bug,
  Coffee,
  CheckCircle2,
  Link2,
} from "lucide-react";
import { cn } from "@/lib/utils";

// Icon mapping dictionary for dynamic lookup
const iconMap: Record<string, React.ReactNode> = {
  Terminal: <Terminal className="w-4 h-4" />,
  Code2: <Code2 className="w-4 h-4" />,
  FileCode2: <FileCode2 className="w-4 h-4" />,
  Database: <Database className="w-4 h-4" />,
  Layout: <Layout className="w-4 h-4" />,
  Atom: <Atom className="w-4 h-4" />,
  Globe: <Globe className="w-4 h-4" />,
  Palette: <Palette className="w-4 h-4" />,
  Sparkles: <Sparkles className="w-4 h-4" />,
  Box: <Box className="w-4 h-4" />,
  Network: <Network className="w-4 h-4" />,
  Server: <Server className="w-4 h-4" />,
  Zap: <Zap className="w-4 h-4" />,
  Cpu: <Cpu className="w-4 h-4" />,
  BrainCircuit: <BrainCircuit className="w-4 h-4" />,
  Bot: <Bot className="w-4 h-4" />,
  MessageSquareCode: <MessageSquareCode className="w-4 h-4" />,
  Workflow: <Workflow className="w-4 h-4" />,
  Layers: <Layers className="w-4 h-4" />,
  Binary: <Binary className="w-4 h-4" />,
  BarChart3: <BarChart3 className="w-4 h-4" />,
  Share2: <Share2 className="w-4 h-4" />,
  Compass: <Compass className="w-4 h-4" />,
  HardDrive: <HardDrive className="w-4 h-4" />,
  GitBranch: <GitBranch className="w-4 h-4" />,
  ShieldCheck: <ShieldCheck className="w-4 h-4" />,
  Bug: <Bug className="w-4 h-4" />,
  Coffee: <Coffee className="w-4 h-4" />,
};

export function Skills() {
  const [activeCategory, setActiveCategory] = useState<string>("all");
  const [hoveredSkill, setHoveredSkill] = useState<SkillItem | null>(null);

  // Flatten all skills for quick lookup
  const allSkills = SKILL_CATEGORIES.flatMap((c) => c.skills);

  const displayedCategories =
    activeCategory === "all"
      ? SKILL_CATEGORIES
      : SKILL_CATEGORIES.filter((c) => c.id === activeCategory);

  return (
    <section id="skills" className="relative py-24 sm:py-32 px-6 sm:px-10 max-w-7xl mx-auto">
      {/* Section Header */}
      <SectionHeading
        landmark="02 // LANDMARK"
        badge="TECHNOLOGY UNIVERSE"
        title="Developer Technology Universe"
        subtitle="An interconnected ecosystem of languages, frameworks, AI agents, data engineering, and modern infrastructure."
        accentGradient="cyan-blue"
      />

      {/* Category Filter Tabs */}
      <div className="flex flex-wrap items-center justify-center gap-2 mb-12">
        <button
          onClick={() => setActiveCategory("all")}
          className={cn(
            "px-4 py-2 rounded-full text-xs font-mono transition-all duration-200 border",
            activeCategory === "all"
              ? "bg-cyan-500/20 border-cyan-400 text-cyan-300 shadow-[0_0_15px_rgba(6,182,212,0.3)] font-bold"
              : "bg-white/[0.03] border-white/[0.08] text-slate-400 hover:text-white hover:bg-white/[0.06]"
          )}
        >
          ✦ ALL UNIVERSE
        </button>

        {SKILL_CATEGORIES.map((cat) => (
          <button
            key={cat.id}
            onClick={() => setActiveCategory(cat.id)}
            className={cn(
              "px-3.5 py-1.5 rounded-full text-xs font-mono transition-all duration-200 border",
              activeCategory === cat.id
                ? "bg-indigo-600/30 border-indigo-400 text-white shadow-[0_0_15px_rgba(79,70,229,0.3)] font-bold"
                : "bg-white/[0.03] border-white/[0.08] text-slate-400 hover:text-white hover:bg-white/[0.06]"
            )}
          >
            {cat.label}
          </button>
        ))}
      </div>

      {/* Active Skill Dynamic Telemetry HUD */}
      <div className="mb-10 max-w-2xl mx-auto">
        <GlassCard
          glowColor={hoveredSkill ? "cyan" : "indigo"}
          padding="md"
          className="transition-all duration-300 min-h-[105px] flex flex-col justify-center border-indigo-500/30"
        >
          {hoveredSkill ? (
            <div className="space-y-2 animate-in fade-in duration-200">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2.5">
                  <div className="p-1.5 rounded-lg bg-cyan-500/20 text-cyan-300">
                    {iconMap[hoveredSkill.iconName] || <Sparkles className="w-4 h-4" />}
                  </div>
                  <span className="text-base font-bold text-white tracking-wide">
                    {hoveredSkill.name}
                  </span>
                  <span className="text-[10px] font-mono uppercase px-2 py-0.5 rounded bg-white/[0.08] text-indigo-300">
                    {hoveredSkill.category}
                  </span>
                </div>
                <div className="flex items-center gap-1.5 text-xs font-mono text-cyan-400">
                  <Link2 className="w-3.5 h-3.5" />
                  <span>{hoveredSkill.connectedSkills.length} Connections</span>
                </div>
              </div>

              <p className="text-xs sm:text-sm text-slate-300 font-normal">
                {hoveredSkill.description}
              </p>

              {/* Connected Skills tags */}
              <div className="flex flex-wrap items-center gap-1.5 pt-1">
                <span className="text-[10px] font-mono text-slate-400">Interconnects:</span>
                {hoveredSkill.connectedSkills.map((conn, idx) => (
                  <span
                    key={idx}
                    className="text-[10px] font-mono px-2 py-0.5 rounded-full bg-cyan-500/10 border border-cyan-400/30 text-cyan-300"
                  >
                    {conn}
                  </span>
                ))}
              </div>
            </div>
          ) : (
            <div className="text-center text-xs font-mono text-slate-400 flex items-center justify-center gap-2">
              <Sparkles className="w-4 h-4 text-cyan-400 animate-spin" />
              <span>Hover over any skill node in the universe to inspect connections & details</span>
            </div>
          )}
        </GlassCard>
      </div>

      {/* Technology Category Clusters Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {displayedCategories.map((category) => (
          <GlassCard
            key={category.id}
            glowColor="indigo"
            padding="lg"
            className="flex flex-col justify-between"
          >
            <div>
              {/* Category Header */}
              <div className="flex items-center justify-between pb-3 mb-4 border-b border-white/[0.08]">
                <div className="flex items-center gap-2">
                  <span
                    className="w-2.5 h-2.5 rounded-full"
                    style={{ backgroundColor: category.color }}
                  />
                  <h3 className="text-sm font-bold font-mono tracking-wider text-white uppercase">
                    {category.label}
                  </h3>
                </div>
                <span className="text-[10px] font-mono text-slate-500">
                  {category.skills.length} MODULES
                </span>
              </div>

              {/* Skills Nodes in Category */}
              <div className="flex flex-wrap gap-2.5">
                {category.skills.map((skill) => {
                  const isHovered = hoveredSkill?.name === skill.name;
                  const isConnectedToHovered =
                    hoveredSkill &&
                    (hoveredSkill.connectedSkills.includes(skill.name) ||
                      skill.connectedSkills.includes(hoveredSkill.name));

                  return (
                    <button
                      key={skill.name}
                      onMouseEnter={() => setHoveredSkill(skill)}
                      onFocus={() => setHoveredSkill(skill)}
                      className={cn(
                        "flex items-center gap-2 px-3 py-2 rounded-xl text-xs font-medium transition-all duration-200 border cursor-pointer select-none",
                        isHovered
                          ? "bg-cyan-500/25 border-cyan-400 text-white shadow-[0_0_20px_rgba(6,182,212,0.4)] scale-105"
                          : isConnectedToHovered
                          ? "bg-indigo-600/30 border-indigo-400 text-cyan-200 shadow-[0_0_15px_rgba(79,70,229,0.3)]"
                          : "bg-white/[0.03] border-white/[0.08] text-slate-300 hover:text-white hover:bg-white/[0.07] hover:border-white/20"
                      )}
                    >
                      <span
                        className={cn(
                          "transition-colors",
                          isHovered
                            ? "text-cyan-300"
                            : isConnectedToHovered
                            ? "text-indigo-300"
                            : "text-slate-400"
                        )}
                      >
                        {iconMap[skill.iconName] || <Code2 className="w-3.5 h-3.5" />}
                      </span>
                      <span>{skill.name}</span>
                    </button>
                  );
                })}
              </div>
            </div>
          </GlassCard>
        ))}
      </div>
    </section>
  );
}
