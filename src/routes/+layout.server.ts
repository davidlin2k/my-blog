import type { LayoutServerLoad } from './$types';
import * as api from '$lib/api';

/** @type {import('./$types').LayoutServerLoad} */
export const load: LayoutServerLoad = async ({ locals }) => {
	if (locals.token) {
		const res = await api.get('users/me', locals.token);

		if (res.ok) {
			const body = await res.json();

			return { user: body.data };
		}
	}

	return { user: null };
};
