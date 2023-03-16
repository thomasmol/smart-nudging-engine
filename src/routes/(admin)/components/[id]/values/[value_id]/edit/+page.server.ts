import type {  ComponentValue } from '@prisma/client';
import type { PageServerLoad } from './$types';

export const load = (async ({ params, fetch }) => {
	const response = await fetch(`/api/components/${params.id}/values/${params.value_id}`);

	const componentValue: ComponentValue = await response.json();
	return { componentValue };
}) satisfies PageServerLoad;
