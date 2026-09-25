/**
 * main.ts
 *
 * Central animation controller.
 *
 * Responsibilities:
 *   - Initialize all animations on page load
 *   - Re-initialize after Astro View Transitions
 *   - Use gsap.matchMedia() to conditionally enable/disable effects
 *     based on prefers-reduced-motion and screen size
 *   - Clean up ScrollTriggers on navigation to prevent duplicates
 *
 * matchMedia conditions:
 *   "(prefers-reduced-motion: no-preference) and (min-width: 769px) and (pointer: fine)"
 *     → Full experience: smooth scroll, pin, scrubbed effects, magnetic
 *   "(prefers-reduced-motion: reduce)" or small screens / touch
 *     → No animations; content shows immediately; cards are a swipe row
 */

import { gsap, ScrollTrigger, ScrollSmoother } from './animations/gsap-setup';
import { initIntroScramble } from './animations/intro-scramble';
import { initHeadingReveal } from './animations/heading-reveal';
import { initHorizontalScroll } from './animations/horizontal-scroll';
import { initCardToNavMorph } from './animations/card-to-nav-morph';
import { initPostAnimations } from './animations/post-animations';
import { initMagneticEffect } from './animations/magnetic-effect';

// ── Guard: only run in the browser (not during SSR) ───────────
// Astro processes script imports during SSG, but GSAP needs window.
// If window doesn't exist, skip everything — the script will run
// again in the browser when the page loads.
if (typeof window !== 'undefined') {

// ── Smooth scrolling wrapper ──────────────────────────────────
// ScrollSmoother creates a wrapper div for smooth, inertia-based
// scrolling. We only enable it on desktop without reduced-motion.
let smoother: ScrollSmoother | null = null;

function initSmoothScroll(): void {
  if (smoother) {
    smoother.kill();
    smoother = null;
  }
  smoother = ScrollSmoother.create({
    wrapper: '#main',
    content: '#main',
    smooth: 0.6,
    effects: true,
    normalizeScroll: true,
  });
}

// ── Full animation suite (desktop, no reduced motion) ────────
function initFullAnimations(): void {
  initSmoothScroll();
  initIntroScramble();
  initHeadingReveal();
  initHorizontalScroll();
  initCardToNavMorph();
  initPostAnimations();
  initMagneticEffect();
  ScrollTrigger.refresh();
}

// ── Minimal mode (mobile, touch, or reduced motion) ──────────
function initMinimalAnimations(): void {
  // No smooth scroll, no pinning, no scrub effects.
  // Content is visible immediately — no SplitText or ScrambleText.
  // The cards section stays as a native scroll-snap swipe row (CSS).
  // The NavBar should show immediately since there's no morph animation.
  const navBar = document.getElementById('site-nav-bar');
  if (navBar) {
    navBar.classList.add('is-visible');
  }
  // Still do heading reveals (they're subtle and non-disruptive)
  initHeadingReveal();
}

// ── Cleanup: kill all ScrollTriggers before re-init ──────────
function cleanupAnimations(): void {
  ScrollTrigger.getAll().forEach((st) => st.kill());
  if (smoother) {
    smoother.kill();
    smoother = null;
  }
}

// ── MatchMedia: the single source of truth for what runs ─────
const mm = gsap.matchMedia();

function setupMatchMedia(): void {
  mm.add(
    '(prefers-reduced-motion: no-preference) and (min-width: 769px) and (pointer: fine)',
    initFullAnimations
  );
  mm.add(
    '(prefers-reduced-motion: reduce), (max-width: 768px), (pointer: coarse)',
    initMinimalAnimations
  );
}

// ── Initialize on first load ─────────────────────────────────
function init(): void {
  cleanupAnimations();
  setupMatchMedia();
}

init();

// ── Re-initialize after Astro View Transitions ───────────────
// When the page swaps, the DOM is replaced. We need to clean up
// old ScrollTriggers and re-create animations for the new content.
document.addEventListener('astro:after-swap', () => {
  init();
});

// ── Resize: refresh ScrollTriggers so pin/morph distances stay correct ──
// invalidateOnRefresh is set on the key triggers, but we also need to
// call refresh after the browser settles the new dimensions.
let resizeTimer: number | undefined;
window.addEventListener('resize', () => {
  clearTimeout(resizeTimer);
  resizeTimer = window.setTimeout(() => {
    ScrollTrigger.refresh();
  }, 150);
});

} // end if (typeof window !== 'undefined')
