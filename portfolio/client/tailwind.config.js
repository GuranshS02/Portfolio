/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,jsx}'],
  theme: {
    extend: {
      fontFamily: {
        serif:  ['"DM Serif Display"', 'Georgia', 'serif'],
        sans:   ['Outfit', 'system-ui', 'sans-serif'],
        mono:   ['"DM Mono"', 'monospace'],
      },
      colors: {
        cream:   '#f5f0e8',
        ink:     '#0f0e0c',
        accent:  '#c8531a',
        accent2: '#1a6bc8',
        muted:   '#6b6660',
        border:  '#e0d9ce',
        card:    '#faf7f2',
      },
      animation: {
        float:      'float 6s ease-in-out infinite',
        'float-slow': 'float 8s ease-in-out infinite',
        pulse2:     'pulse2 2s ease-in-out infinite',
        'slide-up': 'slideUp .6s ease forwards',
        'fade-in':  'fadeIn .5s ease forwards',
        marquee:    'marquee 25s linear infinite',
      },
      keyframes: {
        float:    { '0%,100%': { transform: 'translateY(0)' }, '50%': { transform: 'translateY(-12px)' } },
        pulse2:   { '0%,100%': { opacity: 1 }, '50%': { opacity: .35 } },
        slideUp:  { from: { opacity: 0, transform: 'translateY(32px)' }, to: { opacity: 1, transform: 'translateY(0)' } },
        fadeIn:   { from: { opacity: 0 }, to: { opacity: 1 } },
        marquee:  { '0%': { transform: 'translateX(0)' }, '100%': { transform: 'translateX(-50%)' } },
      },
    },
  },
  plugins: [],
}
