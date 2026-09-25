import React from 'react';
import { cn } from '@/utils/helpers';

interface BadgeProps extends React.HTMLAttributes<HTMLSpanElement> {
  variant?: 'primary' | 'secondary' | 'outline' | 'success' | 'cyan' | 'purple' | 'amber';
  size?: 'sm' | 'md';
  children: React.ReactNode;
}

export const Badge: React.FC<BadgeProps> = ({
  variant = 'secondary',
  size = 'md',
  className,
  children,
  ...props
}) => {
  const sizeStyles = {
    sm: 'text-[11px] px-2.5 py-0.5 font-medium',
    md: 'text-xs px-3 py-1 font-medium',
  };

  const variantStyles = {
    primary: 'bg-indigo-50 text-indigo-700 border border-indigo-200/80',
    secondary: 'bg-slate-100 text-slate-700 border border-slate-200/80',
    outline: 'bg-transparent text-slate-600 border border-slate-200',
    success: 'bg-emerald-50 text-emerald-700 border border-emerald-200/80',
    cyan: 'bg-cyan-50 text-cyan-700 border border-cyan-200/80',
    purple: 'bg-purple-50 text-purple-700 border border-purple-200/80',
    amber: 'bg-amber-50 text-amber-700 border border-amber-200/80',
  };

  return (
    <span
      className={cn(
        'inline-flex items-center gap-1.5 rounded-full transition-colors',
        sizeStyles[size],
        variantStyles[variant],
        className
      )}
      {...props}
    >
      {children}
    </span>
  );
};
