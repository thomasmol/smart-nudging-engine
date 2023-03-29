import type { ComponentType, Configuration, Group, MetricType } from '@prisma/client';
import type { PageServerLoad } from './$types';

export const load = (async ({ params, fetch }) => {
	const response = await fetch(`/api/configurations/${params.id}`);
	const responseComponents = await fetch('/api/components');
	const responseGroups = await fetch('/api/groups');
	const responseMetrics = await fetch('/api/metrics');
	const configuration: Configuration = await response.json();
	const componentTypes : ComponentType[] = await responseComponents.json();
	const groups : Group[] = await responseGroups.json();
	const metricTypes: MetricType[] = await responseMetrics.json();
	return { configuration, componentTypes, groups, metricTypes };
}) satisfies PageServerLoad;
