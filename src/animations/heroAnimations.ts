import gsap from 'gsap';

export interface HeroAnimTimelineConfig {
  onStep1?: () => void; // Camera forward
  onStep2?: () => void; // Character appears
  onStep3?: () => void; // Character jumps/falls
  onStep4?: () => void; // Character lands & ripple
  onWalkingStart?: () => void; // Character starts walking
  onTextReveal?: () => void; // Text elements reveal
}

export function createHeroOpeningTimeline(
  targetElements: {
    heroCanvas?: HTMLElement | null;
    title?: HTMLElement | null;
    roles?: HTMLElement | null;
    bio?: HTMLElement | null;
    buttons?: HTMLElement | null;
    badges?: HTMLElement | null;
  },
  callbacks?: HeroAnimTimelineConfig
) {
  const tl = gsap.timeline({
    defaults: { ease: 'power2.out' },
  });

  // Step 1: Environment reveals, camera moves forward
  tl.add(() => callbacks?.onStep1?.(), 0.1);

  // Step 2: Character appears above road
  tl.add(() => callbacks?.onStep2?.(), 0.5);

  // Step 3: Character jumps / falls
  tl.add(() => callbacks?.onStep3?.(), 0.9);

  // Step 4: Landing ripple & road lights
  tl.add(() => callbacks?.onStep4?.(), 1.5);

  // Character walking starts
  tl.add(() => callbacks?.onWalkingStart?.(), 1.8);

  // Step 5: Text and UI reveal sequence
  if (targetElements.title) {
    tl.fromTo(
      targetElements.title,
      { opacity: 0, y: 35 },
      { opacity: 1, y: 0, duration: 0.8, ease: 'power3.out' },
      1.7
    );
  }

  if (targetElements.roles) {
    tl.fromTo(
      targetElements.roles,
      { opacity: 0, y: 20 },
      { opacity: 1, y: 0, duration: 0.6, ease: 'power3.out' },
      1.9
    );
  }

  if (targetElements.bio) {
    tl.fromTo(
      targetElements.bio,
      { opacity: 0, y: 20 },
      { opacity: 1, y: 0, duration: 0.6, ease: 'power3.out' },
      2.1
    );
  }

  if (targetElements.buttons) {
    tl.fromTo(
      targetElements.buttons,
      { opacity: 0, y: 20, scale: 0.98 },
      { opacity: 1, y: 0, scale: 1, duration: 0.6, ease: 'power3.out' },
      2.3
    );
  }

  if (targetElements.badges) {
    tl.fromTo(
      targetElements.badges,
      { opacity: 0, y: 15 },
      { opacity: 1, y: 0, duration: 0.6, ease: 'power3.out' },
      2.5
    );
  }

  return tl;
}
