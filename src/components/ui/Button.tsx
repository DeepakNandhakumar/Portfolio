import React, { useRef, useState } from 'react';
import { motion } from 'framer-motion';
import { cn } from '@/utils/helpers';

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: 'primary' | 'secondary' | 'outline' | 'ghost' | 'glow';
  size?: 'sm' | 'md' | 'lg';
  isMagnetic?: boolean;
  leftIcon?: React.ReactNode;
  rightIcon?: React.ReactNode;
  children: React.ReactNode;
}

export const Button: React.FC<ButtonProps> = ({
  variant = 'primary',
  size = 'md',
  isMagnetic = false,
  leftIcon,
  rightIcon,
  className,
  children,
  ...props
}) => {
  const buttonRef = useRef<HTMLButtonElement>(null);
  const [position, setPosition] = useState({ x: 0, y: 0 });

  const handleMouseMove = (e: React.MouseEvent<HTMLButtonElement>) => {
    if (!isMagnetic || !buttonRef.current) return;
    const { clientX, clientY } = e;
    const { left, top, width, height } = buttonRef.current.getBoundingClientRect();
    const x = (clientX - (left + width / 2)) * 0.25;
    const y = (clientY - (top + height / 2)) * 0.25;
    setPosition({ x, y });
  };

  const handleMouseLeave = () => {
    if (!isMagnetic) return;
    setPosition({ x: 0, y: 0 });
  };

  const baseStyles = 'relative inline-flex items-center justify-center font-medium rounded-full transition-all duration-300 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-indigo-500 focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 select-none cursor-pointer';

  const sizeStyles = {
    sm: 'text-xs px-3.5 py-1.5 gap-1.5',
    md: 'text-sm px-5 py-2.5 gap-2',
    lg: 'text-base px-7 py-3.5 gap-2.5',
  };

  const variantStyles = {
    primary:
      'bg-indigo-600 text-white shadow-md shadow-indigo-500/20 hover:bg-indigo-700 hover:shadow-lg hover:shadow-indigo-500/30 active:scale-[0.98]',
    secondary:
      'bg-slate-900 text-white shadow-md shadow-slate-900/15 hover:bg-slate-800 hover:shadow-lg active:scale-[0.98]',
    outline:
      'bg-white/80 backdrop-blur-md text-slate-800 border border-slate-200/90 shadow-sm hover:bg-slate-50/90 hover:border-slate-300 active:scale-[0.98]',
    ghost:
      'bg-transparent text-slate-700 hover:bg-slate-100 hover:text-slate-900 active:scale-[0.98]',
    glow:
      'bg-gradient-to-r from-indigo-600 via-purple-600 to-cyan-500 text-white shadow-lg shadow-indigo-500/25 hover:shadow-indigo-500/40 hover:scale-[1.02] active:scale-[0.98]',
  };

  return (
    <motion.button
      ref={buttonRef}
      animate={{ x: position.x, y: position.y }}
      transition={{ type: 'spring', stiffness: 250, damping: 18, mass: 0.5 }}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      className={cn(baseStyles, sizeStyles[size], variantStyles[variant], className)}
      {...(props as any)}
    >
      {leftIcon && <span className="inline-flex shrink-0">{leftIcon}</span>}
      <span>{children}</span>
      {rightIcon && <span className="inline-flex shrink-0">{rightIcon}</span>}
    </motion.button>
  );
};
