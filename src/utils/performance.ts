export function isWebGLAvailable(): boolean {
  try {
    const canvas = document.createElement('canvas');
    return !!(
      window.WebGLRenderingContext &&
      (canvas.getContext('webgl') || canvas.getContext('experimental-webgl'))
    );
  } catch {
    return false;
  }
}

export function getDeviceTier(): 'low' | 'medium' | 'high' {
  if (typeof window === 'undefined') return 'medium';

  const isMobile = /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(
    navigator.userAgent
  );

  const cores = navigator.hardwareConcurrency || 4;

  if (isMobile) {
    return cores <= 4 ? 'low' : 'medium';
  }

  return cores >= 8 ? 'high' : 'medium';
}

export function prefersReducedMotion(): boolean {
  if (typeof window === 'undefined') return false;
  return window.matchMedia('(prefers-reduced-motion: reduce)').matches;
}
