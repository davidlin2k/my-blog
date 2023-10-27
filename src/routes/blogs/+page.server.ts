import type { PageServerLoad, Actions } from './$types';

import { redirect, error } from '@sveltejs/kit';
import * as api from '$lib/api';

/** @type {import('./$types').PageServerLoad} */
export const load: PageServerLoad = async ({ isDataRequest, locals }) => {
	const res: Promise<any> = api.get('blogs', locals.token).then((res) => res.json());

	return { blogs: isDataRequest ? res : await res };
};

/** @type {import('./$types').Actions} */
export const actions: Actions = {
	default: async ({ locals, cookies }) => {
		if (!locals.token) throw error(401, 'Unauthorized');

		const res = await api.post('blogs', {}, locals.token);

		if (!res.ok) {
			throw error(res.status, 'Failed to create blog');
		}

		const body = await res.json();

		throw redirect(307, `/blogs/${body.data.id}/edit`);
	}
};
