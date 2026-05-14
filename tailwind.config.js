/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      fontFamily: {
        // simhatel.com type pairing — Outfit (display) + Inter (body)
        display: ['Outfit', 'Inter', 'system-ui', 'sans-serif'],
        body:    ['Inter', 'system-ui', 'sans-serif'],
      },
      colors: {
        // Material-inspired Low-Light palette
        surface: {
          DEFAULT: '#131314',
          dim: '#131314',
          bright: '#3a393a',
          tint: '#00dce5',
          container: {
            lowest: '#0e0e0f',
            low: '#1c1b1c',
            DEFAULT: '#201f20',
            high: '#2a2a2b',
            highest: '#353436'
          }
        },
        primary: {
          DEFAULT: '#e9feff',
          container: '#00f5ff',
          fixed: '#63f7ff',
          'fixed-dim': '#00dce5'
        },
        secondary: {
          DEFAULT: '#b9c8de',
          container: '#39485a'
        },
        text: {
          primary: '#e5e2e3',
          muted: '#94a3b8',
          onPrimary: '#003739'
        },
        outline: {
          DEFAULT: '#849495',
          variant: '#3a494a'
        }
      },
      borderRadius: {
        'xl': '40px',
        'full': '999px',
        // Asymmetric "Leaf" style border radiuses usually applied via inline styles or custom css,
        // but we can add it here if it's reused.
        'leaf': '40px 120px 40px 40px',
      },
      backgroundImage: {
        'gradient-glass': 'linear-gradient(180deg, rgba(233,254,255,0.15) 0%, rgba(0,245,255,0) 100%)',
      },
      backdropBlur: {
        'glass': '12px',
      },
      animation: {
        'ambient-pulse': 'ambientPulse 8s ease-in-out infinite',
      },
      keyframes: {
        ambientPulse: {
          '0%, 100%': { transform: 'scale(1)', opacity: '0.04' },
          '50%': { transform: 'scale(1.1)', opacity: '0.08' },
        }
      }
    },
  },
  plugins: [],
}
