import type { PageServerLoad, Actions } from './$types';

import { redirect } from '@sveltejs/kit';
import * as api from '$lib/api';

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
	},

	update: async ({ request, locals }) => {
		const data = await request.formData();

		const res = await api.put('users/me', {
			name: data.get('name'),
			email: data.get('email'),
			password: data.get('password'),
			password_confirmation: data.get('password_confirmation')
		}, locals.token);

		if (!res.ok) {
			return { status: res.status, body: await res.json() };
		}

		return { status: 200, body: {} };
	}
};
