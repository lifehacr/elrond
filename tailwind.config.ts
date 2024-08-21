import type { Config } from 'tailwindcss'

const config: Config = {
  darkMode: 'class',
  content: [
    './src/pages/**/*.{js,ts,jsx,tsx,mdx}',
    './src/components/**/*.{js,ts,jsx,tsx,mdx}',
    './src/app/**/*.{js,ts,jsx,tsx,mdx}',
    './src/blocks/**/*.{js,ts,jsx,tsx,mdx}',
    './src/payload/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      animation: {
        'grayscale-pulse': 'grayscale-pulse 3s ease-in-out forwards',
      },
      keyframes: {
        'grayscale-pulse': {
          '0%': { filter: 'grayscale(0%)' },
          '100%': { filter: 'grayscale(100%)' },
        },
      },
    },
  },
  daisyui: {
    themes: [
      {
        myLightTheme: {
          primary: '#7248E6',
          secondary: '#F4F4F5',
          'base-content': '#18181B',
          'neutral-content': '#52525B',
          'base-100': '#FAFAFA',
          info: '#0000ff',
          success: '#00ff00',
          warning: '#FFDEBE',
          error: '#E56000',
          'secondary-content': '#71717A',
        },
      },
    ],
  },
  plugins: [require('@tailwindcss/typography'), require('daisyui')],
}

export default config
