# Design System Quick Reference

## 🎨 Colors

### Background Colors
```css
bg-background-primary    /* #242128 */
bg-background-secondary  /* #252229 */
```

### Text Colors
```css
text-text-primary        /* #ffffff */
text-text-secondary      /* rgba(255, 255, 255, 0.5) */
```

### Accent Colors
```css
bg-accent-orange        /* #f87c46 */
bg-accent-blue          /* #629fde */
bg-accent-pink          /* #f45cb3 */
bg-accent-green         /* #27ae60 */
bg-accent-yellow        /* #f1c40f */
```

## 📝 Typography

### Display Text
```css
hero-text               /* clamp(4rem, 12vw, 200px) */
display-text            /* clamp(3rem, 8vw, 140px) */
title-text              /* clamp(1.5rem, 3vw, 32px) */
```

### Body Text
```css
body-text-lg            /* clamp(1.125rem, 2.25vw, 24px) */
body-text               /* clamp(0.875rem, 1.75vw, 16px) */
body-text-sm            /* clamp(0.75rem, 1.5vw, 14px) */
```

### Project Text
```css
text-project-year       /* 16px */
text-project-company    /* 18px */
text-project-description /* 16px */
```

## 📏 Spacing

### Container & Layout
```css
p-container             /* 44px */
py-section              /* 128px */
py-component            /* 24px */
```

### Component Spacing
```css
py-11                   /* 44px */
py-13                   /* 52px */
py-15                   /* 60px */
py-25                   /* 100px */
py-30                   /* 120px */
py-32                   /* 128px */
```

## 🧩 Components

### Buttons
```css
btn                     /* Base button styles */
btn-primary             /* Orange background */
btn-secondary           /* Blue background */
btn-tertiary            /* Pink background */
btn-success             /* Green background */
btn-learn-more          /* Learn more button with arrow */
```

### Cards & Containers
```css
card                    /* Base card styles */
card-custom             /* Enhanced card with hover effects */
container-custom        /* Main container (1440px max) */
container-main          /* Main container with custom styling */
```

### Layout Components
```css
header                  /* Header component (100px height) */
header-main             /* Fixed header with backdrop blur */
hero-section            /* Full-screen hero section */
section                 /* Section with 128px padding */
section-title           /* Centered section title */
```

### Project Components
```css
project-entry           /* Project showcase entry */
project-year            /* Project year styling */
project-company         /* Company name styling */
project-description     /* Project description styling */
project-showcase        /* Project showcase container */
```

### Worked With Section
```css
worked-with-grid        /* 3-column grid for companies */
company-button          /* Company button (120px height) */
worked-with-section     /* Worked with container */
```

### About Section
```css
about-content           /* 2-column grid layout */
about-image             /* Image container */
about-text             /* Text content container */
```

### Contact Section
```css
contact-grid            /* 2-column grid for social */
social-button           /* Social button (120px height) */
social-button.github    /* GitHub button with orange border */
social-button.linkedin  /* LinkedIn button with blue border */
contact-section         /* Contact container */
```

### Color Divider
```css
color-divider           /* Horizontal color bar */
color-block             /* Individual color blocks */
```

## 🎭 Animations

### Animation Classes
```css
animate-fade-in         /* Fade in animation */
animate-slide-up        /* Slide up animation */
animate-slide-left      /* Slide left animation */
animate-fade-in-up      /* Fade in from bottom */
animate-slide-in-left   /* Slide in from left */
animate-slide-in-right  /* Slide in from right */
```

### Hover Effects
```css
hover-lift              /* Lift on hover */
hover-scale             /* Scale on hover */
```

## 📱 Responsive Utilities

### Grid Adaptations
```css
grid-cols-1             /* Single column (mobile) */
md:grid-cols-2          /* Two columns (tablet+) */
lg:grid-cols-3          /* Three columns (desktop) */
```

### Spacing Adaptations
```css
px-6                    /* 24px padding (mobile) */
md:px-8                 /* 32px padding (tablet+) */
lg:px-11                /* 44px padding (desktop) */
```

## 🔧 Custom Utilities

### Text Effects
```css
text-gradient           /* Gradient text effect */
```

### Backdrop Effects
```css
backdrop-blur-sm        /* 4px blur */
backdrop-blur-md        /* 8px blur */
backdrop-blur-lg        /* 12px blur */
```

## 📋 Example Usage

### Hero Section
```html
<section class="hero-section">
  <div class="container-main">
    <div class="hero-text-container">
      <h1 class="hero-text">LOST IN CHAOS?</h1>
      <p class="body-text-lg">Strategy & Operations Executive</p>
    </div>
  </div>
</section>
```

### Project Entry
```html
<div class="project-entry">
  <span class="project-year">2022</span>
  <span class="project-company">MAERSK</span>
  <span class="project-description">Restructured onboarding process...</span>
  <a href="#" class="btn-learn-more">LEARN MORE</a>
</div>
```

### Company Button
```html
<div class="company-button">
  <div class="icon">★</div>
  <div class="name">MAERSK</div>
</div>
```

### Color Divider
```html
<div class="color-divider">
  <div class="color-block"></div>
  <div class="color-block"></div>
  <div class="color-block"></div>
  <div class="color-block"></div>
  <div class="color-block"></div>
  <div class="color-block"></div>
</div>
```

## 🚀 Getting Started

1. **Install Dependencies**: `npm install`
2. **Build CSS**: `npm run build:css`
3. **Start Development**: `npm run dev`
4. **Use Classes**: Apply the utility classes above to your HTML

## 📚 Full Documentation

- **DESIGN_GUIDE.md** - Comprehensive design documentation
- **src/_data/tokens.json** - All design tokens
- **tailwind.config.js** - Tailwind configuration
- **src/css/main.css** - Custom component styles
