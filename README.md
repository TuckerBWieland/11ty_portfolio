# Tucker Wieland

Personal site of Tucker Wieland, live at [tuckerwieland.com](https://tuckerwieland.com). Built with Eleventy, deployed on Cloudflare Pages.

## Develop

```bash
npm install
npm run dev
```

Then open http://localhost:8080.

## Commands

```bash
npm run dev         # Local server with watch
npm run build       # Production build into _site
npm run lint        # Stylelint plus Prettier check
npm run lint:fix    # Auto fix lint issues
```

## How it is put together

- `src/index.njk` is the homepage. A canvas animation runs the length of the page: loose threads at the top, a woven band through the middle, and clean lines by the contact section. Projects and Experience are expandable rows.
- `src/experiments/` holds earlier design studies (Strata, Atmosphere, Descent, Drift, Flythrough, Wireframe), kept for reference.
- `src/styles/main.css` is the Tailwind entry point, built with PostCSS.
- Typography is IBM Plex Mono, served from the `@fontsource/ibm-plex-mono` package at build time.
- `src/_data/metadata.json` holds the site title, description and social metadata. The share card is `src/assets/images/meta/meta1.png` (1200 by 630).
- The resume lives at `src/resume/tucker-wieland-resume.pdf` and is served at `/resume/tucker-wieland-resume.pdf`.
- `src/assets/js/posthog-init.js.njk` adds PostHog analytics only when the `POSTHOG_KEY` environment variable is set at build time. Cloudflare Pages sets it for production builds only.
- `src/_config/` holds the Cloudflare headers, redirects and robots.txt. See `CODING_GUIDE.md` for conventions.

## Deploy

Pushing to `main` triggers a Cloudflare Pages build (`npm run build:production`) and deploys to tuckerwieland.com.
