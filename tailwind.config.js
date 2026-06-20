/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './pages/**/*.{js,jsx}',
    './components/**/*.{js,jsx}',
  ],
  theme: {
    extend: {
      colors: {
        base: {
          bg: '#070b11',
          text: '#eef2f7',
          muted: 'rgba(238,242,247,0.56)',
          subtle: 'rgba(238,242,247,0.34)',
        },
        brand: {
          blue: '#ffc62e',
          mint: '#ffc62e',
          'blue-soft': '#ffe39a',
          amber: '#ffc62e',
          smoke: '#aab2c0',
        },
        surface: {
          card: 'rgba(255,255,255,0.035)',
          hover: 'rgba(255,255,255,0.07)',
          input: 'rgba(255,255,255,0.045)',
        },
        border: {
          DEFAULT: 'rgba(238,242,247,0.09)',
          subtle: 'rgba(238,242,247,0.12)',
          hover: 'rgba(255,198,46,0.42)',
          focus: 'rgba(255,198,46,0.58)',
          input: 'rgba(238,242,247,0.13)',
        },
        badge: {
          'chat-bg': 'rgba(0,87,255,0.15)',
          'chat-text': '#6fa3ff',
          'voz-bg': 'rgba(0,240,160,0.1)',
          'voz-text': '#00f0a0',
          'auto-bg': 'rgba(240,183,77,0.1)',
          'auto-text': '#f0b74d',
          'integ-bg': 'rgba(208,138,240,0.1)',
          'integ-text': '#d08af0',
        },
      },
      fontFamily: {
        serif: ['var(--font-instrument)', 'Georgia', 'serif'],
        sans: ['var(--font-dm)', 'system-ui', 'sans-serif'],
      },
      fontSize: {
        'display-xl': ['54px', { lineHeight: '1.1', fontWeight: '400' }],
        'display-lg': ['44px', { lineHeight: '1.15', fontWeight: '400' }],
        'display-md': ['34px', { lineHeight: '1.2', fontWeight: '400' }],
        'display-sm': ['28px', { lineHeight: '1.25', fontWeight: '400' }],
        'body-lg': ['16px', { lineHeight: '1.6', fontWeight: '300' }],
        'body': ['14px', { lineHeight: '1.6', fontWeight: '400' }],
        'body-sm': ['13px', { lineHeight: '1.5', fontWeight: '400' }],
        'label': ['11px', { lineHeight: '1.3', fontWeight: '500', letterSpacing: '0.08em' }],
      },
      animation: {
        'fade-in': 'fadeIn 0.5s ease-out',
        'slide-up': 'slideUp 0.5s ease-out',
      },
      keyframes: {
        fadeIn: {
          '0%': { opacity: '0' },
          '100%': { opacity: '1' },
        },
        slideUp: {
          '0%': { opacity: '0', transform: 'translateY(12px)' },
          '100%': { opacity: '1', transform: 'translateY(0)' },
        },
      },
    },
  },
  plugins: [],
};
