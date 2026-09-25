"use client";

import React, { useState } from "react";
import { FEATURED_WELLSPRING_PROJECT } from "@/lib/constants";
import { GlassCard } from "@/components/ui/GlassCard";
import {
  Activity,
  Server,
  Database,
  Utensils,
  Layout,
  Sparkles,
} from "lucide-react";
import { cn } from "@/lib/utils";

const stepIcons = [
  <Activity key="1" className="w-4 h-4" />,
  <Server key="2" className="w-4 h-4" />,
  <Database key="3" className="w-4 h-4" />,
  <Utensils key="4" className="w-4 h-4" />,
  <Layout key="5" className="w-4 h-4" />,
];

export function WellspringArchitectureFlow() {
  const [activeStep, setActiveStep] = useState<number>(1);
  const stages = FEATURED_WELLSPRING_PROJECT.architectureStages || [];
  const currentStage = stages.find((s) => s.step === activeStep) || stages[0];

  return (
    <div className="space-y-6">
      {/* Step Indicators */}
      <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-2.5">
        {stages.map((stage, idx) => {
          const isCurrent = stage.step === activeStep;

          return (
            <button
              key={stage.step}
              onClick={() => setActiveStep(stage.step)}
              className={cn(
                "p-3 rounded-xl border text-left transition-all duration-200 flex flex-col justify-between min-h-[90px] relative group",
                isCurrent
                  ? "bg-cyan-600/30 border-cyan-400 text-white shadow-[0_0_20px_rgba(6,182,212,0.3)]"
                  : "bg-white/[0.03] border-white/[0.08] text-slate-400 hover:text-slate-200 hover:bg-white/[0.06]"
              )}
            >
              <div className="flex items-center justify-between w-full mb-1">
                <span className="text-[10px] font-mono text-cyan-400 font-bold">
                  STEP 0{stage.step}
                </span>
                <span
                  className={cn(
                    "transition-transform",
                    isCurrent ? "text-cyan-300 scale-110" : "text-slate-500 group-hover:text-slate-300"
                  )}
                >
                  {stepIcons[idx]}
                </span>
              </div>
              <div className="text-xs font-semibold text-white leading-snug line-clamp-2">
                {stage.title}
              </div>
            </button>
          );
        })}
      </div>

      {/* Expanded Active Stage Detail HUD */}
      <GlassCard glowColor="cyan" padding="md" className="border-cyan-500/40">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div className="space-y-1.5">
            <div className="flex items-center gap-2">
              <span className="px-2.5 py-0.5 rounded-full bg-cyan-500/20 border border-cyan-500/40 text-[11px] font-mono text-cyan-300 font-bold">
                STAGE {currentStage.step} OF 5
              </span>
              <h4 className="text-base font-bold text-white">{currentStage.title}</h4>
            </div>
            <p className="text-xs sm:text-sm text-slate-300 font-normal max-w-2xl">
              {currentStage.description}
            </p>
          </div>

          <div className="flex-shrink-0">
            <div className="inline-flex items-center gap-2 px-3.5 py-2 rounded-xl bg-[#050816] border border-cyan-500/30 text-xs font-mono text-cyan-300 shadow-inner">
              <Sparkles className="w-3.5 h-3.5 text-cyan-400" />
              <span>Stack: {currentStage.tech}</span>
            </div>
          </div>
        </div>
      </GlassCard>
    </div>
  );
}
