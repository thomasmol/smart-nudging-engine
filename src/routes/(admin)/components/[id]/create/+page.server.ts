import type { ComponentType } from '@prisma/client';
import type { PageServerLoad } from './$types';

export const load = (async ({ params, fetch }) => {
	const responseType = await fetch('/api/components/' + params.id);

	const componentType: ComponentType = await responseType.json();
	return { componentType };
}) satisfies PageServerLoad;
