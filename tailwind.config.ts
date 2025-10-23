import type { Config } from 'tailwindcss';

const config: Config = {
  content: [
    './app/**/*.{ts,tsx}',
    './components/**/*.{ts,tsx}',
    './data/**/*.{ts,tsx}'
  ],
  theme: {
    extend: {
      colors: {
        brand: {
          dark: '#0A101A',
          DEFAULT: '#1F2A3D',
          light: '#E7ECF8'
        },
        accent: '#7C5CFF',
        muted: '#7B8794'
      },
      fontFamily: {
        display: ['"DM Sans"', 'ui-sans-serif', 'system-ui'],
        body: ['"Inter"', 'ui-sans-serif', 'system-ui']
      },
      boxShadow: {
        soft: '0 35px 80px -40px rgba(8, 19, 36, 0.55)',
        glow: '0 25px 65px -30px rgba(124, 92, 255, 0.45)'
      },
      backgroundImage: {
        'glimmer': 'radial-gradient(circle at top left, rgba(124, 92, 255, 0.22), transparent 55%), radial-gradient(circle at bottom right, rgba(29, 229, 215, 0.18), transparent 65%)',
        'grid-soft':
          'linear-gradient(rgba(32, 45, 70, 0.08) 1px, transparent 1px), linear-gradient(90deg, rgba(32, 45, 70, 0.08) 1px, transparent 1px)'
      }
    }
  },
  plugins: [require('@tailwindcss/typography'), require('@tailwindcss/forms')]
};

export default config;
