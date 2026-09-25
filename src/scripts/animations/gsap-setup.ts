/**
 * gsap-setup.ts
 *
 * Central GSAP registration and shared utilities.
 * All animation files import from here so plugins are registered once.
 *
 * Import order matters: register plugins before using them.
 */
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { ScrollSmoother } from 'gsap/ScrollSmoother';
import { SplitText } from 'gsap/SplitText';
import { ScrambleTextPlugin } from 'gsap/ScrambleTextPlugin';

// Register all plugins once
gsap.registerPlugin(
  ScrollTrigger,
  ScrollSmoother,
  SplitText,
  ScrambleTextPlugin
);

export { gsap, ScrollTrigger, ScrollSmoother, SplitText };
