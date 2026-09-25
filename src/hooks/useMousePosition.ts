import { useState, useEffect } from 'react';

export interface MousePosition {
  x: number; // raw x
  y: number; // raw y
  normalizedX: number; // -1 to 1
  normalizedY: number; // -1 to 1
}

export function useMousePosition(): MousePosition {
  const [position, setPosition] = useState<MousePosition>({
    x: 0,
    y: 0,
    normalizedX: 0,
    normalizedY: 0,
  });

  useEffect(() => {
    const handleMouseMove = (event: MouseEvent) => {
      const { clientX, clientY } = event;
      const { innerWidth, innerHeight } = window;

      const normX = (clientX / innerWidth) * 2 - 1;
      const normY = -(clientY / innerHeight) * 2 + 1;

      setPosition({
        x: clientX,
        y: clientY,
        normalizedX: normX,
        normalizedY: normY,
      });
    };

    window.addEventListener('mousemove', handleMouseMove, { passive: true });
    return () => window.removeEventListener('mousemove', handleMouseMove);
  }, []);

  return position;
}
