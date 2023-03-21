import type { Actions, PageServerLoad } from './$types';

import type { Nudgee, MetricType } from '@prisma/client';

export const load = (async ({ fetch }) => {
	const responseNudgees = await fetch('/api/nudgees');
	const responseMetricTypes = await fetch('/api/metrics');
	const nudgees: Nudgee[] = await responseNudgees.json();
	const metricTypes: MetricType[] = await responseMetricTypes.json();
	return { nudgees, metricTypes };
}) satisfies PageServerLoad;

export const actions = {
	default: async ({ request, fetch }) => {
		const data = await request.formData();
		const nudgee_id = data.get('nudgee_id');
		const metric_type_id = data.get('metric_type_id');
		const metric_value = data.get('metric_value');
		const created_at = data.get('created_at');
		if (!nudgee_id || !metric_type_id || !metric_value) {
			return {
				success: false
			};
		}
		const response = await fetch(`/api/actions`, {
			method: 'POST',
			headers: {
				'Content-Type': 'application/json'
			},
			body: JSON.stringify({
				nudgee_id,
				metric_type_id,
				metric_value,
				created_at
			})
		});

		if (!response.ok) {
			return {
				success: false
			};
		}
		return {
			success: true
		};
	}
} satisfies Actions;
