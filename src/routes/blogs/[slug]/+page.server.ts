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
		error(blogRes.status, 'Not found');
	}

	if (!commentsRes.ok) {
		error(commentsRes.status, 'Failed to load comments');
	}

	const [blog, comments] = await Promise.all([
		blogRes.json(),
		commentsRes.json(),
	])

	return { blog: blog.data, comments: comments.data };
};

/** @type {import('./$types').Actions} */
export const actions: Actions = {
	createComment: async ({ locals, params, request }) => {
		const data = await request.formData();

		const res = await api.post(`blogs/${params.slug}/comments`, {
			content: data.get('comment'),
		}, locals.token);

		if (!res.ok) {
			error(res.status, 'Failed to create comment');
		}

		const comment = await res.json();

		return {
			body: comment.data,
			status: 201,
		};
	},
	deleteComment: async ({ locals, params, url }) => {
		const id = url.searchParams.get('id');
		const result = await api.del(`blogs/${params.slug}/comments/${id}`, locals.token);

		if (result.error) error(result.status, result.error);
	},
};