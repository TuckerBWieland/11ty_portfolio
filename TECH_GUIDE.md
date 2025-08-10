# Technical Guide

This document explains how to work with and extend this Eleventy portfolio project.

## Project Structure

```
src/
├── _data/           # Global data files
│   ├── metadata.json    # Site-wide metadata
│   ├── nav.json         # Navigation structure
│   └── tokens.json      # Design tokens (spacing, typography)
├── _includes/       # Reusable templates
│   ├── layouts/         # Page layouts
│   │   └── base.njk     # Base layout with HTML structure
│   └── partials/        # Reusable components
│       ├── site-header.njk
│       └── site-footer.njk
├── css/            # Stylesheets
│   └── main.css        # Main CSS file
├── static/         # Static assets (images, etc.)
├── work/           # Work/projects section
└── *.njk          # Page templates
```

## Adding Pages

### 1. Create a new page template

Create a new `.njk` file in the `src/` directory:

```njk
---
layout: layouts/base.njk
title: Page Title
description: Page description for SEO
---

<div class="container">
  <h1>Page Title</h1>
  <p>Page content goes here...</p>
</div>
```

### 2. Add to navigation (optional)

Edit `src/_data/nav.json` to include the new page:

```json
{
  "title": "New Page",
  "url": "/new-page/",
  "order": 5
}
```

### 3. Update navigation order

The navigation automatically sorts by the `order` field. Adjust existing orders if needed.

## Adding Partials

### 1. Create the partial file

Create a new `.njk` file in `src/_includes/partials/`:

```njk
<!-- src/_includes/partials/new-component.njk -->
<div class="new-component">
  <h2>{{ title }}</h2>
  <p>{{ content }}</p>
</div>
```

### 2. Include in templates

Use the partial in any template:

```njk
{% include "partials/new-component.njk" %}
```

Or pass data to it:

```njk
{% include "partials/new-component.njk" with { title: "Custom Title", content: "Custom content" } %}
```

## Adding Responsive Images

### 1. Place images in static folder

Put your images in `src/static/` (e.g., `src/static/hero.jpg`).

### 2. Use the img shortcode

```njk
{{ img("static/hero.jpg", "Hero image alt text", "(min-width: 768px) 50vw, 100vw") }}
```

### 3. Alt text rules

- **Required**: Every image must have descriptive alt text
- **Decorative images**: Use empty alt="" for purely decorative images
- **Informative images**: Describe what the image conveys
- **Complex images**: Provide detailed descriptions for charts, graphs, etc.

### 4. Sizing guidelines

- **Hero images**: `(min-width: 768px) 50vw, 100vw`
- **Content images**: `(min-width: 768px) 33vw, 100vw`
- **Thumbnails**: `(min-width: 768px) 25vw, 100vw`

## Accessibility Checklist

### Landmarks
- [ ] `<header>` with `role="banner"`
- [ ] `<nav>` with `role="navigation"` and `aria-label`
- [ ] `<main>` with `id="main-content"`
- [ ] `<footer>` with `role="contentinfo"`

### Headings
- [ ] Single `<h1>` per page
- [ ] Logical heading hierarchy (h1 → h2 → h3)
- [ ] No skipped heading levels
- [ ] Descriptive heading text

### Navigation
- [ ] Skip link as first interactive element
- [ ] `aria-current="page"` for current page
- [ ] Keyboard navigation support
- [ ] Focus visible on all interactive elements

### Images
- [ ] All images have alt text
- [ ] Decorative images have alt=""
- [ ] Complex images have detailed descriptions
- [ ] Images don't convey information through color alone

### Forms (when added)
- [ ] All form controls have labels
- [ ] Labels are properly associated with controls
- [ ] Error messages are clear and accessible
- [ ] Required fields are indicated

### Color and Contrast
- [ ] Text meets WCAG AA contrast ratios (4.5:1 for normal text)
- [ ] Information isn't conveyed through color alone
- [ ] Focus states are clearly visible
- [ ] High contrast mode support

### Motion
- [ ] Respects `prefers-reduced-motion`
- [ ] No auto-playing animations
- [ ] Pause/stop controls for moving content

## Performance Checklist

### Images
- [ ] Responsive images with appropriate sizes
- [ ] WebP format with JPEG fallback
- [ ] Lazy loading for below-fold images
- [ ] Appropriate image dimensions for use case

### CSS
- [ ] Minimal CSS (under 10KB gzipped)
- [ ] Critical CSS inlined
- [ ] Non-critical CSS loaded asynchronously
- [ ] CSS custom properties for maintainability

### HTML
- [ ] Minified in production
- [ ] Semantic markup for better parsing
- [ ] No unnecessary divs or spans
- [ ] Clean, readable structure

### Caching
- [ ] Static assets have appropriate cache headers
- [ ] Build process generates unique filenames
- [ ] Critical resources cached appropriately

### Fonts (when added)
- [ ] Use `font-display: swap`
- [ ] Preconnect to font domains
- [ ] Limit to 2-3 font weights
- [ ] Consider system fonts first

## Build Process

### Development
```bash
npm run dev
```
- Starts Eleventy dev server
- Watches for file changes
- Serves at `http://localhost:8080`

### Production Build
```bash
npm run build
```
- Builds optimized site to `_site/`
- Minifies HTML
- Generates responsive images
- Sets NODE_ENV=production

### Quality Checks
```bash
npm run check
```
- Currently stubbed (add html-validate and pa11y-ci)
- Manual checks with Lighthouse recommended
- Browser dev tools for performance analysis

## Extending the Project

### Adding JavaScript
- Keep JavaScript minimal
- Use vanilla JS when possible
- Consider adding Alpine.js for simple interactivity
- Avoid heavy frameworks for v1

### Adding CSS Framework
- Can add Tailwind CSS later
- Maintain accessibility standards
- Keep performance in mind
- Use CSS custom properties for theming

### Adding Content Management
- Consider Netlify CMS for client editing
- Keep front matter simple
- Use collections for dynamic content
- Maintain static generation benefits

### Adding Blog/News
- Create `_data/posts.json` for post metadata
- Use collections for post processing
- Add pagination if needed
- Keep URL structure clean

## Ready for Design

This project is structured to easily accept design work later:

- **Design tokens**: Basic spacing and typography scales ready
- **Component structure**: Partials and layouts organized for easy styling
- **CSS architecture**: Custom properties ready for theming
- **Accessibility foundation**: All accessibility features in place
- **Performance foundation**: Optimized structure ready for design assets

## Troubleshooting

### Common Issues

1. **Images not generating**: Check file paths and ensure images exist in `src/static/`
2. **Navigation not working**: Verify `nav.json` structure and URL paths
3. **CSS not loading**: Check `src/css/main.css` exists and path is correct
4. **Build errors**: Ensure all required dependencies are installed

### Debug Mode

Run Eleventy with debug output:
```bash
DEBUG=Eleventy* npm run dev
```

### Performance Testing

Use Lighthouse in Chrome DevTools:
1. Open DevTools → Lighthouse
2. Select Performance, Accessibility, Best Practices, SEO
3. Run audit
4. Review recommendations

## Resources

- [Eleventy Documentation](https://www.11ty.dev/docs/)
- [WCAG Guidelines](https://www.w3.org/WAI/WCAG21/quickref/)
- [Web.dev Performance](https://web.dev/performance/)
- [MDN Accessibility](https://developer.mozilla.org/en-US/docs/Web/Accessibility)
