# Portfolio Design Guide

## Overview
This design guide establishes the visual foundation for Tucker Wieland's portfolio website, based on the Figma design "finished variant". The design emphasizes a sophisticated, professional aesthetic with a dark theme and strategic use of typography and color.

## Design Philosophy
- **Professional & Strategic**: Reflects the operational strategist role
- **Clean & Modern**: Minimalist approach with intentional use of space
- **Accessible**: High contrast and readable typography
- **Consistent**: Systematic design tokens for maintainable code
- **Responsive**: Fluid typography and spacing that adapts to all devices

## Color Palette

### Primary Colors
- **Background Primary**: `#242128` (Dark charcoal)
- **Background Secondary**: `#252229` (Slightly lighter charcoal)
- **Text Primary**: `#ffffff` (Pure white)
- **Text Secondary**: `rgba(255, 255, 255, 0.5)` (50% white opacity)

### Accent Colors
- **Orange**: `#f87c46` (Primary CTA)
- **Blue**: `#629fde` (Secondary CTA)
- **Pink**: `#f45cb3` (Tertiary CTA)
- **Green**: `#27ae60` (Success/Info CTA)
- **Yellow**: `#f1c40f` (Highlight/Accent)

### UI Elements
- **Border**: `#808080` (Gray)
- **Stroke**: `rgba(255, 255, 255, 0.3)` (30% white opacity)

## Typography

### Font Families
- **Primary**: `Helvetica Neue` - Used for headings and display text
- **Secondary**: `IBM Plex Mono` - Used for body text and UI elements

### Font Weights
- **Light**: 300
- **Regular**: 400
- **Medium**: 500
- **SemiBold**: 600
- **Bold**: 700

### Type Scale (Responsive with CSS clamp)

#### Display Text (Helvetica Neue)
- **Hero Title**: `clamp(4rem, 12vw, 200px)` / 700 weight / `clamp(4.4rem, 12.6vw, 210px)` line height
- **Section Title**: `clamp(3rem, 8vw, 140px)` / 700 weight / `clamp(3.6rem, 9.6vw, 170.94px)` line height
- **Subsection Title**: `clamp(1.5rem, 3vw, 32px)` / 500 weight / `clamp(1.8rem, 3.6vw, 39.07px)` line height

#### Body Text (IBM Plex Mono)
- **Large Body**: `clamp(1.125rem, 2.25vw, 24px)` / 500 weight / `clamp(1.5rem, 3vw, 32px)` line height
- **Body**: `clamp(0.875rem, 1.75vw, 16px)` / 500 weight / `clamp(1.125rem, 2.25vw, 20.8px)` line height
- **Small**: `clamp(0.75rem, 1.5vw, 14px)` / 500 weight / `clamp(1rem, 2vw, 18.2px)` line height

#### UI Text
- **Button Text**: `clamp(1.125rem, 2.25vw, 24px)` / 500 weight / `clamp(1.5rem, 3vw, 32px)` line height
- **Navigation**: `clamp(0.875rem, 1.75vw, 16px)` / 500 weight / `clamp(1.125rem, 2.25vw, 20.8px)` line height
- **Caption**: `clamp(0.75rem, 1.5vw, 14px)` / 500 weight / `clamp(1rem, 2vw, 18.2px)` line height

#### Project Showcase Text
- **Project Year**: `16px` / 500 weight / `20.8px` line height
- **Project Company**: `18px` / 600 weight / `24px` line height
- **Project Description**: `16px` / 500 weight / `20.8px` line height

## Spacing System

### Base Unit: 4px
- **4px**: 4px (0.25rem)
- **8px**: 8px (0.5rem)
- **12px**: 12px (0.75rem)
- **16px**: 16px (1rem)
- **20px**: 20px (1.25rem)
- **24px**: 24px (1.5rem)
- **32px**: 32px (2rem)
- **44px**: 44px (2.75rem)
- **52px**: 52px (3.25rem)
- **60px**: 60px (3.75rem) - Project year width
- **100px**: 100px (6.25rem)
- **120px**: 120px (7.5rem) - Company button height
- **128px**: 128px (8rem)
- **143px**: 143px (8.94rem)
- **275px**: 275px (17.19rem)
- **1440px**: 1440px (90rem)

