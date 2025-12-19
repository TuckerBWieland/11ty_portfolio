# Portfolio Coding Guide

Quick reference for developing and maintaining the portfolio site.

## Architecture

**Single-page site** with everything in `src/index.njk`:
- Hero section
- Projects list (expandable)
- Experience list (expandable)
- Contact links

**Styling** in `src/styles/main.css`:
- CSS custom properties for theming
- Tailwind utilities for layout
- Custom gradients for hover effects

## File Structure

```
src/
├── index.njk              # All page content
├── styles/main.css        # All styles
├── _includes/layouts/
│   └── base.njk           # HTML wrapper, meta tags, fonts
├── _data/
│   ├── metadata.json      # SEO & social meta
│   └── env.js             # Environment variables
└── assets/
    ├── images/meta/       # OG images for social
    └── js/posthog-init.js.njk  # Analytics
```

## Design Tokens

```css
/* Colors */
--bg-primary: #242128;
--text-primary: #ffffff;
--text-secondary: rgba(255, 255, 255, 0.5);
--text-tertiary: rgba(255, 255, 255, 0.3);
--border: rgba(255, 255, 255, 0.1);

/* Gradients (6 variations for hover effects) */
--gradient-1 through --gradient-6
```

## Adding Content

### Add a Project

In `src/index.njk`, add to the `.project-list`:

```html
<li class="project-item">
    <button class="project-header" aria-expanded="false">
        <span class="project-name">Project Name</span>
        <span class="project-meta">
            <span class="project-company">Company</span>
            <svg class="toggle-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                <path d="M6 9l6 6 6-6"/>
            </svg>
        </span>
    </button>
    <div class="project-details">
        <ul class="project-bullets">
            <li>Bullet point one</li>
            <li>Bullet point two</li>
        </ul>
        <a href="https://example.com" target="_blank" rel="noopener noreferrer" class="project-link">
            Link text →
        </a>
    </div>
</li>
```

### Add a Company

Same structure as projects, but use `.company-item`, `.company-header`, etc.

## Styling Patterns

### Expandable Lists
- `.project-item` / `.company-item` - Container
- `.project-header` / `.company-header` - Clickable row
- `.project-details` / `.company-details` - Hidden content
- `.open` class toggles visibility

### Gradient Hovers
Each item gets a different gradient based on `nth-child`:
```css
.project-item:nth-child(6n+1) .project-header:hover .project-name {
  background: var(--gradient-1);
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
}
```

### Responsive Breakpoints
```css
/* Mobile-first, then: */
@media (min-width: 560px)  /* Stack → row for items */
@media (min-width: 640px)  /* Larger padding, fonts */
@media (min-width: 1024px) /* Max container width */
```

## JavaScript

Minimal JS at the bottom of `index.njk`:
- Toggle expand/collapse for projects
- Toggle expand/collapse for companies
- Only one item open at a time per section

## Build Process

1. **Eleventy** processes templates
2. **Tailwind** builds CSS (runs after Eleventy)
3. Fonts copied from `node_modules/@fontsource/ibm-plex-mono`

## Commands

```bash
npm run dev          # Start dev server
npm run build        # Production build
npm run lint:fix     # Auto-fix code style
```

## Deployment

Cloudflare Pages auto-deploys on push.

Environment variable: `POSTHOG_KEY` for analytics.

---

Keep it simple. The whole site is one page.
