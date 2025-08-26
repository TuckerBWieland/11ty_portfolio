# Portfolio Development Guide

A comprehensive guide for developing and maintaining Tucker Wieland's portfolio website. This guide covers architecture patterns, design system implementation, and contribution workflows.

## 🎯 Project Overview

**Architecture**: Single-page portfolio with component-based design
**Tech Stack**: Eleventy 3.1.2 + Tailwind CSS 3.4.0 + Figma Design System
**Approach**: Static site generation with performance and accessibility focus

**Current Structure**:
- Single page application with sections: Hero, Project Showcase, Companies, About, Contact
- Component-based architecture using Nunjucks templates
- Data-driven content through JSON files
- Mobile-first responsive design with systematic breakpoints

## 🏗️ Current Architecture

### File Organization
```
src/
├── _data/                    # Eleventy data files
│   ├── metadata.json         # Site meta information
│   ├── projects.json         # Project portfolio data
│   ├── companies.json        # Company experience data
│   └── tokens.json           # Design system tokens
├── _includes/
│   ├── layouts/
│   │   └── base.njk          # Base HTML template
│   └── components/           # UI components
│       ├── hero-section.njk  # Hero + navigation
│       ├── project-showcase.njk
│       ├── worked-with.njk   # Company logos
│       ├── about-section.njk
│       ├── contact-section.njk
│       └── site-footer.njk
├── css/
│   ├── main.css              # Tailwind imports + base styles
│   └── components/           # Component-specific styles
│       └── hero-section.css  # Hero animations
├── js/
│   └── components/           # Component JavaScript
│       └── hero-section.js   # Menu + GSAP animations
├── static/                   # Static assets
│   ├── company-logos/        # SVG logos
│   └── *.{png,svg}          # Images and icons
└── index.njk                 # Main page template
```

### Build System
- **Eleventy**: Static site generation with Nunjucks templating
- **Tailwind CSS**: Utility-first CSS with custom design tokens
- **PostCSS**: CSS processing and optimization
- **GSAP**: Animation library for interactions

### Data Flow
1. **Data Files**: JSON files in `_data/` provide content
2. **Templates**: Nunjucks files consume data and render HTML
3. **Components**: Modular partials included in main template
4. **Build**: Eleventy processes templates and Tailwind builds CSS

---

## 🎨 Design System Implementation

### Tailwind Configuration (tailwind.config.js)

**Colors** (Used as Tailwind classes):
```css
/* Backgrounds */
bg-background-primary     /* #242128 */
bg-background-secondary   /* #2C2931 */

/* Text */
text-text-primary        /* #ffffff */
text-text-secondary      /* rgba(255,255,255,0.5) */

/* Accent Colors */
bg-orange               /* #f87c46 - Primary CTA */
bg-blue                 /* #629fde - Secondary */
bg-pink                 /* #f45cb3 - Tertiary */
bg-green                /* #27ae60 - Success */
bg-yellow               /* #E6C95D - Highlight */
bg-red                  /* #ff3333 - Alert */
```

**Typography Scale**:
```css
/* Font Families */
font-helvetica          /* Helvetica Neue - headings */
font-mono              /* IBM Plex Mono - body text */

/* Responsive Font Sizes */
text-h1                /* 180px / 130px / 80px */
text-h2                /* 120px / 80px / 48px */
text-big-link          /* 24px - nav links */
text-paragraph         /* 20px - body text */
text-button            /* 16px - buttons */
text-caption           /* 16px - meta info */
```

**Spacing** (4px base system):
```css
/* Common Spacing */
px-11                  /* 44px - Container padding */
py-15                  /* 60px - Section spacing */
py-32                  /* 128px - Large sections */
h-30                   /* 120px - Component height */
```

**Responsive Breakpoints**:
```css
xs: '360px'            /* Small mobile */
sm: '640px'            /* Mobile */
md: '768px'            /* Tablet */
mmd: '1280px'          /* Large tablet */
lg: '1440px'           /* Desktop */
```

## 🧩 Component Patterns & Standards

### Component Structure Template
Every component follows this consistent pattern:

```njk
<!-- Component: component-name.njk -->
<section class="py-32 bg-background-primary">
  <div class="max-w-container mx-auto px-11">
    <!-- Component content using design tokens -->
    <h2 class="text-h2 font-helvetica font-bold text-text-primary mb-8">
      Section Title
    </h2>
    <p class="text-paragraph font-mono text-text-secondary">
      Content text using design system classes
    </p>
  </div>
</section>
```

### Current Component Architecture

**Hero Section** (`hero-section.njk`):
- Full-screen hero with animated text layout
- Mobile hamburger menu with overlay
- Responsive typography scaling
- GSAP animations for interactions

**Project Showcase** (`project-showcase.njk`):
- Data-driven from `projects.json`
- Card-based layout with hover effects
- Responsive grid system
- Automatic project rendering

