/**
 * heading-reveal.ts
 *
 * Headings with [data-split-reveal] split into lines and
 * animate (translateY + opacity) as they scroll into view.
 *
 * Used on About headings, post titles, and block headings.
 */
import { gsap, ScrollTrigger, SplitText } from './gsap-setup';

export function initHeadingReveal(): void {
  const headings = document.querySelectorAll<HTMLElement>('[data-split-reveal]');
  if (!headings.length) return;

  headings.forEach((heading) => {
    // Split into lines for a clean reveal effect
    const split = new SplitText(heading, { type: 'lines', linesClass: 'split-line' });

    gsap.from(split.lines, {
      opacity: 0,
      y: 30,
      duration: 0.6,
      ease: 'power3.out',
      stagger: 0.1,
      scrollTrigger: {
        trigger: heading,
        start: 'top 85%',
        toggleActions: 'play none none none',
      },
    });
  });
}
