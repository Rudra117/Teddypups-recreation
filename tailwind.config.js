/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        cream: {
          50: '#FFFDF9',
          100: '#FAF6F0',
          200: '#F5EFEB',
          300: '#EAE1D9',
          400: '#D6C8BC',
        },
        espresso: {
          900: '#1D130E',
          800: '#2D1E18',
          700: '#3D2A22',
          600: '#5C4033',
          500: '#7C5B4C',
          400: '#9B7A6A',
        },
        terracotta: {
          DEFAULT: '#D95D39',
          dark: '#B84624',
          light: '#E87A5B',
          soft: '#F6DDD6',
        },
        honey: {
          DEFAULT: '#E5A93B',
          light: '#F8D489',
          soft: '#FCE2B8',
        },
        whatsapp: {
          DEFAULT: '#25D366',
          dark: '#1EBE5D',
          hover: '#20BA5A',
        },
        cocoa: '#2A170E',
        milk: '#FFFDF8',
        toffee: '#C2622B',
      },
      fontFamily: {
        serif: ['"Fraunces"', '"Playfair Display"', 'Georgia', 'serif'],
        plush: ['"Fraunces"', 'serif'],
        sans: ['"Figtree"', '"Plus Jakarta Sans"', 'Inter', 'system-ui', 'sans-serif'],
        handwriting: ['"Shantell Sans"', '"Caveat"', 'cursive'],
        scrawl: ['"Shantell Sans"', '"Caveat"', 'cursive'],
      },
      borderRadius: {
        'arch': '120px 120px 24px 24px',
        'card': '20px',
        'ticket': '16px',
      },
      boxShadow: {
        'paper': '0 4px 20px -2px rgba(45, 30, 24, 0.08)',
        'polaroid': '0 6px 24px rgba(45, 30, 24, 0.12)',
      },
    },
  },
  plugins: [],
};
