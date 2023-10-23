import { env } from '$env/dynamic/private';
import type { PageServerLoad, Actions } from './$types';

import { fail, redirect } from '@sveltejs/kit';
import * as api from '$lib/api';

/** @type {import('./$types').Actions} */
export const actions: Actions = {
	default: async ({ cookies }) => {
		cookies.delete('jwt', {
			path: '/'
		});

		throw redirect(307, '/login');
	}
};
