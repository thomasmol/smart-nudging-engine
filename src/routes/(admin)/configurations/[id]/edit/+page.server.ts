import type { ComponentType, Configuration } from '@prisma/client';
import type { PageServerLoad } from './$types';

export const load = (async ({ params, fetch }) => {
	const response = await fetch(`/api/configurations/${params.id}`);
	const responseComponents = await fetch('/api/components');
	const componentTypes : ComponentType[] = await responseComponents.json();
	const configuration: Configuration = await response.json();
	return { configuration, componentTypes };
}) satisfies PageServerLoad;
