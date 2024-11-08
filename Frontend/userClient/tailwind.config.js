/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx,vue}",
  ],
  theme: {
    extend: {
      fontFamily:{
        body: ["Montserrat", "Sans-serif"],
        heading: ["Bebas Neue", "Sans-serif"]
      },
      colors: {
        primary: {
          DEFAULT: '#FBC151',
          50: '#FFF5E5',
          100: '#FFEBCB',
          200: '#FFD796',
          300: '#FBC151',
          400: '#F8A621',
          500: '#E08E00',
          600: '#B57300',
          700: '#8A5800',
          800: '#5F3C00',
          900: '#352300',
        },
        secondary: {
          DEFAULT: '#001D37',
          50: '#E5EBF1',
          100: '#CCD6E3',
          200: '#99ADC6',
          300: '#6685A8',
          400: '#335B89',
          500: '#001D37',
          600: '#00172C',
          700: '#001121',
          800: '#000B16',
          900: '#00050C',
        },
        white: {
          DEFAULT: '#FFFFFF',
          100: '#FAFAFA',
          200: '#F5F5F5',
          300: '#F0F0F0',
          400: '#EAEAEA',
          500: '#E5E5E5',
        },
        'pearl-white': {
          DEFAULT: '#F2F1F0',
          50: '#FBFBFB',
          100: '#F7F6F5',
          200: '#F2F1F0', // Default Pearl-white
          300: '#E6E5E3',
          400: '#DAD9D7',
          500: '#CECCC9',
          600: '#B2B1AE',
          700: '#959493',
          800: '#787776',
          900: '#5B5A5A',
        },
        black: {
          DEFAULT: '#000000',
          100: '#1A1A1A',
          200: '#333333',
          300: '#4D4D4D',
          400: '#666666',
          500: '#808080',
        },
        screenBlack: {
          DEFAULT: '#242424',
          50: '#F2F2F2',
          100: '#DBDBDB',
          200: '#B5B5B5',
          300: '#8F8F8F',
          400: '#696969',
          500: '#424242',
          600: '#242424',
          700: '#1E1E1E',
          800: '#171717',
          900: '#111111',
        },
        gray: {
          DEFAULT: '#4D4D4D',
          50: '#E9E9E9',
          100: '#D1D1D1',
          200: '#AAAAAA',
          300: '#838383',
          400: '#6B6B6B',
          500: '#4D4D4D',
          600: '#333333',
          700: '#1A1A1A',
          800: '#0F0F0F',
          900: '#080808',
        },
        red: {
          DEFAULT: '#D14F4F',
          50: '#F8E3E3',
          100: '#F1C4C4',
          200: '#E39292',
          300: '#D86161',
          400: '#D14F4F',
          500: '#B83B3B',
          600: '#9E2F2F',
          700: '#802424',
          800: '#601818',
          900: '#410E0E',
        },
        green: {
          DEFAULT: '#4CAF60',
          50: '#E9F6EC',
          100: '#D4EED9',
          200: '#A8DDAD',
          300: '#7CCC81',
          400: '#4CAF60',
          500: '#378C4C',
          600: '#2A6D3A',
          700: '#1F502A',
          800: '#15341C',
          900: '#0A1B0E',
        },
        blue: {
          DEFAULT: '#3A89C9',
          50: '#E8F1F8',
          100: '#D1E3F0',
          200: '#A2C7E1',
          300: '#74ABD2',
          400: '#4A8FC2',
          500: '#3A89C9',
          600: '#2A6A9A',
          700: '#1D4D73',
          800: '#12314C',
          900: '#071826',
        },
        yellow: {
          DEFAULT: '#FFD966',
          50: '#FFF9E5',
          100: '#FFF1CC',
          200: '#FFE399',
          300: '#FFD966',
          400: '#FFC833',
          500: '#FFB300',
          600: '#D69200',
          700: '#A57200',
          800: '#734D00',
          900: '#402A00',
        },
        orange: {
          DEFAULT: '#FF8C42',
          50: '#FFEFE5',
          100: '#FFD7CC',
          200: '#FFAF99',
          300: '#FF8855',
          400: '#FF8C42',
          500: '#E07830',
          600: '#C06520',
          700: '#A05215',
          800: '#803E0C',
          900: '#5F2A05',
        },
        purple: {
          DEFAULT: '#8E6FC1', // Soft, muted purple fitting into the warm palette
          50: '#F1EBF9',
          100: '#E0D3F0',
          200: '#C2A8E1',
          300: '#A67ED3',
          400: '#8E6FC1',
          500: '#70559C',
          600: '#573F7A',
          700: '#422F5B',
          800: '#2E2041',
          900: '#1B1229',
        },
        lavender: {
          DEFAULT: '#C7A9E8', // Soft lavender for lighter, calm accents
          50: '#F6F0FB',
          100: '#EBE0F7',
          200: '#D6C1EF',
          300: '#C7A9E8',
          400: '#A780DE',
          500: '#865FD1',
          600: '#6947A5',
          700: '#50357B',
          800: '#372452',
          900: '#1F122E',
        },
        pink: {
          DEFAULT: '#E685A4', // Muted pink for accents, blending well with purple and lavender
          50: '#FDEEF3',
          100: '#FAD9E2',
          200: '#F5ADC2',
          300: '#F091A3',
          400: '#E685A4',
          500: '#C06B84',
          600: '#9C5168',
          700: '#7A3E52',
          800: '#552A38',
          900: '#301622',
        }
      },
      fontSize:{



        'text-xs': ['0.96rem', { lineHeight: '1.1rem' }],  // 15.4px / 1.618 rounded to 0.96rem (smallest)
        'text-sm': ['1.5rem', { lineHeight: '1.7rem' }],   // 15.4px rounded to 1.5rem (next smallest)
        'body': ['2.5rem', { lineHeight: '2.8rem' }],      // 25px font size with 28px line height
        'body-lg': ['4rem', { lineHeight: '4.4rem' }], 
        'subtitle': ['4rem', { lineHeight: '4.4rem' }],    // 40px font size with 44px line height
        'title': ['6.5rem', { lineHeight: '7rem' }],       // 65px font size with 70px line height
        'heading': ['10.5rem', { lineHeight: '11.2rem' }], // 105px font size with 112px line height
        'display': ['17.1rem', { lineHeight: '18rem' }],   // 171px font size with 180px line height


      },
      screens:{
        sm: '640px',  // Small phone
        md: '768px',  // Tablet
        lg: '1024px', // Small PC
        xl: '1280px', // Usual PC
        '2xl': '1536px', // Large PC
      },
      backgroundImage: {
        'home-bg': "url('https://i.postimg.cc/GtDknN7Z/homebg.png')"
      },
    }
  },
  plugins: [],
}

