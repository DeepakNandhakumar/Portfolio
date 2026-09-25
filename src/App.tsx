import React, { useState, useEffect } from 'react';
import { useLenis } from '@/hooks/useLenis';
import { useScrollProgress } from '@/hooks/useScrollProgress';
import { CustomCursor } from '@/components/ui/CustomCursor';
import { Navbar } from '@/components/Navbar/Navbar';
import { Hero } from '@/components/Hero/Hero';
import { About } from '@/components/About/About';
import { Skills } from '@/components/Skills/Skills';
import { Experience } from '@/components/Experience/Experience';
import { Projects } from '@/components/Projects/Projects';
import { Achievements } from '@/components/Achievements/Achievements';
import { Services } from '@/components/Services/Services';
import { Contact } from '@/components/Contact/Contact';
import { Footer } from '@/components/Footer/Footer';
import { ResumeModal } from '@/components/Resume/ResumeModal';
import { initScrollTriggers } from '@/animations/scrollAnimations';

export const App: React.FC = () => {
  // Initialize smooth scrolling with Lenis + GSAP ScrollTrigger
  useLenis(true);

  // Track scroll progression (0 to 1)
  const { scrollProgress } = useScrollProgress();

  // Resume Modal State
  const [isResumeModalOpen, setIsResumeModalOpen] = useState(false);

  useEffect(() => {
    initScrollTriggers();
  }, []);

  return (
    <div className="relative min-h-screen bg-white text-slate-900 font-sans selection:bg-indigo-500/20 selection:text-indigo-700">
      {/* Desktop Magnetic Custom Cursor */}
      <CustomCursor />

      {/* Floating Top Pill Navbar */}
      <Navbar onOpenResume={() => setIsResumeModalOpen(true)} />

      {/* Main Sections Flow */}
      <main id="main-content" className="relative z-10">
        {/* Section 00: Hero 3D Journey Entrance */}
        <Hero
          scrollProgress={scrollProgress}
          onOpenResume={() => setIsResumeModalOpen(true)}
        />

        {/* Section 01: About Me & 3D Workstation */}
        <About onOpenResume={() => setIsResumeModalOpen(true)} />

        {/* Section 02: Skills & Interactive Technology Ecosystem */}
        <Skills />

        {/* Section 03: Engineering Journey Timeline */}
        <Experience />

        {/* Section 04: Things I've Built (Wellspring, SpanStrike, 5 Projects) */}
        <Projects />

        {/* Section 05: Achievements & Recognitions (8 Honors & Certifications) */}
        <Achievements />

        {/* Section 06: What I Build Services */}
        <Services />

        {/* Section 07: Destination & Contact */}
        <Contact />
      </main>

      {/* Footer */}
      <Footer />

      {/* Official Verified Resume Modal */}
      <ResumeModal
        isOpen={isResumeModalOpen}
        onClose={() => setIsResumeModalOpen(false)}
      />
    </div>
  );
};

export default App;
