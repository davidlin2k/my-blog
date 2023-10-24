import type { Handle } from '@sveltejs/kit';

/** @type {import('@sveltejs/kit').Handle} */
export const handle: Handle = ({ event, resolve }) => {
	const jwt = event.cookies.get('jwt') ?? null

	event.locals.token = jwt;
	event.locals.user = jwt ? JSON.parse(atob(jwt.split('.')[1])).user_id : null;

	return resolve(event);
};
