"use client";

import React from "react";
import { PERSONAL_INFO, NAV_ITEMS, SOCIAL_LINKS } from "@/lib/constants";
import { ArrowUp, Heart, Sparkles, Terminal, Code2, Mail } from "lucide-react";
import { GithubIcon, LinkedinIcon } from "@/components/ui/BrandIcons";

interface FooterProps {
  onOpenTerminal?: () => void;
}

export function Footer({ onOpenTerminal }: FooterProps) {
  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  return (
    <footer className="relative border-t border-white/[0.08] bg-[#03050C] pt-16 pb-12 px-6 sm:px-10 overflow-hidden">
      {/* Top subtle lighting beam along the border */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-3/4 h-[1px] bg-gradient-to-r from-transparent via-cyan-400 to-transparent shadow-[0_0_15px_rgba(6,182,212,0.8)]" />

      <div className="max-w-7xl mx-auto">
        <div className="grid grid-cols-1 md:grid-cols-12 gap-10 pb-12 border-b border-white/[0.06] items-start">
          {/* Col 1: Brand & Identity */}
          <div className="md:col-span-5 space-y-4">
            <div className="flex items-center gap-3">
              <div className="w-9 h-9 rounded-xl bg-gradient-to-br from-indigo-500 to-cyan-400 p-[1px]">
                <div className="w-full h-full bg-[#050816] rounded-[11px] flex items-center justify-center font-mono font-bold text-xs text-white">
                  {PERSONAL_INFO.initials}
                </div>
              </div>
              <span className="text-lg font-bold text-white tracking-tight">
                {PERSONAL_INFO.name}
              </span>
            </div>

            <p className="text-xs sm:text-sm text-slate-400 max-w-sm font-normal leading-relaxed">
              Software Engineer crafting scalable architectures, intelligent AI agent workflows, and modern high-performance web applications.
            </p>

            <div className="flex items-center gap-3 text-xs font-mono text-slate-400">
              <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
              <span>JOURNEY COMPLETE // READY TO COLLABORATE</span>
            </div>
          </div>

          {/* Col 2: Navigation Links */}
          <div className="md:col-span-4 space-y-3">
            <h4 className="text-xs font-mono font-bold uppercase tracking-wider text-indigo-300">
              Navigation Road
            </h4>
            <div className="grid grid-cols-2 gap-2 text-xs font-medium">
              {NAV_ITEMS.map((item) => (
                <a
                  key={item.id}
                  href={item.href}
                  className="text-slate-400 hover:text-cyan-300 transition-colors py-0.5"
                >
                  {item.label}
                </a>
              ))}
            </div>
          </div>

          {/* Col 3: Coordinates & Actions */}
          <div className="md:col-span-3 space-y-3">
            <h4 className="text-xs font-mono font-bold uppercase tracking-wider text-indigo-300">
              Connect & Terminal
            </h4>
            <div className="space-y-2 text-xs">
              <div className="flex flex-col gap-2">
                <a
                  href={SOCIAL_LINKS[0].url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-slate-400 hover:text-white transition-colors flex items-center gap-2"
                >
                  <LinkedinIcon className="w-3.5 h-3.5 text-blue-400" />
                  <span>LinkedIn / {SOCIAL_LINKS[0].handle}</span>
                </a>
                <a
                  href={SOCIAL_LINKS[1].url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-slate-400 hover:text-white transition-colors flex items-center gap-2"
                >
                  <GithubIcon className="w-3.5 h-3.5 text-purple-400" />
                  <span>GitHub / {SOCIAL_LINKS[1].handle}</span>
                </a>
                <a
                  href={SOCIAL_LINKS[2].url}
                  className="text-slate-400 hover:text-white transition-colors flex items-center gap-2"
                >
                  <Mail className="w-3.5 h-3.5 text-cyan-400" />
                  <span>Email / {PERSONAL_INFO.email}</span>
                </a>
              </div>

              {onOpenTerminal && (
                <div className="pt-2">
                  <button
                    onClick={onOpenTerminal}
                    className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-white/[0.04] hover:bg-white/[0.08] border border-white/10 text-[11px] font-mono text-cyan-300 hover:text-cyan-200 transition-colors"
                  >
                    <Terminal className="w-3.5 h-3.5" />
                    <span>Launch Shell</span>
                  </button>
                </div>
              )}
            </div>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="pt-8 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs font-mono text-slate-500">
          <div>
            &copy; {new Date().getFullYear()} {PERSONAL_INFO.name}. Built with Next.js, Three.js & Tailwind CSS.
          </div>

          <button
            onClick={scrollToTop}
            className="flex items-center gap-2 px-3 py-1.5 rounded-xl bg-white/[0.03] hover:bg-white/[0.08] border border-white/[0.08] text-slate-400 hover:text-white transition-all group"
            aria-label="Scroll to top of page"
          >
            <span>Back to Origin</span>
            <ArrowUp className="w-3.5 h-3.5 group-hover:-translate-y-0.5 transition-transform" />
          </button>
        </div>
      </div>
    </footer>
  );
}
