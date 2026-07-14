/** @type {import('tailwindcss').Config} */
const withMT = require('@material-tailwind/react/utils/withMT');
const {createThemes} = require('tw-colors');

module.exports = withMT({
  content: [
    './app/**/*.{js,jsx,ts,tsx}',
    './components/**/*.{js,jsx,ts,tsx}',
    './content/**/*.mdx',
  ],
  theme: {
    colors: {
      transparent: 'transparent',
      current: 'currentColor',
      'white': '#ffffff',
      'tahiti': {
        DEFAULT: '#06b6d4',
        100: '#cffafe',
        200: '#a5f3fc',
        300: '#67e8f9',
        400: '#22d3ee',
        500: '#06b6d4',
        600: '#0891b2',
        700: '#0e7490',
        800: '#155e75',
        900: '#164e63',
      },
      'zinc': {
        DEFAULT: '#71717a',
        50: '#fafafa',
        100: '#f4f4f5',
        200: '#e4e4e7',
        300: '#d4d4d8',
        400: '#a1a1aa',
        500: '#71717a',
        600: '#52525b',
        700: '#3f3f46',
        800: '#27272a',
        900: '#18181b',
        950: '#09090b',
      },
      'stone': {
        DEFAULT: '#78716c',
        50: '#fafaf9',
        100: '#f5f5f4',
        200: '#e7e5e4',
        300: '#d6d3d1',
        400: '#a8a29e',
        500: '#78716c',
        600: '#57534e',
        700: '#44403c',
        800: '#292524',
        900: '#1c1917',
        950: '#0c0a09',
      },
      'slate': {
        DEFAULT: '#64748b',
        50: '#f8fafc',
        100: '#f1f5f9',
        200: '#e2e8f0',
        300: '#cbd5e1',
        400: '#94a3b8',
        500: '#64748b',
        600: '#475569',
        700: '#334155',
        800: '#1e293b',
        900: '#0f172a',
        950: '#020617',
      },
      'gray': {
        DEFAULT: '#6b7280',
        50: '#f9fafb',
        100: '#f3f4f6',
        200: '#e5e7eb',
        300: '#d1d5db',
        400: '#9ca3af',
        500: '#6b7280',
        600: '#4b5563',
        700: '#374151',
        800: '#1f2937',
        900: '#111827',
        950: '#030712',
      },
      'red': {
        DEFAULT: '#ef4444',
        50: '#fef2f2',
        100: '#fee2e2',
        200: '#fecaca',
        300: '#fca5a5',
        400: '#f87171',
        500: '#ef4444',
        600: '#dc2626',
        700: '#b91c1c',
        800: '#991b1b',
        900: '#7f1d1d',
        950: '#450a0a',
      },
      'orange': {
        DEFAULT: '#f97316',
        50: '#fff7ed',
        100: '#ffedd5',
        200: '#fed7aa',
        300: '#fdba74',
        400: '#fb923c',
        500: '#f97316',
        600: '#ea580c',
        700: '#c2410c',
        800: '#9a3412',
        900: '#7c2d12',
        950: '#431407',
      },
      'lime': {
        DEFAULT: '#84cc16',
        50: '#f7fee7',
        100: '#ecfccb',
        200: '#d9f99d',
        300: '#bef264',
        400: '#a3e635',
        500: '#84cc16',
        600: '#65a30d',
        700: '#4d7c0f',
        800: '#3f6212',
        900: '#365314',
        950: '#1a2e05',
      },
      'cyan': {
        DEFAULT: '#06b6d4',
        50: '#ecfeff',
        100: '#cffafe',
        200: '#a5f3fc',
        300: '#67e8f9',
        400: '#22d3ee',
        500: '#06b6d4',
        600: '#0891b2',
        700: '#0e7490',
        800: '#155e75',
        900: '#164e63',
        950: '#083344',
      },
      'violet': {
        DEFAULT: '#8b5cf6',
        50: '#f5f3ff',
        100: '#ede9fe',
        200: '#ddd6fe',
        300: '#c4b5fd',
        400: '#a78bfa',
        500: '#8b5cf6',
        600: '#7c3aed',
        700: '#6d28d9',
        800: '#5b21b6',
        900: '#4c1d95',
        950: '#2e1065',
      },
      'purple': {
        DEFAULT: '#a855f7',
        50: '#faf5ff',
        100: '#f3e8ff',
        200: '#e9d5ff',
        300: '#d8b4fe',
        400: '#c084fc',
        500: '#a855f7',
        600: '#9333ea',
        700: '#7e22ce',
        800: '#6b21a8',
        900: '#581c87',
        950: '#3b0764',
      },
      'rose': {
        DEFAULT: '#f43f5e',
        50: '#fff1f2',
        100: '#ffe4e6',
        200: '#fecdd3',
        300: '#fda4af',
        400: '#fb7185',
        500: '#f43f5e',
        600: '#e11d48',
        700: '#be123c',
        800: '#9f1239',
        900: '#881337',
        950: '#4c0519',
      },
      // HUD hot-rod red alert accent.
      'alert': {
        DEFAULT: '#DA0037',
        50: '#ffe5ec',
        100: '#ffb3c6',
        200: '#ff6690',
        300: '#ff3369',
        400: '#ef4444',
        500: '#DA0037',
        600: '#b3002d',
        700: '#8a0023',
        800: '#61001a',
        900: '#3d0010',
      },
      // HUD subtle gold highlight.
      'gold': {
        DEFAULT: '#FFB000',
        50: '#fff8e6',
        100: '#ffedb3',
        200: '#ffdd70',
        300: '#ffcb33',
        400: '#ffbf14',
        500: '#FFB000',
        600: '#cc8d00',
        700: '#996a00',
        800: '#664700',
        900: '#332400',
      },
    },
    extend: {
      colors: {
        // Semantic HUD aliases (resolve to CSS variables defined in globals.css so
        // they follow the active light/dark theme). Usable as e.g. `text-hud-cyan`.
        hud: {
          cyan: 'rgb(var(--hud-cyan) / <alpha-value>)',
          red: 'rgb(var(--hud-red) / <alpha-value>)',
          gold: 'rgb(var(--hud-gold) / <alpha-value>)',
        },
      },
      boxShadow: {
        card: '0px 35px 120px -15px #211e35',
        // HUD interactive / focus glows.
        'glow-cyan': '0 0 4px rgb(var(--hud-cyan) / 0.7), 0 0 16px rgb(var(--hud-cyan) / 0.45)',
        'glow-cyan-lg': '0 0 6px rgb(var(--hud-cyan) / 0.8), 0 0 28px rgb(var(--hud-cyan) / 0.5)',
        'glow-red': '0 0 4px rgb(var(--hud-red) / 0.7), 0 0 16px rgb(var(--hud-red) / 0.45)',
        'glow-gold': '0 0 4px rgb(var(--hud-gold) / 0.7), 0 0 16px rgb(var(--hud-gold) / 0.45)',
      },
      screens: {
        xs: '450px',
      },
      fontFamily: {
        // Wired to CSS variables from lib/fonts.ts (with safe web-safe fallbacks
        // so styling still resolves in tests / before fonts load).
        sans: ['var(--font-sans)', 'raleway', 'sans-serif'],
        display: ['var(--font-display)', 'Rajdhani', 'sans-serif'],
        'display-alt': ['var(--font-display-alt)', 'Orbitron', 'sans-serif'],
        mono: ['var(--font-mono)', 'ui-monospace', 'monospace'],
      },
      keyframes: {
        'hud-scan': {
          '0%': { transform: 'translateY(-100%)' },
          '100%': { transform: 'translateY(100%)' },
        },
        'hud-spin': {
          '0%': { transform: 'rotate(0deg)' },
          '100%': { transform: 'rotate(360deg)' },
        },
        'hud-pulse': {
          '0%, 100%': { opacity: '0.6' },
          '50%': { opacity: '1' },
        },
      },
      animation: {
        'hud-scan': 'hud-scan 3.5s linear infinite',
        'hud-spin': 'hud-spin 12s linear infinite',
        'hud-pulse': 'hud-pulse 2.4s ease-in-out infinite',
      },
    },
  },
  darkMode: 'class',
  plugins: [
    createThemes({
      // HUD palette. NOTE: the page-background token is named `page` (not `base`)
      // to avoid colliding with Tailwind's `text-base` font-size utility.
      light: {
        page: '#F2F7FA', // cyan-tinted near-white
        text: '#0A0E14',
        primary: '#06b6d4', // arc-reactor cyan (darker for AA contrast on light)
        secondary: '#DA0037', // hot-rod red alert
        neutral: '#E4EEF3', // surface
        neutral2: '#D8E6EC',
      },
      dark: {
        page: '#05070A', // near-black
        text: '#E5F6FF', // cyan-tinted near-white
        primary: '#22d3ee', // arc-reactor cyan
        secondary: '#DA0037', // hot-rod red alert
        neutral: '#0B0F14', // surface
        neutral2: '#10161D',
      },
    }),
  ],
});
