# Portfolio Coding Guide

An agentic guide for building Tucker Wieland's portfolio site with clear patterns, consistent design tokens, and logical contribution structure.

## 🎯 Project Vision

**Simple Portfolio Site**: Home page + project template showcasing ~10 projects. Not over-engineered, built for clarity and impact.

**Core Pages**:
- Home page (hero, projects overview, about, contact)
- Individual project pages (using template)

**Tech Stack**: Eleventy + Tailwind CSS + Figma Design System

---

## 🎨 Design System (From Figma)

### Colors

```css
/* Backgrounds */
--bg-primary: #242128        /* Primary dark background */
--bg-secondary: #252229      /* Secondary background for cards */

/* Text */
--text-primary: #ffffff      /* Pure white text */
--text-secondary: #bdbbcf    /* Secondary text (gray) */
--text-dark: #161616         /* Dark text for light backgrounds */

/* Accent Colors */
--orange: #f87c46           /* Primary CTA */
--blue: #629fde             /* Secondary CTA */
--pink: #f45cb3             /* Tertiary accent */
--green: #27ae60            /* Success/positive */
--yellow: #e6c95d           /* Highlight/warning */
--red: #ff3333              /* Alert/error */

/* UI Elements */
--gray: #808080             /* Borders, dividers */
--lines: #6a686c           /* Subtle lines */
--card-bg: rgba(76, 22, 22, 0.5)  /* Card overlay */
```

### Typography Scale

**Font Families**:
- Helvetica Neue (headings, display)
- IBM Plex Mono (body, UI)

**Desktop Sizes**:
```css
--h1: 180px (Helvetica Neue Bold)
--h2: 120px (Helvetica Neue Bold)  
--h3: 80px (Helvetica Neue Bold)
--h4: 32px (Helvetica Neue Medium)
--paragraph: 20px (IBM Plex Mono Medium)
--caption: 16px (IBM Plex Mono Medium)
--button: 16px (IBM Plex Mono Medium)
--big-link: 24px (IBM Plex Mono SemiBold)
```

**Tablet Sizes**:
```css
--h1: 130px
--h2: 80px
--h3: 60px  
--h4: 26px
--paragraph: 18px
```

**Mobile Sizes**:
```css
--h1: 80px
--h2: 48px
--h3: 36px
--h4: 24px
--paragraph: 16px
--caption: 14px
```

### Spacing System (4px base)

```css
--space-1: 4px
--space-2: 8px
--space-3: 12px
--space-4: 16px
--space-5: 20px
--space-6: 24px
--space-8: 32px
--space-11: 44px
--space-13: 52px
--space-15: 60px
--space-25: 100px
--space-30: 120px
--space-32: 128px
```

---

## 🏗️ Project Structure

```
src/
├── _data/
│   ├── metadata.json          # Site metadata
│   ├── nav.json               # Navigation structure  
│   └── tokens.json            # Design tokens
├── _includes/
│   ├── layouts/
│   │   └── base.njk           # Base HTML layout
│   └── partials/
│       ├── site-header.njk    # Global header
│       └── site-footer.njk    # Global footer
├── css/
│   └── main.css               # Tailwind + custom CSS
├── work/
│   ├── index.njk              # Projects listing
│   └── project-1.md           # Individual project
├── index.njk                  # Home page
├── about.njk                  # About page
└── contact.njk                # Contact page
```

---

## 🧩 Component Patterns

### 1. Layout Components

**Container**:
```html
<div class="max-w-[1440px] mx-auto px-11">
  <!-- Content -->
</div>
```

**Section**:
```html
<section class="py-32">
  <div class="max-w-[1440px] mx-auto px-11">
    <!-- Section content -->
  </div>
</section>
```

### 2. Typography Components

**Hero Text**:
```html
<h1 class="text-[180px] md:text-[130px] sm:text-[80px] font-bold font-helvetica leading-none">
  LOST IN CHAOS?
</h1>
```

**Section Title**:
```html
<h2 class="text-[120px] md:text-[80px] sm:text-[48px] font-bold font-helvetica">
  Section Title
</h2>
```

**Body Text**:
```html
<p class="text-[20px] md:text-[18px] sm:text-[16px] font-medium font-mono text-text-secondary">
  Body text content
</p>
```

### 3. Button Components

**Primary Button**:
```html
<button class="h-13 px-6 border border-white/30 bg-orange text-white font-mono font-medium hover:opacity-80 transition-opacity">
  Button Text
</button>
```

**Learn More Link**:
```html
<a href="#" class="text-[24px] font-semibold font-mono text-orange hover:underline inline-flex items-center gap-2">
  LEARN MORE
  <span class="text-sm">→</span>
</a>
```

### 4. Card Components

**Project Card**:
```html
<div class="bg-bg-secondary border border-gray/20 p-11 hover:border-orange/50 transition-colors">
  <div class="flex items-center justify-between mb-6">
    <span class="text-[16px] font-mono text-text-secondary">2024</span>
    <span class="text-[18px] font-semibold font-helvetica text-white">COMPANY</span>
  </div>
  <p class="text-[16px] font-mono text-text-secondary mb-6">
    Project description text here...
  </p>
  <a href="#" class="text-orange font-semibold font-mono hover:underline">
    LEARN MORE →
  </a>
</div>
```

**Company Logo Card**:
```html
<div class="h-30 border-2 border-gray flex flex-col items-center justify-center p-6 hover:border-orange hover:scale-105 transition-all">
  <div class="text-2xl mb-2">★</div>
  <div class="text-sm font-mono font-semibold">COMPANY</div>
</div>
```

### 5. Navigation Components

