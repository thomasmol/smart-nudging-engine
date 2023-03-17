import type { Actions, PageServerLoad } from './$types';
import type { ComponentType, MetricType, Nudgee, Nudge } from '@prisma/client';

export const load = (async ({ fetch }) => {
	const responseComponents = await fetch('/api/components');
	const responseMetricTypes = await fetch('/api/metrics');
	const responseNudgees = await fetch('/api/nudgees');

	const componentTypes: ComponentType[] = await responseComponents.json();
	const metricTypes: MetricType[] = await responseMetricTypes.json();
	const nudgees: Nudgee[] = await responseNudgees.json();

	return { componentTypes, metricTypes, nudgees };
}) satisfies PageServerLoad;

export const actions = {
	default: async ({ request, fetch }) => {
		const data = await request.formData();
		const content_type = data.get('content_type');
		const content = data.get('content');
		const generated = data.has('generated');
		const nudgee_ids = data.getAll('nudgee_ids');
		const metric_type_ids = data.getAll('metric_type_ids');
		const component_value_ids = data.getAll('component_value_ids');
		if (!content_type || !content || generated == null) {
			return {
				success: false
			};
		}


		const response = await fetch(`/api/nudges`, {
			method: 'POST',
			headers: {
				'Content-Type': 'application/json'
			},
			body: JSON.stringify({
				content_type,
				content,
				generated
			})
		});
		const nudge: Nudge = await response.json();

		await fetch(`/api/nudges/${nudge.id}/components`, {
			method: 'POST',
			headers: {
				'Content-Type': 'application/json'
			},
			body: JSON.stringify({
				component_value_ids
			})
		});
		await fetch(`/api/nudges/${nudge.id}/metrics`, {
			method: 'POST',
			headers: {
				'Content-Type': 'application/json'
			},
			body: JSON.stringify({
				metric_type_ids
			})
		});
		await fetch(`/api/nudges/${nudge.id}/nudgees`, {
			method: 'POST',
			headers: {
				'Content-Type': 'application/json'
			},
			body: JSON.stringify({
				nudgee_ids
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
