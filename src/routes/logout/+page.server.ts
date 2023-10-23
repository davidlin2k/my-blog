import { env } from '$env/dynamic/private';
import type { Actions } from './$types';

import { redirect } from '@sveltejs/kit';

/** @type {import('./$types').Actions} */
export const actions: Actions = {
	default: async ({ cookies }) => {
		cookies.delete('jwt', {
			path: '/'
		});

		throw redirect(307, '/login');
	}
};
