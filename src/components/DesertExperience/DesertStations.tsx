import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
  GraduationCap,
  Sparkles,
  Award,
  Gamepad2,
  HeartPulse,
  Calculator,
  Code2,
  Download,
  Mail,
  Phone,
  MapPin,
  ExternalLink,
  CheckCircle2,
  Star,
  ChevronRight,
  ChevronLeft,
  Briefcase,
  Play,
} from 'lucide-react';
import { LinkedinIcon, GithubIcon } from '../ui/Icons';
import { PERSONAL_INFO } from '../../data/personal';
import { ACHIEVEMENTS_LIST } from '../../data/achievements';
import { CERTIFICATIONS_DATA } from '../../data/certifications';
import { WellspringSandbox } from '../Projects/sandboxes/WellspringSandbox';
import { SpanStrikeSandbox } from '../Projects/sandboxes/SpanStrikeSandbox';
import { RentCalculatorSandbox } from '../Projects/sandboxes/RentCalculatorSandbox';
import { FitNHealSandbox } from '../Projects/sandboxes/FitNHealSandbox';
import { HealthlineSandbox } from '../Projects/sandboxes/HealthlineSandbox';

interface DesertStationsProps {
  activeStationIndex: number;
  onSelectStation: (index: number) => void;
  onOpenResume: () => void;
}

