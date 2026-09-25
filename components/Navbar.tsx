"use client";

import React, { useState, useEffect } from "react";
import { NAV_ITEMS, PERSONAL_INFO } from "@/lib/constants";
import { useScrollProgress } from "@/hooks/useScrollProgress";
import { Menu, X, FileDown, Sparkles, Terminal, Flame } from "lucide-react";
import { cn } from "@/lib/utils";

interface NavbarProps {
  onOpenTerminal?: () => void;
}

export function Navbar({ onOpenTerminal }: NavbarProps) {
  const { scrollY, activeSection } = useScrollProgress();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const isScrolled = scrollY > 30;

  // Prevent scroll when mobile menu is open
  useEffect(() => {
    if (mobileMenuOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "unset";
    }
    return () => {
      document.body.style.overflow = "unset";
    };
  }, [mobileMenuOpen]);

  return (
    <header
      className={cn(
        "fixed top-0 left-0 right-0 z-40 transition-all duration-300 py-3.5 px-4 sm:px-8",
        isScrolled
          ? "bg-[#030611]/85 backdrop-blur-xl border-b border-cyan-500/20 shadow-[0_4px_30px_rgba(0,0,0,0.7)] py-2.5"
          : "bg-transparent"
      )}
    >
      <div className="max-w-7xl mx-auto flex items-center justify-between">
        {/* Brand / Logo */}
        <a
          href="#hero"
          className="group flex items-center gap-3 focus:outline-none focus:ring-2 focus:ring-cyan-400 rounded-lg"
          aria-label="Deepak N Home"
        >
          <div className="relative flex items-center justify-center w-10 h-10 rounded-xl bg-gradient-to-br from-cyan-400 via-indigo-500 to-rose-500 p-[1px] shadow-[0_0_25px_rgba(0,240,255,0.4)] group-hover:shadow-[0_0_35px_rgba(0,240,255,0.7)] transition-all duration-300">
            <div className="w-full h-full bg-[#030611] rounded-[11px] flex items-center justify-center">
              <span className="text-sm font-black font-mono tracking-tighter bg-gradient-to-r from-cyan-300 via-white to-rose-400 bg-clip-text text-transparent group-hover:scale-105 transition-transform">
                {PERSONAL_INFO.initials}
              </span>
            </div>
          </div>
          <div className="flex flex-col">
            <span className="text-sm font-black italic tracking-tight text-white group-hover:text-cyan-300 transition-colors uppercase">
              {PERSONAL_INFO.name}
            </span>
            <span className="text-[10px] font-mono text-cyan-400 tracking-wider flex items-center gap-1 font-bold">
              <span className="w-1.5 h-1.5 rounded-full bg-cyan-400 animate-pulse" />
              OWLSURE RACER #01
            </span>
          </div>
        </a>

        {/* Desktop Navigation Links */}
        <nav className="hidden xl:flex items-center gap-1 bg-[#080D1E]/70 border border-white/[0.08] rounded-full p-1.5 backdrop-blur-md shadow-inner">
          {NAV_ITEMS.map((item) => {
            const isActive = activeSection === item.id;
            return (
              <a
                key={item.id}
                href={item.href}
                className={cn(
                  "relative px-3.5 py-1.5 rounded-full text-xs font-mono transition-all duration-200 focus:outline-none focus:ring-1 focus:ring-cyan-400",
                  isActive
                    ? "text-white font-bold"
                    : "text-slate-300 hover:text-cyan-300 hover:bg-white/[0.04]"
                )}
              >
                {isActive && (
                  <span className="absolute inset-0 rounded-full bg-gradient-to-r from-cyan-600/80 to-indigo-600/80 -z-10 shadow-[0_0_20px_rgba(0,240,255,0.5)] border border-cyan-400/50" />
                )}
                {item.label}
              </a>
            );
          })}
        </nav>

        {/* Desktop Action Buttons */}
        <div className="hidden sm:flex items-center gap-2.5">
          {onOpenTerminal && (
            <button
              onClick={onOpenTerminal}
              className="flex items-center gap-1.5 px-3 py-2 rounded-xl bg-white/[0.04] hover:bg-cyan-500/10 border border-white/[0.1] hover:border-cyan-500/30 text-xs font-mono text-slate-300 hover:text-cyan-300 transition-all shadow-sm focus:outline-none focus:ring-2 focus:ring-cyan-400 cursor-pointer"
              title="Open Developer Terminal"
            >
              <Terminal className="w-3.5 h-3.5 text-cyan-400" />
              <span className="hidden md:inline">Shell</span>
            </button>
          )}

          <a
            href={PERSONAL_INFO.resumePath}
            download="Deepak_N_Resume.pdf"
            className="flex items-center gap-1.5 px-4 py-2 rounded-xl bg-gradient-to-r from-cyan-600 via-indigo-600 to-rose-600 hover:from-cyan-500 hover:to-rose-500 text-white text-xs font-mono font-bold uppercase shadow-[0_0_25px_rgba(0,240,255,0.4)] hover:shadow-[0_0_35px_rgba(0,240,255,0.6)] transition-all border border-cyan-400/40 btn-racing-sweep focus:outline-none focus:ring-2 focus:ring-cyan-400"
          >
            <FileDown className="w-3.5 h-3.5" />
            <span>Resume</span>
          </a>
        </div>

        {/* Mobile Hamburger Button */}
        <button
          onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
          className="xl:hidden p-2 rounded-xl bg-white/[0.05] border border-cyan-500/30 text-cyan-300 hover:text-white focus:outline-none focus:ring-2 focus:ring-cyan-400"
          aria-label={mobileMenuOpen ? "Close menu" : "Open menu"}
          aria-expanded={mobileMenuOpen}
        >
          {mobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
        </button>
      </div>

      {/* Mobile Drawer Overlay */}
      {mobileMenuOpen && (
        <div className="xl:hidden fixed inset-0 top-[60px] bg-[#030611]/95 backdrop-blur-2xl z-50 flex flex-col p-6 animate-in fade-in slide-in-from-top-4 duration-300">
          <div className="flex flex-col gap-2.5 my-auto">
            <span className="text-[11px] font-mono text-cyan-400 tracking-widest px-3 font-bold">
              // RACING TRACK NAVIGATION
            </span>
            {NAV_ITEMS.map((item, idx) => (
              <a
                key={item.id}
                href={item.href}
                onClick={() => setMobileMenuOpen(false)}
                className={cn(
                  "flex items-center justify-between p-3 rounded-xl text-sm font-mono font-bold border transition-all",
                  activeSection === item.id
                    ? "bg-cyan-600/20 border-cyan-400 text-cyan-300 shadow-[0_0_25px_rgba(0,240,255,0.3)]"
                    : "bg-white/[0.02] border-white/[0.06] text-slate-300 hover:text-white hover:bg-white/[0.05]"
                )}
                style={{ animationDelay: `${idx * 30}ms` }}
              >
                <span>{item.label}</span>
                <span className="text-[10px] font-mono text-slate-500">{item.landmark}</span>
              </a>
            ))}
          </div>

          <div className="pt-6 border-t border-white/10 flex flex-col gap-3">
            {onOpenTerminal && (
              <button
                onClick={() => {
                  setMobileMenuOpen(false);
                  onOpenTerminal();
                }}
                className="w-full flex items-center justify-center gap-2 py-3 rounded-xl bg-white/[0.05] border border-cyan-500/30 text-cyan-300 text-sm font-mono font-bold"
              >
                <Terminal className="w-4 h-4 text-cyan-400" />
                Launch Developer Terminal
              </button>
            )}
            <a
              href={PERSONAL_INFO.resumePath}
              download="Deepak_N_Resume.pdf"
              onClick={() => setMobileMenuOpen(false)}
              className="w-full flex items-center justify-center gap-2 py-3.5 rounded-xl bg-gradient-to-r from-cyan-600 via-indigo-600 to-rose-600 text-white text-sm font-mono font-bold shadow-[0_0_25px_rgba(0,240,255,0.4)]"
            >
              <FileDown className="w-4 h-4" />
              Download Resume
            </a>
          </div>
        </div>
      )}
    </header>
  );
}