**Header**:
```html
<header class="h-25 fixed top-0 w-full backdrop-blur-sm bg-bg-primary/80 border-b border-gray/20 z-50">
  <div class="max-w-[1440px] mx-auto px-11 h-full flex items-center justify-between">
    <div class="text-[24px] font-semibold font-mono">TW</div>
    <nav class="flex gap-8">
      <a href="/" class="text-[16px] font-mono text-white/50 hover:text-white">HOME</a>
      <a href="/work" class="text-[16px] font-mono text-white/50 hover:text-white">WORK</a>
      <a href="/about" class="text-[16px] font-mono text-white/50 hover:text-white">ABOUT</a>
      <a href="/contact" class="text-[16px] font-mono text-white/50 hover:text-white">CONTACT</a>
    </nav>
  </div>
</header>
```

---

## 📄 Page Templates

### 1. Home Page Structure

```njk
---
layout: layouts/base.njk
title: Tucker Wieland - Strategy & Operations Executive
---

<!-- Hero Section -->
<section class="min-h-screen flex items-center py-32">
  <!-- Hero content -->
</section>

<!-- Projects Overview -->
<section class="py-32">
  <!-- Featured projects -->
</section>

<!-- Color Divider -->
<div class="h-4 flex">
  <div class="flex-1 bg-blue"></div>
  <div class="flex-1 bg-yellow"></div>
  <div class="flex-1 bg-green"></div>
  <div class="flex-1 bg-red"></div>
  <div class="flex-1 bg-pink"></div>
  <div class="flex-1 bg-orange"></div>
</div>

<!-- About Section -->
<section class="py-32">
  <!-- About content -->
</section>

<!-- Contact Section -->
<section class="py-32">
  <!-- Contact content -->
</section>
```

### 2. Project Page Template

```md
---
layout: layouts/base.njk
title: Project Title
company: Company Name
year: 2024
description: Brief project description
tags: [tag1, tag2, tag3]
hero_image: /static/project-hero.jpg
---

# {{ title }}

## Overview
Project overview content...

## Challenge
What was the problem to solve...

## Solution  
How it was solved...

## Results
What was achieved...
```

---

## 🔧 Development Patterns

### 1. Adding New Projects

**Step 1**: Create project file in `/work/`
```bash
touch src/work/project-name.md
```

**Step 2**: Use project template structure
```md
---
layout: layouts/base.njk
title: Project Title
company: Company Name
year: 2024
description: Project description
tags: [strategy, operations]
---

Content here...
```

**Step 3**: Add to projects data (if using collection)

### 2. Adding New Components

**Step 1**: Create partial in `_includes/partials/`
```bash
touch src/_includes/partials/component-name.njk
```

**Step 2**: Build component with design system classes
```njk
<div class="component-container">
  <!-- Use design tokens and established patterns -->
</div>
```

**Step 3**: Include in templates
```njk
{% include "partials/component-name.njk" %}
```

### 3. Styling Guidelines

**Use Tailwind Classes**:
- Always use design system tokens
- Prefer utility classes over custom CSS
- Use responsive prefixes: `sm:`, `md:`, `lg:`

**CSS Custom Properties** (when needed):
```css
.custom-component {
  color: var(--text-primary);
  background: var(--bg-secondary);
  padding: var(--space-6);
}
```

**Responsive Design**:
```html
<!-- Mobile first, then scale up -->
<div class="text-[16px] md:text-[18px] lg:text-[20px]">
  Responsive text
</div>
```

### 4. File Naming Conventions

- **Pages**: `kebab-case.njk` or `kebab-case.md`
- **Components**: `component-name.njk`
- **Data files**: `lowercase.json`
- **Images**: `descriptive-name.jpg`

---

## 🚀 Getting Started

### Setup
```bash
npm install
npm run dev
```

### Development Workflow
1. **Start dev server**: `npm run dev`
2. **Edit files** in `src/`
3. **Changes auto-reload** at `localhost:8080`
4. **Build for production**: `npm run build`

### Adding Content
1. **New page**: Create `.njk` file in `src/`
2. **New project**: Create `.md` file in `src/work/`
3. **Navigation**: Update `src/_data/nav.json`
4. **Images**: Add to `src/static/`

---

## ✅ Quality Checklist

### Before Committing
- [ ] Uses design system tokens
- [ ] Responsive on mobile/tablet/desktop
- [ ] Accessible (proper headings, alt text)
- [ ] Fast loading (optimized images)
- [ ] Clean, semantic HTML

### Design System Compliance
- [ ] Colors from approved palette
- [ ] Typography scales correctly
- [ ] Spacing uses 4px grid
- [ ] Components follow patterns
- [ ] Hover states implemented

### Performance
- [ ] Images optimized (WebP when possible)
- [ ] CSS under 10KB gzipped
- [ ] No layout shift
- [ ] Fast interaction response

---

## 🎯 Contributing

### Code Style
- Use established component patterns
- Follow design system strictly  
- Write semantic HTML
- Keep CSS minimal and utility-focused
- Test on multiple devices

### Git Workflow
```bash
git checkout -b feature/new-feature
# Make changes
git add .
git commit -m "feat: add new feature"
git push origin feature/new-feature
```

### Pull Request Checklist
- [ ] Follows design system
- [ ] Responsive design tested
- [ ] Accessibility validated
- [ ] Performance impact considered
- [ ] Documentation updated

---

## 📚 References

- **Design System**: Colors and typography from Figma
- **Tailwind Docs**: https://tailwindcss.com/docs
- **Eleventy Docs**: https://www.11ty.dev/docs/
- **Accessibility**: https://webaim.org/checklist/

---

*Keep it simple. Follow the patterns. Ship fast.*
