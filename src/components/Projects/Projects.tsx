import React, { useState, Suspense } from 'react';
import { Canvas } from '@react-three/fiber';
import { OrbitControls } from '@react-three/drei';
import { motion, AnimatePresence } from 'framer-motion';
import {
  ExternalLink,
  Layers,
  Sparkles,
  ArrowRight,
  Database,
  Bot,
  Activity,
  Code2,
  Share2,
  Box,
  CheckCircle2,
  Info,
  Play,
  Gamepad2,
  Calculator,
  HeartPulse,
  Dumbbell,
} from 'lucide-react';
import { GithubIcon } from '@/components/ui/Icons';
import { SectionHeading } from '@/components/ui/SectionHeading';
import { GlassCard } from '@/components/ui/GlassCard';
import { TiltCard } from '@/components/ui/TiltCard';
import { Container } from '@/components/ui/Container';
import { Badge } from '@/components/ui/Badge';
import { Button } from '@/components/ui/Button';
import {
  FEATURED_WELLSPRING_PROJECT,
  FEATURED_SPANSTRIKE_PROJECT,
  OTHER_PROJECTS,
  KAIRIX_KNOWLEDGE_GRAPH_NODES,
  type KnowledgeGraphNode,
} from '@/data/projects';
import { WellspringSandbox } from './sandboxes/WellspringSandbox';
import { SpanStrikeSandbox } from './sandboxes/SpanStrikeSandbox';
import { RentCalculatorSandbox } from './sandboxes/RentCalculatorSandbox';
import { FitNHealSandbox } from './sandboxes/FitNHealSandbox';
import { HealthlineSandbox } from './sandboxes/HealthlineSandbox';
import { KnowledgeGraphScene } from '@/scenes/KnowledgeGraph';
import { fadeInUp, staggerContainer } from '@/animations/transitions';
import { useResponsive } from '@/hooks/useResponsive';

