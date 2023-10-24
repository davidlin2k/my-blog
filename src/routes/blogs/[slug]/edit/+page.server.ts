import { error } from '@sveltejs/kit';
import type { PageServerLoad } from './$types';

import * as api from '$lib/api';

export const load: PageServerLoad = async ({ locals, params }) => {
    const res = await api.get(`blogs/${params.slug}`, locals.token);

    if (res.ok) {
        const body = await res.json();

        if (body.data.user_id !== locals.user) {
            throw error(401, 'Unauthorized');
        }

        return body.data;
    } else {
        throw error(res.status, 'Not found');
    }
};
