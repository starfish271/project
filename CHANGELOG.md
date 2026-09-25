# Changelog

## Stage 6 — Reduced-motion/mobile pass and documentation
- Added resize handler that refreshes ScrollTriggers after 150ms debounce
- Verified matchMedia conditions cover all three cases: desktop, mobile/touch, reduced-motion
- Minimal mode shows NavBar immediately and keeps heading reveals (subtle, non-disruptive)
- Wrote README.md, AGENTS.md, CHANGELOG.md

## Stage 5 — Post page animations, magnetic effects, smooth scrolling
- Added scroll progress bar (accent-colored, scrubbed to scroll position)
- Block fade-in: photos, code blocks, and videos fade + slide up on enter
- Magnetic effect: elements with [data-magnetic] pull toward cursor via gsap.quickTo, spring back with elastic ease
- Applied data-magnetic to nav links, project chips, contact links
- Smooth scrolling (ScrollSmoother) active on all pages in full-animation mode

## Stage 4 — Card-to-nav morph animation
- After horizontal scroll ends, a scrubbed timeline shrinks cards and moves them up
- Cards scale to 0.15, images become circular (matching chip thumbnails)
- NavBar fades in simultaneously and takes over as sticky navigation
- Track hidden after morph; scrolling back reverses everything
- Used scrubbed timeline instead of Flip (needed scroll-reversible morph)

## Stage 3 — Intro animations and horizontal project card scroll
- ScrambleText decode on name "Gwyn Fox" on page load (0.6s)
- SplitText word-by-word reveal on intro line after scramble completes
- SplitText line reveal on About headings and post titles as they scroll into view
- Horizontal scroll: project cards section pins (pin: true, scrub: 1)
- Card scale (0.9→1) and opacity (60%→100%) tied to center position via containerAnimation
- Outlined "WORK" word drifts behind cards for parallax (slower than card scroll)
- Monospace counter ("01 / 04") updates as each card passes center

## Stage 2 — Sveltia CMS admin portal and GitHub Pages deployment
- Sveltia CMS loaded from CDN at /admin with GitHub backend
- CMS config (public/admin/config.yml) defines posts collection with content blocks list widget
- Block types: Heading, Paragraph (rich text), Photo (with width options), YouTube, Code (with language dropdown)
- Media uploads go to public/uploads/
- GitHub Actions workflow (.github/workflows/deploy.yml) builds and deploys on push to main
- .nojekyll file prevents Jekyll processing on GitHub Pages

## Stage 1 — Astro site, block components, example post, styling, nav, About
- Astro static output with plain CSS (no Tailwind), React integration for View Transitions
- Content collection schema with discriminated union for 5 block types
- Block components: HeadingBlock, ParagraphBlock, PhotoBlock, YouTubeBlock, CodeBlock
- BlockRenderer dispatches blocks to components
- Example post "Blinking an LED with Arduino" uses all 5 block types
- Design system: off-white background, near-black text, orange-red accent, Inter + JetBrains Mono
- Code blocks use Astro's built-in Shiki with copy button and filename label
- Shared NavBar component (sticky, with project chips and About link)
- Home page: intro section, project cards section, About section (one continuous scroll)
- Post page: NavBar (fixed state), title, cover, blocks, prev/next links
- MIN_CARDS setting (default 4) pads card row with "Coming soon" placeholders
