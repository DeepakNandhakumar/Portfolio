import React from 'react';
import { motion, type HTMLMotionProps } from 'framer-motion';
import { cn } from '@/utils/helpers';

interface GlassCardProps extends HTMLMotionProps<'div'> {
  className?: string;
  hoverEffect?: boolean;
  borderGlow?: boolean;
  children: React.ReactNode;
}

export const GlassCard: React.FC<GlassCardProps> = ({
  className,
  hoverEffect = true,
  borderGlow = false,
  children,
  ...props
}) => {
  return (
    <motion.div
      whileHover={hoverEffect ? { y: -4, transition: { duration: 0.25, ease: 'easeOut' } } : undefined}
      className={cn(
        'relative rounded-2xl bg-white/80 backdrop-blur-xl border border-slate-200/80 shadow-[0_8px_30px_rgb(0,0,0,0.04)] transition-all duration-300',
        hoverEffect && 'hover:shadow-[0_20px_40px_rgba(79,70,229,0.08)] hover:border-slate-300/90',
        borderGlow && 'before:absolute before:inset-0 before:-z-10 before:rounded-2xl before:p-[1px] before:bg-gradient-to-r before:from-indigo-500/20 before:via-purple-500/20 before:to-cyan-500/20',
        className
      )}
      {...props}
    >
      {children}
    </motion.div>
  );
};
