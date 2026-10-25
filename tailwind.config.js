/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.{html,js,ts,njk,md}",
    "./_site/**/*.html"
  ],
  theme: {
    extend: {
      colors: {
        'background': {
          primary: '#242128',
        },
        'text': {
          primary: '#ffffff',
          secondary: 'rgba(255, 255, 255, 0.5)',
        },
      },
      fontFamily: {
        'mono': ['IBM Plex Mono', 'ui-monospace', 'SFMono-Regular', 'Menlo', 'monospace'],
      },
    },
  },
  plugins: [],
}
