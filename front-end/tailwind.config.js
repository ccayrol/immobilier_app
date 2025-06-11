/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./src/**/*.{js,jsx,ts,tsx}",
    "./public/index.html"
  ],
  theme: {
    extend: {},
  },
  plugins: [
    // Si vous voulez ajouter le plugin line-clamp plus tard
    // require('@tailwindcss/line-clamp'),
  ],
};
