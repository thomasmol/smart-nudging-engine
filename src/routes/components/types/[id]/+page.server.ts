import type { ComponentType, ComponentValue } from '@prisma/client';
import type { PageServerLoad } from './$types';

export const load = (async ({ params }) => {
	const responseTypeValues = await fetch(
		'http://localhost:5173/api/components/types/' + params.id + '/values'
	);
	const responseType = await fetch(
		'http://localhost:5173/api/components/types/' + params.id
	);

	const componentValues: ComponentValue[] = await responseTypeValues.json();
	const componentType: ComponentType = await responseType.json();
	return { componentValues, componentType };
}) satisfies PageServerLoad;
