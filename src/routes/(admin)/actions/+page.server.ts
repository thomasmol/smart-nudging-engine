import type { Action } from '@prisma/client';
import type { PageServerLoad } from './$types';

export const load = (async ({fetch}) => {
	const response = await fetch('/api/actions');
	const actions: Action[] = await response.json();
	return { actions };
}) satisfies PageServerLoad;
