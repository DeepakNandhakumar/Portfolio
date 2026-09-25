import React from 'react';
import { motion } from 'framer-motion';
import { cn } from '@/utils/helpers';
import { fadeInUp } from '@/animations/transitions';

interface SectionHeadingProps {
  badge?: string;
  landmark?: string;
  title: string;
  highlight?: string;
  subtitle?: string;
  align?: 'left' | 'center' | 'right';
  className?: string;
}

export const SectionHeading: React.FC<SectionHeadingProps> = ({
  badge,
  landmark,
  title,
  highlight,
  subtitle,
  align = 'center',
  className,
}) => {
  const alignmentClasses = {
    left: 'text-left items-start',
    center: 'text-center items-center',
    right: 'text-right items-end',
  };

  return (
    <motion.div
      variants={fadeInUp}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, margin: '-60px' }}
      className={cn('flex flex-col mb-12 sm:mb-16', alignmentClasses[align], className)}
    >
      {/* Category / Landmark pill */}
      {(badge || landmark) && (
        <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-slate-100/90 border border-slate-200/80 text-xs font-mono font-medium text-slate-700 mb-4 shadow-2xs">
          <span className="w-2 h-2 rounded-full bg-indigo-600 animate-pulse" />
          {landmark && <span className="text-indigo-600 font-semibold">{landmark}</span>}
          {badge && <span>{badge}</span>}
        </div>
      )}

      {/* Main Heading with Highlight */}
      <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold tracking-tight text-slate-900 leading-[1.15]">
        {title}{' '}
        {highlight && (
          <span className="bg-gradient-to-r from-indigo-600 via-purple-600 to-cyan-600 bg-clip-text text-transparent">
            {highlight}
          </span>
        )}
      </h2>

      {/* Subtitle */}
      {subtitle && (
        <p className="mt-4 text-base sm:text-lg text-slate-600 max-w-2xl font-normal leading-relaxed">
          {subtitle}
        </p>
      )}

      {/* Subtle Divider Line */}
      <div
        className={cn(
          'mt-6 h-[2px] w-16 bg-gradient-to-r from-indigo-500 via-purple-500 to-cyan-500 rounded-full',
          align === 'center' && 'mx-auto'
        )}
      />
    </motion.div>
  );
};
