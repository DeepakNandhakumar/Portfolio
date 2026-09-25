import React, { useState, Suspense } from 'react';
import { Canvas } from '@react-three/fiber';
import { motion } from 'framer-motion';
import {
  Code,
  Terminal as TerminalIcon,
  Sparkles,
  Award,
  Layers,
  MapPin,
  Briefcase,
  GraduationCap,
  Download,
  FileText,
  Star,
  CheckCircle2,
} from 'lucide-react';
import { WorkstationScene } from '@/scenes/WorkstationScene';
import { SectionHeading } from '@/components/ui/SectionHeading';
import { GlassCard } from '@/components/ui/GlassCard';
import { Container } from '@/components/ui/Container';
import { AnimatedCounter } from '@/components/ui/AnimatedCounter';
import { PERSONAL_INFO, STATISTICS } from '@/data/personal';
import { fadeInUp, staggerContainer } from '@/animations/transitions';
import { useResponsive } from '@/hooks/useResponsive';

interface AboutProps {
  onOpenResume?: () => void;
}

export const About: React.FC<AboutProps> = ({ onOpenResume }) => {
  const { isMobile } = useResponsive();
  const [cliInput, setCliInput] = useState('');
  const [cliOutput, setCliOutput] = useState<string[]>([
    'Deepak N Interactive Shell v2.5 [Live]',
    'Type "help" or click a command button below to query credentials.',
  ]);

  const handleCommand = (cmd: string) => {
    const cleanCmd = cmd.trim().toLowerCase();
    const newOutput = [...cliOutput, `$ ${cmd}`];

    switch (cleanCmd) {
      case 'help':
        newOutput.push(
          'Available commands:',
          '  whoami       - Display candidate identity & contacts',
          '  education    - College & school credentials (80% BCA)',
          '  skills       - Core languages, frameworks & databases',
          '  projects     - Flagship applications (Wellspring, SpanStrike, etc.)',
          '  satya        - Details about Microsoft AI Tour meeting',
          '  resume       - Launch full verified curriculum vitae',
          '  clear        - Clear terminal console'
        );
        break;
      case 'whoami':
        newOutput.push(
          `Candidate: ${PERSONAL_INFO.name} (${PERSONAL_INFO.fullName})`,
          `Degree: ${PERSONAL_INFO.degree} (80% Merit)`,
          `Institution: ${PERSONAL_INFO.college}`,
          `Phone: ${PERSONAL_INFO.phone} | Email: ${PERSONAL_INFO.email}`,
          `Location: ${PERSONAL_INFO.location}`
        );
        break;
      case 'education':
        newOutput.push(
          '🎓 1. Bachelor of Computer Applications (BCA) — 80%',
          '     TERF’s Academy College of Arts and Science (2023 - 2026)',
          '     Key Focus: OOP (Java/C++), MySQL, Data Structures, Web Development',
          '🏫 2. HSC & SSLC — 71%',
          '     Annai Matric Hr Sec School (2021 - 2023)'
        );
        break;
      case 'skills':
        newOutput.push(
          '• Languages: C/C++, Java, Python, JavaScript, HTML, CSS, SQL',
          '• Web & Backend: React (MERN Stack), Spring Boot, RESTful APIs, Node.js',
          '• Database: MySQL Relational Engine, Indexing, Transactions',
          '• 3D & Gaming: Unreal Engine 5 (Physics, Blueprints, C++)',
          '• Problem Solving: HackerRank 5-Star Gold Badge'
        );
        break;
      case 'projects':
        newOutput.push(
          '1. Wellspring (2026) - Preventive Health Intelligence (React + Spring Boot + MySQL)',
          '2. SpanStrike (2024) - 3D Unreal Engine Game Simulation (C++ / Physics)',
          '3. FitNHeal (2025) - Health & Fitness Tracking Platform (HTML/CSS/JS)',
          '4. Healthline Insights (2024) - Holistic Wellness Analytics',
          '5. Rent & Electricity Calculator (2023) - Tiered Tariff Splitter Tool'
        );
        break;
      case 'satya':
        newOutput.push(
          '🌟 Microsoft AI Tour 2025:',
          'Attended the premier conference and had the honor of meeting Microsoft CEO Satya Nadella to discuss AI advancements.'
        );
        break;
      case 'resume':
        newOutput.push('Opening verified official resume modal...');
        onOpenResume?.();
        break;
      case 'clear':
        setCliOutput([]);
        setCliInput('');
        return;
      default:
        newOutput.push(`Command not recognized: "${cmd}". Type "help" for options.`);
    }

    setCliOutput(newOutput);
    setCliInput('');
  };

  return (
    <section id="about" className="relative w-full py-20 sm:py-28 bg-white">
      <Container size="lg">
        {/* Section Header */}
        <SectionHeading
          landmark="01 // ABOUT"
          title="About"
          highlight="Deepak N"
          subtitle="A look into my engineering background, verified academic credentials, and software building passion."
        />

        {/* Two-Column Main Layout */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-12 items-start">
          {/* Left Column: Story, Background & Statistics */}
          <motion.div
            variants={staggerContainer}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: '-60px' }}
            className="lg:col-span-6 flex flex-col gap-6"
          >
            {/* Core Bio Card */}
            <GlassCard className="p-6 sm:p-8">
              <div className="flex items-center gap-3 mb-4">
                <div className="w-10 h-10 rounded-xl bg-indigo-50 border border-indigo-100 flex items-center justify-center text-indigo-600">
                  <GraduationCap className="w-5 h-5" />
                </div>
                <div>
                  <h3 className="text-lg font-bold text-slate-900">
                    BCA Graduate & Software Builder
                  </h3>
                  <p className="text-xs text-slate-500 font-mono">
                    TERF's Academy College (80%) • Tirupur, Tamilnadu
                  </p>
                </div>
              </div>

              <p className="text-slate-700 leading-relaxed text-base font-normal">
                {PERSONAL_INFO.detailedAbout}
              </p>

              {/* Verified Badges & Resume CTA */}
              <div className="mt-6 pt-6 border-t border-slate-100 flex flex-wrap items-center justify-between gap-3">
                <div className="flex flex-wrap gap-2 text-xs font-mono">
                  <span className="px-3 py-1 rounded-full bg-indigo-50 text-indigo-700 border border-indigo-100 font-semibold">
                    ⭐ 80% BCA Score
                  </span>
                  <span className="px-3 py-1 rounded-full bg-amber-50 text-amber-700 border border-amber-100 font-semibold">
                    ★ 5-Star HackerRank
                  </span>
                  <span className="px-3 py-1 rounded-full bg-emerald-50 text-emerald-700 border border-emerald-100">
                    📍 Tirupur, TN
                  </span>
                </div>

                <button
                  onClick={onOpenResume}
                  className="inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-xl bg-slate-900 hover:bg-slate-800 text-white text-xs font-semibold shadow-sm transition-all cursor-pointer"
                >
                  <FileText className="w-3.5 h-3.5 text-cyan-400" />
                  <span>View Full Resume</span>
                </button>
              </div>
            </GlassCard>

            {/* Statistics Counters Grid */}
            <div className="grid grid-cols-2 gap-4">
              {STATISTICS.map((stat) => (
                <GlassCard key={stat.id} className="p-5 flex flex-col justify-between hover:border-indigo-200 transition-colors">
                  <div className="text-2xl sm:text-3xl font-extrabold text-indigo-600 font-mono tracking-tight">
                    <AnimatedCounter value={stat.value} suffix={stat.suffix} />
                  </div>
                  <div className="mt-2">
                    <div className="text-xs sm:text-sm font-semibold text-slate-800">
                      {stat.label}
                    </div>
                    <div className="text-[11px] text-slate-500 font-mono mt-0.5">
                      {stat.sublabel}
                    </div>
                  </div>
                </GlassCard>
              ))}
            </div>
          </motion.div>

          {/* Right Column: 3D Developer Workstation & Terminal Simulator */}
          <motion.div
            variants={fadeInUp}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: '-60px' }}
            className="lg:col-span-6 flex flex-col gap-6"
          >
            {/* 3D Workstation Canvas Window */}
            <div className="relative w-full h-[300px] sm:h-[340px] rounded-2xl bg-gradient-to-b from-slate-50 to-slate-100/80 border border-slate-200/80 shadow-[0_8px_30px_rgb(0,0,0,0.04)] overflow-hidden">
              <div className="absolute top-3 left-4 z-10 flex items-center gap-1.5">
                <span className="w-2.5 h-2.5 rounded-full bg-rose-400" />
                <span className="w-2.5 h-2.5 rounded-full bg-amber-400" />
                <span className="w-2.5 h-2.5 rounded-full bg-emerald-400" />
                <span className="ml-2 text-[11px] font-mono text-slate-500 font-medium">
                  Deepak's Developer Desk & 3D Terminal
                </span>
              </div>

              <Canvas
                shadows={!isMobile}
                camera={{ position: [0, 1.8, 3.8], fov: 42 }}
                gl={{ antialias: true, alpha: true }}
                className="w-full h-full"
              >
                <Suspense fallback={null}>
                  <WorkstationScene />
                </Suspense>
              </Canvas>
            </div>

            {/* Interactive Terminal Simulator Card */}
            <div className="rounded-2xl bg-slate-900 border border-slate-800 shadow-xl overflow-hidden text-slate-200 font-mono text-xs">
              {/* Terminal Titlebar */}
              <div className="flex items-center justify-between px-4 py-2.5 bg-slate-950/80 border-b border-slate-800">
                <div className="flex items-center gap-2">
                  <TerminalIcon className="w-3.5 h-3.5 text-cyan-400" />
                  <span className="text-[11px] text-slate-400">
                    terminal@deepak-workstation:~
                  </span>
                </div>
                <div className="flex flex-wrap items-center gap-1.5">
                  {['whoami', 'education', 'skills', 'projects', 'satya', 'resume'].map((cmd) => (
                    <button
                      key={cmd}
                      onClick={() => handleCommand(cmd)}
                      className="px-2 py-0.5 rounded bg-slate-800 hover:bg-slate-700 text-[10px] text-slate-300 hover:text-white transition-colors cursor-pointer"
                    >
                      {cmd}
                    </button>
                  ))}
                </div>
              </div>

              {/* Terminal Output Area */}
              <div className="p-4 max-h-44 overflow-y-auto space-y-1 scrollbar-thin scrollbar-thumb-slate-700">
                {cliOutput.map((line, idx) => (
                  <div
                    key={idx}
                    className={
                      line.startsWith('$')
                        ? 'text-cyan-400 font-bold'
                        : line.startsWith('•') || line.startsWith('🎓') || line.startsWith('🌟')
                        ? 'text-indigo-300 pl-1'
                        : 'text-slate-300'
                    }
                  >
                    {line}
                  </div>
                ))}
              </div>

              {/* Terminal Input Line */}
              <form
                onSubmit={(e) => {
                  e.preventDefault();
                  if (cliInput) handleCommand(cliInput);
                }}
                className="flex items-center gap-2 px-4 py-2.5 bg-slate-950 border-t border-slate-800/80"
              >
                <span className="text-emerald-400 font-bold">$</span>
                <input
                  type="text"
                  value={cliInput}
                  onChange={(e) => setCliInput(e.target.value)}
                  placeholder="type a command (e.g. whoami, education, skills, resume, help)..."
                  className="w-full bg-transparent text-slate-100 placeholder-slate-500 focus:outline-none text-xs"
                />
              </form>
            </div>
          </motion.div>
        </div>
      </Container>
    </section>
  );
};
