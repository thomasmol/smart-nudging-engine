/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ['./src/**/*.{html,js,svelte,ts}'],
  theme: {
    extend: {},
    container: {
			padding: {
        DEFAULT: '2rem',
        sm: '2rem',
        lg: '3rem',
        xl: '4rem',
        '2xl': '4rem',
      },
      screens: {
				sm: "640px",
				md: "768px",
				lg: "1024px",
				xl: "1280px",
				'2xl': "1280px"
		 }
    },
  },
  plugins: [
		require('@tailwindcss/forms'),
	]
}
