import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Activity, Heart, Apple, AlertCircle, CheckCircle, RefreshCw } from 'lucide-react';

export const WellspringSandbox: React.FC = () => {
  const [height, setHeight] = useState<number>(172);
  const [weight, setWeight] = useState<number>(68);
  const [age, setAge] = useState<number>(21);
  const [activity, setActivity] = useState<'sedentary' | 'moderate' | 'active'>('moderate');
  const [selectedSymptom, setSelectedSymptom] = useState<string>('fatigue');

  // Compute BMI
  const heightInMeters = height / 100;
  const bmi = parseFloat((weight / (heightInMeters * heightInMeters)).toFixed(1));

  const getBmiCategory = (val: number) => {
    if (val < 18.5) return { label: 'Underweight', color: 'text-amber-600', bg: 'bg-amber-50', badge: 'Increase Caloric Intake' };
    if (val < 24.9) return { label: 'Optimal Health', color: 'text-emerald-600', bg: 'bg-emerald-50', badge: 'Maintain Routine' };
    if (val < 29.9) return { label: 'Overweight', color: 'text-orange-600', bg: 'bg-orange-50', badge: 'Calorie Deficit' };
    return { label: 'Obese', color: 'text-rose-600', bg: 'bg-rose-50', badge: 'Clinical Consultation' };
  };

  const bmiCat = getBmiCategory(bmi);

  // Calculate daily calories
  const bmr = 10 * weight + 6.25 * height - 5 * age + 5;
  const activityMultiplier = activity === 'sedentary' ? 1.2 : activity === 'moderate' ? 1.55 : 1.75;
  const targetCalories = Math.round(bmr * activityMultiplier);

  const symptomAdviceMap: Record<string, { severity: string; action: string }> = {
    fatigue: { severity: 'Mild Indicator', action: 'Optimize hydration (3L/day) & 8hr sleep rhythm. Check iron levels.' },
    headache: { severity: 'Moderate Tension', action: 'Screen break reminder (20-20-20 rule), posture realignment & electrolyte check.' },
    insomnia: { severity: 'Circadian Disruption', action: 'Avoid blue light 1hr before sleep. Incorporate 15min evening mindfulness.' },
    digestive: { severity: 'Nutritional Imbalance', action: 'Increase prebiotic dietary fiber to 30g/day and reduce refined sugars.' },
  };

  return (
    <div className="rounded-2xl bg-white border border-cyan-100 shadow-md p-5 text-slate-800 space-y-5">
      {/* Header */}
      <div className="flex items-center justify-between pb-3 border-b border-cyan-50">
        <div className="flex items-center gap-2">
          <div className="w-8 h-8 rounded-lg bg-cyan-500 text-white flex items-center justify-center shadow-xs">
            <Activity className="w-4 h-4" />
          </div>
          <div>
            <h4 className="text-xs font-bold text-slate-900 uppercase tracking-wider">
              Wellspring Live Telemetry Engine
            </h4>
            <p className="text-[11px] text-cyan-600 font-mono">
              React + Spring Boot Healthcare Logic Sandbox
            </p>
          </div>
        </div>
        <span className="px-2.5 py-0.5 rounded-full bg-emerald-50 text-emerald-700 text-[10px] font-mono font-bold border border-emerald-100 flex items-center gap-1">
          <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse" />
          Active Engine
        </span>
      </div>

      {/* Interactive Sliders */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-3.5 text-xs">
        {/* Height Slider */}
        <div className="p-3 rounded-xl bg-slate-50 border border-slate-100">
          <div className="flex justify-between font-medium text-slate-600 mb-1">
            <span>Height:</span>
            <span className="font-bold text-slate-900 font-mono">{height} cm</span>
          </div>
          <input
            type="range"
            min="140"
            max="210"
            value={height}
            onChange={(e) => setHeight(Number(e.target.value))}
            className="w-full accent-cyan-600 cursor-pointer"
          />
        </div>

        {/* Weight Slider */}
        <div className="p-3 rounded-xl bg-slate-50 border border-slate-100">
          <div className="flex justify-between font-medium text-slate-600 mb-1">
            <span>Weight:</span>
            <span className="font-bold text-slate-900 font-mono">{weight} kg</span>
          </div>
          <input
            type="range"
            min="40"
            max="130"
            value={weight}
            onChange={(e) => setWeight(Number(e.target.value))}
            className="w-full accent-cyan-600 cursor-pointer"
          />
        </div>

        {/* Activity Level */}
        <div className="p-3 rounded-xl bg-slate-50 border border-slate-100">
          <div className="font-medium text-slate-600 mb-1">Activity Level:</div>
          <select
            value={activity}
            onChange={(e) => setActivity(e.target.value as any)}
            className="w-full text-xs font-semibold bg-white border border-slate-200 rounded-lg p-1 text-slate-800 focus:outline-none"
          >
            <option value="sedentary">Sedentary (Desk)</option>
            <option value="moderate">Moderate (Exercise 3-5d)</option>
            <option value="active">High Intensity</option>
          </select>
        </div>
      </div>

      {/* Real-time Computed Results */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-3.5">
        {/* BMI Card */}
        <div className={`p-3.5 rounded-xl border ${bmiCat.bg} border-slate-200/80`}>
          <div className="flex items-center justify-between">
            <span className="text-xs font-bold text-slate-600 uppercase tracking-wider">
              Computed BMI
            </span>
            <span className={`text-xs font-bold ${bmiCat.color} font-mono px-2 py-0.5 rounded-md bg-white/80`}>
              {bmiCat.label}
            </span>
          </div>
          <div className="text-2xl font-extrabold text-slate-900 font-mono mt-1">
            {bmi}{' '}
            <span className="text-xs font-normal text-slate-500">kg/m²</span>
          </div>
          <p className="text-[11px] text-slate-600 mt-1">
            Recommendation: <strong>{bmiCat.badge}</strong>
          </p>
        </div>

        {/* Diet Target Card */}
        <div className="p-3.5 rounded-xl border bg-indigo-50/50 border-indigo-100">
          <div className="flex items-center justify-between">
            <span className="text-xs font-bold text-slate-600 uppercase tracking-wider">
              Target Energy
            </span>
            <span className="text-xs font-bold text-indigo-600 font-mono px-2 py-0.5 rounded-md bg-white">
              Daily Target
            </span>
          </div>
          <div className="text-2xl font-extrabold text-indigo-700 font-mono mt-1">
            {targetCalories}{' '}
            <span className="text-xs font-normal text-indigo-500">kcal / day</span>
          </div>
          <p className="text-[11px] text-slate-600 mt-1">
            Macro Split: <strong>50% Carbs | 25% Protein | 25% Fats</strong>
          </p>
        </div>
      </div>

      {/* Symptom Checker Module */}
      <div className="p-3.5 rounded-xl bg-slate-900 text-slate-200 text-xs font-mono space-y-2">
        <div className="flex items-center justify-between text-slate-400">
          <span className="flex items-center gap-1.5 text-cyan-400 font-bold">
            <AlertCircle className="w-3.5 h-3.5" />
            INTELLIGENT SYMPTOM TRIAGE
          </span>
          <span className="text-[10px]">Triage Protocol v1.4</span>
        </div>

        <div className="flex flex-wrap gap-1.5 pt-1">
          {['fatigue', 'headache', 'insomnia', 'digestive'].map((sym) => (
            <button
              key={sym}
              onClick={() => setSelectedSymptom(sym)}
              className={`px-2.5 py-1 rounded-lg text-[11px] font-sans font-medium transition-colors cursor-pointer ${
                selectedSymptom === sym
                  ? 'bg-cyan-500 text-slate-950 font-bold shadow-xs'
                  : 'bg-slate-800 text-slate-300 hover:bg-slate-700'
              }`}
            >
              {sym === 'fatigue' && '😴 Constant Fatigue'}
              {sym === 'headache' && '🤕 Migraine / Tension'}
              {sym === 'insomnia' && '🌙 Sleep Irregularity'}
              {sym === 'digestive' && '🥗 Gut Sensitivity'}
            </button>
          ))}
        </div>

        <div className="pt-2 border-t border-slate-800 text-slate-300 text-[11px] font-sans leading-relaxed">
          <span className="text-emerald-400 font-bold font-mono">
            {symptomAdviceMap[selectedSymptom].severity}:{' '}
          </span>
          {symptomAdviceMap[selectedSymptom].action}
        </div>
      </div>
    </div>
  );
};
