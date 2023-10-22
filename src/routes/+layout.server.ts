import type { LayoutServerLoad } from './$types';
import * as api from '$lib/api';

/** @type {import('./$types').LayoutServerLoad} */
export const load: LayoutServerLoad = async ({ locals }) => {
    if (locals.token) {
        const body = await api.get('users/me', locals.token);

        if (body.data) {
            return { user: body.data };
        }
    }

    return { user: null };
}