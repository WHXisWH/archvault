/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './pages/**/*.{js,ts,jsx,tsx,mdx}',
    './components/**/*.{js,ts,jsx,tsx,mdx}',
    './app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      colors: {
        background: '#F8F9FA', // Paper White
        surface: '#FFFFFF',    // Pure White
        primary: {
          DEFAULT: '#3B82F6', // Blueprint Blue
          hover: '#2563EB',
        },
        accent: {
          DEFAULT: '#F97316', // Safety Orange
          hover: '#EA580C',
        },
        text: {
          DEFAULT: '#1F2937', // Graphite Black
          muted: '#6B7280',   // Concrete Gray
        },
        border: '#E5E7EB', // Lighter border for subtlety
      },
      animation: {
        'fade-in': 'fadeIn 0.5s ease-in-out',
        'slide-up': 'slideUp 0.3s ease-out',
      },
      keyframes: {
        fadeIn: {
          '0%': { opacity: '0' },
          '100%': { opacity: '1' },
        },
        slideUp: {
          '0%': { transform: 'translateY(10px)', opacity: '0' },
          '100%': { transform: 'translateY(0)', opacity: '1' },
        },
      },
    },
  },
  plugins: [],
}