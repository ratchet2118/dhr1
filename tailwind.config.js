/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {
      colors: {
        custom: {
          Text: '#0A0D13',
          primary: 'rgba(0, 0, 0, 0.87)',
          secondary: 'rgba(0, 0, 0, 0.60)',
          actionDisabled: 'rgba(0, 0, 0, 0.38) !important',
          actionDisabledBackground: 'rgba(0, 0, 0, 0.12) !important',
          divider: 'rgba(0, 0, 0, 0.12)',
          dlLinear: 'linear-gradient(90deg, #045BEC 50%, #00D9D9 99.17%)',
          errorMain: '#D32F2F',
        },
      },
      spacing: {
        custom: {},
      },
      borderRadius: {
        buttonRadius: '6px !important',
      },
    },
    screens: {
      lg: '1024px',
      md: '768px',
      xs: '393px',
    },
  },
  plugins: [],
}
