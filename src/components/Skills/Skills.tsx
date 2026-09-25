import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
  Code2,
  Atom,
  Server,
  Sparkles,
  Database,
  GitBranch,
  ArrowRight,
  Zap,
  CheckCircle2,
  Layers,
  Flame,
  Bot,
  Terminal,
  Coffee,
  Globe,
  Share2,
} from 'lucide-react';
import { SectionHeading } from '@/components/ui/SectionHeading';
import { GlassCard } from '@/components/ui/GlassCard';
import { Container } from '@/components/ui/Container';
import { Badge } from '@/components/ui/Badge';
import { SKILL_GROUPS, type SkillItem, type SkillGroup } from '@/data/skills';
import { PERSONAL_INFO } from '@/data/personal';
import { fadeInUp, staggerContainer } from '@/animations/transitions';

export const Skills: React.FC = () => {
  const [selectedGroupId, setSelectedGroupId] = useState<string>('all');
  const [activeSkill, setActiveSkill] = useState<SkillItem>(SKILL_GROUPS[0].skills[0]);

  // Flattened or filtered skills
  const filteredSkills =
    selectedGroupId === 'all'
      ? SKILL_GROUPS.flatMap((g) => g.skills)
      : SKILL_GROUPS.find((g) => g.id === selectedGroupId)?.skills || [];

  return (
    <section id="skills" className="relative w-full py-20 sm:py-28 bg-slate-50/50">
      <Container size="lg">
        {/* Section Heading */}
        <SectionHeading
          landmark="02 // SKILLS"
          title="My Technology"
          highlight="Stack"
          subtitle="An interconnected ecosystem of languages, frontend systems, backend frameworks, and AI workflows."
        />

        {/* Category Filter Tabs */}
        <div className="flex items-center justify-center flex-wrap gap-2 mb-12">
          <button
            onClick={() => setSelectedGroupId('all')}
            className={`px-4 py-2 rounded-full text-xs font-medium transition-all duration-200 cursor-pointer ${
              selectedGroupId === 'all'
                ? 'bg-indigo-600 text-white shadow-md shadow-indigo-500/25'
                : 'bg-white text-slate-600 border border-slate-200/80 hover:bg-slate-100'
            }`}
          >
            All Technologies
          </button>
          {SKILL_GROUPS.map((group) => {
            const isActive = selectedGroupId === group.id;
            return (
              <button
                key={group.id}
                onClick={() => setSelectedGroupId(group.id)}
                className={`px-4 py-2 rounded-full text-xs font-medium transition-all duration-200 cursor-pointer ${
                  isActive
                    ? 'bg-indigo-600 text-white shadow-md shadow-indigo-500/25'
                    : 'bg-white text-slate-600 border border-slate-200/80 hover:bg-slate-100'
                }`}
              >
                {group.label}
              </button>
            );
          })}
        </div>

        {/* Ecosystem Grid & Interactive Detail Panel */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          {/* Skills Grid (8 cols) */}
          <motion.div
            variants={staggerContainer}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: '-60px' }}
            className="lg:col-span-8 grid grid-cols-2 sm:grid-cols-3 gap-3.5"
          >
            {filteredSkills.map((skill) => {
              const isSelected = activeSkill.id === skill.id;
              return (
                <motion.button
                  key={skill.id}
                  onClick={() => setActiveSkill(skill)}
                  onMouseEnter={() => setActiveSkill(skill)}
                  variants={fadeInUp}
                  className={`flex flex-col items-start p-4 rounded-2xl text-left transition-all duration-200 cursor-pointer ${
                    isSelected
                      ? 'bg-white border-2 border-indigo-500 shadow-[0_12px_28px_rgba(79,70,229,0.12)] scale-[1.02]'
                      : 'bg-white/80 backdrop-blur-md border border-slate-200/80 hover:border-slate-300 hover:bg-white shadow-2xs'
                  }`}
                >
                  <div className="flex items-center justify-between w-full mb-2">
                    <span className="text-[10px] font-mono uppercase tracking-wider text-slate-400">
                      {skill.category}
                    </span>
                    {isSelected && (
                      <span className="w-2 h-2 rounded-full bg-indigo-600 animate-pulse" />
                    )}
                  </div>
                  <h4 className="text-sm font-bold text-slate-900">{skill.name}</h4>
                  <p className="mt-1 text-xs text-slate-500 line-clamp-2 leading-relaxed">
                    {skill.description}
                  </p>
                </motion.button>
              );
            })}
          </motion.div>

          {/* Active Skill Dynamic Detail Card (4 cols) */}
          <div className="lg:col-span-4 sticky top-28">
            <AnimatePresence mode="wait">
              <motion.div
                key={activeSkill.id}
                initial={{ opacity: 0, y: 15 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -15 }}
                transition={{ duration: 0.25 }}
              >
                <GlassCard className="p-6 border-indigo-100 shadow-xl bg-gradient-to-b from-white via-white to-indigo-50/20">
                  {/* Category Chip */}
                  <div className="flex items-center justify-between mb-4">
                    <Badge variant="primary" size="md">
                      {activeSkill.category.toUpperCase()}
                    </Badge>
                    <span className="text-xs font-mono text-slate-400">Deepak's Stack</span>
                  </div>

                  {/* Title & Full Description */}
                  <h3 className="text-xl font-bold text-slate-900 tracking-tight">
                    {activeSkill.name}
                  </h3>
                  <p className="mt-3 text-sm text-slate-600 leading-relaxed">
                    {activeSkill.description}
                  </p>

                  {/* Interconnected Technologies */}
                  <div className="mt-6 pt-5 border-t border-slate-100">
                    <h5 className="text-xs font-mono font-semibold uppercase tracking-wider text-slate-500 mb-2.5 flex items-center gap-1.5">
                      <Zap className="w-3.5 h-3.5 text-indigo-600" />
                      Interconnected Skills
                    </h5>
                    <div className="flex flex-wrap gap-1.5">
                      {activeSkill.relatedTechs.map((tech) => (
                        <span
                          key={tech}
                          className="px-2.5 py-1 rounded-lg bg-indigo-50/80 border border-indigo-100 text-indigo-700 text-xs font-medium"
                        >
                          {tech}
                        </span>
                      ))}
                    </div>
                  </div>

                  {/* Applied In Projects */}
                  <div className="mt-5 pt-4 border-t border-slate-100">
                    <h5 className="text-xs font-mono font-semibold uppercase tracking-wider text-slate-500 mb-2.5 flex items-center gap-1.5">
                      <Layers className="w-3.5 h-3.5 text-cyan-600" />
                      Applied in Projects
                    </h5>
                    <div className="flex flex-wrap gap-1.5">
                      {activeSkill.relatedProjects.map((proj) => (
                        <span
                          key={proj}
                          className="px-2.5 py-1 rounded-lg bg-slate-100 text-slate-700 text-xs font-medium"
                        >
                          {proj}
                        </span>
                      ))}
                    </div>
                  </div>
                </GlassCard>
              </motion.div>
            </AnimatePresence>
          </div>
        </div>
      </Container>
    </section>
  );
};
