/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        void: '#070709',
        base: '#0D0D12',
        surface: '#13131A',
        elevated: '#1A1A24',
        overlay: '#22222F',
        primary: {
          DEFAULT: '#FFAD00',
          50: '#FFF8E7',
          100: '#FFEFC4',
          200: '#FFD97A',
          300: '#FFC340',
          400: '#FFAD00',
          500: '#E69900',
          600: '#CC8800',
          700: '#995C00',
        },
        plasma: {
          DEFAULT: '#00C8E0',
          300: '#00E8FF',
          400: '#00C8E0',
          500: '#00A8C0',
          600: '#0088A0',
        },
        void_purple: {
          DEFAULT: '#A855F7',
          300: '#C084FC',
          400: '#A855F7',
          500: '#9333EA',
          600: '#7C3AED',
        },
      },
      backgroundImage: {
        'gradient-primary': 'linear-gradient(135deg, #FFAD00 0%, #FF6B00 100%)',
        'gradient-secondary': 'linear-gradient(135deg, #00C8E0 0%, #0088A0 100%)',
        'gradient-accent': 'linear-gradient(135deg, #A855F7 0%, #7C3AED 100%)',
        'gradient-mesh': 'radial-gradient(at 20% 50%, rgba(255,173,0,0.05) 0px, transparent 50%), radial-gradient(at 80% 20%, rgba(0,200,224,0.05) 0px, transparent 50%)',
        'noise': "url(\"data:image/svg+xml,%3Csvg viewBox='0 0 200 200' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noise'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.65' numOctaves='3' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noise)'/%3E%3C/svg%3E\")",
      },
      fontFamily: {
        display: ['Rajdhani', 'sans-serif'],
        body: ['Outfit', 'sans-serif'],
        mono: ['JetBrains Mono', 'monospace'],
      },
      boxShadow: {
        'primary': '0 0 20px rgba(255,173,0,0.25), 0 4px 12px rgba(0,0,0,0.4)',
        'secondary': '0 0 20px rgba(0,200,224,0.20), 0 4px 12px rgba(0,0,0,0.4)',
        'accent': '0 0 20px rgba(168,85,247,0.22), 0 4px 12px rgba(0,0,0,0.4)',
        'glow-sm': '0 0 10px rgba(255,173,0,0.30)',
        'glow-md': '0 0 20px rgba(255,173,0,0.30)',
        'glow-lg': '0 0 40px rgba(255,173,0,0.25)',
        'inner-glow': 'inset 0 0 30px rgba(255,173,0,0.08)',
        'card': '0 4px 16px rgba(0,0,0,0.5)',
        'modal': '0 24px 64px rgba(0,0,0,0.8)',
      },
      borderRadius: {
        sm: '4px',
        md: '8px',
        lg: '12px',
        xl: '16px',
        '2xl': '20px',
        '3xl': '24px',
      },
      keyframes: {
        shine: {
          '0%': { transform: 'translateX(-100%)' },
          '100%': { transform: 'translateX(200%)' },
        }
      },
      animation: {
        'shine': 'shine 2s ease-in-out infinite',
      }
    },
  },
  plugins: [],
}
