import type { ComponentType } from '@prisma/client';
import type { PageServerLoad } from './$types';

export const load = (async ({ params, fetch }) => {
	const response = await fetch(`/api/components/${params.id}`);

	const componentType: ComponentType = await response.json();
	return { componentType };
}) satisfies PageServerLoad;
