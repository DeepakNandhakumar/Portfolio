import React, { useState } from 'react';
import { Dumbbell, Flame, CheckCircle2, Trophy, Plus, Clock } from 'lucide-react';

export const FitNHealSandbox: React.FC = () => {
  const [workoutType, setWorkoutType] = useState<'cardio' | 'strength' | 'hiit'>('strength');
  const [duration, setDuration] = useState<number>(45);
  const [completedExercises, setCompletedExercises] = useState<string[]>(['Push-ups', 'Squats']);

  const caloriesPerMinute = workoutType === 'cardio' ? 8.5 : workoutType === 'strength' ? 6.0 : 10.2;
  const estimatedBurn = Math.round(duration * caloriesPerMinute);

  const toggleExercise = (name: string) => {
    if (completedExercises.includes(name)) {
      setCompletedExercises(completedExercises.filter((e) => e !== name));
    } else {
      setCompletedExercises([...completedExercises, name]);
    }
  };

  const exerciseList = [
    { name: 'Push-ups', target: 'Chest & Triceps', sets: '3 x 15 reps' },
    { name: 'Squats', target: 'Quadriceps & Glutes', sets: '4 x 12 reps' },
    { name: 'Plank Hold', target: 'Core Stability', sets: '3 x 60 sec' },
    { name: 'Pull-ups', target: 'Lats & Biceps', sets: '3 x 8 reps' },
  ];

  return (
    <div className="rounded-2xl bg-white border border-emerald-200 shadow-md p-5 text-slate-800 space-y-4">
      {/* Header */}
      <div className="flex items-center justify-between pb-3 border-b border-emerald-100">
        <div className="flex items-center gap-2">
          <div className="w-8 h-8 rounded-lg bg-emerald-500 text-white flex items-center justify-center shadow-xs">
            <Dumbbell className="w-4 h-4" />
          </div>
          <div>
            <h4 className="text-xs font-bold text-slate-900 uppercase tracking-wider">
              FitNHeal Workout & Habit Tracker
            </h4>
            <p className="text-[11px] text-emerald-700 font-mono">
              Pure HTML5 / CSS3 / Modern JS DOM Engine
            </p>
          </div>
        </div>
        <span className="px-2.5 py-0.5 rounded-full bg-emerald-50 text-emerald-700 text-[10px] font-mono font-bold border border-emerald-200">
          Fitness Sandbox
        </span>
      </div>

      {/* Workout Type Selector & Duration */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-xs">
        <div className="p-3 rounded-xl bg-slate-50 border border-slate-100">
          <label className="font-medium text-slate-600 block mb-1">Workout Mode:</label>
          <div className="grid grid-cols-3 gap-1.5">
            {[
              { id: 'strength', label: 'Strength' },
              { id: 'cardio', label: 'Cardio' },
              { id: 'hiit', label: 'HIIT' },
            ].map((mode) => (
              <button
                key={mode.id}
                onClick={() => setWorkoutType(mode.id as any)}
                className={`py-1.5 rounded-lg text-xs font-semibold cursor-pointer transition-colors ${
                  workoutType === mode.id
                    ? 'bg-emerald-600 text-white shadow-xs'
                    : 'bg-white text-slate-700 hover:bg-slate-100 border border-slate-200'
                }`}
              >
                {mode.label}
              </button>
            ))}
          </div>
        </div>

        <div className="p-3 rounded-xl bg-slate-50 border border-slate-100">
          <div className="flex justify-between font-medium text-slate-600 mb-1">
            <span className="flex items-center gap-1">
              <Clock className="w-3.5 h-3.5 text-emerald-600" />
              Session Duration:
            </span>
            <span className="font-bold text-slate-900 font-mono">{duration} mins</span>
          </div>
          <input
            type="range"
            min="15"
            max="90"
            step="5"
            value={duration}
            onChange={(e) => setDuration(Number(e.target.value))}
            className="w-full accent-emerald-600 cursor-pointer"
          />
        </div>
      </div>

      {/* Stats Summary */}
      <div className="p-3.5 rounded-xl bg-emerald-50/70 border border-emerald-200 flex items-center justify-between">
        <div>
          <span className="text-xs font-bold text-emerald-900 uppercase tracking-wider block">
            Estimated Active Energy Burn
          </span>
          <div className="text-2xl font-extrabold text-emerald-800 font-mono mt-0.5 flex items-center gap-1.5">
            <Flame className="w-5 h-5 text-orange-500 fill-orange-500" />
            {estimatedBurn} kcal
          </div>
        </div>
        <div className="text-right">
          <span className="text-[11px] text-slate-500 font-mono block">Completed</span>
          <span className="text-sm font-bold text-slate-800 font-mono">
            {completedExercises.length} / {exerciseList.length} Sets
          </span>
        </div>
      </div>

      {/* Exercise Checklist */}
      <div className="space-y-1.5">
        <span className="text-xs font-bold text-slate-500 uppercase tracking-wider block">
          Today's Routine Checklist:
        </span>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
          {exerciseList.map((ex) => {
            const isDone = completedExercises.includes(ex.name);
            return (
              <button
                key={ex.name}
                onClick={() => toggleExercise(ex.name)}
                className={`p-2.5 rounded-xl border text-left flex items-center justify-between transition-all cursor-pointer ${
                  isDone
                    ? 'bg-emerald-50/50 border-emerald-300 text-slate-900'
                    : 'bg-white border-slate-200 text-slate-600 hover:border-slate-300'
                }`}
              >
                <div>
                  <div className={`text-xs font-bold ${isDone ? 'line-through text-slate-400' : 'text-slate-800'}`}>
                    {ex.name}
                  </div>
                  <div className="text-[10px] text-slate-500 font-mono">
                    {ex.target} • {ex.sets}
                  </div>
                </div>
                <CheckCircle2
                  className={`w-4 h-4 ${isDone ? 'text-emerald-600 fill-emerald-100' : 'text-slate-300'}`}
                />
              </button>
            );
          })}
        </div>
      </div>
    </div>
  );
};
