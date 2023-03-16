import type { Group, Nudgee } from '@prisma/client';
import type { PageServerLoad } from './$types';


export const load = (async ({ params, fetch }) => {
	const response = await fetch(`/api/groups/${params.id}`);
	const responseNudgees = await fetch(`/api/nudgees`);
	const nudgees: Nudgee[] = await responseNudgees.json();
	const group: Group = await response.json();
	return { group, nudgees };
}) satisfies PageServerLoad;
