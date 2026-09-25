import React, { useRef, useState } from 'react';
import { motion } from 'framer-motion';
import { cn } from '@/utils/helpers';

interface TiltCardProps extends React.HTMLAttributes<HTMLDivElement> {
  maxRotation?: number;
  className?: string;
  glowColor?: string;
  children: React.ReactNode;
}

export const TiltCard: React.FC<TiltCardProps> = ({
  maxRotation = 8,
  className,
  glowColor = 'rgba(79, 70, 229, 0.15)',
  children,
  ...props
}) => {
  const cardRef = useRef<HTMLDivElement>(null);
  const [rotateX, setRotateX] = useState(0);
  const [rotateY, setRotateY] = useState(0);
  const [spotlight, setSpotlight] = useState({ x: 0, y: 0, opacity: 0 });

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!cardRef.current) return;
    const rect = cardRef.current.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;

    const centerX = rect.width / 2;
    const centerY = rect.height / 2;

    const rX = -((y - centerY) / centerY) * maxRotation;
    const rY = ((x - centerX) / centerX) * maxRotation;

    setRotateX(rX);
    setRotateY(rY);
    setSpotlight({ x, y, opacity: 1 });
  };

  const handleMouseLeave = () => {
    setRotateX(0);
    setRotateY(0);
    setSpotlight((prev) => ({ ...prev, opacity: 0 }));
  };

  return (
    <motion.div
      ref={cardRef}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      animate={{ rotateX, rotateY }}
      transition={{ type: 'spring', stiffness: 300, damping: 20, mass: 0.4 }}
      style={{ transformStyle: 'preserve-3d', perspective: 1000 }}
      className={cn(
        'relative rounded-2xl bg-white/85 backdrop-blur-xl border border-slate-200/90 shadow-[0_8px_30px_rgb(0,0,0,0.04)] overflow-hidden transition-shadow duration-300 hover:shadow-[0_20px_40px_rgba(79,70,229,0.08)]',
        className
      )}
      {...(props as any)}
    >
      {/* Specular light highlight follow */}
      <div
        className="pointer-events-none absolute -inset-px transition-opacity duration-300"
        style={{
          opacity: spotlight.opacity,
          background: `radial-gradient(400px circle at ${spotlight.x}px ${spotlight.y}px, ${glowColor}, transparent 70%)`,
        }}
      />
      <div className="relative z-10 h-full">{children}</div>
    </motion.div>
  );
};
