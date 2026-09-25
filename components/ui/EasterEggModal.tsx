"use client";

import React, { useEffect, useState } from "react";
import confetti from "canvas-confetti";
import { PERSONAL_INFO, TERMINAL_COMMANDS } from "@/lib/constants";
import { GlassCard } from "@/components/ui/GlassCard";
import { X, Terminal, Sparkles, CornerDownLeft, Zap } from "lucide-react";

interface EasterEggModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export function EasterEggModal({ isOpen, onClose }: EasterEggModalProps) {
  const [terminalInput, setTerminalInput] = useState("");
  const [history, setHistory] = useState<{ cmd: string; res: string[] }[]>([
    {
      cmd: "matrix",
      res: [
        "CYBER MATRIX PROTOCOL ENGAGED",
        "Deepak N [Software Engineer @ Owlsure] :: ALL SYSTEMS NOMINAL",
        "Type 'help' or 'wellspring' for project telemetry logs.",
      ],
    },
  ]);

  // Konami Code Listener
  useEffect(() => {
    const konamiCode = [
      "ArrowUp",
      "ArrowUp",
      "ArrowDown",
      "ArrowDown",
      "ArrowLeft",
      "ArrowRight",
      "ArrowLeft",
      "ArrowRight",
      "b",
      "a",
    ];
    let konamiIndex = 0;

    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key.toLowerCase() === konamiCode[konamiIndex].toLowerCase()) {
        konamiIndex++;
        if (konamiIndex === konamiCode.length) {
          // Trigger celebration confetti
          try {
            confetti({
              particleCount: 120,
              spread: 80,
              origin: { y: 0.6 },
              colors: ["#4F46E5", "#06B6D4", "#7C3AED", "#FFFFFF"],
            });
          } catch {}
          konamiIndex = 0;
        }
      } else {
        konamiIndex = 0;
      }
    };

    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, []);

  const handleCommand = (e: React.FormEvent) => {
    e.preventDefault();
    const cmd = terminalInput.trim().toLowerCase();
    if (!cmd) return;

    if (cmd === "clear") {
      setHistory([]);
      setTerminalInput("");
      return;
    }

    if (cmd === "matrix") {
      try {
        confetti({
          particleCount: 75,
          spread: 60,
          origin: { y: 0.5 },
          colors: ["#10B981", "#06B6D4", "#7C3AED"],
        });
      } catch {}
    }

    const output = TERMINAL_COMMANDS[cmd];
    if (output) {
      setHistory((prev) => [
        ...prev,
        { cmd, res: Array.isArray(output) ? output : [output] },
      ]);
    } else {
      setHistory((prev) => [
        ...prev,
        {
          cmd,
          res: [`Unknown command: "${cmd}". Type "help" for available commands.`],
        },
      ]);
    }
    setTerminalInput("");
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 bg-black/85 backdrop-blur-xl animate-in fade-in duration-200">
      <div className="w-full max-w-2xl">
        <GlassCard
          glowColor="cyan"
          padding="none"
          className="overflow-hidden border-cyan-500/40 shadow-[0_0_50px_rgba(6,182,212,0.3)] flex flex-col h-[520px]"
        >
          {/* Header */}
          <div className="flex items-center justify-between px-4 py-3 bg-[#080D1A] border-b border-white/10">
            <div className="flex items-center gap-2">
              <Terminal className="w-4 h-4 text-cyan-400" />
              <span className="text-xs font-mono font-bold text-white">
                ANTIGRAVITY CYBER TERMINAL // DEEPAK NANDAKUMAR
              </span>
            </div>
            <button
              onClick={onClose}
              className="p-1 rounded-lg hover:bg-white/10 text-slate-400 hover:text-white transition-colors"
              aria-label="Close modal"
            >
              <X className="w-4 h-4" />
            </button>
          </div>

          {/* Body */}
          <div className="flex-1 p-4 sm:p-6 overflow-y-auto font-mono text-xs sm:text-sm space-y-3 bg-[#050816]/95">
            <div className="text-cyan-400/70 text-xs pb-2 border-b border-white/[0.08]">
              [SYSTEM] Easter egg mode unlocked. Type &quot;help&quot;, &quot;wellspring&quot;, &quot;achievements&quot;, &quot;skills&quot;, &quot;matrix&quot;, or &quot;whoami&quot;.
            </div>

            {history.map((item, idx) => (
              <div key={idx} className="space-y-1">
                <div className="flex items-center gap-2 text-cyan-300 font-bold">
                  <span className="text-indigo-400">&gt;</span>
                  <span>${item.cmd}</span>
                </div>
                <div className="pl-4 space-y-1 text-slate-300 border-l border-indigo-500/30">
                  {item.res.map((r, rIdx) => (
                    <div key={rIdx}>{r}</div>
                  ))}
                </div>
              </div>
            ))}
          </div>

          {/* Input */}
          <form
            onSubmit={handleCommand}
            className="flex items-center gap-2 px-4 py-3 bg-[#080D1A] border-t border-white/10"
          >
            <span className="text-cyan-400 font-mono text-sm">&gt;</span>
            <input
              type="text"
              autoFocus
              value={terminalInput}
              onChange={(e) => setTerminalInput(e.target.value)}
              placeholder="type command..."
              className="flex-1 bg-transparent text-sm font-mono text-white placeholder:text-slate-600 focus:outline-none"
            />
            <button
              type="submit"
              className="p-1.5 rounded-lg bg-cyan-600/30 text-cyan-300 hover:bg-cyan-600 hover:text-white transition-colors"
            >
              <CornerDownLeft className="w-3.5 h-3.5" />
            </button>
          </form>
        </GlassCard>
      </div>
    </div>
  );
}
