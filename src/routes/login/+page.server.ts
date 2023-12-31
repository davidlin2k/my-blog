import { env } from '$env/dynamic/private';
import type { PageServerLoad, Actions } from './$types';

import { fail, redirect } from '@sveltejs/kit';
import * as api from '$lib/api';

/** @type {import('./$types').PageServerLoad} */
export const load: PageServerLoad = async ({ locals }) => {
	if (locals.token) redirect(307, '/');
};

/** @type {import('./$types').Actions} */
export const actions: Actions = {
	default: async ({ cookies, request }) => {
		const data = await request.formData();

		const res = await api.post('users/login', {
			email: data.get('email'),
			password: data.get('password')
		});

		if (!res.ok) {
			return fail(res.status, { email: data.get('email') });
		}

		const body = await res.json();

		const value = body.data.token;
		const maxAge = (new Date(body.data.exp).getTime() - new Date().getTime()) / 1000;

		cookies.set('jwt', value, {
			path: '/',
			httpOnly: true,
			sameSite: 'strict',
			secure: env.NODE_ENV === 'production',
			maxAge: maxAge
		});

		redirect(307, '/');
	}
};
