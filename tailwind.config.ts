import type { Config } from 'tailwindcss';

const config: Config = {
  darkMode: ['class'],
  content: [
    './src/pages/**/*.{js,ts,jsx,tsx,mdx}',
    './src/components/**/*.{js,ts,jsx,tsx,mdx}',
    './src/app/**/*.{js,ts,jsx,tsx,mdx}'
  ],
  theme: {
    extend: {
      fontSize: {
        '42': '2.625rem',
        xxs: '8px'
      },
      screens: {
        '1160': '1160px',
        '1232': '1232px',
        xxl: '1440px'
      },
      width: {
        '1160': '1160px',
        '1232': '1232px',
        xxl: '1440px'
      },
      colors: {
        primary: '#3D3D3D',
        primary_400: ' #3D3D3D',
        primary_500: ' #3D3D3D',
        light: '#858585',
        secondary: '#3B006B',
        secondary_400: '#32005B',
        secondary_600: '#123714',
        background: '#F9FAFB',
        sidebar_bg: '#ffffff',
        dashboard_bg: '#F6F6F6',
        authSidebar_bg: '#EEF6EF',
        sidebar_text: '#4A4A4A',
        muted: '#6B7280',
        accent: '#FFB800',
        white: '#FFFFFF',
        main: '#91755D',
        grey: {
          '200': '#E4E7EC',
          '300': '#E3E3E4',
          '400': '#98A2B3',
          '500': '#667185',
          '600': '#475367',
          '700': '#FAF7F7',
          '900': '#101928'
        },
        success: '#099137',
        danger: '#B42318',
        warning: '#F5b546',
        badge_success: '#ECFDF3',
        badge_danger: '#FEF3F2',
        badge_warning: '#FEF6E7',
        badge_pending: '#F7EFE8',
        badge_modal: '#CCDBDC',
        modal_pagination_bg: '#1D2739',
        modal_pagination_disabled_bg: '#344054',
        modal_pagination_text: '#F0F2F5'
      },
      backgroundColor: {
        default: '#F9FAFB',
        lightGreen: '#CCDBDC',
        ratio_card_1: '#e7f6ec',
        ratio_card_2: '#ccdbdc',
        ratio_card_3: '#fef6e7',
        dark_green: '#004C4E'
      },
      textColor: {
        default: '#344054',
        primary: '#004C4E'
      },
      borderColor: {
        primary: '#F0F2F5',
        appGreen: '#004C4E',
        warning: '#F5b546',
        success: '#40B869',
        danger: '#B42318',
        sidebar: '#E4E4E4',
      },
      borderRadius: {
        lg: 'var(--radius)',
        md: 'calc(var(--radius) - 2px)',
        sm: 'calc(var(--radius) - 4px)',
        '4xl': '32px'
      },
      keyframes: {
        'accordion-down': {
          from: {
            height: '0'
          },
          to: {
            height: 'var(--radix-accordion-content-height)'
          }
        },
        'accordion-up': {
          from: {
            height: 'var(--radix-accordion-content-height)'
          },
          to: {
            height: '0'
          }
        },
        'slide-from-bottom': {
          from: {
            transform: 'translateY(100%)'
          },
          to: {
            transform: 'translateY(0)'
          }
        },
        'slide-from-left': {
          from: {
            transform: 'translateX(-100%)'
          },
          to: {
            transform: 'translateX(0)'
          }
        },
        'slide-from-right': {
          from: {
            transform: 'translateX(100%)'
          },
          to: {
            transform: 'translateX(0)'
          }
        },
        'slide-from-top': {
          from: {
            transform: 'translateY(-100%)'
          },
          to: {
            transform: 'translateY(0)'
          }
        }
      },
      animation: {
        'accordion-down': 'accordion-down 0.2s ease-out',
        'accordion-up': 'accordion-up 0.2s ease-out',
        'slide-from-bottom': 'slide-from-bottom 0.5s ease-in-out',
        'slide-from-left': 'slide-from-left 0.5s ease-in-out',
        'slide-from-right': 'slide-from-right 0.5s ease-in-out',
        'slide-from-top': 'slide-from-top 0.5s ease-in-out'
      },
      boxShadow: {
        spread: '0px 0px 8px 1px rgba(0, 0, 0, 0.10)'
      },
      fontFamily: {
        instrument: ["var(--font-instrument-sans)", "sans-serif"],
      },
      backgroundImage: {
        "footer-radial":
          "radial-gradient(circle at center, #6D00C7 0%, #540099 70%)",
      },
    }
  },
  // eslint-disable-next-line @typescript-eslint/no-require-imports
  plugins: [
    require('@tailwindcss/forms'),
    require('tailwind-scrollbar'),
    require('tailwindcss-animate'),
  ]
};
export default config;
