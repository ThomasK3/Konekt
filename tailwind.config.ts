import type { Config } from "tailwindcss";

export default {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        // New Konekt Design System Colors
        bg: {
          primary: '#000000',    // Main canvas
          secondary: '#1a1a1a',  // Elevated surfaces (cards)
          tertiary: '#2a2a2a',   // Borders/dividers
        },
        text: {
          primary: '#ffffff',    // Headings, important content
          secondary: '#9ca3af',  // Body text, descriptions
          tertiary: '#6b7280',   // Metadata, labels
          disabled: '#4b5563',   // Inactive states
        },
        // Archetype Colors
        archetype: {
          builder: '#3b82f6',    // Blue - Tech/Development
          creator: '#ec4899',    // Pink - Design/Creative
          hustler: '#f97316',    // Orange - Business/Growth
          thinker: '#a855f7',    // Purple - Research/Academic
          analyst: '#10b981',    // Green - Data/Strategy
          leader: '#f59e0b',     // Yellow - Management/Leadership
        },
        // Legacy Konekt colors (for gradual migration)
        konekt: {
          green: '#10b981',      // Map to analyst
          pink: '#ec4899',       // Map to creator
          black: '#000000',
          white: '#ffffff',
          cream: '#1a1a1a',      // Map to secondary bg
        },
      },
      spacing: {
        // 4px base unit spacing system
        'xs': '4px',
        'sm': '8px',
        'md': '16px',
        'lg': '24px',
        'xl': '32px',
        '2xl': '48px',
        '3xl': '64px',
        '4xl': '96px',
      },
      borderRadius: {
        'sm': '8px',
        'md': '12px',
        'lg': '16px',
        'xl': '20px',
      },
      boxShadow: {
        'sm': '0 2px 8px rgba(0, 0, 0, 0.2)',
        'md': '0 4px 16px rgba(0, 0, 0, 0.3)',
        'lg': '0 8px 24px rgba(0, 0, 0, 0.4)',
      },
      fontSize: {
        // Typography scale
        'hero': ['56px', { lineHeight: '1.1', letterSpacing: '-0.02em', fontWeight: '700' }],
        'h1': ['48px', { lineHeight: '1.1', letterSpacing: '-0.02em', fontWeight: '700' }],
        'h2': ['36px', { lineHeight: '1.2', fontWeight: '600' }],
        'h3': ['20px', { lineHeight: '1.3', fontWeight: '600' }],
        'body': ['16px', { lineHeight: '1.5', fontWeight: '400' }],
        'small': ['14px', { lineHeight: '1.4', fontWeight: '400' }],
        'xs': ['12px', { lineHeight: '1.4', fontWeight: '400' }],
      },
      transitionDuration: {
        '150': '150ms',
        '200': '200ms',
        '300': '300ms',
        '400': '400ms',
      },
      transitionTimingFunction: {
        'smooth': 'cubic-bezier(0.4, 0, 0.2, 1)',
      },
    },
  },
  plugins: [],
} satisfies Config;
