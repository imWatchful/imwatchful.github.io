/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx,mdx}'],
  theme: {
    extend: {
      fontFamily: {
        mono: ['"JetBrains Mono"', 'monospace'],
      },
      spacing: {
        'line': 'var(--line-height)',
        'line-half': 'calc(var(--line-height) / 2)',
        'line-2': 'calc(var(--line-height) * 2)',
      },
    },
  },
  plugins: [],
}
