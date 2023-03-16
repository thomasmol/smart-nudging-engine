import type { Configuration } from '@prisma/client';
import type { PageServerLoad } from './$types';

export const load = (async ({ params, fetch }) => {
	const response = await fetch(`/api/configurations/${params.id}`);

	const configuration: Configuration = await response.json();
	return { configuration };
}) satisfies PageServerLoad;
