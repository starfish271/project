/**
 * card-to-nav-morph.ts
 *
 * At the end of the horizontal scroll, the project cards shrink and
 * move up until they become small chips (thumbnail + title) in the
 * slim sticky nav bar docked at the top of the screen.
 *
 * Approach: scrubbed GSAP timeline (not Flip).
 *
 * Why a scrubbed timeline instead of Flip:
 *   Flip is great for one-shot state transitions (before → after, snap).
 *   But we need the morph to be scrubbed to scroll — the user can scroll
 *   back and forth and the cards should smoothly reverse. A scrubbed
 *   timeline gives us that control: we animate each card's position,
 *   scale, and the nav bar's opacity along a single scroll-driven timeline.
 *
 * How it works:
 *   1. After the horizontal pin ends, we add a second pinned section
 *      that lasts for a short scroll distance (~300px).
 *   2. During that scroll, a timeline scrubs:
 *      a. Each card scales down, moves up toward the nav bar position,
 *         and its image becomes a small circle (the chip thumbnail).
 *      b. The NavBar fades in (opacity 0 → 1, pointer-events enabled).
 *      c. The card titles shrink to chip-title size.
 *   3. When the scroll completes, the cards are hidden (visibility hidden)
 *      and the NavBar is fully visible — it takes over as sticky nav.
 *   4. Scrolling back reverses everything: NavBar fades out, cards
 *      reappear and grow back to their card size.
 *
 * The morph only runs on desktop without reduced-motion. On mobile,
 * the NavBar is shown from the start (handled in main.ts minimal mode).
 */
import { gsap, ScrollTrigger } from './gsap-setup';

export function initCardToNavMorph(): void {
  const section = document.querySelector<HTMLElement>('#work');
  const track = document.querySelector<HTMLElement>('#work-track');
  const navBar = document.getElementById('site-nav-bar');

  if (!section || !track || !navBar) return;

  // Only morph real post cards, not "Coming soon" placeholders
  const realCards = track.querySelectorAll<HTMLElement>('.work-card:not(.work-card-placeholder)');

  // If no real cards, just show the nav bar
  if (!realCards.length) {
    navBar.classList.add('is-visible');
    return;
  }

  // ── Build the morph timeline ─────────────────────────────────
  // This timeline is pinned to a short scroll range after the
  // horizontal scroll section. We append it to the same section.

  const morphDistance = 400; // px of vertical scroll for the morph

  const tl = gsap.timeline({
    scrollTrigger: {
      trigger: section,
      start: () => {
        // Start after the horizontal scroll ends.
        // The horizontal pin ends at `+=${getScrollDistance()}`.
        // We need to start the morph right after that.
        const horizDist = track.scrollWidth - window.innerWidth + 200;
        return `top top+=${horizDist}`;
      },
      end: () => {
        const horizDist = track.scrollWidth - window.innerWidth + 200;
        return `top top+=${horizDist + morphDistance}`;
      },
      scrub: 1,
      invalidateOnRefresh: true,
    },
  });

  // ── NavBar fades in ──────────────────────────────────────────
  tl.to(navBar, {
    opacity: 1,
    duration: 0.3, // first 30% of the timeline
    onStart: () => {
      navBar.style.pointerEvents = 'auto';
    },
    onReverseComplete: () => {
      navBar.style.pointerEvents = 'none';
    },
  });

  // ── Cards shrink and move up ─────────────────────────────────
  // Each card scales down and translates up toward the nav bar.
  // The nav bar is at the top of the viewport, so we move cards
  // up by roughly (viewport height - nav bar height).
  realCards.forEach((card, i) => {
    const cardImage = card.querySelector<HTMLElement>('.card-image');
    const cardInfo = card.querySelector<HTMLElement>('.card-info');
    const cardTitle = cardInfo?.querySelector('.card-title');
    const cardDate = cardInfo?.querySelector('.card-date');

    // Stagger slightly so cards don't all move at the exact same time
    const stagger = i * 0.02;

    // Scale the whole card down
    tl.to(card, {
      scale: 0.15,
      y: () => -(window.innerHeight / 2 - 80), // move up toward nav bar
      duration: 0.5,
      ease: 'power2.in',
    }, stagger);

    // Fade out the card info (date + title) — the chip has its own title
    if (cardInfo) {
      tl.to(cardInfo, {
        opacity: 0,
        duration: 0.2,
      }, stagger);
    }

    // Make the card image circular (like the chip thumbnail)
    if (cardImage) {
      tl.to(cardImage, {
        borderRadius: '50%',
        width: 24,
        height: 24,
        duration: 0.3,
      }, stagger);
    }
  });

  // ── Hide the track after morph completes ─────────────────────
  // When the morph is done, the cards are invisible (they've shrunk
  // to nothing). We hide the track so it doesn't capture pointer events.
  // The NavBar takes over with its own chip elements.
  tl.to(track, {
    opacity: 0,
    duration: 0.15,
    onComplete: () => {
      track.style.visibility = 'hidden';
    },
    onReverseComplete: () => {
      track.style.visibility = 'visible';
    },
  });

  // ── Background word and counter fade out ─────────────────────
  const bgWord = section.querySelector<HTMLElement>('.work-bg-word');
  const counter = section.querySelector<HTMLElement>('.work-counter');

  if (bgWord) {
    tl.to(bgWord, { opacity: 0, duration: 0.2 }, 0);
  }
  if (counter) {
    tl.to(counter, { opacity: 0, duration: 0.2 }, 0);
  }
}
