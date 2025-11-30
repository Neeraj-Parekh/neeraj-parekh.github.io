import type { Config } from 'tailwindcss'

const config: Config = {
  content: [
    './pages/**/*.{js,ts,jsx,tsx,mdx}',
    './components/**/*.{js,ts,jsx,tsx,mdx}',
    './app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  darkMode: 'class',
  theme: {
    extend: {
      colors: {
        light: {
          bg: '#fafafa',
          text: '#333',
        },
        dark: {
          bg: '#171818',
          text: '#d7d3cc',
        },
        sepia: {
          bg: '#FBF0D9',
          text: '#5F4B32',
        },
        accent: '#abbaab',
        'light-accent': '#ccc',
        'text-title': '#111',
        'text-hover': '#000',
        'blue-accent': '#2980b9',
      },
      fontFamily: {
        // Apple-style fonts
        sans: ['var(--font-sans)', '-apple-system', 'BlinkMacSystemFont', 'SF Pro Text', 'SF Pro Display', 'Helvetica Neue', 'Arial', 'sans-serif'],
        serif: ['var(--font-serif)', 'New York', 'Georgia', 'Cambria', 'Times New Roman', 'Times', 'serif'],
        // Legacy fonts
        poppins: ['Poppins', 'Helvetica', 'Arial', 'sans-serif'],
        'roboto-mono': ['Roboto Mono', 'SF Mono', 'Monaco', 'Inconsolata', 'monospace'],
        nunito: ['Nunito', 'sans-serif'],
        'josefin': ['Josefin Sans', 'sans-serif'],
        'abril': ['Abril Fatface', 'cursive'],
      },
      animation: {
        'name-slide': 'nameSlide 1.7s ease-out',
        'slogan-slide': 'sloganSlide 1.2s ease-in-out',
        'menu-slide': 'menuSlide 0.8s ease-out',
        'fade-in': 'fadeIn 1s ease-in forwards',
        'rotate-icon': 'rotateIcon 1.5s linear',
        'rotate-text': 'rotateText 4s ease-in-out infinite',
      },
      keyframes: {
        nameSlide: {
          '0%': { transform: 'translateY(-100px)', opacity: '0' },
          '100%': { transform: 'translateY(0)', opacity: '1' },
        },
        sloganSlide: {
          '0%': { transform: 'translateY(100px)', opacity: '0' },
          '100%': { transform: 'translateY(0)', opacity: '1' },
        },
        menuSlide: {
          '0%': { transform: 'translateX(-100px)', opacity: '0' },
          '100%': { transform: 'translateX(0)', opacity: '1' },
        },
        fadeIn: {
          '0%': { transform: 'translateY(-100px)', opacity: '0' },
          '100%': { transform: 'translateY(0)', opacity: '1' },
        },
        rotateIcon: {
          '0%': { transform: 'rotate(0deg)' },
          '100%': { transform: 'rotate(360deg)' },
        },
        rotateText: {
          '0%, 100%': { opacity: '0', transform: 'rotateX(90deg)' },
          '10%, 90%': { opacity: '1', transform: 'rotateX(0deg)' },
        },
      },
      boxShadow: {
        'button': '5px 5px 0px 2px var(--tw-shadow-color)',
        'button-hover': '0px 0px 0px 0px',
        'card': '0px 0px 0px 5px var(--tw-shadow-color), 15px 15px 0px 5px var(--tw-shadow-color)',
        'card-hover': '0px 0px 0px 5px, 0px 0px 0px 5px',
      },
    },
  },
  plugins: [],
}

export default config
