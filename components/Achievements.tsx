"use client";

import React from "react";
import { ACHIEVEMENTS, CERTIFICATIONS, AchievementItem } from "@/lib/constants";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { GlassCard } from "@/components/ui/GlassCard";
import {
  Trophy,
  Sparkles,
  Award,
  Users,
  Medal,
  Flame,
  Code2,
  CheckCircle2,
  ExternalLink,
  ShieldCheck,
  Star,
} from "lucide-react";

const iconMap: Record<string, React.ReactNode> = {
  Sparkles: <Sparkles className="w-5 h-5 text-cyan-400" />,
  Trophy: <Trophy className="w-5 h-5 text-amber-400" />,
  Award: <Award className="w-5 h-5 text-purple-400" />,
  Users: <Users className="w-5 h-5 text-indigo-400" />,
  Medal: <Medal className="w-5 h-5 text-emerald-400" />,
  Flame: <Flame className="w-5 h-5 text-rose-400" />,
  Code2: <Code2 className="w-5 h-5 text-blue-400" />,
  CheckCircle2: <CheckCircle2 className="w-5 h-5 text-teal-400" />,
};

export function Achievements() {
  return (
    <section id="achievements" className="relative py-24 sm:py-32 px-6 sm:px-10 max-w-7xl mx-auto">
      {/* Section Header */}
      <SectionHeading
        landmark="05 // LANDMARK"
        badge="HONORS & RECOGNITION"
        title="Achievements & Milestones"
        subtitle="Key awards, competitive programming honors, and notable technical recognitions across Deepak's journey."
        accentGradient="amber-orange"
      />

      {/* Flagship Highlight Banner: Microsoft AI Tour & Satya Nadella */}
      <div className="mb-12">
        <GlassCard
          glowColor="cyan"
          padding="lg"
          className="relative overflow-hidden border-cyan-500/40 bg-gradient-to-r from-[#0B1120] via-[#091426] to-[#0B1120]"
        >
          <div className="flex flex-col md:flex-row md:items-center justify-between gap-6">
            <div className="flex items-start gap-4">
              <div className="p-3.5 rounded-2xl bg-cyan-500/20 border border-cyan-500/40 text-cyan-300 shadow-[0_0_25px_rgba(6,182,212,0.4)] flex-shrink-0">
                <Sparkles className="w-7 h-7" />
              </div>
              <div className="space-y-1.5">
                <div className="flex flex-wrap items-center gap-2">
                  <span className="px-2.5 py-0.5 rounded-full bg-cyan-500/20 text-cyan-300 border border-cyan-500/30 text-[11px] font-mono font-bold">
                    SPECIAL MILESTONE 2025
                  </span>
                  <span className="text-xs font-mono text-slate-400">Microsoft AI Tour</span>
                </div>
                <h3 className="text-xl sm:text-2xl font-extrabold text-white">
                  Attended Microsoft AI Tour &amp; Met Satya Nadella
                </h3>
                <p className="text-xs sm:text-sm text-slate-300 max-w-3xl leading-relaxed font-normal">
                  Participated in the flagship Microsoft AI Tour 2025 exploring next-generation enterprise AI frameworks and had the rare honor of interacting with Microsoft Chairman &amp; CEO Satya Nadella.
                </p>
              </div>
            </div>

            <div className="flex-shrink-0">
              <div className="inline-flex items-center gap-2 px-4 py-2.5 rounded-xl bg-[#050816] border border-cyan-400/40 text-cyan-300 text-xs font-mono shadow-lg">
                <Star className="w-4 h-4 fill-cyan-400 text-cyan-400" />
                <span>Executive AI Summit</span>
              </div>
            </div>
          </div>
        </GlassCard>
      </div>

      {/* Grid of Other Notable Achievements */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-16">
        {ACHIEVEMENTS.slice(1).map((item, idx) => (
          <GlassCard
            key={idx}
            glowColor={
              item.category === "Competition"
                ? "amber"
                : item.category === "Leadership"
                ? "indigo"
                : "purple"
            }
            padding="lg"
            className="flex flex-col justify-between group transition-all duration-300"
          >
            <div>
              {/* Category Header */}
              <div className="flex items-center justify-between pb-3 mb-4 border-b border-white/[0.08]">
                <div className="flex items-center gap-2">
                  <div className="p-2 rounded-xl bg-white/[0.04] border border-white/[0.08]">
                    {iconMap[item.iconName] || <Award className="w-4 h-4 text-cyan-400" />}
                  </div>
                  <span className="text-[11px] font-mono uppercase px-2 py-0.5 rounded-full bg-white/[0.06] text-slate-300 font-medium">
                    {item.category}
                  </span>
                </div>
                <span className="text-xs font-mono text-cyan-400 font-bold">{item.year}</span>
              </div>

              {/* Title */}
              <h4 className="text-base font-bold text-white mb-2 group-hover:text-cyan-300 transition-colors">
                {item.title}
              </h4>

              {/* Description */}
              {item.description && (
                <p className="text-xs sm:text-sm text-slate-300 leading-relaxed font-normal">
                  {item.description}
                </p>
              )}
            </div>
          </GlassCard>
        ))}
      </div>

      {/* Certifications & Problem Solving Grid */}
      <div className="pt-8 border-t border-white/[0.08]">
        <div className="mb-6 flex items-center gap-2 text-xs font-mono text-indigo-300 uppercase tracking-wider">
          <ShieldCheck className="w-4 h-4 text-cyan-400" />
          <span>Certifications, Courses &amp; Problem Solving Platforms</span>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          {/* Courses */}
          <GlassCard padding="md" glowColor="none" className="space-y-3">
            <span className="text-xs font-mono text-cyan-400 font-bold uppercase block">
              COURSES &amp; CLOUD
            </span>
            <div className="space-y-1.5">
              {CERTIFICATIONS.courses.map((c, idx) => (
                <div key={idx} className="flex items-center gap-2 text-xs text-slate-300">
                  <CheckCircle2 className="w-3.5 h-3.5 text-cyan-400 flex-shrink-0" />
                  <span>{c}</span>
                </div>
              ))}
            </div>
          </GlassCard>

          {/* Problem Solving */}
          <GlassCard padding="md" glowColor="none" className="space-y-3">
            <span className="text-xs font-mono text-purple-400 font-bold uppercase block">
              PROBLEM SOLVING
            </span>
            <div className="space-y-1.5">
              {CERTIFICATIONS.problemSolving.map((p, idx) => (
                <div key={idx} className="flex items-center gap-2 text-xs text-slate-300">
                  <CheckCircle2 className="w-3.5 h-3.5 text-purple-400 flex-shrink-0" />
                  <span>{p}</span>
                </div>
              ))}
            </div>
          </GlassCard>

          {/* Coding Contests */}
          <GlassCard padding="md" glowColor="none" className="space-y-3">
            <span className="text-xs font-mono text-amber-400 font-bold uppercase block">
              CODING CONTESTS
            </span>
            <div className="space-y-1.5">
              {CERTIFICATIONS.codingContests.map((con, idx) => (
                <div key={idx} className="flex items-center gap-2 text-xs text-slate-300">
                  <CheckCircle2 className="w-3.5 h-3.5 text-amber-400 flex-shrink-0" />
                  <span>{con}</span>
                </div>
              ))}
            </div>
          </GlassCard>

          {/* Masterclasses & Internships */}
          <GlassCard padding="md" glowColor="none" className="space-y-3">
            <span className="text-xs font-mono text-emerald-400 font-bold uppercase block">
              MASTERCLASSES
            </span>
            <div className="space-y-1.5">
              {CERTIFICATIONS.masterclasses.map((m, idx) => (
                <div key={idx} className="flex items-center gap-2 text-xs text-slate-300">
                  <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400 flex-shrink-0" />
                  <span>{m}</span>
                </div>
              ))}
            </div>
          </GlassCard>
        </div>
      </div>
    </section>
  );
}
