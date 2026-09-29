/**
 * post-animations.ts
 *
 * Post page specific animations:
 *   1. Scroll progress bar — a thin accent-colored bar at the top
 *      that fills as you scroll through the post.
 *   2. Block fade-in — content blocks (photo, code, youtube) fade
 *      and slide up slightly as they enter the viewport.
 *   3. Title SplitText reveal — handled by heading-reveal.ts via
 *      the data-split-reveal attribute on the post title.
 */
import { gsap, ScrollTrigger } from './gsap-setup';

export function initPostAnimations(): void {
  // ── Scroll progress bar ──────────────────────────────────────
  const progressBar = document.getElementById('scroll-progress');
  if (progressBar) {
    // Animate the width from 0 to 100% based on scroll position
    gsap.to(progressBar, {
      width: '100%',
      ease: 'none',
      scrollTrigger: {
        trigger: 'body',
        start: 'top top',
        end: 'bottom bottom',
        scrub: 0.3,
      },
    });
  }

  // ── Block fade-in ────────────────────────────────────────────
  // Elements with [data-fade-in] fade and slide up as they enter.
  const fadeElements = document.querySelectorAll<HTMLElement>('[data-fade-in]');
  if (fadeElements.length) {
    fadeElements.forEach((el) => {
      gsap.from(el, {
        opacity: 0,
        y: 30,
        duration: 0.6,
        ease: 'power3.out',
        scrollTrigger: {
          trigger: el,
          start: 'top 88%',
          toggleActions: 'play none none none',
        },
      });
    });
  }
}
