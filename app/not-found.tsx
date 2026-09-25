import React from "react";
import Link from "next/link";
import { Compass, Home } from "lucide-react";
import { GlassCard } from "@/components/ui/GlassCard";

export default function NotFound() {
  return (
    <div className="min-h-screen bg-[#050816] text-white flex items-center justify-center p-6">
      <GlassCard glowColor="cyan" padding="lg" className="max-w-md text-center space-y-6">
        <div className="w-16 h-16 rounded-2xl bg-cyan-500/10 border border-cyan-500/30 text-cyan-400 mx-auto flex items-center justify-center shadow-[0_0_30px_rgba(6,182,212,0.3)]">
          <Compass className="w-8 h-8 animate-spin" />
        </div>

        <div className="space-y-2">
          <span className="text-xs font-mono text-cyan-400 tracking-widest uppercase">
            // ERROR 404 // COORDINATE UNREACHABLE
          </span>
          <h1 className="text-3xl font-extrabold text-white">Destination Lost</h1>
          <p className="text-xs sm:text-sm text-slate-400 leading-relaxed">
            The path you are looking for has shifted beyond the current digital highway.
          </p>
        </div>

        <div className="pt-2">
          <Link
            href="/"
            className="inline-flex items-center justify-center gap-2 px-6 py-3 rounded-xl bg-gradient-to-r from-indigo-600 to-cyan-500 text-white font-bold text-sm shadow-[0_0_25px_rgba(79,70,229,0.4)] hover:shadow-[0_0_35px_rgba(6,182,212,0.6)] transition-all"
          >
            <Home className="w-4 h-4" />
            <span>Return to Highway Origin</span>
          </Link>
        </div>
      </GlassCard>
    </div>
  );
}