export const Projects: React.FC = () => {
  const { isMobile } = useResponsive();
  const [selectedGraphNode, setSelectedGraphNode] = useState<KnowledgeGraphNode | null>(
    KAIRIX_KNOWLEDGE_GRAPH_NODES[0]
  );
  const [activeTab, setActiveTab] = useState<'wellspring' | 'spanstrike' | 'all' | 'interactive'>('wellspring');
  const [activeInteractiveId, setActiveInteractiveId] = useState<string>('wellspring');

  return (
    <section id="projects" className="relative w-full py-20 sm:py-28 bg-slate-50/60">
      <Container size="lg">
        {/* Section Heading */}
        <SectionHeading
          landmark="04 // PROJECTS"
          title="Things I've"
          highlight="Built"
          subtitle="Real-world health intelligence platforms, 3D Unreal Engine simulations, and interactive utility applications."
        />

        {/* View Switcher Tabs */}
        <div className="flex flex-wrap items-center justify-center gap-2 mb-14">
          <button
            onClick={() => setActiveTab('wellspring')}
            className={`px-5 py-2.5 rounded-full text-xs font-medium transition-all duration-200 cursor-pointer ${
              activeTab === 'wellspring'
                ? 'bg-cyan-600 text-white shadow-md shadow-cyan-500/25 font-semibold'
                : 'bg-white text-slate-600 border border-slate-200 hover:bg-slate-50'
            }`}
          >
            ⭐ Wellspring Health (2026)
          </button>
          <button
            onClick={() => setActiveTab('spanstrike')}
            className={`px-5 py-2.5 rounded-full text-xs font-medium transition-all duration-200 cursor-pointer ${
              activeTab === 'spanstrike'
                ? 'bg-purple-600 text-white shadow-md shadow-purple-500/25 font-semibold'
                : 'bg-white text-slate-600 border border-slate-200 hover:bg-slate-50'
            }`}
          >
            🎮 SpanStrike Unreal 3D (2024)
          </button>
          <button
            onClick={() => setActiveTab('interactive')}
            className={`px-5 py-2.5 rounded-full text-xs font-medium transition-all duration-200 cursor-pointer ${
              activeTab === 'interactive'
                ? 'bg-indigo-600 text-white shadow-md shadow-indigo-500/25 font-semibold'
                : 'bg-white text-slate-600 border border-slate-200 hover:bg-slate-50'
            }`}
          >
            ⚡ Live Interactive Sandboxes (5 Demos)
          </button>
          <button
            onClick={() => setActiveTab('all')}
            className={`px-5 py-2.5 rounded-full text-xs font-medium transition-all duration-200 cursor-pointer ${
              activeTab === 'all'
                ? 'bg-slate-900 text-white shadow-md font-semibold'
                : 'bg-white text-slate-600 border border-slate-200 hover:bg-slate-50'
            }`}
          >
            All 5 Resume Projects
          </button>
        </div>

        {/* 1. WELLSPRING SHOWCASE */}
        {(activeTab === 'wellspring' || activeTab === 'all') && (
          <div className="mb-16">
            <GlassCard className="p-6 sm:p-10 border-cyan-100/90 shadow-2xl bg-white">
              {/* Wellspring Top Bar */}
              <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-4 pb-8 border-b border-slate-100">
                <div>
                  <div className="flex items-center gap-2 mb-2">
                    <Badge variant="cyan" size="md">
                      PREVENTIVE HEALTH INTELLIGENCE • 2026
                    </Badge>
                    <span className="text-xs font-mono text-cyan-600 font-bold">● React + Spring Boot + MySQL</span>
                  </div>
                  <h3 className="text-3xl sm:text-4xl font-extrabold text-slate-900 tracking-tight">
                    {FEATURED_WELLSPRING_PROJECT.title}
                  </h3>
                  <p className="text-base font-medium text-cyan-600 mt-1">
                    {FEATURED_WELLSPRING_PROJECT.subtitle}
                  </p>
                </div>

                <div className="flex items-center gap-3">
                  {FEATURED_WELLSPRING_PROJECT.githubUrl && (
                    <a
                      href={FEATURED_WELLSPRING_PROJECT.githubUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-slate-100 hover:bg-slate-200/80 text-slate-700 text-xs font-medium transition-colors cursor-pointer"
                    >
                      <GithubIcon className="w-4 h-4 text-slate-800" />
                      <span>GitHub Code</span>
                    </a>
                  )}
                  <a
                    href="#contact"
                    className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-cyan-600 hover:bg-cyan-700 text-white text-xs font-semibold shadow-sm shadow-cyan-500/25 transition-all cursor-pointer"
                  >
                    <span>Discuss Architecture</span>
                    <ArrowRight className="w-3.5 h-3.5" />
                  </a>
                </div>
              </div>

              {/* Wellspring Two-Column Body: Description & Live Sandbox */}
              <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 my-8 items-start">
                <div className="lg:col-span-6 space-y-4">
                  <p className="text-slate-700 text-base leading-relaxed font-normal">
                    {FEATURED_WELLSPRING_PROJECT.description}
                  </p>
                  {FEATURED_WELLSPRING_PROJECT.longDescription.map((p, idx) => (
                    <p key={idx} className="text-slate-600 text-sm leading-relaxed">
                      {p}
                    </p>
                  ))}

                  {/* Core Metrics */}
                  <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 pt-3">
                    {FEATURED_WELLSPRING_PROJECT.metrics.map((m, idx) => (
                      <div
                        key={idx}
                        className="p-3 rounded-xl bg-slate-50 border border-slate-200/80 text-center"
                      >
                        <div className="text-xs font-bold text-cyan-700 font-mono">
                          {m.value}
                        </div>
                        <div className="text-[10px] text-slate-500 font-mono mt-0.5">
                          {m.label}
                        </div>
                      </div>
                    ))}
                  </div>

                  {/* Tags */}
                  <div className="flex flex-wrap gap-1.5 pt-2">
                    {FEATURED_WELLSPRING_PROJECT.tags.map((tag) => (
                      <span
                        key={tag}
                        className="px-3 py-1 rounded-full bg-cyan-50 text-cyan-700 text-xs font-mono font-medium border border-cyan-100"
                      >
                        {tag}
                      </span>
                    ))}
                  </div>
                </div>

                {/* Right: Live Interactive Sandbox Component */}
                <div className="lg:col-span-6">
                  <WellspringSandbox />
                </div>
              </div>

              {/* Architecture Stages */}
              <div className="mt-8 pt-8 border-t border-slate-100">
                <h4 className="text-sm font-mono font-bold uppercase tracking-wider text-slate-500 mb-6 flex items-center gap-2">
                  <Activity className="w-4 h-4 text-cyan-600" />
                  Wellspring End-to-End Pipeline Architecture
                </h4>

                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-3">
                  {FEATURED_WELLSPRING_PROJECT.architectureStages?.map((st) => (
                    <div
                      key={st.step}
                      className="p-3.5 rounded-xl bg-white border border-slate-200 shadow-2xs flex flex-col justify-between hover:border-cyan-300 transition-colors"
                    >
                      <div>
                        <div className="flex items-center justify-between mb-2">
                          <span className="w-5 h-5 rounded-full bg-cyan-600 text-white font-mono font-bold text-[10px] flex items-center justify-center">
                            {st.step}
                          </span>
                          <span className="text-[9px] font-mono px-1.5 py-0.5 rounded bg-cyan-50 text-cyan-700">
                            {st.badge}
                          </span>
                        </div>
                        <h5 className="text-xs font-bold text-slate-900 leading-tight">
                          {st.title}
                        </h5>
                        <p className="text-[11px] text-slate-500 mt-1 leading-relaxed">
                          {st.description}
                        </p>
                      </div>
                      <div className="mt-3 pt-2 border-t border-slate-100 text-[10px] font-mono font-semibold text-cyan-600">
                        {st.tech}
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </GlassCard>
          </div>
        )}

        {/* 2. SPANSTRIKE SHOWCASE */}
        {(activeTab === 'spanstrike' || activeTab === 'all') && (
          <div className="mb-16">
            <GlassCard className="p-6 sm:p-10 border-purple-100/90 shadow-2xl bg-white">
              {/* SpanStrike Top Bar */}
              <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-4 pb-8 border-b border-slate-100">
                <div>
                  <div className="flex items-center gap-2 mb-2">
                    <Badge variant="purple" size="md">
                      UNREAL ENGINE 5 GAME DEV • 2024
                    </Badge>
                    <span className="text-xs font-mono text-purple-600 font-bold">● C++ & Blueprints Simulation</span>
                  </div>
                  <h3 className="text-3xl sm:text-4xl font-extrabold text-slate-900 tracking-tight">
                    {FEATURED_SPANSTRIKE_PROJECT.title}
                  </h3>
                  <p className="text-base font-medium text-purple-600 mt-1">
                    {FEATURED_SPANSTRIKE_PROJECT.subtitle}
                  </p>
                </div>

                <div className="flex items-center gap-3">
                  {FEATURED_SPANSTRIKE_PROJECT.githubUrl && (
                    <a
                      href={FEATURED_SPANSTRIKE_PROJECT.githubUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-slate-100 hover:bg-slate-200/80 text-slate-700 text-xs font-medium transition-colors cursor-pointer"
                    >
                      <GithubIcon className="w-4 h-4 text-slate-800" />
                      <span>GitHub Repository</span>
                    </a>
                  )}
                  <a
                    href="#contact"
                    className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-purple-600 hover:bg-purple-700 text-white text-xs font-semibold shadow-sm shadow-purple-500/25 transition-all cursor-pointer"
                  >
                    <span>Request Demo Build</span>
                    <ArrowRight className="w-3.5 h-3.5" />
                  </a>
                </div>
              </div>

              {/* SpanStrike Body */}
              <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 my-8 items-start">
                <div className="lg:col-span-6 space-y-4">
                  <p className="text-slate-700 text-base leading-relaxed font-normal">
                    {FEATURED_SPANSTRIKE_PROJECT.description}
                  </p>
                  {FEATURED_SPANSTRIKE_PROJECT.longDescription.map((p, idx) => (
                    <p key={idx} className="text-slate-600 text-sm leading-relaxed">
                      {p}
                    </p>
                  ))}

                  {/* Metrics */}
                  <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 pt-3">
                    {FEATURED_SPANSTRIKE_PROJECT.metrics.map((m, idx) => (
                      <div
                        key={idx}
                        className="p-3 rounded-xl bg-slate-50 border border-slate-200/80 text-center"
                      >
                        <div className="text-xs font-bold text-purple-700 font-mono">
                          {m.value}
                        </div>
                        <div className="text-[10px] text-slate-500 font-mono mt-0.5">
                          {m.label}
                        </div>
                      </div>
                    ))}
                  </div>

                  {/* Tags */}
                  <div className="flex flex-wrap gap-1.5 pt-2">
                    {FEATURED_SPANSTRIKE_PROJECT.tags.map((tag) => (
                      <span
                        key={tag}
                        className="px-3 py-1 rounded-full bg-purple-50 text-purple-700 text-xs font-mono font-medium border border-purple-100"
                      >
                        {tag}
                      </span>
                    ))}
                  </div>
                </div>

                {/* Right: Live SpanStrike Simulator */}
                <div className="lg:col-span-6">
                  <SpanStrikeSandbox />
                </div>
              </div>
            </GlassCard>
          </div>
        )}

        {/* 3. DEDICATED LIVE INTERACTIVE SANDBOXES TAB */}
        {activeTab === 'interactive' && (
          <div className="mb-16 space-y-6">
            <div className="p-6 rounded-3xl bg-white border border-indigo-100 shadow-xl">
              <div className="flex flex-wrap items-center justify-between gap-4 pb-6 border-b border-slate-100">
                <div>
                  <h3 className="text-xl font-extrabold text-slate-900">
                    Live Playable Project Sandboxes
                  </h3>
                  <p className="text-xs text-slate-500 font-mono mt-0.5">
                    Test the real algorithms and interactive logic created by Deepak N
                  </p>
                </div>

                {/* Mini Selector */}
                <div className="flex flex-wrap gap-2">
                  {[
                    { id: 'wellspring', label: 'Wellspring Health Lab', icon: HeartPulse, color: 'text-cyan-600' },
                    { id: 'spanstrike', label: 'SpanStrike 3D Game', icon: Gamepad2, color: 'text-purple-600' },
                    { id: 'rent', label: 'House Rent Calculator', icon: Calculator, color: 'text-amber-600' },
                    { id: 'fitnheal', label: 'FitNHeal Tracker', icon: Dumbbell, color: 'text-emerald-600' },
                    { id: 'healthline', label: 'Healthline Index', icon: Activity, color: 'text-blue-600' },
                  ].map((btn) => (
                    <button
                      key={btn.id}
                      onClick={() => setActiveInteractiveId(btn.id)}
                      className={`px-3.5 py-2 rounded-xl text-xs font-semibold flex items-center gap-1.5 transition-all cursor-pointer ${
                        activeInteractiveId === btn.id
                          ? 'bg-indigo-600 text-white shadow-md'
                          : 'bg-slate-100 text-slate-700 hover:bg-slate-200/80'
                      }`}
                    >
                      <btn.icon className="w-3.5 h-3.5" />
                      <span>{btn.label}</span>
                    </button>
                  ))}
                </div>
              </div>

              {/* Active Sandbox Viewport */}
              <div className="pt-6">
                {activeInteractiveId === 'wellspring' && <WellspringSandbox />}
                {activeInteractiveId === 'spanstrike' && <SpanStrikeSandbox />}
                {activeInteractiveId === 'rent' && <RentCalculatorSandbox />}
                {activeInteractiveId === 'fitnheal' && <FitNHealSandbox />}
                {activeInteractiveId === 'healthline' && <HealthlineSandbox />}
              </div>
            </div>
          </div>
        )}

        {/* 4. ALL RESUME PROJECTS GRID WITH INTERACTIVE CARDS */}
        <div>
          <h4 className="text-xl font-bold text-slate-900 mb-8 flex items-center gap-2">
            <Code2 className="w-5 h-5 text-indigo-600" />
            Verified Resume Projects & Implementations
          </h4>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {/* FitNHeal */}
            <TiltCard className="p-6 flex flex-col justify-between bg-white border border-emerald-100">
              <div>
                <div className="flex items-center justify-between mb-3">
                  <Badge variant="emerald" size="sm">
                    Health & Fitness • 2025
                  </Badge>
                  <span className="text-xs font-mono text-slate-400">HTML/CSS/JS</span>
                </div>
                <h4 className="text-xl font-bold text-slate-900 tracking-tight">
                  FitNHeal
                </h4>
                <p className="text-xs font-semibold text-emerald-600 mt-0.5 mb-3">
                  All-in-One Health & Fitness Platform
                </p>
                <p className="text-slate-600 text-sm leading-relaxed mb-4">
                  Built using HTML, CSS, and JavaScript. Provides interactive workout schedules, exercise guides, and habit tracking routines.
                </p>
                <div className="flex flex-wrap gap-1.5 mb-4">
                  {['HTML5', 'CSS3', 'JavaScript', 'DOM Engine', 'Fitness UX'].map((t) => (
                    <span key={t} className="px-2.5 py-0.5 rounded-md bg-emerald-50 text-emerald-700 text-xs font-mono">
                      {t}
                    </span>
                  ))}
                </div>
              </div>
              <div className="pt-4 border-t border-slate-100 flex items-center justify-between">
                <a
                  href="https://github.com/DeepakNandhakumar"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-1.5 text-xs font-medium text-slate-600 hover:text-emerald-600"
                >
                  <GithubIcon className="w-3.5 h-3.5" />
                  <span>GitHub</span>
                </a>
                <button
                  onClick={() => {
                    setActiveTab('interactive');
                    setActiveInteractiveId('fitnheal');
                  }}
                  className="inline-flex items-center gap-1 text-xs font-bold text-emerald-600 hover:text-emerald-700 cursor-pointer"
                >
                  <Play className="w-3 h-3" />
                  <span>Try Demo</span>
                </button>
              </div>
            </TiltCard>

            {/* Healthline Insights */}
            <TiltCard className="p-6 flex flex-col justify-between bg-white border border-blue-100">
              <div>
                <div className="flex items-center justify-between mb-3">
                  <Badge variant="primary" size="sm">
                    Wellness Analytics • 2024
                  </Badge>
                  <span className="text-xs font-mono text-slate-400">JS / Web</span>
                </div>
                <h4 className="text-xl font-bold text-slate-900 tracking-tight">
                  Healthline Insights
                </h4>
                <p className="text-xs font-semibold text-blue-600 mt-0.5 mb-3">
                  Holistic Wellness & Clinical Tools
                </p>
                <p className="text-slate-600 text-sm leading-relaxed mb-4">
                  Promotes holistic wellness through comprehensive verified health information, lifestyle metrics, and accessible calculation tools.
                </p>
                <div className="flex flex-wrap gap-1.5 mb-4">
                  {['JavaScript', 'HTML/CSS', 'Wellness Metrics', 'Preventive Care'].map((t) => (
                    <span key={t} className="px-2.5 py-0.5 rounded-md bg-blue-50 text-blue-700 text-xs font-mono">
                      {t}
                    </span>
                  ))}
                </div>
              </div>
              <div className="pt-4 border-t border-slate-100 flex items-center justify-between">
                <a
                  href="https://github.com/DeepakNandhakumar"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-1.5 text-xs font-medium text-slate-600 hover:text-blue-600"
                >
                  <GithubIcon className="w-3.5 h-3.5" />
                  <span>GitHub</span>
                </a>
                <button
                  onClick={() => {
                    setActiveTab('interactive');
                    setActiveInteractiveId('healthline');
                  }}
                  className="inline-flex items-center gap-1 text-xs font-bold text-blue-600 hover:text-blue-700 cursor-pointer"
                >
                  <Play className="w-3 h-3" />
                  <span>Try Demo</span>
                </button>
              </div>
            </TiltCard>

            {/* House Rent & Electricity Calculator */}
            <TiltCard className="p-6 flex flex-col justify-between bg-white border border-amber-100">
              <div>
                <div className="flex items-center justify-between mb-3">
                  <Badge variant="amber" size="sm">
                    Utility & Automation • 2023
                  </Badge>
                  <span className="text-xs font-mono text-slate-400">Team Project</span>
                </div>
                <h4 className="text-xl font-bold text-slate-900 tracking-tight">
                  House Rent & Electricity Bill Calculator
                </h4>
                <p className="text-xs font-semibold text-amber-600 mt-0.5 mb-3">
                  Utility Cost & Rent Apportioning
                </p>
                <p className="text-slate-600 text-sm leading-relaxed mb-4">
                  Collaborated on a team project to build a dedicated utility cost calculator for tiered electricity tariffs and automated flatmate rent splits.
                </p>
                <div className="flex flex-wrap gap-1.5 mb-4">
                  {['JavaScript', 'Tariff Algorithms', 'Math Automation', 'HTML5'].map((t) => (
                    <span key={t} className="px-2.5 py-0.5 rounded-md bg-amber-50 text-amber-700 text-xs font-mono">
                      {t}
                    </span>
                  ))}
                </div>
              </div>
              <div className="pt-4 border-t border-slate-100 flex items-center justify-between">
                <a
                  href="https://github.com/DeepakNandhakumar"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-1.5 text-xs font-medium text-slate-600 hover:text-amber-600"
                >
                  <GithubIcon className="w-3.5 h-3.5" />
                  <span>GitHub</span>
                </a>
                <button
                  onClick={() => {
                    setActiveTab('interactive');
                    setActiveInteractiveId('rent');
                  }}
                  className="inline-flex items-center gap-1 text-xs font-bold text-amber-600 hover:text-amber-700 cursor-pointer"
                >
                  <Play className="w-3 h-3" />
                  <span>Try Demo</span>
                </button>
              </div>
            </TiltCard>
          </div>
        </div>
      </Container>
    </section>
  );
};
