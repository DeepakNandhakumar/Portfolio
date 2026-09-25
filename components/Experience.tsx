"use client";

import React from "react";
import { EXPERIENCES, EDUCATION_LIST } from "@/lib/constants";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { GlassCard } from "@/components/ui/GlassCard";
import {
  Briefcase,
  Calendar,
  MapPin,
  Sparkles,
  GraduationCap,
  CheckCircle2,
  Building2,
  Award,
} from "lucide-react";

export function Experience() {
  return (
    <section id="experience" className="relative py-24 sm:py-32 px-6 sm:px-10 max-w-7xl mx-auto">
      {/* Section Header */}
      <SectionHeading
        landmark="03 // LANDMARK"
        badge="ENGINEERING &amp; ACADEMICS"
        title="Experience &amp; Education Journey"
        subtitle="Current engineering tenure at Owlsure alongside a strong foundation in Computer Applications."
        accentGradient="purple-pink"
      />

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
        {/* Left Column: Professional Experience at Owlsure */}
        <div className="lg:col-span-7 space-y-6">
          <div className="flex items-center gap-2 mb-2 text-xs font-mono text-cyan-400 uppercase tracking-wider">
            <Briefcase className="w-4 h-4" />
            <span>Professional Engineering Experience</span>
          </div>

          {EXPERIENCES.map((exp) => (
            <GlassCard
              key={exp.id}
              glowColor="cyan"
              padding="lg"
              className="relative group transition-all duration-300 border-cyan-500/30"
            >
              {/* Period & Organization Header */}
              <div className="flex flex-wrap items-center justify-between gap-2 mb-4 pb-3 border-b border-white/[0.08]">
                <div className="flex items-center gap-2">
                  <div className="p-2 rounded-xl bg-cyan-500/10 text-cyan-400 border border-cyan-500/20">
                    <Building2 className="w-5 h-5" />
                  </div>
                  <div>
                    <h3 className="text-xl font-bold text-white">{exp.role}</h3>
                    <span className="text-sm font-bold font-mono text-cyan-400">
                      @{exp.organization}
                    </span>
                  </div>
                </div>

                <div className="flex flex-col items-end">
                  <span className="text-xs font-mono text-slate-300 flex items-center gap-1.5 bg-white/[0.05] px-2.5 py-1 rounded-full border border-white/[0.08]">
                    <Calendar className="w-3.5 h-3.5 text-cyan-400" />
                    {exp.period}
                  </span>
                  <span className="text-[10px] font-mono text-slate-400 mt-1">
                    {exp.location} • {exp.type}
                  </span>
                </div>
              </div>

              {/* Summary */}
              <p className="text-xs sm:text-sm text-slate-300 mb-5 leading-relaxed font-normal">
                {exp.summary}
              </p>

              {/* Responsibilities */}
              <div className="space-y-2.5 mb-6">
                {exp.responsibilities.map((resp, rIdx) => (
                  <div key={rIdx} className="flex items-start gap-2.5 text-xs text-slate-300">
                    <CheckCircle2 className="w-3.5 h-3.5 text-cyan-400 flex-shrink-0 mt-0.5" />
                    <span className="leading-relaxed">{resp}</span>
                  </div>
                ))}
              </div>

              {/* Tech Stack Pills */}
              <div className="flex flex-wrap gap-1.5 pt-4 border-t border-white/[0.08]">
                {exp.technologies.map((tech, tIdx) => (
                  <span
                    key={tIdx}
                    className="px-2.5 py-1 rounded-md bg-white/[0.04] border border-white/[0.08] text-[11px] font-mono text-slate-300"
                  >
                    {tech}
                  </span>
                ))}
              </div>

              {/* Highlight Badge */}
              {exp.highlightMetric && (
                <div className="mt-4 inline-flex items-center gap-2 px-3 py-1.5 rounded-lg bg-cyan-500/10 border border-cyan-500/20 text-xs font-mono text-cyan-300">
                  <Sparkles className="w-3.5 h-3.5 text-cyan-400" />
                  <span>{exp.highlightMetric}</span>
                </div>
              )}
            </GlassCard>
          ))}
        </div>

        {/* Right Column: Academic Track Record */}
        <div className="lg:col-span-5 space-y-6">
          <div className="flex items-center gap-2 mb-2 text-xs font-mono text-purple-400 uppercase tracking-wider">
            <GraduationCap className="w-4 h-4" />
            <span>Academic Qualifications</span>
          </div>

          {EDUCATION_LIST.map((edu, idx) => (
            <GlassCard
              key={idx}
              glowColor={idx === 0 ? "purple" : "indigo"}
              padding="lg"
              className="space-y-3 relative overflow-hidden"
            >
              <div className="flex items-start justify-between gap-3">
                <div className="space-y-1">
                  <span className="text-xs font-mono text-purple-300 font-semibold">
                    {edu.period}
                  </span>
                  <h4 className="text-base sm:text-lg font-bold text-white leading-snug">
                    {edu.degree}
                  </h4>
                  <p className="text-xs text-slate-400 font-mono">
                    {edu.institution}
                  </p>
                </div>

                <div className="flex-shrink-0 text-center px-3 py-2 rounded-xl bg-purple-500/10 border border-purple-500/30">
                  <span className="text-[10px] font-mono text-slate-400 block">SCORE</span>
                  <span className="text-base font-extrabold font-mono text-purple-300">
                    {edu.score}
                  </span>
                </div>
              </div>
            </GlassCard>
          ))}

          {/* Academic Highlights Banner */}
          <GlassCard glowColor="none" padding="md" className="border-indigo-500/20 bg-[#050816]/70">
            <div className="flex items-center gap-3">
              <div className="p-2 rounded-xl bg-amber-500/10 text-amber-400">
                <Award className="w-5 h-5" />
              </div>
              <div>
                <div className="text-xs font-bold text-white">Continuous High Performance</div>
                <div className="text-[11px] font-mono text-slate-400">
                  80% in BCA • 100% Attendance Award Winner
                </div>
              </div>
            </div>
          </GlassCard>
        </div>
      </div>
    </section>
  );
}
