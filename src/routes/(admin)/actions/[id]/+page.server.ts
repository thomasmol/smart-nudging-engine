import type { Action } from '@prisma/client';
import { redirect } from '@sveltejs/kit';
import type { Actions, PageServerLoad } from './$types';

export const load = (async ({ params, fetch }) => {
	const response = await fetch(`/api/actions/${params.id}`);

	const action: Action = await response.json();
	return { action };
}) satisfies PageServerLoad;

export const actions = {
	update: async ({ request, params, fetch }) => {
		const data = await request.formData();
		const id = params.id;
		const nudgee_id = data.get('nudgee_id');
		const metric_type_id = data.get('metric_type_id');
		const metric_value = data.get('metric_value');
		const created_at = data.get('created_at');
		if (!id || !nudgee_id || !metric_type_id || !metric_value || !created_at) {
			return {
				success: false
			};
		}

		const response = await fetch(`/api/actions/${id}`, {
			method: 'PUT',
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
	},
	destroy: async ({ params, fetch }) => {
		await fetch(`/api/actions/${params.id}`, {
			method: 'DELETE'
		});
		throw redirect(303, '/actions');
	}
} satisfies Actions;