**Worked With** (`worked-with.njk`):
- Company logo grid
- Data-driven from `companies.json`
- SVG logo optimization
- Hover interactions

**About Section** (`about-section.njk`):
- Text content with design system typography
- Responsive layout patterns

**Contact Section** (`contact-section.njk`):
- Contact information and links
- Social media integration

### Design System Button Components
Pre-built button classes in `tailwind.config.js`:

```css
.btn                    /* Base button styles */
.btn-primary           /* Orange background */
.btn-secondary         /* Blue background */
.btn-tertiary          /* Pink background */
.btn-success           /* Green background */
```

Usage:
```html
<button class="btn btn-primary">
  Call to Action
</button>
```

## 🔧 Development Workflows

### Adding New Content

**1. Adding New Projects**:
```json
// src/_data/projects.json
{
  "projects": [
    {
      "id": "unique-project-id",
      "company": "COMPANY NAME",
      "title": "Project Title",
      "description": "Brief description",
      "problem": "What problem was solved",
      "solution": "How it was solved",
      "result": "What was achieved",
      "role": "Your role in the project",
      "image": "https://images.unsplash.com/...",
      "narrative": "Full story of the project..."
    }
  ]
}
```

The `project-showcase.njk` component automatically renders new projects.

**2. Adding New Companies**:
```json
// src/_data/companies.json
{
  "companies": [
    {
      "id": "company-slug",
      "name": "Company Name",
      "logo": "/static/company-logos/company-logo.svg",
      "description": "Brief company description"
    }
  ]
}
```

Add the corresponding SVG logo to `src/static/company-logos/`.

**3. Adding New Page Sections**:
1. Create component: `src/_includes/components/new-section.njk`
2. Include in main page: `{% include "components/new-section.njk" %}`
3. Add navigation link to mobile menu in `hero-section.njk`

### Component Development Patterns

**Layout Pattern**:
```njk
<section class="py-32 bg-background-primary">
  <div class="max-w-container mx-auto px-11">
    <!-- Section content -->
  </div>
</section>
```

**Typography Pattern**:
```html
<!-- Use design system classes -->
<h2 class="text-h2 font-helvetica font-bold text-text-primary">
<p class="text-paragraph font-mono text-text-secondary">
```

**Responsive Pattern**:
```html
<!-- Mobile-first with breakpoint scaling -->
<div class="text-sm xs:text-base md:text-lg lg:text-xl">
```

**Interactive Elements**:
```html
<!-- Consistent hover states -->
<a class="text-orange hover:underline transition-all duration-200">
<button class="btn btn-primary hover:opacity-80">
```

## 🛠️ Build & Development

### Development Commands
```bash
# Start development with hot reload
npm run dev

# Build CSS only
npm run build:css

# Build entire site
npm run build

# Production build (optimized)
npm run build:prod
```

### File Watching & Hot Reload
- Eleventy watches `src/` directory for changes
- Tailwind CSS rebuilds on file changes in development
- Browser auto-refreshes on file changes
- GSAP animations initialize on page load

### Development Workflow
1. **Start development**: `npm run dev`
2. **Edit components**: Modify `.njk` files in `src/_includes/components/`
3. **Update data**: Edit JSON files in `src/_data/`
4. **Add styles**: Use Tailwind classes or add to component CSS files
5. **Test responsive**: Use browser dev tools to test breakpoints
6. **Build for production**: `npm run build:prod`

---

## 🎨 Styling Guidelines

### Design Token Usage
**ALWAYS use design tokens** defined in `tailwind.config.js`:

```html
<!-- ✅ Correct: Use design system classes -->
<div class="bg-background-primary text-text-primary px-11 py-32">
<h1 class="text-h1 font-helvetica font-bold">
<p class="text-paragraph font-mono">

<!-- ❌ Incorrect: Arbitrary values -->
<div class="bg-[#242128] text-[#ffffff] px-[44px] py-[128px]">
```

### Component CSS
Minimize custom CSS. When needed, place in `src/css/components/`:

```css
/* src/css/components/component-name.css */
.component-specific-animation {
  /* Only when Tailwind classes aren't sufficient */
  animation: fadeIn 0.3s ease-in-out;
}
```

### Responsive Design Pattern
Always use mobile-first responsive design:

```html
<!-- Mobile first, then scale up -->
<div class="text-sm xs:text-base md:text-lg lg:text-xl">
  Responsive text
</div>

<!-- Grid layouts -->
<div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
  <!-- Grid items -->
</div>
```

## ♿ Accessibility Standards

### Required Practices
- **Semantic HTML**: Use proper heading structure (h1 → h2 → h3)
- **Alt Text**: All images require descriptive alt attributes
- **Focus States**: Interactive elements must have visible focus indicators
- **Keyboard Navigation**: All functionality accessible via keyboard
- **Color Contrast**: Meet WCAG AA standards (4.5:1 for normal text)

