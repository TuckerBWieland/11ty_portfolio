# Logo heap hero — PR notes

Branch `redesign/logo-heap`, based on current `main` (aadec26, the Tangle
redesign with system light mode). Ports the approved standalone prototype
(`~/workspace/site-overhaul/heap-proto`, notes.md there has the full design
history) into the homepage hero.

## What changed

- `src/index.njk` — the only existing file with content changes (+172
  lines):
  - The hero section is restructured into two columns: name, intro, and
    actions on the left (existing page classes and copy), the 3D logo
    stack on the right, stacked vertically on mobile. The intro's first
    paragraph is the About section's opener, duplicated in the hero; the
    About section itself is untouched below.
  - One scoped CSS block added to the page's inline styles: the hero
    becomes a 1240px grid (the other sections keep their 720px column)
    and the heap stage / story card styles use the page's own theme
    tokens, so dark and `prefers-color-scheme` light both follow the
    site. The heap canvas is transparent, so the site's tangle backdrop
    (which also carries the grain) shows through behind the blocks.
  - A module script tag loads `/assets/js/heap.min.js` at the end of the
    body. Nothing else on the page changes: nav, About, Projects,
    Experience, Contact, footer, share cards and meta are all untouched,
    as are the 404 page, the experiments pages, and styles/main.css.
- `heap-src/heap.js` + `scripts/build-heap.mjs` — the heap source, bundled
  and minified by esbuild into the committed `src/assets/js/heap.min.js`
  (regenerate with `npm run build:heap`; three and cannon-es are
  devDependencies for bundling only, nothing loads from a CDN).
- `src/assets/heap/` — six block GLBs, the baked environment, and the
  story logos (loaded lazily on first story open).
- `package.json` / `package-lock.json` — the `build:heap` script and the
  three build time devDependencies.
- `qa/` — screenshots of the built homepage (see QA below).

## Behavior

Six pillowy brand blocks (UPS, General Assembly, Shopify, Justworks,
Dreamer, Meta) drop in chronological order, oldest first so it lands at
the bottom, squish on impact, settle with hand stacked imperfections, and
sleep. Clicking a block arcs it forward with one full spin into a hero
pose and opens its story card (logo top left, role, dates, overview);
clicking anywhere outside spins it back to its exact recorded rest pose.
`prefers-reduced-motion` renders the stack pre settled with no drops,
squish, sway, or parallax.

## Glow (v3 retune)

The per block colored halos from the prototype are gone. There is exactly
one ambient glow now: a single large, very soft radial sprite in a faint
warm neutral (#cfc4b0) behind the whole tower, additive at 0.16 opacity on
the dark theme and 0.05 (normal blending, nearly invisible) on light. It
reads as atmosphere; no brand color pools around any individual block.
Verified in `qa/pr-home-dark.png` and the prototype's
`qa-stack-desktop-dark-v3.png`.

## Weight (homepage additions, measured on the built output)

| Asset | Raw | Gzip |
|---|---|---|
| heap.min.js (three + cannon-es + heap, bundled/minified) | 682,067 | 178,954 |
| Six block GLBs (face textures at 1024) | 1,127,972 | 953,842 |
| env-1024.jpg (baked environment) | 49,885 | 49,548 |
| **Initial load total** | **1,859,924** | **1,182,344** |
| Story logos (lazy, on first story open) | 179,250 | — |

Production cuts applied vs the prototype (~4.8 MB gzip): JS bundled and
minified; face textures downscaled 2048 → 1024 (verified visually at page
size, logos still crisp, wordmarks fully legible); the environment ships
as a prebaked 1024×512 equirect JPEG (49.9 KB) instead of the raw 1.62 MB
HDRI. The bake runs the HDR through an exposure scale and a soft shoulder
in `heap-proto/build/bake-env.html`; three converts the equirect image
internally at runtime. The directional key light carries the shadows, so
the compressed highlight range does not show.

## QA (built `_site`, Playwright + SwiftShader, fresh names)

- `qa/pr-home-dark.png` — desktop dark: hero with the settled stack over
  the tangle, name and intro left, buttons and hint below.
- `qa/pr-home-light.png` — desktop light via prefers-color-scheme: page
  lightens, blocks keep brand colors, glow nearly invisible.
- `qa/pr-home-mobile.png` — mobile full page: copy on top, heap below.
- `qa/pr-home-story-ups.png` — real click on the UPS block: block lifted
  into its hero pose mid spin, story card measured at full opacity,
  correct copy.
- `qa/pr-home-sections.png` — scrolled view of the Experience accordion,
  intact; a probe confirmed the page's scroll reveals fire normally
  (12 of 24 reveals triggered after scrolling; the hero's 5 fire on load).
- `npm run build` (Eleventy) writes all 11 pages including 404 and the
  experiments pages, plus sitemap, unchanged apart from the homepage.
- As with the prototype, screenshots are software GL; the final visual
  verdict is a real browser on a real GPU (the Cloudflare preview).

## Known open items

- **Dreamer favicon does not exist publicly.** dreamer.com serves no
  favicon or apple touch icon at any standard path (checked Oct 26,
  2026), so the Dreamer block carries the genuine Dreamer wordmark
  extracted from dreamer.com's own JS bundle, on the purple block
  (#6835FF, their `--color-indigo-500` token). If Tucker supplies the real
  app icon file, swapping it in is a one asset change.
- **UPS date line reads "Before General Assembly"** pending Tucker's
  correction (he confirmed only that the agency era predates GA, which
  started Aug 2018; no years were invented).
- Mobile intro copy still says "The stack on the right" above the stack;
  inherited verbatim from the approved prototype copy.
- In light mode the heap stage reads as a soft rectangular panel (the
  scene's own backdrop gradient is a touch lighter than the page).
  Cosmetic; making the canvas fully transparent is the follow up if it
  bothers.
