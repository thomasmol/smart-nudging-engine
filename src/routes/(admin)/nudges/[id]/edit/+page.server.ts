import type { Nudge } from '@prisma/client';
import type { PageServerLoad } from './$types';

export const load = (async ({ params, fetch }) => {
	const response = await fetch(`/api/nudges/${params.id}`);

	const nudge: Nudge = await response.json();
	return { nudge };
}) satisfies PageServerLoad;
