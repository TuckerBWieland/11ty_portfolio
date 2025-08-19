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
          secondary: '#252229',
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
        'yellow': '#e6c95d',
        'red': '#ff3333',
        'gray': '#808080',
        'lines': '#6a686c',
        // UI elements
        'ui': {
          border: '#808080',
          stroke: 'rgba(255, 255, 255, 0.3)',
        }
      },
      
      // Custom spacing based on 4px base unit
      spacing: {
        '11': '44px',    // 2.75rem
        '13': '52px',    // 3.25rem
        '15': '60px',    // 3.75rem - for project year width
        '25': '100px',   // 6.25rem
        '30': '120px',   // 7.5rem - for company buttons
        '32': '128px',   // 8rem
        '36': '143px',   // 8.94rem
        '69': '275px',   // 17.19rem - for hero text positioning
        '338': '1352px', // 84.5rem
        '360': '1440px', // 90rem
      },
      
              // Custom font families
        fontFamily: {
          'helvetica': ['Helvetica Neue', 'Helvetica', 'Arial', 'sans-serif'],
          'mono': ['IBM Plex Mono', 'monospace'],
        },
      
      // Custom font sizes matching Figma design with responsive scaling
      fontSize: {
        'hero': ['clamp(4rem, 12vw, 200px)', {
          lineHeight: 'clamp(4.4rem, 12.6vw, 210px)',
          fontWeight: '700',
        }],
        'display': ['clamp(3rem, 8vw, 140px)', {
          lineHeight: 'clamp(3.6rem, 9.6vw, 170.94px)',
          fontWeight: '700',
        }],
        'title': ['clamp(1.5rem, 3vw, 32px)', {
          lineHeight: 'clamp(1.8rem, 3.6vw, 39.07px)',
          fontWeight: '500',
        }],
        'body-lg': ['clamp(1.125rem, 2.25vw, 24px)', {
          lineHeight: 'clamp(1.5rem, 3vw, 32px)',
          fontWeight: '500',
        }],
        'body': ['clamp(0.875rem, 1.75vw, 16px)', {
          lineHeight: 'clamp(1.125rem, 2.25vw, 20.8px)',
          fontWeight: '500',
        }],
        'body-sm': ['clamp(0.75rem, 1.5vw, 14px)', {
          lineHeight: 'clamp(1rem, 2vw, 18.2px)',
          fontWeight: '500',
        }],
        'button': ['clamp(1.125rem, 2.25vw, 24px)', {
          lineHeight: 'clamp(1.5rem, 3vw, 32px)',
          fontWeight: '500',
        }],
        'nav': ['clamp(0.875rem, 1.75vw, 16px)', {
          lineHeight: 'clamp(1.125rem, 2.25vw, 20.8px)',
          fontWeight: '500',
        }],
        'caption': ['clamp(0.75rem, 1.5vw, 14px)', {
          lineHeight: 'clamp(1rem, 2vw, 18.2px)',
          fontWeight: '500',
        }],
        'project-year': ['16px', {
          lineHeight: '20.8px',
          fontWeight: '500',
        }],
        'project-company': ['18px', {
          lineHeight: '24px',
          fontWeight: '600',
        }],
        'project-description': ['16px', {
          lineHeight: '20.8px',
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
      },
      
      // Custom line heights
      lineHeight: {
        'hero': 'clamp(4.4rem, 12.6vw, 210px)',
        'display': 'clamp(3.6rem, 9.6vw, 170.94px)',
        'title': 'clamp(1.8rem, 3.6vw, 39.07px)',
        'body-lg': 'clamp(1.5rem, 3vw, 32px)',
        'body': 'clamp(1.125rem, 2.25vw, 20.8px)',
        'body-sm': 'clamp(1rem, 2vw, 18.2px)',
        'button': 'clamp(1.5rem, 3vw, 32px)',
        'nav': 'clamp(1.125rem, 2.25vw, 20.8px)',
        'caption': 'clamp(1rem, 2vw, 18.2px)',
        'project-year': '20.8px',
        'project-company': '24px',
        'project-description': '20.8px',
      },
      
      // Custom container sizes
      maxWidth: {
        'container': '1440px',
        'content': '1352px',
        'project-grid': '800px',
        'worked-with': '600px',
        'contact': '400px',
      },
      
      // Custom padding
      padding: {
        'container': '44px',
        'section': '128px',
        'component': '24px',
      },
      
      // Custom heights
      height: {
        'header': '100px',
        'button': '52px',
        'company-button': '120px',
        'social-button': '120px',
        'color-divider': '16px',
      },
      
      // Custom widths
      width: {
        'button': '275px',
        'project-year': '60px',
      },
      
      // Custom border radius
      borderRadius: {
        'none': '0',
      },
      
      // Custom shadows (none for flat design)
      boxShadow: {
        'none': 'none',
      },
      
      // Custom transitions
      transitionDuration: {
        '200': '200ms',
        '300': '300ms',
      },
      
      // Custom animation
      animation: {
        'fade-in': 'fadeIn 0.3s ease-in-out',
        'slide-up': 'slideUp 0.3s ease-in-out',
        'slide-left': 'slideLeft 0.3s ease-in-out',
        'fade-in-up': 'fadeInUp 0.6s ease-out',
        'slide-in-left': 'slideInLeft 0.6s ease-out',
        'slide-in-right': 'slideInRight 0.6s ease-out',
      },
      
      // Custom keyframes
      keyframes: {
        fadeIn: {
          '0%': { opacity: '0' },
          '100%': { opacity: '1' },
        },
        slideUp: {
          '0%': { transform: 'translateY(20px)', opacity: '0' },
          '100%': { transform: 'translateY(0)', opacity: '1' },
        },
        slideLeft: {
          '0%': { transform: 'translateX(-20px)', opacity: '0' },
          '100%': { transform: 'translateX(0)', opacity: '1' },
        },
        fadeInUp: {
          '0%': { opacity: '0', transform: 'translateY(30px)' },
          '100%': { opacity: '1', transform: 'translateY(0)' },
        },
        slideInLeft: {
          '0%': { opacity: '0', transform: 'translateX(-30px)' },
          '100%': { opacity: '1', transform: 'translateX(0)' },
        },
        slideInRight: {
          '0%': { opacity: '0', transform: 'translateX(30px)' },
          '100%': { opacity: '1', transform: 'translateX(0)' },
        },
      },
      
      // Custom backdrop filters
      backdropBlur: {
        'xs': '2px',
        'sm': '4px',
        'md': '8px',
        'lg': '12px',
        'xl': '16px',
      },
      
      // Custom opacity values
      opacity: {
        '15': '0.15',
        '30': '0.3',
        '50': '0.5',
        '95': '0.95',
      },
      
      // Custom grid templates
      gridTemplateColumns: {
        'worked-with': 'repeat(3, minmax(0, 1fr))',
        'about': 'repeat(2, minmax(0, 1fr))',
        'contact': 'repeat(2, minmax(0, 1fr))',
      },
      
      // Custom gaps
      gap: {
        'section': '128px',
        'component': '24px',
        'project': '24px',
        'worked-with': '24px',
        'about': '64px',
        'contact': '32px',
      },
    },
  },
  plugins: [
    // Custom component classes
    function({ addComponents, theme }) {
      addComponents({
        // Button component
        '.btn': {
          height: theme('height.button'),
          padding: '10px 20px',
          borderRadius: theme('borderRadius.none'),
          border: `1px solid ${theme('colors.ui.stroke')}`,
          fontSize: theme('fontSize.button'),
          fontFamily: theme('fontFamily.mono'),
          fontWeight: theme('fontWeight.medium'),
          lineHeight: theme('lineHeight.button'),
          color: theme('colors.text.primary'),
          transition: 'all 0.2s ease-in-out',
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
        
        // Card component
        '.card': {
          backgroundColor: theme('colors.background.secondary'),
          border: `1px solid ${theme('colors.ui.border')}`,
          padding: theme('padding.container'),
        },
        
        // Container component
        '.container-custom': {
          maxWidth: theme('maxWidth.container'),
          margin: '0 auto',
          padding: `0 ${theme('padding.container')}`,
        },
        
        // Header component
        '.header': {
          height: theme('height.header'),
          backgroundColor: theme('colors.background.primary'),
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          padding: `0 ${theme('padding.container')}`,
        },
        
        // Hero text component
        '.hero-text': {
          fontSize: theme('fontSize.hero'),
          fontFamily: theme('fontFamily.helvetica'),
          fontWeight: theme('fontWeight.bold'),
          lineHeight: theme('lineHeight.hero'),
          color: theme('colors.text.primary'),
        },
        
        // Display text component
        '.display-text': {
          fontSize: theme('fontSize.display'),
          fontFamily: theme('fontFamily.helvetica'),
          fontWeight: theme('fontWeight.bold'),
          lineHeight: theme('lineHeight.display'),
          color: theme('colors.text.primary'),
        },
        
        // Title text component
        '.title-text': {
          fontSize: theme('fontSize.title'),
          fontFamily: theme('fontFamily.helvetica'),
          fontWeight: theme('fontWeight.medium'),
          lineHeight: theme('lineHeight.title'),
          color: theme('colors.text.primary'),
        },
        
        // Body text component
        '.body-text': {
          fontSize: theme('fontSize.body'),
          fontFamily: theme('fontFamily.mono'),
          fontWeight: theme('fontWeight.medium'),
          lineHeight: theme('lineHeight.body'),
          color: theme('colors.text.primary'),
        },
        
        // Body large text component
        '.body-text-lg': {
          fontSize: theme('fontSize.body-lg'),
          fontFamily: theme('fontFamily.mono'),
          fontWeight: theme('fontWeight.medium'),
          lineHeight: theme('lineHeight.body-lg'),
          color: theme('colors.text.primary'),
        },
        
        // Project showcase components
        '.project-showcase': {
          maxWidth: theme('maxWidth.project-grid'),
          margin: '0 auto',
        },
        
        '.worked-with-section': {
          maxWidth: theme('maxWidth.worked-with'),
          margin: '0 auto',
        },
        
        '.contact-section': {
          maxWidth: theme('maxWidth.contact'),
          margin: '0 auto',
        },
      })
    }
  ],
}
