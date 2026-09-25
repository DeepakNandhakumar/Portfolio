import { useState, useEffect } from 'react';

export interface ScrollData {
  scrollY: number;
  scrollProgress: number; // 0 to 1
  scrollDirection: 'up' | 'down';
  isScrolled: boolean;
}

export function useScrollProgress(): ScrollData {
  const [scrollData, setScrollData] = useState<ScrollData>({
    scrollY: 0,
    scrollProgress: 0,
    scrollDirection: 'down',
    isScrolled: false,
  });

  useEffect(() => {
    let lastScrollY = window.pageYOffset;

    const handleScroll = () => {
      const currentScrollY = window.pageYOffset;
      const totalHeight = document.documentElement.scrollHeight - window.innerHeight;
      const progress = totalHeight > 0 ? Math.min(Math.max(currentScrollY / totalHeight, 0), 1) : 0;
      const direction = currentScrollY > lastScrollY ? 'down' : 'up';

      setScrollData({
        scrollY: currentScrollY,
        scrollProgress: progress,
        scrollDirection: direction,
        isScrolled: currentScrollY > 20,
      });

      lastScrollY = currentScrollY;
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    handleScroll();

    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return scrollData;
}