### Implementation Examples
```html
<!-- ✅ Semantic structure -->
<main>
  <section aria-labelledby="hero-heading">
    <h1 id="hero-heading">Page Title</h1>
  </section>
</main>

<!-- ✅ Proper focus states -->
<button class="btn btn-primary focus:outline-2 focus:outline-white focus:outline-offset-2">

<!-- ✅ Image accessibility -->
<img src="/static/logo.svg" alt="Company name logo" loading="lazy">
```

---

## 🚀 Performance Optimization

### Built-in Optimizations
- **Static Site Generation**: No runtime JavaScript overhead
- **Image Processing**: Automatic WebP conversion and responsive sizes via `@11ty/eleventy-img`
- **CSS Purging**: Tailwind removes unused styles in production
- **HTML Minification**: Compressed HTML in production builds

### Performance Guidelines
```html
<!-- ✅ Optimize images -->
{% img "/static/image.jpg", "Description", "100vw" %}

<!-- ✅ Lazy load images -->
<img loading="lazy" decoding="async" src="...">

<!-- ✅ Minimize custom CSS -->
<!-- Use Tailwind classes instead of custom styles -->
```

### Animation Performance
```javascript
// ✅ Use GSAP for complex animations
gsap.to(element, { duration: 0.3, opacity: 1 });

// ✅ Use CSS transforms for simple interactions
.hover\\:scale-105:hover { transform: scale(1.05); }
```

---

## 🧪 Testing & Quality Assurance

### Testing Checklist
- [ ] **Responsive Design**: Test on mobile (360px), tablet (768px), desktop (1440px)
- [ ] **Cross-browser**: Chrome, Firefox, Safari, Edge
- [ ] **Performance**: Check Lighthouse scores
- [ ] **Accessibility**: Test keyboard navigation and screen reader compatibility
- [ ] **Content**: Verify all data displays correctly
- [ ] **Images**: Ensure proper loading and alt text

### Development Quality Checks
```bash
# Build production version
npm run build:prod

# Check for console errors in browser
# Verify responsive breakpoints
# Test mobile menu functionality
# Validate HTML structure
```

## 🤝 Contributing & Code Standards

### Code Review Checklist

**Design System Compliance**:
- [ ] Uses design tokens from `tailwind.config.js`
- [ ] Typography scales correctly across breakpoints  
- [ ] Colors from approved palette only
- [ ] Spacing uses 4px grid system
- [ ] Components follow established patterns

**Quality Standards**:
- [ ] Responsive design tested (mobile, tablet, desktop)
- [ ] Accessible (semantic HTML, alt text, keyboard navigation)
- [ ] Performance optimized (images, CSS)
- [ ] Cross-browser compatibility
- [ ] No console errors

**Code Standards**:
- [ ] Uses Nunjucks component patterns
- [ ] Minimal custom CSS (prefers Tailwind classes)
- [ ] Proper file organization
- [ ] Clean, semantic HTML structure

### Git Workflow
```bash
# Feature development
git checkout -b feature/feature-name
# Make changes following patterns
git add .
git commit -m "feat: descriptive commit message"
git push origin feature/feature-name
```

---

## 📚 Quick Reference

### Key Files to Know
- **`src/index.njk`**: Main page template
- **`src/_includes/components/`**: All UI components  
- **`src/_data/projects.json`**: Project portfolio data
- **`src/_data/companies.json`**: Company logo data
- **`tailwind.config.js`**: Design system configuration
- **`.eleventy.js`**: Build configuration

### Common Tasks
```bash
# Start development
npm run dev

# Add new project
# → Edit src/_data/projects.json

# Add new company
# → Edit src/_data/companies.json
# → Add logo to src/static/company-logos/

# Create new component
# → Create src/_includes/components/component-name.njk
# → Include in src/index.njk

# Build for production
npm run build:prod
```

### Design Token Quick Reference
```css
/* Layout */
max-w-container         /* 1440px max width */
px-11                   /* 44px padding */
py-32                   /* 128px section spacing */

/* Typography */
font-helvetica          /* Headings */
font-mono              /* Body text */
text-h1, text-h2       /* Responsive heading sizes */
text-paragraph         /* Body text size */

/* Colors */
bg-background-primary   /* Main dark background */
text-text-primary      /* White text */
text-text-secondary    /* Gray text */
bg-orange              /* Primary CTA color */
```

---

## 📖 Documentation & Resources

- **README.md**: Project overview and setup instructions
- **Tailwind CSS Docs**: [tailwindcss.com](https://tailwindcss.com/docs)
- **Eleventy Docs**: [11ty.dev](https://www.11ty.dev/docs/)
- **GSAP Docs**: [greensock.com](https://greensock.com/docs/)
- **Accessibility Guidelines**: [webaim.org/checklist](https://webaim.org/checklist/)

---

*Keep it systematic. Follow the patterns. Ship with confidence.*
