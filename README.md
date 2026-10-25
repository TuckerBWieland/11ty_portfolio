# Tucker Wieland Portfolio

A minimal, single-page portfolio built with Eleventy and Tailwind CSS.

## Quick Start

```bash
npm install
npm run dev
```

Visit `http://localhost:8080`

## Commands

```bash
npm run dev        # Development server with hot reload
npm run build      # Production build
npm run lint:fix   # Fix linting issues
```

## Tech Stack

- **Eleventy** 3.1.2 - Static site generator
- **Tailwind CSS** 3.4.0 - Utility-first CSS
- **IBM Plex Mono** - Typography

## Project Structure

```
src/
├── _data/
│   └── metadata.json    # Site meta (SEO, social)
├── _includes/
│   └── layouts/
│       └── base.njk     # Base HTML template
├── assets/
│   ├── images/meta/     # Social sharing images
│   └── js/              # Analytics
├── styles/
│   └── main.css         # All styles
└── index.njk            # The entire site
```

## Sections

The site has four sections, all in `index.njk`:

1. **Hero** - Name, title, tagline
2. **Projects** - Expandable project list with bullets and links
3. **Experience** - Expandable work history with bullets and links
4. **Contact** - LinkedIn and GitHub links

## Customization

### Edit Content
All content lives in `src/index.njk`. Edit the HTML directly.

### Edit Styles
Styles are in `src/styles/main.css`. The site uses:
- CSS custom properties for colors
- Tailwind utilities
- Custom gradient hover effects

### Edit Meta
Update `src/_data/metadata.json` for SEO and social sharing.

## Deployment

Built for Cloudflare Pages. Push to deploy.

Set `POSTHOG_KEY` in environment variables for analytics.

---

Simple. Fast. Effective.
