import type { PageServerLoad, Actions } from './$types';

import { fail, redirect } from '@sveltejs/kit';
import * as api from '$lib/api.js';

/** @type {import('./$types').PageServerLoad} */
export const load: PageServerLoad = async ({ locals }) => {
	if (locals.user) throw redirect(307, '/');
};

/** @type {import('./$types').Actions} */
export const actions: Actions = {
	default: async ({ request }) => {
		const data = await request.formData();

		const body = await api.post('users/register', {
			name: data.get('name'),
			email: data.get('email'),
			password: data.get('password'),
			password_confirmation: data.get('password_confirmation')
		});

		if (body.errors) {
			return fail(401, body);
		}

		throw redirect(307, '/');
	}
};
