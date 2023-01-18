import type { Group } from '@prisma/client';
import type { PageServerLoad } from './$types';

export const load = (async ({fetch}) => {
	const response = await fetch('/api/groups');
	const groups: Group[] = await response.json();
	return { groups };
}) satisfies PageServerLoad;
