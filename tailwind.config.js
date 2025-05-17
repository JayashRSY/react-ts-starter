/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        brand: {
          50: '#f0f9ff',
          100: '#e0f2fe',
          500: '#4f46e5',
          600: '#4338ca',
          700: '#3730a3',
        },
      },
    },
  },
  plugins: [
    function ({ addComponents }) {
      addComponents({
        '.btn': {
          padding: '.5rem 1rem',
          borderRadius: '.25rem',
          fontWeight: '600',
        },
        '.btn-primary': {
          backgroundColor: '#4f46e5',
          color: '#fff',
          '&:hover': {
            backgroundColor: '#4338ca',
          },
        },
        '.card': {
          backgroundColor: '#fff',
          borderRadius: '.5rem',
          boxShadow: '0 4px 6px -1px rgba(0, 0, 0, 0.1), 0 2px 4px -1px rgba(0, 0, 0, 0.06)',
          padding: '1.5rem',
        },
        '.form-input': {
          borderRadius: '.25rem',
          padding: '.5rem .75rem',
          border: '1px solid #d1d5db',
          '&:focus': {
            outline: 'none',
            ring: '2px',
            ringColor: '#4f46e5',
            borderColor: '#4f46e5',
          },
        },
      })
    },
  ],
}