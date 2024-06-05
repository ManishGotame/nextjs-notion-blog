import { emerald, amber, violet, neutral } from 'tailwindcss/colors'

/** @type {import('tailwindcss').Config} */
export const content = [
  './app/**/*.{js,ts,jsx,tsx,mdx}', // Note the addition of the `app` directory.
  './pages/**/*.{js,ts,jsx,tsx,mdx}',
  './components/**/*.{js,ts,jsx,tsx,mdx}',

  // Or if using `src` directory:
  './src/**/*.{js,ts,jsx,tsx,mdx}',
]
export const theme = {
  extend: {
    colors: {
      white: '#fff',
      green: emerald,
      yellow: amber,
      purple: violet,
      gray: neutral,
      'gray-150': '#EEEFF2',
      'gray-1000': '#050505',
      black: '#050505',
      'design-details': '#458886',
      'design-details-light': '#EEF3F3',
      'design-details-dark': '#273F3F',
      'hacker-news': '#FF965A',
      twitter: '#479BEA',
      current: 'currentColor',
    },
  },
}
export const plugins = []