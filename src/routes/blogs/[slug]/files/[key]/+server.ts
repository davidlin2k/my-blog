import type {RequestHandler} from './$types';

import * as api from '$lib/api';

export const GET: RequestHandler = async ({ params, locals }) => {
    return await api.get(`blogs/${params.slug}/files/${params.key}`, locals.token);
};
