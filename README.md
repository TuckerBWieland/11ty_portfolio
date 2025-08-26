# Tucker Wieland Portfolio

A professional portfolio website showcasing strategy & operations expertise. Built with Eleventy static site generator, Tailwind CSS, and a systematic design approach based on Figma designs.

## 🎯 Overview

This portfolio demonstrates modern web development practices while maintaining focus on content and user experience. The site features:

- **Single Page Application**: Hero section, project showcase, company experience, about, and contact
- **Component-Based Architecture**: Modular Nunjucks components for maintainability
- **Responsive Design**: Mobile-first approach with tablet and desktop breakpoints
- **Performance Optimized**: Static site generation with image optimization

## 🎨 Design System

Built with a carefully crafted design system extracted from Figma:

- **Dark Theme**: Professional dark backgrounds (#242128) with high contrast
- **Typography**: Helvetica Neue for headings (bold, large scale), IBM Plex Mono for body text
- **Color Palette**: Strategic accent colors (orange #f87c46, blue #629fde, pink #f45cb3, green #27ae60)
- **Spacing System**: 4px base unit with systematic scaling
- **Component Patterns**: Consistent button styles, cards, and layout containers

## 🚀 Getting Started

### Prerequisites
- Node.js 18.0.0 or higher
- npm package manager

### Installation & Development
```bash
# Clone and setup
git clone <repository-url>
cd portfolio
npm install

# Development workflow
npm run dev              # Build CSS + start dev server with hot reload
```

### Build Commands
```bash
npm run build:css       # Build Tailwind CSS only
npm run build           # Build static site with Eleventy
npm run build:prod      # Build optimized production version
npm start              # Alias for npm run dev
```

The development server runs at `http://localhost:8080` with automatic reload on file changes.

## 🏗️ Project Architecture

### File Structure
```
portfolio/
├── src/                          # Source files
│   ├── _data/                    # Data files (JSON)
│   │   ├── metadata.json         # Site metadata
│   │   ├── projects.json         # Project data
│   │   ├── companies.json        # Company experience data
│   │   └── tokens.json           # Design tokens
│   ├── _includes/                # Templates and components
│   │   ├── layouts/
│   │   │   └── base.njk          # Base HTML layout
│   │   └── components/           # Reusable components
│   │       ├── hero-section.njk  # Hero with navigation
│   │       ├── project-showcase.njk
│   │       ├── worked-with.njk   # Company logos
│   │       ├── about-section.njk
│   │       ├── contact-section.njk
│   │       └── site-footer.njk
│   ├── css/
│   │   ├── main.css              # Main Tailwind imports
│   │   └── components/           # Component-specific CSS
│   │       └── hero-section.css  # Hero animations/transitions
│   ├── js/
│   │   └── components/           # Component JavaScript
│   │       └── hero-section.js   # Mobile menu + GSAP animations
│   ├── static/                   # Static assets
│   │   ├── company-logos/        # SVG company logos
│   │   ├── *.png                 # Images
│   │   └── *.svg                 # Icons and graphics
│   └── index.njk                 # Home page template
├── _site/                        # Generated output (git ignored)
├── .eleventy.js                  # Eleventy configuration
├── tailwind.config.js            # Tailwind configuration
├── postcss.config.js             # PostCSS configuration
├── CODING_GUIDE.md               # Development guide
└── package.json                  # Dependencies and scripts
```

## 🎨 Technical Stack

### Core Technologies
- **Static Site Generator**: Eleventy 3.1.2
- **CSS Framework**: Tailwind CSS 3.4.0 with custom design tokens
- **Template Engine**: Nunjucks (.njk files)
- **Build Tools**: PostCSS, Autoprefixer
- **Image Processing**: @11ty/eleventy-img for responsive images
- **Animations**: GSAP 3.12.2 with ScrollTrigger

### Data Management
The site uses Eleventy's data cascade system:
- **projects.json**: Project portfolio data with descriptions, outcomes, and narratives
- **companies.json**: Company logos and descriptions for "worked with" section
- **metadata.json**: Site metadata and configuration

### Component Architecture
All UI components are built as Nunjucks partials in `src/_includes/components/`:
- Modular, reusable components
- Consistent design token usage
- Responsive mobile-first approach
- Accessibility-first implementation

## 🎯 Design Tokens

The design system is implemented through Tailwind's configuration:

### Colors (Tailwind Classes)
```css
/* Backgrounds */
bg-background-primary     /* #242128 - Main dark background */
bg-background-secondary   /* #2C2931 - Card/section backgrounds */

/* Text */
text-text-primary        /* #ffffff - Primary text */
text-text-secondary      /* rgba(255,255,255,0.5) - Secondary text */

/* Accent Colors */
bg-orange                /* #f87c46 - Primary CTA */
bg-blue                  /* #629fde - Secondary accent */
bg-pink                  /* #f45cb3 - Tertiary accent */
bg-green                 /* #27ae60 - Success/positive */
bg-yellow                /* #E6C95D - Highlight */
bg-red                   /* #ff3333 - Alert/error */
```

### Typography Scale
```css
/* Font Families */
font-helvetica           /* Helvetica Neue - headings */
font-mono                /* IBM Plex Mono - body text */

/* Responsive Font Sizes */
text-h1                  /* 180px desktop, 130px tablet, 80px mobile */
text-h2                  /* 120px desktop, 80px tablet, 48px mobile */
text-big-link            /* 24px - navigation links */
text-paragraph           /* 20px - body text */
text-button              /* 16px - button text */
text-caption             /* 16px - captions/meta */
```

### Spacing System (4px base)
```css
/* Custom Spacing */
px-11                    /* 44px - Container padding */
py-15                    /* 60px - Section spacing */
h-30                     /* 120px - Component heights */
py-32                    /* 128px - Large section spacing */
```

## 📱 Responsive Breakpoints

```css
/* Tailwind Custom Breakpoints */
xs: '360px'              /* Small mobile */
sm: '640px'              /* Standard mobile */
md: '768px'              /* Tablet */
mmd: '1280px'            /* Large tablet */
lg: '1440px'             /* Desktop */
```

## 🔧 Adding New Features

### Adding New Sections to Home Page
1. **Create Component**: Add new .njk file in `src/_includes/components/`
2. **Include in Template**: Add include statement to `src/index.njk`
3. **Add Styles**: Create component CSS in `src/css/components/` if needed
4. **Update Navigation**: Add anchor link to mobile menu in hero section

### Adding New Projects
1. **Update Data**: Add project object to `src/_data/projects.json` with:
   - `id`: Unique identifier
   - `company`: Company name
   - `title`: Project title
   - `description`: Brief description
   - `problem`, `solution`, `result`: Key details
   - `narrative`: Full story
   - `image`: Project image URL

2. **Component Updates**: The project-showcase component automatically displays new projects

### Adding New Companies
1. **Update Data**: Add company to `src/_data/companies.json` with:
   - `id`: Unique identifier
   - `name`: Company name
   - `logo`: Path to SVG logo in `/static/company-logos/`
   - `description`: Brief description

2. **Add Logo**: Place SVG logo in `src/static/company-logos/`

### Component Development Patterns
```njk
<!-- Example new component structure -->
<section class="py-32 bg-background-primary">
  <div class="max-w-container mx-auto px-11">
    <!-- Component content using design tokens -->
  </div>
</section>
```

## 🚀 Deployment

### Production Build
```bash
npm run build:prod       # Builds optimized CSS + static site
```

### Build Output
- Generated files go to `_site/` directory
- CSS is processed and optimized
- Images are optimized and responsive variants generated
- HTML is minified in production

## 🔍 Performance & SEO

### Built-in Optimizations
- **Static Site Generation**: Fast loading with no runtime JavaScript requirements
- **Responsive Images**: Automatic WebP conversion and multiple sizes
- **CSS Optimization**: Tailwind CSS purging removes unused styles
- **HTML Minification**: Compressed HTML in production
- **Lazy Loading**: Images load as needed

### SEO Features
- Semantic HTML structure
- Meta description support
- Alt text requirements for images
- Proper heading hierarchy

## 📚 References & Documentation

- **CODING_GUIDE.md**: Comprehensive development guide with component patterns
- **Eleventy Documentation**: [11ty.dev](https://www.11ty.dev/docs/)
- **Tailwind CSS**: [tailwindcss.com](https://tailwindcss.com/docs)
- **GSAP Animation**: [greensock.com](https://greensock.com/docs/)

## 🤝 Contributing

### Development Standards
1. Follow established design system and component patterns
2. Use design tokens from Tailwind configuration
3. Maintain mobile-first responsive approach
4. Ensure accessibility standards (WCAG guidelines)
5. Test across multiple devices and browsers

### Code Review Checklist
- [ ] Uses design system colors and typography
- [ ] Responsive on mobile, tablet, and desktop
- [ ] Accessible (proper semantics, alt text, keyboard navigation)
- [ ] Performance optimized (images, CSS)
- [ ] Follows established component patterns

## 📄 License

MIT License

## 👤 About

**Tucker Wieland** is a Strategy & Operations Executive who helps companies transform messy ideas into scalable systems that drive growth. This portfolio demonstrates strategic thinking, operational excellence, and modern web development practices through a clean, performance-focused website.

---

Built with Eleventy, Tailwind CSS, and systematic design principles.
