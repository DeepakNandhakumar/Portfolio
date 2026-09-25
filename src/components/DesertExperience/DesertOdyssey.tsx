import React, { useState, useEffect, useRef, Suspense } from 'react';
import { Canvas } from '@react-three/fiber';
import { motion } from 'framer-motion';
import { DesertRunnerScene } from '../../scenes/DesertRunnerScene';
import { FreezeLockScreen } from './FreezeLockScreen';
import { DesertStations } from './DesertStations';
import { ResumeModal } from '../Resume/ResumeModal';
import { CustomCursor } from '../ui/CustomCursor';

export const DesertOdyssey: React.FC = () => {
  const [isUnlocked, setIsUnlocked] = useState(false);
  const [scrollProgress, setScrollProgress] = useState(0); // 0 to 1
  const [activeStationIndex, setActiveStationIndex] = useState(0); // 0 to 5
  const [isResumeModalOpen, setIsResumeModalOpen] = useState(false);

  // Smooth scroll accumulator
  const targetProgressRef = useRef(0);
  const currentProgressRef = useRef(0);

  // Trackpad / Wheel listener
  useEffect(() => {
    if (!isUnlocked) return;

    const handleWheel = (e: WheelEvent) => {
      // Delta normalization
      const delta = e.deltaY * 0.0006;
      targetProgressRef.current = Math.min(1, Math.max(0, targetProgressRef.current + delta));
    };

    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'ArrowDown' || e.key === 'PageDown' || e.key === ' ') {
        e.preventDefault();
        targetProgressRef.current = Math.min(1, targetProgressRef.current + 0.18);
      } else if (e.key === 'ArrowUp' || e.key === 'PageUp') {
        e.preventDefault();
        targetProgressRef.current = Math.max(0, targetProgressRef.current - 0.18);
      }
    };

    window.addEventListener('wheel', handleWheel, { passive: true });
    window.addEventListener('keydown', handleKeyDown);

    // Animation loop for silky smooth lerping
    let rafId: number;
    const updateProgress = () => {
      currentProgressRef.current += (targetProgressRef.current - currentProgressRef.current) * 0.12;
      const prog = currentProgressRef.current;
      setScrollProgress(prog);

      // Determine active station index based on progress
      if (prog < 0.18) {
        setActiveStationIndex(0);
      } else if (prog < 0.38) {
        setActiveStationIndex(1);
      } else if (prog < 0.58) {
        setActiveStationIndex(2);
      } else if (prog < 0.78) {
        setActiveStationIndex(3);
      } else if (prog < 0.94) {
        setActiveStationIndex(4);
      } else {
        setActiveStationIndex(5);
      }

      rafId = requestAnimationFrame(updateProgress);
    };

    rafId = requestAnimationFrame(updateProgress);

    return () => {
      window.removeEventListener('wheel', handleWheel);
      window.removeEventListener('keydown', handleKeyDown);
      cancelAnimationFrame(rafId);
    };
  }, [isUnlocked]);

  const handleSelectStation = (index: number) => {
    const stationProgressMap = [0.05, 0.28, 0.48, 0.68, 0.86, 1.0];
    targetProgressRef.current = stationProgressMap[index];
    setActiveStationIndex(index);
  };

  return (
    <div className="relative w-screen h-screen overflow-hidden bg-amber-50 selection:bg-indigo-500/20 selection:text-indigo-700">
      {/* Magnetic Cursor */}
      <CustomCursor />

      {/* 3D Desert Runner Canvas Layer */}
      <div className="absolute inset-0 w-full h-full z-0">
        <Canvas
          camera={{ position: [0, 2.4, 9.5], fov: 48 }}
          gl={{ antialias: true, alpha: false, powerPreference: 'high-performance' }}
          className="w-full h-full"
        >
          <Suspense fallback={null}>
            <DesertRunnerScene
              scrollProgress={scrollProgress}
              activeStationIndex={activeStationIndex}
            />
          </Suspense>
        </Canvas>
      </div>

      {/* Floating Scrollytelling Panels & Station HUD */}
      {isUnlocked && (
        <DesertStations
          activeStationIndex={activeStationIndex}
          onSelectStation={handleSelectStation}
          onOpenResume={() => setIsResumeModalOpen(true)}
        />
      )}

      {/* Initial Freeze Lock Gate */}
      <FreezeLockScreen
        isUnlocked={isUnlocked}
        onUnlock={() => setIsUnlocked(true)}
      />

      {/* Official Verified Resume Modal */}
      <ResumeModal
        isOpen={isResumeModalOpen}
        onClose={() => setIsResumeModalOpen(false)}
      />
    </div>
  );
};
