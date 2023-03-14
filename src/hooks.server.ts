import { SvelteKitAuth } from '@auth/sveltekit';
import GitHub from '@auth/core/providers/github';
import { GITHUB_ID, GITHUB_SECRET } from '$env/static/private';
import type { Handle } from '@sveltejs/kit';
import { sequence } from '@sveltejs/kit/hooks';

const authorization = (async ({ event, resolve }) => {
	/* const unprotectedRoutes = ['/login', '/register', '/welcome'];
	// Protect any routes under unprotectedRoutes

	const session = await event.locals.getSession();
	if (!unprotectedRoutes.includes(event.url.pathname)) {
		if (!session) {
			throw redirect(303, '/login');
		}
	} else {
		if (session) {
			throw redirect(303, '/');
		}
	} */

	// If the request is still here, just proceed as normally
	const result = await resolve(event, {
		transformPageChunk: ({ html }) => html
	});
	return result;
}) satisfies Handle;

export const handle = sequence(
	/* SvelteKitAuth({
		providers: [
			//@ts-expect-error issue https://github.com/nextauthjs/next-auth/issues/6174
			GitHub({
				clientId: GITHUB_ID,
				clientSecret: GITHUB_SECRET
			})
		]
	}), */
	authorization
) satisfies Handle;
