# Tucker Wieland Portfolio

Professional portfolio website built with Eleventy, Tailwind CSS, and
TypeScript.

## Quick Start

```bash
# Install dependencies
npm install

# Start development server
npm run dev
```

Visit `http://localhost:8080` - the site auto-reloads on changes.

## Commands

```bash
npm run dev        # Development server with hot reload
npm run build      # Production build
npm run lint       # Run all linters
npm run lint:fix   # Fix linting issues
```

## Tech Stack

- **Static Site Generator**: Eleventy 3.1.2
- **CSS Framework**: Tailwind CSS 3.4.0 with custom design tokens
- **TypeScript**: Component logic with type safety
- **Templates**: Nunjucks components

## Project Structure

```
src/
├── _data/           # Content (JSON)
├── _includes/       # Templates & components
├── css/             # Styles
├── js/              # TypeScript components
└── static/          # Assets
```

## Adding Content

**New Project**: Edit `src/_data/projects.json`  
**New Company**: Edit `src/_data/companies.json` + add logo to
`src/static/company-logos/`  
**New Section**: Create component in `src/_includes/components/` + include in
`src/index.njk`

## Analytics

Set `POSTHOG_KEY` in Cloudflare Pages → Settings → Environment variables.

All analytics requests route via https://logs.tuckerwieland.com.

## Development Guide

See `CODING_GUIDE.md` for comprehensive development patterns, design system, and
component architecture.

---

Built with modern web standards and systematic design principles.

# Force rebuild for PostHog environment variable
