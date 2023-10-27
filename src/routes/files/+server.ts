import { error } from '@sveltejs/kit';
import type { RequestHandler } from './$types';

import { PUBLIC_API_URL } from '$env/static/public';

export const POST: RequestHandler = async ({ request, params, locals }) => {
	const requestBody = await request.json();

	console.log('requestBody', requestBody);

	const res = await fetch(`${PUBLIC_API_URL}/api/storage/direct_uploads`, {
		method: 'POST',
		headers: {
			'Content-Type': 'application/json',
			Authorization: `Bearer ${locals.token}`
		},
		body: JSON.stringify(requestBody)
	});

	if (res.ok) {
		return res;
	} else {
		throw error(res.status, 'Not found');
	}
};
