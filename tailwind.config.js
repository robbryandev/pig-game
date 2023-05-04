// tailwind.config.js
module.exports = {
  content: ["./{src,app,pages}/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      colors: {
        "bs-info": "#16A3B8",
        "bs-primary": "#007BFF",
        "bs-success": "#29A645",
        "bs-danger": "#DD3445",
      },
    },
  },
  plugins: [],
}
