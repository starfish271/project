# AGENTS.md

Project guide for AI agents and contributors working on this codebase.

## Project structure

```
src/
├── components/
│   ├── blocks/              # One component per content block type
│   │   ├── HeadingBlock.astro
│   │   ├── ParagraphBlock.astro
│   │   ├── PhotoBlock.astro
│   │   ├── YouTubeBlock.astro
│   │   └── CodeBlock.astro
│   ├── BlockRenderer.astro  # Dispatches blocks to their components
│   └── NavBar.astro         # Slim sticky nav bar (shared by home + post pages)
├── content/
│   ├── config.ts            # Zod schema for posts + block types
│   └── posts/               # Markdown files (one per post, frontmatter + blocks)
├── layouts/
│   └── BaseLayout.astro     # HTML shell, fonts, View Transitions, footer
├── pages/
│   ├── index.astro          # Home: intro → project cards → about
│   ├── admin.astro          # Sveltia CMS entry point
│   └── posts/[slug].astro   # Post page template
├── scripts/
│   ├── animations/          # One file per animation effect (importable, removable)
│   │   ├── gsap-setup.ts    # Plugin registration (import this, not gsap directly)
│   │   ├── intro-scramble.ts
│   │   ├── heading-reveal.ts
│   │   ├── horizontal-scroll.ts
│   │   ├── card-to-nav-morph.ts
│   │   ├── post-animations.ts
│   │   └── magnetic-effect.ts
│   └── main.ts              # Central controller: matchMedia, cleanup, View Transitions
└── styles/
    └── global.css           # Design tokens, reset, typography, utilities

public/
├── admin/config.yml         # Sveltia CMS collection/field configuration
├── uploads/                 # Media uploads from the CMS
└── .nojekyll                # Prevents GitHub Pages Jekyll processing

.github/workflows/
└── deploy.yml               # GitHub Actions: build + deploy to Pages
```

## How the block system works

Posts are Markdown files in `src/content/posts/`. The frontmatter contains
metadata (title, date, summary, cover, draft) and a `blocks` array. Each
block has a `type` field and type-specific fields.

The Zod schema in `src/content/config.ts` validates blocks as a
discriminated union on `type`. `BlockRenderer.astro` maps each block type
to its Astro component. The CMS config (`public/admin/config.yml`) defines
the editor UI for the same fields.

### Adding a new block type

1. **Schema**: add the block variant to `blockSchema` in `src/content/config.ts`
2. **Component**: create `src/components/blocks/YourBlock.astro`
3. **Renderer**: add an import + `case` in `src/components/BlockRenderer.astro`
4. **CMS**: add the block to the `types` list under `blocks` in `public/admin/config.yml`
5. **Test**: create a post that uses the new block and run `npm run build`

## How the featured/draft system works

- **Draft** (`draft: true`): the post is excluded from the build entirely.
  It won't appear on the home page or generate a page. The CMS shows it
  with a "Draft" badge.
- **Published** (`draft: false`): the post appears on the home page card row
  and gets its own page at `/posts/<slug>/`.

There is no separate "featured" flag. All published posts appear in the
horizontal card scroll on the home page, newest first.

The `MIN_CARDS` setting in `src/pages/index.astro` controls the minimum
number of cards in the row. If there are fewer published posts than this
number, "Coming soon" placeholder cards fill the row. Placeholders are
not links and don't appear in the nav bar. Set `MIN_CARDS = 0` to disable.

## How the card-to-nav animation works

The home page has three scroll sections: intro, project cards, about.

1. **Horizontal scroll** (`horizontal-scroll.ts`): the project cards section
   pins with `ScrollTrigger` (`pin: true, scrub: 1`). Vertical scrolling
   moves the card row horizontally. Each card scales from 0.9 to 1 and
   fades from 60% to 100% opacity as it passes center. A "WORK" word drifts
   behind for parallax, and a counter updates ("01 / 04").

2. **Card-to-nav morph** (`card-to-nav-morph.ts`): after the horizontal
   scroll ends, a second scrubbed timeline plays over ~400px of scroll.
   Each card scales down, moves up toward the top of the screen, and its
   image becomes circular. The slim NavBar fades in simultaneously. When
   complete, the card track is hidden and the NavBar takes over as sticky
   navigation. Scrolling back reverses everything.

   **Why a scrubbed timeline instead of Flip**: Flip is for one-shot
   before→after transitions. We need the morph to be scrubbed to scroll
   so it reverses smoothly when scrolling back up. A scrubbed timeline
   gives that control.

3. **About section**: normal scroll. Headings reveal with SplitText.

## How to use data-magnetic

Add `data-magnetic` to any element to make it pull slightly toward the
cursor. Optionally add `data-magnetic-strength="0.5"` to control the pull
intensity (default 0.3 = subtle). The effect is disabled on touch devices.

```html
<a href="/about" data-magnetic data-magnetic-strength="0.4">About</a>
```

The effect uses `gsap.quickTo` for performant mousemove handling and
springs back with `elastic.out` on mouseleave. Applied to: nav links,
project chips, contact links.

## Design rules

### Colors (CSS custom properties in `global.css`)

| Token | Value | Usage |
|-------|-------|-------|
| `--bg` | `#f7f6f3` | Page background (off-white) |
| `--bg-alt` | `#efece7` | Alternate panels (card section) |
| `--fg` | `#1a1a1a` | Body text (near-black) |
| `--fg-muted` | `#6b6b6b` | Secondary text, dates, labels |
| `--accent` | `#e8552b` | Links, progress bar, focus rings |
| `--border` | `#d8d4cd` | Borders, dividers |
| `--card-bg` | `#fffefb` | Card surfaces |

### Fonts

- **Inter** (400, 500, 600) — body text, headings
- **JetBrains Mono** (400, 500) — dates, labels, counters, code, `.mono` class

### Spacing

8px base scale: `--space-1` (8px) through `--space-8` (128px). Use these
tokens, not raw values.

### Animation conventions

- Duration: 0.4–0.8s for most effects
- Ease: `power3.out` for reveals, `elastic.out(1, 0.4)` for magnetic release
- Scrub: `1` for scroll-driven effects (smooth but responsive)
- Never delay reading — content should be visible immediately if JS fails
- One file per effect in `src/scripts/animations/` — importable and removable
- All effects are gated by `gsap.matchMedia()` in `main.ts`
- `prefers-reduced-motion` and touch devices get minimal mode (no animations)
