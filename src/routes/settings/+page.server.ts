import type { PageServerLoad, Actions } from './$types';

import { redirect } from '@sveltejs/kit';

export const load: PageServerLoad = ({ locals }) => {
	if (!locals.token) redirect(302, '/login');
};

/** @type {import('./$types').Actions} */
export const actions: Actions = {
	logout: async ({ cookies, locals }) => {
		cookies.delete('jwt', {
			path: '/'
		});

		locals.token = null;
		locals.user = null;

		redirect(307, '/login');
	}
};
