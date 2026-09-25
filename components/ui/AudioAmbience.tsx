"use client";

import React, { useEffect, useRef, useState } from "react";
import { Volume2, VolumeX, Sparkles } from "lucide-react";

export function AudioAmbience() {
  const [isPlaying, setIsPlaying] = useState(false);
  const [hasInteracted, setHasInteracted] = useState(false);
  const audioCtxRef = useRef<AudioContext | null>(null);
  const gainNodeRef = useRef<GainNode | null>(null);
  const oscillatorsRef = useRef<OscillatorNode[]>([]);

  const startSoundscape = () => {
    try {
      const AudioCtx = window.AudioContext || (window as unknown as { webkitAudioContext: typeof AudioContext }).webkitAudioContext;
      if (!audioCtxRef.current) {
        audioCtxRef.current = new AudioCtx();
      }

      const ctx = audioCtxRef.current;
      if (ctx.state === "suspended") {
        ctx.resume();
      }

      // Master gain
      const masterGain = ctx.createGain();
      masterGain.gain.setValueAtTime(0, ctx.currentTime);
      masterGain.gain.linearRampToValueAtTime(0.04, ctx.currentTime + 3); // Very gentle and soothing
      masterGain.connect(ctx.destination);
      gainNodeRef.current = masterGain;

      // Create warm ambient chord (D minor / F maj9 chord: D2, A2, F3, C4)
      const frequencies = [73.42, 110.0, 174.61, 261.63, 329.63];
      oscillatorsRef.current = [];

      frequencies.forEach((freq, index) => {
        const osc = ctx.createOscillator();
        const panner = ctx.createStereoPanner ? ctx.createStereoPanner() : null;
        const filter = ctx.createBiquadFilter();

        osc.type = index % 2 === 0 ? "sine" : "triangle";
        osc.frequency.setValueAtTime(freq, ctx.currentTime);

        // Lowpass filter for warm cinematic sub-bass feel
        filter.type = "lowpass";
        filter.frequency.setValueAtTime(450, ctx.currentTime);

        if (panner) {
          panner.pan.value = (index / frequencies.length) * 1.6 - 0.8;
          osc.connect(filter);
          filter.connect(panner);
          panner.connect(masterGain);
        } else {
          osc.connect(filter);
          filter.connect(masterGain);
        }

        osc.start();
        oscillatorsRef.current.push(osc);
      });

      setIsPlaying(true);
      setHasInteracted(true);
    } catch (e) {
      console.warn("Audio Context error:", e);
    }
  };

  const stopSoundscape = () => {
    if (audioCtxRef.current && gainNodeRef.current) {
      const ctx = audioCtxRef.current;
      gainNodeRef.current.gain.linearRampToValueAtTime(0.0001, ctx.currentTime + 1);
      setTimeout(() => {
        oscillatorsRef.current.forEach((osc) => {
          try {
            osc.stop();
            osc.disconnect();
          } catch {
            // Already stopped
          }
        });
        oscillatorsRef.current = [];
        setIsPlaying(false);
      }, 1000);
    }
  };

  const toggleSound = () => {
    if (isPlaying) {
      stopSoundscape();
    } else {
      startSoundscape();
    }
  };

  useEffect(() => {
    return () => {
      oscillatorsRef.current.forEach((osc) => {
        try {
          osc.stop();
          osc.disconnect();
        } catch {}
      });
      if (audioCtxRef.current) {
        audioCtxRef.current.close();
      }
    };
  }, []);

  return (
    <div className="fixed bottom-6 right-6 z-50 flex items-center gap-2">
      <button
        onClick={toggleSound}
        className="group relative flex items-center gap-2.5 px-3.5 py-2.5 rounded-full bg-[#0B1120]/80 backdrop-blur-xl border border-white/10 hover:border-indigo-400/40 text-slate-300 hover:text-white shadow-[0_4px_20px_rgba(0,0,0,0.5)] transition-all duration-300 focus:outline-none focus:ring-2 focus:ring-indigo-500"
        aria-label={isPlaying ? "Mute ambient audio" : "Enable ambient atmospheric audio"}
        title={isPlaying ? "Mute Atmospheric Soundscape" : "Enable Atmospheric Soundscape"}
      >
        {isPlaying ? (
          <>
            <Volume2 className="w-4 h-4 text-cyan-400 animate-pulse" />
            <div className="flex items-end gap-0.5 h-3 px-0.5">
              <span className="w-0.5 h-3 bg-cyan-400 rounded-full animate-bounce [animation-delay:0ms]" />
              <span className="w-0.5 h-2 bg-indigo-400 rounded-full animate-bounce [animation-delay:150ms]" />
              <span className="w-0.5 h-3.5 bg-purple-400 rounded-full animate-bounce [animation-delay:300ms]" />
            </div>
            <span className="text-xs font-mono text-cyan-300 hidden sm:inline">Ambience ON</span>
          </>
        ) : (
          <>
            <VolumeX className="w-4 h-4 text-slate-400 group-hover:text-indigo-300 transition-colors" />
            <span className="text-xs font-mono text-slate-400 group-hover:text-slate-200 transition-colors hidden sm:inline">
              Ambience
            </span>
          </>
        )}

        {!hasInteracted && (
          <span className="absolute -top-1 -right-1 flex h-2.5 w-2.5">
            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-indigo-400 opacity-75"></span>
            <span className="relative inline-flex rounded-full h-2.5 w-2.5 bg-indigo-500"></span>
          </span>
        )}
      </button>
    </div>
  );
}
