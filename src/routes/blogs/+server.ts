import { error } from '@sveltejs/kit';
import type { RequestHandler } from './$types';

import * as api from '$lib/api';

export const GET: RequestHandler = async ({ params, locals }) => {
    const res = await api.get('blogs', locals.token);

    if (!res.ok) {
        throw error(res.status, 'Failed to load blogs');
    }

    return res;
};
