/** @type {import('tailwindcss').Config} */
module.exports = {
    content: ["./src/**/*.{html,js}"],
    theme: {
      extend: {
        colors: {
        transparent: 'transparent',
        'primary-blue': '#5CE1E6',
        'primary-blue500': '#00BFD1',
        'secondary-blue': '#4349EB',
        'secondary-blue50': '#EAEAFD',
        'secondary-blue700': '#3534D3',
        'secondary-blue100': '#ccccff',
        info: '#F8EF13',
        danger: '#EB5757',
        danger50: '#FEEBEF',
        black: '#333333',
        black50: '#F7F7F7',
        gray: '#7D7D7D',
        disabled: '#BDBDBD',
        white: '#ffffff',
        success: '#6FCF97',
        warning: '#FFBD59',
        light: '#E0E0E0'
      },
      borderRadius: {
        xl: '1rem',
        xs: '0.5rem'
      },
      fontSize: {
        '0': '0rem',
        xs: '0.75rem', // 12px
        sm: '.875rem', // 14px
        base: '1rem',
        xl: '1.25rem', // 20px
        '2xl': '1.5rem', // 24px
        '3xl': '2rem', // 32px
        '4xl': '2.25rem', // 36px
        '5xl': '3rem', // 48px
        '6xl': '4rem', // 64px
        '7xl': '5rem' // 80px
      },
      fontFamily: {
        sans: ['Noto Sans Thai UI', 'Noto Sans', 'sans-serif']
      },
    },
    },
    plugins: [],
  }