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
          bg: '#0e1a2b',
          text: '#e2eaf4',
          muted: 'rgba(226,234,244,0.45)',
          subtle: 'rgba(226,234,244,0.3)',
        },
        brand: {
          blue: '#0057ff',
          mint: '#00f0a0',
          'blue-soft': '#6fa3ff',
        },
        surface: {
          card: 'rgba(226,234,244,0.03)',
          hover: 'rgba(226,234,244,0.06)',
          input: 'rgba(226,234,244,0.04)',
        },
        border: {
          DEFAULT: 'rgba(226,234,244,0.07)',
          subtle: 'rgba(226,234,244,0.08)',
          hover: 'rgba(0,87,255,0.4)',
          focus: 'rgba(0,87,255,0.6)',
          input: 'rgba(226,234,244,0.1)',
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
