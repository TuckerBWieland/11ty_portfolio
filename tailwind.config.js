/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.{html,js,njk,md}",
    "./_site/**/*.html"
  ],
  theme: {
    extend: {
      // Custom colors from Figma design
      colors: {
        // Primary colors
        'background': {
          primary: '#242128',
          secondary: '#2C2931',
        },
        'text': {
          primary: '#ffffff',
          secondary: 'rgba(255, 255, 255, 0.5)',
        },
        // Accent colors (from Figma)
        'orange': '#f87c46',
        'blue': '#629fde', 
        'pink': '#f45cb3',
        'green': '#27ae60',
        'yellow': '#E6C95D',
        'red': '#ff3333',
        'gray': '#808080',
        'lines': '#6a686c',
        // UI elements
        'ui': {
          border: '#808080',
          stroke: 'rgba(255, 255, 255, 0.3)',
        }
      },
      
      // Essential spacing for current design
      spacing: {
        '11': '44px',    // Container padding
        '15': '60px',    // Section spacing
        '30': '120px',   // Component heights (buttons, logos)
        '32': '128px',   // Large section spacing
      },
      
              // Custom font families
        fontFamily: {
          'helvetica': ['Helvetica Neue', 'Helvetica', 'Arial', 'sans-serif'],
          'mono': ['IBM Plex Mono', 'monospace'],
        },
      
      // Font sizes matching Figma design exactly
      fontSize: {
        // Desktop/H1: 180px, line-height: 210px
        'h1': ['180px', {
          lineHeight: '210px',
          fontWeight: '700',
        }],
        // Desktop/H2: 120px, line-height: 100% (120px)
        'h2': ['120px', {
          lineHeight: '1',
          fontWeight: '700',
        }],
        // Desktop/Big link: 24px, line-height: 100%
        'big-link': ['24px', {
          lineHeight: '1',
          fontWeight: '600',
        }],
        // Desktop/paragraph: 20px, line-height: 28px
        'paragraph': ['20px', {
          lineHeight: '28px',
          fontWeight: '500',
        }],
        // Desktop/Button: 16px, line-height: 100%
        'button': ['16px', {
          lineHeight: '1',
          fontWeight: '500',
        }],
        // Desktop/Big link: 24px, line-height: 100%, tracking: 0.48px
        'button-big': ['24px', {
          lineHeight: '1',
          fontWeight: '600',
          letterSpacing: '0.48px',
        }],
        // Desktop/caption: 16px, line-height: 100%
        'caption': ['16px', {
          lineHeight: '1',
          fontWeight: '500',
        }],
      },
      
      // Custom font weights
      fontWeight: {
        'light': '300',
        'normal': '400',
        'medium': '500',
        'semibold': '600',
        'bold': '700',
      },
      
      // Custom letter spacing
      letterSpacing: {
        'wide': '0.96px',
        'button': '0.48px',
      },
      

      
      // Essential container and component sizes
      maxWidth: {
        'container': '1440px',  // Main container from Figma
        'content': '1200px',    // Content width from Figma
      },
      
      // Custom border radius
      borderRadius: {
        'none': '0',
      },
      
      // Custom shadows (none for flat design)
      boxShadow: {
        'none': 'none',
      },
      

    },
  },
  plugins: [
    // Custom component classes
    function({ addComponents, theme }) {
      addComponents({
        // Button component (for main CTA buttons)
        '.btn': {
          padding: '12px',
          borderRadius: theme('borderRadius.none'),
          border: '2px solid transparent',
          fontSize: theme('fontSize.button-big[0]'),
          fontFamily: theme('fontFamily.mono'),
          fontWeight: theme('fontWeight.semibold'),
          lineHeight: theme('fontSize.button-big[1].lineHeight'),
          letterSpacing: theme('fontSize.button-big[1].letterSpacing'),
          color: theme('colors.text.primary'),
          textTransform: 'uppercase',
          transition: 'all 0.2s ease-in-out',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'flex-start',
          gap: '12px',
          '&:hover': {
            opacity: '0.8',
          },
          '&:focus': {
            outline: '2px solid',
            outlineColor: theme('colors.text.primary'),
            outlineOffset: '2px',
          },
        },
        
        // Button variants
        '.btn-primary': {
          backgroundColor: theme('colors.orange'),
        },
        '.btn-secondary': {
          backgroundColor: theme('colors.blue'),
        },
        '.btn-tertiary': {
          backgroundColor: theme('colors.pink'),
        },
        '.btn-success': {
          backgroundColor: theme('colors.green'),
        },
      })
    }
  ],
}
