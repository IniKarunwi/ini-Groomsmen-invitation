/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,jsx}'],
  theme: {
    extend: {
      colors: {
        ink: {
          DEFAULT: '#14110F',
          soft: '#1C1815',
          deep: '#0B0908',
        },
        paper: {
          DEFAULT: '#F6F0E4',
          aged: '#E8DFC8',
          shadow: '#D8CDB2',
        },
        gold: {
          DEFAULT: '#B08A2E',
          light: '#D9B65C',
          dim: '#6E5620',
        },
        wax: '#8D2323',
        stamp: '#2E7D32',
      },
      fontFamily: {
        display: ['"Cormorant Garamond"', 'Georgia', 'serif'],
        slab: ['"Roboto Slab"', '"Cormorant Garamond"', 'Georgia', 'serif'],
        body: ['Inter', '"Source Sans Pro"', 'system-ui', 'sans-serif'],
        mono: ['"JetBrains Mono"', 'ui-monospace', 'monospace'],
      },
      letterSpacing: {
        editorial: '0.18em',
        wide2: '0.3em',
      },
      maxWidth: {
        reading: '34rem',
        broadsheet: '82rem',
      },
      boxShadow: {
        press: 'inset 0 2px 6px rgba(0,0,0,0.45)',
        // Named "sheet", not "paper": a `shadow-paper` utility would collide
        // with the `paper` colour and be resolved as a shadow *colour*,
        // painting the shadow itself #F6F0E4.
        sheet:
          '0 1px 2px rgba(0,0,0,0.25), 0 18px 40px -12px rgba(0,0,0,0.55), 0 40px 90px -30px rgba(0,0,0,0.7)',
        goldGlow: '0 0 0 1px rgba(176,138,46,0.6), 0 0 26px -4px rgba(176,138,46,0.45)',
      },
      transitionTimingFunction: {
        cinematic: 'cubic-bezier(0.4, 0, 0.2, 1)',
      },
    },
  },
  plugins: [],
}
