import type { Nudge } from '@prisma/client';
import type { PageServerLoad } from './$types';

export const load = (async ({fetch}) => {
	const response = await fetch('/api/nudges');
	const nudges: Nudge[] = await response.json();
	return { nudges };
}) satisfies PageServerLoad;
