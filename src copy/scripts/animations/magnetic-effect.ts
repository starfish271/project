/**
 * magnetic-effect.ts
 *
 * Elements with [data-magnetic] pull slightly toward the cursor when
 * it gets close, then spring back with an elastic ease when it leaves.
 *
 * data-magnetic-strength controls how strong the pull is (default 0.3,
 * meaning the element moves at most 30% of the cursor's offset).
 *
 * Implementation:
 *   - gsap.quickTo creates a highly optimized setter for x/y that we
 *     call on mousemove (much faster than gsap.to per event).
 *   - On mouseleave, we animate back to 0,0 with elastic easeOut.
 *   - Disabled on touch devices (pointer: coarse) via matchMedia in
 *     main.ts — this function is only called in the full-animation path.
 */
import { gsap } from './gsap-setup';

export function initMagneticEffect(): void {
  const magnets = document.querySelectorAll<HTMLElement>('[data-magnetic]');
  if (!magnets.length) return;

  magnets.forEach((magnet) => {
    // Read strength from data attribute (default 0.3 = subtle)
    const strength = parseFloat(magnet.dataset.magneticStrength || '0.3');

    // Create quick setters for x and y — these are the fast path
    // for mousemove events. quickTo returns a function that we call
    // with the target value; GSAP handles the tween internally.
    const xTo = gsap.quickTo(magnet, 'x', {
      duration: 0.4,
      ease: 'power3.out',
    });
    const yTo = gsap.quickTo(magnet, 'y', {
      duration: 0.4,
      ease: 'power3.out',
    });

    magnet.addEventListener('mousemove', (e: MouseEvent) => {
      const rect = magnet.getBoundingClientRect();
      // Calculate cursor position relative to the element center
      const centerX = rect.left + rect.width / 2;
      const centerY = rect.top + rect.height / 2;
      const dx = (e.clientX - centerX) * strength;
      const dy = (e.clientY - centerY) * strength;

      xTo(dx);
      yTo(dy);
    });

    magnet.addEventListener('mouseleave', () => {
      // Spring back to origin with elastic ease for a satisfying return
      gsap.to(magnet, {
        x: 0,
        y: 0,
        duration: 0.6,
        ease: 'elastic.out(1, 0.4)',
      });
    });
  });
}
