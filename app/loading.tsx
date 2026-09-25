import React from "react";
import { PERSONAL_INFO } from "@/lib/constants";

export default function Loading() {
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-[#050816] text-white">
      <div className="flex flex-col items-center gap-4 text-center px-4">
        {/* Animated Glowing Logo */}
        <div className="relative w-16 h-16 rounded-2xl bg-gradient-to-br from-indigo-500 via-purple-500 to-cyan-400 p-[1px] shadow-[0_0_40px_rgba(79,70,229,0.5)] animate-pulse">
          <div className="w-full h-full bg-[#050816] rounded-[15px] flex items-center justify-center">
            <span className="font-mono font-black text-xl bg-gradient-to-r from-white to-indigo-300 bg-clip-text text-transparent">
              {PERSONAL_INFO.initials}
            </span>
          </div>
        </div>

        <div className="space-y-1">
          <div className="text-base font-bold text-white tracking-wide">
            {PERSONAL_INFO.name}
          </div>
          <div className="text-xs font-mono text-cyan-400 tracking-wider">
            INITIALIZING DIGITAL ENVIRONMENT...
          </div>
        </div>

        {/* Progress Bar */}
        <div className="w-48 h-1 bg-white/[0.08] rounded-full overflow-hidden">
          <div className="w-full h-full bg-gradient-to-r from-indigo-500 to-cyan-400 rounded-full animate-[scanline_1.5s_ease-in-out_infinite]" />
        </div>
      </div>
    </div>
  );
}
