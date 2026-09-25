import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

export function initScrollTriggers() {
  if (typeof window === 'undefined') return;

  // Reveal animations for sections
  const revealElements = document.querySelectorAll('.gsap-reveal');
  revealElements.forEach((el) => {
    gsap.fromTo(
      el,
      { opacity: 0, y: 40 },
      {
        opacity: 1,
        y: 0,
        duration: 0.8,
        ease: 'power3.out',
        scrollTrigger: {
          trigger: el,
          start: 'top 85%',
          toggleActions: 'play none none reverse',
        },
      }
    );
  });

  // Stagger grid cards
  const gridContainers = document.querySelectorAll('.gsap-stagger-container');
  gridContainers.forEach((container) => {
    const cards = container.querySelectorAll('.gsap-stagger-card');
    if (cards.length > 0) {
      gsap.fromTo(
        cards,
        { opacity: 0, y: 30 },
        {
          opacity: 1,
          y: 0,
          duration: 0.6,
          stagger: 0.1,
          ease: 'power2.out',
          scrollTrigger: {
            trigger: container,
            start: 'top 80%',
            toggleActions: 'play none none reverse',
          },
        }
      );
    }
  });
}
