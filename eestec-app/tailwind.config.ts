import type { Config } from 'tailwindcss'

const config: Config = {
  content: [
    './pages/**/*.{js,ts,jsx,tsx,mdx}',
    './components/**/*.{js,ts,jsx,tsx,mdx}',
    './app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      colors: {
        'eestec-red': '#e52a30',
        'eestec-dark': '#1a1a1a',
      },
      fontFamily: {
        'sf-pro': ['"Google Sans Flex"', 'Roboto', 'sans-serif'],
      },
    },
  },
  plugins: [],
}
export default config
