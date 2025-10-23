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
          dark: '#0B1C26',
          DEFAULT: '#23587A',
          light: '#E3EEF5'
        },
        accent: '#FF7E6B',
        muted: '#6B7280'
      },
      fontFamily: {
        display: ['"DM Sans"', 'ui-sans-serif', 'system-ui'],
        body: ['"Inter"', 'ui-sans-serif', 'system-ui']
      },
      boxShadow: {
        soft: '0 20px 45px -25px rgba(15, 37, 55, 0.35)'
      }
    }
  },
  plugins: [require('@tailwindcss/typography'), require('@tailwindcss/forms')]
};

export default config;
