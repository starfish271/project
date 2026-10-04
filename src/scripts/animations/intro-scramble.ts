/**
 * intro-scramble.ts
 *
 * On page load, the name "Gwyn Fox" decodes with ScrambleText,
 * then the intro line reveals word by word with SplitText.
 *
 * ScrambleText gives a Matrix-style character decode effect.
 * SplitText splits the line into word spans so we can stagger
 * their opacity/translateY for a clean reveal.
 */
import { gsap, SplitText } from './gsap-setup';

export function initIntroScramble(): void {
  const nameEl = document.querySelector<HTMLElement>('[data-scramble]');
  const lineEl = document.querySelector<HTMLElement>('[data-split-reveal]');

  if (!nameEl) return;

  // Scramble the name on load — 0.6s, power3.out
  gsap.to(nameEl, {
    duration: 0.6,
    ease: 'power3.out',
    scrambleText: {
      text: nameEl.textContent || '',
      chars: 'abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ',
      speed: 0.4,
    },
    onComplete: () => {
      // After scramble completes, reveal the intro line word by word
      if (!lineEl) return;
      const split = new SplitText(lineEl, { type: 'words' });
      gsap.from(split.words, {
        opacity: 0,
        y: 20,
        duration: 0.5,
        ease: 'power3.out',
        stagger: 0.08,
      });
    },
  });
}
