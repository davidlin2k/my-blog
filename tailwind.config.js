/** @type {import('tailwindcss').Config} */
export default {
	content: [
		'./src/**/*.{html,js,svelte,ts}',
		'./node_modules/flowbite-svelte/**/*.{html,js,svelte,ts}'
	],
	theme: {
		extend: {
			colors: {
				primary: {
					100: '#1A759F',
					200: '#59a4d0',
					300: '#c1ffff'
				},
				accent: {
					100: '#3D85C6',
					200: '#dfffff'
				},
				text: {
					100: '#FFFFFF',
					200: '#e0e0e0'
				},
				bg: {
					100: '#0F1621',
					200: '#1e2530',
					300: '#353c48'
				}
			}
		}
	},
	plugins: [require('flowbite/plugin')],
	darkMode: 'class'
};
