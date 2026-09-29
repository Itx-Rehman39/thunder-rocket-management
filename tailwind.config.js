/** @type {import('tailwindcss').Config} */
module.exports = {
  darkMode: ['class'],
  content: [
    './src/pages/**/*.{js,ts,jsx,tsx,mdx}',
    './src/components/**/*.{js,ts,jsx,tsx,mdx}',
    './src/app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      colors: {
        rocket: {
          navy: '#0B222E',
          'navy-dark': '#06161F',
          'navy-surface': '#0F2C3A',
          'navy-card': '#13384A',
          teal: '#0A9396',
          'teal-dark': '#005F73',
          'teal-deep': '#043440',
          aqua: '#00B4D8',
          'aqua-glow': '#00DF82',
          cyan: '#06B6D4',
          'cyan-light': '#67E8F9',
          ice: '#E0F7FA',
          'ice-soft': '#F0FDFA',
          maroon: '#881337',
          'maroon-dark': '#700F2B',
          'maroon-accent': '#9F1239',
          'maroon-light': '#BE123C',
          gold: '#F59E0B',
          surface: '#F8FCFD',
          border: '#D4EBF0',
          'border-dark': '#1E465A',
        },
      },
      fontFamily: {
        athletic: ['var(--font-heading)', 'Impact', 'Teko', 'sans-serif'],
        sans: ['var(--font-sans)', 'Inter', 'system-ui', 'sans-serif'],
      },
      backgroundImage: {
        'camo-pattern': "radial-gradient(ellipse at 20% 20%, rgba(0, 180, 216, 0.15) 0%, transparent 50%), radial-gradient(ellipse at 80% 80%, rgba(10, 147, 150, 0.18) 0%, transparent 60%)",
        'jersey-gradient': "linear-gradient(135deg, #06161F 0%, #0B222E 50%, #0A9396 100%)",
        'brush-gradient': "linear-gradient(90deg, #00B4D8 0%, #0A9396 50%, #0B222E 100%)",
      },
      boxShadow: {
        'glow-teal': '0 0 25px -5px rgba(0, 180, 216, 0.4)',
        'glow-maroon': '0 0 20px -3px rgba(159, 18, 57, 0.45)',
        'card-soft': '0 4px 20px -2px rgba(11, 34, 46, 0.08)',
        'card-dark': '0 8px 30px -4px rgba(6, 22, 31, 0.5)',
      },
      animation: {
        'pulse-slow': 'pulse 3s cubic-bezier(0.4, 0, 0.6, 1) infinite',
        'float': 'float 4s ease-in-out infinite',
      },
      keyframes: {
        float: {
          '0%, 100%': { transform: 'translateY(0px)' },
          '50%': { transform: 'translateY(-8px)' },
        },
      },
    },
  },
  plugins: [],
}
