import React from 'react';
import { motion } from 'framer-motion';
import {
  Briefcase,
  GraduationCap,
  Calendar,
  MapPin,
  CheckCircle2,
  Sparkles,
  ArrowRight,
  Compass,
} from 'lucide-react';
import { SectionHeading } from '@/components/ui/SectionHeading';
import { GlassCard } from '@/components/ui/GlassCard';
import { Container } from '@/components/ui/Container';
import { Badge } from '@/components/ui/Badge';
import { EXPERIENCES } from '@/data/experience';
import { fadeInUp, staggerContainer } from '@/animations/transitions';

export const Experience: React.FC = () => {
  return (
    <section id="experience" className="relative w-full py-20 sm:py-28 bg-white">
      <Container size="lg">
        {/* Section Heading */}
        <SectionHeading
          landmark="03 // JOURNEY"
          title="Engineering"
          highlight="Journey"
          subtitle="Milestones, professional roles, and academic foundations along the road."
        />

        {/* Timeline Road Layout */}
        <div className="relative max-w-4xl mx-auto">
          {/* Central Vertical Road Guide Line */}
          <div className="absolute left-4 sm:left-1/2 top-4 bottom-4 -translate-x-1/2 w-1 bg-gradient-to-b from-indigo-500 via-purple-500 to-cyan-500 rounded-full opacity-30" />

          <motion.div
            variants={staggerContainer}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: '-60px' }}
            className="flex flex-col gap-10 sm:gap-14"
          >
            {EXPERIENCES.map((exp, idx) => {
              const isEven = idx % 2 === 0;
              return (
                <motion.div
                  key={exp.id}
                  variants={fadeInUp}
                  className={`relative flex flex-col sm:flex-row items-start ${
                    isEven ? 'sm:flex-row-reverse' : ''
                  } gap-6 sm:gap-12 pl-10 sm:pl-0`}
                >
                  {/* Road Center Node Pin */}
                  <div className="absolute left-4 sm:left-1/2 -translate-x-1/2 top-6 w-8 h-8 rounded-full bg-white border-4 border-indigo-600 shadow-md flex items-center justify-center z-10">
                    <span className="w-2 h-2 rounded-full bg-indigo-600" />
                  </div>

                  {/* Content Card (Half Width on Desktop) */}
                  <div className="w-full sm:w-[calc(50%-2rem)]">
                    <GlassCard className="p-6 sm:p-7 border-slate-200/90 shadow-md">
                      {/* Top Header info */}
                      <div className="flex items-center justify-between flex-wrap gap-2 mb-3">
                        <Badge
                          variant={exp.type === 'Full-Time' ? 'primary' : 'cyan'}
                          size="md"
                        >
                          {exp.badge}
                        </Badge>
                        <div className="flex items-center gap-1.5 text-xs font-mono text-slate-500">
                          <Calendar className="w-3.5 h-3.5 text-indigo-500" />
                          <span>{exp.period}</span>
                        </div>
                      </div>

                      {/* Role & Company */}
                      <h3 className="text-xl font-bold text-slate-900 tracking-tight">
                        {exp.role}
                      </h3>
                      <div className="flex items-center gap-2 text-sm font-semibold text-indigo-600 mt-1">
                        <span>{exp.organization}</span>
                        <span className="text-slate-300">•</span>
                        <span className="text-xs font-normal text-slate-500 flex items-center gap-1">
                          <MapPin className="w-3 h-3" />
                          {exp.location}
                        </span>
                      </div>

                      {/* Summary */}
                      <p className="mt-3 text-sm text-slate-600 leading-relaxed font-normal">
                        {exp.summary}
                      </p>

                      {/* Key Responsibilities / Bullets */}
                      <div className="mt-4 space-y-2">
                        {exp.responsibilities.map((resp, rIdx) => (
                          <div
                            key={rIdx}
                            className="flex items-start gap-2 text-xs text-slate-700 leading-relaxed"
                          >
                            <CheckCircle2 className="w-3.5 h-3.5 text-emerald-500 shrink-0 mt-0.5" />
                            <span>{resp}</span>
                          </div>
                        ))}
                      </div>

                      {/* Technologies Pills */}
                      <div className="mt-5 pt-4 border-t border-slate-100 flex flex-wrap gap-1.5">
                        {exp.technologies.map((tech) => (
                          <span
                            key={tech}
                            className="px-2.5 py-0.5 rounded-md bg-slate-100 text-slate-700 text-[11px] font-mono font-medium"
                          >
                            {tech}
                          </span>
                        ))}
                      </div>
                    </GlassCard>
                  </div>

                  {/* Spacer for Desktop Grid alignment */}
                  <div className="hidden sm:block w-[calc(50%-2rem)]" />
                </motion.div>
              );
            })}
          </motion.div>
        </div>
      </Container>
    </section>
  );
};
