/**
 * horizontal-scroll.ts
 *
 * The project cards section pins while vertical scrolling moves
 * the card row horizontally (ScrollTrigger, pin: true, scrub: 1).
 *
 * Scrubbed effects while scrolling:
 *   - Each card scales from 0.9 → 1 and opacity 60% → 100% as it
 *     reaches the center of the screen, then reverses as it leaves.
 *   - A large outlined word "WORK" drifts slowly behind the cards
 *     for a parallax effect (moves at a fraction of the scroll speed).
 *   - A monospace counter (e.g. "01 / 04") updates as each card
 *     passes the center.
 *
 * Scroll distance is calculated from the total width of the row and
 * recalculated on window resize (via ScrollTrigger.refresh).
 *
 * On mobile / touch / reduced-motion: this file does NOT run.
 * The cards stay as a native horizontal swipe row with scroll-snap,
 * and the NavBar shows from the start (handled in main.ts).
 */
import { gsap, ScrollTrigger } from './gsap-setup';

export function initHorizontalScroll(): void {
  const section = document.querySelector<HTMLElement>('#work');
  const track = document.querySelector<HTMLElement>('#work-track');
  const bgWord = document.querySelector<HTMLElement>('.work-bg-word');
  const counter = document.querySelector<HTMLElement>('#work-current');

  if (!section || !track) return;

  const cards = track.querySelectorAll<HTMLElement>('.work-card');
  if (!cards.length) return;

  // ── Calculate scroll distance ────────────────────────────────
  // The pin duration = how far we need to scroll vertically to move
  // the track all the way from left to right.
  // track.scrollWidth - viewport width gives the horizontal distance.
  // We add some extra so the last card is comfortably centered.
  function getScrollDistance(): number {
    return track.scrollWidth - window.innerWidth + 200;
  }

  // ── Main pin + horizontal movement ───────────────────────────
  const tween = gsap.to(track, {
    x: () => -getScrollDistance(),
    ease: 'none',
    scrollTrigger: {
      trigger: section,
      start: 'top top',
      end: () => `+=${getScrollDistance()}`,
      pin: true,
      scrub: 1,
      invalidateOnRefresh: true, // recalc on resize
    },
  });

  // ── Card scale + opacity (containerAnimation) ────────────────
  // Each card scales from 0.9 to 1 and goes from 60% to 100% opacity
  // as it reaches the center of the screen, then reverses as it leaves.
  // We use containerAnimation to tie this to the horizontal scroll.
  cards.forEach((card, i) => {
    gsap.fromTo(
      card,
      { scale: 0.9, opacity: 0.6 },
      {
        scale: 1,
        opacity: 1,
        ease: 'power3.out',
        scrollTrigger: {
          trigger: card,
          containerAnimation: tween,
          start: 'left center',
          end: 'right center',
          toggleActions: 'play reverse play reverse',
        },
      }
    );
  });

  // ── Background parallax word ─────────────────────────────────
  // "WORK" moves across the background more slowly than the cards
  // for a parallax effect. It shifts from right to left as we scroll.
  if (bgWord) {
    gsap.fromTo(
      bgWord,
      { xPercent: 30 },
      {
        xPercent: -30,
        ease: 'none',
        scrollTrigger: {
          trigger: section,
          start: 'top top',
          end: () => `+=${getScrollDistance()}`,
          scrub: 1,
          invalidateOnRefresh: true,
        },
      }
    );
  }

  // ── Counter update ───────────────────────────────────────────
  // Updates the "01 / 04" counter as each card passes the center.
  // We detect which card is closest to center using containerAnimation.
  if (counter) {
    const total = String(cards.length).padStart(2, '0');
    cards.forEach((card, i) => {
      ScrollTrigger.create({
        trigger: card,
        containerAnimation: tween,
        start: 'center center',
        end: 'center center',
        onEnter: () => {
          counter.textContent = String(i + 1).padStart(2, '0');
        },
        onEnterBack: () => {
          counter.textContent = String(i + 1).padStart(2, '0');
        },
      });
    });
  }
}
