import type { MetricType } from '@prisma/client';
import type { PageServerLoad } from './$types';

export const load = (async ({ params, fetch }) => {
	const response = await fetch(`/api/metrics/${params.id}`);

	const metricType: MetricType = await response.json();
	return { metricType };
}) satisfies PageServerLoad;
