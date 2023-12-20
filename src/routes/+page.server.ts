import type { PageServerLoad, Actions } from './$types';

import { redirect, error } from '@sveltejs/kit';
import * as api from '$lib/api';

/** @type {import('./$types').PageServerLoad} */
export const load: PageServerLoad = async ({ locals }) => {
	const res = await api.get('blogs', locals.token);

	if (!res.ok) {
		error(res.status, 'Failed to fetch blogs');
	}

	const body = await res.json();

	return { blogs: body.data };
};

/** @type {import('./$types').Actions} */
export const actions: Actions = {
	default: async ({ locals, cookies }) => {
		if (!locals.token) error(401, 'Unauthorized');

		const res = await api.post('blogs', {}, locals.token);

		if (!res.ok) {
			error(res.status, 'Failed to create blog');
		}

		const body = await res.json();

		redirect(307, `/blogs/${body.data.id}/edit`);
	}
};
