import adapter from "svelte-adapter-bun";
import { vitePreprocess } from '@sveltejs/kit/vite';

/** @type {import('@sveltejs/kit').Config} */
const config = {
	kit: {
		adapter: adapter(),
		alias: {
			$components: './src/components'
		}
	},
	preprocess: vitePreprocess(),
};

export default config;
