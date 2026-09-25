import React, { useState } from 'react';
import { Droplet, Moon, Sun, HeartPulse, Check, Sparkles } from 'lucide-react';

export const HealthlineSandbox: React.FC = () => {
  const [glasses, setGlasses] = useState<number>(6);
  const [sleepHours, setSleepHours] = useState<number>(7.5);
  const [stressLevel, setStressLevel] = useState<'low' | 'moderate' | 'high'>('low');

  // Compute Wellness Score (0 - 100)
  const hydrationScore = Math.min(10, glasses) * 3.5; // up to 35 pts
  const sleepScore = Math.min(8, sleepHours) * 5; // up to 40 pts
  const stressScore = stressLevel === 'low' ? 25 : stressLevel === 'moderate' ? 15 : 5; // up to 25 pts
  const totalScore = Math.round(hydrationScore + sleepScore + stressScore);

  return (
    <div className="rounded-2xl bg-white border border-blue-200 shadow-md p-5 text-slate-800 space-y-4">
      {/* Header */}
      <div className="flex items-center justify-between pb-3 border-b border-blue-100">
        <div className="flex items-center gap-2">
          <div className="w-8 h-8 rounded-lg bg-blue-600 text-white flex items-center justify-center shadow-xs">
            <HeartPulse className="w-4 h-4" />
          </div>
          <div>
            <h4 className="text-xs font-bold text-slate-900 uppercase tracking-wider">
              Healthline Wellness Index
            </h4>
            <p className="text-[11px] text-blue-600 font-mono">
              Preventive Biomarkers & Lifestyle Diagnostics
            </p>
          </div>
        </div>
        <span className="px-2.5 py-0.5 rounded-full bg-blue-50 text-blue-700 text-[10px] font-mono font-bold border border-blue-200">
          Wellness Lab
        </span>
      </div>

      {/* Input Indicators */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 text-xs">
        {/* Hydration */}
        <div className="p-3 rounded-xl bg-slate-50 border border-slate-100">
          <div className="flex justify-between font-medium text-slate-600 mb-1">
            <span className="flex items-center gap-1">
              <Droplet className="w-3.5 h-3.5 text-blue-500" />
              Water Intake:
            </span>
            <span className="font-bold text-slate-900 font-mono">{glasses} glasses</span>
          </div>
          <input
            type="range"
            min="2"
            max="12"
            value={glasses}
            onChange={(e) => setGlasses(Number(e.target.value))}
            className="w-full accent-blue-600 cursor-pointer"
          />
        </div>

        {/* Sleep Hours */}
        <div className="p-3 rounded-xl bg-slate-50 border border-slate-100">
          <div className="flex justify-between font-medium text-slate-600 mb-1">
            <span className="flex items-center gap-1">
              <Moon className="w-3.5 h-3.5 text-indigo-500" />
              Sleep Rest:
            </span>
            <span className="font-bold text-slate-900 font-mono">{sleepHours} hrs</span>
          </div>
          <input
            type="range"
            min="4"
            max="10"
            step="0.5"
            value={sleepHours}
            onChange={(e) => setSleepHours(Number(e.target.value))}
            className="w-full accent-indigo-600 cursor-pointer"
          />
        </div>

        {/* Stress Index */}
        <div className="p-3 rounded-xl bg-slate-50 border border-slate-100">
          <label className="font-medium text-slate-600 block mb-1">Perceived Stress:</label>
          <div className="grid grid-cols-3 gap-1">
            {(['low', 'moderate', 'high'] as const).map((s) => (
              <button
                key={s}
                onClick={() => setStressLevel(s)}
                className={`py-1 rounded text-[11px] font-semibold cursor-pointer uppercase ${
                  stressLevel === s
                    ? 'bg-blue-600 text-white shadow-xs'
                    : 'bg-white text-slate-600 border border-slate-200'
                }`}
              >
                {s}
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* Wellness Index Result */}
      <div className="p-3.5 rounded-xl bg-gradient-to-r from-blue-50 to-indigo-50 border border-blue-200 flex items-center justify-between">
        <div>
          <span className="text-xs font-bold text-blue-900 uppercase tracking-wider block">
            Overall Holistic Wellness Index
          </span>
          <div className="text-2xl font-extrabold text-blue-800 font-mono mt-0.5">
            {totalScore} / 100 PTS
          </div>
          <p className="text-[11px] text-slate-600 mt-1">
            Status:{' '}
            <strong className="text-blue-700">
              {totalScore >= 80 ? '🌟 Prime Vitality & Equilibrium' : totalScore >= 60 ? '⚡ Balanced Performance' : '⚠️ Recovery & Hydration Required'}
            </strong>
          </p>
        </div>
        <div className="w-12 h-12 rounded-full bg-white border-2 border-blue-400 flex items-center justify-center font-bold text-blue-600 text-sm font-mono shadow-xs">
          {totalScore}%
        </div>
      </div>
    </div>
  );
};
