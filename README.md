# Tucker Wieland Portfolio

A sophisticated, professional portfolio website built with a comprehensive design system based on Figma designs. This project demonstrates strategic thinking, operational excellence, and modern web development practices.

## 🎨 Design System

This portfolio is built using a carefully crafted design system extracted from Figma designs, featuring:

- **Dark Theme**: Professional charcoal backgrounds with high contrast
- **Typography**: Helvetica Neue for headings, IBM Plex Mono for body text
- **Color Palette**: Strategic use of accent colors (orange, blue, pink, green)
- **Spacing System**: 4px base unit for consistent layouts
- **Component Library**: Reusable UI components with consistent patterns

### Design Philosophy
- **Professional & Strategic**: Reflects operational strategist expertise
- **Clean & Modern**: Minimalist approach with intentional use of space
- **Accessible**: High contrast ratios exceeding WCAG AAA standards
- **Consistent**: Systematic design tokens for maintainable code

## 🚀 Getting Started

### Prerequisites
- Node.js 18.0.0 or higher
- npm or yarn package manager

### Installation
1. Clone the repository:
   ```bash
   git clone <repository-url>
   cd portfolio
   ```

2. Install dependencies:
   ```bash
   npm install
   ```

3. Build the CSS:
   ```bash
   npm run build:css
   ```

4. Start development:
   ```bash
   npm run dev
   ```

## 🛠️ Development

### Available Scripts
- `npm run build:css` - Build CSS once
- `npm run build` - Build CSS and watch for changes
- `npm run build:prod` - Build optimized CSS for production
- `npm run dev` - Build CSS and start development server

### Project Structure
```
portfolio/
├── src/
│   ├── _data/
│   │   └── tokens.json          # Design tokens
│   ├── _includes/
│   │   ├── layouts/
│   │   └── partials/
│   ├── css/
│   │   └── main.css            # Main stylesheet with Tailwind
│   └── *.njk                   # Page templates
├── _site/                      # Built site
├── tailwind.config.js          # Tailwind configuration
├── postcss.config.js           # PostCSS configuration
├── DESIGN_GUIDE.md             # Comprehensive design documentation
└── package.json
```

## 🎯 Design Tokens

### Colors
```css
/* Primary Colors */
--background-primary: #242128
--background-secondary: #252229
--text-primary: #ffffff
--text-secondary: rgba(255, 255, 255, 0.5)

/* Accent Colors */
--accent-orange: #f87c46
--accent-blue: #629fde
--accent-pink: #f45cb3
--accent-green: #27ae60
```

### Typography
```css
/* Font Families */
--font-helvetica: 'Helvetica Neue', Helvetica, Arial, sans-serif
--font-ibm-mono: 'IBM Plex Mono', monospace

/* Font Sizes */
--font-hero: 200px
--font-display: 140px
--font-title: 32px
--font-body-lg: 24px
--font-body: 16px
```

### Spacing
```css
/* Base Unit: 4px */
--spacing-1: 4px
--spacing-2: 8px
--spacing-6: 24px
--spacing-8: 32px
--spacing-11: 44px
--spacing-13: 52px
--spacing-25: 100px
--spacing-32: 128px
```

## 🎨 Using Tailwind CSS

This project uses Tailwind CSS with custom design tokens. The configuration includes:

### Custom Classes
- `.btn` - Base button styles
- `.btn-primary`, `.btn-secondary`, etc. - Button variants
- `.card` - Card component
- `.container-custom` - Custom container
- `.header` - Header component

### Custom Utilities
- `.hero-text` - Hero typography
- `.display-text` - Display typography
- `.body-text` - Body typography
- `.text-gradient` - Gradient text effect

### Example Usage
```html
<!-- Hero Section -->
<section class="hero-section">
  <div class="container-main">
    <div class="hero-text-container">
      <h1 class="hero-text">LOST IN CHAOS?</h1>
      <p class="body-text-lg">Strategy & Operations Executive</p>
    </div>
  </div>
</section>

<!-- Button -->
<button class="btn btn-primary">
  View Projects
</button>

<!-- Card -->
<div class="card-custom">
  <h3 class="title-text">Project Title</h3>
  <p class="body-text">Project description...</p>
</div>
```

## 📱 Responsive Design

The design system includes responsive breakpoints:
- **Mobile**: 320px - 767px
- **Tablet**: 768px - 1439px
- **Desktop**: 1440px+

Typography and spacing automatically scale across devices for optimal readability.

## ♿ Accessibility

- **High Contrast**: Exceeds WCAG AAA standards
- **Typography**: Optimized for readability
- **Focus States**: Clear visual indicators
- **Semantic HTML**: Proper heading structure
- **Screen Reader**: Full compatibility

## 🎭 Animations

Custom animations and transitions:
- `.animate-fade-in-up` - Fade in from bottom
- `.animate-slide-in-left` - Slide in from left
- `.animate-slide-in-right` - Slide in from right
- `.hover-lift` - Subtle lift on hover
- `.hover-scale` - Scale effect on hover

## 🔧 Customization

### Adding New Colors
```javascript
// tailwind.config.js
colors: {
  'custom': {
    'new-color': '#123456',
  }
}
```

### Adding New Components
```javascript
// tailwind.config.js
addComponents({
  '.custom-component': {
    // Your styles here
  }
})
```

### Modifying Typography
```javascript
// tailwind.config.js
fontSize: {
  'custom': ['18px', {
    lineHeight: '24px',
    fontWeight: '600',
  }],
}
```

## 📚 Documentation

- **CODING_GUIDE.md** - Complete development guide with design system, patterns, and contribution guidelines
- **src/_data/tokens.json** - All design tokens in JSON format
- **tailwind.config.js** - Tailwind configuration with custom tokens

## 🤝 Contributing

1. Follow the established design system
2. Use the provided design tokens
3. Maintain accessibility standards
4. Test across different devices and browsers

## 📄 License

MIT License - see LICENSE file for details

## 👤 About

**Tucker Wieland** is a Strategy & Operations Executive who helps companies transform messy ideas into scalable systems that drive growth. This portfolio showcases strategic thinking, operational excellence, and modern web development practices.

---

Built with ❤️ using modern web technologies and a systematic design approach.
