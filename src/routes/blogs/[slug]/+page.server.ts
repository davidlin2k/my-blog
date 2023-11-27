// @ts-nocheck
import { error } from '@sveltejs/kit';
import type { PageServerLoad } from './$types';

import * as api from '$lib/api';

export const load = async ({ locals, params }: Parameters<PageServerLoad>[0]) => {
	const [blogRes, commentsRes] = await Promise.all([
		api.get(`blogs/${params.slug}`, locals.token),
		api.get(`blogs/${params.slug}/comments`, locals.token),
	])

	if (!blogRes.ok) {
		throw error(blogRes.status, 'Not found');
	}

	if (!commentsRes.ok) {
		throw error(commentsRes.status, 'Failed to load comments');
	}

	const [blog, comments] = await Promise.all([
		blogRes.json(),
		commentsRes.json(),
	])

	return { blog: blog.data, comments: comments.data };
};
