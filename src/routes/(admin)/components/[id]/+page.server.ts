import type { ComponentType } from '@prisma/client';
import { redirect } from '@sveltejs/kit';
import type { Actions, PageServerLoad } from './$types';

export const load = (async ({ params, fetch }) => {
	const response = await fetch(`/api/components/${params.id}`);

	const componentType: ComponentType = await response.json();
	return { componentType };
}) satisfies PageServerLoad;

export const actions = {
	update: async ({ request, params, fetch }) => {
		const data = await request.formData();
		const id = params.id;
		const label = data.get('label');
		const data_type = data.get('data_type');
		if (!id || !label || !data_type) {
			return {
				success: false
			};
		}

		const response = await fetch(`/api/components/${id}`, {
			method: 'PUT',
			headers: {
				'Content-Type': 'application/json'
			},
			body: JSON.stringify({
				label,
				data_type
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
		await fetch(`/api/components/${params.id}`, {
			method: 'DELETE'
		});
		throw redirect(303, '/components');
	}
} satisfies Actions;
