import { fail, redirect } from '@sveltejs/kit';
import * as api from '$lib/api.js';

/** @type {import('./$types').PageServerLoad} */
export async function load({ locals }) {
	if (locals.user) throw redirect(307, '/');
}

/** @type {import('./$types').Actions} */
export const actions = {
	default: async ({ cookies, request }) => {
		const data = await request.formData();

		const body = await api.post('users/login', {
			email: data.get('email'),
			password: data.get('password')
		});

		if (body.errors) {
			return fail(401, body);
		}

		const value = body.data.token;
		const maxAge = (new Date(body.data.exp) - Date.now()) / 1000;

		cookies.set('jwt', value, {
			path: '/',
			httpOnly: true,
			sameSite: 'strict',
			secure: process.env.NODE_ENV === 'production',
			maxAge: maxAge
		});

		throw redirect(307, '/');
	}
};
