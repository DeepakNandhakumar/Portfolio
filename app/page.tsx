"use client";

import React, { useState } from "react";
import { Navbar } from "@/components/Navbar";
import { Hero } from "@/components/Hero/Hero";
import { About } from "@/components/About";
import { Skills } from "@/components/Skills";
import { Experience } from "@/components/Experience";
import { Projects } from "@/components/Projects/Projects";
import { Achievements } from "@/components/Achievements";
import { Services } from "@/components/Services";
import { Contact } from "@/components/Contact";
import { Footer } from "@/components/Footer";
import { CustomCursor } from "@/components/ui/CustomCursor";
import { AudioAmbience } from "@/components/ui/AudioAmbience";
import { EasterEggModal } from "@/components/ui/EasterEggModal";

export default function Home() {
  const [terminalModalOpen, setTerminalModalOpen] = useState(false);

  return (
    <main className="relative min-h-screen bg-[#050816] text-white selection:bg-indigo-500/30 selection:text-white overflow-x-hidden">
      {/* Custom Desktop Smooth Magnetic Cursor */}
      <CustomCursor />

      {/* Floating Ambient Atmosphere Synthesizer (Opt-in) */}
      <AudioAmbience />

      {/* Developer Terminal Easter Egg Modal */}
      <EasterEggModal
        isOpen={terminalModalOpen}
        onClose={() => setTerminalModalOpen(false)}
      />

      {/* Sticky Glassmorphic Navbar */}
      <Navbar onOpenTerminal={() => setTerminalModalOpen(true)} />

      {/* Multi-Layer Ambient Background Gradients & Grid */}
      <div className="fixed inset-0 pointer-events-none z-0 ambient-glow-mesh opacity-70" />
      <div className="fixed inset-0 pointer-events-none z-0 cyber-grid opacity-25" />

      {/* Journey Landmarks */}
      <div className="relative z-10">
        {/* Landmark 00: Cinematic Landing & Hero */}
        <Hero />

        {/* Landmark 01: About & Interactive Workstation */}
        <About />

        {/* Landmark 02: Skills Universe */}
        <Skills />

        {/* Landmark 03: Experience & Education Timeline */}
        <Experience />

        {/* Landmark 04: Featured Projects & Wellspring Health Graph */}
        <Projects />

        {/* Landmark 05: Achievements & Honors */}
        <Achievements />

        {/* Landmark 06: Engineering Capabilities & Services */}
        <Services />

        {/* Landmark 07: Contact Destination */}
        <Contact />

        {/* Journey Completion: Footer */}
        <Footer onOpenTerminal={() => setTerminalModalOpen(true)} />
      </div>
    </main>
  );
}
