---
title: 'Week 3 Studio Cycle: Building Websites'
date: 2026-09-28T17:33:00
summary: For this lab I used Claude Code, Bolt, and Stitch to help me build separate documentation sites for each of my classes this semester.
cover: /uploads/rainbow1.png
draft: false
status: in-progress
blocks:
  - type: heading
    text: The Assignment + Inspiration
  - type: paragraph
    body: |-
      For this weeks lab, we were given the suggestion to build an idea 3 different ways. I wanted to try using 3 different AI's to build something and see which one worked the best, was the easiest to use, and how I could potentially incorporate all three into a workflow. 

      I went about this first by using Claude Code, which is pretty much my go to, but it can be slow, so I started experimenting with both Bolt and Stitch. 

      One thing that I really liked about Stitch was the Figma style layout. One problem I have with some AI's is that the information can be confusing to sift through, you could be scrolling through hundreds of chats, and have a bunch of different windows to switch through, and prototypes and versions can easily get lost or overwritten. With stitch, you can ideate many different prototypes and keep them organized in a large canvas environment.
  - type: photo
    image: /uploads/Screenshot 2026-10-05 at 5.27.23 PM.png
    alt: Stitch AI figma style layout
    caption: Figma-style layout in Stitch AI
    width: normal
  - type: heading
    text: Prompting
  - type: paragraph
    body: 'In the beginning, I started with simple prompts, one website at a time, to see what each AI was capable of building. My ideal result for this project is to have 3 working blog-style websites, each one used to document my work for class. To keep it simple I want them all to work the exact same way, with a similar design, and most importantly, separate admin portals that I can quickly use to make and edit posts, without having to go into the code. I used Claude to help me create a prompt based on what I wanted:'
  - type: code
    language: html
    filename: ''
    code: |-
      Build a blog-style portfolio website for my Interactive Systems class, with an admin portal for creating and editing posts without writing Markdown. I'm Gwyn Fox, a senior in Creative Technology and Design (ATLAS, CU Boulder). Each post documents a project or process entry and gets its own page.

      TECH STACK
      - Astro with static output, plain CSS (no Tailwind), minimal dependencies.
      - Deploy to GitHub Pages via a GitHub Actions workflow. Set Astro `site` and `base` for a repo named [repo-name].
      - Admin portal: Sveltia CMS at /admin, using the GitHub backend (sign-in with a GitHub personal access token). Posts are saved as files in src/content/posts/ and committed to the repo automatically.
      - Animation: GSAP from npm, with its free plugins: ScrollTrigger, ScrollSmoother, SplitText, ScrambleText, Flip, DrawSVG. Do not use Lenis; use ScrollSmoother for smooth scrolling.
      - Keep code readable and commented. I will edit it myself.

      ADMIN / CMS SETUP
      - Post fields: title, slug, date, summary, tags, cover image, featured checkbox, draft toggle, and a "content blocks" list.
      - Content blocks (use a list widget with multiple block types that I can add, reorder, and delete):
        1. Text: rich text editor (headings, bold, italic, links, lists)
        2. Image: upload, caption, alt text, width option (narrow / full / full-bleed)
        3. YouTube video: URL + caption
        4. Code block: language dropdown (JavaScript, C++/Arduino, Python, HTML, CSS, Processing), code, optional filename label
        5. Gallery: multiple images with captions, grid layout
        6. Two-column: image on one side, text on the other, with a side toggle
        7. Callout/note: short highlighted text
      - Media uploads go to public/uploads/.
      - Write a component for each block type that renders it on the post page.

      PAGES
      1. Home, in this order:
         a. Intro: my name and a one-line intro, in a pinned section (see animations).
         b. "Selected Work": a horizontal scroll section of featured project cards (see below).
         c. All posts: a vertical list of every published post (cover, title, date, tags), filterable by tag.
      2. Post page: renders the blocks in order, with previous/next post links at the bottom.
      3. About: bio, skills (electronics, Arduino, fabrication, wearables, creative coding, video production), contact links, resume download.

      DESIGN DIRECTION
      - Minimalist and developer-focused, but with personality: lots of white space, a restrained palette (off-white or near-black background with one accent color), a clean sans-serif for body text and a monospace font for dates, tags, labels, counters, and technical details.
      - Light/dark mode toggle.
      - Code blocks: syntax highlighting with Astro's built-in Shiki, a filename/language label, and a copy button.
      - Motion should be subtle and fast (most animations 0.4–0.8s, ease "power3.out"). Nothing should delay reading the content.
      - Put all animation code in src/scripts/animations/, one file per effect, with comments explaining each one, so I can edit or remove effects individually.

      HORIZONTAL SCROLL: SELECTED WORK
      - This section pins in place while vertical scrolling moves a row of project cards horizontally (ScrollTrigger with pin: true and scrub: 1).
      - Cards are generated from posts with the "featured" checkbox on, newest first: cover image, title, date, and tags. Each card links to that post's page.
      - Scroll distance is calculated from the total width of the row and recalculates on window resize.
      - The row ends with a "View all posts →" card that scrolls down to the full post list.
      - Scrubbed effects inside this section (use containerAnimation):
        - Each card scales from 0.9 to 1 and goes from 60% to 100% opacity as it reaches the center of the screen, then reverses as it leaves.
        - A large outlined word "WORK" moves across the background behind the cards more slowly than the cards, for a parallax effect.
        - A monospace counter (e.g., "03 / 08") in the corner updates as each card passes the center.
      - On mobile and touch devices, and when prefers-reduced-motion is set, do not pin; show the cards in a native horizontal swipe row with scroll-snap instead.

      OTHER ANIMATIONS
      1. Home intro: my name decodes with ScrambleText on page load, then the intro line reveals word by word with SplitText. The intro stays pinned for a short scroll distance while a second line fades in, then releases.
      2. Circuit trace: a thin SVG line in the accent color runs down the left edge of the page and draws itself as the page scrolls (DrawSVG, scrubbed to scroll position). Small circular nodes sit along the line at each section heading and fill in when the line reaches them. Decorative only (aria-hidden), hidden on small screens.
      3. All-posts list: cards fade and slide up with a stagger as they enter the viewport. Cover images have a subtle scrubbed parallax. When filtering by tag, cards animate to their new positions with GSAP Flip.
      4. Headings and post titles: SplitText line reveal as they scroll into view.
      5. Tags and nav links: ScrambleText effect on hover.
      6. Cursor: a small circle that follows the cursor with easing, grows over links, and shows "view" over project cards.
      7. Magnetic buttons and links:
         - Any element with a data-magnetic attribute moves slightly toward the cursor when it gets close, then springs back when the cursor leaves (use gsap.quickTo for smooth performance, elastic ease on release).
         - A data-magnetic-strength attribute controls how strong the pull is (default subtle).
         - Apply it to nav links, the "View all posts" card, social links, the resume button, and the light/dark toggle.
         - Text inside magnetic buttons moves slightly more than the button itself for a layered effect.
      8. Post pages: a scroll progress bar at the top, and images fade in as they enter the viewport. Any SVG image with a "draw" class animates with DrawSVG.
      9. Page transitions: Astro View Transitions with a short GSAP wipe or fade between pages.

      ACCESSIBILITY AND PERFORMANCE
      - Use gsap.matchMedia() to turn off smooth scrolling, pinning, and scroll-triggered animations when prefers-reduced-motion is set; show content immediately instead.
      - Disable the custom cursor and magnetic effects on touch devices.
      - Kill and clean up all ScrollTriggers on page navigation and re-initialize animations after each View Transition, so nothing duplicates or stops firing.
      - Semantic HTML, alt text on all images, good color contrast, keyboard-navigable, visible focus states.

      STARTER CONTENT
      Create 4 sample posts (3 of them featured) that together use every block type, so I can see how each one looks. Use placeholder images and text.

      DOCUMENTATION
      - README.md: how to run locally, how to log into /admin and create a post, how to set up the GitHub token, how deployment works.
      - AGENTS.md: project structure, how the block system works, how to add a new block type, how the featured flag works, how to use data-magnetic, how the circuit trace nodes are positioned, and design rules (colors, fonts, spacing, animation conventions).
      - CHANGELOG.md: an entry for each stage below.

      BUILD ORDER
      Build this in stages and confirm each one works before starting the next:
      1. Astro site, pages, block components, sample posts, styling, code blocks, light/dark mode.
      2. Sveltia CMS admin portal and GitHub Pages deployment workflow.
      3. Horizontal scroll section with its scrubbed effects.
      4. Intro animations, circuit trace, and the all-posts list animations.
      5. Cursor, magnetic effects, ScrambleText hovers, and page transitions.
      6. Accessibility and reduced-motion pass, then documentation.
  - type: paragraph
    body: 'I then went back into Claude and made a few changes and gave a new prompt to Bolt:'
  - type: code
    language: html
    filename: ''
    code: |-
      Build a blog-style portfolio website for my Interactive Systems class, with an admin portal for creating and editing posts without writing Markdown. I'm Gwyn Fox, a senior in Creative Technology and Design (ATLAS, CU Boulder). Each post is its own page. Priorities, in order: (1) the admin portal for adding and editing posts, (2) the animated scroll experience, (3) a simple nav bar and About section. Keep everything else minimal.

      TECH STACK
      - Astro with static output, plain CSS (no Tailwind), minimal dependencies.
      - Deploy to GitHub Pages via a GitHub Actions workflow. Set Astro `site` and `base` for a repo named [repo-name].
      - Admin portal: Sveltia CMS at /admin, using the GitHub backend (sign-in with a GitHub personal access token). Posts are saved as files in src/content/posts/ and committed to the repo automatically.
      - Animation: GSAP from npm with its free plugins (ScrollTrigger, ScrollSmoother, SplitText, ScrambleText, Flip). Do not use Lenis.
      - Keep code readable and commented. I will edit it myself. Put each animation in its own file in src/scripts/animations/.

      ADMIN PORTAL
      - Post fields: title, date, short summary, cover image, draft toggle, and a "content blocks" list.
      - Content blocks I can add, reorder (drag), edit, and delete in any order:
        1. Heading: a single line of text
        2. Paragraph: rich text (bold, italic, links, lists)
        3. Photo: upload, caption, alt text, width option (normal / wide / full-bleed)
        4. YouTube video: URL + optional caption
        5. Code block: language dropdown (Arduino/C++, JavaScript, Python, HTML, CSS), code, optional filename label
      - Media uploads go to public/uploads/.
      - Build a component for each block type that renders it on the post page. The post page should look good with any combination and order of blocks.

      EXAMPLE POST (the only post)
      - Title: "Blinking an LED with Arduino". This is a template showing how a post looks, not a real project.
      - Use every block type: an intro paragraph, a photo (placeholder image), a heading "The Circuit", a paragraph describing an LED and 220Ω resistor on pin 13, a code block with the standard Arduino blink sketch, a heading "Demo", a YouTube block with a placeholder URL I can replace, and a closing paragraph.

      HOME PAGE (one continuous scroll, in this order)
      1. Intro: my name and a one-line intro, full screen. My name decodes with ScrambleText on load, then the intro line reveals word by word with SplitText. A small "scroll" indicator at the bottom.
      2. Project cards → sticky nav (the main feature):
         - A row of project cards (cover image, title, date), one per published post, newest first. Each card links to its post.
         - This section pins while vertical scrolling moves the cards horizontally (ScrollTrigger, pin: true, scrub: 1).
         - Scrubbed effects while scrolling: each card scales from 0.9 to 1 and from 60% to 100% opacity as it reaches the center of the screen; a large outlined word "WORK" drifts slowly behind the cards for parallax; a monospace counter (e.g., "01 / 04") updates as each card passes center.
         - At the end of the horizontal scroll, the cards shrink and move up (scrubbed to scroll, so it reverses when scrolling back up) until they become small chips (thumbnail + title) in a slim bar docked at the top of the screen. That bar is the sticky nav for the rest of the page. Use GSAP Flip or a scrubbed timeline; choose whichever is more reliable and explain it in comments.
         - The finished nav bar contains: my name (links to top), the project chips (each links to its post), and an "About" link. If there are more chips than fit, the chip row scrolls horizontally inside the bar.
         - Until I have more posts, fill the row with "Coming soon" placeholder cards so there are at least 4 cards total. Placeholders are not links and don't appear in the nav. Make the minimum count a single setting I can change or set to 0.
      3. About: a short section below, with a bio paragraph, a short skills line (electronics, Arduino, fabrication, wearables, creative coding, video production), and contact links. Headings reveal with SplitText as they scroll into view.

      POST PAGES
      - The same slim sticky nav bar at the top (already in its docked state, no morph animation).
      - Title reveals with SplitText. Blocks fade and slide up slightly as they enter the viewport. A thin scroll progress bar in the accent color at the top.
      - Previous/next post links at the bottom.

      DESIGN
      - Minimalist and developer-focused: lots of white space, a restrained palette (off-white background, near-black text, one accent color), a clean sans-serif for body text and a monospace font for dates, labels, counters, and code.
      - [Paste the contents of your Stitch DESIGN.md here if you have one.]
      - Code blocks: syntax highlighting with Astro's built-in Shiki, a filename/language label, and a copy button.
      - Magnetic effect: elements with a data-magnetic attribute pull slightly toward the cursor and spring back on leave (gsap.quickTo, elastic ease on release). Apply to nav links, project chips, and contact links.
      - ScrollSmoother for smooth scrolling. Motion should be subtle and quick (0.4–0.8s, ease "power3.out") and never delay reading.

      ACCESSIBILITY AND PERFORMANCE
      - Use gsap.matchMedia(). With prefers-reduced-motion, or on mobile/touch devices: no smooth scrolling and no pinning. Show the project cards as a native horizontal swipe row with scroll-snap, and show the nav as a normal sticky bar from the start.
      - Disable the magnetic effect on touch devices.
      - Clean up and re-create ScrollTriggers on resize so the pin and morph distances stay correct.
      - Semantic HTML, alt text on images, good contrast, keyboard-navigable, visible focus states.

      DOCUMENTATION
      - README.md: how to run locally, how to log into /admin, how to set up the GitHub token, how to add and edit a post, how deployment works.
      - AGENTS.md: project structure, how the block system works, how to add a new block type, how the card-to-nav animation works, and design rules (colors, fonts, spacing, animation conventions).
      - CHANGELOG.md: one entry per stage below.

      BUILD ORDER
      Build in stages and confirm each works before moving on:
      1. Astro site, post page with all block components, the example post, basic styling, simple sticky nav, About section.
      2. Sveltia CMS admin portal and GitHub Pages deployment.
      3. Intro animations and the horizontal project card scroll with its scrubbed effects.
      4. The card-to-nav morph.
      5. Post page animations, magnetic effects, smooth scrolling.
      6. Reduced-motion/mobile pass, then documentation.
  - type: paragraph
    body: |-
      I also gave similar prompts to stitch, but stitch was a bit unconventional in that you can prompt in other ways besides through chat.

      Also, Stitch is great for creating mockups, ideation and trying out different styles, prototyping interfaces for future builds and preparing drafts for figma. However, when it comes to creating functional websites that I can deploy to a github repo and manage myself, Bolt and Claude were better at building the tangible, usable product. 

      While Stitch's Interface is super unique and interactive, with so many features and capabilities for prototyping, I'd need to play around with it more before deciding whether it's something I'd use in a website-building workflow.
  - type: photo
    image: /uploads/Screenshot 2026-10-05 at 6.00.31 PM.png
    alt: draft mockup in Stitch AI
    caption: Preview and edit modes in Stitch AI using rough draft AI prompt mockup
    width: normal
  - type: paragraph
    body: |-
      <p> After a few experiments with Stitch, I switched to just using Bolt and Claude. When creating these initial prompts, I mainly used Claude to help figure out what tech stack to use. I have experience using HTML, CSS, and JavaScript to build websites, and also have used free website building software and blog sites like wordpress, wix, etc, but I wanted to build something that I could easily and quickly make changes to without always having to edit and manage a bunch of code and files, but still be able to do so if needed. I also didn't want to have to use a third party service, or be limited in what I could build, so after chatting with Claude, we decided to build a prompt to give to bolt to use an astro template, sveltia cms for the admin portal, and use GSAP animations on the site. Claude was very helpful at coming up with a prompt that explained exactly how I wanted it to be laid out. </p>

      <p> Bolt did a great job at laying out the website and making it super customizable by incorporating Sveltia CMS, which is a free service you can read more about here: [https://github.com/sveltia/sveltia-cms](https://github.com/sveltia/sveltia-cms) </p>

      <p> Both Bolt and Claude were really great at walking me through how to actually set everything up, deploy to github, and make changes that immediately deploy to the website via github. One of the things I like about using AI in these processes is how easy it is to create complex code and actually put it out there without needing extensive prior programming knowledge. Not only is it doing a lot of the hard parts by writing code, but its also a great tool for learning how these systems, like building a website/app/etc, actually works and what that looks like/different ways to go about it. </p>
  - type: photo
    image: /uploads/Screenshot 2026-10-05 at 5.28.14 PM.png
    alt: Sveltia CMS admin portal for experimental textiles documentation site
    caption: Sveltia CMS admin portal for experimental textiles documentation site
    width: normal
  - type: photo
    image: /uploads/Screenshot 2026-10-05 at 6.28.55 PM.png
    alt: Editing a post through Sveltia CMS admin portal.
    caption: Editing a post through Sveltia CMS admin portal
    width: normal
  - type: heading
    text: Final Product
  - type: paragraph
    body: |-
      <p> I started out by creating a website for my Inventing Interactive Systems class, and was planning on using that as a template for the two others, including this one. But after having some issues with duplicating all the files and pushing everything to github, I just ended up making the original "template" into this website we are currently on! Everything is managed through github and the admin portal can be accessed with a github access token. </p>

      <p> The github repo for this can be accessed here: [https://github.com/starfish271/project](https://github.com/starfish271/project) </p>

      <p> Homepage for the site can be accessed here:
      [https://starfish271.github.io/project/](https://starfish271.github.io/project/) </p>

      <p> Admin portal:
      [https://starfish271.github.io/project/](https://starfish271.github.io/project/admin)[admin](https://starfish271.github.io/project/admin) </p>

      <p> I also got another working blog-style website up and running that I will be using for my Experimental Textiles course. I basically just duplicated all the files, added them into a new github repo, had bolt make any necessary setup changes to the code, and edited all the text in the admin portal to fit the associated class. </p>

      <p> Experimental Textiles Site:
      [https://starfish271.github.io/extx-site/](https://starfish271.github.io/extx-site/)</p>
  - type: photo
    image: /uploads/Screenshot 2026-10-05 at 6.39.29 PM.png
    alt: site settings
    caption: editing site settings through admin portal
    width: normal
---
