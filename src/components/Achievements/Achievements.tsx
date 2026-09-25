import React, { useState } from 'react';
import { motion } from 'framer-motion';
import {
  Sparkles,
  Trophy,
  Award,
  Users,
  Medal,
  Flame,
  Code2,
  CheckCircle2,
  Star,
  ExternalLink,
  ShieldCheck,
  BookOpen,
  Cloud,
  Zap,
} from 'lucide-react';
import { SectionHeading } from '@/components/ui/SectionHeading';
import { GlassCard } from '@/components/ui/GlassCard';
import { Container } from '@/components/ui/Container';
import { Badge } from '@/components/ui/Badge';
import { ACHIEVEMENTS_LIST } from '@/data/achievements';
import { CERTIFICATIONS_DATA } from '@/data/certifications';
import { fadeInUp, staggerContainer } from '@/animations/transitions';

const iconMap: Record<string, React.ReactNode> = {
  Sparkles: <Sparkles className="w-5 h-5 text-indigo-600" />,
  Trophy: <Trophy className="w-5 h-5 text-amber-500" />,
  Award: <Award className="w-5 h-5 text-yellow-600" />,
  Users: <Users className="w-5 h-5 text-cyan-600" />,
  Medal: <Medal className="w-5 h-5 text-purple-600" />,
  Flame: <Flame className="w-5 h-5 text-rose-500" />,
  Code2: <Code2 className="w-5 h-5 text-blue-600" />,
  CheckCircle2: <CheckCircle2 className="w-5 h-5 text-emerald-600" />,
  Star: <Star className="w-5 h-5 text-amber-500 fill-amber-400" />,
  ShieldCheck: <ShieldCheck className="w-5 h-5 text-emerald-600" />,
  BookOpen: <BookOpen className="w-5 h-5 text-blue-600" />,
  Cloud: <Cloud className="w-5 h-5 text-cyan-600" />,
  Zap: <Zap className="w-5 h-5 text-amber-500" />,
};

export const Achievements: React.FC = () => {
  const [activeTab, setActiveTab] = useState<'achievements' | 'certifications'>('achievements');

  return (
    <section id="achievements" className="relative w-full py-20 sm:py-28 bg-white">
      <Container size="lg">
        {/* Section Heading */}
        <SectionHeading
          landmark="05 // HONORS & CREDENTIALS"
          title="Achievements &"
          highlight="Certifications"
          subtitle="Verified honors, competitive coding championships, and professional certifications."
        />

        {/* Tab Switcher */}
        <div className="flex items-center justify-center gap-2 mb-12">
          <button
            onClick={() => setActiveTab('achievements')}
            className={`px-5 py-2.5 rounded-full text-xs font-semibold transition-all cursor-pointer ${
              activeTab === 'achievements'
                ? 'bg-indigo-600 text-white shadow-md shadow-indigo-500/25'
                : 'bg-slate-100 text-slate-600 hover:bg-slate-200/80'
            }`}
          >
            🏆 Verified Achievements (8 Honors)
          </button>
          <button
            onClick={() => setActiveTab('certifications')}
            className={`px-5 py-2.5 rounded-full text-xs font-semibold transition-all cursor-pointer ${
              activeTab === 'certifications'
                ? 'bg-indigo-600 text-white shadow-md shadow-indigo-500/25'
                : 'bg-slate-100 text-slate-600 hover:bg-slate-200/80'
            }`}
          >
            📜 Certifications & Problem Solving
          </button>
        </div>

        {/* Achievements Grid */}
        {activeTab === 'achievements' && (
          <motion.div
            variants={staggerContainer}
            initial="hidden"
            animate="visible"
            className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6"
          >
            {ACHIEVEMENTS_LIST.map((item) => {
              const isVIP = item.id === 'satya-nadella' || item.id === 'code-fiesta' || item.id === 'hackerrank-gold';
              return (
                <motion.div key={item.id} variants={fadeInUp}>
                  <GlassCard
                    className={`p-6 h-full flex flex-col justify-between transition-all hover:-translate-y-1 hover:shadow-xl ${
                      isVIP
                        ? 'border-indigo-300/80 bg-gradient-to-b from-indigo-50/30 via-white to-white shadow-md'
                        : 'border-slate-200/90 shadow-xs'
                    }`}
                  >
                    <div>
                      <div className="flex items-center justify-between mb-4">
                        <div className="w-10 h-10 rounded-xl bg-white border border-slate-200/80 shadow-xs flex items-center justify-center">
                          {iconMap[item.iconName] || <Award className="w-5 h-5 text-indigo-600" />}
                        </div>
                        <span className="text-xs font-mono font-bold text-indigo-600 bg-indigo-50 px-2 py-0.5 rounded">
                          {item.year}
                        </span>
                      </div>

                      <Badge variant={isVIP ? 'primary' : 'secondary'} size="sm" className="mb-2.5">
                        {item.badge}
                      </Badge>

                      <h4 className="text-sm sm:text-base font-bold text-slate-900 leading-snug">
                        {item.title}
                      </h4>

                      <p className="mt-2 text-xs text-slate-600 leading-relaxed">
                        {item.description}
                      </p>
                    </div>

                    <div className="mt-5 pt-3 border-t border-slate-100 flex items-center justify-between text-[11px] font-mono text-slate-400">
                      <span>Category:</span>
                      <span className="font-semibold text-slate-700">{item.category}</span>
                    </div>
                  </GlassCard>
                </motion.div>
              );
            })}
          </motion.div>
        )}

        {/* Certifications & Problem Solving Grid */}
        {activeTab === 'certifications' && (
          <motion.div
            variants={staggerContainer}
            initial="hidden"
            animate="visible"
            className="grid grid-cols-1 md:grid-cols-2 gap-8"
          >
            {CERTIFICATIONS_DATA.map((cat, idx) => (
              <div
                key={idx}
                className="p-6 rounded-3xl bg-slate-50/70 border border-slate-200 shadow-sm space-y-4"
              >
                <div className="flex items-center gap-2 pb-3 border-b border-slate-200">
                  <span className="w-2.5 h-2.5 rounded-full bg-indigo-600" />
                  <h3 className="text-sm font-extrabold text-slate-900 uppercase tracking-wider">
                    {cat.category}
                  </h3>
                </div>

                <div className="space-y-3">
                  {cat.items.map((item, cIdx) => (
                    <div
                      key={cIdx}
                      className="p-3.5 rounded-2xl bg-white border border-slate-200/80 flex items-start justify-between gap-3 shadow-2xs hover:border-indigo-200 transition-colors"
                    >
                      <div className="flex items-start gap-3">
                        <div className="w-8 h-8 rounded-lg bg-indigo-50 border border-indigo-100 flex items-center justify-center shrink-0 mt-0.5">
                          {iconMap[item.icon] || <ShieldCheck className="w-4 h-4 text-indigo-600" />}
                        </div>
                        <div>
                          <div className="font-bold text-xs text-slate-900 flex items-center gap-2">
                            <span>{item.name}</span>
                            {item.badge && (
                              <span className="text-[10px] font-mono px-2 py-0.2 rounded-full bg-indigo-50 text-indigo-700 font-semibold border border-indigo-100">
                                {item.badge}
                              </span>
                            )}
                          </div>
                          <p className="text-[11px] text-slate-600 mt-0.5 leading-relaxed">
                            {item.description}
                          </p>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            ))}
          </motion.div>
        )}
      </Container>
    </section>
  );
};
