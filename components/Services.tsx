"use client";

import React from "react";
import { SERVICES, ServiceItem } from "@/lib/constants";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { GlassCard } from "@/components/ui/GlassCard";
import {
  Layers,
  BrainCircuit,
  Database,
  Cpu,
  Network,
  Sparkles,
  CheckCircle2,
  ArrowRight,
} from "lucide-react";

const serviceIcons: Record<string, React.ReactNode> = {
  Layers: <Layers className="w-5 h-5" />,
  BrainCircuit: <BrainCircuit className="w-5 h-5" />,
  Database: <Database className="w-5 h-5" />,
  Cpu: <Cpu className="w-5 h-5" />,
  Network: <Network className="w-5 h-5" />,
  Sparkles: <Sparkles className="w-5 h-5" />,
};

export function Services() {
  return (
    <section id="services" className="relative py-24 sm:py-32 px-6 sm:px-10 max-w-7xl mx-auto">
      {/* Section Header */}
      <SectionHeading
        landmark="05 // LANDMARK"
        badge="ENGINEERING CAPABILITIES"
        title="Technical Expertise & Services"
        subtitle="End-to-end engineering solutions spanning full-stack web applications, AI reasoning agents, data lakehouses, and legacy modernization."
        accentGradient="amber-orange"
      />

      {/* Services Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {SERVICES.map((service, idx) => (
          <GlassCard
            key={service.id}
            glowColor={
              idx === 0
                ? "indigo"
                : idx === 1
                ? "purple"
                : idx === 2
                ? "amber"
                : idx === 3
                ? "emerald"
                : idx === 4
                ? "cyan"
                : "pink"
            }
            padding="lg"
            className="flex flex-col justify-between group transition-all duration-300"
          >
            <div>
              {/* Icon & Index Badge */}
              <div className="flex items-center justify-between mb-5">
                <div className="p-3 rounded-xl bg-white/[0.04] border border-white/[0.08] text-cyan-300 group-hover:scale-110 group-hover:text-white transition-all shadow-sm">
                  {serviceIcons[service.icon] || <Sparkles className="w-5 h-5" />}
                </div>
                <span className="text-[11px] font-mono text-slate-500 font-bold">
                  // 0{idx + 1}
                </span>
              </div>

              {/* Title & Tagline */}
              <h3 className="text-xl font-bold text-white mb-1 group-hover:text-cyan-300 transition-colors">
                {service.title}
              </h3>
              <div className="text-xs font-mono text-indigo-400 mb-4 font-medium">
                {service.tagline}
              </div>

              {/* Description */}
              <p className="text-xs sm:text-sm text-slate-300 mb-6 leading-relaxed font-normal">
                {service.description}
              </p>

              {/* Capabilities List */}
              <div className="space-y-2 pt-4 border-t border-white/[0.08]">
                {service.capabilities.map((cap, cIdx) => (
                  <div key={cIdx} className="flex items-center gap-2 text-xs text-slate-300">
                    <CheckCircle2 className="w-3.5 h-3.5 text-cyan-400 flex-shrink-0" />
                    <span>{cap}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* Bottom Inquire Link */}
            <div className="pt-6 mt-6 border-t border-white/[0.04]">
              <a
                href="#contact"
                className="inline-flex items-center gap-1.5 text-xs font-mono text-indigo-300 hover:text-cyan-300 transition-colors group/link"
              >
                <span>Discuss Collaboration</span>
                <ArrowRight className="w-3.5 h-3.5 transition-transform group-hover/link:translate-x-1" />
              </a>
            </div>
          </GlassCard>
        ))}
      </div>
    </section>
  );
}
