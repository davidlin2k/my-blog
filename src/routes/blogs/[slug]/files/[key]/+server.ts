import type { RequestHandler } from './$types';

import * as api from '$lib/api';
import {error, redirect} from "@sveltejs/kit";

export const GET: RequestHandler = async ({ params, locals }) => {
	const res = await api.get(`blogs/${params.slug}/files/${params.key}`, locals.token);

	if (res.ok) {
		const body = await res.json();

		redirect(307, body.data.url);
	}

	error(res.status, 'Not found');
};
