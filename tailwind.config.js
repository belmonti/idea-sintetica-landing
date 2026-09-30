/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        'bg-deep': '#05070c',
        'bg-surface': '#090d15',
        'bg-elevated': '#0f1523',
        'accent-teal': '#00f5c4',
        'accent-teal-dark': '#00c79f',
        'accent-lime': '#b4ff39',
        'accent-cyan': '#06b6d4',
        'accent-blue': '#3b82f6',
      },
      fontFamily: {
        sans: ['"Plus Jakarta Sans"', 'system-ui', 'sans-serif'],
        mono: ['"JetBrains Mono"', 'monospace'],
      },
    },
  },
  plugins: [],
};