### Layout Spacing
- **Container Padding**: 44px (2.75rem)
- **Section Spacing**: 128px (8rem)
- **Component Spacing**: 24px (1.5rem)
- **Text Block Spacing**: 32px (2rem)
- **Project Spacing**: 24px (1.5rem)
- **Worked With Spacing**: 24px (1.5rem)
- **About Spacing**: 64px (4rem)
- **Contact Spacing**: 32px (2rem)

## Component Patterns

### Buttons
- **Height**: 52px (3.25rem)
- **Padding**: 10px horizontal (0.625rem)
- **Border Radius**: 0 (sharp corners)
- **Border**: 1px with 30% white opacity
- **Text**: 24px IBM Plex Mono Medium

### Cards
- **Background**: `#252229` with paper texture overlay
- **Border**: Subtle gray border
- **Padding**: 44px (2.75rem)
- **Shadow**: None (flat design)

### Navigation
- **Header Height**: 100px (6.25rem)
- **Logo**: 24px IBM Plex Mono SemiBold
- **Menu Items**: 16px IBM Plex Mono Medium
- **Active State**: Full opacity white
- **Inactive State**: 50% opacity white

### Project Showcase
- **Entry Height**: 24px padding top/bottom
- **Year Width**: 60px (3.75rem)
- **Company Name**: 18px SemiBold
- **Description**: 16px Medium
- **Learn More Button**: Orange text with animated arrow

### Company Buttons (Worked With)
- **Height**: 120px (7.5rem)
- **Padding**: 24px (1.5rem)
- **Border**: 2px gray border
- **Hover Effect**: Orange border with lift animation

### Social Buttons (Contact)
- **Height**: 120px (7.5rem)
- **Padding**: 24px (1.5rem)
- **GitHub**: Orange border
- **LinkedIn**: Blue border
- **Hover Effect**: Lift animation

### Color Divider
- **Height**: 16px (1rem)
- **Colors**: Blue, Yellow, Green, Red, Pink, Orange
- **Layout**: Equal width blocks

## Layout Grid

### Container
- **Max Width**: 1440px (90rem)
- **Padding**: 44px (2.75rem)
- **Content Width**: 1352px (84.5rem)

### Section-Specific Containers
- **Project Showcase**: 800px max width
- **Worked With**: 600px max width
- **Contact**: 400px max width

### Breakpoints
- **Desktop**: 1440px+
- **Tablet**: 768px - 1439px
- **Mobile**: 320px - 767px

## Responsive Design

### Typography Scaling
- **Hero Text**: 4rem → 8rem → 200px
- **Display Text**: 3rem → 6rem → 140px
- **Title Text**: 1.5rem → 2rem → 32px

### Spacing Scaling
- **Section Spacing**: 64px → 96px → 128px
- **Container Padding**: 16px → 32px → 44px

### Grid Adaptations
- **Worked With**: 3 columns → 2 columns → 1 column
- **About Section**: 2 columns → 1 column
- **Contact Section**: 2 columns → 1 column

## Animation & Interaction

### Hover States
- **Buttons**: Subtle opacity changes
- **Links**: Underline or color transitions
- **Cards**: Subtle scale or shadow effects
- **Company Buttons**: Border color change + lift
- **Social Buttons**: Lift animation

### Transitions
- **Duration**: 200ms - 300ms
- **Easing**: Ease-in-out
- **Properties**: Opacity, transform, color

### Custom Animations
- **Fade In Up**: 600ms ease-out
- **Slide In Left**: 600ms ease-out
- **Slide In Right**: 600ms ease-out

## Accessibility

### Contrast Ratios
- **Primary Text**: 15.6:1 (exceeds AAA)
- **Secondary Text**: 7.8:1 (exceeds AA)
- **Button Text**: 15.6:1 (exceeds AAA)

### Focus States
- **Visible Focus**: High contrast outline
- **Keyboard Navigation**: Full support
- **Screen Reader**: Semantic HTML structure

## Implementation Notes

### Tailwind CSS Classes
This design system is built to work seamlessly with Tailwind CSS. Custom colors, spacing, and typography have been configured to match the design tokens above.

### Responsive Design
- Mobile-first approach
- Flexible grid system
- Adaptive typography scaling using CSS clamp
- Touch-friendly interaction targets

### Performance
- Optimized images and assets
- Minimal JavaScript dependencies
- Efficient CSS delivery
- Progressive enhancement

### CSS Clamp Usage
The typography system uses CSS `clamp()` for fluid scaling:
```css
font-size: clamp(minimum, preferred-value, maximum);
```
This ensures text scales smoothly across all device sizes while maintaining readability.
