import React from 'react';
import { motion } from 'framer-motion';
import {
  Code2,
  Sparkles,
  Cpu,
  Database,
  Network,
  Layers,
  ArrowRight,
  CheckCircle2,
} from 'lucide-react';
import { SectionHeading } from '@/components/ui/SectionHeading';
import { TiltCard } from '@/components/ui/TiltCard';
import { Container } from '@/components/ui/Container';
import { SERVICES_LIST, type ServiceCard } from '@/data/services';
import { fadeInUp, staggerContainer } from '@/animations/transitions';
import { scrollToSection } from '@/utils/helpers';

const iconMap: Record<string, React.ReactNode> = {
  Code2: <Code2 className="w-5 h-5 text-indigo-600" />,
  Sparkles: <Sparkles className="w-5 h-5 text-purple-600" />,
  Cpu: <Cpu className="w-5 h-5 text-cyan-600" />,
  Database: <Database className="w-5 h-5 text-emerald-600" />,
  Network: <Network className="w-5 h-5 text-blue-600" />,
  Layers: <Layers className="w-5 h-5 text-amber-600" />,
};

export const Services: React.FC = () => {
  return (
    <section id="services" className="relative w-full py-20 sm:py-28 bg-slate-50/50">
      <Container size="lg">
        {/* Section Heading */}
        <SectionHeading
          landmark="06 // SERVICES"
          title="What I"
          highlight="Build"
          subtitle="Engineering capabilities tailored for scalable software, AI systems, and robust data pipelines."
        />

        {/* 6 Services Grid */}
        <motion.div
          variants={staggerContainer}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: '-60px' }}
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"
        >
          {SERVICES_LIST.map((service) => (
            <motion.div key={service.id} variants={fadeInUp}>
              <TiltCard className="p-7 h-full flex flex-col justify-between bg-white border-slate-200/90 shadow-sm hover:shadow-xl transition-all">
                <div>
                  {/* Icon & Category Pill */}
                  <div className="flex items-center justify-between mb-5">
                    <div className="w-12 h-12 rounded-2xl bg-slate-50 border border-slate-200/80 flex items-center justify-center">
                      {iconMap[service.iconName] || <Code2 className="w-5 h-5 text-indigo-600" />}
                    </div>
                    <span className="text-[10px] font-mono uppercase tracking-wider text-slate-400">
                      Deepak N.
                    </span>
                  </div>

                  {/* Title & Subtitle */}
                  <h4 className="text-xl font-bold text-slate-900 tracking-tight">
                    {service.title}
                  </h4>
                  <p className="text-xs font-semibold text-indigo-600 mt-1 mb-3">
                    {service.subtitle}
                  </p>

                  {/* Description */}
                  <p className="text-sm text-slate-600 leading-relaxed mb-6 font-normal">
                    {service.description}
                  </p>

                  {/* Capabilities List */}
                  <div className="space-y-2 pt-2">
                    {service.capabilities.map((cap, cIdx) => (
                      <div
                        key={cIdx}
                        className="flex items-start gap-2 text-xs text-slate-700 leading-relaxed"
                      >
                        <CheckCircle2 className="w-3.5 h-3.5 text-indigo-500 shrink-0 mt-0.5" />
                        <span>{cap}</span>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Bottom CTA */}
                <div className="mt-8 pt-5 border-t border-slate-100 flex items-center justify-between">
                  <button
                    onClick={() => scrollToSection('#contact', 80)}
                    className="inline-flex items-center gap-1.5 text-xs font-semibold text-indigo-600 hover:text-indigo-700 group cursor-pointer"
                  >
                    <span>Discuss Requirements</span>
                    <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-1 transition-transform" />
                  </button>
                </div>
              </TiltCard>
            </motion.div>
          ))}
        </motion.div>
      </Container>
    </section>
  );
};
