import type { ComponentType, ComponentValue } from '@prisma/client';
import type { PageServerLoad } from './$types';

export const load = (async ({ params, fetch }) => {
	const responseTypeValues = await fetch(`/api/components/${params.id}/values`);
	const responseType = await fetch(`/api/components/${params.id}`);

	const componentValues: ComponentValue[] = await responseTypeValues.json();
	const componentType: ComponentType = await responseType.json();
	return { componentValues, componentType };
}) satisfies PageServerLoad;
