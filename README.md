# Portfolio - Eleventy Static Site

A minimal, accessible portfolio built with Eleventy that prioritizes performance, accessibility, and maintainability.

## Features

- **Performance First**: Responsive images, minimal CSS, optimized HTML
- **Accessibility by Default**: WCAG AA compliant with proper landmarks and focus management
- **Maintainable Structure**: Clean layouts, partials, and data-driven content
- **Ready for Design**: Structured to easily accept design work later

## Quick Start

### Prerequisites

- Node.js 16+ 
- npm or yarn

### Installation

1. Clone the repository
2. Install dependencies:
   ```bash
   npm install
   ```

### Development

Start the development server:
```bash
npm run dev
```

The site will be available at `http://localhost:8080`

### Building for Production

Build the optimized site:
```bash
npm run build
```

The built site will be in the `_site/` directory.

## Project Structure

```
src/
├── _data/           # Global data files
├── _includes/       # Reusable templates
├── css/            # Stylesheets
├── static/         # Static assets
├── work/           # Work/projects section
└── *.njk          # Page templates
```

## Documentation

See [TECH_GUIDE.md](./TECH_GUIDE.md) for comprehensive documentation on:

- Adding pages and partials
- Using responsive images
- Accessibility checklist
- Performance optimization
- Extending the project

## Scripts

- `npm run dev` - Start development server with watch
- `npm run build` - Build production site
- `npm run check` - Run quality checks (stubbed)

## License

ISC
