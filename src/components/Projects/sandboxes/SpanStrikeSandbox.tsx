import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Gamepad2, Zap, Play, RotateCcw, Target, Shield, Flame, Activity } from 'lucide-react';

export const SpanStrikeSandbox: React.FC = () => {
  const [ammo, setAmmo] = useState<number>(30);
  const [score, setScore] = useState<number>(1420);
  const [fps, setFps] = useState<number>(60);
  const [gravity, setGravity] = useState<number>(9.8);
  const [particles, setParticles] = useState<{ id: number; x: number; y: number; color: string }[]>([]);
  const [hitMessage, setHitMessage] = useState<string>('PHYSICS READY // 60 FPS LUMEN PIPELINE');

  // Random FPS jitter for realistic game telemetry feel
  useEffect(() => {
    const timer = setInterval(() => {
      setFps(59 + Math.floor(Math.random() * 3));
    }, 1200);
    return () => clearInterval(timer);
  }, []);

  const handleShoot = (e: React.MouseEvent<HTMLDivElement>) => {
    if (ammo <= 0) {
      setHitMessage('RELOAD REQUIRED // PRESS RELOAD');
      return;
    }

    const rect = e.currentTarget.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;

    const newParticle = {
      id: Date.now() + Math.random(),
      x,
      y,
      color: ['#A855F7', '#06B6D4', '#EC4899', '#EAB308'][Math.floor(Math.random() * 4)],
    };

    setParticles((prev) => [...prev.slice(-12), newParticle]);
    setAmmo((prev) => prev - 1);
    setScore((prev) => prev + 150);
    setHitMessage(`CRITICAL HIT @ [${Math.round(x)}, ${Math.round(y)}] // DAMAGE: 150`);
  };

  const handleReload = () => {
    setAmmo(30);
    setHitMessage('MAGAZINE REPLENISHED // 30 ROUNDS READY');
  };

  return (
    <div className="rounded-2xl bg-slate-950 border border-purple-900/60 shadow-xl p-5 text-slate-200 space-y-4 font-mono">
      {/* HUD Header */}
      <div className="flex items-center justify-between pb-3 border-b border-purple-900/40">
        <div className="flex items-center gap-2">
          <div className="w-8 h-8 rounded-lg bg-purple-600 text-white flex items-center justify-center shadow-[0_0_15px_rgba(147,51,234,0.5)]">
            <Gamepad2 className="w-4 h-4" />
          </div>
          <div>
            <h4 className="text-xs font-bold text-purple-300 uppercase tracking-wider">
              SpanStrike Unreal 5 Physics Simulator
            </h4>
            <p className="text-[10px] text-slate-400">
              C++ Mechanics • Chaos Rigid-Body Engine
            </p>
          </div>
        </div>

        <div className="flex items-center gap-3 text-xs">
          <div className="px-2.5 py-0.5 rounded bg-purple-950 border border-purple-700 text-purple-300 flex items-center gap-1.5 font-bold">
            <Activity className="w-3 h-3 text-emerald-400" />
            <span>{fps} FPS</span>
          </div>
        </div>
      </div>

      {/* Interactive Game Viewport */}
      <div
        onClick={handleShoot}
        className="relative w-full h-44 rounded-xl bg-gradient-to-b from-slate-900 via-purple-950/40 to-slate-900 border border-purple-800/50 overflow-hidden cursor-crosshair flex flex-col justify-between p-4 group select-none shadow-inner"
      >
        {/* Background Grid Lines */}
        <div className="absolute inset-0 bg-[linear-gradient(to_right,#3b076415_1px,transparent_1px),linear-gradient(to_bottom,#3b076415_1px,transparent_1px)] bg-[size:24px_24px] pointer-events-none" />

        {/* Dynamic Targets / Floating Orbs */}
        <div className="absolute top-8 left-1/4 w-10 h-10 rounded-full bg-cyan-500/20 border border-cyan-400 animate-bounce flex items-center justify-center pointer-events-none">
          <Target className="w-5 h-5 text-cyan-300" />
        </div>
        <div className="absolute top-12 right-1/4 w-12 h-12 rounded-full bg-purple-500/20 border border-purple-400 animate-pulse flex items-center justify-center pointer-events-none">
          <Shield className="w-6 h-6 text-purple-300" />
        </div>

        {/* Click Particles */}
        {particles.map((p) => (
          <motion.div
            key={p.id}
            initial={{ scale: 0, opacity: 1 }}
            animate={{ scale: 2.5, opacity: 0 }}
            transition={{ duration: 0.6 }}
            style={{ left: p.x - 12, top: p.y - 12, backgroundColor: p.color }}
            className="absolute w-6 h-6 rounded-full blur-[2px] pointer-events-none"
          />
        ))}

        {/* Viewport Top HUD */}
        <div className="relative z-10 flex items-center justify-between text-[11px] text-slate-400 font-mono">
          <span>TARGET LOCK: ENGAGED</span>
          <span className="text-amber-400 font-bold">SCORE: {score}</span>
        </div>

        {/* Center Crosshair Hint */}
        <div className="relative z-10 text-center pointer-events-none">
          <p className="text-xs text-purple-300/80 font-bold tracking-widest uppercase">
            [ CLICK VIEWPORT TO FIRE PARTICLE CANNON ]
          </p>
        </div>

        {/* Viewport Bottom Status */}
        <div className="relative z-10 text-[10px] text-emerald-400 bg-slate-950/80 px-2.5 py-1 rounded border border-slate-800 backdrop-blur-xs flex items-center justify-between">
          <span>{hitMessage}</span>
          <span className="text-slate-400">AMMO: {ammo}/30</span>
        </div>
      </div>

      {/* Physics Controls */}
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-2.5 text-xs">
        <div className="p-2.5 rounded-lg bg-slate-900 border border-slate-800">
          <span className="text-slate-400 block text-[10px]">GRAVITY CONSTANT</span>
          <span className="font-bold text-purple-300 text-sm">{gravity} m/s²</span>
        </div>
        <div className="p-2.5 rounded-lg bg-slate-900 border border-slate-800">
          <span className="text-slate-400 block text-[10px]">COLLISION VOLUMES</span>
          <span className="font-bold text-cyan-300 text-sm">Dynamic Mesh</span>
        </div>
        <div className="p-2.5 rounded-lg bg-slate-900 border border-slate-800">
          <span className="text-slate-400 block text-[10px]">SHADING PIPELINE</span>
          <span className="font-bold text-amber-300 text-sm">Lumen Global</span>
        </div>
        <button
          onClick={handleReload}
          className="p-2.5 rounded-lg bg-purple-700 hover:bg-purple-600 text-white font-bold flex items-center justify-center gap-1.5 transition-colors cursor-pointer shadow-sm"
        >
          <RotateCcw className="w-3.5 h-3.5" />
          Reload
        </button>
      </div>
    </div>
  );
};
