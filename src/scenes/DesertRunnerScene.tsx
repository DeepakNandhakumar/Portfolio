import React, { useRef } from 'react';
import { useFrame } from '@react-three/fiber';
import * as THREE from 'three';
import { DesertEnvironment } from './DesertEnvironment';
import { DesertRunner } from './DesertRunner';

interface DesertRunnerSceneProps {
  scrollProgress: number; // 0 to 1
  activeStationIndex: number; // 0 to 5
}

export const DesertRunnerScene: React.FC<DesertRunnerSceneProps> = ({
  scrollProgress,
  activeStationIndex,
}) => {
  const cameraTargetRef = useRef(new THREE.Vector3(0, 1.2, 0));

  useFrame((state, delta) => {
    // Current runner Z coordinate
    const runnerZ = THREE.MathUtils.lerp(3, -65, scrollProgress);

    // Alternate camera X offset depending on active station:
    // Stations 0, 2, 4 (Left panels) -> Camera shifts right (+1.5) so left has space
    // Stations 1, 3 (Right panels) -> Camera shifts left (-1.5) so right has space
    // Station 5 (Center Finale) -> Camera centers (0)
    let targetCamX = 0;
    if (activeStationIndex === 0 || activeStationIndex === 2 || activeStationIndex === 4) {
      targetCamX = 1.4;
    } else if (activeStationIndex === 1 || activeStationIndex === 3) {
      targetCamX = -1.4;
    } else {
      targetCamX = 0;
    }

    const targetCamY = 2.4;
    const targetCamZ = runnerZ + 6.8;

    // Smoothly interpolate camera position
    state.camera.position.x = THREE.MathUtils.lerp(state.camera.position.x, targetCamX, delta * 3.5);
    state.camera.position.y = THREE.MathUtils.lerp(state.camera.position.y, targetCamY, delta * 3.5);
    state.camera.position.z = THREE.MathUtils.lerp(state.camera.position.z, targetCamZ, delta * 3.5);

    // Camera lookAt point
    const lookTarget = new THREE.Vector3(
      targetCamX * -0.25,
      1.1,
      runnerZ - 2.5
    );
    cameraTargetRef.current.lerp(lookTarget, delta * 4.0);
    state.camera.lookAt(cameraTargetRef.current);
  });

  return (
    <>
      <DesertEnvironment scrollProgress={scrollProgress} />
      <DesertRunner scrollProgress={scrollProgress} />
    </>
  );
};
