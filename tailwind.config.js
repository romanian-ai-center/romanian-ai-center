/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./_includes/**/*.{html,njk,js}",
    "./en/**/*.{html,njk,md}",
    "./ro/**/*.{html,njk,md}",
    "./*.{html,njk,md}",
    "./assets/js/**/*.js"
  ],
  theme: {
    extend: {
      fontFamily: {
        'inter': ['Inter', 'sans-serif'],
      },
      colors: {
        'primary': '#6366f1',
        'primary-dark': '#4f46e5',
        'gcp': '#4285f4',
        'aws': '#ff9900',
        'azure': '#0078d4',
      },
      animation: {
        'float': 'float 6s ease-in-out infinite',
        'hero-pulse': 'hero-pulse 2s ease-in-out infinite',
        'gcp-pulse': 'gcp-pulse 2s ease-in-out infinite',
        'glow': 'glow 2s ease-in-out infinite alternate',
        'bounce-custom': 'bounce 2s infinite',
      },
      keyframes: {
        float: {
          '0%, 100%': { transform: 'translateY(0px)' },
          '50%': { transform: 'translateY(-20px)' },
        },
        'hero-pulse': {
          '0%, 100%': { scale: '0.5' },
          '50%': { scale: '1' },
        },
        'gcp-pulse': {
          '0%': { boxShadow: '0 2px 10px rgba(66, 133, 244, 0.3)' },
          '50%': { boxShadow: '0 4px 15px rgba(66, 133, 244, 0.5)' },
          '100%': { boxShadow: '0 2px 10px rgba(66, 133, 244, 0.3)' },
        },
        glow: {
          'from': { boxShadow: '0 4px 15px rgba(66, 133, 244, 0.3)' },
          'to': { boxShadow: '0 6px 20px rgba(66, 133, 244, 0.5)' },
        },
        bounce: {
          '0%, 20%, 50%, 80%, 100%': { transform: 'translateY(0)' },
          '40%': { transform: 'translateY(-10px)' },
          '60%': { transform: 'translateY(-5px)' },
        }
      }
    },
  },
  plugins: [
    require('@tailwindcss/typography'),
  ],
}
