import { redirect } from '@sveltejs/kit';
import type { Actions } from './$types';

export const actions = {
	update: async ({ request, params, fetch }) => {
		const data = await request.formData();
		const component_id = params.id;
		const value_id = params.value_id;
		const value = data.get('value');
		if (!component_id || !value_id || !value) {
			return {
				success: false
			};
		}

		const response = await fetch(`/api/components/${component_id}/values/${value_id}`, {
			method: 'PUT',
			headers: {
				'Content-Type': 'application/json'
			},
			body: JSON.stringify({
				value
			})
		});

		if (!response.ok) {
			return {
				success: false
			};
		}

		throw redirect(303, `/components/${component_id}`);
	},
	destroy: async ({ params, fetch }) => {
		const component_id = params.id;
		const value_id = params.value_id;
		await fetch(`/api/components/${component_id}/values/${value_id}`, {
			method: 'DELETE'
		});
		throw redirect(303, `/components/${component_id}`);
	}
} satisfies Actions;
