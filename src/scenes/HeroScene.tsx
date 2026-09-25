import React, { Suspense, useState, useRef } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import * as THREE from 'three';
import { Character } from './Character';
import { Road } from './Road';
import { Environment } from './Environment';
import { Particles } from './Particles';
import { FloatingObjects } from './FloatingObjects';
import { useMousePosition } from '@/hooks/useMousePosition';
import { useReducedMotion } from '@/hooks/useReducedMotion';
import { useResponsive } from '@/hooks/useResponsive';

interface HeroSceneProps {
  scrollProgress?: number;
  onLandSuccess?: () => void;
}

const CameraRig: React.FC<{
  mouseNormX: number;
  mouseNormY: number;
  scrollProgress: number;
  isReducedMotion: boolean;
}> = ({ mouseNormX, mouseNormY, scrollProgress, isReducedMotion }) => {
  useFrame((state, delta) => {
    // Subtle mouse parallax
    const targetX = isReducedMotion ? 0 : mouseNormX * 0.8;
    const targetY = isReducedMotion ? 2.2 : 2.2 + mouseNormY * 0.4;
    const targetZ = 6.2 - scrollProgress * 5.0;

    state.camera.position.x = THREE.MathUtils.lerp(state.camera.position.x, targetX, delta * 2.5);
    state.camera.position.y = THREE.MathUtils.lerp(state.camera.position.y, targetY, delta * 2.5);
    state.camera.position.z = THREE.MathUtils.lerp(state.camera.position.z, targetZ, delta * 2.5);

    // Look at road forward
    const lookTargetZ = -scrollProgress * 6.0;
    state.camera.lookAt(0, 1.2, lookTargetZ);
  });

  return null;
};

export const HeroScene: React.FC<HeroSceneProps> = ({
  scrollProgress = 0,
  onLandSuccess,
}) => {
  const mousePos = useMousePosition();
  const isReduced = useReducedMotion();
  const { isMobile } = useResponsive();
  const [rippleTime, setRippleTime] = useState<number>(0);

  const handleLand = () => {
    setRippleTime(performance.now() / 1000);
    onLandSuccess?.();
  };

  return (
    <div className="relative w-full h-full min-h-[550px] sm:min-h-[650px] lg:min-h-[750px] overflow-hidden select-none">
      <Canvas
        shadows={!isMobile}
        camera={{ position: [0, 2.8, 6.5], fov: isMobile ? 55 : 45 }}
        gl={{ antialias: true, alpha: true, powerPreference: 'high-performance' }}
        className="w-full h-full pointer-events-auto"
      >
        {/* Light Theme Atmosphere Fog */}
        <fog attach="fog" args={['#FFFFFF', 10, 42]} />

        <Suspense fallback={null}>
          <CameraRig
            mouseNormX={mousePos.normalizedX}
            mouseNormY={mousePos.normalizedY}
            scrollProgress={scrollProgress}
            isReducedMotion={isReduced}
          />
          <Environment />
          <Road rippleTrigger={rippleTime} scrollProgress={scrollProgress} />
          <Character
            scrollProgress={scrollProgress}
            onLand={handleLand}
            isReducedMotion={isReduced}
          />
          {!isMobile && <FloatingObjects />}
          <Particles count={isMobile ? 30 : 60} />
        </Suspense>
      </Canvas>

      {/* Subtle Bottom Fade to seamless white */}
      <div className="pointer-events-none absolute bottom-0 left-0 right-0 h-28 bg-gradient-to-t from-white via-white/80 to-transparent" />
    </div>
  );
};
