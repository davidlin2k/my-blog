import type { Handle } from '@sveltejs/kit';

/** @type {import('@sveltejs/kit').Handle} */
export const handle: Handle = ({ event, resolve }) => {
	event.locals.user = event.cookies.get('jwt') ?? null;

	return resolve(event);
}
