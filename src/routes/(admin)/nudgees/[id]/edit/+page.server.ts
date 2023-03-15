import type { Nudgee } from '@prisma/client';
import type { PageServerLoad } from './$types';

export const load = (async ({ params, fetch }) => {
	const response = await fetch(`/api/nudgees/${params.id}`);

	const nudgee: Nudgee = await response.json();
	return { nudgee };
}) satisfies PageServerLoad;
