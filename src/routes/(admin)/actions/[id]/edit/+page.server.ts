import type { MetricType, Nudgee, Action } from '@prisma/client';
import type { PageServerLoad } from './$types';

export const load = (async ({ params, fetch }) => {
	const response = await fetch(`/api/actions/${params.id}`);
	const responseNudgees = await fetch('/api/nudgees');
	const responseMetricTypes = await fetch('/api/metrics');
	const nudgees: Nudgee[] = await responseNudgees.json();
	const metricTypes: MetricType[] = await responseMetricTypes.json();
	const action: Action = await response.json();
	return { nudgees, metricTypes, action };
}) satisfies PageServerLoad;
