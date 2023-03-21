import type { MetricType } from '@prisma/client';
import { redirect } from '@sveltejs/kit';
import type { Actions, PageServerLoad } from './$types';

export const load = (async ({ params, fetch }) => {
	const response = await fetch(`/api/metrics/${params.id}`);

	const metricType: MetricType = await response.json();
	return { metricType };
}) satisfies PageServerLoad;

export const actions = {
	update: async ({ request, params, fetch }) => {
		const data = await request.formData();
		const label = data.get('label');
		const type = data.get('type');
		const id = params.id;
		if (!label || !type || !id) {
			return {
				success: false
			};
		}

		const response = await fetch(`/api/metrics/${id}`, {
			method: 'PUT',
			headers: {
				'Content-Type': 'application/json'
			},
			body: JSON.stringify({
				label,
				type
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
	},
	destroy: async ({ params, fetch }) => {
		await fetch(`/api/metrics/${params.id}`, {
			method: 'DELETE'
		});
		throw redirect(303, '/metrics');
	}

} satisfies Actions;
