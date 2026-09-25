"use client";

import React, { useState } from "react";
import { PERSONAL_INFO, STATISTICS, TERMINAL_COMMANDS } from "@/lib/constants";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { GlassCard } from "@/components/ui/GlassCard";
import { AnimatedCounter } from "@/components/ui/AnimatedCounter";
import {
  Terminal as TerminalIcon,
  Cpu,
  GitBranch,
  Layers,
  Sparkles,
  Database,
  Check,
  CornerDownLeft,
  Flame,
  Binary,
  Code2,
  Workflow,
  GraduationCap,
  Briefcase,
} from "lucide-react";

export function About() {
  const [activeCodeTab, setActiveCodeTab] = useState<"spring" | "react" | "sql">("spring");
  const [terminalInput, setTerminalInput] = useState("");
  const [terminalHistory, setTerminalHistory] = useState<{ command: string; output: string[] }[]>([
    {
      command: "whoami",
      output: TERMINAL_COMMANDS.whoami as string[],
    },
  ]);

  const handleTerminalSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const cmd = terminalInput.trim().toLowerCase();
    if (!cmd) return;

    if (cmd === "clear") {
      setTerminalHistory([]);
      setTerminalInput("");
      return;
    }

    const output = TERMINAL_COMMANDS[cmd];
    if (output) {
      setTerminalHistory((prev) => [
        ...prev,
        {
          command: cmd,
          output: Array.isArray(output) ? output : [output],
        },
      ]);
    } else {
      setTerminalHistory((prev) => [
        ...prev,
        {
          command: cmd,
          output: [`Command not recognized: "${cmd}". Type "help" for a list of available commands.`],
        },
      ]);
    }
    setTerminalInput("");
  };

  const codeSnippets = {
    spring: `// WellspringService.java - Preventive Health Engine
package com.owlsure.wellspring.service;

import org.springframework.stereotype.Service;
import com.owlsure.wellspring.model.HealthMetrics;
import com.owlsure.wellspring.repository.UserRepository;

@Service
public class WellspringHealthService {
    
    public HealthAssessment calculateWellnessScore(HealthMetrics metrics) {
        double bmi = metrics.getWeightKg() / Math.pow(metrics.getHeightM(), 2);
        String category = categorizeBmi(bmi);
        DietPlan recommendedDiet = generatePersonalizedDiet(metrics, category);
        
        return new HealthAssessment(bmi, category, recommendedDiet, "OPTIMAL");
    }
}`,
    react: `// HealthIntelligence.tsx - Full-Stack React Client
import React, { useState } from 'react';

export const WellspringDashboard = () => {
  const [metrics, setMetrics] = useState({ height: 178, weight: 72 });
  const [analysis, setAnalysis] = useState<HealthAssessment | null>(null);

  const assessHealth = async () => {
    const res = await fetch('/api/v1/health/evaluate', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(metrics)
    });
    setAnalysis(await res.json());
  };

  return <HealthTelemetryView data={analysis} onEvaluate={assessHealth} />;
};`,
    sql: `-- wellspring_schema.sql - Relational Persistence
CREATE TABLE user_health_telemetry (
    record_id BIGINT AUTO_INCREMENT PRIMARY KEY,
    user_id VARCHAR(64) NOT NULL,
    bmi_index DECIMAL(4,2) NOT NULL,
    symptom_flags JSON,
    caloric_target INT NOT NULL,
    recorded_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    INDEX idx_user_telemetry (user_id, recorded_at)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;`,
  };

  return (
    <section id="about" className="relative py-24 sm:py-32 px-6 sm:px-10 max-w-7xl mx-auto">
      {/* Section Header */}
      <SectionHeading
        landmark="01 // LANDMARK"
        badge="ABOUT DEEPAK"
        title="Engineering Profile & Digital Workstation"
        subtitle="Software Engineer at Owlsure dedicated to building high-performance full-stack applications, robust backend microservices, and modern health-tech platforms."
        accentGradient="indigo-purple"
      />

      {/* Main Grid: Left Bio & Interactive Code, Right Interactive Terminal & Workstation */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
        {/* Left Column: Bio + Code Playground */}
        <div className="lg:col-span-6 space-y-6">
          <GlassCard glowColor="indigo" padding="lg">
            <div className="flex items-center gap-3 mb-4">
              <div className="p-2 rounded-xl bg-indigo-500/10 border border-indigo-500/20 text-indigo-400">
                <Briefcase className="w-5 h-5" />
              </div>
              <div>
                <h3 className="text-xl font-bold text-white">Deepak N</h3>
                <span className="text-xs font-mono text-cyan-400">Software Engineer @ Owlsure</span>
              </div>
            </div>

            <p className="text-slate-300 text-sm sm:text-base leading-relaxed mb-6 font-normal">
              {PERSONAL_INFO.about}
            </p>

            {/* Core Pillars */}
            <div className="grid grid-cols-2 gap-3 pt-4 border-t border-white/[0.08]">
              <div className="flex items-center gap-2 text-xs font-mono text-slate-300">
                <Check className="w-3.5 h-3.5 text-cyan-400 flex-shrink-0" />
                <span>Full-Stack Development</span>
              </div>
              <div className="flex items-center gap-2 text-xs font-mono text-slate-300">
                <Check className="w-3.5 h-3.5 text-purple-400 flex-shrink-0" />
                <span>React &amp; Spring Boot</span>
              </div>
              <div className="flex items-center gap-2 text-xs font-mono text-slate-300">
                <Check className="w-3.5 h-3.5 text-emerald-400 flex-shrink-0" />
                <span>MySQL &amp; Relational DBs</span>
              </div>
              <div className="flex items-center gap-2 text-xs font-mono text-slate-300">
                <Check className="w-3.5 h-3.5 text-amber-400 flex-shrink-0" />
                <span>Health-Tech Intelligence</span>
              </div>
            </div>
          </GlassCard>

          {/* Interactive Code Window */}
          <GlassCard padding="none" glowColor="cyan" className="overflow-hidden">
            {/* Window Header */}
            <div className="flex items-center justify-between px-4 py-3 bg-[#080D1A] border-b border-white/[0.08]">
              <div className="flex items-center gap-2">
                <div className="w-3 h-3 rounded-full bg-rose-500/80" />
                <div className="w-3 h-3 rounded-full bg-amber-500/80" />
                <div className="w-3 h-3 rounded-full bg-emerald-500/80" />
                <span className="ml-2 text-xs font-mono text-slate-400 hidden sm:inline">
                  owlsure/wellspring/
                </span>
              </div>

              {/* Code Tabs */}
              <div className="flex items-center gap-1">
                {(["spring", "react", "sql"] as const).map((tab) => (
                  <button
                    key={tab}
                    onClick={() => setActiveCodeTab(tab)}
                    className={`px-2.5 py-1 rounded-lg text-xs font-mono transition-colors ${
                      activeCodeTab === tab
                        ? "bg-indigo-600/30 text-cyan-300 border border-cyan-500/30"
                        : "text-slate-400 hover:text-white"
                    }`}
                  >
                    {tab === "spring" && "WellspringService.java"}
                    {tab === "react" && "HealthDashboard.tsx"}
                    {tab === "sql" && "schema.sql"}
                  </button>
                ))}
              </div>
            </div>

            {/* Code Body */}
            <pre className="p-4 sm:p-5 text-xs sm:text-sm font-mono text-slate-200 overflow-x-auto leading-relaxed bg-[#050816]/90">
              <code>{codeSnippets[activeCodeTab]}</code>
            </pre>
          </GlassCard>
        </div>

        {/* Right Column: Live Interactive Developer Terminal */}
        <div className="lg:col-span-6 space-y-6">
          <GlassCard glowColor="purple" padding="none" className="overflow-hidden flex flex-col h-[480px]">
            {/* Terminal Window Header */}
            <div className="flex items-center justify-between px-4 py-3 bg-[#080D1A] border-b border-white/[0.08]">
              <div className="flex items-center gap-2.5">
                <TerminalIcon className="w-4 h-4 text-cyan-400" />
                <span className="text-xs font-mono font-semibold text-slate-300">
                  deepak@owlsure-dev-workspace: ~
                </span>
              </div>
              <div className="flex items-center gap-2">
                <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-emerald-500/10 text-emerald-400 border border-emerald-500/20">
                  ONLINE @ OWLSURE
                </span>
              </div>
            </div>

            {/* Terminal Screen Body */}
            <div className="flex-1 p-4 sm:p-5 overflow-y-auto font-mono text-xs sm:text-sm space-y-3 bg-[#050816]/95">
              <div className="text-slate-500 text-xs">
                {PERSONAL_INFO.terminalWelcome}
                <br />
                Type <span className="text-cyan-400 font-semibold">&quot;help&quot;</span> or click suggested commands:
              </div>

              {/* Quick Command Pills */}
              <div className="flex flex-wrap gap-1.5 pb-2 border-b border-white/[0.06]">
                {["whoami", "skills", "experience", "education", "achievements", "wellspring", "projects", "contact", "clear"].map((cmd) => (
                  <button
                    key={cmd}
                    onClick={() => {
                      setTerminalInput(cmd);
                      const output = TERMINAL_COMMANDS[cmd];
                      if (cmd === "clear") {
                        setTerminalHistory([]);
                      } else if (output) {
                        setTerminalHistory((prev) => [
                          ...prev,
                          {
                            command: cmd,
                            output: Array.isArray(output) ? output : [output],
                          },
                        ]);
                      }
                    }}
                    className="px-2 py-1 rounded bg-white/[0.04] hover:bg-indigo-500/20 border border-white/[0.08] hover:border-indigo-500/40 text-[11px] text-slate-300 hover:text-cyan-300 transition-colors"
                  >
                    ${cmd}
                  </button>
                ))}
              </div>

              {/* Command History */}
              {terminalHistory.map((item, idx) => (
                <div key={idx} className="space-y-1.5">
                  <div className="flex items-center gap-2 text-cyan-400 font-semibold">
                    <span className="text-indigo-400">&gt;</span>
                    <span>${item.command}</span>
                  </div>
                  <div className="pl-4 space-y-1 text-slate-300 border-l-2 border-indigo-500/30">
                    {item.output.map((line, lIdx) => (
                      <div key={lIdx} className="leading-relaxed">
                        {line}
                      </div>
                    ))}
                  </div>
                </div>
              ))}
            </div>

            {/* Terminal Input Bar */}
            <form
              onSubmit={handleTerminalSubmit}
              className="flex items-center gap-2 px-4 py-3 bg-[#080D1A] border-t border-white/[0.08]"
            >
              <span className="text-cyan-400 font-mono text-sm">&gt;</span>
              <input
                type="text"
                value={terminalInput}
                onChange={(e) => setTerminalInput(e.target.value)}
                placeholder="type 'whoami', 'achievements', 'wellspring'..."
                className="flex-1 bg-transparent text-sm font-mono text-white placeholder:text-slate-600 focus:outline-none"
              />
              <button
                type="submit"
                className="p-1.5 rounded-lg bg-indigo-600/30 text-indigo-300 hover:bg-indigo-600 hover:text-white transition-colors"
                aria-label="Submit command"
              >
                <CornerDownLeft className="w-3.5 h-3.5" />
              </button>
            </form>
          </GlassCard>

          {/* Key Qualifications Badges */}
          <div className="grid grid-cols-3 gap-3">
            <GlassCard padding="sm" glowColor="none" className="text-center">
              <GraduationCap className="w-5 h-5 text-indigo-400 mx-auto mb-1.5" />
              <div className="text-xs font-bold text-white">BCA - 80%</div>
              <div className="text-[10px] font-mono text-slate-400">TERF&apos;s Academy</div>
            </GlassCard>
            <GlassCard padding="sm" glowColor="none" className="text-center">
              <Sparkles className="w-5 h-5 text-cyan-400 mx-auto mb-1.5" />
              <div className="text-xs font-bold text-white">Software Engineer</div>
              <div className="text-[10px] font-mono text-slate-400">Owlsure</div>
            </GlassCard>
            <GlassCard padding="sm" glowColor="none" className="text-center">
              <Flame className="w-5 h-5 text-purple-400 mx-auto mb-1.5" />
              <div className="text-xs font-bold text-white">5-Star Gold</div>
              <div className="text-[10px] font-mono text-slate-400">HackerRank Problem Solving</div>
            </GlassCard>
          </div>
        </div>
      </div>

      {/* Real Statistics Counters from Resume */}
      <div className="mt-16 grid grid-cols-2 md:grid-cols-4 gap-4 sm:gap-6">
        {STATISTICS.map((stat, idx) => (
          <GlassCard
            key={idx}
            glowColor={idx === 0 ? "indigo" : idx === 1 ? "cyan" : idx === 2 ? "purple" : "emerald"}
            padding="lg"
            className="text-center relative overflow-hidden group"
          >
            <div className="text-3xl sm:text-4xl md:text-5xl font-black font-mono text-white mb-2 tracking-tight group-hover:scale-105 transition-transform duration-300">
              <AnimatedCounter value={stat.value} suffix={stat.suffix} />
            </div>
            <div className="text-sm font-bold text-slate-200 mb-1">{stat.label}</div>
            <div className="text-xs font-mono text-slate-400">{stat.sublabel}</div>
          </GlassCard>
        ))}
      </div>
    </section>
  );
}
