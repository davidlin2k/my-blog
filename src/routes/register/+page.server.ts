import type { PageServerLoad, Actions } from './$types';

import { fail, redirect } from '@sveltejs/kit';
import * as api from '$lib/api';

/** @type {import('./$types').PageServerLoad} */
export const load: PageServerLoad = async ({ locals }) => {
	if (locals.token) redirect(307, '/');
};

/** @type {import('./$types').Actions} */
export const actions: Actions = {
	default: async ({ request }) => {
		const data = await request.formData();

		const res = await api.post('users/register', {
			name: data.get('name'),
			email: data.get('email'),
			password: data.get('password'),
			password_confirmation: data.get('password_confirmation')
		});

		if (!res.ok) {
			return fail(401, { email: data.get('email') });
		}

		redirect(307, '/');
	}
};
