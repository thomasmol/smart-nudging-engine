import type { Nudgee } from '@prisma/client';
import type { PageServerLoad } from './$types';


export const load = (async ({fetch}) => {
	const response = await fetch('/api/nudgees');
	const nudgees: Nudgee[] = await response.json();
	return { nudgees };
}) satisfies PageServerLoad;
