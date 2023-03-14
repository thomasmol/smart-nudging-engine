import type {  MetricType } from '@prisma/client';
import type { PageServerLoad } from './$types';

export const load = (async ({fetch}) => {
	const response = await fetch('/api/metrics');
	const metricTypes: MetricType[] = await response.json();
	return { metricTypes };
}) satisfies PageServerLoad;
