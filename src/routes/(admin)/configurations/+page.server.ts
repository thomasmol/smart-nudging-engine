import type {  Configuration } from '@prisma/client';
import type { PageServerLoad } from './$types';

export const load = (async ({fetch}) => {
	const response = await fetch('/api/configurations');
	const configurations: Configuration[] = await response.json();
	return { configurations };
}) satisfies PageServerLoad;
