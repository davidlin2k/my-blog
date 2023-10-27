import type { PageLoad } from './$types';
import {error} from "@sveltejs/kit";

/** @type {import('./$types').PageLoad} */
export const load: PageLoad = async ({ fetch }) => {
    const res = await fetch('blogs', {
        method: 'GET',
        headers: {
            'Content-Type': 'application/json',
        }
    });

    if (!res.ok) {
        throw error(res.status, 'Failed to load blogs');
    }

    const body = await res.json();

    return { blogs: body.data };
};