export const DesertStations: React.FC<DesertStationsProps> = ({
  activeStationIndex,
  onSelectStation,
  onOpenResume,
}) => {
  const [utilitySubTab, setUtilitySubTab] = useState<'rent' | 'fitnheal' | 'healthline'>('rent');

  return (
    <div className="relative w-full h-full pointer-events-none flex flex-col justify-between p-4 sm:p-8 lg:p-12 z-20">
      {/* Top Station Progress Navigation HUD */}
      <div className="w-full max-w-5xl mx-auto flex items-center justify-between pointer-events-auto bg-white/80 backdrop-blur-xl border border-slate-200/80 rounded-full px-4 sm:px-6 py-2.5 shadow-[0_8px_30px_rgb(0,0,0,0.04)]">
        <div className="flex items-center gap-2">
          <div className="w-7 h-7 rounded-full bg-gradient-to-tr from-indigo-600 to-cyan-500 text-white font-bold text-xs flex items-center justify-center shadow-xs">
            DN
          </div>
          <span className="text-xs font-bold text-slate-900 hidden sm:inline">
            Deepak N // Desert Odyssey
          </span>
        </div>

        {/* Milestone Station Markers */}
        <div className="flex items-center gap-1.5 sm:gap-2">
          {[
            { label: 'Origins (BCA 80%)', id: 0 },
            { label: 'Wellspring Health', id: 1 },
            { label: 'SpanStrike 3D', id: 2 },
            { label: 'Honors & Satya', id: 3 },
            { label: 'Utility Tools', id: 4 },
            { label: 'Oasis Finale', id: 5 },
          ].map((st) => (
            <button
              key={st.id}
              onClick={() => onSelectStation(st.id)}
              className={`px-2.5 sm:px-3 py-1 rounded-full text-[11px] font-mono transition-all cursor-pointer ${
                activeStationIndex === st.id
                  ? 'bg-indigo-600 text-white font-bold shadow-xs'
                  : 'bg-slate-100 text-slate-600 hover:bg-slate-200/80'
              }`}
            >
              <span className="sm:hidden">{st.id + 1}</span>
              <span className="hidden sm:inline">{st.label}</span>
            </button>
          ))}
        </div>

        {/* Quick Resume Action */}
        <button
          onClick={onOpenResume}
          className="inline-flex items-center gap-1 px-3 py-1 rounded-full bg-indigo-50 border border-indigo-200 text-indigo-700 text-xs font-semibold hover:bg-indigo-100 transition-colors cursor-pointer"
        >
          <Download className="w-3.5 h-3.5 text-indigo-600" />
          <span className="hidden sm:inline">Resume</span>
        </button>
      </div>

      {/* Main Alternating Panels Body */}
      <div className="w-full max-w-7xl mx-auto my-auto grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
        {/* STATION 0: ORIGINS & EDUCATION (Left Slide Panel) */}
        {activeStationIndex === 0 && (
          <motion.div
            key="station-0"
            initial={{ opacity: 0, x: -60 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -60 }}
            transition={{ type: 'spring', duration: 0.6, bounce: 0.15 }}
            className="lg:col-span-6 pointer-events-auto"
          >
            <div className="p-6 sm:p-8 rounded-3xl bg-white/95 backdrop-blur-xl border border-slate-200/90 shadow-2xl space-y-5">
              <div className="flex items-center justify-between border-b border-slate-100 pb-4">
                <div className="flex items-center gap-2.5">
                  <div className="w-9 h-9 rounded-xl bg-indigo-50 border border-indigo-100 flex items-center justify-center text-indigo-600">
                    <GraduationCap className="w-5 h-5" />
                  </div>
                  <div>
                    <h3 className="text-lg font-extrabold text-slate-900">
                      MILESTONE 01 // ORIGINS & ACADEMIC MERIT
                    </h3>
                    <p className="text-xs text-indigo-600 font-mono font-semibold">
                      TERF's Academy College of Arts & Science
                    </p>
                  </div>
                </div>
                <span className="px-3 py-1 rounded-full bg-indigo-600 text-white font-mono font-bold text-xs shadow-xs">
                  80% Merit
                </span>
              </div>

              <div className="space-y-3 text-xs text-slate-700">
                <div className="p-3.5 rounded-2xl bg-indigo-50/50 border border-indigo-100 space-y-1">
                  <div className="flex justify-between font-bold text-slate-900 text-sm">
                    <span>Bachelor of Computer Applications (BCA)</span>
                    <span className="text-indigo-700 font-mono">2023 — 2026</span>
                  </div>
                  <p className="text-slate-600 leading-relaxed">
                    Mastered core Object-Oriented Programming (Java & C++), MySQL Relational Architecture, Data Structures, Web Systems, and Agile Engineering.
                  </p>
                </div>

                <div className="p-3.5 rounded-2xl bg-slate-50 border border-slate-200 space-y-1">
                  <div className="flex justify-between font-bold text-slate-900 text-sm">
                    <span>HSC & SSLC (Computer Science & Maths)</span>
                    <span className="text-slate-500 font-mono">71% Score</span>
                  </div>
                  <p className="text-slate-600">
                    Annai Matric Hr Sec School (2021 — 2023). Strong analytical logic and mathematics foundation.
                  </p>
                </div>
              </div>

              {/* Core Skill Matrix */}
              <div>
                <span className="text-[11px] font-mono uppercase font-bold text-slate-400 block mb-2">
                  Verified Technical Proficiency:
                </span>
                <div className="flex flex-wrap gap-1.5 font-mono text-xs">
                  {['React (MERN)', 'Spring Boot', 'Java', 'Python', 'MySQL', 'C / C++', 'JavaScript', 'HTML/CSS', 'Unreal Engine'].map((sk) => (
                    <span
                      key={sk}
                      className="px-2.5 py-1 rounded-lg bg-slate-100 text-slate-800 border border-slate-200/80 font-medium"
                    >
                      • {sk}
                    </span>
                  ))}
                </div>
              </div>

              {/* Action Hint */}
              <div className="pt-2 flex items-center justify-between text-xs text-slate-500 font-mono border-t border-slate-100">
                <span>Swipe up / scroll to advance runner</span>
                <button
                  onClick={() => onSelectStation(1)}
                  className="text-indigo-600 font-bold hover:underline flex items-center gap-1 cursor-pointer"
                >
                  Next Station <ChevronRight className="w-3.5 h-3.5" />
                </button>
              </div>
            </div>
          </motion.div>
        )}

        {/* STATION 1: WELLSPRING HEALTH INTELLIGENCE (Right Slide Panel) */}
        {activeStationIndex === 1 && (
          <motion.div
            key="station-1"
            initial={{ opacity: 0, x: 60 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: 60 }}
            transition={{ type: 'spring', duration: 0.6, bounce: 0.15 }}
            className="lg:col-start-7 lg:col-span-6 pointer-events-auto"
          >
            <div className="p-6 sm:p-8 rounded-3xl bg-white/95 backdrop-blur-xl border border-cyan-200/90 shadow-2xl space-y-4">
              <div className="flex items-center justify-between border-b border-cyan-100 pb-3">
                <div className="flex items-center gap-2">
                  <div className="w-8 h-8 rounded-lg bg-cyan-600 text-white flex items-center justify-center">
                    <HeartPulse className="w-4 h-4" />
                  </div>
                  <div>
                    <h3 className="text-base font-extrabold text-slate-900">
                      MILESTONE 02 // WELLSPRING (2026)
                    </h3>
                    <p className="text-[11px] text-cyan-600 font-mono font-bold">
                      Preventive Health Intelligence • React + Spring Boot + MySQL
                    </p>
                  </div>
                </div>
                <span className="px-2.5 py-0.5 rounded-full bg-cyan-50 text-cyan-700 font-mono text-[11px] font-bold border border-cyan-200">
                  Flagship Build
                </span>
              </div>

              {/* Embedded Live Sandbox */}
              <WellspringSandbox />

              <div className="flex items-center justify-between pt-2 text-xs text-slate-500 font-mono border-t border-slate-100">
                <a
                  href="https://github.com/DeepakNandhakumar"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-cyan-700 font-bold hover:underline flex items-center gap-1"
                >
                  <GithubIcon className="w-3.5 h-3.5" /> Source Code
                </a>
                <button
                  onClick={() => onSelectStation(2)}
                  className="text-cyan-600 font-bold hover:underline flex items-center gap-1 cursor-pointer"
                >
                  SpanStrike 3D <ChevronRight className="w-3.5 h-3.5" />
                </button>
              </div>
            </div>
          </motion.div>
        )}

        {/* STATION 2: SPANSTRIKE UNREAL 3D GAME (Left Slide Panel) */}
        {activeStationIndex === 2 && (
          <motion.div
            key="station-2"
            initial={{ opacity: 0, x: -60 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -60 }}
            transition={{ type: 'spring', duration: 0.6, bounce: 0.15 }}
            className="lg:col-span-6 pointer-events-auto"
          >
            <div className="p-6 sm:p-8 rounded-3xl bg-slate-950 text-white border border-purple-800/80 shadow-2xl space-y-4">
              <div className="flex items-center justify-between border-b border-purple-900/40 pb-3">
                <div className="flex items-center gap-2">
                  <div className="w-8 h-8 rounded-lg bg-purple-600 text-white flex items-center justify-center">
                    <Gamepad2 className="w-4 h-4" />
                  </div>
                  <div>
                    <h3 className="text-base font-extrabold text-purple-300">
                      MILESTONE 03 // SPANSTRIKE 3D (2024)
                    </h3>
                    <p className="text-[11px] text-slate-400 font-mono">
                      Unreal Engine 5 Game Simulation • C++ & Physics
                    </p>
                  </div>
                </div>
                <span className="px-2.5 py-0.5 rounded-full bg-purple-950 text-purple-300 font-mono text-[11px] font-bold border border-purple-700">
                  Unreal 5
                </span>
              </div>

              {/* Embedded Live SpanStrike Sandbox */}
              <SpanStrikeSandbox />

              <div className="flex items-center justify-between pt-2 text-xs text-slate-400 font-mono border-t border-slate-900">
                <span>Click viewport above to fire particle cannon</span>
                <button
                  onClick={() => onSelectStation(3)}
                  className="text-purple-400 font-bold hover:underline flex items-center gap-1 cursor-pointer"
                >
                  Honors Vault <ChevronRight className="w-3.5 h-3.5" />
                </button>
              </div>
            </div>
          </motion.div>
        )}

        {/* STATION 3: GLOBAL HONORS & TROPHY VAULT (Right Slide Panel) */}
        {activeStationIndex === 3 && (
          <motion.div
            key="station-3"
            initial={{ opacity: 0, x: 60 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: 60 }}
            transition={{ type: 'spring', duration: 0.6, bounce: 0.15 }}
            className="lg:col-start-7 lg:col-span-6 pointer-events-auto"
          >
            <div className="p-6 sm:p-8 rounded-3xl bg-white/95 backdrop-blur-xl border border-amber-200 shadow-2xl space-y-4">
              <div className="flex items-center justify-between border-b border-amber-100 pb-3">
                <div className="flex items-center gap-2">
                  <div className="w-8 h-8 rounded-lg bg-amber-500 text-white flex items-center justify-center">
                    <Award className="w-4 h-4" />
                  </div>
                  <div>
                    <h3 className="text-base font-extrabold text-slate-900">
                      MILESTONE 04 // HONORS & RECOGNITION
                    </h3>
                    <p className="text-[11px] text-amber-700 font-mono font-bold">
                      Verified Competitive Coding & Leadership Awards
                    </p>
                  </div>
                </div>
                <span className="px-2.5 py-0.5 rounded-full bg-amber-50 text-amber-800 font-mono text-[11px] font-bold border border-amber-200">
                  8 Honors
                </span>
              </div>

              {/* Top 4 Highlights */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5 text-xs">
                <div className="p-3 rounded-xl bg-indigo-50/70 border border-indigo-200">
                  <span className="text-[10px] font-mono text-indigo-600 font-bold block">🌟 AI TOUR 2025</span>
                  <div className="font-bold text-slate-900 mt-0.5">Met Satya Nadella</div>
                  <p className="text-[11px] text-slate-600 mt-0.5">Attended Microsoft AI Tour conference</p>
                </div>

                <div className="p-3 rounded-xl bg-amber-50/70 border border-amber-200">
                  <span className="text-[10px] font-mono text-amber-700 font-bold block">🏆 1ST PRIZE 2025</span>
                  <div className="font-bold text-slate-900 mt-0.5">Code-Fiesta Champion</div>
                  <p className="text-[11px] text-slate-600 mt-0.5">1st place in algorithmic coding tournament</p>
                </div>

                <div className="p-3 rounded-xl bg-emerald-50/70 border border-emerald-200">
                  <span className="text-[10px] font-mono text-emerald-700 font-bold block">🥇 HACKERRANK 2024</span>
                  <div className="font-bold text-slate-900 mt-0.5">5-Star Gold Badge</div>
                  <p className="text-[11px] text-slate-600 mt-0.5">Problem solving & logic optimization</p>
                </div>

                <div className="p-3 rounded-xl bg-purple-50/70 border border-purple-200">
                  <span className="text-[10px] font-mono text-purple-700 font-bold block">🚀 TATA CHALLENGE</span>
                  <div className="font-bold text-slate-900 mt-0.5">Round 2 Qualifier</div>
                  <p className="text-[11px] text-slate-600 mt-0.5">Advanced nationally across 2024 & 2025</p>
                </div>
              </div>

              {/* Certifications Row */}
              <div className="p-3 rounded-xl bg-slate-50 border border-slate-200 text-xs">
                <span className="font-bold text-slate-800 block mb-1">Professional Certifications:</span>
                <p className="text-slate-600 font-mono text-[11px]">
                  LinkedIn Learning • TCS iON • Infosys Springboard • Microsoft Azure Cloud
                </p>
              </div>

              <div className="flex items-center justify-between pt-2 text-xs text-slate-500 font-mono border-t border-slate-100">
                <span>Discipline: 100% Attendance Award</span>
                <button
                  onClick={() => onSelectStation(4)}
                  className="text-amber-700 font-bold hover:underline flex items-center gap-1 cursor-pointer"
                >
                  Utility Tools <ChevronRight className="w-3.5 h-3.5" />
                </button>
              </div>
            </div>
          </motion.div>
        )}

        {/* STATION 4: INTERACTIVE UTILITY SUITE (Left Slide Panel) */}
        {activeStationIndex === 4 && (
          <motion.div
            key="station-4"
            initial={{ opacity: 0, x: -60 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -60 }}
            transition={{ type: 'spring', duration: 0.6, bounce: 0.15 }}
            className="lg:col-span-6 pointer-events-auto"
          >
            <div className="p-6 sm:p-8 rounded-3xl bg-white/95 backdrop-blur-xl border border-slate-200 shadow-2xl space-y-4">
              <div className="flex items-center justify-between border-b border-slate-100 pb-3">
                <div className="flex items-center gap-2">
                  <div className="w-8 h-8 rounded-lg bg-indigo-600 text-white flex items-center justify-center">
                    <Calculator className="w-4 h-4" />
                  </div>
                  <div>
                    <h3 className="text-base font-extrabold text-slate-900">
                      MILESTONE 05 // INTERACTIVE UTILITY SUITE
                    </h3>
                    <p className="text-[11px] text-indigo-600 font-mono font-semibold">
                      Live Algorithmic Tools Built by Deepak N
                    </p>
                  </div>
                </div>

                {/* Sub Tab Selector */}
                <div className="flex gap-1">
                  {[
                    { id: 'rent', label: 'Rent Split' },
                    { id: 'fitnheal', label: 'FitNHeal' },
                    { id: 'healthline', label: 'Healthline' },
                  ].map((tab) => (
                    <button
                      key={tab.id}
                      onClick={() => setUtilitySubTab(tab.id as any)}
                      className={`px-2 py-0.5 rounded-lg text-[10px] font-bold transition-colors cursor-pointer ${
                        utilitySubTab === tab.id
                          ? 'bg-indigo-600 text-white'
                          : 'bg-slate-100 text-slate-600 hover:bg-slate-200'
                      }`}
                    >
                      {tab.label}
                    </button>
                  ))}
                </div>
              </div>

              {/* Sub-tab viewports */}
              {utilitySubTab === 'rent' && <RentCalculatorSandbox />}
              {utilitySubTab === 'fitnheal' && <FitNHealSandbox />}
              {utilitySubTab === 'healthline' && <HealthlineSandbox />}

              <div className="flex items-center justify-between pt-2 text-xs text-slate-500 font-mono border-t border-slate-100">
                <span>3 Additional Resume Tools</span>
                <button
                  onClick={() => onSelectStation(5)}
                  className="text-indigo-600 font-bold hover:underline flex items-center gap-1 cursor-pointer"
                >
                  Oasis Hub <ChevronRight className="w-3.5 h-3.5" />
                </button>
              </div>
            </div>
          </motion.div>
        )}

        {/* STATION 5: GRAND OASIS FINALE & CONTACT (Center Grand Card) */}
        {activeStationIndex === 5 && (
          <motion.div
            key="station-5"
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.95 }}
            transition={{ type: 'spring', duration: 0.6, bounce: 0.15 }}
            className="lg:col-start-3 lg:col-span-8 pointer-events-auto"
          >
            <div className="p-6 sm:p-10 rounded-3xl bg-white/95 backdrop-blur-2xl border border-indigo-200 shadow-2xl space-y-6 text-center">
              <div>
                <span className="text-xs font-mono font-bold text-indigo-600 tracking-wider uppercase bg-indigo-50 px-3 py-1 rounded-full border border-indigo-100">
                  FINAL HORIZON // DESTINATION REACHED
                </span>
                <h2 className="text-2xl sm:text-4xl font-extrabold text-slate-900 tracking-tight mt-3">
                  Let's Build Extraordinary Systems Together.
                </h2>
                <p className="text-slate-600 text-xs sm:text-sm max-w-xl mx-auto mt-2 leading-relaxed">
                  Deepak N • BCA Graduate (80% Merit) & Software Engineer. Ready to engineer high-performance web systems and AI applications.
                </p>
              </div>

              {/* Quick Contact Chips */}
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 text-xs text-slate-700">
                <a
                  href={`tel:${PERSONAL_INFO.phone}`}
                  className="p-3.5 rounded-2xl bg-slate-50 hover:bg-slate-100 border border-slate-200/80 flex items-center justify-center gap-2 font-mono transition-colors"
                >
                  <Phone className="w-4 h-4 text-indigo-600" />
                  <span>{PERSONAL_INFO.phone}</span>
                </a>

                <a
                  href={`mailto:${PERSONAL_INFO.email}`}
                  className="p-3.5 rounded-2xl bg-slate-50 hover:bg-slate-100 border border-slate-200/80 flex items-center justify-center gap-2 font-mono transition-colors"
                >
                  <Mail className="w-4 h-4 text-indigo-600" />
                  <span className="truncate">{PERSONAL_INFO.email}</span>
                </a>

                <div className="p-3.5 rounded-2xl bg-slate-50 border border-slate-200/80 flex items-center justify-center gap-2 font-mono">
                  <MapPin className="w-4 h-4 text-indigo-600" />
                  <span>{PERSONAL_INFO.location}</span>
                </div>
              </div>

              {/* Action Buttons: Download Resume & Connect */}
              <div className="flex flex-wrap items-center justify-center gap-3 pt-2">
                <button
                  onClick={onOpenResume}
                  className="inline-flex items-center gap-2 px-6 py-3.5 rounded-full bg-indigo-600 hover:bg-indigo-700 text-white font-bold text-xs sm:text-sm shadow-md shadow-indigo-500/30 transition-all cursor-pointer"
                >
                  <Download className="w-4 h-4" />
                  <span>View & Download Verified Resume (PDF)</span>
                </button>

                <a
                  href={PERSONAL_INFO.linkedInUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 px-5 py-3.5 rounded-full bg-slate-100 hover:bg-slate-200 text-slate-800 font-semibold text-xs sm:text-sm transition-colors"
                >
                  <LinkedinIcon className="w-4 h-4 text-indigo-600" />
                  <span>LinkedIn</span>
                </a>

                <a
                  href={PERSONAL_INFO.gitHubUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 px-5 py-3.5 rounded-full bg-slate-100 hover:bg-slate-200 text-slate-800 font-semibold text-xs sm:text-sm transition-colors"
                >
                  <GithubIcon className="w-4 h-4 text-slate-800" />
                  <span>GitHub</span>
                </a>
              </div>

              <div className="text-[11px] font-mono text-slate-400 pt-2 border-t border-slate-100">
                © {new Date().getFullYear()} Deepak N. TERF's Academy College of Arts and Science.
              </div>
            </div>
          </motion.div>
        )}
      </div>

      {/* Bottom Trackpad Navigation Bar */}
      <div className="w-full max-w-5xl mx-auto flex items-center justify-between pointer-events-auto text-xs font-mono text-slate-500">
        <button
          onClick={() => onSelectStation(Math.max(0, activeStationIndex - 1))}
          disabled={activeStationIndex === 0}
          className="px-3 py-1.5 rounded-full bg-white/80 border border-slate-200 disabled:opacity-30 hover:bg-white text-slate-800 flex items-center gap-1 cursor-pointer"
        >
          <ChevronLeft className="w-3.5 h-3.5" /> Previous Milestone
        </button>

        <span className="hidden sm:inline">
          Station {activeStationIndex + 1} of 6 • Scroll on trackpad to travel
        </span>

        <button
          onClick={() => onSelectStation(Math.min(5, activeStationIndex + 1))}
          disabled={activeStationIndex === 5}
          className="px-3 py-1.5 rounded-full bg-white/80 border border-slate-200 disabled:opacity-30 hover:bg-white text-slate-800 flex items-center gap-1 cursor-pointer"
        >
          Next Milestone <ChevronRight className="w-3.5 h-3.5" />
        </button>
      </div>
    </div>
  );
};
