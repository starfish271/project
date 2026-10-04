/**
 * floating-orbs.ts
 *
 * Soft, blurred orbs that drift slowly behind the intro section.
 * Each orb follows its own randomized path with gsap.to and repeat.
 * Colors use the site palette: accent, accent-soft, and neutral tones.
 */
import { gsap } from './gsap-setup';

export function initFloatingOrbs(): void {
  const orbs = document.querySelectorAll<HTMLElement>('.intro-orb');
  if (!orbs.length) return;

  orbs.forEach((orb, i) => {
    const sizes = [280, 340, 220, 400];
    const size = sizes[i % sizes.length];
    orb.style.width = `${size}px`;
    orb.style.height = `${size}px`;

    gsap.set(orb, {
      x: (gsap.utils.random(-1, 1) * 200),
      y: (gsap.utils.random(-1, 1) * 150),
    });

    gsap.to(orb, {
      x: `+=${gsap.utils.random(-180, 180)}`,
      y: `+=${gsap.utils.random(-120, 120)}`,
      duration: gsap.utils.random(12, 20),
      ease: 'sine.inOut',
      repeat: -1,
      yoyo: true,
    });
  });
}
