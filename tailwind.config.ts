import type { Config } from 'tailwindcss'

const config: Config = {
  darkMode: ['class'],
  content: [
    './src/pages/**/*.{js,ts,jsx,tsx,mdx}',
    './src/components/**/*.{js,ts,jsx,tsx,mdx}',
    './src/app/**/*.{js,ts,jsx,tsx,mdx}',
    './src/blocks/**/*.{js,ts,jsx,tsx,mdx}',
    './src/payload/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    container: {
      center: true,
      padding: '2rem',
      screens: {
        '2xl': '1400px',
      },
    },

    extend: {
      colors: {
        primary: '#7248E6',
        'primary-focus': '#8C5DB9',
        'primary-content': '#FFFFFF',

        secondary: '#F4F4F5',
        'secondary-focus': '#B95DA3',
        'secondary-content': '#71717A',

        accent: '#d99330',
        'accent-focus': '#b57721',
        'accent-content': '#ffffff',

        neutral: '#110e0e',
        'neutral-focus': '#060404',
        'neutral-content': '#52525B',

        'base-100': '#FAFAFA',
        'base-content': '#18181B',

        info: '#0000ff',
        success: '#00ff00',
        warning: '#FFDEBE',
        error: '#E56000',
      },
      borderRadius: {
        'rounded-box': '1rem',
        'rounded-btn': '.2rem',
        'rounded-badge': '1.9rem',
      },
    },
  },
  prefix: '',
  plugins: [require('tailwindcss-animate'), require('@tailwindcss/typography')],
}

export default config
