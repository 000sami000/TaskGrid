/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      screens: {
        'sm': '500px',   // Custom sm breakpoint
        'md': '768px',   // Default md breakpoint
        'lg': '1024px',  // Default lg breakpoint
        'xl': '1280px',  // Default xl breakpoint
        '2xl': '1440px', // Custom 2xl breakpoint
      },
    },
  },
  plugins: [],
}

