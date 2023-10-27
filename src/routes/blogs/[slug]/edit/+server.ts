import { error } from '@sveltejs/kit';
import type { RequestHandler } from './$types';

import * as api from '$lib/api';

export const PUT: RequestHandler = async ({ request, params, locals }) => {
	const requestBody = await request.json();
	const res = await api.put(`blogs/${params.slug}`, requestBody, locals.token);

	if (res.ok) {
		const body = await res.json();

		if (body.data.user_id !== locals.user) {
			throw error(401, 'Unauthorized');
		}

		return new Response(JSON.stringify(body.data));
	} else {
		throw error(res.status, 'Not found');
	}
};
