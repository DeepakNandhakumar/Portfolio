import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ArrowUp, Play, Sparkles, ChevronDown, Compass, Lock, Unlock } from 'lucide-react';
import { PERSONAL_INFO } from '@/data/personal';

interface FreezeLockScreenProps {
  isUnlocked: boolean;
  onUnlock: () => void;
}

export const FreezeLockScreen: React.FC<FreezeLockScreenProps> = ({
  isUnlocked,
  onUnlock,
}) => {
  const [hasScrolled, setHasScrolled] = useState(false);

  useEffect(() => {
    const handleWheel = (e: WheelEvent) => {
      if (!isUnlocked && Math.abs(e.deltaY) > 10) {
        onUnlock();
      }
    };

    const handleTouchStart = (e: TouchEvent) => {
      const startY = e.touches[0].clientY;
      const handleTouchMove = (moveEv: TouchEvent) => {
        const deltaY = startY - moveEv.touches[0].clientY;
        if (Math.abs(deltaY) > 25 && !isUnlocked) {
          onUnlock();
          window.removeEventListener('touchmove', handleTouchMove);
        }
      };
      window.addEventListener('touchmove', handleTouchMove, { once: true });
    };

    window.addEventListener('wheel', handleWheel, { passive: true });
    window.addEventListener('touchstart', handleTouchStart, { passive: true });

    return () => {
      window.removeEventListener('wheel', handleWheel);
      window.removeEventListener('touchstart', handleTouchStart);
    };
  }, [isUnlocked, onUnlock]);

  return (
    <AnimatePresence>
      {!isUnlocked && (
        <motion.div
          key="freeze-gate"
          initial={{ opacity: 1 }}
          exit={{ opacity: 0, scale: 1.05, transition: { duration: 0.8, ease: [0.16, 1, 0.3, 1] } }}
          className="fixed inset-0 z-50 flex flex-col justify-between p-6 sm:p-12 bg-gradient-to-b from-slate-950 via-slate-900 to-indigo-950 text-white select-none overflow-hidden"
        >
          {/* Top Status Bar */}
          <div className="flex items-center justify-between w-full max-w-6xl mx-auto">
            <div className="flex items-center gap-2.5 px-4 py-2 rounded-full bg-white/10 backdrop-blur-md border border-white/15 text-xs font-mono">
              <span className="w-2 h-2 rounded-full bg-cyan-400 animate-ping" />
              <span className="text-cyan-300 font-bold">DESERT ODYSSEY</span>
              <span className="text-slate-400">|</span>
              <span className="text-slate-300">SCROLL LOCKED</span>
            </div>

            <div className="text-right text-xs font-mono text-slate-400 hidden sm:block">
              TERF'S ACADEMY (80%) • TIRUPUR, TN
            </div>
          </div>

          {/* Central Freeze Core Experience */}
          <div className="flex flex-col items-center justify-center text-center max-w-3xl mx-auto my-auto space-y-6">
            <motion.div
              initial={{ scale: 0.8, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              transition={{ delay: 0.15, duration: 0.6 }}
              className="w-16 h-16 sm:w-20 sm:h-20 rounded-3xl bg-gradient-to-tr from-indigo-600 via-cyan-500 to-amber-400 p-[2px] shadow-[0_0_50px_rgba(99,102,241,0.4)]"
            >
              <div className="w-full h-full bg-slate-950 rounded-[22px] flex items-center justify-center text-2xl sm:text-3xl font-extrabold text-white">
                DN
              </div>
            </motion.div>

            <motion.div
              initial={{ y: 20, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ delay: 0.3, duration: 0.6 }}
              className="space-y-2"
            >
              <span className="text-xs sm:text-sm font-mono tracking-widest text-indigo-400 uppercase font-semibold">
                An Interactive 3D Scrollytelling Experience
              </span>
              <h1 className="text-4xl sm:text-7xl font-extrabold tracking-tight text-white leading-tight">
                {PERSONAL_INFO.name}
              </h1>
              <p className="text-sm sm:text-lg text-slate-300 max-w-xl mx-auto font-light leading-relaxed">
                Full-Stack Software Engineer & 80% Merit BCA Graduate. Exploring the boundless horizons of web technology, AI, and real-time simulations.
              </p>
            </motion.div>

            {/* Gesture Prompt */}
            <motion.div
              initial={{ y: 20, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ delay: 0.45, duration: 0.6 }}
              className="pt-4 flex flex-col items-center gap-4"
            >
              {/* Primary Unlock CTA */}
              <button
                onClick={onUnlock}
                className="group inline-flex items-center gap-3 px-8 py-4 rounded-full bg-gradient-to-r from-indigo-600 via-purple-600 to-cyan-500 text-white font-bold text-sm sm:text-base shadow-[0_0_35px_rgba(99,102,241,0.6)] hover:shadow-[0_0_50px_rgba(6,182,212,0.8)] hover:scale-105 active:scale-95 transition-all cursor-pointer"
              >
                <Play className="w-4 h-4 fill-white group-hover:translate-x-0.5 transition-transform" />
                <span>ENTER DESERT JOURNEY</span>
              </button>

              {/* Trackpad Swipe Indicator */}
              <div className="flex items-center gap-2 text-xs font-mono text-slate-400 pt-2">
                <motion.div
                  animate={{ y: [-4, 4, -4] }}
                  transition={{ repeat: Infinity, duration: 1.5, ease: 'easeInOut' }}
                  className="w-5 h-8 rounded-full border border-slate-500 flex items-start justify-center p-1"
                >
                  <span className="w-1 h-2 rounded-full bg-cyan-400" />
                </motion.div>
                <span>Or swipe up / scroll on trackpad to unlock</span>
              </div>
            </motion.div>
          </div>

          {/* Bottom Coordinates & Badges */}
          <div className="flex flex-wrap items-center justify-between w-full max-w-6xl mx-auto text-xs font-mono text-slate-500 pt-6 border-t border-white/10">
            <div className="flex items-center gap-3">
              <span>HACKERRANK 5★</span>
              <span>•</span>
              <span>MET SATYA NADELLA</span>
              <span>•</span>
              <span>1ST CODE-FIESTA</span>
            </div>

            <div>PRESS SPACE / SCROLL TO INITIALIZE</div>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};
