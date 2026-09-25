import React, { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ArrowDown, ArrowRight, Download, Sparkles, User, Code, Layers } from 'lucide-react';
import { HeroScene } from '@/scenes/HeroScene';
import { Button } from '@/components/ui/Button';
import { Container } from '@/components/ui/Container';
import { PERSONAL_INFO } from '@/data/personal';
import { scrollToSection } from '@/utils/helpers';
import { createHeroOpeningTimeline } from '@/animations/heroAnimations';

interface HeroProps {
  scrollProgress?: number;
  onOpenResume?: () => void;
}

export const Hero: React.FC<HeroProps> = ({ scrollProgress = 0, onOpenResume }) => {
  const [currentRoleIndex, setCurrentRoleIndex] = useState(0);
  const [hasLanded, setHasLanded] = useState(false);

  const heroContainerRef = useRef<HTMLDivElement>(null);
  const titleRef = useRef<HTMLDivElement>(null);
  const rolesRef = useRef<HTMLDivElement>(null);
  const bioRef = useRef<HTMLDivElement>(null);
  const buttonsRef = useRef<HTMLDivElement>(null);
  const badgesRef = useRef<HTMLDivElement>(null);

  // Cycling animated roles
  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentRoleIndex((prev) => (prev + 1) % PERSONAL_INFO.titles.length);
    }, 2800);
    return () => clearInterval(interval);
  }, []);

  // Initialize GSAP hero timeline
  useEffect(() => {
    const tl = createHeroOpeningTimeline(
      {
        heroCanvas: heroContainerRef.current,
        title: titleRef.current,
        roles: rolesRef.current,
        bio: bioRef.current,
        buttons: buttonsRef.current,
        badges: badgesRef.current,
      },
      {
        onStep4: () => setHasLanded(true),
      }
    );

    return () => {
      tl.kill();
    };
  }, []);

  return (
    <section
      id="hero"
      ref={heroContainerRef}
      className="relative w-full min-h-screen flex flex-col justify-between pt-24 pb-12 sm:pb-16 overflow-hidden bg-gradient-to-b from-slate-50/60 via-white to-white"
    >
      {/* 3D Cinematic Canvas Layer */}
      <div className="absolute inset-0 w-full h-full z-0 pointer-events-auto">
        <HeroScene
          scrollProgress={scrollProgress}
          onLandSuccess={() => setHasLanded(true)}
        />
      </div>

      {/* Hero Foreground Content */}
      <div className="relative z-10 w-full my-auto pointer-events-none">
        <Container size="lg">
          <div className="max-w-3xl pointer-events-auto">
            {/* Status Pill Badge */}
            <div
              ref={badgesRef}
              className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-white/85 backdrop-blur-md border border-indigo-100 shadow-sm text-xs font-mono font-medium text-slate-700 mb-6"
            >
              <span className="w-2 h-2 rounded-full bg-emerald-500 animate-ping" />
              <span className="text-indigo-600 font-semibold">BCA GRADUATE (80%)</span>
              <span className="text-slate-400">|</span>
              <span className="text-slate-600">HackerRank 5★ Problem Solver</span>
            </div>

            {/* Main Greeting & Title */}
            <div ref={titleRef} className="space-y-1">
              <span className="text-base sm:text-lg font-medium text-indigo-600 tracking-wide">
                Hi, I'm
              </span>
              <h1 className="text-4xl sm:text-6xl lg:text-7xl font-extrabold text-slate-900 tracking-tight leading-[1.08]">
                {PERSONAL_INFO.name}
              </h1>
            </div>

            {/* Revolving Role Headline */}
            <div ref={rolesRef} className="h-10 sm:h-12 mt-3 flex items-center">
              <AnimatePresence mode="wait">
                <motion.div
                  key={currentRoleIndex}
                  initial={{ opacity: 0, y: 15 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -15 }}
                  transition={{ duration: 0.35, ease: 'easeOut' }}
                  className="text-xl sm:text-3xl font-semibold bg-gradient-to-r from-indigo-600 via-purple-600 to-cyan-600 bg-clip-text text-transparent"
                >
                  {PERSONAL_INFO.titles[currentRoleIndex]}
                </motion.div>
              </AnimatePresence>
            </div>

            {/* Bio Paragraph */}
            <div ref={bioRef} className="mt-5 max-w-xl">
              <p className="text-base sm:text-lg text-slate-600 leading-relaxed font-normal">
                {PERSONAL_INFO.bio}
              </p>
            </div>

            {/* 3 Hero CTA Action Buttons */}
            <div
              ref={buttonsRef}
              className="mt-8 flex flex-wrap items-center gap-3.5 sm:gap-4 pt-2"
            >
              {/* Primary: Explore My Work */}
              <Button
                variant="glow"
                size="lg"
                isMagnetic
                rightIcon={<ArrowRight className="w-4 h-4" />}
                onClick={() => scrollToSection('#projects', 80)}
              >
                Explore My Projects
              </Button>

              {/* Secondary: About Me */}
              <Button
                variant="outline"
                size="lg"
                isMagnetic
                leftIcon={<User className="w-4 h-4 text-indigo-600" />}
                onClick={() => scrollToSection('#about', 80)}
              >
                About Me
              </Button>

              {/* Third: View / Download Resume */}
              <Button
                variant="ghost"
                size="lg"
                leftIcon={<Download className="w-4 h-4 text-indigo-600" />}
                onClick={onOpenResume}
              >
                View & Download Resume
              </Button>
            </div>
          </div>
        </Container>
      </div>

      {/* Bottom Scroll Indicator & Road Indicator */}
      <div className="relative z-10 w-full flex flex-col items-center justify-center pointer-events-auto">
        <button
          onClick={() => scrollToSection('#about', 80)}
          className="flex flex-col items-center gap-2 group cursor-pointer text-slate-400 hover:text-indigo-600 transition-colors"
          aria-label="Scroll to discover Deepak's journey"
        >
          <span className="text-[11px] font-mono tracking-widest uppercase font-medium">
            Scroll to Enter Journey
          </span>
          <motion.div
            animate={{ y: [0, 6, 0] }}
            transition={{ repeat: Infinity, duration: 1.8, ease: 'easeInOut' }}
            className="w-8 h-8 rounded-full border border-slate-200 bg-white/80 backdrop-blur-sm flex items-center justify-center shadow-xs group-hover:border-indigo-300"
          >
            <ArrowDown className="w-4 h-4 text-slate-600 group-hover:text-indigo-600 transition-colors" />
          </motion.div>
        </button>
      </div>
    </section>
  );
};
